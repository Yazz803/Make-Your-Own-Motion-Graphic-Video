import type { Metadata } from 'next';
import { gitlabMono, incognito, inter } from './fonts';
import './globals.css';

function resolveMetadataBase(): URL {
  const raw = process.env.APP_URL?.trim();
  if (raw && /^https?:\/\//i.test(raw)) {
    try {
      return new URL(raw);
    } catch {
      // Fall back to localhost when APP_URL is not a valid URL
    }
  }
  return new URL('http://localhost:3000');
}

const OG_IMAGE_URL = '/assets/images/og-lockup.jpg';
const OG_IMAGE_ALT =
  'Motion Graphic Studio — Katalog 110 Gaya Visual & Studio Prompt Gemini Web';

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: 'Motion Graphic Studio — Buat Video Motion Graphic dengan Gemini Web',
  description:
    'Katalog lengkap gaya visual bang-motion dan lemo-opuscar beserta generator prompt Mode Tugas Gemini Web untuk naskah voice over, SFX, running text, hingga video MP4.',
  openGraph: {
    title: 'Motion Graphic Studio — Buat Video Motion Graphic dengan Gemini Web',
    description:
      'Katalog lengkap gaya visual bang-motion dan lemo-opuscar beserta generator prompt Mode Tugas Gemini Web untuk naskah voice over, SFX, running text, hingga video MP4.',
    type: 'website',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: OG_IMAGE_ALT,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motion Graphic Studio — Buat Video Motion Graphic dengan Gemini Web',
    description:
      'Katalog lengkap gaya visual bang-motion dan lemo-opuscar beserta generator prompt Mode Tugas Gemini Web untuk naskah voice over, SFX, running text, hingga video MP4.',
    images: [
      {
        url: OG_IMAGE_URL,
        alt: OG_IMAGE_ALT,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${incognito.variable} ${inter.variable} ${gitlabMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans selection:bg-[#33E092] selection:text-[#09090B]"
      >
        {children}
      </body>
    </html>
  );
}
