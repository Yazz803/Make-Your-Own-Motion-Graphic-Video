import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import {
  GEMINI_FAILURE_SCREENSHOT,
  GEMINI_INSTALL_PROMPTS,
  GEMINI_RECOVERY_STEPS,
  GEMINI_RETRY_NETWORK_PROMPT,
  GEMINI_SCREENSHOT_REFS,
  REPO_LINKS,
} from '@/lib/constants';

const ROOT = process.cwd();

describe('gemini web skill installation guide', () => {
  it('defines exact Mode Tugas install prompts for bang-motion and lemo-opuscar', () => {
    assert.equal(GEMINI_INSTALL_PROMPTS.length, 2);

    const [bangMotion, lemoOpuscar] = GEMINI_INSTALL_PROMPTS;
    assert.equal(bangMotion.skillName, 'bang-motion');
    assert.equal(
      bangMotion.prompt,
      `Tolong install skill ini ${REPO_LINKS.bangMotion}`
    );
    assert.equal(lemoOpuscar.skillName, 'lemo-opuscar');
    assert.equal(
      lemoOpuscar.prompt,
      `Tolong install skill ini ${REPO_LINKS.lemoOpuscar}`
    );
  });

  it('defines the failure screenshot and all 5 ordered recovery steps with existing image assets', () => {
    assert.equal(
      GEMINI_FAILURE_SCREENSHOT.src,
      '/assets/images/first-error.png'
    );
    assert.equal(GEMINI_RECOVERY_STEPS.length, 5);

    const expectedImages = [
      '/assets/images/pointing-to-menu-browser.png',
      '/assets/images/pointing-to-always-allow-browser.png',
      '/assets/images/pointing-to-menu-setelan-tugas.png',
      '/assets/images/pointing-to-akses-jaringan.png',
      '/assets/images/success-install-skill.png',
    ];

    GEMINI_RECOVERY_STEPS.forEach((step, index) => {
      assert.equal(step.number, `0${index + 1}`);
      assert.equal(step.screenshot.src, expectedImages[index]);
    });

    const step5 = GEMINI_RECOVERY_STEPS[4];
    assert.equal(
      GEMINI_RETRY_NETWORK_PROMPT,
      'Aku udah aktifin akses internet untuk komputer jarak jauh nya'
    );
    assert.equal(step5.promptToCopy?.text, GEMINI_RETRY_NETWORK_PROMPT);

    assert.equal(GEMINI_SCREENSHOT_REFS.length, 6);
    for (const shot of GEMINI_SCREENSHOT_REFS) {
      const diskPath = path.join(ROOT, 'public', shot.src.replace(/^\//, ''));
      assert.equal(
        fs.existsSync(diskPath),
        true,
        `Missing guide screenshot at ${diskPath}`
      );
    }
  });

  it('wires the prompt-based guide and recovery timeline without legacy ZIP upload copy', () => {
    const sectionSource = fs.readFileSync(
      path.join(
        ROOT,
        'src/features/skill-guide/components/SkillGuideSection.tsx'
      ),
      'utf8'
    );
    const tabSource = fs.readFileSync(
      path.join(
        ROOT,
        'src/features/skill-guide/components/GeminiWebGuideTab.tsx'
      ),
      'utf8'
    );
    const timelineSource = fs.readFileSync(
      path.join(
        ROOT,
        'src/features/skill-guide/components/GeminiRecoveryTimeline.tsx'
      ),
      'utf8'
    );

    assert.match(sectionSource, /Panduan Instalasi Skill Gemini Web/);
    assert.equal(/unduh ZIP/i.test(sectionSource), false);

    assert.match(tabSource, /GEMINI_INSTALL_PROMPTS/);
    assert.match(tabSource, /GEMINI_FAILURE_SCREENSHOT/);
    assert.match(tabSource, /GeminiRecoveryTimeline/);
    assert.equal(/Download bang-motion\.zip/.test(tabSource), false);
    assert.equal(/rounded-full/.test(tabSource), false);

    assert.match(timelineSource, /GEMINI_RECOVERY_STEPS/);
    assert.equal(/rounded-full/.test(timelineSource), false);
  });
});
