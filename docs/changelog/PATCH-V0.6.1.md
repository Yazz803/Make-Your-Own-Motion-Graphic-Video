# PATCH v0.6.1 — Penambahan Open Graph & Twitter Preview Image dari Lockup Logo

**Tanggal:** 25 November 2026
**Basis:** v0.6.0 — Tanpa migrasi database / tanpa breaking change pada fitur maupun kontrak data

## Latar Belakang / Masalah / Gejala
Metadata `openGraph` dan `twitter` (`summary_large_image`) pada `src/app/layout.tsx` belum menyertakan gambar pratinjau (`og:image` dan `twitter:image`), sehingga tautan yang dibagikan ke WhatsApp, X/Twitter, Discord, atau LinkedIn tidak menampilkan kartu pratinjau visual brand. Selain itu, berkas sumber `public/assets/images/lockup-logo.jpg` berasio `1:1` (`1024×1024`) sehingga berisiko terpotong bila langsung dipakai pada kartu lanskap `1.91:1`.

## Detail Perubahan / Solusi Teknis
- **Aset Open Graph `1200×630` (`public/assets/images/og-lockup.jpg`):**
  - Mempertahankan berkas asli `public/assets/images/lockup-logo.jpg` tetap utuh.
  - Menghasilkan `public/assets/images/og-lockup.jpg` (`1200×630`, rasio `1.91:1`, `59 KB`) dari `lockup-logo.jpg` dengan penskalaan Lanczos dan perluasan latar `#060606` yang mulus tanpa sambungan agar seluruh mark emerald dan wordmark `MOTION GRAPHIC STUDIO` berada di zona aman pratinjau media sosial.
- **Metadata Open Graph & Twitter (`src/app/layout.tsx`):**
  - Menambahkan `openGraph.images` (`url: '/assets/images/og-lockup.jpg'`, `width: 1200`, `height: 630`, `type: 'image/jpeg'`, `alt`) dan `twitter.images` pada `metadata`.
- **Pengujian & Dokumentasi (`tests/support-developer.test.mts`, `README.md`):**
  - Memperluas test aset brand untuk memverifikasi keberadaan `public/assets/images/og-lockup.jpg` serta konfigurasi `openGraph.images` dan `twitter.images` di `src/app/layout.tsx`.

## Verifikasi & Pengujian
- `npm test`: **27/27 test lulus** (6 suite).
- `npm run typecheck` (`tsc --noEmit`): lulus dengan 0 error.
- `npm run lint` (`eslint .`): lulus dengan 0 error dan 0 warning.
- `npm run build`: `next build` (Turbopack) berhasil mengompilasi dan melakukan prerender statis `/`, `/_not-found`, `/icon.png`, dan `/apple-icon.png`.
- Verifikasi HTML langsung pada `http://localhost:3000`: tag `<meta property="og:image">`, `og:image:width` (`1200`), `og:image:height` (`630`), `og:image:type` (`image/jpeg`), dan `<meta name="twitter:image">` terpasang lengkap, serta `/assets/images/og-lockup.jpg` merespons HTTP `200`.
- Inspeksi visual `vision_analyze` pada `public/assets/images/og-lockup.jpg`: tipografi dan wireframe emerald tajam, terpusat dengan margin aman di keempat sisi, dan bebas sambungan latar.

## Catatan Operasional / Deployment
Tidak memerlukan migrasi database. Pastikan `APP_URL` di environment produksi diatur ke domain publik HTTPS agar `metadataBase` menghasilkan URL absolut `og:image` yang dapat diakses crawler media sosial.
