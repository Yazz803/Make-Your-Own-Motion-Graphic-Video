---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/features/workspace/components/MotionWorkspace.tsx","src/app/layout.tsx","src/app/globals.css"]
---

# Surface Brief: Motion Graphic Studio Workspace

- **Scope:** `src/app/page.tsx` (and workspace modules under `src/features/`, `src/components/layout/`, `src/app/layout.tsx`, `src/app/globals.css`)
- **Visitor Mode:** `operate`
- **Audience & Job:** Kreator konten dan edukator Indonesia yang memilih gaya visual dari 110 preset resmi (`@bang-motion` & `@lemo-opuscar`), merakit prompt Mode Tugas Gemini Web (alur 2 tahap Voice Over → upload audio → MP4 + SFX + running text), menguji HTML opsional di Live Stage Preview, dan memasang skill di Gemini Web.
- **Primary Action:** Memilih gaya visual, menyusun & menyalin prompt Mode Tugas Gemini Web, serta membuka Gemini Web.
- **Constraints:** 100% client-side (tanpa backend/API berbayar), Bahasa Indonesia UI dengan handle/istilah teknis asli, `react-icons` wajib (nol inline `<svg>`), nol `rounded-full` status dot, nol `window.alert`/`window.confirm`, `prefers-reduced-motion` wajib dihormati.
- **Memorable Moment:** Latar kanvas kosmik berbintang dengan garis rasi dan meteor halus, dipadukan dengan ilustrasi kubus wireframe 3D isometrik hijau emerald di Hero, matriks stasiun gaya ala contribution graph, dan panduan instalasi bergaya timeline vertikal.

## Direction contract

THESIS: Mengganti tampilan studio amber-gelap generik menjadi ruang kerja kreator bergaya portofolio developer kosmik-emerald yang tenang, presisi, dan berkarakter kuat tanpa mengorbankan kecepatan alur kerja katalog-ke-prompt.

OWN-WORLD: Kanvas hitam ruang angkasa (`#09090B`) dengan partikel bintang, garis rasi tipis, dan jejak meteor cyan-biru halus; kartu zinc gelap (`#111114` / `rgba(39,39,43,0.4)`) berbingkai hairline `1px` (`#27272A`); aksen tunggal hijau emerald (`#33E092` / `#0CCE6B` / `#16A34A`) dengan teks gelap `#09090B` pada tombol aktif; tipografi display geometris bersudut tegas `Incognito`, body `Inter`, dan monospace `GitLab Mono`.

STORY: Pengunjung langsung mengenali studio ini sebagai alat produksi motion graphic Gemini Web yang serius, memilih gaya dari matriks/katalog 110 gaya, merakit prompt 2 tahap VO di panel studio, menguji HTML bila perlu, dan mengikuti timeline instalasi skill.

FIRST VIEWPORT: Navbar 3-zona berbingkai garis tipis bawah (wordmark kiri, 4 tautan tengah, tombol bulat toggle animasi latar + CTA Gemini Web kanan); Hero asimetris 2 kolom dengan judul `Incognito` besar, subjudul berpemisah pipa, CTA emerald + tautan ikon monokrom di kiri, serta kanvas kubus wireframe 3D isometrik hijau emerald di kanan, diikuti strip 4 langkah alur kerja.

FORM: User-pinned visual world dari screenshot referensi (mengungguli roll `concept-seed` key `6eebecbc`, mode `operate`, jalur `code-led`), diterjemahkan ke komponen standar web (`react-icons` + `<canvas>` tanpa inline `<svg>`).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
