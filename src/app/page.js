'use client';
import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  ArrowRight, BookOpen, ShieldCheck,
  Layers, Globe, ChevronLeft, ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import ArticleCard from '@/components/common/ArticleCard';
import articlesData from '@/data/articles.json';

// Dynamic import to prevent SSR for the WebGL canvas
const TreeModel3D = dynamic(() => import('@/components/common/TreeModel3D'), { ssr: false });

// Assets
const biospectraCover  = '/assets/biospectra.jpg';
const awardImg         = '/assets/award2.jpg';
const certificateImg   = '/assets/cerificate of indexing.jpg';
const msetLogo         = '/assets/mset-logo-png-removebg-preview.png';
const iccbLogo         = '/assets/iccb-logo-removebg-preview.png';

/* ─────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────── */
const Home = () => {
  const scrollContainerRef = useRef(null);
  const [activeArea, setActiveArea] = useState(1);

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
          HERO — Bonsai-inspired editorial split layout
      ══════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen w-full overflow-hidden"
        style={{ background: '#f7f5ef', fontFamily: 'var(--font-inter), sans-serif' }}
      >
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-20" style={{ background: '#1a2e1a' }} />

        {/* Large ghost number */}
        <div
          className="absolute select-none pointer-events-none"
          style={{
            right: '6%',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 'clamp(140px, 22vw, 300px)',
            fontWeight: 900,
            color: 'rgba(26,46,26,0.05)',
            lineHeight: 1,
            letterSpacing: '-0.05em',
          }}
        >
          01
        </div>

        {/* ── TWO-COLUMN GRID ── */}
        <div
          className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_1.15fr]"
        >
          {/* ────────────── LEFT COLUMN ────────────── */}
          <div
            className="flex flex-col justify-center relative"
            style={{ padding: 'clamp(100px,10vw,140px) clamp(30px,4vw,70px) 60px clamp(60px,8vw,110px)' }}
          >

            {/* Vertical watermark */}
            <div
              className="absolute hidden lg:block select-none pointer-events-none"
              style={{
                left: 12,
                top: '50%',
                transform: 'translateY(-50%) rotate(180deg)',
                writingMode: 'vertical-rl',
                fontSize: 'clamp(56px,8vw,110px)',
                fontWeight: 900,
                color: 'rgba(26,46,26,0.07)',
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
              style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, marginLeft: 28 }}
            >
              <div style={{ height: 1, width: 36, background: '#1a2e1a' }} />
              <span style={{ fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 700, color: '#1a2e1a', opacity: 0.65 }}>
                International Journal of Life Sciences
              </span>
            </motion.div>

            {/* Main headline block */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.68, delay: 0.22 }}
              style={{ marginLeft: 28 }}
            >
              {/* Line 1 */}
              <h1
                style={{
                  fontFamily: 'var(--font-crimson-pro), serif',
                  fontSize: 'clamp(46px, 6.5vw, 86px)',
                  fontWeight: 900,
                  color: '#0d1a0d',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}
              >
                BIOSPECTRA
              </h1>

              {/* Rule + sub-headline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8, marginBottom: 0 }}>
                <div style={{ height: 2, width: 52, background: '#1a2e1a', flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: 'var(--font-crimson-pro), serif',
                    fontSize: 'clamp(16px, 2.1vw, 28px)',
                    fontWeight: 600,
                    color: '#0d1a0d',
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
                fontSize: 12.5,
                color: '#4a5568',
                lineHeight: 1.8,
                maxWidth: 310,
                marginTop: 20,
                marginBottom: 28,
                marginLeft: 28,
              }}
            >
             An International Biannual Refereed Journal of Life Sciences (ISSN: 0973-7057). Published since 2006.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.68, delay: 0.52 }}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginLeft: 28 }}
            >
              <Link href="/archive">
                <button
                  id="hero-cta-explore"
                  style={{
                    background: '#1a2e1a',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 28px',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#2d5a2d'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1a2e1a'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  explore <ArrowRight size={13} />
                </button>
              </Link>

              <Link href="/submit">
                <button
                  id="hero-cta-submit"
                  style={{
                    background: 'transparent',
                    color: '#1a2e1a',
                    border: '1.5px solid #1a2e1a',
                    padding: '11px 24px',
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1a2e1a'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1a2e1a'; }}
                >
                  Submit Article
                </button>
              </Link>
            </motion.div>

            {/* Bottom stat bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.72 }}
              style={{ display: 'flex', alignItems: 'flex-end', gap: 28, marginTop: 'clamp(32px,5vh,60px)', marginLeft: 28 }}
            >
              <div style={{ borderLeft: '2px solid #c9c9bc', paddingLeft: 14 }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#1a2e1a', lineHeight: 1 }}>8.546</div>
                <div style={{ fontSize: 8.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6b7280', marginTop: 4 }}>Impact Factor</div>
              </div>

              <div
                style={{
                  background: '#1a4a1a',
                  padding: '14px 22px',
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
                <div style={{ color: '#fff', fontWeight: 900, fontSize: 15, letterSpacing: '0.05em' }}>Issue 2</div>
              </div>
            </motion.div>
          </div>

          {/* ────────────── RIGHT COLUMN — 3D Tree ────────────── */}
          <div
            className="hidden lg:flex relative flex-col items-center justify-center overflow-hidden"
            style={{ minHeight: '100vh' }}
          >
            {/* Sage background */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg,#e8ede8 0%,#d8e5d8 55%,#e2eae0 100%)' }}
            />

            {/* Subtle dot grid */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(26,46,26,0.1) 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
                opacity: 0.35,
              }}
            />

            {/* 3D Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
              style={{ width: '100%', height: '72vh', maxHeight: 640, minHeight: 380, position: 'relative', zIndex: 10 }}
            >
              <TreeModel3D />
            </motion.div>

            {/* Oval ground shadow */}
            <div
              className="absolute z-20 pointer-events-none"
              style={{
                bottom: '18%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 280,
                height: 18,
                background: 'radial-gradient(ellipse at center, rgba(26,46,26,0.2) 0%, transparent 70%)',
                borderRadius: '50%',
              }}
            />

            {/* Focus area selector */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute bottom-8 z-30"
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <span style={{ fontSize: 9, color: '#4a5568', letterSpacing: '0.14em', marginRight: 8, textTransform: 'uppercase' }}>Focus Area</span>
              {['Zoology', 'Botany', 'Biotechnology'].map((label, i) => (
                <button
                  key={i}
                  id={`focus-area-${label.toLowerCase()}`}
                  onClick={() => setActiveArea(i)}
                  style={{
                    padding: '7px 16px',
                    fontSize: 9,
                    fontWeight: activeArea === i ? 700 : 500,
                    letterSpacing: '0.13em',
                    textTransform: 'uppercase',
                    background: activeArea === i ? '#1a2e1a' : 'rgba(255,255,255,0.72)',
                    color: activeArea === i ? '#fff' : '#4a5568',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {label}
                </button>
              ))}
            </motion.div>

            {/* Arrow nav */}
            <div className="absolute left-3 bottom-8 z-30" style={{ display: 'flex', gap: 8 }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1a2e1a', opacity: 0.45, lineHeight: 1, padding: 0 }}>
                <ChevronLeft size={17} />
              </button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1a2e1a', opacity: 0.45, lineHeight: 1, padding: 0 }}>
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-1.5"
        >
          <span style={{ fontSize: 8.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6b7280' }}>scroll</span>
          <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom,rgba(26,46,26,0.45),transparent)' }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          GOVERNING BODIES
      ══════════════════════════════════════════════════════════ */}
      <section style={{ background: '#f7f5ef', borderTop: '1px solid rgba(26,46,26,0.06)', padding: 'clamp(50px, 8vw, 80px) 0' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 clamp(20px, 4vw, 60px)' }}>
          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 'clamp(36px, 6vw, 50px)' }}>
            <h2 
              style={{ 
                fontFamily: 'var(--font-crimson-pro), serif', 
                fontSize: 'clamp(26px, 3.5vw, 36px)', 
                fontWeight: 900, 
                color: '#0d1a0d', 
                letterSpacing: '0.02em', 
                margin: 0, 
                textAlign: 'center',
                lineHeight: 1.1
              }}
            >
              OUR GOVERNING BODIES
            </h2>
            <div style={{ height: 2, width: 40, background: '#1a2e1a', margin: '20px 0' }} />
            <p style={{ fontSize: 13, color: '#4a5568', maxWidth: 450, textAlign: 'center', lineHeight: 1.7, letterSpacing: '0.02em' }}>
              Biospectra is officially published under the stewardship of these distinguished academic organizations.
            </p>
          </div>

          {/* Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 840, margin: '0 auto' }}>
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
                  background: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(26,46,26,0.08)',
                  padding: '36px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative'
                }}
                className="group hover:bg-white transition-colors duration-500"
              >
                {/* Accent top bar */}
                <div style={{ position: 'absolute', top: -1, left: -1, right: -1, height: 3, background: '#1a2e1a', transformOrigin: 'left', transform: 'scaleX(0)', transition: 'transform 0.5s ease' }} className="group-hover:scale-x-100" />
                
                <div style={{ height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                  <Image src={body.logo} alt={body.name} width={90} height={90} style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }} className="group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#1a7a3a', marginBottom: 12 }}>
                  {body.acronym}
                </div>
                
                <h3 
                  style={{ 
                    fontFamily: 'var(--font-crimson-pro), serif', 
                    fontSize: 18, 
                    fontWeight: 800, 
                    color: '#0d1a0d', 
                    lineHeight: 1.25, 
                    marginBottom: 16,
                    letterSpacing: '0.01em'
                  }}
                >
                  {body.name}
                </h3>
                
                <div style={{ width: 24, height: 1.5, background: 'rgba(26,46,26,0.15)', marginBottom: 16 }} className="group-hover:w-12 transition-all duration-500" />
                
                <p style={{ fontSize: 12, color: '#4a5568', lineHeight: 1.7, margin: 0 }}>
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
      <section style={{ background: '#fff', borderTop: '1px solid rgba(26,46,26,0.06)', padding: 'clamp(50px, 8vw, 80px) 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 clamp(20px, 4vw, 60px)' }}>
          {/* Header row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(36px, 6vw, 50px)', gap: 24 }}>
            <div style={{ maxWidth: 600 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 32, height: 1.5, background: '#1a2e1a' }} />
                <span style={{ fontSize: 9.5, letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 700, color: '#1a7a3a' }}>
                  Recent Publications
                </span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-crimson-pro), serif',
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  fontWeight: 900,
                  color: '#0d1a0d',
                  lineHeight: 1.1,
                  letterSpacing: '0.01em',
                  margin: '0 0 12px 0'
                }}
              >
                Latest Research Articles
              </h2>
              <p style={{ fontSize: 13, color: '#4a5568', lineHeight: 1.7, margin: 0, letterSpacing: '0.02em' }}>
                Explore the most recent peer-reviewed studies published in Biospectra.
              </p>
            </div>
            
            <Link href="/archive">
              <button
                style={{
                  background: 'transparent',
                  color: '#1a2e1a',
                  border: '1.5px solid #1a2e1a',
                  padding: '10px 20px',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.22s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#1a2e1a';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.querySelector('svg').style.transform = 'translateX(4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#1a2e1a';
                  e.currentTarget.querySelector('svg').style.transform = 'translateX(0)';
                }}
              >
                Full Archive <ArrowRight size={14} style={{ transition: 'transform 0.22s ease' }} />
              </button>
            </Link>
          </div>

          {/* Carousel */}
          <div className="relative group/carousel mt-6 md:mt-8">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hidden md:block">
              <button onClick={() => scroll('left')} style={{ padding: 12, background: '#fff', border: '1px solid rgba(26,46,26,0.1)', color: '#1a2e1a', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex' }} className="hover:bg-[#1a2e1a] hover:text-white" aria-label="Scroll left">
                <ChevronLeft size={20} />
              </button>
            </div>

            <div ref={scrollContainerRef} className="flex items-stretch gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 px-4 -mx-4 md:px-2 md:-mx-2">
              {articlesData.map((article) => (
                <div key={article.id} className="snap-start shrink-0 w-[280px] md:w-[340px]">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hidden md:block">
              <button onClick={() => scroll('right')} style={{ padding: 12, background: '#fff', border: '1px solid rgba(26,46,26,0.1)', color: '#1a2e1a', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex' }} className="hover:bg-[#1a2e1a] hover:text-white" aria-label="Scroll right">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Contribute Banner */}
          <div style={{ marginTop: 40, borderTop: '1px solid rgba(26,46,26,0.06)', paddingTop: 40, display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: '#f7f5ef', border: '1px solid rgba(26,46,26,0.08)', padding: '32px 40px', display: 'flex', flexDirection: 'column', md: 'row', alignItems: 'center', gap: 24, width: '100%', maxWidth: 840 }} className="md:flex-row">
              <div style={{ border: '1px solid rgba(26,46,26,0.1)', background: '#fff', padding: 12, display: 'flex' }}>
                <BookOpen size={20} color="#1a2e1a" />
              </div>
              <div style={{ textAlign: 'center' }} className="md:text-left flex-1">
                <h4 style={{ fontFamily: 'var(--font-crimson-pro), serif', fontSize: 20, fontWeight: 800, color: '#0d1a0d', marginBottom: 4 }}>Contribute to Science</h4>
                <p style={{ fontSize: 12.5, color: '#4a5568', margin: 0, lineHeight: 1.6 }}>We welcome original research papers and review articles. Join our community today.</p>
              </div>
              <div className="pt-4 md:pt-0">
                <Link href="/submit">
                  <button
                    style={{
                      background: '#1a2e1a',
                      color: '#fff',
                      border: 'none',
                      padding: '12px 24px',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.22s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#1a7a3a'}
                    onMouseLeave={e => e.currentTarget.style.background = '#1a2e1a'}
                  >
                    Submit Paper
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          EDITORIAL HIGHLIGHTS
      ══════════════════════════════════════════════════════════ */}
      <section style={{ background: '#f7f5ef', borderTop: '1px solid rgba(26,46,26,0.06)', padding: 'clamp(50px, 8vw, 80px) 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 clamp(20px, 4vw, 60px)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            
            {/* Left side: Images */}
            <div style={{ position: 'relative', width: '100%', maxWidth: 500, margin: '0 auto', aspectRatio: '4/3' }}>
              {/* Background architectural square */}
              <div style={{ position: 'absolute', top: '10%', right: '10%', width: '80%', height: '80%', background: 'rgba(26,46,26,0.03)', border: '1px solid rgba(26,46,26,0.08)' }} />
              <div style={{ position: 'absolute', bottom: '5%', left: '5%', width: '70%', height: '70%', background: 'rgba(26,46,26,0.02)', border: '1px solid rgba(26,46,26,0.08)' }} />

              <motion.div
                  initial={{ opacity: 0, x: -20, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  style={{ position: 'absolute', left: 0, bottom: 0, width: '60%', zIndex: 10 }}
                  className="hover:z-30 transition-transform duration-500 hover:-translate-y-2"
                >
                  <div style={{ background: '#fff', padding: 8, border: '1px solid rgba(26,46,26,0.1)', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}>
                    <Image src={awardImg} alt="Research Excellence Award" width={400} height={300} style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20, y: -20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  style={{ position: 'absolute', right: 0, top: 0, width: '55%', zIndex: 20 }}
                  className="hover:z-30 transition-transform duration-500 hover:-translate-y-2"
                >
                  <div style={{ background: '#fff', padding: 8, border: '1px solid rgba(26,46,26,0.1)', boxShadow: '0 15px 40px -15px rgba(0,0,0,0.15)' }}>
                    <Image src={biospectraCover} alt="Biospectra Journal Cover" width={400} height={500} style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                </motion.div>
            </div>

            {/* Right side: Text details */}
            <div style={{ maxWidth: 600 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 32, height: 1.5, background: '#1a2e1a' }} />
                <span style={{ fontSize: 9.5, letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 700, color: '#1a7a3a' }}>
                  Editorial Board
                </span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-crimson-pro), serif',
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  fontWeight: 900,
                  color: '#0d1a0d',
                  lineHeight: 1.1,
                  letterSpacing: '0.01em',
                  margin: '0 0 12px 0'
                }}
              >
                Academic Excellence
              </h2>
              <p style={{ fontSize: 13, color: '#4a5568', lineHeight: 1.7, margin: '0 0 40px 0', letterSpacing: '0.02em' }}>
                Guided by a distinguished editorial board from premier national and international institutions.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { icon: ShieldCheck, title: 'Peer-Reviewed', desc: 'Rigorous vetting process to ensure high-quality research standards and data integrity.' },
                  { icon: Layers, title: 'Interdisciplinary', desc: 'Covering a broad spectrum of Life Sciences including Zoology, Botany, and Biotechnology.' },
                  { icon: Globe, title: 'Global Reach', desc: 'Indexed and recognized by researchers worldwide for innovative scientific contributions.' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.2, duration: 0.5 }}
                    style={{
                      background: 'rgba(255,255,255,0.6)',
                      border: '1px solid rgba(26,46,26,0.08)',
                      padding: '24px',
                      display: 'flex',
                      gap: 20,
                      alignItems: 'flex-start',
                      position: 'relative'
                    }}
                    className="group hover:bg-white transition-colors duration-500"
                  >
                    <div style={{ position: 'absolute', left: -1, top: -1, bottom: -1, width: 3, background: '#1a2e1a', transformOrigin: 'top', transform: 'scaleY(0)', transition: 'transform 0.5s ease' }} className="group-hover:scale-y-100" />
                    
                    <div style={{ padding: '12px', background: '#fff', border: '1px solid rgba(26,46,26,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <item.icon size={20} color="#1a2e1a" />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-crimson-pro), serif', fontSize: 18, fontWeight: 800, color: '#0d1a0d', marginBottom: 6, letterSpacing: '0.01em' }} className="group-hover:text-[#1a7a3a] transition-colors duration-300">{item.title}</h4>
                      <p style={{ fontSize: 12, color: '#4a5568', margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          RECOGNITION
      ══════════════════════════════════════════════════════════ */}
      <section style={{ background: '#112211', color: '#fff', borderTop: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(60px, 10vw, 100px) 0', overflow: 'hidden', position: 'relative' }}>
        {/* Subtle background graphics */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', opacity: 0.05, backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
        
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 clamp(20px, 4vw, 60px)', position: 'relative', zIndex: 10 }}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            
            <div className="lg:w-[50%]">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 32, height: 1.5, background: '#c9c9bc' }} />
                  <span style={{ fontSize: 9.5, letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 700, color: '#c9c9bc' }}>
                    Official Recognition
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-crimson-pro), serif',
                    fontSize: 'clamp(28px, 4vw, 40px)',
                    fontWeight: 900,
                    color: '#fff',
                    lineHeight: 1.1,
                    letterSpacing: '0.01em',
                    margin: '0 0 20px 0'
                  }}
                >
                  Globally Recognized & Indexed
                </h2>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: '0 0 32px 0', letterSpacing: '0.02em', maxWidth: 500 }}>
                  Biospectra is proud to be part of the <strong style={{ color: '#fff', fontWeight: 600 }}>SJIF Journals Master List</strong>, reflecting our commitment to academic rigor and scientific impact.
                </p>
                <div style={{ 
                  display: 'inline-flex', 
                  flexDirection: 'column', 
                  background: 'rgba(255,255,255,0.03)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  padding: '20px 32px' 
                }}>
                  <span style={{ fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, color: '#c9c9bc', marginBottom: 8 }}>
                    SJIF Impact Factor
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--font-crimson-pro), serif', fontSize: 36, fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                      8.546
                    </span>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                      (2023)
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:w-[45%] md:w-2/3 mx-auto w-full">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="relative group">
                <div style={{ background: '#fff', padding: 12, border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                  {/* Inner border */}
                  <div style={{ border: '1px solid rgba(26,46,26,0.1)' }}>
                    <Image src={certificateImg} alt="SJIF Certificate of Indexing" width={600} height={450} style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                </div>
                {/* Accent lines offset square decoration */}
                <div style={{ position: 'absolute', top: -10, left: -10, width: 40, height: 40, borderTop: '2px solid #c9c9bc', borderLeft: '2px solid #c9c9bc' }} />
                <div style={{ position: 'absolute', bottom: -10, right: -10, width: 40, height: 40, borderBottom: '2px solid #c9c9bc', borderRight: '2px solid #c9c9bc' }} />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
