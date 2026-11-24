# PATCH v0.3.0 — Section Support Developer, Lightbox QRIS & Tautan Repositori Proyek

**Tanggal:** 24 November 2026
**Basis:** v0.2.0 — Tanpa migrasi database / tanpa breaking change pada fitur katalog, studio prompt, maupun live preview

## Latar Belakang / Masalah / Gejala
Pengguna membutuhkan bagian **Support Developer** di bagian paling bawah halaman (tepat di atas `Footer`) yang menampilkan gambar QRIS (`public/assets/images/support-qris.jpg`) beserta daftar kanal sosial media pengembang, tautan repositori proyek (`github.com/Yazz803/Make-Your-Own-Motion-Graphic-Video`) di `Navbar` dan `Footer`, serta dokumentasi **Support Developer** di `README.md`.

## Detail Perubahan / Solusi Teknis
- **Kontrak Tipe & Konstanta Dukungan (`src/types/support.ts`, `src/types/index.ts`, `src/lib/constants/support.ts`, `src/lib/constants/repos.ts`, `src/lib/constants/index.ts`):**
  - Menambahkan `REPO_LINKS.projectRepo` (`https://github.com/Yazz803/Make-Your-Own-Motion-Graphic-Video`), `REPO_LINKS.projectRepoSlug`, dan `FOOTER_ANCHOR_LINKS` (termasuk `#support`).
  - Menambahkan `DEVELOPER_SUPPORT` berisi metadata QRIS (`MUHAMMAD YAZID AKBAR`, `NMID ID1026623664764`, `/assets/images/support-qris.jpg`) dan 6 tautan sosial media resmi (Instagram, LinkedIn, GitHub, WhatsApp, Threads, Facebook).
- **Section Support Developer & Lightbox QRIS (`src/features/support/components/SupportDeveloperSection.tsx`, `QrisLightboxModal.tsx`, `src/features/support/index.ts`, `src/features/index.ts`, `src/features/workspace/components/MotionWorkspace.tsx`):**
  - Menambahkan section `#support` tepat di bawah `SkillGuideSection` dan di atas `Footer` dengan kartu QRIS interaktif (klik untuk memperbesar di modal lightbox + tombol `Unduh QRIS`), grid 6 kanal sosial media menggunakan `react-icons/fa6`, serta kartu tautan repositori proyek.
  - Memperbaiki `src/components/ui/Modal.tsx` agar merender dialog melalui `createPortal(..., document.body)` sehingga modal selalu berada di atas stacking context `<main>` dan `<Footer>`.
- **Tautan Repositori di Navbar & Footer (`src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`):**
  - Menambahkan tombol ikon GitHub ringkas di sisi kanan `Navbar` (layar `sm:` ke atas) serta tautan `Repositori GitHub` di menu navigasi seluler.
  - Menambahkan tautan `#support` (`Support Developer`) dan tautan repositori `Yazz803/Make-Your-Own-Motion-Graphic-Video` di `Footer` dengan pemecahan baris `<wbr />` yang rapi di layar sempit.
- **Dokumentasi & Pengujian (`README.md`, `tests/support-developer.test.mts`):**
  - Menambahkan bagian `## Support Developer` di `README.md` lengkap dengan gambar QRIS, tautan repositori proyek, dan 6 tautan sosial media.
  - Menambahkan suite test `tests/support-developer.test.mts` untuk memverifikasi aset QRIS, 6 URL sosial media, tautan repositori di `Navbar`/`Footer`, dan urutan section di `MotionWorkspace`.

## Verifikasi & Pengujian
- `impeccable detect --json` pada seluruh berkas UI yang diubah: `[]` (0 temuan).
- `npm run typecheck` (`tsc --noEmit`): lulus dengan 0 error.
- `npm run lint` (`eslint .`): lulus dengan 0 error dan 0 warning.
- `npm test`: 15/15 test lulus (4 suite: `nextjs-architecture compliance`, `motion-styles catalog integrity`, `prompt-engine`, `support developer & repository links`).
- `npm run build`: `next build` (Turbopack) berhasil mengompilasi dan melakukan prerender statis `/` dan `/_not-found`.
- Inspeksi visual browser pada `http://localhost:3000` (desktop `1440×900` dan mobile `390×844`) mengonfirmasi modal lightbox QRIS tampil bersih di atas `Navbar` dan `Footer`, tombol `Escape` menutup modal, dan slug repositori membungkus rapi di mobile.

## Catatan Operasional / Deployment
Tidak memerlukan migrasi database maupun perubahan environment variable. Pastikan berkas `public/assets/images/support-qris.jpg` ikut ter-deploy bersama folder `public/`.
