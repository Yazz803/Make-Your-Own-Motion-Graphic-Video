import type { MotionStyle, StationConfig } from '@/types';
import { REPO_LINKS } from './repos';

// All 99 Official Styles across 15 Stations from lemomo-ai/lemo-opuscar
// Every single style uses its exact official poster image: docs/readme/cards/<slug>-poster.webp
const LEMO_STATIONS: StationConfig[] = [
  {
    station: '01 · Edit & Documentary',
    engine: 'HTML5 Canvas + FFmpeg',
    defaultPalette: ['#0B0C10', '#F4F4F5', '#EAB308', '#DC2626', '#52525B'],
    cameraGrammar:
      'Ritme penyuntingan dokumenter tegas dengan split-screen sinkron, highlight bukti, dan tempo informasi yang cepat.',
    bestFor: ['Dokumenter', 'Berita & Investigasi', 'Analisis Cepat'],
    visualPrefix: 'Gaya penyuntingan & dokumenter dari lemo-opuscar',
    items: [
      { slug: 'caption-news', name: 'Caption News', demoTitle: 'The Bee Ledger', desc: 'Berita visual cepat bertumpu pada caption besar, foto penuh, dan sorotan kalimat kunci.' },
      { slug: 'newsreel', name: '1920s Newsreel', demoTitle: 'Knock-Knee Alert', desc: 'Warta berita klasik era 1920-an dengan kartu judul berbingkai, grain film, dan transisi iris.' },
      { slug: 'countdown', name: 'Live Countdown Split-screen', demoTitle: 'Counting Itself Down', desc: 'Layar terbelah multi-sudut dengan penghitung waktu mundur dan ketegangan real-time.' },
      { slug: 'city-symphony', name: 'City Symphony', demoTitle: 'One Day in New York', desc: 'Montase ritmis kehidupan kota dan arsitektur yang dipotong mengikuti denyut tempo.' },
      { slug: 'visual-investigation', name: 'Visual Investigation', demoTitle: 'The Hindenburg', desc: 'Rekonstruksi forensik kronologi kejadian dengan peta, stempel waktu, dan sorotan bukti.' },
      { slug: 'kino-montage', name: 'Constructivist Montage', demoTitle: '410 Days', desc: 'Komposisi diagonal avant-garde, blok merah-hitam-krem, dan potongan geometris tajam.' },
      { slug: 'telestrator', name: 'Sports Telestrator', demoTitle: 'Freeze Frame', desc: 'Analisis taktik layar siaran dengan lingkaran anotasi, panah pergerakan, dan garis strategi.' },
      { slug: 'news-package', name: 'Broadcast News Package', demoTitle: 'The Week in AI', desc: 'Paket siaran berita televisi lengkap dengan lower-third, ticker, dan grafis studio.' },
    ],
  },
  {
    station: '02 · Painting & Illustration',
    engine: 'HTML5 Canvas Procedural',
    defaultPalette: ['#F6F1E7', '#2D5A7B', '#C96F53', '#6E8B74', '#2F2721'],
    cameraGrammar:
      'Pergerakan kamera lembut menyusuri sapuan kuas berlapis dengan transisi larut dan tekstur kanvas hidup.',
    bestFor: ['Storytelling Emosional', 'Edukasi & Sains', 'Film Pendek Artistik'],
    visualPrefix: 'Gaya lukisan & ilustrasi manual dari lemo-opuscar',
    items: [
      { slug: 'crayon-book', name: 'Crayon Picture Book', demoTitle: "The Moon Can't Sleep", desc: 'Ilustrasi buku cerita bergaya krayon lilin hangat dengan goresan tekstur lembut dan warna ceria.' },
      { slug: 'watercolor', name: 'Watercolor Brush', demoTitle: 'Follow the Rain', desc: 'Simulasi cat air wet-on-wet dengan rembesan pigmen lembut dan granulasi kertas serat dingin.' },
      { slug: 'impasto', name: 'Impasto Oil Painting', demoTitle: 'The Colour of Rain', desc: 'Sapuan cat minyak tebal bertekstur pisau palet dengan kedalaman warna dan cahaya dramatis.' },
      { slug: 'urban-sketch', name: 'Urban Sketch · Pen & Wash', demoTitle: 'Where the Wind Went', desc: 'Sketsa arsitektur pena tinta ekspresif yang disiram sapuan cat air transparan.' },
      { slug: 'colored-pencil', name: 'Colored-Pencil Science Illustration', demoTitle: 'The Other Half', desc: 'Ilustrasi sains ilmiah bergaya pensil warna realistis dengan label anatomi/botani rapi.' },
    ],
  },
  {
    station: '03 · Sketch & Board',
    engine: 'HTML5 Canvas + Stroke Anim',
    defaultPalette: ['#F8F6F0', '#1E293B', '#E11D48', '#2563EB', '#F59E0B'],
    cameraGrammar:
      'Setiap konsep digambar dan ditulis secara real-time mengikuti alur narasi tanpa memutus papan gambar.',
    bestFor: ['Video Pembelajaran', 'Explainer Konsep', 'Presentasi Ide'],
    visualPrefix: 'Gaya papan tulis & sketsa penjelasan dari lemo-opuscar',
    items: [
      { slug: 'one-line', name: 'One-line Drawing', demoTitle: 'The Line That Never Lifted', desc: 'Satu garis tinta tunggal yang terus mengalir dan bermetamorfosis membentuk seluruh cerita.' },
      { slug: 'whiteboard', name: 'Whiteboard Explainer', demoTitle: 'Einstein in Your Pocket', desc: 'Papan tulis putih bersih dengan animasi spidol hitam, biru, dan merah yang menggambar diagram.' },
      { slug: 'chalkboard', name: 'Chalkboard', demoTitle: 'The Story of Chinese Characters', desc: 'Papan tulis kapur gelap berdebu halus dengan goresan kapur putih dan aksen pastel.', palette: ['#1B2622', '#F4F4EE', '#FCD34D', '#93C5FD', '#FCA5A5'] },
      { slug: 'sketchnote', name: 'Sketchnote', demoTitle: 'How Bees Make Honey', desc: 'Catatan visual kreatif memadukan ikon kecil, panah penghubung, kotak ide, dan tipografi tangan.' },
      { slug: 'stick-explainer', name: 'Stick-figure Explainer', demoTitle: 'Six Hands Away', desc: 'Karakter figur garis sederhana namun sangat ekspresif dan jenaka untuk menjelaskan ide kompleks.' },
      { slug: 'ipad-sketch', name: 'Tablet Sketch Explainer', demoTitle: 'From Cherry to Cup', desc: 'Gaya ilustrasi stylus digital di layar tablet dengan layer halus dan garis vektor rapi.' },
      { slug: 'marker-paper', name: 'Marker on Paper', demoTitle: 'How Far Can You See?', desc: 'Coretan spidol tebal ekspresif di atas kertas sketsa dengan blok warna stabilo.' },
    ],
  },
  {
    station: '04 · Traditional Crafts',
    engine: 'HTML5 Canvas + Multi-Layer',
    defaultPalette: ['#F2E8D5', '#1B365D', '#C84B31', '#171717', '#D4AF37'],
    cameraGrammar:
      'Paralaks multi-lapis khas kerajinan tradisional dengan tempo puitis, gulungan handscroll, dan jeda hening.',
    bestFor: ['Kisah Budaya', 'Narasi Filosofis', 'Animasi Artistik'],
    visualPrefix: 'Gaya seni kriya tradisional dari lemo-opuscar',
    items: [
      { slug: 'ink-wash', name: 'Chinese Ink Wash', demoTitle: 'The Swordsman and the River', desc: 'Lukisan tinta air (Shui-mo) dengan gradasi sumi kabut, ruang kosong puitis, dan sapuan kaligrafi.', palette: ['#F2EFE9', '#1A1A1A', '#525252', '#B91C1C', '#A3A3A3'] },
      { slug: 'shadow-puppet', name: 'Shadow Puppetry', demoTitle: 'Hou Yi Shoots the Suns', desc: 'Teater bayangan siluet bersendi di balik layar cahaya hangat ala wayang kulit klasik.', palette: ['#1A120B', '#F59E0B', '#FEF3C7', '#78350F', '#09090B'] },
      { slug: 'ukiyoe', name: 'Ukiyo-e', demoTitle: 'Toward the Mountain', desc: 'Cetak balok kayu Jepang era Edo, langit gradasi bokashi, kontur sumi, dan jeda visual Ma (間).' },
      { slug: 'papercut-red', name: 'Red Paper-cut', demoTitle: 'Nian Comes to Town', desc: 'Seni gunting kertas merah simetris dengan detail ukiran halus di atas latar krem kontras.', palette: ['#F8F2E4', '#B91C1C', '#7F1D1D', '#F59E0B', '#1C1917'] },
      { slug: 'paper-lantern', name: 'Paper-cut Lightbox', demoTitle: 'The Last Night Train', desc: 'Lapisan kertas potongan bertingkat dengan pendaran cahaya hangat di antara celah kedalaman.' },
      { slug: 'stained-glass', name: 'Stained Glass', demoTitle: 'The Dragon of the East Window', desc: 'Mozaik kaca patri berwarna permata dengan rangka timah gelap dan kilau cahaya menembus kaca.' },
      { slug: 'gilded-illumination', name: 'Gilded Illumination', demoTitle: 'Borrowed Light', desc: 'Manuskrip iluminasi klasik berhias tinta emas, bingkai ornamen botani, dan perkamen mewah.' },
    ],
  },
  {
    station: '05 · Print & Printmaking',
    engine: 'HTML5 Canvas + Halftone',
    defaultPalette: ['#F2E9DC', '#18181B', '#E11D48', '#2563EB', '#F59E0B'],
    cameraGrammar:
      'Estetika cetak tekan di atas kertas dengan register warna sedikit bergeser, tekstur halftone, dan ritme editorial.',
    bestFor: ['Dokumenter Sejarah', 'Kampanye Kreatif', 'Editorial Visual'],
    visualPrefix: 'Gaya seni cetak & grafis cetak dari lemo-opuscar',
    items: [
      { slug: 'risograph', name: 'Risograph Print', demoTitle: 'Sunday Ride', desc: 'Cetak Risograph bertekstur butiran dengan overprint warna cerah sedikit misregister.' },
      { slug: 'halftone-dossier', name: 'Halftone Dossier', demoTitle: 'Case File: Chubby', desc: 'Berkas arsip investigasi dengan titik-titik halftone cetak koran dan stempel rahasia.' },
      { slug: 'woodcut', name: 'Woodcut Print', demoTitle: 'The Bell Founder', desc: 'Cukil kayu hitam-putih bertekstur pahatan tajam dengan kontras tinggi yang dramatis.' },
      { slug: 'engraving', name: 'Copperplate Engraving', demoTitle: 'The Honeybee, Plate VII', desc: 'Ukiran pelat tembaga super detail dengan arsiran sejajar dan nuansa ensiklopedia klasik.' },
      { slug: 'silkscreen-poster', name: 'Silkscreen Travel Poster', demoTitle: 'The Long Way Home', desc: 'Poster wisata sablon klasik dengan bidang warna datar hangat dan siluet lanskap ikonik.' },
      { slug: 'printed-long-take', name: 'Scratchboard Long Take', demoTitle: 'Thirty-Three Cranes', desc: 'Goresan tinta putih di atas papan hitam pekat dalam satu bidikan kamera panjang tanpa putus.' },
      { slug: 'pop-art', name: 'Pop Art', demoTitle: 'The Same Banana', desc: 'Warna primer menyala, titik Ben-Day, garis tebal komik, dan komposisi ulang yang mencolok.' },
      { slug: 'vintage-collage', name: 'Vintage Engraving Collage', demoTitle: 'The Inverted Jenny', desc: 'Kolase surealis potongan ukiran klasik dengan elemen grafis modern berwarna kontras.' },
    ],
  },
  {
    station: '06 · Graphic & Type',
    engine: 'HTML + SVG + GSAP',
    defaultPalette: ['#09090B', '#FAFAFA', '#F2B705', '#E11D48', '#2563EB'],
    cameraGrammar:
      'Bentuk geometris datar dan tipografi memimpin cerita dengan transisi ritmis, zoom skala, dan koreografi grid.',
    bestFor: ['Title Sequence', 'Branding & Promo', 'Explainer Modern'],
    visualPrefix: 'Gaya grafis & tipografi murni dari lemo-opuscar',
    items: [
      { slug: 'swiss-motion', name: 'Swiss Motion Graphics', demoTitle: 'Five Rules for a Poster', desc: 'Grid tipografi Swiss presisi, huruf sans-serif asimetris, dan koreografi gerak terukur.' },
      { slug: 'spy-titles', name: '60s Spy Title Sequence', demoTitle: 'The Velvet Cipher', desc: 'Sekuens pembuka film spionase 1960-an ala Saul Bass dengan siluet tajam dan irama jazz.' },
      { slug: 'art-deco', name: 'Art Deco', demoTitle: 'Midnight at the Starlight Hotel', desc: 'Geometri simetris era 1920-an dengan garis emas ramping, lengkungan kipas, dan nuansa glamor.' },
      { slug: 'pictogram-motion', name: 'Pictogram Motion', demoTitle: 'Left Behind', desc: 'Sistem piktogram universal yang bermorfosis mulus untuk menjelaskan alur lintas bahasa.' },
      { slug: 'bauhaus-shapes', name: 'Bauhaus Shapes', demoTitle: 'COMPOUND', desc: 'Lingkaran, segitiga, dan kotak dalam warna primer merah-kuning-biru yang menari selaras.' },
      { slug: 'flat-space-explainer', name: 'Scale Zoom Explainer', demoTitle: 'The Long Way Down', desc: 'Perjalanan zoom tak berujung dari skala mikroskopis hingga kosmis dalam satu tarikan kamera.' },
      { slug: 'text-flash-cuts', name: 'Text Flash Cuts', demoTitle: 'Behind You', desc: 'Potongan kata demi kata berkecepatan tinggi dengan pergantian kontras latar yang menghipnotis.' },
      { slug: 'silhouette-rhythm', name: 'Silhouette Rhythm', demoTitle: 'Half a Beat', desc: 'Siluet figur dan objek berirama cepat di atas latar warna solid berganti-ganti.' },
    ],
  },
  {
    station: '07 · Line Diagrams',
    engine: 'HTML5 Canvas / WebGL + CAD',
    defaultPalette: ['#141518', '#E5E7EB', '#38BDF8', '#F2B705', '#3F3F46'],
    cameraGrammar:
      'Garis teknis tergambar presisi, komponen memisah pada satu sumbu simetris, dan label dimensi terkunci pada perspektif.',
    bestFor: ['Explainer Rekayasa', 'Bedah Produk', 'Teknologi & Industri'],
    visualPrefix: 'Gaya diagram garis & rekayasa dari lemo-opuscar',
    items: [
      { slug: 'blueprint', name: 'Blueprint', demoTitle: 'Patent Pending: The Cloud Catcher', desc: 'Cetak biru teknik berlatar biru Prusia dengan garis proyeksi putih dan angka dimensi presisi.', palette: ['#0D2B52', '#E0F2FE', '#7DD3FC', '#F2B705', '#1E40AF'] },
      { slug: 'iso-infographic', name: 'Isometric Infographic', demoTitle: 'From Bean to Cup', desc: 'Infografis proses isometrik 30° yang memperlihatkan alur kerja dari hulu ke hilir secara rapi.' },
      { slug: 'teardown', name: 'Exploded Teardown', demoTitle: '21 Keys, Opened', desc: 'Bedah produk isometrik studio packshot dengan komponen terpisah merata & leader lines teknis.' },
      { slug: 'hardcore-info', name: 'Line-Art Cutaway', demoTitle: "Where Is Your Phone's Antenna?", desc: 'Potongan melintang (cutaway) garis bersih yang mengintip mekanisme di dalam perangkat.' },
      { slug: 'precise-mechanism', name: 'Color-Coded Mechanism', demoTitle: 'Three Systems Keep the Time', desc: 'Diagram mekanisme bergerak di mana tiap subsistem dibedakan dengan kode warna kontras.' },
      { slug: 'instruction-manual', name: 'Instruction Manual Art', demoTitle: 'Step Ten', desc: 'Gaya buku panduan rakit minimalis bergaris hitam bersih dengan langkah bernomor.' },
      { slug: 'pen-plotter', name: 'Pen Plotter', demoTitle: '8848.86', desc: 'Gambar mekanis garis halus ala mesin pen plotter arsitektur di atas kertas milimeter.' },
      { slug: 'assembly-line-diagram', name: 'Assembly-Line Diagram', demoTitle: 'The Disassembly Line', desc: 'Alur ban berjalan horizontal yang menampilkan tahapan perakitan atau transformasi objek.' },
    ],
  },
  {
    station: '08 · Cartoons',
    engine: 'HTML5 Canvas 2D Anim',
    defaultPalette: ['#FEF3C7', '#18181B', '#EF4444', '#3B82F6', '#F59E0B'],
    cameraGrammar:
      'Animasi karakter penuh squash-and-stretch, ekspresi tegas, dan panel cerita berenergi tinggi.',
    bestFor: ['Hiburan & Storytelling', 'Konten Viral', 'Edukasi Karakter'],
    visualPrefix: 'Gaya animasi kartun & komik dari lemo-opuscar',
    items: [
      { slug: 'rubber-hose', name: '1930s Rubber Hose Cartoon', demoTitle: 'Coffee Cup Chase', desc: 'Kartun klasik 1930-an dengan lengan lentur ala selang karet, monokrom hangat, dan gerak memantul.' },
      { slug: 'cel-anime-80s', name: '80s Cel Anime', demoTitle: 'City Lights, 1987', desc: 'Anime seluloid 1980-an dengan shading tegas, efek kecepatan cahaya, dan palet nostalgia.' },
      { slug: 'scifi-toon', name: 'Sci-Fi Sitcom Toon', demoTitle: 'Coffee Run', desc: 'Kartun sitkom fiksi ilmiah modern bergaris tegas dengan warna saturasi tinggi dan humor visual.' },
      { slug: 'midcentury-toon', name: 'Mid-century Cartoon', demoTitle: 'Meet Pip', desc: 'Gaya UPA era 1950-an dengan bentuk geometris tajam, warna pastel-retro, dan latar tekstur datar.' },
      { slug: 'comic-history', name: 'Comic History Cartoon', demoTitle: 'One Piece of Paper', desc: 'Kartun narasi sejarah berbalon teks yang menghidupkan peristiwa masa lalu secara ringkas.' },
      { slug: 'manga-panels', name: 'Manga Panels', demoTitle: 'KOMA ONE', desc: 'Panel komik Jepang hitam-putih dengan screentone, garis kecepatan (speedlines), dan efek bunyi.' },
    ],
  },
  {
    station: '09 · Games',
    engine: 'HTML5 Canvas Pixel/Sprite',
    defaultPalette: ['#111827', '#22C55E', '#FACC15', '#EF4444', '#60A5FA'],
    cameraGrammar:
      'Kamera mengikuti logika gim: kotak dialog retro, bar skor, perpindahan level, dan efek umpan balik instan.',
    bestFor: ['Konten Gaming', 'Gamifikasi Edukasi', 'Promo Interaktif'],
    visualPrefix: 'Gaya visual gim & piksel dari lemo-opuscar',
    items: [
      { slug: 'pixel-rpg', name: '16-bit Pixel RPG', demoTitle: 'The Last Save Point', desc: 'Seni piksel RPG era 16-bit dengan peta tile, kotak dialog klasik, dan sprite karakter bergerak.' },
      { slug: 'hd-2d', name: '2.5D Pixel Art', demoTitle: 'The Lampbearer', desc: 'Piksel art berlapis paralaks dengan pencahayaan dinamis dan kedalaman panggung HD-2D.' },
      { slug: 'microgame', name: 'Microgame Frenzy', demoTitle: 'Five-Second Astronaut', desc: 'Rangkaian tantangan mikro berdurasi 5 detik yang berganti cepat dengan hitungan mundur panik.' },
      { slug: 'game-show', name: 'Rhythm Game Show', demoTitle: 'Rhythm of AI', desc: 'Panggung kuis dan gim ritme penuh lampu skor, indikator beat, dan animasi poin.' },
    ],
  },
  {
    station: '10 · Film & Tape',
    engine: 'HTML5 Canvas + Shader FX',
    defaultPalette: ['#141210', '#E7E5E4', '#D97706', '#22C55E', '#57534E'],
    cameraGrammar:
      'Tekstur medium analog otentik: flicker proyektor, rekaman pita, scanline CRT, dan eksposur ganda sinematik.',
    bestFor: ['Nostalgia & Arsip', 'Misteri & Dokumenter', 'Musik & Visual Art'],
    visualPrefix: 'Gaya medium film & pita analog dari lemo-opuscar',
    items: [
      { slug: 'ascii-crt', name: 'CRT ASCII Terminal', demoTitle: 'Tranquility.log', desc: 'Layar monitor tabung fosfor hijau/amber yang merender grafik dan teks dalam karakter ASCII.', palette: ['#07120A', '#22C55E', '#86EFAC', '#14532D', '#052E16'] },
      { slug: 'silent-film', name: '1920s Silent Film', demoTitle: 'The Runaway Loaf', desc: 'Film bisu 1920-an dengan intertitle kartu dialog, vignette gelap, dan getaran frame proyektor.' },
      { slug: 'backrooms', name: 'Liminal Found Footage', demoTitle: 'Night Shift Orientation', desc: 'Rekaman kaset VHS liminal dengan timestamp sudut layar, distorsi chroma, dan atmosfer misterius.' },
      { slug: 'scratch-film', name: 'Scratch Film', demoTitle: 'The Night Climb', desc: 'Animasi eksperimental yang digores langsung ke seluloid film dengan energi garis mentah.' },
      { slug: 'double-exposure', name: 'Double Exposure', demoTitle: 'Mountains and Seas', desc: 'Eksposur ganda puitis yang melebur siluet subjek dengan lanskap bergerak di dalamnya.' },
    ],
  },
  {
    station: '11 · Screens & Interfaces',
    engine: 'HTML + CSS + GSAP',
    defaultPalette: ['#09090B', '#F4F4F5', '#3B82F6', '#F2B705', '#27272A'],
    cameraGrammar:
      'Cerita disampaikan langsung melalui layar perangkat, animasi kursor, jendela aplikasi, dan HUD interaktif.',
    bestFor: ['Peluncuran Aplikasi', 'Demo SaaS', 'Konten Tech & Bisnis'],
    visualPrefix: 'Gaya layar & antarmuka digital dari lemo-opuscar',
    items: [
      { slug: 'dark-keynote', name: 'Dark Tech Keynote', demoTitle: 'Room to Think', desc: 'Presentasi peluncuran produk teknologi berlatar gelap elegan dengan sorotan metrik raksasa.' },
      { slug: 'living-screencast', name: 'Mascot Screencast', demoTitle: 'Clawd Moves In', desc: 'Screencast antarmuka aplikasi yang dipandu maskot kecil interaktif melompat antar tombol.' },
      { slug: 'hologram-hud', name: 'Sci-fi Hologram HUD', demoTitle: 'Volt · Spec Scan', desc: 'Tampilan hologram futuristik transparan dengan cincin pemindaian spek dan proyeksi wireframe.' },
      { slug: 'desktop-flythrough', name: 'Tabletop App Flythrough', demoTitle: 'Before the Ding', desc: 'Kamera terbang 3D melintasi kartu-kartu antarmuka aplikasi yang tersusun di atas meja.' },
      { slug: 'spreadsheet', name: 'Spreadsheet Film', demoTitle: 'The Hidden Column', desc: 'Kisah investigasi data yang terungkap langsung melalui sel, rumus, dan grafik spreadsheet hidup.' },
      { slug: 'one-bit-dither', name: '1-bit Dither', demoTitle: "The Moon's Fax", desc: 'Estetika layar komputer klasik 1-bit hitam-putih dengan pola dithering retro yang tajam.' },
    ],
  },
  {
    station: '12 · Light & Lines',
    engine: 'HTML5 Canvas Glow/Vector',
    defaultPalette: ['#05070B', '#38BDF8', '#F2B705', '#A855F7', '#F4F4F5'],
    cameraGrammar:
      'Visual digambar murni oleh berkas cahaya, jejak sirkuit, gelombang osiloskop, dan partikel mengalir.',
    bestFor: ['Teknologi & Sains', 'Visual Musik', 'Intro Futuristik'],
    visualPrefix: 'Gaya cahaya & garis vektor dari lemo-opuscar',
    items: [
      { slug: 'circuit-board', name: 'Circuit Board', demoTitle: 'Seven Milliseconds', desc: 'Jalur tembaga papan sirkuit tempat pulsa cahaya data mengalir menyalakan simpul prosesor.' },
      { slug: 'firefly-pointillism', name: 'Firefly Pointillism', demoTitle: 'Shine Back', desc: 'Ribuan titik cahaya kunang-kunang yang berkumpul membentuk objek lalu berpendar kembali.' },
      { slug: 'flow-field', name: 'Flow-field Wind Lines', demoTitle: 'Typhoon Yagi over Qiongzhou', desc: 'Garis aliran generatif yang bergerak mulus seperti arus angin, gelombang magnet, atau fluida.' },
      { slug: 'oscilloscope-math', name: 'Oscilloscope Math', demoTitle: 'The Gibbs Phenomenon', desc: 'Sinar fosfor osiloskop vektor yang menggambar kurva matematika dan gelombang audio langsung.' },
      { slug: 'neon-tubes', name: 'Neon Tubes', demoTitle: 'Midnight Snack', desc: 'Tabung kaca neon bercahaya di ruang gelap dengan kilatan nyala elektrik realistis.' },
    ],
  },
  {
    station: '13 · 3D & Miniature',
    engine: 'WebGL / Three.js',
    defaultPalette: ['#18181B', '#FDE68A', '#60A5FA', '#F472B6', '#FAFAFA'],
    cameraGrammar:
      'Dunia fisik mungil dengan kamera orbit, efek depth-of-field tilt-shift, dan pencahayaan studio miniatur.',
    bestFor: ['Explainer Dunia Mini', 'Produk 3D', 'Storytelling Kreatif'],
    visualPrefix: 'Gaya 3D & dunia miniatur dari lemo-opuscar',
    items: [
      { slug: 'brick-toy', name: 'Brick Toy', demoTitle: 'Rocket from Spare Parts', desc: 'Dunia balok susun mainan yang dirakit keping demi keping dengan bunyi klik yang memuaskan.' },
      { slug: 'paper-popup', name: 'Paper Pop-up Book', demoTitle: "Pip's Paper Adventure", desc: 'Buku pop-up kertas 3D yang halaman-halamannya terbuka dan melipat naik membentuk panggung.' },
      { slug: 'tilt-shift', name: 'Tilt-Shift Miniature', demoTitle: 'Toy Town Rush Hour', desc: 'Kota miniatur efek lensa tilt-shift dengan kedalaman fokus dangkal ala dunia mainan hidup.' },
      { slug: 'lowpoly-island', name: 'Low-poly Isometric Island', demoTitle: 'The Island That Grew', desc: 'Pulau isometrik low-poly yang tumbuh dan berevolusi dengan pencahayaan matahari lembut.' },
      { slug: 'glass-product', name: 'Glass Product Render', demoTitle: 'Aura — Hear the Light', desc: 'Render produk kaca refraktif dan metalik bening dengan pencahayaan studio kelas flagship.' },
      { slug: 'memphis-diorama', name: 'Memphis Diorama', demoTitle: 'Four Seasons in Pomelo Town', desc: 'Diorama 3D penuh warna geometris gaya Memphis dengan bayangan lembut dan tata ruang ceria.' },
      { slug: 'isometric-picture-book', name: 'Isometric People Scene', demoTitle: 'Seventy-Two Seats', desc: 'Ruang isometrik ramai karakter bergaya editorial untuk memvisualisasikan aktivitas sosial.' },
      { slug: 'crayon-world', name: 'Crayon World 3D', demoTitle: 'The Butterfly', desc: 'Objek 3D bertekstur krayon dan kertas gambar buatan tangan yang hangat dan imajinatif.' },
    ],
  },
  {
    station: '14 · Instruments & Evidence',
    engine: 'HTML5 Canvas + Telemetry',
    defaultPalette: ['#0B131E', '#1E3A5F', '#38BDF8', '#F2B705', '#E2E8F0'],
    cameraGrammar:
      'Sudut pandang instrumen ilmiah dan forensik: pemindaian radar, zoom orbital, pembesaran lensa, dan angka terukur.',
    bestFor: ['Sains & Forensik', 'Geopolitik', 'Analisis Teknis'],
    visualPrefix: 'Gaya instrumen & bukti ilmiah dari lemo-opuscar',
    items: [
      { slug: 'satellite-briefing', name: 'Satellite Briefing', demoTitle: 'The Map Still Says Sea', desc: 'Observasi satelit top-down dengan kontur peta, grid koordinat, dan penanda lokasi strategis.' },
      { slug: 'briefing-board', name: 'Engineering Briefing Board', demoTitle: 'The Ship Decides', desc: 'Papan pengarahan teknik presisi dengan skema sistem, vektor gaya, dan parameter operasi.' },
      { slug: 'lidar-survey', name: 'LiDAR Survey', demoTitle: 'The Fields Under the Forest', desc: 'Awan titik (point cloud) pemindaian laser LiDAR yang menyingkap struktur tersembunyi di balik kontur.' },
      { slug: 'microscope', name: 'Under the Microscope', demoTitle: 'Measured Blue', desc: 'Pengamatan lensa mikroskop melingkar dengan fokus halus, partikel sel, dan skala mikron.' },
      { slug: 'archive-lighttable', name: 'Archive Light Table', demoTitle: 'Two Seconds Short', desc: 'Meja cahaya arsip penuh negatif film, loupe pembesar, dan foto bukti yang digeser manual.' },
      { slug: 'security-xray', name: 'Security X-ray', demoTitle: 'Night Shift at Lane 3', desc: 'Pemindai sinar-X bandara dengan kode warna kepadatan material oranye, hijau, dan biru.' },
      { slug: 'dark-documentary', name: 'Radar Sweep Documentary', demoTitle: 'Catching the Moon', desc: 'Sapuan garis radar melingkar yang mendeteksi gema target, jalur lintasan, dan koordinat waktu.' },
      { slug: 'thermal-camera', name: 'Thermal Camera', demoTitle: 'A Building on a Winter Night', desc: 'Kamera pencitraan termal inframerah dengan gradasi suhu ungu-merah-kuning dan skala derajat.' },
    ],
  },
  {
    station: '15 · Data & Maps',
    engine: 'HTML5 Canvas / D3 / WebGL',
    defaultPalette: ['#0D1117', '#F8FAFC', '#F2B705', '#22C55E', '#38BDF8'],
    cameraGrammar:
      'Angka, grafik, dan peta geografis bergerak sinkron menerjemahkan data kompleks menjadi narasi visual yang jernih.',
    bestFor: ['Jurnalisme Data', 'Geopolitik & Ekonomi', 'Laporan Tahunan'],
    visualPrefix: 'Gaya data & kartografi dari lemo-opuscar',
    items: [
      { slug: 'dataviz', name: 'Data Storytelling', demoTitle: 'A Hundred Summers', desc: 'Grafik garis, batang, dan scatter yang bertransformasi mulus mengikuti narasi perubahan tren.' },
      { slug: 'white-model', name: 'Projection-Mapped Model', demoTitle: 'How a Flattened City Grew Back', desc: 'Proyeksi cahaya data dan garis pertumbuhan yang dipetakan di atas maket arsitektur kota.' },
      { slug: 'data-physical', name: 'Data Physicalization', demoTitle: 'Two Spirals', desc: 'Data statistik diwujudkan menjadi objek fisik nyata (tumpukan, spiral, blok) agar terasa skalanya.' },
      { slug: 'transit-map', name: 'Transit Map', demoTitle: '6 Kilometres', desc: 'Peta jalur transportasi metro bergaris warna tegas dengan animasi stasiun dan rute perjalanan.' },
      { slug: 'map-explainer', name: '3D Map Explainer', demoTitle: 'Strait of Hormuz', desc: 'Peta topografi 3D miring dengan rute pelayaran/penerbangan bercahaya dan batas wilayah tegas.' },
      { slug: 'pip-simulation', name: 'Blob Simulation', demoTitle: 'Is Faster Better?', desc: 'Simulasi agen/partikel hidup untuk memvisualisasikan perbandingan algoritma, arus, atau perilaku sistem.' },
    ],
  },
];

