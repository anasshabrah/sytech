// components/AboutMe.tsx
'use client';
import Link from 'next/link';
import SectionTitle from './SectionTitle';

export default function AboutMe() {
  return (
    <section id="about_me" className="py-24">
      <SectionTitle subtitle="كلمتين نظاف" title="تعرف علينا" />

      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row-reverse">
        {/* Info box */}
        <div className="mx-auto w-72 shrink-0 rounded-3xl bg-base p-10 shadow-lg ring-1 ring-brand-100 lg:mx-0 flex flex-col items-center justify-center text-center">
          <span className="mb-2 block text-6xl font-extrabold text-accent-gold drop-shadow-sm">
            10
          </span>
          <p className="font-medium tracking-wide text-primary-dark">سنوات الخبرة</p>
        </div>

        {/* Text content */}
        <article className="flex-1 space-y-6 leading-8 text-primary-dark">
          <h2 className="text-3xl font-bold text-primary-dark">
            أنا أنس هبره وهذه سيرياتك
          </h2>
          <p>
            سيرياتك شركة تطوير رقمي سورية خاصة مساهمة، متخصصة في بناء الحلول الرقمية للمؤسسات الناشئة
            والريادية. نعمل على تطوير تطبيقات الهواتف الذكية، المواقع الإلكترونية الحديثة، ومنصات التجارة
            الإلكترونية، مع تقديم الاستشارات التقنية والدعم اللوجستي والتصميمي لضمان نجاح المشروع.
          </p>

          <ul className="grid gap-6 sm:grid-cols-2">
            <li>
              <p className="text-sm font-semibold text-primary-dark/70">العنوان</p>
              <p className="text-primary-dark">حماة، سوريا</p>
            </li>
            <li>
              <p className="text-sm font-semibold text-primary-dark/70">رئيس مجلس الإدارة</p>
              <p className="text-primary-dark">أنس هبره</p>
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
