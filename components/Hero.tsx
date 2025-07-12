// components/Hero.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitType from 'split-type';
import heroImg from '@/public/images/hero.png';
import Wave from '@/components/Wave';

export default function Hero() {
  const [navOpen, setNavOpen] = useState(false);

  useGSAP(() => {
    gsap.from('.hero-img', {
      opacity: 0,
      scale: 1.2,
      duration: 1,
      ease: 'power2.out',
    });

    const words = new SplitType('.hero-headline', { types: 'words' }).words;
    gsap.from(words, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power4.out',
    });
  }, []);

  return (
    <>
      {/* ——————— Hero Section (header removed) ——————— */}
      <section
        id="hero"
        className="relative mt-20 overflow-hidden bg-[radial-gradient(circle_at_80%_20%,var(--golden-bronze)_0%,transparent_70%)] py-20"
      >
        {/* Bottom hero wave */}
        <Wave variant="hero" top={false} flip />

        {/* Content container */}
        <div className="relative z-10 max-w-screen-2xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16 px-safe">
          <div className="z-10 w-full md:w-1/2 max-w-2xl bg-black/40 backdrop-blur-sm p-8 rounded-2xl text-white text-center md:text-right border border-accent-gold-light shadow-lg">
            <h4 className="mb-2 text-sm tracking-widest text-golden-bronze uppercase">
              سيرياتك
            </h4>
            <h1 className="hero-headline mb-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-snug text-primary-dark">
              <span className="inline-block">سيرياتك - تحول رقمي فعّال</span>
            </h1>
            <p className="mb-6 text-lg leading-relaxed text-accent-gold">
              شركة تطوير رقمي مختصة ببناء التطبيقات، المواقع، ومنصات التجارة الإلكترونية الحديثة.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link href="#services" className="btn-primary px-6 py-3 w-full sm:w-auto">
                خدماتنا
              </Link>
              <Link href="#our-projects" className="btn-secondary px-6 py-3 w-full sm:w-auto">
                مشاريعنا
              </Link>
            </div>
          </div>
          <div className="relative w-full md:w-1/2 flex justify-center">
            <Image
              src={heroImg}
              alt="رسم توضيحي لريادة الأعمال الرقمية"
              className="hero-img w-64 sm:w-72 md:w-80 rounded-full object-cover shadow-2xl transition-transform hover:scale-110"
              priority
            />
            <div className="absolute inset-0 -z-10 rounded-full bg-golden-bronze/10 blur-3xl" />
          </div>
        </div>
      </section>
    </>
  );
}
