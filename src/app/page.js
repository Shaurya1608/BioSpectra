'use client';
import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  ArrowRight, BookOpen, ShieldCheck,
  Layers, Globe, ChevronLeft, ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ArticleCard from '@/components/common/ArticleCard';
import articlesData from '@/data/articles.json';

// Dynamic import to prevent SSR for the WebGL canvas
// Tree model removed as per user request for book cover replacement
// const TreeModel3D = dynamic(() => import('@/components/common/TreeModel3D'), { ssr: false });

// Assets
const biospectraCover  = '/assets/biospectra.jpg';
const awardImg         = '/assets/award2.jpg';
const certificateImg   = '/assets/cerificate of indexing.jpg';
const msetLogo         = '/assets/mset-logo-png-removebg-preview.png';
const iccbLogo         = '/assets/iccb-logo-removebg-preview.png';

// ── Palette (mirrors the journal cover) ─────────────────────────────────────
const P = {
  deepPurple:   '#2d0057',   // near-black purple — main dark tone
  richPurple:   '#5a0096',   // book-cover left-gradient midpoint
  vivid:        '#8b00cc',   // vivid purple
  magenta:      '#be00be',   // magenta-purple from "BIOSPECTRA" lettering
  white:        '#ffffff',
  offWhite:     '#fdfcff',   // barely-tinted white
  lavenderMist: '#f5eeff',   // section bg
  lavenderSoft: '#ede0ff',   // card bg
  borderSoft:   'rgba(139,0,204,0.1)',
  textBody:     '#3d2a5a',
  textMuted:    '#7c5da0',
};

