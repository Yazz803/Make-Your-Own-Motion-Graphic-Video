# PATCH v0.3.1 — Penerapan Logo Brand di Navbar & Favicon Browser

**Tanggal:** 24 November 2026
**Basis:** v0.3.0 — Tanpa migrasi database / tanpa breaking change pada fitur maupun kontrak data

## Latar Belakang / Masalah / Gejala
Pengguna menyediakan aset logo resmi (`public/assets/images/logo.jpg` dan `public/assets/images/lockup-logo.jpg`) untuk diterapkan pada website sebagai ikon brand di `Navbar` bersama wordmark `Motion Graphic Studio` serta sebagai favicon dan Apple Touch Icon di tab browser.

## Detail Perubahan / Solusi Teknis
- **Optimasi Aset Logo & Ikon Aplikasi (`public/assets/images/logo-mark.png`, `src/app/icon.png`, `src/app/apple-icon.png`):**
  - Mempertahankan berkas asli `public/assets/images/logo.jpg` dan `public/assets/images/lockup-logo.jpg` tetap utuh.
  - Menghasilkan `public/assets/images/logo-mark.png` (`256×256` PNG transparan dengan crop rapat `700×700` terpusat pada mark emerald) agar menyatu mulus di atas latar `#09090B` pada `Navbar`.
  - Menghasilkan `src/app/icon.png` (`512×512` rounded-square berlatar `#09090B`) dan `src/app/apple-icon.png` (`180×180` berlatar `#09090B`) agar Next.js App Router otomatis mendaftarkan `<link rel="icon">` dan `<link rel="apple-touch-icon">`.
- **Penerapan Brand Mark & Responsivitas Navbar (`src/components/layout/Navbar.tsx`):**
  - Menambahkan ikon `logo-mark.png` di sebelah kiri wordmark `Motion Graphic Studio` dalam bingkai `rounded-md` berborder `zinc-800/90`.
  - Menyesuaikan breakpoint navigasi desktop ke `lg:` (`1024px`) dengan jarak tautan adaptif (`gap-4 xl:gap-7`) sehingga `Navbar` bebas overflow di seluruh viewport (`390px`, `768px`, `1024px`, dan `1440px`).
- **Pengujian & Dokumentasi (`tests/support-developer.test.mts`, `README.md`):**
  - Menambahkan verifikasi keberadaan aset logo (`logo.jpg`, `lockup-logo.jpg`, `logo-mark.png`, `src/app/icon.png`, `src/app/apple-icon.png`) dan pemakaiannya di `Navbar.tsx`.

## Verifikasi & Pengujian
- `impeccable detect --json src/components/layout/Navbar.tsx`: `[]` (0 temuan).
- `npm run typecheck` (`tsc --noEmit`): lulus dengan 0 error.
- `npm run lint` (`eslint .`): lulus dengan 0 error dan 0 warning.
- `npm test`: 16/16 test lulus (4 suite).
- `npm run build`: `next build` (Turbopack) berhasil mengompilasi dan melakukan prerender statis `/`, `/_not-found`, `/icon.png`, dan `/apple-icon.png`.
- Inspeksi visual browser pada `http://localhost:3000` di viewport `1440×900`, `1024×768`, `768×1024`, dan `390×844` mengonfirmasi ikon `<head>` terpasang, logo menyatu bersih di `Navbar`, dan tidak ada horizontal overflow.

## Catatan Operasional / Deployment
Tidak memerlukan migrasi database maupun perubahan environment variable. Pastikan berkas `public/assets/images/logo-mark.png`, `src/app/icon.png`, dan `src/app/apple-icon.png` ikut ter-build dan ter-deploy.
