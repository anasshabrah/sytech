// app/page.tsx

import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

// Page-Specific Metadata
export const metadata: Metadata = {
  title: "سيرياتك - مسرعة أعمال سورية مساهمة خاصة",
  description:
    "نجمع أصحاب الطموح والمشاريع الناشئة مع المستثمرين المساهمين في سيرياتك المساهمة الخاصة",
  keywords: "مسرعة أعمال, استثمار, مشاريع ناشئة, سيرياتك",
  authors: [{ name: "سيرياتيك" }],
  openGraph: {
    type: "website",
    locale: "ar_SY",
    url: "https://syriatech.co",
    title: "سيرياتك - مسرعة أعمال سورية مساهمة خاصة",
    description:
      "نجمع أصحاب الطموح والمشاريع الناشئة مع المستثمرين المساهمين في سيرياتك المساهمة الخاصة",
    siteName: "سيرياتك",
    images: [
      {
        url: "https://syriatech.co/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "سيرياتك - مسرعة أعمال سورية",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

export default function HomePage() {
  // Structured Data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "سيرياتك",
    "url": "https://syriatech.co",
    "logo": "https://syriatech.co/logo.png",
    "description":
      "نجمع أصحاب الطموح والمشاريع الناشئة مع المستثمرين المساهمين في سيرياتك المساهمة الخاصة",
    "sameAs": [
      "https://www.facebook.com/syriatech",
      "https://twitter.com/syriatech",
      "https://www.linkedin.com/company/syriatech",
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+90-5550400545",
        "contactType": "customer service",
        "areaServed": "SY",
      },
    ],
  };

  return (
    <>
      <HomeContent structuredData={structuredData} />
    </>
  );
}
