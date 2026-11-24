## Mandatory Rules

Before modifying any code, read the relevant rules
from the `.rules/` directory.

## Rules Reference

- **Next.js App Router Architecture**: `.rules/nextjs-architecture.md` — App Router fullstack standards, server/client boundaries, screaming architecture, and React 19 rules.
- **Principles & Workflow**: `.rules/workflow-and-protocol.md` — Core engineering principles, 7-phase protocol, repo discipline, and Definition of Done.
- **Architecture & System Design**: `.rules/architecture.md` — Layered boundaries (Presentation → Application → Domain → Infrastructure) and decision-making.
- **Frontend Engineering**: `.rules/frontend.md` — State lifecycle (loading, empty, error), UI/UX resilience, accessibility, and component hygiene.
- **Backend & API Design**: `.rules/backend.md` — RESTful HTTP semantics, input validation, domain invariants, transactions, and error contracts.
- **Database & Data Integrity**: `.rules/database.md` — Relational modeling, database constraints, query optimization, indexing, and safe migrations.
- **Security & Privacy**: `.rules/security.md` — Authentication, authorization (IDOR prevention), secret isolation, and injection defense.
- **External Integrations**: `.rules/integrations.md` — Unreliable service handling, timeouts, exponential backoff, webhooks, and idempotency.
- **Testing & Code Quality**: `.rules/testing-and-quality.md` — Testing pyramid, meaningful assertions, clean code practices, and pre-delivery checks.
- **Performance & Scalability**: `.rules/performance.md` — Measurement-first optimization, query tuning, caching, and resource bounding.
- **Debugging & DevOps Operations**: `.rules/debugging-and-operations.md` — 8-step root-cause debugging, incident response, DevOps readiness, and living docs.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.

## Mandatory Changelog, Release Documentation & Automated Git Commit / Tag Workflow

Setiap kali AI agent menyelesaikan pekerjaan di repository ini — implementasi fitur, perbaikan bug, refactoring, optimasi, styling, penyesuaian instruksi, hingga konfigurasi repo — agent **WAJIB** mendokumentasikan perubahan (bila relevan), melakukan verifikasi, dan **secara otomatis menjalankan `git add` serta `git commit`** sebelum menyatakan pekerjaan selesai. Bila pekerjaan tersebut menaikkan versi aplikasi, agent juga **WAJIB membuat Git Tag rilis** untuk commit tersebut (Bagian 7).

Pengecualian: pekerjaan yang masih berupa eksplorasi, investigasi, atau diskusi tanpa perubahan berkas tidak memerlukan changelog maupun commit.

### 1. Tentukan Versi Terlebih Dahulu

- Baca versi saat ini dari sumber kebenaran versi di project ini, sesuai stack yang digunakan — contoh: `package.json` (Node.js), `pyproject.toml` / `setup.py` (Python), `Cargo.toml` (Rust), `go.mod` / file versi khusus (Go), atau file versi lain yang berlaku di repo.
- Tentukan kenaikan versi mengikuti aturan di Bagian 4.
- Gunakan format versi yang sama di semua tempat: tanpa awalan `v` di file versi (`1.9.0`), dengan awalan `v` di judul changelog, tag, dan pesan commit (`v1.9.0`).

### 2. Buat Berkas Dokumentasi Patch

- **Lokasi**: `docs/changelog/` — buat folder ini bila belum ada.
- **Format nama file**: `PATCH-V<version>.md`
  Contoh: `PATCH-V1.8.3.md`, `PATCH-V1.9.0.md`, `PATCH-V2.0.0.md`
