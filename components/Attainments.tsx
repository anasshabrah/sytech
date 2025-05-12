"use client";
import React from "react";
import SectionTitle from "./SectionTitle";
import ContactForm from "./ContactForm";

const Attainments: React.FC = () => {
  const fields = [
    { name: "investorName", label: "الاسم الكامل", type: "text", required: true },
    { name: "investorEmail", label: "البريد الإلكتروني", type: "email", required: true },
    { name: "investorPhone", label: "رقم الجوال", type: "tel", required: true },
    {
      name: "investmentAmount",
      label: "مبلغ الاستثمار المتوقع",
      type: "number",
      required: true,
      min: 100,
    },
  ];
  return (
    <section
      id="attainments"
      className="attainments section position-relative"
      dir="rtl"
    >
      <SectionTitle subtitle="بدك تصير مستثمر مساهم؟" title="عبيلنا النموذج" />
      <ContactForm
        fields={fields}
        endpoint="/api/submit-investor"
        buttonText="إرسال"
        nextSection="#next-section"
        nextPageNumber="5/6"
        nextPageLabel="القسم التالي"
      />
    </section>
  );
};

export default Attainments;
