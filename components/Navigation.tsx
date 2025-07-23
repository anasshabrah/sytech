// components/Navigation.tsx
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import type { NavProps } from './Header.types';

const links = [
  { href: '/', label: 'الرئيسية' },
  { href: '#about_me', label: 'تعرف علينا' },
  { href: '#services', label: 'الخدمات' },
  { href: '#our-projects', label: 'المشاريع' },
  { href: '/privacy-policy', label: 'سياسة الخصوصية' },
  { href: '/terms-and-conditions', label: 'الشروط والأحكام' },
] as const;

/**
 *  Sliding side-drawer + page-overlay
 *  • Closes on Esc key or overlay click
 *  • Locks body-scroll when open
 */
const Navigation: React.FC<NavProps> = ({ navOpen, setNavOpen }) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setNavOpen(false);
    if (navOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navOpen, setNavOpen]);

  return (
    <>
      {navOpen && (
        <button
          aria-label="إغلاق القائمة"
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setNavOpen(false)}
        />
      )}

      <aside
        id="primary-navigation"
        className={`fixed inset-y-0 right-0 z-50 w-72 transform bg-base shadow-lg transition-transform duration-300 ${
          navOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex h-full flex-col gap-4 p-8 text-lg font-medium" aria-label="التنقل الرئيسي">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setNavOpen(false)}
              className="rounded-lg px-3 py-2 transition hover:bg-golden-bronze/10 hover:text-golden-bronze"
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Navigation;
