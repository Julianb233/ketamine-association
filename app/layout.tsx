import type { Metadata, Viewport } from 'next';
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0d9488' },
    { media: '(prefers-color-scheme: dark)', color: '#115e59' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ketamineassociation.org'),
  title: {
    default: 'Ketamine Association | Education, Certification & Provider Directory',
    template: '%s | Ketamine Association',
  },
  description:
    "The nation's leading association for ketamine therapy practitioners. Access accredited education, professional certification, CE credits, and connect patients with verified providers. Join 5,000+ healthcare professionals.",
  keywords: [
    'ketamine therapy',
    'ketamine association',
    'ketamine certification',
    'ketamine providers',
    'ketamine provider directory',
    'treatment-resistant depression',
    'ketamine training',
    'ketamine doctors near me',
    'ketamine infusion therapy',
    'mental health treatment',
    'ketamine-assisted psychotherapy',
    'KAP therapy',
    'ketamine CE credits',
    'ketamine continuing education',
    'IV ketamine therapy',
    'Spravato providers',
    'esketamine treatment',
    'depression treatment',
    'PTSD treatment',
    'chronic pain treatment',
    'anxiety treatment',
    'ketamine clinic',
  ],
  authors: [{ name: 'Ketamine Association' }],
  creator: 'Ketamine Association',
  publisher: 'Ketamine Association',
  category: 'Health',
  classification: 'Medical Professional Association',
  alternates: {
    canonical: 'https://ketamineassociation.org',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ketamineassociation.org',
    siteName: 'Ketamine Association',
    title: 'Ketamine Association | Education, Certification & Provider Directory',
    description:
      "The nation's leading association for ketamine therapy practitioners. Access education, certification, and connect with verified providers.",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ketamine Association - Education, Certification & Connection',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@KetamineAssoc',
    creator: '@KetamineAssoc',
    title: 'Ketamine Association | Education, Certification & Provider Directory',
    description:
      "The nation's leading association for ketamine therapy practitioners. Access education, certification, and connect with verified providers.",
    images: {
      url: '/images/og-image.jpg',
      alt: 'Ketamine Association - Education, Certification & Connection',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  other: {
    'msapplication-TileColor': '#0d9488',
    'format-detection': 'telephone=no',
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
