# PATCH v0.8.0 — Mode Produksi Hybrid (Motion Graphic + Video Clip) di Studio Prompt

**Tanggal:** 25 November 2026
**Basis:** v0.7.0 — Tanpa migrasi database / backward-compatible penuh dengan snapshot `localStorage` dan draft tersimpan versi sebelumnya

## Latar Belakang / Masalah / Gejala
Sebelumnya, **Studio Prompt Mode Tugas Gemini Web** hanya mendukung alur **Full Motion Graphic** (baik alur 2 tahap dengan pembuatan naskah & upload audio Voice Over terpisah maupun langsung MP4 tanpa VO). Pengguna yang ingin mengunggah **video clip** langsung ke Gemini Web dan memadukan beberapa cuplikan video clip asli dengan adegan motion graphic (memakai suara asli dari video clip tersebut tanpa perlu membuat atau mengunggah audio VO terpisah) belum memiliki pilihan mode, kategori video clip, maupun struktur prompt khusus.

## Detail Perubahan / Solusi Teknis
- **Kontrak Tipe & Konstanta Hybrid (`src/types/prompt.ts`, `src/types/index.ts`, `src/lib/constants/hybrid-clip.ts`, `src/lib/constants/index.ts`):**
  - Menambahkan tipe `ProductionMode` (`'full-motion' | 'hybrid-clip'`), `VideoClipCategory`, `HybridClipBalance`, dan `HybridClipConfig`, serta memperluas `PromptConfig`, `StudioConfigSnapshot`, dan `SavedDraft` secara backward-compatible.
  - Mendefinisikan 6 kategori video clip resmi (`Viral & Hook`, `Meme & Komedi`, `Edukasi & Insight`, `Debat & Kontroversi`, `Cerita & Emosional`, `Deep Talk & Filosofi`) beserta arahan ritme/editing masing-masing, serta 3 opsi porsi komposisi (`Seimbang ~50% Clip · 50% Motion`, `Dominan Video Clip ~65% Clip · 35% Motion`, `Dominan Motion ~35% Clip · 65% Motion`).
- **Prompt Engine Mode Hybrid (`src/lib/prompt-engine.ts`):**
  - Mempertahankan output prompt **Full Motion Graphic** 100% identik dengan versi sebelumnya.
  - Menambahkan `buildHybridMotionPrompt` untuk mode **Hybrid (Motion Graphic + Video Clip)** yang menginstruksikan Gemini Web Mode Tugas agar:
    1. Tidak membuat naskah VO baru dan tidak meminta upload audio VO terpisah, melainkan memakai 100% suara/voice asli dari file video clip yang di-upload.
    2. Memadukan beberapa cuplikan visual dari video clip asli dengan adegan motion graphic sesuai gaya visual terpilih, kategori video clip, dan porsi komposisi (dilarang membuat 100% full motion graphic).
    3. Menyertakan SFX transisi dan running text per kata yang ditranskripsikan serta disinkronkan langsung ke audio asli video clip.
- **Persistensi Konfigurasi & Builder (`src/lib/studio-config.ts`, `src/features/prompt-studio/hooks/usePromptBuilder.ts`):**
  - Menambahkan `productionMode` dan `hybridClip` ke `DEFAULT_STUDIO_CONFIG` dan `parseStudioConfig` dengan sanitasi per-field serta migrasi aman untuk snapshot `localStorage` lama tanpa `productionMode`/`hybridClip`.
  - Mengekspos state dan setter mode Hybrid di `usePromptBuilder` serta menyimpan metadata mode & kategori pada `SavedDraft`.
- **Antarmuka Studio Prompt & Panel Output (`PromptControlsForm.tsx`, `HybridClipControlsSection.tsx`, `PromptOutputPanel.tsx`, `PromptStudio.tsx`, `SavedDraftsDrawer.tsx`, `src/lib/tour-guide.ts`):**
  - Menambahkan pemilih **Mode Produksi Video** (`Full Motion Graphic` dan `Hybrid (Motion Graphic + Video Clip)`) tepat di atas label **"Ide atau Topik Video Motion Graphic"**.
  - Saat mode **Hybrid** dipilih, mengganti panel kontrol Voice Over 2 tahap dengan `HybridClipControlsSection` (info audio asli video clip tanpa upload VO, 6 kategori video clip, 3 porsi cuplikan vs motion graphic, catatan momen/timestamp opsional, serta toggle SFX dan Running Text Per Kata).
  - Menyesuaikan `PromptOutputPanel` untuk menampilkan metadata kategori Hybrid, panduan 3 langkah upload video clip di Mode Tugas Gemini Web (tanpa upload audio VO terpisah), dan menyembunyikan kartu Prompt Tahap 2 VO.
- **Pengujian & Dokumentasi (`tests/prompt-engine.test.mts`, `tests/studio-config.test.mts`, `README.md`, `PRODUCT.md`):**
  - Menambahkan pengujian unit untuk paritas Full Motion Graphic, prompt Hybrid (termasuk seluruh 6 kategori dan 3 porsi komposisi), penempatan UI di atas label topik, serta persistensi/migrasi/sanitasi `localStorage`.

## Verifikasi & Pengujian
- `npm test`: **38/38 test lulus** (7 suite, termasuk test baru di `tests/prompt-engine.test.mts` dan `tests/studio-config.test.mts`).
- `npm run typecheck` (`tsc --noEmit`): lulus dengan 0 error.
- `npm run lint` (`eslint .`): lulus dengan 0 error dan 0 warning.
- `npm run build`: `next build` (Turbopack) berhasil mengompilasi dan melakukan prerender statis `/`, `/_not-found`, `/icon.png`, dan `/apple-icon.png`.
- Verifikasi browser langsung pada `http://localhost:3000/#studio`:
  - Memastikan pilihan `Full Motion Graphic` dan `Hybrid (Motion Graphic + Video Clip)` tampil tepat di atas `"Ide atau Topik Video Motion Graphic"`.
  - Memastikan perpindahan ke mode Hybrid menampilkan seluruh 6 kategori video clip, menyembunyikan kontrol upload VO 2 tahap & kartu Prompt Tahap 2, memperbarui prompt & alur Gemini Web, menyimpan draft Hybrid, serta bertahan setelah reload halaman via `localStorage`.
  - Memastikan `scrollWidth <= innerWidth` (0 horizontal overflow) pada `1440×900`, `768×1024`, `390×844`, dan `320×568`, serta tinggi seragam `52px` pada seluruh 6 tombol kategori di viewport `390px` melalui inspeksi DOM dan `vision_analyze`.

## Catatan Operasional / Deployment
Tidak memerlukan migrasi database maupun perubahan environment variable. Snapshot `localStorage` pengguna lama otomatis bermigrasi ke mode bawaan `full-motion`. Dapat langsung di-deploy.
