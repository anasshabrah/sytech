import type { Metadata } from "next";
import Bootstrap from "@/components/Bootstrap";
import GSAPAnimations from "@/components/GSAPAnimations";
import "@/public/scss/styles.scss";
import Head from "next/head";

// Enhanced Structured Data for SEO (JSON-LD)
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
    "https://www.linkedin.com/company/syriatech"
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+90-5550400545",
      "contactType": "customer service",
      "areaServed": "SY"
    }
  ]
};

export const metadata: Metadata = {
  title: "سيرياتك - مسرعة أعمال سورية مساهمة خاصة",
  description:
    "نجمع أصحاب الطموح والمشاريع الناشئة مع المستثمرين المساهمين في سيرياتك المساهمة الخاصة",
  keywords: "مسرعة أعمال, استثمار, مشاريع ناشئة, سيرياتك",
  authors: [{ name: "سيرياتيك" }],
  metadataBase: new URL("https://syriatech.co"),
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
        alt: "سيرياتك - مسرعة أعمال سورية"
      }
    ]
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon.png",
    apple: "/icon.png"
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
      "max-image-preview": "large"
    }
  }
};

// Export viewport configuration separately
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

type LayoutType = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutType) {
  return (
    <html lang="ar" dir="rtl">
      <Head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Canonical URL */}
        <link rel="canonical" href="https://syriatech.co" />
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <body className="font-readex" suppressHydrationWarning>
        <Bootstrap>
          <GSAPAnimations />
          {children}
        </Bootstrap>
      </body>
    </html>
  );
}