- **Struktur isi**:

  ```markdown
  # PATCH v<version> — <Judul Ringkas & Informatif>

  **Tanggal:** <DD MMMM YYYY, contoh: 10 November 2026>
  **Basis:** v<versi_sebelumnya> — <Status skema DB / kontrak data: tanpa migrasi / tanpa breaking change, atau dengan migrasi / breaking change>

  ## Latar Belakang / Masalah / Gejala
  <Konteks kebutuhan fitur, atau gejala error bila berupa bug fix>

  ## Penyebab Akar (Root Cause)
  <Khusus bug fix: akar masalah teknis mengapa isu tersebut terjadi. Lewati bagian ini bila tidak relevan.>

  ## Detail Perubahan / Solusi Teknis
  <Daftar perbaikan, fitur baru, komponen, atau endpoint yang dimodifikasi beserta alasan implementasinya>

  ## Verifikasi & Pengujian
  <Hasil pengujian riil: unit test, type check, lint, build, atau smoke test yang benar-benar dijalankan>

  ## Catatan Operasional / Deployment
  <Apakah butuh migrasi database, regenerasi data, perubahan environment variable, langkah deployment khusus, atau dapat langsung di-deploy>
  ```

- Bila project tidak menggunakan dokumentasi patch per versi, catat perubahan yang sama di `CHANGELOG.md` di root repository sebagai pengganti.

### 3. Update Data Changelog Aplikasi (Bila Ada)

Bagian ini **hanya berlaku bila project memang memiliki berkas data changelog** yang ditampilkan ke pengguna, contoh: `src/data/changelog.json`, `changelog.json`, atau berkas sejenis.

Bila ada:

- Tambahkan entri baru pada urutan teratas (index `0`).
- Ubah `"badge"` pada rilis sebelumnya yang tadinya `"Terbaru"` menjadi `"Update"`, atau sesuaikan dengan jenis perubahannya.
- Sinkronkan versi di berkas data tersebut dengan versi di file versi project (Bagian 1).
- Struktur entri mengikuti format yang sudah ada di berkas tersebut. Contoh umum:

  ```json
  {
    "version": "v<version>",
    "date": "<DD MMMM YYYY>",
    "title": "<Judul Perubahan yang Jelas dan Informatif>",
    "badge": "Terbaru",
    "badgeColor": "emerald",
    "content": "### Fitur Baru\n- **Nama Fitur**: Deskripsi lengkap...\n\n### Perbaikan\n- **Nama Perbaikan**: Deskripsi lengkap..."
  }
  ```

Bila tidak ada berkas data changelog, lewati bagian ini — jangan membuat berkas baru hanya demi memenuhi aturan ini.

### 4. Aturan Versioning (Semantic Versioning)

Gunakan standar Semantic Versioning `MAJOR.MINOR.PATCH` berdasarkan dampak dan cakupan perubahan:

- **Patch (`+0.0.1`)** — `1.8.2` → `1.8.3`
  Perbaikan bug fungsional terisolasi, hotfix logika, penyesuaian styling/CSS kecil, perbaikan typo/copywriting, patch minor pada penanganan string/URL, penyesuaian konfigurasi kecil, penambahan guard sederhana, atau optimasi performa tanpa mengubah kontrak data.

- **Minor (`+0.1.0`)** — `1.8.2` → `1.9.0`
  Penambahan fitur baru yang signifikan, modul/halaman/endpoint baru, ekspansi skema database, atau integrasi kapabilitas baru yang tetap *backward-compatible*.

- **Major (`+1.0.0`)** — `1.8.2` → `2.0.0`
  Perubahan arsitektur besar (*breaking changes*), restrukturisasi skema database utama yang tidak *backward-compatible*, perubahan kontrak API yang mematahkan klien lama, atau penggantian fondasi framework/sistem.

Bila satu pekerjaan mencakup beberapa kategori, gunakan kenaikan versi tertinggi yang berlaku.

Perubahan murni dokumentasi atau instruksi agent yang tidak memengaruhi aplikasi yang dirilis tidak wajib menaikkan versi aplikasi, kecuali konvensi repo menyatakan sebaliknya.

### 5. Urutan Eksekusi Disiplin (Execution Checklist)

