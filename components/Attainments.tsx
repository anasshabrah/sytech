"use client";

import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import Link from "next/link";
import SectionTitle from "./SectionTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SubmitInvestorResponse } from "@/app/types";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  investorName: string;
  investorEmail: string;
  investorPhone: string;
  investmentAmount: string;
}

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
    // Fade in each .attainments-form-group on scroll
    const formGroups = gsap.utils.toArray<HTMLElement>(".attainments-form-group");
    gsap.fromTo(
      formGroups,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".attainments",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Use fromTo() for .submit-button so it ends fully visible.
    gsap.fromTo(
      ".submit-button",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power2.out",
      }
    );

    return () => {
      // Only kill triggers associated with .attainments
      ScrollTrigger.getAll().forEach((triggerInstance) => {
        if (triggerInstance?.trigger?.classList.contains("attainments")) {
          triggerInstance.kill();
        }
      });
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);

      const contentType = response.headers.get("Content-Type") || "";
      if (!contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Invalid Content-Type:", contentType, "Response body:", text);
        throw new Error("Server responded with invalid content type.");
      }

      const data: SubmitInvestorResponse = await response.json();
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
    } catch (error: any) {
      console.error("Form submission error:", error);
      setStatus({
        loading: false,
        success: null,
        error:
          error instanceof Error
            ? error.message
            : "حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقًا.",
      });
    }
  };

  return (
    <section
      id="attainments"
      className="attainments section position-relative pb-5 mb-5"
    >
      <SectionTitle subtitle="بدك تصير مستثمر مساهم؟" title="عبيلنا النموذج" />

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
