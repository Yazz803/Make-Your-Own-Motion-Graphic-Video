export const REPO_LINKS = {
  bangMotion: 'https://github.com/bangtutorial/bang-motion',
  bangMotionZip:
    'https://github.com/bangtutorial/bang-motion/archive/refs/heads/main.zip',
  bangMotionRaw:
    'https://raw.githubusercontent.com/bangtutorial/bang-motion/main',
  lemoOpuscar: 'https://github.com/lemomo-ai/lemo-opuscar',
  lemoOpuscarZip:
    'https://github.com/lemomo-ai/lemo-opuscar/archive/refs/heads/main.zip',
  lemoOpuscarRaw:
    'https://raw.githubusercontent.com/lemomo-ai/lemo-opuscar/main',
  geminiWeb: 'https://gemini.google.com/app',
} as const;

export const HERO_GALLERY_IMAGE = `${REPO_LINKS.bangMotionRaw}/docs/gallery/hero.jpg`;

export const NAV_LINKS = [
  { href: '#katalog', label: 'Katalog Gaya' },
  { href: '#studio', label: 'Studio Prompt' },
  { href: '#preview', label: 'Live Preview' },
  { href: '#panduan', label: 'Panduan Skill' },
] as const;
