import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
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
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans selection:bg-[#F2B705] selection:text-[#09090B]"
      >
        {children}
      </body>
    </html>
  );
}
