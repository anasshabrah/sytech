"use client"; // Ensure this is a client component

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import React from "react";
import { Autoplay, Pagination, Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "./SectionTitle";
import SectionOverlayText from "./SectionOverlayText";

// Import Swiper styles (ensure these are imported in your global SCSS or component-specific styles)
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
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
  // Add more service objects as needed
];

const Services = () => {
  useGSAP(() => {
    gsap.from(".service-card", {
      stagger: 0.2,
      opacity: 0,
      duration: 1.5,
      y: 50, // Adding a slight upward animation for better effect
      scrollTrigger: {
        trigger: ".services",
        start: "top 80%", // Start when the top of .services is at 80% of the viewport height
        toggleActions: "play none none reverse", // Play animation on enter, reverse on leave
      },
    });
  });

  return (
    <section id="services" className="services section position-relative">
      <SectionTitle subtitle="رح اشرحلك خطوات شغلنا" title="كيف بنشتغل" />

      {/* Scoped Swiper Container */}
      <div className="service-swiper">
        <Swiper
          slidesPerView={1} // Default to 1 slide per view
          spaceBetween={24}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false, // Continue autoplay after user interactions
          }}
          pagination={{ clickable: true }}
          navigation={true} // Enable navigation buttons
          scrollbar={{ draggable: true }} // Enable draggable scrollbar
          modules={[Autoplay, Pagination, Navigation, Scrollbar]} // Include necessary modules
          breakpoints={{
            768: {
              slidesPerView: 2, // 2 slides per view for screens >= 768px
              spaceBetween: 24,
            },
            1200: {
              slidesPerView: 3, // 3 slides per view for screens >= 1200px
              spaceBetween: 24,
            },
          }}
          dir="rtl" // Set to 'rtl' if your site uses Right-to-Left direction
          className="swiper"
        >
          {/* Swiper Slides */}
          {servicesData.map((service, index) => (
            <SwiperSlide key={index} className="overflow-visible p-3">
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
                    {service.features.map((feature, featIndex) => (
                      <li key={featIndex}>
                        <i className="ph ph-caret-double-right"></i> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Swiper React handles the pagination and navigation elements automatically */}
        </Swiper>
      </div>

      {/* Next Chapter Link */}
      <div className="col-12">
        <Link href="#attainments" className="d-flex gap-4 align-items-center next-chapter">
          <span className="page">4/6</span>
          <span className="next">القسم التالي</span>
          <i className="ph ph-arrow-elbow-right-down"></i>
        </Link>
      </div>
    </section>
  );
};

export default Services;
