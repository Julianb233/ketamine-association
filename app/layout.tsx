import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ketamineassociation.org'),
  title: {
    default: 'Ketamine Association | Education • Certification • Connection',
    template: '%s | Ketamine Association',
  },
  description: "The nation's leading association for ketamine therapy practitioners. Access education, certification, and patient connections.",
  keywords: [
    'ketamine therapy',
    'ketamine association',
    'ketamine certification',
    'ketamine providers',
    'treatment-resistant depression',
    'ketamine training',
    'ketamine doctors',
    'ketamine infusion',
    'mental health treatment',
  ],
  authors: [{ name: 'Ketamine Association' }],
  creator: 'Ketamine Association',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ketamineassociation.org',
    siteName: 'Ketamine Association',
    title: 'Ketamine Association | Education • Certification • Connection',
    description: "The nation's leading association for ketamine therapy practitioners.",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ketamine Association',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ketamine Association',
    description: "The nation's leading association for ketamine therapy practitioners.",
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <Providers>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
