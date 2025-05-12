// components/ContactForm.tsx

"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useFormState } from "@/hooks/useFormState";
import { useSubmit } from "@/hooks/useSubmit";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Field {
  name: string;
  label: string;
  type: string;
  accept?: string;
  min?: number;
  required?: boolean;
}

interface ContactFormProps {
  fields: Field[];
  endpoint: string;
  buttonText: string;
  nextSection?: string;
  nextPageLabel?: string;
  nextPageNumber?: string;
}

// Define a safe value type for form values
type FormValue = string | File | null;

export default function ContactForm({
  fields,
  endpoint,
  buttonText,
  nextSection,
  nextPageLabel,
  nextPageNumber,
}: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const { values, errors, handleChange, setErrors } = useFormState(
    fields.reduce<Record<string, FormValue>>(
      (acc, f) => ({ ...acc, [f.name]: f.type === "file" ? null : "" }),
      {}
    )
  );

  const { loading, success, error, submit } = useSubmit();
  useScrollReveal(formRef, ".form-group");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    fields.forEach((f) => {
      const v = values[f.name];

      if (f.required && !v) {
        newErrors[f.name] = "مطلوب";
      } else if (
        f.type === "email" &&
        typeof v === "string" &&
        v &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      ) {
        newErrors[f.name] = "بريد غير صالح";
      } else if (
        f.type === "tel" &&
        typeof v === "string" &&
        v &&
        !/^\+?\d{7,14}$/.test(v)
      ) {
        newErrors[f.name] = "هاتف غير صالح";
      } else if (
        f.type === "number" &&
        typeof v === "string" &&
        f.min !== undefined &&
        v &&
        parseFloat(v) < f.min
      ) {
        newErrors[f.name] = `الحد الأدنى ${f.min}`;
      } else if (
        f.type === "file" &&
        f.accept &&
        v instanceof File &&
        v.type !== f.accept
      ) {
        newErrors[f.name] = "نوع ملف غير مدعوم";
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    let body: BodyInit;
    const hasFile = fields.some((f) => f.type === "file");

    if (hasFile) {
      const fm = new FormData();
      Object.entries(values).forEach(([k, v]) => {
        if (v !== null) fm.append(k, v);
      });
      body = fm;
    } else {
      body = JSON.stringify(values);
    }

    const headers: Record<string, string> = {};
    if (!hasFile) headers["Content-Type"] = "application/json";

    await submit(endpoint, { method: "POST", headers, body });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className="row g-4 g-xl-5">
        {fields.map((f) => (
          <div key={f.name} className="col-sm-6 form-group">
            {f.type === "file" ? (
              <>
                <label htmlFor={f.name} className="form-label">
                  {f.label}
                </label>
                <input
                  type="file"
                  id={f.name}
                  name={f.name}
                  accept={f.accept}
                  onChange={handleChange}
                  className={`form-control ${errors[f.name] ? "is-invalid" : ""}`}
                  required={f.required}
                />
                {errors[f.name] && (
                  <div className="invalid-feedback">{errors[f.name]}</div>
                )}
              </>
            ) : (
              <div className="form-floating">
                <input
                  type={f.type}
                  id={f.name}
                  name={f.name}
                  value={typeof values[f.name] === "string" ? values[f.name] : ""}
                  onChange={handleChange}
                  placeholder=" "
                  min={f.min}
                  required={f.required}
                  className={`form-control ${
                    errors[f.name] ? "is-invalid" : ""
                  }`}
                />
                <label htmlFor={f.name}>{f.label}</label>
                {errors[f.name] && (
                  <div className="invalid-feedback">{errors[f.name]}</div>
                )}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="col-12">
            <div className="alert alert-info">جارٍ الإرسال...</div>
          </div>
        )}
        {success && (
          <div className="col-12">
            <div className="alert alert-success">{success}</div>
          </div>
        )}
        {error && (
          <div className="col-12">
            <div className="alert alert-danger">{error}</div>
          </div>
        )}

        <div className="col-12">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-success w-100 submit-button"
          >
            {loading ? "جارٍ الإرسال..." : buttonText}
          </button>
        </div>
      </div>

      {nextSection && nextPageLabel && nextPageNumber && (
        <div className="col-12 mt-4">
          <Link
            href={nextSection}
            className="d-flex gap-4 align-items-center next-chapter"
          >
            <span className="page">{nextPageNumber}</span>
            <span className="next">{nextPageLabel}</span>
            <span className="icon">
              <i className="ph ph-arrow-elbow-right-down"></i>
            </span>
          </Link>
        </div>
      )}
    </form>
  );
}
