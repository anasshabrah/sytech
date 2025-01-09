// components/Attainments.tsx
"use client";
import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import Link from "next/link";
import SectionTitle from "./SectionTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  investorName: string;
  investorEmail: string;
  investorPhone: string;
  investmentAmount: string;
}

interface SubmitInvestorResponse {
  success: boolean;
  message?: string;
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
        },
      }
    );
    gsap.fromTo(
      ".submit-button",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".attainments",
          start: "top 80%",
        },
      }
    );
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

      const contentType = response.headers.get("Content-Type") || "";
      if (!contentType.includes("application/json")) {
        const text = await response.text();
        console.error(`Invalid Content-Type: ${contentType}\nResponse body: ${text}`);
        throw new Error(`Invalid Content-Type: ${contentType}`);
      }

      const data: SubmitInvestorResponse = await response.json();
      console.log("API Response:", data);
      if (response.ok && data.success) {
        setStatus({ loading: false, success: "تم إرسال بياناتك بنجاح!", error: null });
        setFormData({ investorName: "", investorEmail: "", investorPhone: "", investmentAmount: "" });
        formRef.current?.reset();
      } else {
        setStatus({
          loading: false,
          success: null,
          error: data.message || "حدث خطأ غير متوقع.",
        });
      }
    } catch (err: any) {
      console.error("Fetch Error:", err);
      setStatus({
        loading: false,
        success: null,
        error: err.message || "حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقًا.",
      });
    }
  };

  return (
    <section id="attainments" className="attainments section position-relative pb-5 mb-5" dir="rtl">
      <SectionTitle subtitle="بدك تصير مستثمر مساهم؟" title="عبيلنا النموذج" />
      <form ref={formRef} onSubmit={handleSubmit} className="contact-form needs-validation" noValidate>
        <div className="row g-4 g-xl-5">
          {/* Investor Name */}
          <div className="col-sm-6 attainments-form-group">
            <div className="form-floating">
              <input
                type="text"
                className={`form-control ${status.error && !formData.investorName ? "is-invalid" : ""}`}
                id="investorName"
                name="investorName"
                value={formData.investorName}
                onChange={handleChange}
                placeholder="الاسم الكامل"
                required
              />
              <label htmlFor="investorName">الاسم الكامل</label>
              {status.error && !formData.investorName && (
                <div className="invalid-feedback">الاسم الكامل مطلوب.</div>
              )}
            </div>
          </div>

          {/* Investor Email */}
          <div className="col-sm-6 attainments-form-group">
            <div className="form-floating">
              <input
                type="email"
                className={`form-control ${status.error && !formData.investorEmail ? "is-invalid" : ""}`}
                id="investorEmail"
                name="investorEmail"
                value={formData.investorEmail}
                onChange={handleChange}
                placeholder="البريد الإلكتروني"
                required
              />
              <label htmlFor="investorEmail">البريد الإلكتروني</label>
              {status.error && !formData.investorEmail && (
                <div className="invalid-feedback">البريد الإلكتروني مطلوب.</div>
              )}
            </div>
          </div>

          {/* Investor Phone */}
          <div className="col-sm-6 attainments-form-group">
            <div className="form-floating">
              <input
                type="tel"
                className={`form-control ${status.error && !formData.investorPhone ? "is-invalid" : ""}`}
                id="investorPhone"
                name="investorPhone"
                value={formData.investorPhone}
                onChange={handleChange}
                placeholder="رقم الجوال"
                required
              />
              <label htmlFor="investorPhone">رقم الجوال</label>
              {status.error && !formData.investorPhone && (
                <div className="invalid-feedback">رقم الجوال مطلوب.</div>
              )}
            </div>
          </div>

          {/* Investment Amount */}
          <div className="col-sm-6 attainments-form-group">
            <div className="form-floating">
              <input
                type="number"
                className={`form-control ${status.error && !formData.investmentAmount ? "is-invalid" : ""}`}
                id="investmentAmount"
                name="investmentAmount"
                value={formData.investmentAmount}
                onChange={handleChange}
                placeholder="مبلغ الاستثمار المتوقع"
                required
                min="100"
              />
              <label htmlFor="investmentAmount">مبلغ الاستثمار المتوقع</label>
              {status.error && !formData.investmentAmount && (
                <div className="invalid-feedback">مبلغ الاستثمار مطلوب ويجب أن يكون 100 دولار على الأقل.</div>
              )}
            </div>
          </div>

          {/* Status Messages */}
          {status.loading && (
            <div className="col-12">
              <div className="alert alert-info" role="alert">
                جارٍ الإرسال...
              </div>
            </div>
          )}
          {status.success && (
            <div className="col-12">
              <div className="alert alert-success" role="alert">
                {status.success}
              </div>
            </div>
          )}
          {status.error && (
            <div className="col-12">
              <div className="alert alert-danger" role="alert">
                {status.error}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="col-12">
            <button
              type="submit"
              disabled={status.loading}
              className="btn btn-success w-100 submit-button"
            >
              {status.loading ? "جارٍ الإرسال..." : "إرسال"}
            </button>
          </div>
        </div>
      </form>
      <div className="col-12 mt-4">
        <Link href="#next-section" className="d-flex gap-4 align-items-center next-chapter">
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
