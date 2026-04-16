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

const Navbar = () => {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
      <nav
        className="fixed w-full z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(247,245,239,0.96)'
            : 'rgba(247,245,239,0.85)',
          backdropFilter: 'blur(18px)',
          borderBottom: scrolled
            ? '1px solid rgba(26,46,26,0.12)'
            : '1px solid rgba(26,46,26,0.06)',
          boxShadow: scrolled
            ? '0 4px 24px rgba(26,46,26,0.08)'
            : 'none',
        }}
      >
        {/* Top accent line — matches the hero's top bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: '#1a2e1a' }}
        />

        <div
          className="mx-auto flex items-center justify-between"
          style={{
            maxWidth: 1600,
            padding: '10px clamp(16px,4vw,48px)',
          }}
        >

          {/* ── BRAND BLOCK (unchanged look) ── */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group outline-none">
            <motion.div
              whileHover={{ scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src="/assets/mset-logo-png-removebg-preview.png"
                alt="MSET Logo"
                width={56}
                height={56}
                className="object-contain"
                priority
              />
            </motion.div>

            <div className="flex flex-col">
              <span
                style={{
                  fontFamily: 'var(--font-crimson-pro), serif',
                  fontWeight: 900,
                  fontSize: 'clamp(13px,1.4vw,18px)',
                  lineHeight: 1.1,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: '#0d1a0d',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                }}
                className="group-hover:text-emerald-700 transition-colors"
              >
                Madhawi Shyam Educational Trust
              </span>
              <span
                style={{
                  fontSize: 8.5,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#6b7280',
                  lineHeight: 1.4,
                  marginTop: 2,
                }}
              >
                & International Consortium of Contemporary Biologists (ICCB)
              </span>
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#1a7a3a',
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
                    color: isActive ? '#1a2e1a' : '#4a5568',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#1a2e1a'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#4a5568'; }}
                >
                  {link.name}
                  {/* Active underline */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute',
                        bottom: 2,
                        left: 14,
                        right: 14,
                        height: 2,
                        background: '#1a2e1a',
                        borderRadius: 1,
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Divider */}
            <div
              style={{
                width: 1,
                height: 20,
                background: 'rgba(26,46,26,0.2)',
                margin: '0 10px',
              }}
            />

            {/* Submit CTA */}
            <Link href="/submit">
              <button
                style={{
                  background: pathname === '/submit' ? '#1a2e1a' : 'transparent',
                  color: pathname === '/submit' ? '#fff' : '#1a2e1a',
                  border: '1.5px solid #1a2e1a',
                  padding: '8px 20px',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.22s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#1a2e1a';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={e => {
                  if (pathname !== '/submit') {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#1a2e1a';
                  }
                }}
              >
                Submit
              </button>
            </Link>
          </div>

          {/* ── MOBILE HAMBURGER ── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden"
            style={{
              background: 'none',
              border: '1.5px solid rgba(26,46,26,0.25)',
              padding: '7px',
              cursor: 'pointer',
              color: '#1a2e1a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="lg:hidden fixed z-40"
            style={{
              top: 80,
              left: 16,
              right: 16,
              background: '#f7f5ef',
              border: '1px solid rgba(26,46,26,0.12)',
              boxShadow: '0 16px 40px rgba(26,46,26,0.12)',
            }}
          >
            {/* Top accent */}
            <div style={{ height: 2, background: '#1a2e1a' }} />

            <div style={{ padding: '16px 0' }}>
              {[...NAV_LINKS, { name: 'Submit', path: '/submit' }].map((link, i) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'block',
                      padding: '13px 24px',
                      fontSize: 12,
                      fontWeight: isActive ? 700 : 500,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: isActive ? '#1a2e1a' : '#4a5568',
                      textDecoration: 'none',
                      borderLeft: isActive ? '2px solid #1a2e1a' : '2px solid transparent',
                      background: isActive ? 'rgba(26,46,26,0.04)' : 'transparent',
                      transition: 'all 0.18s ease',
                    }}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
