// components/Services.tsx
"use client";

import { useRef } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "./SectionTitle";
import useGSAP from "@/hooks/useGSAP";
import Wave from "@/components/Wave";
import Link from "next/link";
import { createScrollAnimationCallback, shouldLoop } from "@/lib/utils";

const servicesData = [
  {
    id: 1,
    number: "01",
    title: "استشارات التجارة الإلكترونية",
    features: [
      "تأسيس وإدارة المتاجر الإلكترونية",
      "تحسين محركات البحث للمتاجر",
      "تحسين تجربة المستخدم لزيادة التحويلات",
    ],
  },
  {
    id: 2,
    number: "02",
    title: "تطوير المشاريع التقنية",
    features: [
      "تخطيط وتنفيذ المشاريع الرقمية",
      "إدارة وتدريب الفرق التقنية",
      "متابعة الأداء وتحقيق الأهداف",
    ],
  },
  {
    id: 3,
    number: "03",
    title: "تحسين محركات البحث (SEO)",
    features: [
      "تحليل الأداء والمنافسة",
      "تقنيات متقدمة لرفع ترتيب موقعك",
      "كتابة محتوى متوافق مع محركات البحث",
    ],
  },
  {
    id: 4,
    number: "04",
    title: "الذكاء الاصطناعي وتحليل البيانات",
    features: [
      "حلول AI مخصصة لتحسين العمليات",
      "تحليل البيانات لدعم اتخاذ القرار",
      "أتمتة المهام ورفع الكفاءة",
    ],
  },
  {
    id: 5,
    number: "05",
    title: "حلول الدفع الإلكتروني",
    features: [
      "دمج قنوات دفع متعددة",
      "تأمين تجربة مستخدم سلسة وآمنة",
      "التوافق مع بوابات الدفع العالمية",
    ],
  },
  {
    id: 6,
    number: "06",
    title: "أنظمة إدارة علاقات العملاء (CRM)",
    features: [
      "تتبع وتحليل سلوك العملاء",
      "ربط CRM مع متجرك الإلكتروني",
      "تخصيص حملات لزيادة ولاء العملاء",
    ],
  },
  {
    id: 7,
    number: "07",
    title: "التسويق الرقمي",
    features: [
      "استراتيجيات تسويق مربحة",
      "تحليل الحملات وتحسين النتائج",
      "إدارة الحملات على وسائل التواصل الاجتماعي",
    ],
  },
  {
    id: 8,
    number: "08",
    title: "تدريب وتطوير فرق العمل",
    features: [
      "تدريب الفرق على إدارة المتاجر",
      "تعليم SEO وتجربة المستخدم",
      "تعزيز مهارات التواصل والتعاون",
    ],
  },
  {
    id: 9,
    number: "09",
    title: "استشارات للمنصات غير الربحية",
    features: [
      "تطوير منصات التبرعات",
      "تحسين الظهور الرقمي وزيادة الوصول",
      "إستراتيجية جذب المتبرعين",
    ],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const loop = shouldLoop(servicesData);

  const animationCallback = createScrollAnimationCallback(
    sectionRef,
    { selector: ".service-card", y: 50, stagger: 0.2, duration: 1, ease: "power2.out" }
  );
  useGSAP(animationCallback, sectionRef);

  return (
    <section ref={sectionRef} id="services" className="relative py-20 overflow-hidden">
      <Wave variant="hero" flip />

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle subtitle="خدماتنا الرقمية المتميزة" title="ماذا نقدم؟" />

        <Swiper
          slidesPerView="auto"
          spaceBetween={24}
          loop={loop}
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
                <h4 className="mb-4 text-xl font-bold text-primary-dark">{title}</h4>
                <ul className="space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-primary-dark">
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
            className="scroll-link border-dark/10 text-primary-dark hover:bg-brand-50"
          >
            <span>⤵ تعرف على مشاريعنا</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
