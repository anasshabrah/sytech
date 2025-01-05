// components/Experience.tsx

"use client";

import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import Link from "next/link";
import SectionTitle from "./SectionTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
  pitchDeck: File | null;
}

interface Status {
  loading: boolean;
  success: string | null;
  error: string | null;
}

const Experience: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    website: "",
    pitchDeck: null,
  });

  const [status, setStatus] = useState<Status>({
    loading: false,
    success: null,
    error: null,
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const formGroups = gsap.utils.toArray<HTMLElement>(".experience-form-group");
    gsap.fromTo(
      formGroups,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".experience",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".submit-button",
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.5,
        ease: "elastic.out(1, 0.3)",
        scrollTrigger: {
          trigger: ".experience",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger?.classList.contains("experience")) {
          trigger.kill();
        }
      });
    };
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    if (type === "file" && files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setStatus({ loading: true, success: null, error: null });

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("linkedin", formData.linkedin);
      data.append("website", formData.website);
      if (formData.pitchDeck) {
        data.append("pitchDeck", formData.pitchDeck);
      }

      const response = await fetch("/api/submit-project", {
        method: "POST",
        body: data,
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setStatus({
          loading: false,
          success: "تم إرسال النموذج بنجاح!",
          error: null,
        });
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          linkedin: "",
          website: "",
          pitchDeck: null,
        });
        formRef.current?.reset();
      } else {
        setStatus({
          loading: false,
          success: null,
          error: resData.message || "حدث خطأ غير متوقع.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus({
        loading: false,
        success: null,
        error: "حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقًا.",
      });
    }
  };

  return (
    <section
      id="experience"
      className="experience section position-relative pb-5 mb-5"
    >
      {/* Section Title */}
      <SectionTitle
        subtitle="إذا كنت رائد أعمال سوري، حياك الله"
        title="ابعتلنا مشروعك لندرسه"
      />

      {/* Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="contact-form experience-form-container"
      >
        <div className="row g-4 g-xl-5">
          <div className="col-sm-6 contact-input experience-form-group">
            <label htmlFor="fullName">الاسم الكامل</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="contact-input"
              placeholder="اكتبلي اسمك الكامل"
            />
          </div>

          <div className="col-sm-6 contact-input experience-form-group">
            <label htmlFor="email">البريد الالكتروني</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="contact-input"
              placeholder="اكتبلي إيميلك"
            />
          </div>

          <div className="col-sm-6 contact-input experience-form-group">
            <label htmlFor="phone">رقم الجوال</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="contact-input"
              placeholder="لاتنسى رمز الدولة"
            />
          </div>

          <div className="col-sm-6 contact-input experience-form-group">
            <label htmlFor="linkedin">لينكدإن</label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              required
              className="contact-input"
              placeholder="بدي رابط لينكدإن"
            />
          </div>

          <div className="col-sm-6 contact-input experience-form-group">
            <label htmlFor="website">الموقع الالكتروني</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              required
              className="contact-input"
              placeholder="ابط الموقع او التطبيق"
            />
          </div>

          <div className="col-sm-6 contact-input experience-form-group">
            <label htmlFor="pitchDeck">تحميل عرض المشروع (PDF)</label>
            <input
              type="file"
              id="pitchDeck"
              name="pitchDeck"
              accept="application/pdf"
              onChange={handleChange}
              required
              className="contact-input"
            />
          </div>

          {/* Feedback Messages */}
          {status.loading && (
            <div className="col-12">
              <p className="message loading">جارٍ الإرسال...</p>
            </div>
          )}
          {status.success && (
            <div className="col-12">
              <p className="message success">{status.success}</p>
            </div>
          )}
          {status.error && (
            <div className="col-12">
              <p className="message error">{status.error}</p>
            </div>
          )}

          <div className="col-12">
            <button
              type="submit"
              disabled={status.loading}
              className="submit-btn position-relative submit-button"
            >
              <div className="waves-top-md">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              {status.loading ? "جارٍ الإرسال..." : "إرسال"}
              <div className="waves-bottom-md">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </form>

      {/* Navigation Link to Next Section */}
      <div className="col-12 mt-5">
        <Link
          href="#projects"
          className="d-flex gap-4 align-items-center next-chapter"
        >
          <span className="page">6/6</span>
          <span className="next">القسم التالي</span>
          <span className="icon">
            <i className="ph ph-arrow-elbow-right-down"></i>
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Experience;
