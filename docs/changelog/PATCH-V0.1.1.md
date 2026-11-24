# PATCH v0.1.1 — Perapihan Struktur Codebase Sesuai Standar Next.js App Router

**Tanggal:** 24 November 2026
**Basis:** v0.1.0 — Tanpa migrasi database / tanpa breaking change pada fitur maupun kontrak UI

## Latar Belakang / Masalah / Gejala
Struktur codebase awal masih menempatkan folder `app/`, `components/`, `hooks/`, dan `lib/` secara datar di root repository sementara `src/assets/images/` berada terpisah di dalam `src/`. Beberapa berkas juga tumbuh menjadi monolit besar (`PromptStudio.tsx` 987 baris, `motion-styles.ts` 858 baris, `StyleCatalog.tsx` 450 baris, `SkillGuideSection.tsx` 444 baris), tipe domain masih bercampur dengan data/engine, ikon masih memakai `lucide-react` alih-alih `react-icons`, dan belum ada unit test maupun test kepatuhan arsitektur.

## Detail Perubahan / Solusi Teknis
- **Konsolidasi Root ke `src/` & Path Alias:** Memindahkan `app/`, `components/`, `hooks/`, dan `lib/` ke dalam `src/` serta memperbarui `tsconfig.json` (`@/*` → `./src/*`) agar selaras dengan struktur standar `.rules/nextjs-architecture.md`.
- **Pemisahan Kontrak Tipe (`src/types/`):** Memisahkan seluruh tipe domain ke `src/types/motion.ts`, `src/types/prompt.ts`, dan `src/types/guide.ts` dengan barrel export di `src/types/index.ts`.
- **Arsitektur Berbasis Fitur (`src/features/`):** Mengelompokkan modul domain ke `src/features/workspace/`, `src/features/catalog/`, `src/features/prompt-studio/`, `src/features/stage-preview/`, dan `src/features/skill-guide/`, serta memecah komponen besar menjadi sub-komponen dan custom hooks (`useStyleCatalogFilter`, `usePromptDrafts`, `usePromptBuilder`).
- **Komponen Bersama & Primitif UI (`src/components/` & `src/hooks/`):** Memindahkan `Navbar` dan `Footer` ke `src/components/layout/`, menambahkan primitif `Modal` dengan dukungan tombol `Escape` di `src/components/ui/Modal.tsx`, serta mengekstrak `useCopyFeedback` dan `copyTextToClipboard` untuk menghilangkan duplikasi logika salin teks.
- **Modularisasi Konstanta (`src/lib/constants/`):** Memecah `motion-styles.ts` menjadi `repos.ts`, `bang-motion-styles.ts`, `lemo-opuscar-styles.ts`, `motion-styles.ts`, `stage-demos.ts`, dan `skill-guides.ts` dengan barrel export di `src/lib/constants/index.ts`.
- **Standarisasi Ikon, Font & Tailwind v4:** Mengganti seluruh impor `lucide-react` ke `react-icons/lu`, mengganti swatch palet kartu dari `rounded-full` ke `rounded-sm`, menambahkan `@custom-variant dark` di `src/app/globals.css`, serta memuat variable font Google melalui `next/font/google` dan `metadataBase` di `src/app/layout.tsx`.
- **Pembersihan Konfigurasi & Penambahan Test:** Menghapus `.eslintrc.json` legacy dan impor tak terpakai di `eslint.config.mjs`, menambahkan `tsconfig.tsbuildinfo` ke `.gitignore`, serta menambahkan suite test di `tests/` (`npm test` dan `npm run typecheck`).

## Verifikasi & Pengujian
- `npm run typecheck` (`tsc --noEmit`): lulus dengan 0 error.
- `npx eslint . --max-warnings=0` & `npm run lint`: lulus dengan 0 error dan 0 warning.
- `npm test`: 12/12 test lulus (3 suite: `nextjs-architecture compliance`, `motion-styles catalog integrity`, `prompt-engine`).
- `npm run build`: `next build` (Turbopack) berhasil mengompilasi dan melakukan prerender statis rute `/` dan `/_not-found`.

## Catatan Operasional / Deployment
Tidak memerlukan migrasi database maupun perubahan environment variable. Aplikasi dapat langsung di-build dan di-deploy seperti biasa.
