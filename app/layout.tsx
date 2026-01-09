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
    default: 'Ketamine Association | Nation\'s Leading Ketamine Therapy Association',
    template: '%s | Ketamine Association',
  },
  description: 'The nation\'s leading professional association for ketamine therapy. Connect with certified providers, access education, and advance your practice with evidence-based standards.',
  keywords: [
    'ketamine therapy',
    'ketamine association',
    'ketamine providers',
    'ketamine certification',
    'ketamine treatment',
    'depression treatment',
    'mental health',
    'PTSD treatment',
    'ketamine infusion',
    'psychedelic therapy',
  ],
  authors: [{ name: 'Ketamine Association' }],
  creator: 'Ketamine Association',
  publisher: 'Ketamine Association',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ketamineassociation.org',
    siteName: 'Ketamine Association',
    title: 'Ketamine Association | Nation\'s Leading Ketamine Therapy Association',
    description: 'The nation\'s leading professional association for ketamine therapy. Connect with certified providers, access education, and advance your practice.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ketamine Association - Advancing Ketamine Therapy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ketamine Association | Nation\'s Leading Ketamine Therapy Association',
    description: 'The nation\'s leading professional association for ketamine therapy.',
    images: ['/og-image.jpg'],
    creator: '@ketamineassoc',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
