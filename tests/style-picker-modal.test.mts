import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';

const ROOT = process.cwd();

describe('Studio Prompt style preview card & catalog modal', () => {
  it('replaces the native select dropdown in PromptControlsForm with a clickable preview card and StyleCatalogModal', () => {
    const formSource = fs.readFileSync(
      path.join(
        ROOT,
        'src/features/prompt-studio/components/PromptControlsForm.tsx'
      ),
      'utf8'
    );

    assert.doesNotMatch(formSource, /id="style-select"/);
    assert.doesNotMatch(formSource, /<optgroup/);
    assert.match(formSource, /StylePreviewThumb/);
    assert.match(formSource, /StyleCatalogModal/);
    assert.match(formSource, /selectedStyle\.name/);
    assert.match(formSource, /selectedStyle\.shortDesc/);
    assert.match(formSource, /selectedStyle\.skillHandle/);
  });

  it('exports StyleCatalogModal from catalog feature and wires Katalog 110 Gaya Visual modal', () => {
    const catalogIndex = fs.readFileSync(
      path.join(ROOT, 'src/features/catalog/index.ts'),
      'utf8'
    );
    const modalPath = path.join(
      ROOT,
      'src/features/catalog/components/StyleCatalogModal.tsx'
    );

    assert.match(catalogIndex, /StyleCatalogModal/);
    assert.equal(fs.existsSync(modalPath), true);

    const modalSource = fs.readFileSync(modalPath, 'utf8');
    assert.match(modalSource, /Katalog \{MOTION_STYLES\.length\} Gaya Visual/);
    assert.match(modalSource, /useStyleCatalogFilter/);
    assert.match(modalSource, /StyleCard/);
    assert.match(modalSource, /onSelectStyle/);
    assert.match(modalSource, /onClose/);
  });
});
