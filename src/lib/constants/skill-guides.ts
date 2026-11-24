import type {
  CliCommandItem,
  GeminiScreenshotRef,
  GuideStep,
} from '@/types';
import { REPO_LINKS } from './repos';

export const INSTALL_SKILL_PROMPT = 'Tolong install kedua skill ini';

export const GEMINI_WEB_INSTALL_STEPS: GuideStep[] = [
  {
    number: '01',
    title: 'Download file ZIP dari kedua repositori GitHub',
    description:
      'Unduh berkas ZIP resmi dari repositori bangtutorial/bang-motion dan lemomo-ai/lemo-opuscar langsung melalui tombol unduh di sebelah kanan (atau lewat tombol Code → Download ZIP di GitHub).',
  },
  {
    number: '02',
    title: 'Buka Gemini Web dan aktifkan Mode Tugas',
    description:
      'Masuk ke gemini.google.com dengan akun Google milikmu. Di bagian bawah kolom input, pastikan kamu memilih mode "Tugas" (bukan "Obrolan"). Mode Tugas wajib dipakai baik untuk menginstal keahlian maupun membuat video motion graphic.',
    tip: 'Pada tampilan Gemini Web terbaru sudah tidak ada mode Canvas dan Gem telah dialihkan ke menu "Keahlian".',
  },
  {
    number: '03',
    title: 'Upload kedua file ZIP dan kirim prompt instalasi',
    description:
      'Klik ikon "+" di kolom input Mode Tugas untuk mengunggah kedua file ZIP (bang-motion & lemo-opuscar) sekaligus, lalu ketik atau tempel prompt persis seperti di bawah:',
    tip: 'Prompt instalasi: "Tolong install kedua skill ini" — Gemini akan mengekstrak dan memasang kedua keahlian tersebut secara otomatis.',
  },
  {
    number: '04',
    title: 'Cek di menu Keahlian (atau upload manual jika perlu)',
    description:
      'Buka menu Keahlian → Keterampilan di Gemini Web dan pastikan "bang-motion" serta "lemo-opuscar" sudah terdaftar pada bagian Diinstal. Jika ingin mengunggah manual, klik Buat → Upload lalu pilih file/folder SKILL.md (kebab-case) dari hasil ekstrak ZIP.',
  },
];

export const GEMINI_SCREENSHOT_REFS: GeminiScreenshotRef[] = [
  {
    src: '/assets/aistudio/image_95924fc8.png',
    title: '1. Pilih Mode Tugas di Gemini Web',
    caption:
      'Gunakan tombol "Tugas" di bawah kolom input (bukan Obrolan) setiap kali menginstal skill maupun memproduksi video motion graphic.',
  },
  {
    src: '/assets/aistudio/image_f35bb85a.png',
    title: '2. Menu Keahlian (Pengganti Gem)',
    caption:
      'Setelah terpasang, lemo-opuscar dan bang-motion akan tampil di bagian "Diinstal" pada halaman Keahlian → Keterampilan.',
  },
  {
    src: '/assets/aistudio/image_96377cbf.png',
    title: '3. Opsi Upload Keahlian Manual',
    caption:
      'Jika ingin menambahkan skill secara manual, klik Buat → Upload dan sertakan file SKILL.md di folder utama.',
  },
  {
    src: '/assets/aistudio/image_4e370fea.png',
    title: '4. Informasi Migrasi Gem ke Keahlian',
    caption:
      'Gemini Gem kini dialihkan ke menu Keahlian tempat seluruh skill tersimpan dan dapat dipanggil dengan awalan @nama-skill.',
  },
];

export const CLI_COMMANDS: CliCommandItem[] = [
  {
    id: 'bang-motion-cli',
    label: 'Install Skill bang-motion (Gemini CLI / Codex / Cursor)',
    repoName: 'bangtutorial/bang-motion',
    repoUrl: REPO_LINKS.bangMotion,
    command:
      'npx skills add https://github.com/bangtutorial/bang-motion --skill bang-motion',
    note: 'Memasang skill pembuat motion graphic HTML/CSS/GSAP dengan aturan anti-slide otomatis di lingkungan terminal lokal.',
  },
  {
    id: 'lemo-opuscar-clone',
    label: 'Clone Toolbox & 99 Style Library lemo-opuscar',
    repoName: 'lemomo-ai/lemo-opuscar',
    repoUrl: REPO_LINKS.lemoOpuscar,
    command: 'git clone https://github.com/lemomo-ai/lemo-opuscar.git',
    note: 'Menyediakan DIRECTOR.md, TECHNIQUE.md, dan 99 folder styles/*/STYLE.md beserta pipeline render MP4 lokal berbasis FFmpeg.',
  },
];
