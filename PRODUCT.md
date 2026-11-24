# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Kreator konten dan edukator Indonesia yang memproduksi video motion graphic pendek, explainer, dan opener untuk TikTok, Instagram Reels, YouTube Shorts, YouTube, maupun presentasi tanpa perangkat lunak animasi desktop atau setup terminal lokal.

## Product Purpose

Menyediakan katalog referensi gaya visual dan studio perakit prompt terstruktur agar pengguna dapat memilih gaya motion graphic, menyusun brief produksi, dan menjalankan alur pembuatan naskah Voice Over hingga render video `.mp4` langsung melalui Mode Tugas di akun Gemini Web milik pengguna sendiri. Keberhasilan produk berarti pengguna dapat berpindah dari ide topik ke prompt siap tempel (serta pratinjau HTML opsional) tanpa hambatan teknis, tanpa biaya API server-side, dan tanpa hasil bergaya slide statis.

## Positioning

Pendamping 100% sisi klien (browser-only) khusus untuk **Mode Tugas Gemini Web** yang menyatukan seluruh 110 gaya visual resmi dari `@bang-motion` (11 gaya) dan `@lemo-opuscar` (99 gaya di 15 kategori), menyuntikkan awalan pemanggil keahlian (`@bang-motion` / `@lemo-opuscar`) serta aturan Anti-Slide secara otomatis, dan memandu **alur 2 tahap berbasis Voice Over** (naskah VO + storyboard terlebih dahulu → pengguna membuat audio VO di layanan TTS pihak ketiga → unggah audio ke chat Mode Tugas yang sama untuk render `.mp4` sinkron dengan SFX dan running text per kata).

## Operating Context

- Lingkungan eksekusi utama pengguna adalah **Gemini Web** (`gemini.google.com/app`) menggunakan **Mode Tugas** (bukan Obrolan) dan menu **Keahlian / Keterampilan** (pengganti Gem/Canvas pada antarmuka Gemini Web terbaru).
- Pengguna mengunduh berkas ZIP repositori `bangtutorial/bang-motion` dan `lemomo-ai/lemo-opuscar`, mengunggahnya ke Mode Tugas dengan prompt instalasi `"Tolong install kedua skill ini"`, lalu memanggil skill lewat `@bang-motion` atau `@lemo-opuscar`.
- Untuk alur dengan Voice Over, pengguna memakai layanan TTS pihak ketiga (seperti ElevenLabs V4 dengan 40 Audio Tags resmi dan pengaturan Stability 60%, CapCut TTS/Voice, atau dubbing manual) untuk menghasilkan file audio `.mp3`/`.wav` dari naskah Tahap 1 sebelum mengirim Prompt Tahap 2 bersama file audio tersebut.
- Jika Gemini Web menghasilkan berkas `index.html` (misalnya dari `@bang-motion`), pengguna dapat menempel dan mengujinya di **Live Stage Preview** dalam rasio `9:16`, `16:9`, atau `1:1` lalu mengunduhnya sebagai `.html`.
- Jalur alternatif **Gemini CLI / Lokal** (`npx skills add`, `git clone`, Node.js 18+, Python 3.10+, FFmpeg) didokumentasikan sebagai tab panduan sekunder bagi pengguna teknis.

## Capabilities and Constraints

- **Katalog 110 Gaya Visual**: 11 gaya `@bang-motion` (6 Explainer + 5 Opener & Promo) dan 99 gaya `@lemo-opuscar` (15 stasiun/kategori), lengkap dengan filter repositori, pencarian teks, filter kategori, palet referensi, bahasa visual, pola kamera, dan modal detail.
- **Studio Prompt Mode Tugas**: 4 preset brief cepat, kartu pratinjau gaya visual terpilih yang membuka modal **Katalog 110 Gaya Visual** (lengkap dengan filter repositori, pencarian, kategori stasiun, dan detail gaya), pilihan rasio aspek (`9:16` 1080×1920, `16:9` 1920×1080, `1:1` 1080×1080), durasi (`15s`, `30s`, `45s`, `60s` dengan estimasi 4–10 adegan), kontrol Voice Over 2 tahap (bahasa ID/EN, gaya narasi, target TTS, timecode, catatan intonasi + blok teks bersih), opsi wajib SFX dan running text per kata, aturan Anti-Slide, penyisipan detail gaya inline, serta Prompt Tahap 2.
- **Penyimpanan Lokal Tanpa Login**: Konfigurasi aktif Studio Prompt (`motion_graphic_studio_config_v1`), draft prompt (`motion_graphic_studio_drafts_v2`, maksimal 12 draft), dan status panduan tur interaktif (`motion_graphic_studio_tour_v1`) disimpan otomatis di `localStorage` browser tanpa autentikasi, akun pengguna, atau database backend.
- **Tour Guide Interaktif Langkah-demi-Langkah**: Panduan 10 langkah berurutan dari `Navbar` hingga `Footer` yang otomatis muncul bagi pengunjung baru, dilengkapi tombol **Lewati Tur**, navigasi langkah, pintasan keyboard (`ArrowLeft`, `ArrowRight`, `Escape`), serta tombol ikon informasi di `Navbar` untuk memutar ulang tur kapan saja.
- **Batasan Arsitektur Client-Only**: Aplikasi berjalan 100% di browser sebagai pendamping Gemini Web tanpa backend/API berbayar. Meskipun `package.json` masih mencantumkan `@google/genai` dan `metadata.json` mencantumkan `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` (serta `README.md` menyebut `GEMINI_API_KEY`), tidak ada rute API server-side yang aktif dan pekerjaan mendatang tidak boleh mengubah produk menjadi layanan API berbayar tanpa keputusan eksplisit.
- **Live Stage Preview HTML**: Sandbox `iframe` (`sandbox="allow-scripts"`) dengan demo bawaan untuk `9:16`, `16:9`, dan `1:1`, tombol putar ulang, dan unduh `.html`.
- **Ketergantungan Gambar Eksternal**: Pratinjau gaya katalog dimuat langsung dari `raw.githubusercontent.com` (`bangtutorial/bang-motion` dan `lemomo-ai/lemo-opuscar`) dengan fallback ke gambar galeri hero repo.

