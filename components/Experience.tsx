"use client";
import React from "react";
import SectionTitle from "./SectionTitle";
import ContactForm from "./ContactForm";

const Experience: React.FC = () => {
  const fields = [
    { name: "fullName", label: "الاسم الكامل", type: "text", required: true },
    { name: "email", label: "البريد الإلكتروني", type: "email", required: true },
    { name: "phone", label: "رقم الجوال", type: "tel", required: true },
    { name: "linkedin", label: "لينكدإن", type: "url", required: true },
    { name: "website", label: "الموقع الإلكتروني", type: "url", required: true },
    {
      name: "pitchDeck",
      label: "تحميل عرض المشروع (PDF)",
      type: "file",
      accept: "application/pdf",
      required: true,
    },
  ];
  return (
    <section
      id="experience"
      className="experience section position-relative pb-5 mb-5"
      dir="rtl"
    >
      <SectionTitle
        subtitle="إذا كنت رائد أعمال سوري، حياك الله"
        title="ابعتلنا مشروعك لندرسه"
      />
      <ContactForm
        fields={fields}
        endpoint="/api/submit-project"
        buttonText="إرسال"
      />
    </section>
  );
};

export default Experience;
