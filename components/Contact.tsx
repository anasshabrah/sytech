import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
import SectionTitle from "./SectionTitle";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [submitBtn, setSubmitBtn] = React.useState("إرسال");
  useGSAP(() => {
    gsap.fromTo(
      ".section-title-overlay-text",
      { y: "50%" },
      {
        y: "-50%",
        scrollTrigger: {
          trigger: ".contact",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
    gsap.from(".submit-btn", {
      scale: 0,
      duration: 3.5,
      ease: "elastic",
      delay: 0.2,
      scrollTrigger: {
        trigger: ".submit-btn",
      },
    });
    gsap.from(".contact-item", {
      scale: 0,
      duration: 0.8,
      ease: "back",
      scrollTrigger: {
        trigger: ".contact-items",
      },
    });

    gsap.from(".contact-input", {
      opacity: 0,
      scale: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".contact-input",
      },
    });
  });
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitBtn("[جاري الإرسال...");
    emailjs.sendForm(process.env.NEXT_PUBLIC_SERVICE_ID as string, process.env.NEXT_PUBLIC_TEMPLATE_ID as string, form.current!, { publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string }).then(
      function () {
        console.log("إرسلت بنجاح!");
        form.current?.reset();
        setSubmitBtn("نجاح الإرسال");
        setTimeout(function () {
          setSubmitBtn("إرسال");
        }, 3000);
      },
      function (error) {
        setSubmitBtn("إرسال");
        console.log("فشل...", error);
      },
    );
  };
  return (
    <section id="contact" className="contact section position-relative">
      <SectionTitle subtitle="خلينا نتواصل" title="اتركلنا رسالة" />
      <form ref={form} onSubmit={handleSubmit} id="contact-form" className="contact-form">
        <div className="row g-4 g-xl-5">
          <div className="col-sm-6 contact-input">
            <label htmlFor="name">الاسم</label>
            <input type="text" id="user_name" name="user_name" placeholder="اسمك" required />
          </div>
          <div className="col-sm-6 contact-input">
            <label htmlFor="email">الايميل</label>
            <input type="email" id="user_email" name="user_email" placeholder="ايميلك" required />
          </div>
          <div className="col-12 contact-input">
            <label htmlFor="message">الرسالة</label>
            <textarea id="message" name="message" placeholder="رسالتك"></textarea>
          </div>
          <div className="col-12">
            <button type="submit" id="submit-btn" className="submit-btn position-relative">
              <div className="waves-top-md">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              {submitBtn}
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
    </section>
  );
};

export default Contact;
