// components/Attainments.tsx

"use client";

import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import Link from "next/link";
import SectionTitle from "./SectionTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Define the structure of the form data
interface FormData {
  investorName: string;
  investorEmail: string;
  investorPhone: string;
  investmentAmount: string;
}

// Define the structure of the status state
interface Status {
  loading: boolean;
  success: string | null;
  error: string | null;
}

const Attainments: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    investorName: "",
    investorEmail: "",
    investorPhone: "",
    investmentAmount: "",
  });

  const [status, setStatus] = useState<Status>({
    loading: false,
    success: null,
    error: null,
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Animate form groups with gsap.fromTo to ensure elements end up visible
    const formGroups = gsap.utils.toArray<HTMLElement>(".attainments-form-group");
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
          trigger: ".attainments",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate submit button with gsap.fromTo
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
          trigger: ".attainments",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Cleanup specific to this component's ScrollTriggers
    return () => {
      ScrollTrigger.getAll().forEach((triggerInstance) => {
        if (triggerInstance.trigger?.classList.contains("attainments")) {
          triggerInstance.kill();
        }
      });
    };
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setStatus({ loading: true, success: null, error: null });

    try {
      const response = await fetch("/api/submit-investor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          loading: false,
          success: "تم إرسال بياناتك بنجاح!",
          error: null,
        });
        setFormData({
          investorName: "",
          investorEmail: "",
          investorPhone: "",
          investmentAmount: "",
        });
        formRef.current?.reset();
      } else {
        setStatus({
          loading: false,
          success: null,
          error: data.message || "حدث خطأ غير متوقع.",
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
      id="attainments"
      className="attainments section position-relative pb-5 mb-5"
    >
      {/* Section Title */}
      <SectionTitle subtitle="بدك تصير مستثمر مساهم؟" title="عبيلنا النموذج" />

      {/* Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
        <div className="row g-4 g-xl-5">
          <div className="col-sm-6 contact-input attainments-form-group">
            <label htmlFor="investorName">الاسم الكامل</label>
            <input
              type="text"
              id="investorName"
              name="investorName"
              value={formData.investorName}
              onChange={handleChange}
              required
              className="contact-input"
              placeholder="الاسم الكريم"
            />
          </div>

          <div className="col-sm-6 contact-input attainments-form-group">
            <label htmlFor="investorEmail">البريد الإلكتروني</label>
            <input
              type="email"
              id="investorEmail"
              name="investorEmail"
              value={formData.investorEmail}
              onChange={handleChange}
              required
              className="contact-input"
              placeholder="ايميلك بعد إذنك"
            />
          </div>

          <div className="col-sm-6 contact-input attainments-form-group">
            <label htmlFor="investorPhone">رقم الجوال</label>
            <input
              type="tel"
              id="investorPhone"
              name="investorPhone"
              value={formData.investorPhone}
              onChange={handleChange}
              required
              className="contact-input"
              placeholder="لاتنسى مفتاح الدولة"
            />
          </div>

          <div className="col-sm-6 contact-input attainments-form-group">
            <label htmlFor="investmentAmount">مبلغ الاستثمار المتوقع</label>
            <input
              type="number"
              id="investmentAmount"
              name="investmentAmount"
              value={formData.investmentAmount}
              onChange={handleChange}
              required
              className="contact-input"
              placeholder="حدد المبلغ الأقصى بالدولار"
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
      <div className="col-12">
        <Link
          href="#next-section"
          className="d-flex gap-4 align-items-center next-chapter"
        >
          <span className="page">5/6</span>
          <span className="next">القسم التالي</span>
          <span className="icon">
            <i className="ph ph-arrow-elbow-right-down"></i>
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Attainments;
