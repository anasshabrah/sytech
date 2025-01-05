import Image from "next/image";
import React from "react";
import HeroImg from "@/public/images/hero.png";
import Typewriter from "typewriter-effect";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import gsap from "gsap";

const Hero = ({ classes }: { classes?: string }) => {
  useGSAP(() => {
    gsap.from(".img-wrapper", { duration: 1.5, scale: 1.5, ease: "back", delay: 0.3, opacity: 0 });
    gsap.from(".work-btn", { duration: 1.2, scale: 0, opacity: 0, ease: "bounce" });
    gsap.from(".contact-btn", { duration: 1.2, scale: 0, opacity: 0, ease: "bounce" });

    const freelancer = SplitType.create(".freelancer", { types: 'words' }).words;
    const desc = SplitType.create(".description", { types: 'words' }).words;
    gsap.from(freelancer, { duration: 1.5, opacity: 0, ease: "bounce", stagger: 0.2 });
    gsap.from(desc, { duration: 1, opacity: 0, stagger: 0.2 });
  });
  
  return (
    <section id="top" className={`hero ${classes}`}>
      <div className="row gx-4 justify-content-center align-items-center">
        <div className="col-12 col-md-6 col-xl-6 hero-content">
          <div>
            <h4 className="text-uppercase freelancer">سيرياتك</h4>
            <Typewriter
              component={"h1"}
              options={{
                strings: ["رائد أعمال طموح", "مستثمر ذكي", "مشروع ناجح"],
                autoStart: true,
                loop: true,
              }}
            />
            <p className="description">مسرعة أعمال سورية مساهمة خاصة</p>
          </div>
          <div className="d-flex gap-4">
            <Link href="#attainments" className="btn work-btn text-capitalize btn-secondary">
              سجل كمستثمر
            </Link>
            <Link href="#experience" className="btn contact-btn text-capitalize btn-outline-secondary">
              قدم مشروعك
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-5 offset-md-1 offset-xxl-2 col-xl-4 d-flex justify-content-center">
          <div className="img-wrapper">
            <div className="waves-top">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <Image className="img-fluid rounded-circle hero-img" priority={true} src={HeroImg} alt="" />
            <div className="waves-bottom">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="col-12">
          <Link href="#about_me" className="d-flex gap-4 align-items-center next-chapter mt-5">
            <span className="page">2/6</span>
            <span className="next">القسم التالي</span>
            <span className="icon">
              <i className="ph ph-arrow-elbow-right-down"></i>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
