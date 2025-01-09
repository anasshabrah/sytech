// components/Experience.tsx
"use client";
import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import Link from "next/link";
import SectionTitle from "./SectionTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FormDataState {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
  pitchDeck: File | null;
}

interface SubmitProjectResponse {
  success: boolean;
  message?: string;
}

interface Status {
  loading: boolean;
  success: string | null;
  error: string | null;
}

const Experience: React.FC = () => {
  const [formData, setFormData] = useState<FormDataState>({
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
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".experience",
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
          trigger: ".experience",
          start: "top 80%",
        },
      }
    );
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, files, value } = e.target;
    if (type === "file" && files?.length) {
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

      const contentType = response.headers.get("Content-Type") || "";
      if (!contentType.includes("application/json")) {
        const text = await response.text();
        console.error(`Invalid Content-Type: ${contentType}\nResponse body: ${text}`);
        throw new Error(`Invalid Content-Type: ${contentType}`);
      }

      const resData: SubmitProjectResponse = await response.json();
      if (response.ok && resData.success) {
        setStatus({ loading: false, success: "تم إرسال النموذج بنجاح!", error: null });
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
    <section id="experience" className="experience section position-relative pb-5 mb-5" dir="rtl">
      <SectionTitle subtitle="إذا كنت رائد أعمال سوري، حياك الله" title="ابعتلنا مشروعك لندرسه" />
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="contact-form needs-validation"
        noValidate
      >
        <div className="row g-4 g-xl-5">
          {/* Full Name */}
          <div className="col-sm-6 experience-form-group">
            <div className="form-floating">
              <input
                type="text"
                className={`form-control ${status.error && !formData.fullName ? "is-invalid" : ""}`}
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="الاسم الكامل"
                required
              />
              <label htmlFor="fullName">الاسم الكامل</label>
              {status.error && !formData.fullName && (
                <div className="invalid-feedback">الاسم الكامل مطلوب.</div>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="col-sm-6 experience-form-group">
            <div className="form-floating">
              <input
                type="email"
                className={`form-control ${status.error && !formData.email ? "is-invalid" : ""}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="البريد الإلكتروني"
                required
              />
              <label htmlFor="email">البريد الإلكتروني</label>
              {status.error && !formData.email && (
                <div className="invalid-feedback">البريد الإلكتروني مطلوب.</div>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="col-sm-6 experience-form-group">
            <div className="form-floating">
              <input
                type="tel"
                className={`form-control ${status.error && !formData.phone ? "is-invalid" : ""}`}
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="رقم الجوال"
                required
              />
              <label htmlFor="phone">رقم الجوال</label>
              {status.error && !formData.phone && (
                <div className="invalid-feedback">رقم الجوال مطلوب.</div>
              )}
            </div>
          </div>

          {/* LinkedIn */}
          <div className="col-sm-6 experience-form-group">
            <div className="form-floating">
              <input
                type="url"
                className={`form-control ${status.error && !formData.linkedin ? "is-invalid" : ""}`}
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="لينكدإن"
                required
              />
              <label htmlFor="linkedin">لينكدإن</label>
              {status.error && !formData.linkedin && (
                <div className="invalid-feedback">لينكدإن مطلوب.</div>
              )}
            </div>
          </div>

          {/* Website */}
          <div className="col-sm-6 experience-form-group">
            <div className="form-floating">
              <input
                type="url"
                className={`form-control ${status.error && !formData.website ? "is-invalid" : ""}`}
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="الموقع الإلكتروني"
                required
              />
              <label htmlFor="website">الموقع الإلكتروني</label>
              {status.error && !formData.website && (
                <div className="invalid-feedback">الموقع الإلكتروني مطلوب.</div>
              )}
            </div>
          </div>

          {/* Pitch Deck */}
          <div className="col-sm-6 experience-form-group">
            <label htmlFor="pitchDeck" className="form-label">
              تحميل عرض المشروع (PDF)
            </label>
            <input
              type="file"
              className={`form-control ${status.error && !formData.pitchDeck ? "is-invalid" : ""}`}
              id="pitchDeck"
              name="pitchDeck"
              accept="application/pdf"
              onChange={handleChange}
              required
            />
            {status.error && !formData.pitchDeck && (
              <div className="invalid-feedback">تحميل عرض المشروع مطلوب.</div>
            )}
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
    </section>
  );
};

export default Experience;
