/// components/AboutMe.tsx
'use client';
import SectionTitle from './SectionTitle';

export default function AboutMe() {
  return (
    <section id="about_me" className="py-24">
      <SectionTitle subtitle="من نحن" title="سيرياتك / Habrah LLC" />

      <div className="container mx-auto px-4 space-y-6 text-primary-dark leading-relaxed">
        <p>
          شركة رائدة في تطوير المواقع، التطبيقات، والمتاجر الإلكترونية، بقيادة رائد الأعمال السوري أنس هبره، مؤسس Habrah LLC في الولايات المتحدة ومؤسس سيرياتك للاستشارات والخدمات التقنية.
        </p>
        <p>
          بخبرة تتجاوز 10 سنوات وأكثر من 15 مشروعًا تقنيًا ناجحًا في الشرق الأوسط وأمريكا، نقدم حلولًا ذكية ومخصصة تعزز حضورك الرقمي وتزيد من مبيعاتك.
        </p>
      </div>

      <div className="mt-16 text-center">
        <a href="#founder" className="scroll-link border-dark/10 text-primary-dark hover:bg-brand-50">
          <span>⤵ تعرف على المؤسس</span>
        </a>
      </div>
    </section>
  );
}