// components/Founder.tsx
'use client';
import SectionTitle from './SectionTitle';

export default function Founder() {
  return (
    <section id="founder" className="py-24 bg-white">
      <SectionTitle subtitle="عن المؤسس" title="أنس هبره" />
      <div className="container mx-auto px-4 text-primary-dark space-y-6 leading-relaxed">
        <p>
          رائد الأعمال السوري أنس هبره، مؤسس Habrah LLC في الولايات المتحدة ومؤسس سيرياتك للاستشارات والخدمات التقنية.
        </p>
        <ul className="grid gap-4 sm:grid-cols-2">
          <li>
            <span className="font-semibold">التخصص:</span> تأسيس وإدارة وتطوير المتاجر الإلكترونية، التحول الرقمي
          </li>
          <li>
            <span className="font-semibold">الخبرة:</span> أكثر من 10 سنوات و15+ مشروع تقني ناجح في الشرق الأوسط وأمريكا
          </li>
          <li>
            <span className="font-semibold">اللغات:</span> العربية والإنجليزية بطلاقة، مع إلمام باللغة التركية
          </li>
          <li>
            <span className="font-semibold">التعليم:</span> شهادة جامعية في تعويضات الأسنان، ودارس علوم الكمبيوتر والتجارة الإلكترونية عن بعد
          </li>
        </ul>
      </div>
    </section>
  );
}