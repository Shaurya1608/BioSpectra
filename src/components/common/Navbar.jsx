'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home',           path: '/' },
  { name: 'Issues',         path: '/archive' },
  { name: 'About',          path: '/about' },
  { name: 'Contact',        path: '/contact' },
  { name: 'Editorial Board',path: '/editorial' },
  { name: 'Guidelines',     path: '/guidelines' },
  { name: 'Gallery',        path: '/gallery' },
];

// Purple palette — same tokens as page.js
const P = {
  deepPurple: '#2d0057',
  richPurple: '#5a0096',
  vivid:      '#8b00cc',
  magenta:    '#be00be',
  textBody:   '#3d2a5a',
  textMuted:  '#7c5da0',
  border:     'rgba(139,0,204,0.1)',
};

const Navbar = () => {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
      <nav
        className="fixed z-100 transition-all duration-500 overflow-hidden"
        style={{
          top: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(320px, 96vw, 1500px)',
          borderRadius: '24px',
          background: scrolled
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: scrolled
            ? '1px solid rgba(255, 255, 255, 0.8)'
            : '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: scrolled
            ? '0 10px 30px rgba(90, 0, 150, 0.08)'
            : '0 4px 20px rgba(0, 0, 0, 0.02)',
        }}
      >


        <div
          className="mx-auto flex items-center justify-between"
          style={{ maxWidth: 1600, padding: '10px clamp(12px, 3vw, 48px)' }}
        >

          {/* ── BRAND BLOCK ── */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group outline-none">
            <motion.div
              whileHover={{ scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative w-10 h-10 sm:w-14 sm:h-14"
            >
              <Image
                src="/assets/mset-logo-png-removebg-preview.png"
                alt="MSET Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            <div className="flex flex-col">
              <span
                style={{
                  fontFamily: 'var(--font-crimson-pro), serif',
                  fontWeight: 800,
                  fontSize: 'clamp(12px, 3.8vw, 19px)',
                  lineHeight: 1.1,
                  letterSpacing: '0.01em',
                  textTransform: 'uppercase',
                  color: '#000',
                  whiteSpace: 'nowrap',
                }}
                className="group-hover:text-[#be00be] transition-colors"
              >
                Madhawi Shyam Educational Trust
              </span>
              <span
                style={{
                  fontSize: 'clamp(7px, 2.2vw, 9px)',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: P.textMuted,
                  lineHeight: 1.4,
                  marginTop: 2,
                }}
                className="hidden sm:block"
              >
                &amp; International Consortium of Contemporary Biologists (ICCB)
              </span>
              <span
                style={{
                  fontSize: 'clamp(6.5px, 2vw, 8.5px)',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: P.magenta,
                  lineHeight: 1.4,
                  marginTop: 1,
                }}
              >
                Reg. No. 20560/IV-1815/2005
              </span>
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  style={{
                    position: 'relative',
                    padding: '7px 14px',
                    fontSize: 11.5,
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: isActive ? P.deepPurple : P.textBody,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = P.richPurple; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = P.textBody; }}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute',
                        bottom: 2,
                        left: 14,
                        right: 14,
                        height: 2,
                        background: `linear-gradient(90deg, ${P.deepPurple}, ${P.magenta})`,
                        borderRadius: 1,
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            <div style={{ width: 1, height: 20, background: P.border, margin: '0 10px' }} />

            <Link href="/submit">
              <button
                style={{
                  background: pathname === '/submit'
                    ? `linear-gradient(135deg, ${P.deepPurple}, ${P.richPurple})`
                    : 'transparent',
                  color: pathname === '/submit' ? '#fff' : P.richPurple,
                  border: `1.5px solid ${P.richPurple}`,
                  padding: '8px 20px',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.22s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${P.richPurple}, ${P.magenta})`;
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.boxShadow = `0 6px 18px rgba(90,0,150,0.3)`;
                  e.currentTarget.style.borderColor = P.magenta;
                }}
                onMouseLeave={e => {
                  if (pathname !== '/submit') {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = P.richPurple;
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = P.richPurple;
                  }
                }}
              >
                Submit
              </button>
            </Link>
          </div>


        </div>
      </nav>

      {/* ── MOBILE FULLSCREEN OVERLAY ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-90 bg-white"
            style={{
              paddingTop: 'calc(80px + var(--sat, 0px))',
              paddingBottom: 'var(--sab, 0px)',
            }}
          >
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
               <div className="absolute top-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-purple-50 blur-[100px]" />
               <div className="absolute bottom-[-10%] left-[-10%] w-[50%] aspect-square rounded-full bg-magenta-50/20 blur-[100px]" />
            </div>

            <nav className="relative h-full flex flex-col px-8 py-10 overflow-y-auto">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.path;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className="block py-4 border-b border-purple-50 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          style={{
                            fontSize: 24,
                            fontFamily: 'var(--font-crimson-pro), serif',
                            fontWeight: isActive ? 900 : 700,
                            color: isActive ? P.magenta : P.deepPurple,
                            letterSpacing: '0.02em',
                          }}
                        >
                          {link.name}
                        </span>
                        {isActive && <div className="w-2 h-2 rounded-full bg-magenta" style={{ backgroundColor: P.magenta }} />}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 + 0.2 }}
                className="mt-12"
              >
                <Link href="/submit" onClick={() => setIsOpen(false)}>
                  <button
                    style={{
                      width: '100%',
                      background: `linear-gradient(135deg, ${P.deepPurple}, ${P.richPurple})`,
                      color: '#fff',
                      padding: '18px',
                      fontSize: 14,
                      fontWeight: 800,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      borderRadius: '12px',
                      boxShadow: '0 10px 30px rgba(90,0,150,0.2)',
                    }}
                  >
                    Submit Article
                  </button>
                </Link>
              </motion.div>

              {/* Mobile Footer Info */}
              <div className="mt-auto pt-10 text-center">
                <p style={{ fontSize: 10, color: P.textMuted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Biospectra Journal • ISSN: 0973-7057
                </p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
