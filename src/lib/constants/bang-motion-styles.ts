import type { MotionStyle } from '@/types';
import { REPO_LINKS } from './repos';

// All 11 Official Style Gallery Presets from bangtutorial/bang-motion with direct repository photos
export const BANG_MOTION_STYLES: MotionStyle[] = [
  {
    id: 'bm-cartoon-collage',
    name: 'Cartoon Collage',
    repo: 'bang-motion',
    skillHandle: '@bang-motion',
    repoUrl: REPO_LINKS.bangMotion,
    stylePath: 'assets/starter-explainer-kartun.html',
    engine: 'HTML + CSS + GSAP',
    station: 'Bang Motion · Explainer',
    shortDesc:
      'Kertas krem bertekstur, potongan ilustrasi vektor datar, sorotan warna hangat, dan catatan tulisan tangan.',
    visualLanguage:
      'Latar kertas krem bertekstur, potongan ilustrasi vektor die-cut, label warna cerah, dan panah tinta tangan untuk sains serta edukasi.',
    cameraGrammar:
      'Kamera menggeser antar objek di atas papan kertas tanpa fade antar slide; objek melompat masuk dengan kurva elastic dan panah tergambar kontinyu.',
    bestFor: ['Explainer Sains', 'Konten Edukasi', 'Tutorial Singkat'],
    palette: ['#F5EFE0', '#1C1B18', '#F4C430', '#3A86C8', '#E06D3B'],
    imageUrl: `${REPO_LINKS.bangMotionRaw}/docs/gallery/11-cartoon-collage.jpg`,
    promptDirective:
      'Terapkan gaya Explainer "Cartoon Collage" dari @bang-motion (referensi docs/gallery/11-cartoon-collage.jpg): latar kertas krem bertekstur, potongan ilustrasi datar, sorotan warna, tulisan tangan, dan kamera papan kerja yang terus bergerak.',
  },
  {
    id: 'bm-visual-journalism',
    name: 'Visual Journalism',
    repo: 'bang-motion',
    skillHandle: '@bang-motion',
    repoUrl: REPO_LINKS.bangMotion,
    stylePath: 'assets/starter-explainer-jurnalisme.html',
    engine: 'HTML + CSS + GSAP',
    station: 'Bang Motion · Explainer',
    shortDesc:
      'Latar hitam pekat, foto dokumenter bertanda sumber, sapuan stabilo, dan anotasi garis putus-putus.',
    visualLanguage:
      'Kanvas hitam pekat (#0B0B0D), kliping foto nyata dengan tag sumber, coretan stabilo kuning keemasan, dan garis anotasi putus-putus.',
    cameraGrammar:
      'Zoom-in investigatif pada detail foto/dokumen, pan horizontal mengikuti garis bukti, dan animasi highlighter sweep yang tajam.',
    bestFor: ['Berita & Isu Terkini', 'Video Investigasi', 'Deep Dive'],
    palette: ['#0B0B0D', '#F4F4F5', '#EAB308', '#71717A', '#DC2626'],
    imageUrl: `${REPO_LINKS.bangMotionRaw}/docs/gallery/09-visual-journalism.jpg`,
    promptDirective:
      'Terapkan gaya Explainer "Visual Journalism" dari @bang-motion (referensi docs/gallery/09-visual-journalism.jpg): latar hitam pekat, foto dokumenter bertanda sumber, stabilo, garis putus-putus, dan gerak kamera investigatif kontinyu.',
  },
  {
    id: 'bm-vintage-sketch',
    name: 'Vintage Sketch',
    repo: 'bang-motion',
    skillHandle: '@bang-motion',
    repoUrl: REPO_LINKS.bangMotion,
    stylePath: 'assets/starter-explainer-sketsa.html',
    engine: 'HTML + CSS + GSAP',
    station: 'Bang Motion · Explainer',
    shortDesc:
      'Kertas sepia klasik, ilustrasi ukiran (engraving), tipografi serif tradisional, dan catatan merah karat.',
    visualLanguage:
      'Kertas perkamen sepia tua, seni ukiran/engraving klasik, tipografi serif arsip, serta anotasi garis merah karat untuk sejarah dan biografi.',
    cameraGrammar:
      'Gerak kamera perlahan melintasi lembar ensiklopedia antik dengan rotasi mikro, efek pengungkapan tinta, dan perpindahan lembar arsip.',
    bestFor: ['Sejarah & Arsip', 'Biografi Tokoh', 'Storytelling Budaya'],
    palette: ['#E8D8B9', '#2A1E15', '#8C3B2B', '#6B533B', '#C9AE7C'],
    imageUrl: `${REPO_LINKS.bangMotionRaw}/docs/gallery/10-vintage-sketch.jpg`,
    promptDirective:
      'Terapkan gaya Explainer "Vintage Sketch" dari @bang-motion (referensi docs/gallery/10-vintage-sketch.jpg): kertas sepia, ilustrasi engraving klasik, tipografi serif, catatan merah karat, dan animasi goresan pena.',
  },
  {
    id: 'bm-continuous-action',
    name: 'Continuous Action',
    repo: 'bang-motion',
    skillHandle: '@bang-motion',
    repoUrl: REPO_LINKS.bangMotion,
    stylePath: 'assets/starter-explainer.html',
    engine: 'HTML + SVG + GSAP',
    station: 'Bang Motion · Explainer',
    shortDesc:
      'Satu subjek yang tidak pernah berhenti bergerak, dengan angka dan peta hidup menyatu di dalam dunianya.',
    visualLanguage:
      'Dunia vektor kontinyu tempat satu subjek utama melintasi rute, angka, dan peta yang tertanam langsung di ruang adegan.',
    cameraGrammar:
      'Nol fade-to-black; kamera terus mengikuti subjek tanpa jeda menggunakan match-cut, tracking shot, dan transisi ruang mulus.',
    bestFor: ['Kecepatan & Rute', 'Proses & Alur', 'Explainer Dinamis'],
    palette: ['#0F1014', '#F2B705', '#FAFAFA', '#3B82F6', '#27272A'],
    imageUrl: `${REPO_LINKS.bangMotionRaw}/docs/gallery/05-continuous-action.jpg`,
    promptDirective:
      'Terapkan gaya Explainer "Continuous Action" dari @bang-motion (referensi docs/gallery/05-continuous-action.jpg): satu subjek persisten yang tidak pernah berhenti bergerak, angka serta peta menyatu di dalam dunia animasi.',
  },
  {
    id: 'bm-white-catalog',
    name: 'White Catalog',
    repo: 'bang-motion',
    skillHandle: '@bang-motion',
    repoUrl: REPO_LINKS.bangMotion,
    stylePath: 'assets/starter-explainer-katalog.html',
    engine: 'HTML + CSS Grid + GSAP',
    station: 'Bang Motion · Explainer',
    shortDesc:
      'Grid putih bersih, potongan foto produk tajam, serta paduan tipografi skrip dan sans-serif tebal.',
    visualLanguage:
      'Latar grid putih bersih ala katalog desain, potongan produk presisi, dan kontras tipografi skrip ekspresif bersama huruf sans tebal.',
    cameraGrammar:
      'Pergeseran grid mekanis presisi, ekspansi kolom sinkron, dan reveal elemen lewat clip-path mask yang bersih.',
    bestFor: ['Showcase Produk', 'Presentasi Brand', 'Katalog Modern'],
    palette: ['#F8F8F6', '#111113', '#E4E4E7', '#E11D48', '#71717A'],
    imageUrl: `${REPO_LINKS.bangMotionRaw}/docs/gallery/08-white-catalog.jpg`,
    promptDirective:
      'Terapkan gaya Explainer "White Catalog" dari @bang-motion (referensi docs/gallery/08-white-catalog.jpg): grid putih bersih, potongan objek/produk, paduan tipografi skrip + sans tebal, dan transisi grid presisi.',
  },
  {
    id: 'bm-cartoon-stage',
    name: 'Cartoon Stage',
    repo: 'bang-motion',
    skillHandle: '@bang-motion',
    repoUrl: REPO_LINKS.bangMotion,
    stylePath: 'assets/starter-explainer-panggung.html',
    engine: 'HTML + SVG + GSAP',
    station: 'Bang Motion · Explainer',
    shortDesc:
      'Satu panggung hidup per adegan dengan karakter kartun bersendi yang berakting langsung tanpa kotak teks kaku.',
    visualLanguage:
      'Panggung ilustratif penuh warna dengan karakter bersendi (rigged/jointed) yang ekspresif untuk edukasi berbasis tokoh.',
    cameraGrammar:
      'Kamera teater panggung dengan pan lembut, close-up ekspresi karakter, dan perpindahan properti secara fisik.',
    bestFor: ['Edukasi Karakter', 'Cerita Anak & Umum', 'Explainer Interaktif'],
    palette: ['#FEF9EF', '#1D3557', '#E63946', '#F4A261', '#2A9D8F'],
    imageUrl: `${REPO_LINKS.bangMotionRaw}/docs/gallery/06-cartoon-stage.jpg`,
    promptDirective:
      'Terapkan gaya Explainer "Cartoon Stage" dari @bang-motion (referensi docs/gallery/06-cartoon-stage.jpg): satu panggung hidup per adegan dengan karakter bersendi yang berakting secara visual.',
  },
  {
    id: 'bm-grainy-gradient',
    name: 'Grainy Gradient',
    repo: 'bang-motion',
    skillHandle: '@bang-motion',
    repoUrl: REPO_LINKS.bangMotion,
    stylePath: 'assets/starter-opener.html',
    engine: 'HTML + CSS + GSAP',
    station: 'Bang Motion · Opener & Promo',
    shortDesc:
      'Bentuk berlapis bercahaya dengan butiran grain halus dan kamera yang meluncur menembus kedalaman ruang.',
    visualLanguage:
      'Latar gelap dalam, bentuk gradien berpendar jenuh, tekstur film grain halus, dan tipografi grotesk bersih.',
    cameraGrammar:
      'Lapisan membuka secara dramatis, kamera menembus bentuk bercahaya (push-through) mengikuti orb pemandu.',
    bestFor: ['Peluncuran AI & Tech', 'Musik & Kreatif', 'Opener Premium'],
    palette: ['#090910', '#6366F1', '#F59E0B', '#EC4899', '#FAFAFA'],
    imageUrl: `${REPO_LINKS.bangMotionRaw}/docs/gallery/01-grainy-gradient.jpg`,
    promptDirective:
      'Terapkan gaya Opener "Grainy Gradient" dari @bang-motion (referensi docs/gallery/01-grainy-gradient.jpg): bentuk berlapis bercahaya dengan grain halus, tipografi grotesk bersih, dan kamera menembus lapisan.',
  },
  {
    id: 'bm-poster-colorblock',
    name: 'Poster Color-Block',
    repo: 'bang-motion',
    skillHandle: '@bang-motion',
    repoUrl: REPO_LINKS.bangMotion,
    stylePath: 'directions/poster-color-block',
    engine: 'HTML + CSS + GSAP',
    station: 'Bang Motion · Opener & Promo',
    shortDesc:
      'Tipografi raksasa terpotong tepi layar dan bidang warna solid yang menghantam tepat pada ketukan beat.',
    visualLanguage:
      'Blok warna solid tanpa gradien yang berganti tiap adegan dengan huruf display ultra-tebal bergaya poster.',
    cameraGrammar:
      'Block wipes tajam dan teks menghantam tepi frame tepat mengikuti ritme audio serta transisi beat.',
    bestFor: ['Promo Event', 'Musik & Kampanye', 'Kinetic Typography'],
    palette: ['#F2B705', '#09090B', '#E11D48', '#2563EB', '#FAFAFA'],
    imageUrl: `${REPO_LINKS.bangMotionRaw}/docs/gallery/02-kinetic-colorblock.jpg`,
    promptDirective:
      'Terapkan gaya Kinetic Typography "Poster Color-Block" dari @bang-motion (referensi docs/gallery/02-kinetic-colorblock.jpg): bidang warna solid berganti tiap adegan, huruf raksasa terpotong, dan block wipes sesuai ketukan.',
  },
  {
    id: 'bm-saas-ui-tour',
    name: 'Product Tour with Claims',
    repo: 'bang-motion',
    skillHandle: '@bang-motion',
    repoUrl: REPO_LINKS.bangMotion,
    stylePath: 'directions/saas-ui-tour',
    engine: 'HTML + CSS + GSAP',
    station: 'Bang Motion · Opener & Promo',
    shortDesc:
      'Antarmuka produk nyata yang terangkat dari dashboard sementara kamera menyorot langsung elemen yang diklik.',
    visualLanguage:
      'Komponen UI aplikasi yang dirakit hidup di layar, kursor bergerak natural, dan klaim manfaat singkat di samping aksi UI.',
    cameraGrammar:
      'Kamera mengikuti pergerakan kursor, melakukan zoom presisi ke kartu fitur yang aktif, lalu mundur menunjukkan gambaran besar.',
    bestFor: ['Demo SaaS', 'Dashboard B2B', 'Peluncuran Aplikasi'],
    palette: ['#0F172A', '#FFFFFF', '#2563EB', '#10B981', '#64748B'],
    imageUrl: `${REPO_LINKS.bangMotionRaw}/docs/gallery/03-saas-ui-tour.jpg`,
    promptDirective:
      'Terapkan gaya SaaS Demo "Product Tour with Claims" dari @bang-motion (referensi docs/gallery/03-saas-ui-tour.jpg): angkat komponen UI nyata dari dashboard, gerakkan kursor dan zoom kamera tepat ke elemen yang diklik.',
  },
  {
    id: 'bm-flat-vector',
    name: 'Flat Vector Illustration',
    repo: 'bang-motion',
    skillHandle: '@bang-motion',
    repoUrl: REPO_LINKS.bangMotion,
    stylePath: 'directions/flat-vector',
    engine: 'HTML + SVG + GSAP',
    station: 'Bang Motion · Opener & Promo',
    shortDesc:
      'Isian warna solid, ilustrasi tangan bergaya modern, UI vektor datar, dan bentuk memantul halus (overshoot).',
    visualLanguage:
      'Ilustrasi vektor datar berpalet solid, proporsi bersih, dan transisi bentuk geometris yang ramah.',
    cameraGrammar:
      'Animasi bentuk dengan kurva overshoot lembut, pergeseran kamera horizontal bersih, dan transformasi objek antar fitur.',
    bestFor: ['Fintech', 'Aplikasi Konsumen', 'Promo Fitur'],
    palette: ['#F8FAFC', '#1E293B', '#3B82F6', '#F59E0B', '#10B981'],
    imageUrl: `${REPO_LINKS.bangMotionRaw}/docs/gallery/04-flat-vector.jpg`,
    promptDirective:
      'Terapkan gaya Promo "Flat Vector Illustration" dari @bang-motion (referensi docs/gallery/04-flat-vector.jpg): warna solid, ilustrasi vektor datar dengan overshoot halus, dan komposisi bersih untuk aplikasi modern.',
  },
  {
    id: 'bm-flat-pop-photo',
    name: 'Flat Pop with Photos',
    repo: 'bang-motion',
    skillHandle: '@bang-motion',
    repoUrl: REPO_LINKS.bangMotion,
    stylePath: 'directions/flat-pop-photo',
    engine: 'HTML + CSS + GSAP',
    station: 'Bang Motion · Opener & Promo',
    shortDesc:
      'Potongan foto subjek yang muncul penuh energi bersama stiker dan bidang warna brand yang berubah pada pemicu visual.',
    visualLanguage:
      'Latar netral terang bergantian dengan bidang warna brand solid, potongan foto cutout tajam, stiker, dan huruf bulat tebal.',
    cameraGrammar:
      'Cutout bermunculan serempak mengikuti ketukan beat, warna latar berganti cepat lewat pemicu visual yang jelas.',
    bestFor: ['Kampanye Brand', 'E-Commerce', 'Aplikasi Konsumen'],
    palette: ['#FAFAFA', '#18181B', '#F2B705', '#EC4899', '#2563EB'],
    imageUrl: `${REPO_LINKS.bangMotionRaw}/docs/gallery/07-flat-pop-photo.jpg`,
    promptDirective:
      'Terapkan gaya Promo "Flat Pop with Photos" dari @bang-motion (referensi docs/gallery/07-flat-pop-photo.jpg): potongan foto cutout berenergi, stiker, tipografi bulat tebal, dan bidang warna brand yang berpindah pada ketukan.',
  },
];
