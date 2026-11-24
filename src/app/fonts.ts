import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const incognito = localFont({
  src: [
    {
      path: './fonts/incognito_regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/incognito_medium.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/incognito_condensed.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/incognito_bold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-incognito',
  display: 'swap',
});

export const gitlabMono = localFont({
  src: [
    {
      path: './fonts/gitlab-mono.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/gitlab-mono.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/gitlab-mono.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-gitlabmono',
  display: 'swap',
});
