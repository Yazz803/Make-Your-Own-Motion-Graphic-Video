import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import {
  clampTourStepIndex,
  computeSpotlightRect,
  computeTourPopoverPosition,
  DEFAULT_TOUR_GUIDE_STATE,
  parseTourGuideState,
  TOUR_GUIDE_STEPS,
  TOUR_GUIDE_STORAGE_KEY,
  TOUR_GUIDE_VERSION,
} from '@/lib/tour-guide';

const ROOT = process.cwd();

describe('tour-guide configuration, persistence & geometry', () => {
  it('defines a stable localStorage key and ordered top-to-bottom steps', () => {
    assert.equal(TOUR_GUIDE_STORAGE_KEY, 'motion_graphic_studio_tour_v1');
    assert.equal(TOUR_GUIDE_VERSION, 1);
    assert.deepEqual(
      TOUR_GUIDE_STEPS.map((step) => step.id),
      [
        'navbar',
        'hero',
        'workflow',
        'catalog',
        'studio-form',
        'studio-output',
        'preview',
        'panduan',
        'support',
        'footer',
      ]
    );

    for (const step of TOUR_GUIDE_STEPS) {
      assert.ok(step.title.trim().length > 0);
      assert.ok(step.description.trim().length > 20);
      assert.ok(step.badge.trim().length > 0);
    }
  });

  it('maps every tour step targetId to a real data-tour-target attribute in src/', () => {
    const targetFiles: Record<string, string> = {
      navbar: 'src/components/layout/Navbar.tsx',
      hero: 'src/features/workspace/components/HeroSection.tsx',
      workflow: 'src/features/workspace/components/WorkflowStrip.tsx',
      catalog: 'src/features/catalog/components/StyleCatalog.tsx',
      'studio-form':
        'src/features/prompt-studio/components/PromptControlsForm.tsx',
      'studio-output':
        'src/features/prompt-studio/components/PromptOutputPanel.tsx',
      preview: 'src/features/stage-preview/components/LiveStagePreview.tsx',
      panduan: 'src/features/skill-guide/components/SkillGuideSection.tsx',
      support:
        'src/features/support/components/SupportDeveloperSection.tsx',
      footer: 'src/components/layout/Footer.tsx',
    };

    for (const step of TOUR_GUIDE_STEPS) {
      const relPath = targetFiles[step.targetId];
      assert.ok(relPath, `Missing target file mapping for ${step.targetId}`);
      const source = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
      assert.ok(
        source.includes(`data-tour-target="${step.targetId}"`),
        `${relPath} must declare data-tour-target="${step.targetId}"`
      );
    }
  });

  it('falls back to pending defaults on null, malformed, or mismatched-version storage', () => {
    assert.deepEqual(parseTourGuideState(null), DEFAULT_TOUR_GUIDE_STATE);
    assert.deepEqual(parseTourGuideState(''), DEFAULT_TOUR_GUIDE_STATE);
    assert.deepEqual(parseTourGuideState('{broken'), DEFAULT_TOUR_GUIDE_STATE);
    assert.deepEqual(parseTourGuideState('[]'), DEFAULT_TOUR_GUIDE_STATE);
    assert.deepEqual(
      parseTourGuideState(
        JSON.stringify({
          version: 999,
          status: 'completed',
          lastStepIndex: 4,
          updatedAt: '2026-11-25T00:00:00.000Z',
        })
      ),
      DEFAULT_TOUR_GUIDE_STATE
    );
  });

  it('restores valid completed/skipped states and clamps out-of-range step indices', () => {
    const completed = {
      version: TOUR_GUIDE_VERSION,
      status: 'completed',
      lastStepIndex: TOUR_GUIDE_STEPS.length - 1,
      updatedAt: '2026-11-25T10:00:00.000Z',
    };
    assert.deepEqual(
      parseTourGuideState(JSON.stringify(completed)),
      completed
    );

    const skippedOutOfBounds = parseTourGuideState(
      JSON.stringify({
        version: TOUR_GUIDE_VERSION,
        status: 'skipped',
        lastStepIndex: 999,
        updatedAt: '2026-11-25T10:05:00.000Z',
      })
    );
    assert.equal(skippedOutOfBounds.status, 'skipped');
    assert.equal(
      skippedOutOfBounds.lastStepIndex,
      TOUR_GUIDE_STEPS.length - 1
    );
    assert.equal(clampTourStepIndex(-5), 0);
    assert.equal(clampTourStepIndex(Number.NaN), 0);
  });

  it('keeps spotlight and popover strictly inside desktop, tablet, and mobile viewports', () => {
    const viewports = [
      { width: 1440, height: 900 },
      { width: 768, height: 1024 },
      { width: 390, height: 844 },
      { width: 320, height: 568 },
    ];

    for (const viewport of viewports) {
      const popoverSize = {
        width: Math.min(390, viewport.width - 24),
        height: 260,
      };

      const navbarRect = {
        top: 0,
        left: 0,
        width: viewport.width,
        height: 64,
        right: viewport.width,
        bottom: 64,
      };
      const navSpotlight = computeSpotlightRect(navbarRect, viewport, 'navbar');
      assert.ok(navSpotlight);
      const navPos = computeTourPopoverPosition(
        navSpotlight,
        popoverSize,
        viewport,
        'bottom',
        'navbar'
      );
      assert.ok(navPos.left >= 12);
      assert.ok(navPos.left + popoverSize.width <= viewport.width - 12);
      assert.ok(navPos.top >= 12);
      assert.ok(navPos.top + popoverSize.height <= viewport.height - 12);

      const tallRect = {
        top: 84,
        left: 16,
        width: viewport.width - 32,
        height: 1100,
        right: viewport.width - 16,
        bottom: 1184,
      };
      const tallSpotlight = computeSpotlightRect(
        tallRect,
        viewport,
        'studio-form'
      );
      assert.ok(tallSpotlight);
      assert.ok(tallSpotlight.bottom <= viewport.height - 6);

      const tallPos = computeTourPopoverPosition(
        tallSpotlight,
        popoverSize,
        viewport,
        'right',
        'studio-form'
      );
      assert.ok(tallPos.left >= 12);
      assert.ok(tallPos.left + popoverSize.width <= viewport.width - 12);
      assert.ok(tallPos.top >= 12);
      assert.ok(tallPos.top + popoverSize.height <= viewport.height - 12);
    }
  });

  it('wires icon-only Info button in Navbar, skip/replay controls in TourGuidePopover, and TourGuideOverlay in MotionWorkspace', () => {
    const navbar = fs.readFileSync(
      path.join(ROOT, 'src/components/layout/Navbar.tsx'),
      'utf8'
    );
    const popover = fs.readFileSync(
      path.join(ROOT, 'src/features/tour-guide/components/TourGuidePopover.tsx'),
      'utf8'
    );
    const workspace = fs.readFileSync(
      path.join(ROOT, 'src/features/workspace/components/MotionWorkspace.tsx'),
      'utf8'
    );

    assert.match(navbar, /LuInfo/);
    assert.match(navbar, /onStartTour/);
    assert.match(navbar, /aria-label="Mulai ulang panduan tur website"/);

    assert.match(popover, /role="dialog"/);
    assert.match(popover, /aria-modal="true"/);
    assert.match(popover, /Lewati Tur/);
    assert.match(popover, /Sebelumnya/);
    assert.match(popover, /Lanjut/);
    assert.match(popover, /Selesai/);
    assert.equal(/rounded-full/.test(popover), false);

    assert.match(workspace, /useTourGuide/);
    assert.match(workspace, /TourGuideOverlay/);
    assert.match(workspace, /onStartTour=\{tour\.startTour\}/);
  });
});
