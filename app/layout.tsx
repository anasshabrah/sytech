// app/layout.tsx

import type { Metadata } from "next";
import Bootstrap from "@/components/Bootstrap";
import GSAPAnimations from "@/components/GSAPAnimations";
import "@/public/scss/styles.scss";

// Separate viewport export
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// Global Metadata (excluding viewport)
export const metadata: Metadata = {
  // Add any global metadata here if needed
  // For example, global Open Graph tags
  openGraph: {
    type: "website",
    locale: "ar_SY",
    url: "https://syriatech.co",
    siteName: "سيرياتك",
  },
};

type LayoutType = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutType) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-readex" suppressHydrationWarning>
        <Bootstrap>
          <GSAPAnimations />
          {children}
        </Bootstrap>
      </body>
    </html>
  );
}