1. Tuntaskan perubahan kode dan perbaikan di repository.
2. Jalankan verifikasi nyata sesuai stack project — test, lint, type check, dan/atau build. Contoh: `npm` / `pnpm` / `yarn` / `bun run test|lint|build`, `pytest`, `cargo test`, `go test ./...`, atau perintah setara yang tersedia di project. Jangan mengklaim verifikasi yang tidak benar-benar dijalankan.
3. Tentukan nomor `<version>` berdasarkan cakupan perubahan (Bagian 4).
4. Tulis dokumentasi rilis di `docs/changelog/PATCH-V<version>.md` (bila ada kenaikan versi).
5. Update berkas data changelog aplikasi dan file versi project (bila ada — Bagian 3 dan 1).
6. Bila project menggunakan tool pengindeksan struktur kode (contoh: `graphify update .`), jalankan tool tersebut bila ada perubahan struktur/kode. Lewati bila tool tidak digunakan di project ini.
7. **Git Staging (`git add`)**: stage seluruh berkas perubahan yang relevan (`git add .` atau per berkas). Pastikan berkas sensitif (`.env`, kredensial, token, secret) tidak ikut ter-stage.
8. **Git Commit (`git commit`)**: buat commit dengan pesan informatif berstandar Conventional Commits (Bagian 6).
9. **Git Tag (`git tag`)**: bila commit ini adalah commit rilis (ada kenaikan versi), buat *annotated tag* untuk commit tersebut mengikuti Bagian 7. Lewati bila tidak ada kenaikan versi.
10. **Verifikasi Status Git**: jalankan `git status` dan `git tag -l "v<version>"` untuk memastikan commit dan tag (bila ada) berhasil tercatat, tag menunjuk ke commit rilis yang benar, dan tidak ada perubahan relevan yang tertinggal.

Jangan menjalankan `git push` — termasuk `git push origin v<version>` untuk tag — kecuali pengguna atau instruksi project secara eksplisit memintanya. Tag yang belum di-push hanya ada di lokal dan belum muncul di GitHub; laporkan status tersebut apa adanya dalam kesimpulan akhir.

### 6. Aturan Wajib Git Add & Git Commit Otomatis

- **Eksekusi otomatis tanpa menunggu konfirmasi tambahan:**
  Agent **DILARANG** mengakhiri sesi atau menyatakan pekerjaan selesai dengan menyisakan perubahan relevan berstatus *unstaged/uncommitted*. Begitu pekerjaan selesai dan verifikasi berhasil, agent **HARUS langsung menjalankan `git add` dan `git commit`**.

- **Bila verifikasi gagal:**
  Jangan melakukan commit sebagai pekerjaan selesai. Laporkan kegagalan verifikasi apa adanya, beserta langkah yang sudah dicoba.

- **Standar format pesan commit (Conventional Commits):**
  Gunakan format: `<type>(<scope>): <deskripsi perubahan>` — sertakan versi rilis bila ada, contoh: `(v1.9.0)`.

  - `feat`: penambahan fitur atau kapabilitas baru — `feat(learn): add auto-scroll and centering (v1.9.0)`
  - `fix`: perbaikan bug atau error — `fix(api): resolve 404 on progress route (v1.8.3)`
  - `refactor`: restrukturisasi kode tanpa mengubah fungsionalitas eksternal
  - `perf`: peningkatan performa atau efisiensi
  - `docs`: pembaruan dokumentasi, panduan, atau patch notes changelog
  - `style`: penyesuaian tampilan/CSS/formatting tanpa perubahan logika
  - `test`: penambahan atau perbaikan pengujian
  - `chore`: pemeliharaan repository, update dependensi, atau pembaruan konfigurasi/instruksi agent (`AGENTS.md`)

- **Keamanan & kebersihan repository:**
  - Dilarang keras men-stage atau meng-commit file `.env`, kredensial, secret key, token, atau file sementara yang seharusnya diabaikan git. Periksa `.gitignore` bila ragu.
  - Pastikan seluruh berkas terkait (kode, tes, changelog `.md`, berkas data changelog, dan file versi) terikat dalam commit yang rapi — satu commit per satu pekerjaan yang logis.
  - Jalankan `git status` dan konfirmasi bahwa commit telah tercipta sebelum memberikan kesimpulan akhir ke pengguna.

