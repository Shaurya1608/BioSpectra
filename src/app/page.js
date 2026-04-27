'use client';
import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, useMotionTemplate } from 'framer-motion';
import {
  ArrowRight, BookOpen, ShieldCheck,
  Layers, Globe, ChevronLeft, ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ArticleCard from '@/components/common/ArticleCard';
import articlesData from '@/data/articles.json';

// Dynamic import to prevent SSR for the WebGL canvas
const JournalModel3D = dynamic(() => import('@/components/common/JournalModel3D'), { ssr: false });
const MoleculeNetwork = dynamic(() => import('@/components/common/MoleculeNetwork'), { ssr: false });

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
  neutral:      '#fafafa',   // even lighter professional slate
  offWhite:     '#fdfcff',   // barely-tinted white
  lavenderMist: '#f5eeff',   // soft highlight tone
  lavenderSoft: '#ede0ff',   // card highlight
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
  
  // ── 3D Tilt Logic ──
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);
  
  const mouseX = useSpring(useMotionValue(0), { stiffness: 200, damping: 30 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 200, damping: 30 });
  const revealSize = useSpring(0, { stiffness: 120, damping: 22 });

  const maskImage = useMotionTemplate`radial-gradient(circle ${revealSize}px at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;
    
    const xPct = mX / rect.width - 0.5;
    const yPct = mY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
    
    mouseX.set(mX);
    mouseY.set(mY);

    // Only reveal when cursor is in the DNA zone (left 55%)
    const inDnaZone = mX / rect.width < 0.55;
    revealSize.set(inDnaZone ? 380 : 0);
  };

  const handleMouseEnter = () => {
    // revealSize controlled by mouse position in handleMouseMove
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    revealSize.set(0);
  };

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
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[100svh] w-full overflow-hidden flex flex-col justify-center"
        style={{ 
          fontFamily: 'var(--font-inter), sans-serif', 
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Full-Bleed Container */}
        <div className="relative w-full h-full flex-grow overflow-hidden flex flex-col justify-center">
        
        {/* Green DNA Background - Bottom Layer (Stable) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src="/assets/new-Landing/og-green.png"
            alt="Green DNA"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        {/* Purple DNA Background - Top Layer (Revealed ONLY on Cursor Hover) */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden" 
          style={{ 
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
          }} 
        >
          <Image
            src="/assets/new-Landing/just-dna.png"
            alt="Purple DNA Reveal"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </motion.div>



        {/* Interactive Molecule Network (Cursor Reactive) */}
        <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none mix-blend-screen opacity-100">
          <MoleculeNetwork />
        </div>

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 z-[1] opacity-10 pointer-events-none" 
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />

        {/* Giant Abstract Background Typography */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none opacity-[0.04]">
           <div className="absolute top-[12%] left-[4%]" style={{ fontSize: 'clamp(100px, 18vw, 280px)', fontWeight: 900, lineHeight: 0.8, color: '#fff', letterSpacing: '-0.05em' }}>
             BIO
           </div>
           <div className="absolute bottom-[5%] right-[4%]" style={{ fontSize: 'clamp(100px, 18vw, 280px)', fontWeight: 900, lineHeight: 0.8, color: '#fff', letterSpacing: '-0.05em' }}>
             SCI
           </div>
        </div>

        {/* Global Layout Wrapper — full height flex row */}
        <div className="relative w-full min-h-[100svh] flex flex-row items-stretch z-10">

          {/* ── LEFT COLUMN: Text + CTA (vertically centered) ── */}
          <div className="flex flex-col justify-center flex-1 w-full px-6 lg:pl-[5%] lg:pr-8 z-20 py-20 lg:py-24">

            {/* VOL label */}
            <span className="text-white/60 font-mono tracking-[0.2em] text-[9px] lg:text-[10px] uppercase mb-4">VOL. 17 / ISS. 2</span>

            {/* Main Title */}
            <h1 className="font-medium leading-none mb-4 drop-shadow-2xl" style={{ fontSize: 'clamp(48px, 7vw, 100px)', color: '#ffffff', letterSpacing: '0.05em', textShadow: '0 4px 40px rgba(255,255,255,0.35)', fontFamily: 'var(--font-crimson-pro), Georgia, serif' }}>
              BIOSPECTRA
            </h1>

            {/* Subtitle */}
            <div className="flex flex-col pl-3 lg:pl-4 border-l border-white/30 ml-1 mb-8">
              <span className="text-white/60 font-medium tracking-[0.2em] lg:tracking-[0.3em] text-[8.5px] lg:text-[11px] leading-relaxed uppercase block">INTERNATIONAL BIANNUAL REFEREED</span>
              <span className="text-white font-bold tracking-[0.15em] lg:tracking-[0.2em] text-[10px] lg:text-[13px] leading-tight uppercase mt-1" style={{fontFamily: 'var(--font-inter), sans-serif'}}>JOURNAL OF LIFE SCIENCES</span>
            </div>

            {/* CTA + SJIF */}
            <div className="flex flex-row items-center gap-5 lg:gap-6">
              <Link href="/archive">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/5 text-white border border-white/20 backdrop-blur-md font-bold tracking-[0.2em] text-[8px] lg:text-[10px] uppercase py-3 px-6 rounded shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:bg-white hover:text-black transition-all flex items-center gap-3 group"
                >
                  <span>Explore Issues</span>
                  <ArrowRight size={12} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </motion.button>
              </Link>

              <div className="flex flex-col border-l border-white/20 pl-5 lg:pl-6 py-1">
                <span className="text-white/40 font-mono tracking-[0.2em] text-[7px] lg:text-[8px] uppercase mb-1">IMPACT FACTOR</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-black tracking-widest text-[#e8d5ff] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] text-xs lg:text-sm leading-none">SJIF 8.546</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse shadow-[0_0_10px_rgba(0,255,136,0.6)]" />
                </div>
              </div>
            </div>

            {/* ISSN + Description at bottom of left col — hidden on mobile to save space */}
            <div className="hidden sm:block mt-8 lg:mt-14 border-l border-white/20 pl-4">
              <p className="text-white/45 text-[11px] lg:text-[12px] leading-[2] max-w-[380px] font-medium tracking-[0.04em]">
                An International Biannual Refereed Journal of Life Sciences dedicated to the advancement of biological scientific knowledge since 2006.
              </p>
              <span className="text-white/50 font-mono text-[10px] mt-1 block">(ISSN: 0973-7057)</span>
            </div>
          </div>

          {/* ── RIGHT COLUMN: 3D Book — desktop only ── */}
          <div className="hidden lg:flex relative flex-col items-center justify-center w-[42%] shrink-0 z-10 pointer-events-none">
            {/* Ambient Glow */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                width: '80%', height: '70%',
                background: 'radial-gradient(ellipse at center, rgba(190,0,190,0.3) 0%, transparent 60%)',
                filter: 'blur(60px)',
                zIndex: 0,
              }}
            />
            {/* Book */}
            <div className="relative z-10 w-[260px] sm:w-[320px] lg:w-[400px] h-[380px] lg:h-[520px] pointer-events-auto">
              <JournalModel3D />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span style={{ fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0))' }}
          />
        </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          GOVERNING BODIES
      ══════════════════════════════════════════════════════════ */}
      <section style={{ background: P.neutral, borderTop: `1px solid ${P.borderSoft}`, padding: 'clamp(40px, 5vw, 60px) 0' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)' }}>
          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 'clamp(20px, 4vw, 30px)' }}>
            <h2 className="heading-section text-center" style={{ fontSize: 'var(--font-lg)', color: P.deepPurple }}>
              OUR GOVERNING BODIES
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-richPurple to-magenta my-6 mx-auto" />
            <p className="text-editorial text-center max-w-[500px] mx-auto text-base opacity-80">
              Biospectra is officially published under the stewardship of these distinguished academic organizations.
            </p>
          </div>

          {/* Cards Grid — Responsive 1 col to 2 cols */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-[1000px] mx-auto">
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
                  background: P.white,
                  border: `1px solid rgba(139,0,204,0.15)`,
                  padding: 'clamp(20px, 3vw, 32px) clamp(16px, 3vw, 24px)',
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

                <div className="text-label mb-4">
                  {body.acronym}
                </div>

                <h3 className="heading-section text-black mb-4" style={{ fontSize: 'var(--font-md)' }}>
                  {body.name}
                </h3>

                <div className="w-6 h-[1.5px] bg-border-soft mb-5 group-hover:w-16 transition-all duration-500" />

                <p className="text-editorial text-sm opacity-90">
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
                <h4 className="heading-section text-black mb-1" style={{ fontSize: 'var(--font-md)' }}>Contribute to Science</h4>
                <p className="text-editorial text-sm opacity-90">We invite original research papers and review articles from scholars worldwide. Join our academic community today.</p>
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
      <section className="min-h-[100svh] flex flex-col justify-center py-20 lg:py-0" style={{ background: P.neutral, borderTop: `1px solid ${P.borderSoft}`, overflow: 'hidden' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)', width: '100%' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">

            {/* Left side: Images (Ordered 2 on Mobile) */}
            <div className="relative w-full max-w-[420px] mx-auto aspect-[4/3.5] order-2 lg:order-1 mt-8 lg:mt-0">
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
            <div className="max-w-[550px] order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-[1.5px] bg-accent-mid" />
                <span className="text-label">
                  Editorial Excellence
                </span>
              </div>
              <h2 className="heading-section mb-4" style={{ fontSize: 'clamp(24px, 3vw, 32px)', color: P.deepPurple }}>
                Guided by Academic Rigor
              </h2>
              <p className="text-editorial text-sm opacity-85 leading-relaxed mb-6">
                Our journal is steered by a distinguished editorial board comprising leading scientists from premier global institutions.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  { icon: ShieldCheck, title: 'Peer-Reviewed', desc: 'A rigorous double-blind vetting process ensuring research integrity.' },
                  { icon: Layers, title: 'Interdisciplinary', desc: 'Covering Molecular Biology, Zoology, and Biotechnology.' },
                  { icon: Globe, title: 'Global Reach', desc: 'Indexed worldwide for innovative contributions to research.' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.2, duration: 0.6 }}
                    style={{
                      background: P.white,
                      border: `1px solid rgba(139,0,204,0.12)`,
                      padding: 'clamp(14px, 2.5vw, 20px)',
                      display: 'flex',
                      gap: 'clamp(14px, 2.5vw, 20px)',
                      alignItems: 'flex-start',
                      position: 'relative',
                    }}
                    className="group hover:bg-white transition-all duration-500 hover:shadow-lg"
                  >
                    <div style={{ position: 'absolute', left: -1, top: -1, bottom: -1, width: 3, background: `linear-gradient(to bottom, ${P.deepPurple}, ${P.magenta})`, transformOrigin: 'top', transform: 'scaleY(0)', transition: 'transform 0.5s ease' }} className="group-hover:scale-y-100" />

                    <div style={{ padding: 10, background: P.lavenderMist, border: `1px solid ${P.borderSoft}`, display: 'flex', borderRadius: '4px' }}>
                      <item.icon size={18} color={P.richPurple} />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-crimson-pro), serif', fontSize: 'clamp(16px, 1.8vw, 18px)', fontWeight: 800, color: P.deepPurple, marginBottom: 4, letterSpacing: '0.01em' }} className="group-hover:text-magenta transition-colors duration-300">{item.title}</h4>
                      <p style={{ fontSize: '12px', color: P.textBody, margin: 0, lineHeight: 1.5 }} className="opacity-90">{item.desc}</p>
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
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(190,0,190,0.3)',
                      padding: '24px 40px',
                      borderRadius: '4px',
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
                <div style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.15)', padding: 12, boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}>
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
      <footer style={{ background: P.white, padding: 'clamp(60px, 8vw, 100px) 0', borderTop: `1px solid ${P.borderSoft}` }}>
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
