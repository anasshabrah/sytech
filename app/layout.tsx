import type { Metadata } from "next";
import Bootstrap from "@/components/Bootstrap";
import GSAPAnimations from "@/components/GSAPAnimations";
import "@/public/scss/styles.scss";

export const metadata: Metadata = {
  title: "سيرياتك - مسرعة أعمال سورية مساهمة خاصة",
  description:
    "نجمع أصحاب الطموح والمشاريع الناشئة مع المستثمرين المساهمين في سيرياتك المساهمة الخاصة",
};

type LayoutType = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutType) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="font-readex" suppressHydrationWarning>
        <Bootstrap>
          <GSAPAnimations />
          {children}
        </Bootstrap>
      </body>
    </html>
  );
}
