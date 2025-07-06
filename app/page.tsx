// app/page.tsx
import type { Metadata } from 'next';
import HomeContent from '@/components/HomeContent';
import { defaultSEO } from '@/lib/seo';

export const metadata: Metadata = {
  ...defaultSEO,
  title: 'سيرياتك - مسرعة أعمال سورية مساهمة خاصة',
  description:
    'نجمع أصحاب الطموح والمشاريع الناشئة مع المستثمرين المساهمين في سيرياتك المساهمة الخاصة',
  authors: [{ name: 'سيرياتك' }],
  openGraph: {
    ...defaultSEO.openGraph,
    title: 'سيرياتك - مسرعة أعمال سورية مساهمة خاصة',
    description:
      'نجمع أصحاب الطموح والمشاريع الناشئة مع المستثمرين المساهمين في سيرياتك المساهمة الخاصة',
    images: [
      {
        url: 'https://syriatech.co/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'سيرياتك - مسرعة أعمال سورية',
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  robots: { index: true, follow: true },
};

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'سيرياتك',
    url: 'https://syriatech.co',
    logo: 'https://syriatech.co/logo.png',
    description:
      'نجمع أصحاب الطموح والمشاريع الناشئة مع المستثمرين المساهمين في سيرياتك المساهمة الخاصة',
    sameAs: [
      'https://www.facebook.com/syriatech',
      'https://twitter.com/syriatech',
      'https://www.linkedin.com/company/syriatech',
    ],
  };

  return (
    <>
      <HomeContent structuredData={structuredData} />
    </>
  );
}
