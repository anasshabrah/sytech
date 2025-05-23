"use client";
import React, { useRef } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "./SectionTitle";
import useGSAP from "@/hooks/useGSAP";
import gsap from "gsap";

interface Service {
  id: number;
  number: string;
  title: string;
  features: string[];
}

const servicesData: Service[] = [
  {
    id: 1,
    number: "01",
    title: "رائد الأعمال",
    features: [
      "عندك مشروع ناشيء",
      "عندك تيم لو من شخصين",
      "المشروع يعمل",
      "عم يحقق أرباح أو لا مش مشكلة",
      "قدم عرض تقديمي إلينا",
    ],
  },
  {
    id: 2,
    number: "02",
    title: "سيرياتك",
    features: [
      "بندرس عرضك التقديمي",
      "مستشارينا بيقيموا المشروع",
      "بنرسل مشروعك للمستثمرين",
      "بنجمع ردود المستثمرين",
      "يصلك إيميل قبول أو رفض",
    ],
  },
  {
    id: 3,
    number: "03",
    title: "المستثمر",
    features: [
      "بيسجل بياناته للتواصل",
      "بنرسل له المشاريع المقترحة",
      "بنرفق تقييمنا مع العرض التقديمي",
      "ننتظر الرد بالقبول أو الرفض",
      "ترتيب اجتماع مع رائد الأعمال",
    ],
  },
];

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Only loop if we have more than 3 slides
  const shouldLoop = servicesData.length > 3;

  useGSAP(
    (selector) => {
      if (!sectionRef.current) return;
      const cards = selector(".service-card");
      if (cards.length === 0) return;

      gsap.from(cards, {
        stagger: 0.2,
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });
    },
    sectionRef
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="services section position-relative"
    >
      <SectionTitle subtitle="رح اشرحلك خطوات شغلنا" title="كيف بنشتغل" />

      <Swiper
        slidesPerView="auto"
        spaceBetween={24}
        loop={shouldLoop}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 24 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1550: { slidesPerView: 3, spaceBetween: 24 },
        }}
        dir="ltr"
        className="swiper service-swiper"
      >
        {servicesData.map((service) => (
          <SwiperSlide key={service.id} className="overflow-visible p-3">
            <div className="service-card">
              <div className="card-inner" />
              <div className="content">
                <div className="number-circle">
                  <div className="waves-top-sm">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <h2>{service.number}</h2>
                  <div className="waves-bottom-sm">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <h4>{service.title}</h4>
                <ul className="service-list">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <i className="ph ph-caret-double-right" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-pagination" />
      </Swiper>

      <div className="col-12">
        <a href="#attainments" className="d-flex gap-4 align-items-center next-chapter">
          <span className="page">4/6</span>
          <span className="next">القسم التالي</span>
          <span className="icon">
            <i className="ph ph-arrow-elbow-right-down"></i>
          </span>
        </a>
      </div>
    </section>
  );
};

export default Services;