## Brand Commitments

- **Nama Merek Resmi**: `Motion Graphic Studio` (digunakan di `Navbar`, `Footer`, dan metadata halaman; catatan: `metadata.json` masih menyimpan nama lama `"Gerak Studio"` yang belum disinkronkan).
- **Bahasa & Terminologi**: Antarmuka dan copywriting menggunakan Bahasa Indonesia yang jelas dan praktis, sambil mempertahankan handle skill asli (`@bang-motion`, `@lemo-opuscar`), nama gaya resmi dari repositori sumber, serta istilah antarmuka Gemini Web (`Mode Tugas`, `Keahlian`, `Keterampilan`) dan istilah produksi baku (`Voice Over`, `SFX`, `Running Text`, `MP4`, `HTML`).
- **Atribusi Sumber**: Seluruh gaya dan panduan merujuk secara terbuka ke repositori `bangtutorial/bang-motion` dan `lemomo-ai/lemo-opuscar` serta `Gemini Web`.

## Evidence on Hand

- **Data Katalog Terverifikasi**: `src/lib/constants/bang-motion-styles.ts` (11 gaya), `src/lib/constants/lemo-opuscar-styles.ts` (99 gaya), `src/lib/constants/motion-styles.ts` (4 preset brief cepat), dan `src/lib/constants/stage-demos.ts` (3 template demo HTML untuk `9:16`, `16:9`, `1:1`).
- **Screenshot Panduan Gemini Web**: 4 tangkapan layar antarmuka Gemini Web di `public/assets/aistudio/` (`image_95924fc8.png`, `image_f35bb85a.png`, `image_96377cbf.png`, `image_4e370fea.png`).
- **Aset Lokal Tidak Terpakai**: 5 berkas gambar di `src/assets/images/` (`style_cartoon_collage_1795491766402.jpg`, `style_product_teardown_1795491765731.jpg`, `style_ukiyoe_woodblock_1795491766507.jpg`, `style_vintage_sketch_1795491813599.jpg`, `style_visual_journalism_1795491765679.jpg`) saat ini tidak direferensikan oleh komponen UI.
- **Ketiadaan Bukti yang Tidak Boleh Dikarang**: Tidak ada testimoni pengguna, studi kasus pelanggan, liputan pers, metrik jumlah pengguna/video, paket harga, atau klaim benchmark performa render di repositori.

## Product Principles

1. **Pendamping Tanpa Friksi & Tanpa Biaya Server**: Seluruh alur perancangan prompt dan pratinjau berjalan di browser pengguna dan mengeksekusi produksi video di akun Gemini Web milik pengguna sendiri.
2. **Kejujuran Alur 2 Tahap (Audio-First Sync)**: Untuk video bernarasi, naskah VO dan storyboard harus disepakati dan diubah menjadi audio terlebih dahulu sebelum render `.mp4`, agar durasi, SFX, dan running text per kata benar-benar sinkron.
3. **Anti-Slide sebagai Standar Gerak**: Setiap prompt yang dihasilkan menjaga agar output motion graphic memiliki gerak kamera dan transisi kontinyu, bukan sekadar slide teks statis.
4. **Kesetiaan pada Sumber Gaya Resmi**: Katalog mempertahankan 110 gaya, handle skill, jalur file, dan pratinjau resmi dari `bang-motion` dan `lemo-opuscar` tanpa mengarang gaya atau klaim fiktif.

## Accessibility & Inclusion

Antarmuka berbahasa Indonesia (`<html lang="id">`) dengan dukungan `prefers-reduced-motion` untuk menonaktifkan animasi scroll/transisi GSAP dan smooth scrolling bagi pengguna yang sensitif terhadap gerak, serta kontrol keyboard (`Escape` pada modal, `aria-label`, `role="tablist"`, `role="dialog"`).
