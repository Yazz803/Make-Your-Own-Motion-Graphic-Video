# PATCH v0.8.2 — Mode Hybrid Tanpa Kategori Clip, Durasi Fleksibel & Auto-Cut Jeda Hening

**Tanggal:** 25 November 2026
**Basis:** v0.8.1 — Tanpa migrasi database / backward-compatible penuh dengan snapshot `localStorage` dan draft tersimpan versi sebelumnya

## Latar Belakang / Masalah / Gejala
Pada mode **Hybrid (Motion Graphic + Video Clip)** sebelumnya (`v0.8.1`):
1. Bagian **Kategori Video Clip** (6 pilihan kategori) membuat formulir terlalu panjang dan membatasi arahan gaya editing secara kaku.
2. Aturan durasi sebelumnya mengunci video final harus 100% sama dengan durasi mentah video clip, padahal hasil video Hybrid yang mulus sering kali perlu **lebih pendek** (karena pemangkasan jeda hening / *dead air*) atau **lebih panjang** (karena penambahan intro/hook, jeda visual penekanan, atau outro motion graphic).
3. Belum ada opsi **Auto-Cut Jeda Hening (Dead Air)** beserta aturan sambungan audio-visual halus (*audio crossfade*, *J-cut / L-cut*, dan jembatan motion graphic) agar hasil akhir terasa semulus mungkin.

## Detail Perubahan / Solusi Teknis
- **Hapus Bagian "Kategori Video Clip" (`src/types/prompt.ts`, `src/types/index.ts`, `src/lib/constants/hybrid-clip.ts`, `src/lib/constants/index.ts`, `src/lib/studio-config.ts`, `HybridClipControlsSection.tsx`, `PromptControlsForm.tsx`, `PromptOutputPanel.tsx`, `PromptStudio.tsx`, `SavedDraftsDrawer.tsx`, `usePromptBuilder.ts`):**
  - Menghapus tipe `VideoClipCategory`, konstanta `VIDEO_CLIP_CATEGORIES` / `VIDEO_CLIP_CATEGORY_MAP`, serta seluruh kontrol UI dan metadata kategori video clip.
  - `parseStudioConfig` tetap aman membaca snapshot `localStorage` lama yang masih menyimpan field `category` (diabaikan secara bersih tanpa error).
  - Memperbarui label metadata di `PromptOutputPanel` dan `SavedDraftsDrawer` menjadi `Durasi fleksibel · Hybrid`.
- **Durasi Fleksibel & Auto-Cut Jeda Hening (`src/lib/prompt-engine.ts`, `HybridClipControlsSection.tsx`, `src/lib/studio-config.ts`):**
  - Menambahkan opsi `autoCutSilence: boolean` (default `true`) pada `HybridClipConfig` beserta kartu checkbox **Auto-Cut Jeda Hening (Dead Air)** di `HybridClipControlsSection`.
  - Memperbarui `buildHybridMotionPrompt` dan `buildHybridPhase2FollowUpPrompt` agar:
    1. Menyatakan secara eksplisit bahwa **durasi video final bersifat fleksibel** (boleh lebih pendek maupun lebih panjang dari durasi mentah video clip, tidak harus 100% sama).
    2. Mewajibkan **Auto-Cut Jeda Hening (Dead Air)** (saat aktif) dengan *breathing room* alami (~80–150 ms), **audio crossfade halus (30–80 ms)**, serta jembatan visual (**J-cut / L-cut**, adegan motion graphic, atau punch-in/out halus) agar tidak ada *jump cut* kasar maupun bunyi putus mendadak.
    3. Menjaga perpindahan visual antara video clip asli dan motion graphic hanya terjadi pada jeda alami ucapan dengan transisi sinematik semulus mungkin.
- **Pengujian & Dokumentasi (`tests/prompt-engine.test.mts`, `tests/studio-config.test.mts`, `README.md`, `PRODUCT.md`):**
  - Memperbarui unit test untuk memverifikasi penghapusan `Kategori Video Clip`, dukungan `autoCutSilence` (`true`/`false`), aturan durasi fleksibel (`boleh lebih pendek` / `lebih panjang`), serta migrasi aman snapshot `localStorage` lama yang masih memiliki `category`.

## Verifikasi & Pengujian
- `npm test`: **39/39 test lulus** (7 suite).
- `npm run typecheck` (`tsc --noEmit`): lulus dengan 0 error.
- `npm run lint` (`eslint .`): lulus dengan 0 error dan 0 warning.
- `npm run build`: `next build` (Turbopack) berhasil mengompilasi dan melakukan prerender statis `/`, `/_not-found`, `/icon.png`, dan `/apple-icon.png`.
- Verifikasi browser langsung pada `http://localhost:3000/#studio`:
  - Memastikan bagian `Kategori Video Clip` dan `Target Durasi Video` tidak tampil di mode Hybrid, kontrol `Auto-Cut Jeda Hening (Dead Air)` tampil dan aktif secara bawaan, header `PromptOutputPanel` menampilkan `Durasi fleksibel · Hybrid`, dan prompt memuat aturan durasi fleksibel serta auto-cut jeda halus.
  - Memastikan `scrollWidth <= innerWidth` (0 horizontal overflow) pada `1440×900`, `768×1024`, `390×844`, dan `320×568`, serta inspeksi visual `vision_analyze` pada desktop `1440×900` dan mobile `390×844`.

## Catatan Operasional / Deployment
Tidak memerlukan migrasi database maupun perubahan environment variable. Snapshot `localStorage` lama otomatis bermigrasi dengan `autoCutSilence: true` dan mengabaikan field `category` lama. Dapat langsung di-deploy.
