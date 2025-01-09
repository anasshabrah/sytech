// components/Services.tsx

"use client";

import React, { useRef } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "./SectionTitle";
import useGSAP from "@/hooks/useGSAP";
import gsap from "gsap";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

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

  useGSAP(
    (self) => {
      // Ensure that 'selector' exists before using it
      if (self.selector) {
        const serviceCards = self.selector(".service-card");
        
        gsap.from(serviceCards, {
          stagger: 0.2,
          opacity: 0,
          y: 50,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top 60%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    sectionRef
  );

  return (
    <section ref={sectionRef} id="services" className="services section position-relative">
      <SectionTitle subtitle="رح اشرحلك خطوات شغلنا" title="كيف بنشتغل" />

      <Swiper
        slidesPerView={"auto"}
        spaceBetween={24}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1550: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        dir="ltr"
        className="swiper service-swiper"
      >
        {servicesData.map((service) => (
          <SwiperSlide key={service.id} className="overflow-visible p-3">
            <div className="service-card">
              <div className="card-inner"></div>
              <div className="content">
                <div className="number-circle">
                  <div className="waves-top-sm">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <h2>{service.number}</h2>
                  <div className="waves-bottom-sm">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <h4>{service.title}</h4>
                <ul className="service-list">
                  {service.features.map((feature, index) => (
                    <li key={index}>
                      <i className="ph ph-caret-double-right"></i> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Swiper Pagination */}
        <div className="swiper-pagination"></div>
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
