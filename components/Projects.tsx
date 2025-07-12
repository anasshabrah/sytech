// components/Projects.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "./SectionTitle";
import useGSAP from "@/hooks/useGSAP";
import Wave from "@/components/Wave";
import { createScrollAnimationCallback, shouldLoop } from "@/lib/utils";

import "swiper/css";
import "swiper/css/pagination";

interface Project {
  id: string | number;
  name: string;
  logo: string;
  shortDescription: string;
}

type ProjectsProps = {
  projects: Project[];
};

export default function Projects({ projects }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const loop = shouldLoop(projects);

  const animationCallback = createScrollAnimationCallback(
    sectionRef,
    { selector: ".project-slide", y: 60, stagger: 0.15, duration: 1, ease: "power3.out" }
  );
  useGSAP(animationCallback, sectionRef);

  return (
    <section
      ref={sectionRef}
      id="our-projects"
      className="relative py-20 bg-base overflow-hidden"
    >
      <Wave variant="geometric" offsetClass="-top-1" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle subtitle="تعرف على مشاريعنا" title="مشاريعنا" />

        <Swiper
          slidesPerView="auto"
          spaceBetween={24}
          loop={loop}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 24 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1280: { slidesPerView: 3, spaceBetween: 24 },
          }}
          dir="rtl"
          className="project-swiper"
        >
          {projects.map(({ id, name, logo, shortDescription }) => (
            <SwiperSlide key={id} className="p-3 project-slide">
              <Link href={`/projects/${id}`} className="group">
                <article className="flex h-full flex-col items-center rounded-2xl bg-base p-8 shadow ring-1 ring-brand-100 transition transform hover:-translate-y-1 hover:shadow-lg hover:scale-105 hover:rotate-1">
                  <div className="mb-4">
                    <Image
                      src={logo}
                      alt={`${name} Logo`}
                      width={120}
                      height={120}
                      className="h-20 w-20 object-contain transition group-hover:scale-110"
                    />
                  </div>
                  <h3 className="mb-2 text-center text-lg font-semibold text-primary-dark">{name}</h3>
                  <p className="text-center text-sm text-primary-dark/70">{shortDescription}</p>
                </article>
              </Link>
            </SwiperSlide>
          ))}

          <div className="swiper-pagination !bottom-0 !relative mt-12" />
        </Swiper>

        <div className="mt-16 text-center">
          <Link
            href="#hero"
            aria-label="العودة للأعلى"
            className="scroll-link border-dark/10 text-primary-dark hover:bg-brand-50"
          >
            <span>⤴ العودة للأعلى</span>
          </Link>
        </div>
      </div>

      <Wave variant="geometric" top={false} flip offsetClass="-bottom-1" />
    </section>
  );
}
