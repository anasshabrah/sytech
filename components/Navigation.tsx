// components/Navigation.tsx

import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Logo from "@/public/images/logo.png";
import Link from "next/link";
import shuffleLetters from "shuffle-letters";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Navigation = ({
  setNavOpen,
  navOpen,
}: {
  setNavOpen: Dispatch<SetStateAction<boolean>>;
  navOpen: boolean;
}) => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClassChange = (mutationsList: MutationRecord[]) => {
      mutationsList.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const target = mutation.target as HTMLElement;
          if (target.classList.contains("active")) {
            const textElement = target.querySelector(".text");
            if (textElement) {
              shuffleLetters(textElement, { iterations: 5 });
            }
          }
        }
      });
    };

    const observer = new MutationObserver(handleClassChange);
    const config = {
      attributes: true,
      subtree: true,
      attributeFilter: ["class"],
    };

    if (navRef.current) {
      observer.observe(navRef.current, config);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useGSAP(() => {
    gsap.to(".navigation", {
      "--height": "100%",
      duration: 1,
      ease: "power1.inOut",
    });
    gsap.from(".nav-link", {
      duration: 0.8,
      delay: 0.5,
      opacity: 0,
      stagger: 0.1,
    });
  });

  return (
    <>
      <nav
        ref={navRef}
        className={`navigation ${navOpen ? "opened" : ""}`}
        id="navigation"
      >
        <Image src={Logo} className="mb-4 d-xl-none" alt="logo" />
        <ul>
          <li onClick={() => setNavOpen(false)} className="nav-link">
            <Link href="#top" className="active">
              <span>01</span> <span className="text">المقدمة</span>
            </Link>
          </li>
          <li onClick={() => setNavOpen(false)} className="nav-link">
            <Link href="#about_me">
              <span>02</span> <span className="text">من نحن</span>
            </Link>
          </li>
          <li onClick={() => setNavOpen(false)} className="nav-link">
            <Link href="#services">
              <span>03</span> <span className="text">شو بنعمل</span>
            </Link>
          </li>
          <li onClick={() => setNavOpen(false)} className="nav-link">
            <Link href="#attainments">
              <span>04</span> <span className="text">المستثمر</span>
            </Link>
          </li>
          <li onClick={() => setNavOpen(false)} className="nav-link">
            <Link href="#experience">
              <span>05</span> <span className="text">رائد الأعمال</span>
            </Link>
          </li>
          <li onClick={() => setNavOpen(false)} className="nav-link">
            <Link href="#our-projects">
              <span>06</span> <span className="text">مشاريعنا</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div onClick={() => setNavOpen(false)} className="nav-overlay d-xl-none"></div>
    </>
  );
};

export default Navigation;
