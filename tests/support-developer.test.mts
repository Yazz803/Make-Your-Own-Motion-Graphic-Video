import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import {
  DEVELOPER_SUPPORT,
  FOOTER_ANCHOR_LINKS,
  REPO_LINKS,
} from '@/lib/constants';

const ROOT = process.cwd();

describe('support developer & repository links', () => {
  it('points to the official project repository and existing QRIS asset', () => {
    assert.equal(
      REPO_LINKS.projectRepo,
      'https://github.com/Yazz803/Make-Your-Own-Motion-Graphic-Video'
    );
    assert.equal(
      DEVELOPER_SUPPORT.repoUrl,
      'https://github.com/Yazz803/Make-Your-Own-Motion-Graphic-Video'
    );

    const qrisDiskPath = path.join(
      ROOT,
      'public',
      DEVELOPER_SUPPORT.qrisImageSrc.replace(/^\//, '')
    );
    assert.equal(
      fs.existsSync(qrisDiskPath),
      true,
      `Missing QRIS image at ${qrisDiskPath}`
    );
  });

  it('includes all 6 developer social media links with valid HTTPS URLs', () => {
    const expectedUrls: Record<string, string> = {
      instagram: 'https://instagram.com/_akbyzd',
      linkedin: 'https://linkedin.com/in/yazidakbar',
      github: 'https://github.com/Yazz803',
      whatsapp: 'https://wa.me/6281290215655',
      threads: 'https://threads.com/@_akbyzd',
      facebook: 'https://facebook.com/Lolsecz501',
    };

    assert.equal(DEVELOPER_SUPPORT.socialLinks.length, 6);
    for (const item of DEVELOPER_SUPPORT.socialLinks) {
      assert.equal(item.url, expectedUrls[item.id]);
    }
  });

  it('wires project repository link in Navbar and Footer, and places SupportDeveloperSection above Footer', () => {
    const navbar = fs.readFileSync(
      path.join(ROOT, 'src/components/layout/Navbar.tsx'),
      'utf8'
    );
    const footer = fs.readFileSync(
      path.join(ROOT, 'src/components/layout/Footer.tsx'),
      'utf8'
    );
    const workspace = fs.readFileSync(
      path.join(ROOT, 'src/features/workspace/components/MotionWorkspace.tsx'),
      'utf8'
    );

    assert.match(navbar, /REPO_LINKS\.projectRepo/);
    assert.match(footer, /REPO_LINKS\.projectRepo/);
    assert.ok(
      FOOTER_ANCHOR_LINKS.some((link) => link.href === '#support'),
      'Footer anchor links must include #support'
    );

    const guideIdx = workspace.indexOf('<SkillGuideSection');
    const supportIdx = workspace.indexOf('<SupportDeveloperSection');
    const footerIdx = workspace.indexOf('<Footer');
    assert.ok(guideIdx !== -1 && supportIdx !== -1 && footerIdx !== -1);
    assert.ok(
      guideIdx < supportIdx && supportIdx < footerIdx,
      'SupportDeveloperSection must sit below SkillGuideSection and above Footer'
    );
  });

  it('includes brand logo assets, app icons, and Navbar brand mark', () => {
    for (const relPath of [
      'public/assets/images/logo.jpg',
      'public/assets/images/lockup-logo.jpg',
      'public/assets/images/logo-mark.png',
      'src/app/icon.png',
      'src/app/apple-icon.png',
    ]) {
      assert.equal(
        fs.existsSync(path.join(ROOT, relPath)),
        true,
        `Missing brand asset at ${relPath}`
      );
    }

    const navbar = fs.readFileSync(
      path.join(ROOT, 'src/components/layout/Navbar.tsx'),
      'utf8'
    );
    assert.match(navbar, /\/assets\/images\/logo-mark\.png/);
  });
});
