// components/AboutMe.tsx
'use client';
import Link from 'next/link';
import SectionTitle from './SectionTitle';

export default function AboutMe() {
  return (
    <section id="about_me" className="py-24">
      <SectionTitle subtitle="كلمتين نظاف" title="تعرف علينا" />

      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row-reverse">
        <div className="mx-auto w-72 shrink-0 rounded-3xl bg-base p-10 text-center shadow-lg ring-1 ring-brand-100 lg:mx-0">
          <span className="mb-2 block text-6xl font-extrabold text-brand-500 drop-shadow-sm">
            10
          </span>
          <p className="font-medium tracking-wide text-dark/70">سنوات الخبرة</p>
        </div>

        <article className="flex-1 space-y-6 leading-8">
          <h2 className="text-3xl font-bold text-brand-600">أنا أنس هبره وهذه سيرياتك</h2>
          <p>
            سيرياتك شركة تطوير رقمي سورية خاصة مساهمة، متخصصة في بناء الحلول الرقمية للمؤسسات الناشئة
            والريادية. نعمل على تطوير تطبيقات الهواتف الذكية، المواقع الإلكترونية الحديثة، ومنصات التجارة
            الإلكترونية، مع تقديم الاستشارات التقنية والدعم اللوجستي والتصميمي لضمان نجاح المشروع.
          </p>

          <ul className="grid gap-6 sm:grid-cols-2">
            <li>
              <p className="text-sm font-semibold text-dark/50">العنوان</p>
              حماة، سوريا
            </li>
            <li>
              <p className="text-sm font-semibold text-dark/50">رئيس مجلس الإدارة</p>
              أنس هبره
            </li>
          </ul>
        </article>
      </div>

      <div className="mt-16 text-center">
        <Link
          href="#services"
          aria-label="انتقل إلى القسم التالي"
          className="scroll-link border-dark/10 text-dark hover:bg-brand-50"
        >
          <span>⤵ تعرف على خدماتنا</span>
        </Link>
      </div>
    </section>
  );
}
