import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'src');

function collectSourceFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(fullPath));
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

describe('nextjs-architecture compliance', () => {
  it('keeps all application source under src/ with no legacy root folders', () => {
    for (const legacyDir of ['app', 'components', 'hooks', 'lib']) {
      assert.equal(
        fs.existsSync(path.join(ROOT, legacyDir)),
        false,
        `Legacy root directory "${legacyDir}/" should not exist`
      );
    }
    assert.equal(fs.existsSync(path.join(SRC_DIR, 'app', 'page.tsx')), true);
    assert.equal(fs.existsSync(path.join(SRC_DIR, 'types', 'index.ts')), true);
    assert.equal(fs.existsSync(path.join(SRC_DIR, 'features', 'index.ts')), true);
  });

  it('keeps src/app/page.tsx as a thin composition root under 150 lines', () => {
    const pageContent = fs.readFileSync(
      path.join(SRC_DIR, 'app', 'page.tsx'),
      'utf8'
    );
    const lineCount = pageContent.split(/\r?\n/).length;
    assert.ok(lineCount < 150, `page.tsx has ${lineCount} lines (expected < 150)`);
  });

  it('enforces react-icons, zero inline SVGs, and zero native browser dialogs across src/', () => {
    const files = collectSourceFiles(SRC_DIR);
    assert.ok(files.length > 0);

    for (const filePath of files) {
      const content = fs.readFileSync(filePath, 'utf8');
      const rel = path.relative(ROOT, filePath);

      assert.equal(
        /from ['"]lucide-react['"]/.test(content),
        false,
        `${rel} must use react-icons instead of lucide-react`
      );
      assert.equal(
        /<svg[\s>]/.test(content),
        false,
        `${rel} must not contain raw inline <svg> elements`
      );
      assert.equal(
        /\bwindow\.(alert|confirm)\s*\(/.test(content),
        false,
        `${rel} must not call window.alert or window.confirm`
      );
      assert.equal(
        /window\.location\.href\s*=/.test(content),
        false,
        `${rel} must not assign window.location.href`
      );
    }
  });

  it('configures Tailwind v4 dark variant and Turbopack-safe variable fonts', () => {
    const globalsCss = fs.readFileSync(
      path.join(SRC_DIR, 'app', 'globals.css'),
      'utf8'
    );
    assert.match(globalsCss, /@custom-variant dark/);

    const layoutTsx = fs.readFileSync(
      path.join(SRC_DIR, 'app', 'layout.tsx'),
      'utf8'
    );
    assert.match(layoutTsx, /metadataBase:/);
    assert.equal(
      /weight:\s*\[/.test(layoutTsx),
      false,
      'layout.tsx must not pass discrete weight arrays to variable Google fonts'
    );
  });
});
