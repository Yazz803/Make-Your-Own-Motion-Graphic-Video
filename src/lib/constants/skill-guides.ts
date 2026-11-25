import type {
  CliCommandItem,
  GeminiInstallPromptItem,
  GeminiRecoveryStep,
  GeminiScreenshotRef,
} from '@/types';
import { REPO_LINKS } from './repos';

export const GEMINI_RETRY_NETWORK_PROMPT =
  'Aku udah aktifin akses internet untuk komputer jarak jauh nya';

export const GEMINI_INSTALL_PROMPTS: GeminiInstallPromptItem[] = [
  {
    id: 'install-bang-motion',
    stepNumber: '01',
    skillName: 'bang-motion',
    skillHandle: '@bang-motion',
    repoName: 'bangtutorial/bang-motion',
    repoUrl: REPO_LINKS.bangMotion,
    prompt: `Tolong install skill ini ${REPO_LINKS.bangMotion}`,
    description:
      'Masukkan prompt ini di Gemini Web Mode Tugas untuk instalasi skill bang-motion.',
  },
  {
    id: 'install-lemo-opuscar',
    stepNumber: '02',
    skillName: 'lemo-opuscar',
    skillHandle: '@lemo-opuscar',
    repoName: 'lemomo-ai/lemo-opuscar',
    repoUrl: REPO_LINKS.lemoOpuscar,
    prompt: `Tolong install skill ini ${REPO_LINKS.lemoOpuscar}`,
    description:
      'Masukkan prompt ini di Gemini Web Mode Tugas untuk instalasi skill lemo-opuscar.',
  },
];

export const GEMINI_FAILURE_SCREENSHOT: GeminiScreenshotRef = {
  src: '/assets/images/first-error.png',
  title: 'Contoh Error: Akses Internet Komputer Jarak Jauh Nonaktif',
  caption:
    'Jika prompt pertama gagal karena Gemini Web belum bisa mengunduh dan memasang skill (muncul pesan kendala koneksi internet / akses internet komputer jarak jauh sedang nonaktif), lanjutkan ke 5 langkah aktivasi di bawah.',
  width: 807,
  height: 611,
};

export const GEMINI_RECOVERY_STEPS: GeminiRecoveryStep[] = [
  {
    number: '01',
    title: 'Buka menu Settings di kiri bawah dan klik menu "Browser"',
    description:
      'Buka menu Settings (ikon roda gigi) yang ada di bagian kiri bawah Gemini Web, lalu klik menu "Browser" pada bagian Preferensi.',
    screenshot: {
      src: '/assets/images/pointing-to-menu-browser.png',
      title: '1. Buka Settings → Menu "Browser"',
      caption:
        'Klik ikon Settings di pojok kiri bawah sidebar Gemini Web, lalu pilih menu "Browser" (ditandai kotak merah).',
      width: 498,
      height: 656,
    },
  },
  {
    number: '02',
    title: 'Pada bagian "Izin", ubah ke "Selalu izinkan"',
    description:
      'Setelah membuka menu "Browser", akan muncul tampilan pengaturan izin browser jarak jauh. Pada bagian "Izin", ubah pilihannya menjadi "Selalu izinkan".',
    screenshot: {
      src: '/assets/images/pointing-to-always-allow-browser.png',
      title: '2. Ubah Bagian "Izin" ke "Selalu izinkan"',
      caption:
        'Buka dropdown pada bagian "Izin" lalu pilih "Selalu izinkan" agar Gemini dapat menggunakan browser tanpa meminta izin berulang.',
      width: 698,
      height: 337,
    },
  },
  {
    number: '03',
    title: 'Buka Settings lagi dan buka menu "Setelan Tugas"',
    description:
      'Setelah itu buka kembali menu Settings di bagian kiri bawah, lalu klik menu "Setelan Tugas" pada bagian Preferensi.',
    screenshot: {
      src: '/assets/images/pointing-to-menu-setelan-tugas.png',
      title: '3. Buka Settings → Menu "Setelan Tugas"',
      caption:
        'Buka kembali menu Settings di kiri bawah, lalu pilih menu "Setelan Tugas" (ditandai kotak merah).',
      width: 502,
      height: 656,
    },
  },
  {
    number: '04',
    title: 'Enable "Akses jaringan untuk komputer jarak jauh?"',
    description:
      'Pada halaman Setelan Tugas, aktifkan (enable) toggle "Akses jaringan untuk komputer jarak jauh?" hingga menyala agar Gemini dapat mengunduh paket skill dari GitHub.',
    screenshot: {
      src: '/assets/images/pointing-to-akses-jaringan.png',
      title: '4. Aktifkan "Akses jaringan untuk komputer jarak jauh?"',
      caption:
        'Nyalakan toggle pada bagian "Akses jaringan untuk komputer jarak jauh?" di halaman Setelan Tugas.',
      width: 742,
      height: 842,
    },
  },
  {
    number: '05',
    title: 'Kembali ke chat awal dan masukkan prompt konfirmasi',
    description:
      'Kembali lagi ke chat awal tadi, kemudian masukkan prompt di bawah ini. Secara otomatis Gemini akan memeriksa kembali skill tadi dan melakukan instalasi skill tersebut.',
    tip: 'Jika muncul kartu konfirmasi "Jalankan Perintah", klik tombol "Izinkan" agar Gemini menyelesaikan pemasangan skill hingga aktif. Setelah itu, kamu juga bisa langsung menjalankan prompt instalasi skill kedua (lemo-opuscar).',
    promptToCopy: {
      id: 'retry-after-network-prompt',
      label: 'Salin Prompt Konfirmasi',
      text: GEMINI_RETRY_NETWORK_PROMPT,
    },
    screenshot: {
      src: '/assets/images/success-install-skill.png',
      title: '5. Kirim Prompt Konfirmasi & Skill Berhasil Terpasang',
      caption:
        'Setelah mengirim prompt konfirmasi (dan klik "Izinkan" bila diminta), Gemini otomatis mengunduh, memeriksa, dan mengaktifkan skill di daftar skill kamu.',
      width: 593,
      height: 687,
    },
  },
];

export const GEMINI_SCREENSHOT_REFS: GeminiScreenshotRef[] = [
  GEMINI_FAILURE_SCREENSHOT,
  ...GEMINI_RECOVERY_STEPS.map((step) => step.screenshot),
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
