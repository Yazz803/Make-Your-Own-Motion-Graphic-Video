# PATCH v0.7.0 — Tour Guide Interaktif Langkah-demi-Langkah & Tombol Ulangi di Navbar

**Tanggal:** 25 November 2026
**Basis:** v0.6.1 — Tanpa migrasi database / tanpa breaking change pada kontrak data maupun `localStorage` yang sudah ada

## Latar Belakang / Masalah / Gejala
Pengunjung atau pengguna baru yang pertama kali membuka **Motion Graphic Studio** langsung dihadapkan pada banyak bagian interaktif dari atas hingga bawah halaman (Navbar, Hero & Gaya Aktif, Alur 4 Langkah, Katalog 110 Gaya Visual, Studio Prompt Mode Tugas, Live Stage Preview HTML, Panduan Instalasi Skill, Support Developer, dan Footer) tanpa panduan terarah yang menjelaskan fungsi tiap fitur secara berurutan.

## Detail Perubahan / Solusi Teknis
- **Definisi Langkah, Persistensi `localStorage`, & Geometri Penempatan (`src/types/tour.ts`, `src/types/index.ts`, `src/lib/tour-guide.ts`):**
  - Menambahkan 10 langkah tur berurutan dari bagian paling atas hingga paling bawah halaman (`navbar` → `hero` → `workflow` → `catalog` → `studio-form` → `studio-output` → `preview` → `panduan` → `support` → `footer`) dengan ringkasan informasi dan fungsi masing-masing fitur.
  - Menambahkan parser dan skema penyimpanan `localStorage` (`motion_graphic_studio_tour_v1`, versi `1`) untuk mencatat status `pending`, `completed`, atau `skipped` beserta `lastStepIndex` dan `updatedAt`.
  - Menambahkan fungsi geometri murni `computeSpotlightRect` dan `computeTourPopoverPosition` agar sorotan spotlight emerald dan kartu popover selalu berada di dalam batas viewport desktop, tablet, maupun seluler.
- **Modul Fitur Tour Guide (`src/features/tour-guide/`):**
  - `useTourGuide.ts`: mengelola status tur berbasis `useSyncExternalStore` (aman terhadap SSR/hidrasi React 19 dan fallback memori bila `localStorage` dibatasi), auto-start untuk pengunjung baru setelah jeda singkat `450ms`, navigasi langkah, tombol **Lewati Tur**, penyelesaian tur, serta pintasan keyboard (`ArrowRight`, `ArrowLeft`, `Escape`).
  - `useTourTargetRect.ts`: menggulir halaman secara halus ke target `[data-tour-target]` (dengan kompensasi tinggi `Navbar` sticky dan elemen sticky `PromptOutputPanel`) serta melacak posisi elemen melalui `requestAnimationFrame`, `setTimeout`/`setInterval` fallback, `scroll`, `resize`, dan `ResizeObserver`.
  - `TourGuidePopover.tsx` & `TourGuideOverlay.tsx`: merender backdrop pemblokir klik, bingkai spotlight emerald `#33E092`, dan dialog popover aksesibel (`role="dialog"`, `aria-modal="true"`) lengkap dengan indikator progres 10 segmen yang dapat diklik, tombol **Lewati Tur**, **Sebelumnya**, **Lanjut**, dan **Selesai**.
- **Tombol Ikon Informasi di Navbar & Penanda Target (`src/components/layout/Navbar.tsx`, `MotionWorkspace.tsx`, dan komponen section):**
  - Menambahkan tombol ikon informasi (`LuInfo`, hanya menampilkan ikon tanpa teks) di `Navbar` yang tampil di seluruh ukuran layar (`320px`–`1440px`) untuk memutar ulang tur kapan saja, serta memindahkan tombol animasi latar kosmik ke menu seluler pada layar `<640px` agar `Navbar` tetap bebas overflow.
  - Memasang atribut `data-tour-target` pada seluruh 10 bagian halaman dari `Navbar` hingga `Footer`.
- **Pengujian & Dokumentasi (`tests/tour-guide.test.mts`, `README.md`, `PRODUCT.md`):**
  - Menambahkan suite pengujian `tests/tour-guide.test.mts` (6 test) untuk memverifikasi urutan langkah, pemetaan `data-tour-target`, sanitasi `localStorage`, batas geometri viewport, dan integrasi komponen.

## Verifikasi & Pengujian
- `npm test`: **33/33 test lulus** (7 suite, termasuk 6 test baru di `tests/tour-guide.test.mts`).
- `npm run typecheck` (`tsc --noEmit`): lulus dengan 0 error.
- `npm run lint` (`eslint .`): lulus dengan 0 error dan 0 warning.
- `npm run build`: `next build` (Turbopack) berhasil mengompilasi dan melakukan prerender statis `/`, `/_not-found`, `/icon.png`, dan `/apple-icon.png`.
- Verifikasi browser langsung pada `http://localhost:3000`:
  - Desktop (`1440×900`): seluruh 10 langkah tur bergulir berurutan dari `Navbar` (`scrollY: 0`) hingga `Footer` (`scrollY: 8094`) dengan `inViewport: true`, `noOverlap: true`, navigasi keyboard (`ArrowRight`, `ArrowLeft`, `Escape`), penyimpanan `localStorage` (`completed` / `skipped`), tidak muncul otomatis setelah reload, dan dapat diputar ulang lewat tombol ikon informasi di `Navbar`.
  - Responsif (`320×568`, `390×844`, `768×1024`, `1024×768`): `scrollWidth <= innerWidth` (0 horizontal overflow), tombol ikon informasi tampil tanpa teks di `Navbar`, dan popover tur tampil utuh di dalam viewport.
  - Inspeksi visual `vision_analyze` pada tangkapan layar desktop (`1440×900`), tablet (`768×1024`), dan mobile (`390×844`) mengonfirmasi sorotan spotlight emerald dan popover terbaca tajam tanpa tumpang tindih.
  - Konsol browser mencatat `0` error runtime maupun hydration warning.

## Catatan Operasional / Deployment
Tidak memerlukan migrasi database maupun perubahan environment variable. Dapat langsung di-deploy.