/* ──────────────────────────────────────────────────────────────────────────
   MAIN PAGE
────────────────────────────────────────────────────────────────────────── */
const Home = () => {
  const scrollContainerRef = useRef(null);
  const [activeArea, setActiveArea] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const amount = window.innerWidth < 768 ? 320 : 380;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex flex-col w-full">

      {/* ══════════════════════════════════════════════════════════
          HERO — Purple editorial split layout (Mobile First)
      ══════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen w-full overflow-hidden flex flex-col lg:block"
        style={{ background: P.lavenderMist, fontFamily: 'var(--font-inter), sans-serif', paddingTop: 'var(--sat, 0px)' }}
      >
        {/* Top accent bar — magenta-to-purple */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] z-20"
          style={{ background: `linear-gradient(90deg, ${P.deepPurple}, ${P.magenta}, ${P.vivid})` }}
        />

        {/* Large ghost number */}
        <div
          className="absolute select-none pointer-events-none hidden sm:block"
          style={{
            right: '6%',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 'clamp(140px, 22vw, 300px)',
            fontWeight: 900,
            color: `rgba(90,0,150,0.04)`,
            lineHeight: 1,
            letterSpacing: '-0.05em',
            zIndex: 1,
          }}
        >
          01
        </div>

        {/* ── RESPONSIVE GRID ── */}
        <div className="relative z-10 min-h-[100svh] pt-[80px] lg:pt-[100px] pb-4 sm:pb-6 lg:pb-8 px-4 sm:px-6 lg:px-8 flex flex-col lg:grid lg:grid-cols-[1fr_1.15fr] gap-4 lg:gap-6">

          {/* ────────────── CONTENT COLUMN (Order: 1) ────────────── */}
          <div
            className="flex flex-col justify-center relative px-6 sm:px-12 lg:pl-[min(8.5vw,110px)] lg:pr-[min(5vw,70px)] py-12 lg:py-8 bg-white rounded-[2rem]"
            style={{ boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)' }}
          >

            {/* Vertical watermark */}
            <div
              className="absolute hidden xl:block select-none pointer-events-none"
              style={{
                left: 12,
                top: '50%',
                transform: 'translateY(-50%) rotate(180deg)',
                writingMode: 'vertical-rl',
                fontSize: 'clamp(56px,8vw,110px)',
                fontWeight: 900,
                color: `rgba(90,0,150,0.05)`,
                letterSpacing: '0.14em',
                textTransform: 'lowercase',
                lineHeight: 1,
              }}
            >
              journal
            </div>

            {/* Tag line */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex items-center gap-3 mb-6 sm:mb-8"
            >
              <div style={{ height: 1, width: 36, background: P.magenta }} className="shrink-0" />
              <span style={{ fontSize: 'clamp(8.5px, 1.2vw, 10px)', letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 700, color: P.magenta }}>
                International Journal of Life Sciences
              </span>
            </motion.div>

            {/* Main headline block */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.68, delay: 0.22 }}
              className="relative"
            >
              <h1
                style={{
                  fontFamily: 'var(--font-crimson-pro), serif',
                  fontSize: 'clamp(42px, 8vw, 86px)',
                  fontWeight: 900,
                  color: '#000',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}
              >
                BIOSPECTRA
              </h1>

              {/* Rule + sub-headline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 12 }}>
                <div style={{ height: 2, width: 'clamp(30px, 5vw, 52px)', background: `linear-gradient(90deg, ${P.deepPurple}, ${P.magenta})`, flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: 'var(--font-crimson-pro), serif',
                    fontSize: 'clamp(14px, 2.5vw, 28px)',
                    fontWeight: 600,
                    color: P.richPurple,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  SCIENTIFIC RESEARCH
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.68, delay: 0.38 }}
              style={{
                fontSize: 'clamp(12px, 1.5vw, 13px)',
                color: P.textBody,
                lineHeight: 1.8,
                maxWidth: 400,
                marginTop: 24,
                marginBottom: 32,
              }}
              className="opacity-90"
            >
              An International Biannual Refereed Journal of Life Sciences (ISSN: 0973-7057). Dedicated to the advancement of biological scientific knowledge since 2006.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.68, delay: 0.52 }}
              className="flex flex-col xs:flex-row gap-4 mb-12 sm:mb-16"
            >
              <Link href="/archive" className="w-full xs:w-auto">
                <button
                  id="hero-cta-explore"
                  className="w-full xs:w-auto"
                  style={{
                    background: `linear-gradient(135deg, ${P.deepPurple}, ${P.richPurple})`,
                    color: '#fff',
                    border: 'none',
                    padding: '14px 32px',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px rgba(90,0,150,0.35)`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  explore <ArrowRight size={13} />
                </button>
              </Link>

              <Link href="/submit" className="w-full xs:w-auto">
                <button
                  id="hero-cta-submit"
                  className="w-full xs:w-auto"
                  style={{
                    background: 'transparent',
                    color: P.richPurple,
                    border: `1.5px solid ${P.richPurple}`,
                    padding: '13px 28px',
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = P.richPurple; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = P.richPurple; }}
                >
                  Submit Article
                </button>
              </Link>
            </motion.div>

            {/* Bottom stat bar */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.72 }}
              className="flex items-center gap-8 sm:gap-12"
            >
              <div style={{ borderLeft: `2px solid ${P.lavenderSoft}`, paddingLeft: 14 }}>
                <div style={{ fontSize: 'clamp(22px, 4vw, 26px)', fontWeight: 900, background: `linear-gradient(135deg, ${P.deepPurple}, ${P.magenta})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>8.546</div>
                <div style={{ fontSize: 8.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: P.textMuted, marginTop: 4 }}>Impact Factor</div>
              </div>

              <div
                style={{
                  background: `linear-gradient(135deg, ${P.deepPurple}, ${P.richPurple})`,
                  padding: '12px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div
                  style={{
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                    fontSize: 8,
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.55)',
                  }}
                >
                  Vol.17
                </div>
                <div style={{ color: '#fff', fontWeight: 900, fontSize: 14, letterSpacing: '0.05em' }}>Issue 2</div>
              </div>
            </motion.div>
          </div>

          {/* ────────────── VISUAL COLUMN (Order: 2) ────────────── */}
          <div
            className="relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem] pb-20 pt-10 lg:py-0"
            style={{ minHeight: '400px' }}
          >
            {/* Background design */}
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, ${P.deepPurple} 0%, ${P.richPurple} 40%, #a020cc 70%, #c440e0 100%)` }}
            />
            <div
              className="absolute inset-0 pointer-events-none opacity-40 sm:opacity-60"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
              }}
            />

            {/* Journal Book Cover — Premium Presentation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="relative z-20 px-10 sm:px-0 w-full max-w-[280px] sm:max-w-[340px] xl:max-w-[420px]"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background: '#fff',
                  padding: 'clamp(8px, 1.5vw, 12px)',
                  boxShadow: '0 30px 60px -15px rgba(26,0,50,0.5), 0 15px 30px -10px rgba(0,0,0,0.3)',
                  border: `1px solid ${P.borderSoft}`,
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <Image 
                  src={biospectraCover} 
                  alt="Biospectra Journal Cover" 
                  width={600} 
                  height={800} 
                  style={{ width: '100%', height: 'auto', display: 'block' }} 
                  priority
                />
              </motion.div>

              {/* Decorative accent behind the book */}
              <div 
                className="absolute top-[10%] -left-[10%] -right-[10%] bottom-[-5%] bg-white/5 border border-white/10 z-[1] transform -rotate-2 hidden sm:block" 
              />
            </motion.div>

            {/* Oval ground shadow */}
            <div
              className="absolute z-10 pointer-events-none bottom-[10%] lg:bottom-[15%] left-1/2 -translateX-1/2"
              style={{
                width: 'clamp(200px, 60%, 320px)',
                height: 18,
                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, transparent 75%)',
                borderRadius: '50%',
                transform: 'translateX(-50%)',
              }}
            />

            {/* ISSN badge */}
            <div
              className="absolute top-6 right-6 sm:top-10 sm:right-10 z-30"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(12px)',
                padding: '10px 18px',
              }}
            >
              <div style={{ fontSize: 7.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 2 }}>P-ISSN</div>
              <div style={{ fontSize: 'clamp(11px, 1.5vw, 13px)', fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>0973 – 7057</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          GOVERNING BODIES
      ══════════════════════════════════════════════════════════ */}
      <section style={{ background: P.lavenderMist, borderTop: `1px solid ${P.borderSoft}`, padding: 'clamp(60px, 8vw, 100px) 0' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)' }}>
          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 'clamp(40px, 8vw, 60px)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-crimson-pro), serif',
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 900,
                color: P.deepPurple,
                letterSpacing: '0.02em',
                margin: 0,
                textAlign: 'center',
                lineHeight: 1.1,
              }}
            >
              OUR GOVERNING BODIES
            </h2>
            <div style={{ height: 2, width: 44, background: `linear-gradient(90deg, ${P.richPurple}, ${P.magenta})`, margin: '24px 0' }} />
            <p style={{ fontSize: 'clamp(12px, 1.5vw, 14px)', color: P.textBody, maxWidth: 500, textAlign: 'center', lineHeight: 1.7, letterSpacing: '0.01em' }} className="opacity-80">
              Biospectra is officially published under the stewardship of these distinguished academic organizations.
            </p>
          </div>

          {/* Cards Grid — Responsive 1 col to 2 cols */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-[1000px] mx-auto">
            {[
              { name: 'Madhawi Shyam Educational Trust', acronym: 'MSET', desc: 'A dedicated foundation committed to advancing higher education and scientific research across the biological sciences.', logo: msetLogo },
              { name: 'International Consortium of Contemporary Biologists', acronym: 'ICCB', desc: 'An international fellowship of scientists and researchers fostering global collaboration and innovation in modern biology.', logo: iccbLogo },
            ].map((body, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  border: `1px solid ${P.borderSoft}`,
                  padding: 'clamp(30px, 5vw, 48px) clamp(20px, 4vw, 36px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                }}
                className="group hover:bg-white transition-all duration-500 hover:shadow-xl hover:shadow-purple-900/5"
              >
                {/* Accent top bar */}
                <div
                  style={{ position: 'absolute', top: -1, left: -1, right: -1, height: 3, background: `linear-gradient(90deg, ${P.deepPurple}, ${P.magenta})`, transformOrigin: 'left', transform: 'scaleX(0)', transition: 'transform 0.5s ease' }}
                  className="group-hover:scale-x-100"
                />

                <div className="h-20 sm:h-24 flex items-center justify-center mb-6 sm:mb-8">
                  <Image src={body.logo} alt={body.name} width={100} height={100} style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }} className="group-hover:scale-105 transition-transform duration-500" />
                </div>

                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: P.magenta, marginBottom: 14 }}>
                  {body.acronym}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-crimson-pro), serif',
                    fontSize: 'clamp(18px, 2vw, 22px)',
                    fontWeight: 800,
                    color: '#000',
                    lineHeight: 1.25,
                    marginBottom: 16,
                    letterSpacing: '0.01em',
                  }}
                >
                  {body.name}
                </h3>

                <div style={{ width: 24, height: 1.5, background: P.borderSoft, marginBottom: 20 }} className="group-hover:w-16 transition-all duration-500" />

                <p style={{ fontSize: 'clamp(12px, 1.4vw, 13px)', color: P.textBody, lineHeight: 1.8, margin: 0 }} className="opacity-90">
                  {body.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          LATEST ARTICLES
      ══════════════════════════════════════════════════════════ */}
      <section style={{ background: P.white, borderTop: `1px solid ${P.borderSoft}`, padding: 'clamp(60px, 8vw, 100px) 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)' }}>
          {/* Header row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-16 gap-8">
            <div style={{ maxWidth: 650 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 32, height: 1.5, background: P.richPurple }} />
                <span style={{ fontSize: 9.5, letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 700, color: P.magenta }}>
                  Recent Publications
                </span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-crimson-pro), serif',
                  fontSize: 'clamp(32px, 5vw, 44px)',
                  fontWeight: 900,
                  color: P.deepPurple,
                  lineHeight: 1.1,
                  letterSpacing: '0.01em',
                  margin: '0 0 16px 0',
                }}
              >
                Latest Research Articles
              </h2>
              <p style={{ fontSize: 'clamp(12px, 1.5vw, 14px)', color: P.textBody, lineHeight: 1.7, margin: 0, letterSpacing: '0.01em' }} className="opacity-80">
                Explore the most recent peer-reviewed studies published in Biospectra, covering breakthrough biological discoveries.
              </p>
            </div>

            <Link href="/archive" className="w-full sm:w-auto">
              <button
                style={{
                  width: '100%',
                  background: 'transparent',
                  color: P.richPurple,
                  border: `1.5px solid ${P.richPurple}`,
                  padding: '12px 28px',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.22s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = P.richPurple;
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = P.richPurple;
                }}
              >
                Full Archive <ArrowRight size={14} />
              </button>
            </Link>
          </div>

          {/* Carousel — Improved Sizing & Peek */}
          <div className="relative group/carousel -mx-6 px-6">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hidden xl:block">
              <button
                onClick={() => scroll('left')}
                style={{ padding: 14, background: '#fff', border: `1px solid ${P.borderSoft}`, color: P.richPurple, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                className="hover:bg-rich-purple hover:text-white transition-all transform hover:scale-110"
              >
                <ChevronLeft size={22} />
              </button>
            </div>

            <div 
              ref={scrollContainerRef} 
              className="flex items-stretch gap-5 sm:gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-10 px-4"
              style={{ paddingBottom: '2.5rem' }}
            >
              {articlesData.map((article) => (
                <div key={article.id} className="snap-start shrink-0 w-[290px] sm:w-[350px] lg:w-[380px]">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>

            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hidden xl:block">
              <button
                onClick={() => scroll('right')}
                style={{ padding: 14, background: '#fff', border: `1px solid ${P.borderSoft}`, color: P.richPurple, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                className="hover:bg-rich-purple hover:text-white transition-all transform hover:scale-110"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          {/* Contribute Banner */}
          <div style={{ marginTop: 24, padding: '0 4px' }}>
            <motion.div 
              whileHover={{ y: -4 }}
              style={{ background: P.lavenderMist, border: `1px solid ${P.borderSoft}`, padding: 'clamp(32px, 5vw, 48px)', display: 'flex', alignItems: 'center', gap: 'clamp(20px, 4vw, 40px)', width: '100%', maxWidth: 1000, margin: '0 auto' }} 
              className="flex-col md:flex-row text-center md:text-left"
            >
              <div style={{ border: `1.5px solid ${P.borderSoft}`, background: P.white, padding: 16, display: 'flex', borderRadius: '4px' }}>
                <BookOpen size={24} color={P.richPurple} />
              </div>
              <div className="flex-1">
                <h4 style={{ fontFamily: 'var(--font-crimson-pro), serif', fontSize: 'clamp(20px, 2.5vw, 24px)', fontWeight: 800, color: P.deepPurple, marginBottom: 6 }}>Contribute to Science</h4>
                <p style={{ fontSize: 'clamp(12px, 1.4vw, 14px)', color: P.textBody, margin: 0, lineHeight: 1.6 }} className="opacity-90">We invite original research papers and review articles from scholars worldwide. Join our academic community today.</p>
              </div>
              <div className="w-full md:w-auto pt-6 md:pt-0">
                <Link href="/submit" className="w-full">
                  <button
                    style={{
                      width: '100%',
                      background: `linear-gradient(135deg, ${P.deepPurple}, ${P.richPurple})`,
                      color: '#fff',
                      border: 'none',
                      padding: '14px 36px',
                      fontSize: 10.5,
                      fontWeight: 800,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: '0 6px 20px rgba(90,0,150,0.15)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 10px 25px rgba(90,0,150,0.25)`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 6px 20px rgba(90,0,150,0.15)`; }}
                  >
                    Submit Paper
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          EDITORIAL HIGHLIGHTS
      ══════════════════════════════════════════════════════════ */}
      <section style={{ background: P.lavenderMist, borderTop: `1px solid ${P.borderSoft}`, padding: 'clamp(60px, 10vw, 120px) 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left side: Images (Ordered 2 on Mobile) */}
            <div className="relative w-full max-w-[500px] mx-auto aspect-[4/3.5] order-2 lg:order-1 mt-10 lg:mt-0">
              {/* Background architectural elements */}
              <div className="absolute top-[5%] right-[5%] w-[85%] h-[85%] bg-purple-900/[0.03] border border-purple-900/10 -rotate-2" />
              <div className="absolute bottom-[5%] left-[5%] w-[75%] h-[75%] bg-purple-900/[0.02] border border-purple-900/5 rotate-1" />

              <motion.div
                initial={{ opacity: 0, x: -30, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ position: 'absolute', left: 0, bottom: 0, width: '65%', zIndex: 10 }}
                className="hover:z-30 transition-transform duration-500 hover:-translate-y-3"
              >
                <div style={{ background: '#fff', padding: 'clamp(6px, 1.2vw, 10px)', border: `1px solid ${P.borderSoft}`, boxShadow: '0 15px 40px -10px rgba(90,0,150,0.2)' }}>
                  <Image src={awardImg} alt="Research Excellence Award" width={400} height={300} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30, y: -30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ position: 'absolute', right: 0, top: 0, width: '60%', zIndex: 20 }}
                className="hover:z-30 transition-transform duration-500 hover:-translate-y-3"
              >
                <div style={{ background: '#fff', padding: 'clamp(6px, 1.2vw, 10px)', border: `1px solid ${P.borderSoft}`, boxShadow: '0 20px 50px -15px rgba(90,0,150,0.25)' }}>
                  <Image src={biospectraCover} alt="Biospectra Journal Cover" width={400} height={500} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </motion.div>
            </div>

            {/* Right side: Text details (Ordered 1 on Mobile) */}
            <div className="max-w-[600px] order-1 lg:order-2">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 32, height: 1.5, background: P.richPurple }} />
                <span style={{ fontSize: 9.5, letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 700, color: P.magenta }}>
                  Editorial Excellence
                </span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-crimson-pro), serif',
                  fontSize: 'clamp(32px, 5vw, 46px)',
                  fontWeight: 900,
                  color: P.deepPurple,
                  lineHeight: 1.1,
                  letterSpacing: '0.01em',
                  margin: '0 0 20px 0',
                }}
              >
                Guided by Academic Rigor
              </h2>
              <p style={{ fontSize: 'clamp(13px, 1.6vw, 15px)', color: P.textBody, lineHeight: 1.8, margin: '0 0 48px 0', letterSpacing: '0.01em' }} className="opacity-80">
                Our journal is steered by a distinguished editorial board comprising leading scientists from premier global institutions, ensuring every paper meets the highest standards of scientific integrity.
              </p>

              <div className="flex flex-col gap-5 sm:gap-6">
                {[
                  { icon: ShieldCheck, title: 'Peer-Reviewed', desc: 'A rigorous double-blind vetting process to ensure high-quality research and data integrity.' },
                  { icon: Layers, title: 'Interdisciplinary', desc: 'Covering a broad spectrum of Life Sciences including Molecular Biology, Zoology, and Biotechnology.' },
                  { icon: Globe, title: 'Global Reach', desc: 'Indexed and recognized worldwide for innovative contributions to modern biological research.' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.2, duration: 0.6 }}
                    style={{
                      background: 'rgba(255,255,255,0.7)',
                      border: `1px solid ${P.borderSoft}`,
                      padding: 'clamp(20px, 4vw, 28px)',
                      display: 'flex',
                      gap: 'clamp(16px, 3vw, 24px)',
                      alignItems: 'flex-start',
                      position: 'relative',
                    }}
                    className="group hover:bg-white transition-all duration-500 hover:shadow-lg"
                  >
                    <div style={{ position: 'absolute', left: -1, top: -1, bottom: -1, width: 3, background: `linear-gradient(to bottom, ${P.deepPurple}, ${P.magenta})`, transformOrigin: 'top', transform: 'scaleY(0)', transition: 'transform 0.5s ease' }} className="group-hover:scale-y-100" />

                    <div style={{ padding: 14, background: P.lavenderMist, border: `1px solid ${P.borderSoft}`, display: 'flex', borderRadius: '4px' }}>
                      <item.icon size={22} color={P.richPurple} />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-crimson-pro), serif', fontSize: 'clamp(17px, 2vw, 20px)', fontWeight: 800, color: P.deepPurple, marginBottom: 8, letterSpacing: '0.01em' }} className="group-hover:text-magenta transition-colors duration-300">{item.title}</h4>
                      <p style={{ fontSize: 'clamp(12px, 1.4vw, 13px)', color: P.textBody, margin: 0, lineHeight: 1.7 }} className="opacity-90">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          RECOGNITION — Global Impact Section
      ══════════════════════════════════════════════════════════ */}
      <section style={{ background: `linear-gradient(135deg, ${P.deepPurple} 0%, #3a0070 50%, #1a0038 100%)`, color: '#fff', borderTop: `1px solid rgba(190,0,190,0.15)`, padding: 'clamp(80px, 12vw, 140px) 0', overflow: 'hidden', position: 'relative' }}>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '60%', height: '100%', opacity: 0.08, backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '5%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, rgba(139,0,204,0.3) 0%, transparent 70%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)', position: 'relative', zIndex: 10 }}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

            <div className="w-full lg:w-[55%] text-center lg:text-left">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <div className="flex items-center justify-center lg:justify-start gap-12 mb-6">
                  <div style={{ width: 32, height: 1.5, background: P.magenta }} />
                  <span style={{ fontSize: 9.5, letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 700, color: P.magenta }}>
                    Official Accreditation
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-crimson-pro), serif',
                    fontSize: 'clamp(34px, 6vw, 56px)',
                    fontWeight: 900,
                    color: '#fff',
                    lineHeight: 1,
                    letterSpacing: '0.01em',
                    margin: '0 0 24px 0',
                  }}
                >
                  World-Class Scientific Standards
                </h2>
                <p style={{ fontSize: 'clamp(14px, 1.8vw, 16px)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, margin: '0 0 40px 0', letterSpacing: '0.01em', maxWidth: 600 }} className="mx-auto lg:mx-0">
                  Biospectra is proud to be part of the <strong style={{ color: '#fff', fontWeight: 700 }}>SJIF Journals Master List</strong>, a recognition of our unwavering dedication to scientific quality and research impact.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    style={{
                      display: 'inline-flex',
                      flexDirection: 'column',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(190,0,190,0.3)',
                      padding: '24px 40px',
                      borderRadius: '4px',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 800, color: P.magenta, marginBottom: 10 }}>
                      SJIF Impact Factor
                    </span>
                    <div className="flex items-baseline gap-4">
                      <span style={{ fontFamily: 'var(--font-crimson-pro), serif', fontSize: 'clamp(44px, 6vw, 60px)', fontWeight: 900, background: `linear-gradient(135deg, #fff, ${P.magenta})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>
                        8.546
                      </span>
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>
                        (2023)
                      </span>
                    </div>
                  </motion.div>
                  
                  <div className="flex flex-col items-center sm:items-start gap-4">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-magenta" style={{ backgroundColor: P.magenta }} />
                      <span style={{ fontWeight: 700, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.9)' }}>PEER REVIEWED</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-magenta" style={{ backgroundColor: P.magenta }} />
                      <span style={{ fontWeight: 700, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.9)' }}>GLOBAL INDEXING</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="w-full lg:w-[40%] flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-magenta/20 blur-[60px] rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', padding: 12, backdropFilter: 'blur(12px)', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}>
                  <Image src={certificateImg} alt="SJIF Certificate" width={450} height={600} style={{ width: '100%', maxWidth: 380, height: 'auto', display: 'block' }} className="shadow-2xl" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PAGE FOOTER — Minimal & Aesthetic
      ══════════════════════════════════════════════════════════ */}
      <footer style={{ background: P.offWhite, padding: 'clamp(60px, 8vw, 100px) 0', borderTop: `1px solid ${P.borderSoft}` }}>
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-6 sm:gap-10">
               <Image src={msetLogo} alt="MSET" width={56} height={56} className="opacity-80 grayscale hover:grayscale-0 transition-all duration-500" />
               <div style={{ width: 1, height: 40, background: P.borderSoft }} />
               <Image src={iccbLogo} alt="ICCB" width={48} height={48} className="opacity-80 grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <p style={{ fontSize: 'clamp(10px, 1.2vw, 11px)', textTransform: 'uppercase', letterSpacing: '0.24em', color: P.textMuted, fontWeight: 700, textAlign: 'center' }}>
              Official Publication of MSET &amp; ICCB • ISSN: 0973-7057
            </p>
          </div>
          
          <div className="w-full max-w-[1200px] h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent opacity-50" />
          
          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1400px] gap-10">
            <p style={{ fontSize: 13, color: P.textMuted, opacity: 0.8 }} className="text-center md:text-left">
              &copy; {mounted ? new Date().getFullYear() : '2024'} Biospectra Journal. Empowering biological sciences since 2006.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
              {['About', 'Editorial Board', 'Archive', 'Contact'].map(item => (
                <Link key={item} href={`/${item.toLowerCase().replace(' ', '')}`} style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800, color: P.deepPurple }} className="hover:text-magenta transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
