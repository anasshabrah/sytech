// components/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';
import { NavProps } from './Header.types';

const Header: FC<NavProps> = ({ navOpen, setNavOpen }) => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-safe">
        {/* Logo on the right for RTL */}
        <Link href="/" aria-label="سيرياتك Home">
          <Image src="/logo.png" alt="سيرياتك Logo" width={40} height={40} />
        </Link>

        {/* Desktop inline navigation */}
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-primary-dark hover:text-accent-gold">
            الرئيسية
          </Link>
          <Link href="#about_me" className="text-primary-dark hover:text-accent-gold">
            تعرف علينا
          </Link>
          <Link href="#services" className="text-primary-dark hover:text-accent-gold">
            الخدمات
          </Link>
          <Link href="#our-projects" className="text-primary-dark hover:text-accent-gold">
            مشاريعنا
          </Link>
        </nav>

        {/* Hamburger (mobile only) */}
        <button
          onClick={() => setNavOpen(!navOpen)}
          aria-label={navOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          className="md:hidden text-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-golden-bronze"
        >
          {navOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;