import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  ALL_STATIONS,
  BANG_MOTION_COUNT,
  LEMO_OPUSCAR_COUNT,
  MOTION_STYLES,
  QUICK_BRIEF_PRESETS,
  STAGE_DEMO_HTML,
} from '@/lib/constants';

describe('motion-styles catalog integrity', () => {
  it('contains all 11 bang-motion and 99 lemo-opuscar styles with unique IDs', () => {
    assert.equal(BANG_MOTION_COUNT, 11);
    assert.equal(LEMO_OPUSCAR_COUNT, 99);
    assert.equal(MOTION_STYLES.length, 110);

    const ids = new Set(MOTION_STYLES.map((style) => style.id));
    assert.equal(ids.size, MOTION_STYLES.length);
  });

  it('ensures every style has valid metadata, palette, and station membership', () => {
    const stationSet = new Set(ALL_STATIONS);

    for (const style of MOTION_STYLES) {
      assert.ok(style.name.length > 0, `Missing name for ${style.id}`);
      assert.ok(stationSet.has(style.station), `Unknown station for ${style.id}`);
      assert.ok(style.palette.length >= 3, `Palette too short for ${style.id}`);
      assert.ok(
        style.imageUrl.startsWith('https://'),
        `Invalid imageUrl for ${style.id}`
      );
      assert.ok(
        style.skillHandle === '@bang-motion' ||
          style.skillHandle === '@lemo-opuscar',
        `Invalid skillHandle for ${style.id}`
      );
    }
  });

  it('ensures every quick brief preset references an existing style', () => {
    const styleIds = new Set(MOTION_STYLES.map((style) => style.id));
    for (const preset of QUICK_BRIEF_PRESETS) {
      assert.ok(
        styleIds.has(preset.styleId),
        `Preset ${preset.id} references missing style ${preset.styleId}`
      );
    }
  });

  it('provides valid HTML demo templates for all supported aspect ratios', () => {
    for (const ratio of ['9:16', '16:9', '1:1'] as const) {
      const html = STAGE_DEMO_HTML[ratio];
      assert.ok(html.includes('<!DOCTYPE html>'), `Missing doctype for ${ratio}`);
      assert.ok(html.includes('</html>'), `Incomplete HTML for ${ratio}`);
    }
  });
});
