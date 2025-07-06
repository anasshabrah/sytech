// components/Services.tsx
"use client";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "./SectionTitle";
import { useRef } from "react";
import useGSAP from "@/hooks/useGSAP";
import gsap from "gsap";
import Link from "next/link";
import Wave from "@/components/Wave";

const servicesData = [
  {
    id: 1,
    number: "01",
    title: "تطوير التطبيقات",
    features: [
      "تصميم واجهات استخدام مخصصة",
      "تطوير تطبيقات iOS و Android",
      "ربط الواجهة مع الخوادم",
      "استخدام أحدث التقنيات والأطر",
    ],
  },
  {
    id: 2,
    number: "02",
    title: "تطوير المواقع الإلكترونية",
    features: [
      "مواقع سريعة ومتجاوبة",
      "تصميم عصري وتجربة مستخدم ممتازة",
      "لوحات تحكم مخصصة",
      "تحسين محركات البحث (SEO)",
    ],
  },
  {
    id: 3,
    number: "03",
    title: "التجارة الإلكترونية",
    features: [
      "متاجر إلكترونية متكاملة",
      "أنظمة دفع آمنة",
      "إدارة المنتجات والمخزون",
      "دعم للشحن والخصومات والعروض",
    ],
  },
] as const;

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldLoop = servicesData.length > 3;

  useGSAP(
    (selector) => {
      gsap.from(selector(".service-card"), {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    },
    sectionRef
  );

  return (
    <section ref={sectionRef} id="services" className="relative py-20 overflow-hidden">
      {/* Decorative full-width wave */}
      <Wave variant="hero" flip />

      {/* Constrained content */}
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle subtitle="خدماتنا الرقمية المتميزة" title="ماذا نقدم؟" />

        <Swiper
          slidesPerView="auto"
          spaceBetween={24}
          loop={shouldLoop}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 24 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1280: { slidesPerView: 3, spaceBetween: 24 },
          }}
          dir="rtl"
          className="service-swiper"
        >
          {servicesData.map(({ id, number, title, features }) => (
            <SwiperSlide key={id} className="p-3">
              <article className="service-card relative overflow-hidden rounded-3xl bg-base p-8 shadow-md ring-1 ring-brand-100">
                <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-brand-50" />
                <span className="relative z-10 mb-4 block text-5xl font-black text-accent-gold">
                  {number}
                </span>
                <h4 className="mb-4 text-xl font-bold text-dark">{title}</h4>
                <ul className="space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <i className="ph ph-check text-brand-500" /> {f}
                    </li>
                  ))}
                </ul>
              </article>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination !bottom-0 !relative mt-12" />
        </Swiper>

        <div className="mt-16 text-center">
          <Link
            href="#our-projects"
            aria-label="انتقل إلى المشاريع"
            className="scroll-link border-dark/10 text-dark hover:bg-brand-50"
          >
            <span>⤵ تعرف على مشاريعنا</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
