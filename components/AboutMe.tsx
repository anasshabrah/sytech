// components/AboutMe.tsx

import Link from "next/link";
import React from "react";
import SectionTitle from "./SectionTitle";
import SectionOverlayText from "./SectionOverlayText";

const AboutMe = () => {
  return (
    <section id="about_me" className="about section">
      <SectionTitle subtitle="كلمتين نظاف أحسن من جريدة وسخة" title="تعرف علينا" />
      <div className="row mb-4 mb-lg-5 align-items-center">
        <div className="col-lg-7 col-xl-8 about-desc">
          <h2>أنا أنس هبره وهذه سيرياتك</h2>
          <p className="desc">
            سيرياتك شركة خاصة مساهمة بتدعم رواد الأعمال والشركات الناشئة لتطوير مشاريعهم وتحقيق النجاح. بتشتغل كمسرّعة أعمال، يعني بتجمع المستثمرين مع رواد الأعمال وبتقدم لهم استشارات استراتيجية، وبتوفر لهم الموارد اللازمة، وبتساعدهم يبنوا شبكة علاقات قوية. الهدف الأساسي هو تمكين الشباب السوري الطموح لتحويل أفكارهم إلى مشاريع ناجحة تساهم بنهضة الاقتصاد المحلي وتقلل من اعتماد السوق على الشركات الأجنبية، وتسد الفراغ الموجود بعدة قطاعات، في الجانب التقني.
          </p>
          <div className="row about-contact">
            <div className="col-sm-4 about-contact-item">
              <p>العنوان</p>
              <span>حماه، سوريا</span>
            </div>
            <div className="col-sm-4 about-contact-item">
              <p>رئيس مجلس الإدارة</p>
              <span>أنس هبره</span>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-xl-4">
          <div className="experience-card">
            <div className="card-inner"></div>
            <div>
              <div className="numbers">
                <span className="number-outline-one">10</span>
                <span className="number-outline-two">10</span>
                <span className="number-main">10</span>
              </div>
              <p>سنوات الخبرة</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <Link href="#services" className="d-flex gap-4 align-items-center next-chapter">
          <span className="page">3/6</span>
          <span className="next">القسم التالي</span>
          <span className="icon">
            <i className="ph ph-arrow-elbow-right-down"></i>
          </span>
        </Link>
      </div>
    </section>
  );
};

export default AboutMe;
