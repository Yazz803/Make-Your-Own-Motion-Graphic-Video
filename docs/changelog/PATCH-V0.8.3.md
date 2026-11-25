# PATCH v0.8.3 — Pembaruan Panduan Instalasi Skill Gemini Web via Prompt & Aktivasi Akses Jaringan

**Tanggal:** 25 November 2026
**Basis:** v0.8.2 — Tanpa migrasi database / tanpa breaking change pada konfigurasi `localStorage`

## Latar Belakang / Masalah / Gejala
Panduan instalasi skill pada bagian **Panduan Instalasi Skill Gemini Web** (`#panduan`) sebelumnya masih mengarahkan pengguna untuk mengunduh file ZIP kedua repositori (`bang-motion` dan `lemo-opuscar`) lalu mengunggahnya secara manual ke Mode Tugas. Pada alur Gemini Web terbaru, kedua skill dapat dipasang langsung melalui prompt URL GitHub di **Mode Tugas**, namun pengguna sering menemui kegagalan awal (*"Gagal menginstal repositori karena kendala koneksi internet"*) apabila izin **Browser** dan **Akses jaringan untuk komputer jarak jauh?** belum diaktifkan di pengaturan Gemini Web.

## Detail Perubahan / Solusi Teknis
- **Kontrak Tipe & Data Panduan (`src/types/guide.ts`, `src/types/index.ts`, `src/lib/constants/skill-guides.ts`, `src/lib/constants/index.ts`):**
  - Menambahkan tipe `GeminiInstallPromptItem` dan `GeminiRecoveryStep` serta memperbarui `GeminiScreenshotRef` dengan dimensi gambar opsional.
  - Mengganti panduan unduh ZIP dengan `GEMINI_INSTALL_PROMPTS` berisi dua prompt siap salin untuk Mode Tugas:
    1. `Tolong install skill ini https://github.com/bangtutorial/bang-motion`
    2. `Tolong install skill ini https://github.com/lemomo-ai/lemo-opuscar`
  - Menambahkan `GEMINI_FAILURE_SCREENSHOT` (`/assets/images/first-error.png`) dan `GEMINI_RECOVERY_STEPS` (5 langkah berurutan beserta `GEMINI_RETRY_NETWORK_PROMPT`: `"Aku udah aktifin akses internet untuk komputer jarak jauh nya"` dan 5 tangkapan layar panduan di `public/assets/images/`).
- **Antarmuka Panduan Gemini Web (`SkillGuideSection.tsx`, `GeminiWebGuideTab.tsx`, `GeminiRecoveryTimeline.tsx`, `ScreenshotLightboxModal.tsx`):**
  - Memperbarui deskripsi header `SkillGuideSection` agar selaras dengan alur instalasi berbasis prompt URL GitHub dan langkah aktivasi akses jaringan.
  - Merancang ulang `GeminiWebGuideTab` menjadi 3 blok terstruktur: kartu prompt instalasi utama (`bang-motion` & `lemo-opuscar`) dengan tombol salin per skill dan pemecahan URL bersih di batas `/` (`<wbr />`), kartu kondisi gagal (`Jika Prompt Pertama Gagal`) dengan pratinjau `first-error.png`, serta komponen baru `GeminiRecoveryTimeline` untuk 5 langkah aktivasi izin **Browser** (*Selalu izinkan*) dan **Setelan Tugas** (*Akses jaringan untuk komputer jarak jauh?*) hingga prompt konfirmasi di chat awal.
  - Memperbarui `ScreenshotLightboxModal` agar memakai kontainer `object-contain` dengan tinggi adaptif (`h-[60vh] max-h-[620px]`) sehingga tangkapan layar potret maupun lanskap tampil utuh tanpa terpotong.
- **Tur Interaktif, Pengujian & Dokumentasi (`src/lib/tour-guide.ts`, `tests/skill-guides.test.mts`, `README.md`, `PRODUCT.md`, `DESIGN.md`):**
  - Memperbarui deskripsi langkah tur `panduan` di `src/lib/tour-guide.ts`.
  - Menambahkan suite pengujian `tests/skill-guides.test.mts` untuk memverifikasi prompt instalasi, prompt konfirmasi, keberadaan seluruh 6 berkas gambar di `public/assets/images/`, serta keterhubungan komponen tanpa sisa salinan unduh ZIP lama.
  - Menyelaraskan `README.md`, `PRODUCT.md`, dan `DESIGN.md` dengan alur panduan terbaru.

## Verifikasi & Pengujian
- `npm test`: **42/42 test lulus** (8 suite, termasuk `tests/skill-guides.test.mts`).
- `npm run typecheck` (`tsc --noEmit`): lulus dengan 0 error.
- `npm run lint` (`eslint .`): lulus dengan 0 error dan 0 warning.
- `npm run build`: `next build` (Turbopack) berhasil mengompilasi dan melakukan prerender statis `/`, `/_not-found`, `/icon.png`, dan `/apple-icon.png`.
- Verifikasi browser langsung pada `http://localhost:3000/#panduan`:
  - Memastikan seluruh 6 gambar panduan termuat (`complete: true`, `naturalWidth > 0`), tombol salin prompt (`Salin Prompt bang-motion`, `Salin Prompt lemo-opuscar`, `Salin Prompt Konfirmasi`) menampilkan umpan balik `Prompt Tersalin`, dan `ScreenshotLightboxModal` membuka serta menutup gambar potret maupun lanskap tanpa terpotong.
  - Memastikan `scrollWidth <= innerWidth` (0 horizontal overflow) pada `1440×900`, `768×1024`, `390×844`, dan `320×568`, serta inspeksi visual `vision_analyze` pada desktop `1440×900` dan mobile `390×844`.

## Catatan Operasional / Deployment
Tidak memerlukan migrasi database maupun perubahan environment variable. Seluruh aset gambar baru berada di `public/assets/images/` dan siap langsung di-deploy.
