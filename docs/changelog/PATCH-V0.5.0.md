# PATCH v0.5.0 — Persistensi Konfigurasi Studio Prompt di localStorage Browser

**Tanggal:** 24 November 2026
**Basis:** v0.4.0 — Tanpa migrasi database / tanpa breaking change pada kontrak `SavedDraft` maupun draft tersimpan di `localStorage`

## Latar Belakang / Masalah / Gejala
Sebelumnya, hanya daftar **Draft Tersimpan** (`motion_graphic_studio_drafts_v2`) yang disimpan di `localStorage`. Seluruh pengaturan aktif di **Studio Prompt** (gaya visual terpilih, rasio aspek, durasi, topik, target penonton, pengaturan Voice Over, SFX, running text, aturan Anti-Slide, dan detail gaya inline) masih memakai `useState` lokal sehingga kembali ke nilai bawaan setiap kali pengguna me-refresh halaman browser.

## Detail Perubahan / Solusi Teknis
- **Kontrak & Parser Konfigurasi Studio (`src/types/prompt.ts`, `src/types/index.ts`, `src/lib/studio-config.ts`):**
  - Mengekspor tipe `StudioConfigSnapshot` dan menggunakannya bersama `SavedDraft['configSnapshot']`.
  - Menambahkan `STUDIO_CONFIG_STORAGE_KEY` (`motion_graphic_studio_config_v1`), `DEFAULT_STUDIO_CONFIG`, `resolveMotionStyleById`, dan `parseStudioConfig` untuk memvalidasi serta menyanitasi setiap field dari `localStorage` secara defensif (aman terhadap JSON rusak, field hilang, atau nilai enum tidak valid, sambil tetap mempertahankan string kosong `""` dan flag `false` yang disengaja pengguna).
- **Hook Sinkronisasi `localStorage` SSR-Safe (`src/hooks/useStudioConfig.ts`, `src/hooks/index.ts`):**
  - Menggunakan `useSyncExternalStore` (selaras dengan `usePromptDrafts`) agar server render dan hidrasi awal tetap konsisten tanpa *hydration mismatch* maupun `setState` di dalam `useEffect`, sekaligus mendukung sinkronisasi antar-komponen dan antar-tab (`storage` event) serta fallback memori bila akses `localStorage` dibatasi.
- **Integrasi Workspace & Prompt Builder (`src/features/workspace/components/MotionWorkspace.tsx`, `src/features/prompt-studio/hooks/usePromptBuilder.ts`):**
  - Menghubungkan `selectedStyle` dan `aspectRatio` di `MotionWorkspace` serta seluruh kontrol di `usePromptBuilder` ke `useStudioConfig()`.
  - Memastikan `applyPreset` dan `loadDraft` memperbarui konfigurasi tersimpan secara atomik dan tervalidasi.
- **Pengujian & Dokumentasi (`tests/studio-config.test.mts`, `PRODUCT.md`, `README.md`):**
  - Menambahkan suite pengujian `tests/studio-config.test.mts` untuk memverifikasi default config, fallback JSON rusak, pemulihan nilai kustom (termasuk string kosong dan boolean `false`), sanitasi per-field, resolusi gaya, dan integrasi hook.

## Verifikasi & Pengujian
- `npm test`: **25/25 test lulus** (5 suite: `nextjs-architecture compliance`, `motion-styles catalog integrity`, `prompt-engine`, `studio-config localStorage persistence`, `support developer & repository links`).
- `npm run typecheck` (`tsc --noEmit`): lulus dengan 0 error.
- `npm run lint` (`eslint .`): lulus dengan 0 error dan 0 warning.
- `npm run build`: `next build` (Turbopack) berhasil mengompilasi dan melakukan prerender statis `/`, `/_not-found`, `/icon.png`, dan `/apple-icon.png`.
- Pengujian browser langsung pada `http://localhost:3000/#studio`: mengubah gaya visual, rasio aspek (`16:9`), durasi (`60s`), topik, target penonton, bahasa VO (`en`), gaya narasi (`formal`), target TTS (`capcut`), serta checkbox, lalu melakukan `Page.reload(ignoreCache=true)` — seluruh kontrol dan prompt hasil tetap identik setelah refresh, posisi kursor textarea stabil saat mengetik di tengah teks, dan nol error hidrasi.

## Catatan Operasional / Deployment
Tidak memerlukan migrasi database maupun perubahan environment variable. Konfigurasi aktif pengguna disimpan di `localStorage` browser dengan kunci `motion_graphic_studio_config_v1`.
