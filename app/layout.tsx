// app/layout.tsx

import "@/styles/styles.scss";

// Swiper styles (formerly in SCSS)
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

// Modal-video styles
import "react-modal-video/scss/modal-video.scss";

import type { Metadata } from "next";
import ClientLayout from "@/components/ClientLayout";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    locale: "ar_SY",
    url: "https://syriatech.co",
    siteName: "سيرياتك",
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className="font-readex" suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
