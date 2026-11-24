# PATCH v0.6.0 — Kartu Pratinjau Gaya Visual & Modal Katalog 110 Gaya di Studio Prompt

**Tanggal:** 24 November 2026
**Basis:** v0.5.0 — Tanpa migrasi database / tanpa breaking change pada kontrak `StudioConfigSnapshot` maupun `localStorage`

## Latar Belakang / Masalah / Gejala
Pada bagian **Gaya Visual & Pemanggil Keahlian** di Studio Prompt (`PromptControlsForm.tsx`), pemilihan gaya sebelumnya menggunakan elemen `<select>` bawaan browser yang hanya menampilkan teks nama gaya dan handle tanpa pratinjau visual, deskripsi, maupun palet warna. Pengguna harus menggulir kembali ke bagian atas halaman (`#katalog`) untuk melihat tampilan visual gaya sebelum memilihnya.

## Detail Perubahan / Solusi Teknis
- **Kartu Pratinjau Gaya Terpilih (`src/features/prompt-studio/components/PromptControlsForm.tsx`):**
  - Menghapus `<select id="style-select">` dan menggantinya dengan kartu tombol interaktif yang menampilkan gambar pratinjau `16:10` (`StylePreviewThumb`), handle skill (`@bang-motion` / `@lemo-opuscar`), kategori stasiun, 4 swatch palet warna, nama gaya, deskripsi singkat, kecocokan penggunaan, serta ajakan aksi **Pilih dari Katalog**.
  - Mengklik kartu membuka modal **Katalog 110 Gaya Visual**.
- **Modal Katalog 110 Gaya Visual (`src/features/catalog/components/StyleCatalogModal.tsx`, `src/features/catalog/index.ts`, `src/features/index.ts`):**
  - Menampilkan modal berjudul **Katalog 110 Gaya Visual** dengan tab filter repositori (`Semua (110)`, `bang-motion (11)`, `lemo-opuscar (99)`), kolom pencarian teks, filter kategori stasiun, grid kartu `StyleCard` dengan paginasi progresif (`12` awal + `Tampilkan 12 Gaya Lagi` / `Tampilkan Semua`), serta tampilan detail gaya inline (`← Kembali ke Katalog` + tombol **Gunakan Gaya Ini**) tanpa tumpukan modal bersarang.
  - Memilih gaya dari modal langsung memperbarui gaya aktif di Studio Prompt (sekaligus tersimpan otomatis ke `localStorage`) dan menutup modal.
- **Komponen & Hook Pendukung (`src/features/catalog/components/StyleDetailContent.tsx`, `StyleDetailModal.tsx`, `StylePreviewThumb.tsx`, `useStyleCatalogFilter.ts`):**
  - Mengekstrak `StyleDetailContent` dengan dukungan layout `stacked` (untuk `StyleDetailModal`) dan `split` (untuk tampilan detail inline di `StyleCatalogModal`).
  - Menambahkan parameter opsional `initialPageSize` pada `useStyleCatalogFilter` dan `className` pada `StylePreviewThumb`.
- **Pengujian & Dokumentasi (`tests/style-picker-modal.test.mts`, `PRODUCT.md`, `README.md`):**
  - Menambahkan suite pengujian `tests/style-picker-modal.test.mts` untuk memastikan `<select id="style-select">` telah digantikan oleh kartu pratinjau dan `StyleCatalogModal`.

## Verifikasi & Pengujian
- `impeccable detect --json` pada seluruh komponen UI yang diubah: `[]` (0 temuan).
- `npm test`: **27/27 test lulus** (6 suite).
- `npm run typecheck` (`tsc --noEmit`): lulus dengan 0 error.
- `npm run lint` (`eslint .`): lulus dengan 0 error dan 0 warning.
- `npm run build`: `next build` (Turbopack) berhasil mengompilasi dan melakukan prerender statis `/`, `/_not-found`, `/icon.png`, dan `/apple-icon.png`.
- Inspeksi browser langsung (`http://localhost:3000/#studio`) pada desktop (`1440×900`) dan mobile (`390×844`) beserta verifikasi visual `vision_analyze`: kartu pratinjau tampil utuh tanpa pemotongan teks thumbnail, modal **Katalog 110 Gaya Visual** terbingkai rapi di desktop dan penuh tepi-ke-tepi di mobile tanpa overflow horizontal, pencarian + tampilan detail split + pemilihan gaya (`Ukiyo-e`) memperbarui kartu, prompt, dan `localStorage` secara sinkron serta bertahan setelah reload halaman.

## Catatan Operasional / Deployment
Tidak memerlukan migrasi database maupun perubahan environment variable. Dapat langsung di-deploy.