export const LEMO_OPUSCAR_STYLES: MotionStyle[] = LEMO_STATIONS.flatMap((group) =>
  group.items.map((item) => {
    const palette = item.palette ?? group.defaultPalette;
    return {
      id: `lo-${item.slug}`,
      name: item.name,
      repo: 'lemo-opuscar' as const,
      skillHandle: '@lemo-opuscar' as const,
      repoUrl: `${REPO_LINKS.lemoOpuscar}/tree/main/styles/${item.slug}`,
      stylePath: `styles/${item.slug}/STYLE.md`,
      engine: group.engine,
      station: group.station,
      shortDesc: item.desc,
      visualLanguage: `${group.visualPrefix} (${group.station}, demo "${item.demoTitle}"): ${item.desc}`,
      cameraGrammar: group.cameraGrammar,
      bestFor: group.bestFor,
      palette,
      imageUrl: `${REPO_LINKS.lemoOpuscarRaw}/docs/readme/cards/${item.slug}-poster.webp`,
      demoTitle: item.demoTitle,
      promptDirective: `Terapkan gaya "${item.name}" dari @lemo-opuscar (folder styles/${item.slug}/STYLE.md, demo "${item.demoTitle}"): ${item.desc} Gunakan palet ${palette.join(', ')} dan pola kamera: ${group.cameraGrammar}`,
    };
  })
);
