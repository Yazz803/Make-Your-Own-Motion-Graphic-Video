import type { Metadata } from 'next';
import {
  Bricolage_Grotesque,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motion Graphic Studio — Buat Video Motion Graphic dengan Gemini Web',
    description:
      'Katalog lengkap gaya visual bang-motion dan lemo-opuscar beserta generator prompt Mode Tugas Gemini Web untuk naskah voice over, SFX, running text, hingga video MP4.',
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
      className={`${bricolage.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans selection:bg-[#F2B705] selection:text-[#09090B]"
      >
        {children}
      </body>
    </html>
  );
}
