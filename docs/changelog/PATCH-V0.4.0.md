# PATCH v0.4.0 — Integrasi ElevenLabs V4 Audio Tags & Panduan Stability 60% di Studio Prompt

**Tanggal:** 24 November 2026
**Basis:** v0.3.1 — Tanpa migrasi database / tanpa breaking change pada kontrak `TtsTarget` maupun draft tersimpan di `localStorage`

## Latar Belakang / Masalah / Gejala
Pada bagian **Studio Prompt Mode Tugas Gemini Web** (`PromptStudio`), opsi target layanan Voice Over sebelumnya masih berlabel `ElevenLabs` generik dan instruksi prompt meminta blok `"Naskah Bersih Siap Tempel ke TTS"` tanpa tag apa pun. Untuk **ElevenLabs V4**, naskah Voice Over justru wajib menyertakan Audio Tags resmi (`[...]`) dari `docs/eleven-labs/tags-eleven-labs-v4.json`, dan pengguna perlu diarahkan untuk mengatur slider **Stability** di web ElevenLabs V4 menjadi **60%** (rentang *Creative → Robust*) agar tag terbaca ekspresif namun pelafalan tetap stabil.

## Detail Perubahan / Solusi Teknis
- **Sumber Kebenaran Tunggal Audio Tags ElevenLabs V4 (`src/lib/constants/elevenlabs-v4-tags.ts`, `src/lib/constants/index.ts`):**
  - Mengimpor langsung `docs/eleven-labs/tags-eleven-labs-v4.json` (40 tag resmi dalam 5 kategori: `Emotion`, `Delivery`, `Vocalizations`, `Character`, dan `Sound Effects`) serta mengekspor `ELEVENLABS_V4_ALL_TAGS`, `ELEVENLABS_V4_TAG_GROUPS`, `ELEVENLABS_V4_TAG_FORMAT`, dan `ELEVENLABS_V4_STABILITY_PERCENT = 60`.
- **Pembaruan Prompt Engine (`src/lib/prompt-engine.ts`):**
  - Memperbarui catatan target `elevenlabs` menjadi **ElevenLabs V4**.
  - Saat `voiceOver.enabled` aktif dan `ttsTarget === 'elevenlabs'`, prompt Tahap 1 wajib menyertakan instruksi penggunaan Audio Tags ElevenLabs V4 beserta seluruh 40 tag resmi yang dikelompokkan per kategori (baik saat opsi catatan intonasi aktif maupun nonaktif).
  - Mengubah instruksi blok siap tempel untuk `elevenlabs` menjadi **"Naskah Siap Tempel ke ElevenLabs V4"** yang membersihkan timecode/label adegan namun **tetap mempertahankan Audio Tags `[...]`**, sementara target `capcut` dan `general` tetap mempertahankan blok bersih tanpa tag.
  - Menambahkan pengingat pengaturan **Stability 60%** pada langkah 3 Tahap 1 untuk target ElevenLabs V4.
- **Pembaruan UI Studio Prompt (`VoiceOverControlsSection.tsx`, `ElevenLabsV4Guidance.tsx`, `PromptOutputPanel.tsx`, `PromptStudio.tsx`):**
  - Mengubah label opsi dropdown `Target Layanan VO` dari `ElevenLabs` menjadi `ElevenLabs V4` (tetap memakai nilai `'elevenlabs'` agar kompatibel dengan draft tersimpan).
  - Menambahkan komponen `ElevenLabsV4Guidance` yang tampil saat `ElevenLabs V4` dipilih: menampilkan instruksi pengaturan **Stability 60%** lengkap dengan bilah referensi visual `Creative → Natural → Robust` serta daftar 40 Audio Tags resmi yang dapat dibuka/tutup.
  - Meneruskan `ttsTarget` dari `PromptStudio` ke `PromptOutputPanel` agar langkah `03.` pada panel output ikut mengingatkan pengguna menempelkan naskah bertag ke **ElevenLabs V4** dengan **Stability 60%**.
- **Pengujian & Dokumentasi (`tests/prompt-engine.test.mts`, `PRODUCT.md`, `README.md`):**
  - Menambahkan pengujian unit untuk memverifikasi seluruh 40 tag dari `docs/eleven-labs/tags-eleven-labs-v4.json` muncul di prompt ElevenLabs V4 (baik dengan maupun tanpa opsi intonasi), target non-ElevenLabs tetap menghasilkan blok bersih tanpa tag, serta verifikasi UI `ElevenLabs V4` dan `Stability 60%`.

## Verifikasi & Pengujian
- `impeccable detect --json` pada `ElevenLabsV4Guidance.tsx`, `VoiceOverControlsSection.tsx`, `PromptOutputPanel.tsx`, dan `PromptStudio.tsx`: `[]` (0 temuan).
- `npm test`: 19/19 test lulus (4 suite: `nextjs-architecture compliance`, `motion-styles catalog integrity`, `prompt-engine`, `support developer & repository links`).
- `npm run typecheck` (`tsc --noEmit`): lulus dengan 0 error.
- `npm run lint` (`eslint .`): lulus dengan 0 error dan 0 warning.
- `npm run build`: `next build` (Turbopack) berhasil mengompilasi dan melakukan prerender statis `/`, `/_not-found`, `/icon.png`, dan `/apple-icon.png`.
- Inspeksi visual browser pada `http://localhost:3000/#studio` di viewport desktop (`1440×900`) dan mobile (`390×844`) mengonfirmasi dropdown `ElevenLabs V4`, kartu panduan `Stability: 60%`, daftar 40 tag yang dapat diperluas, langkah `03.` di `PromptOutputPanel`, serta nol horizontal overflow.

## Catatan Operasional / Deployment
Tidak memerlukan migrasi database maupun perubahan environment variable. Pastikan berkas `docs/eleven-labs/tags-eleven-labs-v4.json` ikut tersimpan di repositori karena diimpor langsung oleh `src/lib/constants/elevenlabs-v4-tags.ts`.
