import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "./SectionTitle";
import SectionOverlayText from "./SectionOverlayText";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  useGSAP(() => {
    gsap.from(".service-card", {
      stagger: 0.2,
      opacity: 0,
      duration: 1.5,
      scrollTrigger: {
        trigger: ".services",
        start: "top 60%",
        end: "top 20%",
      },
    });
  });
  return (
    <section id="services" className="services section position-relative">
      <SectionTitle subtitle="رح اشرحلك خطوات شغلنا" title="كيف بنشتغل" />
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={24}
        loop={true}
        autoplay={{
          delay: 5000,
        }}
        pagination={{ clickable: true, el: ".swiper-pagination" }}
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
        <SwiperSlide className="overflow-visible p-3">
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
                <h2>01</h2>
                <div className="waves-bottom-sm">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <h4>رائد الأعمال</h4>
              <ul className="service-list">
                <li>
                  <i className="ph ph-caret-double-right"></i> عندك مشروع ناشيء
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> عندك تيم لو من شخصين
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> المشروع يعمل
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> عم يحقق أرباح أو لا مش مشكلة
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> قدم عرض تقديمي إلينا
                </li>
              </ul>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="overflow-visible p-3">
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
                <h2>02</h2>
                <div className="waves-bottom-sm">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <h4>سيرياتك</h4>
              <ul className="service-list">
                <li>
                  <i className="ph ph-caret-double-right"></i> بندرس عرضك التقديمي
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> مستشارينا بيقيموا المشروع
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> بنرسل مشروعك للمستثمرين
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> بنجمع ردود المستثمرين
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> يصلك إيميل قبول أو رفض
                </li>
              </ul>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="overflow-visible p-3">
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
                <h2>03</h2>
                <div className="waves-bottom-sm">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <h4>المستثمر</h4>
              <ul className="service-list">
                <li>
                  <i className="ph ph-caret-double-right"></i> بيسجل بياناته للتواصل
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> بنرسل له المشاريع المقترحة
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> بنرفق تقييمنا مع العرض التقديمي
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> ننتظر الرد بالقبول أو الرفض
                </li>
                <li>
                  <i className="ph ph-caret-double-right"></i> ترتيب اجتماع مع رائد الأعمال
                </li>
              </ul>
            </div>
          </div>
        </SwiperSlide>

        <div className="swiper-pagination"></div>
      </Swiper>
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
