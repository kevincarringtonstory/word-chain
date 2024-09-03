import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Word Chain - A game where words collide',
  description:
    'Challenge your vocabulary and problem-solving skills with Word Chain, an addictive word game where you transform words one letter at a time. Play now!',
  keywords: 'word game, puzzle, vocabulary, chain, word chain',
  authors: [{ name: 'Kevin Carrington' }],
  openGraph: {
    title: 'Word Chain &#8211; A game where words collide :)',
    description: 'Word Chain - A game where words collide',
    url: 'https://wordchain.us',
    siteName: 'Word Chain',
    images: [
      {
        url: 'https://wordchain.us/wordchain_og.png',
        width: 1200,
        height: 630,
        alt: 'Word Chain Game',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Word Chain - A game where words collide',
    description: 'Word Chain - A game where words collide',
    images: ['https://wordchain.us/wordchain_og.png'],
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#52b8d5' },
    ],
  },
  appleWebApp: {
    title: 'Word Chain',
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  applicationName: 'Word Chain',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="msapplication-TileColor" content="#b4ffe9" />
      </head>
      <body className={`${inter.className} antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}
