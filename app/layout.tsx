import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
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

const readexPro = Readex_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "arabic"],
});

export default function RootLayout({ children }: LayoutType) {
  return (
    <html lang="ar" dir="rtl">
      <body className={readexPro.className /* no style={{}} here */}>
        <Bootstrap>
          <GSAPAnimations />
          {children}
        </Bootstrap>
      </body>
    </html>
  );
}
