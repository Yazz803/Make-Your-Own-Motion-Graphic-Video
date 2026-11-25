# PATCH v0.8.1 — Penyempurnaan Mode Hybrid: Durasi Ikut Clip, Jeda Alami & Review Transkrip

**Tanggal:** 25 November 2026
**Basis:** v0.8.0 — Tanpa migrasi database / backward-compatible penuh dengan snapshot `localStorage` dan draft tersimpan versi sebelumnya

## Latar Belakang / Masalah / Gejala
Pada rilis awal mode **Hybrid (Motion Graphic + Video Clip)** (`v0.8.0`), ditemukan empat celah pada UI dan prompt yang dihasilkan:
1. Pemilih **Target Durasi Video** (`15s`–`60s`) dan estimasi jumlah adegan masih tampil di mode Hybrid, padahal durasi video Hybrid seharusnya mengikuti durasi video clip yang di-upload.
2. Frasa `"pindai momen visual terbaik"` dan `"mengikuti potongan terbaik video clip"` di prompt Hybrid membuka celah bagi agen untuk memotong atau menyusun ulang urutan clip, bertabrakan dengan aturan audio kontinu utuh.
3. Pembagian komposisi `50/50` dan jumlah adegan tetap berisiko memicu pergantian adegan di tengah kalimat karena belum ada larangan eksplisit untuk hanya berpindah di jeda alami ucapan.
4. Instruksi `"Susun Ringkasan Storyboard"` yang langsung diikuti `"Langsung Render"` bersifat ambigu — agen bisa berhenti setelah tabel atau langsung merender tanpa pengguna sempat memeriksa transkrip.

## Penyebab Akar (Root Cause)
- `PromptControlsForm.tsx`, `PromptOutputPanel.tsx`, `SavedDraftsDrawer.tsx`, dan `buildHybridMotionPrompt` masih mewarisi asumsi durasi tetap (`durationSec` / `estimateSceneCount`) dari mode Full Motion Graphic.
- `buildHybridMotionPrompt` dan `HYBRID_CLIP_BALANCES` belum memisahkan secara tegas antara **trek audio/timeline yang utuh** dengan **lapisan visual yang berganti hanya pada jeda alami**, serta belum menyediakan kontrol eksplisit antara alur review transkrip 2 tahap vs render langsung 1 giliran.

## Detail Perubahan / Solusi Teknis
- **Sembunyikan Target Durasi Video di Mode Hybrid (`PromptControlsForm.tsx`, `PromptOutputPanel.tsx`, `SavedDraftsDrawer.tsx`):**
  - Menyembunyikan blok **Target Durasi Video** saat `productionMode === 'hybrid-clip'` dan melebarkan grid **Layout & Rasio Aspek** menjadi satu kolom penuh agar tidak menyisakan ruang kosong.
  - Mengganti metadata `~N adegan` / `N dtk` pada `PromptOutputPanel` dan `SavedDraftsDrawer` menjadi `Durasi ikut clip` saat mode Hybrid aktif.
- **Hapus Celah "Potongan Terbaik" & Wajibkan Jeda Alami (`src/lib/prompt-engine.ts`, `src/lib/constants/hybrid-clip.ts`):**
  - Menghapus seluruh referensi `durationSec`, `estimateSceneCount`, `"potongan terbaik"`, dan `"momen visual terbaik"` dari `buildHybridMotionPrompt`.
  - Menambahkan aturan eksplisit **Audio & Timeline Utuh (DILARANG Memotong/Mengacak Clip)** dan **WAJIB Transisi Hanya di Jeda Alami (DILARANG Memotong di Tengah Kalimat)**, serta memperbarui deskripsi 6 kategori dan 3 porsi komposisi agar fleksibel mengikuti jeda kalimat/napas pembicara.
- **Hilangkan Ambiguitas Storyboard vs Render (`src/types/prompt.ts`, `src/lib/studio-config.ts`, `HybridClipControlsSection.tsx`, `usePromptBuilder.ts`, `PromptOutputPanel.tsx`):**
  - Menambahkan opsi `reviewBeforeRender` (default `true`) pada `HybridClipConfig` dengan switch **Audio Asli Video Clip · Review Transkrip Dulu** di `HybridClipControlsSection`.
  - Saat aktif (`true`): prompt mewajibkan **Tahap 1** berhenti setelah menyajikan transkrip bertimestamp dan tabel Storyboard Hybrid di jeda alami, lalu menyediakan **Prompt Tahap 2 (Setelah Cek Transkrip & Storyboard)** (`buildHybridPhase2FollowUpPrompt`) untuk konfirmasi render `.mp4` tanpa upload audio VO.
  - Saat nonaktif (`false`): prompt mewajibkan **Alur Eksekusi Langsung 1 Giliran (.MP4)** yang melarang agen berhenti di tabel storyboard dan mewajibkan penyertaan transkrip + pemetaan segmen bersama hasil `.mp4`.
- **Pengujian (`tests/prompt-engine.test.mts`, `tests/studio-config.test.mts`):**
  - Menambahkan asersi bahwa prompt Hybrid bebas dari frasa `"potongan terbaik"` / `"momen visual terbaik"` / durasi tetap, menguji kedua cabang `reviewBeforeRender` (`true` & `false`), `buildHybridPhase2FollowUpPrompt`, penyembunyian `Target Durasi Video` di UI, serta sanitasi/migrasi `reviewBeforeRender` di `localStorage`.

## Verifikasi & Pengujian
- `npm test`: **39/39 test lulus** (7 suite).
- `npm run typecheck` (`tsc --noEmit`): lulus dengan 0 error.
- `npm run lint` (`eslint .`): lulus dengan 0 error dan 0 warning.
- `npm run build`: `next build` (Turbopack) berhasil mengompilasi dan melakukan prerender statis `/`, `/_not-found`, `/icon.png`, dan `/apple-icon.png`.
- Verifikasi browser langsung pada `http://localhost:3000/#studio`:
  - Memastikan `Target Durasi Video` tampil di mode Full Motion Graphic dan hilang di mode Hybrid, metadata panel output menampilkan `Durasi ikut clip`, prompt bebas dari `"potongan terbaik"`, memuat aturan `Audio & Timeline Utuh` dan `WAJIB Transisi Hanya di Jeda Alami`, serta switch `Review Transkrip Dulu` mengganti alur prompt dan visibilitas kartu Prompt Tahap 2 secara sinkron.
  - Memastikan `scrollWidth <= innerWidth` (0 horizontal overflow) pada `1440×900`, `768×1024`, `390×844`, dan `320×568`, serta inspeksi visual `vision_analyze` pada tangkapan layar desktop `1440×900`.

## Catatan Operasional / Deployment
Tidak memerlukan migrasi database maupun perubahan environment variable. Snapshot `localStorage` lama otomatis mendapatkan `reviewBeforeRender: true`. Dapat langsung di-deploy.
