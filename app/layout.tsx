// app/layout.tsx
import '@/styles/globals.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import type { Metadata } from 'next';
import ClientLayout from '@/components/ClientLayout';
import BackgroundGradient from '@/components/BackgroundGradient';
import SiteHeader from '@/components/SiteHeader';

import { defaultSEO } from '@/lib/seo';
import { Cairo } from 'next/font/google';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-cairo',
  display: 'swap',
});

type RootLayoutProps = { children: React.ReactNode };

export const metadata: Metadata = { ...defaultSEO };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body>
        <ClientLayout>
          <SiteHeader />
          <BackgroundGradient />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