### 7. Aturan Git Tag Rilis

Git Tag adalah penanda permanen pada satu commit tertentu — fungsinya menandai versi rilis secara resmi, menjadi acuan untuk kembali ke kode versi tersebut, muncul di halaman Releases / Tags di GitHub setelah di-push, dan dapat menjadi pemicu CI/CD deployment. Tag berbeda dengan branch: branch bergerak mengikuti commit baru, tag diam di satu titik selamanya.

- **Hanya untuk commit rilis:**
  Buat tag **hanya** bila pekerjaan menaikkan versi aplikasi (Bagian 4) dan commit rilisnya sudah berhasil dibuat. Commit tanpa kenaikan versi — `docs`, `chore`, `style`, atau perbaikan kecil yang tidak dirilis — tidak diberi tag.

- **Format nama tag:**
  Gunakan `v<version>`, persis sama dengan versi di file versi project, judul `docs/changelog/PATCH-V<version>.md`, dan entri berkas data changelog. Contoh: versi `1.9.0` → tag `v1.9.0`. Dilarang memakai format lain (`1.9.0` tanpa `v`, `release-1.9.0`, dan sejenisnya) kecuali konvensi repo sudah menetapkannya sejak awal — ikuti konvensi yang sudah berjalan di repo tersebut.

- **Selalu gunakan annotated tag:**
  ```bash
  git tag -a v<version> -m "Release v<version> — <Judul Ringkas Rilis>"
  ```
  Annotated tag menyimpan pesan, tanggal, dan pembuat tag, sehingga cocok untuk rilis resmi. Jangan gunakan *lightweight tag* (`git tag v<version>` tanpa `-a` dan `-m`) untuk rilis.

- **Tag menunjuk ke commit rilis:**
  Buat tag **setelah** commit rilis selesai, dalam keadaan working tree bersih, sehingga tag menunjuk ke commit tersebut — bukan ke commit sebelumnya. Verifikasi dengan:
  ```bash
  git show v<version> --stat
  git rev-parse v<version>^{commit} HEAD
  ```
  Kedua hash dari perintah terakhir harus sama.

- **Dilarang menimpa atau memindahkan tag yang sudah ada:**
  Sebelum membuat tag, periksa dulu dengan `git tag -l "v<version>"`. Bila tag dengan versi itu sudah ada, **BERHENTI** — jangan hapus, jangan paksa dengan `-f` / `--force`, dan jangan gunakan ulang nomor versinya. Laporkan ke pengguna: versi tersebut sudah pernah dirilis, sehingga pekerjaan ini perlu nomor versi baru.

- **Push tag mengikuti aturan push:**
  Tag tidak ikut ter-push oleh `git push` biasa. Bila push memang diizinkan (pengguna atau instruksi project memintanya), push tag secara spesifik per versi — jangan gunakan `git push --tags` yang mendorong semua tag lokal sekaligus:
  ```bash
  git push origin v<version>
  ```
  Bila push tidak diizinkan, tag cukup dibuat di lokal dan statusnya dilaporkan ke pengguna.

- **GitHub Release (bila project menggunakannya):**
  Bila project menerbitkan GitHub Release dari tag, buat release dari tag yang sama dengan judul dan isi catatan rilis yang diambil dari `docs/changelog/PATCH-V<version>.md` yang bersangkutan. Bila project tidak menggunakan GitHub Release, lewati langkah ini — tag saja sudah cukup.

- **Konfirmasi akhir:**
  Dalam kesimpulan akhir ke pengguna, sebutkan nomor versi, hash commit rilis, dan nama tag yang dibuat, beserta status push-nya (sudah ter-push ke GitHub atau masih lokal).
