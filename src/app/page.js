'use client';
import React, { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Award, ShieldCheck, Layers, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import ArticleCard from '@/components/common/ArticleCard';
import articlesData from '@/data/articles.json';

// Assets from public directory
const biospectraCover = '/assets/biospectra.jpg';
const biospectraBg = '/assets/biospecbg.jpg';
const awardImg = '/assets/award2.jpg';
const certificateImg = '/assets/cerificate of indexing.jpg';
const msetLogo = '/assets/mset-logo-png-removebg-preview.png';
const iccbLogo = '/assets/iccb-logo-removebg-preview.png';

const Home = () => {
   const marqueeRef = useRef(null);
   const isInView = useInView(marqueeRef, { once: false, amount: 0.1 });
   const scrollContainerRef = useRef(null);

   const scroll = (direction) => {
     if (scrollContainerRef.current) {
       const scrollAmount = window.innerWidth < 768 ? 320 : 380;
       scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
     }
   };

  return (
    <div className="flex flex-col w-full">
      {/* Scenic Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-50">
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <Image 
            src="/assets/dnabg.png" 
            alt="Molecular Research Backdrop" 
            fill
            priority
            quality={100}
            className="object-cover"
          />
          {/* Subtle gradient just to fade the bottom into the page content */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/60 pointer-events-none"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center flex flex-col items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.3
                }
              }
            }}
            className="max-w-3xl"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="flex flex-col items-center mb-6"
            >
              <div className="mb-2">
                <Image src={msetLogo} alt="MSET Logo" width={120} height={120} className="w-28 h-28 object-contain drop-shadow-2xl" />
              </div>
              
              <div className="flex items-center space-x-3 mb-3 bg-white/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/50 shadow-sm">
                <div className="h-px w-3 bg-emerald-600"></div>
                <span className="text-emerald-900 font-extrabold tracking-[0.2em] uppercase text-[8px]">
                  Madhawi Shyam Educational Trust
                </span>
                <div className="h-px w-3 bg-emerald-600"></div>
              </div>

              {/* Journal Publication Strip */}
              <div className="flex items-center space-x-2 mb-3 bg-emerald-900/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-emerald-900/15 shadow-sm">
                <span className="text-emerald-950 font-bold text-[9px] tracking-widest uppercase opacity-80">
                  Vol. 17 &nbsp;|&nbsp; Issue 2 &nbsp;|&nbsp; Published Since 2006
                </span>
              </div>
            </motion.div>
            
            <motion.h1 
              variants={{
                hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
                visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 1, ease: "easeOut" } }
              }}
              className="text-5xl sm:text-6xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-500 mb-6 leading-none tracking-[0.05em] uppercase drop-shadow-sm"
            >
              BIOSPECTRA
            </motion.h1>

            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
              }}
              className="flex flex-wrap justify-center items-center gap-3 mb-6"
            >
              <div className="bg-white/60 backdrop-blur-md border border-emerald-200/60 shadow-sm rounded-full px-4 py-1.5 flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-emerald-800 font-black tracking-[0.2em] text-[10px]">
                  ISSN: <span className="font-medium">0973-7057</span>
                </span>
              </div>
              
              <div className="bg-white/60 backdrop-blur-md border border-emerald-200/60 shadow-sm rounded-full px-4 py-1.5 flex items-center space-x-2">
                <Award size={10} className="text-emerald-500" />
                <span className="text-emerald-800 font-black tracking-[0.2em] text-[10px]">
                  IMPACT FACTOR: <span className="font-black text-emerald-950">8.546</span>
                </span>
              </div>
            </motion.div>
            
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
              }}
              className="text-sm md:text-base text-emerald-800 mb-6 leading-relaxed font-semibold max-w-xl mx-auto"
            >
              Your international refereed journal for the latest scientific breakthroughs in Life Sciences. Published biannually since 2006.
            </motion.p>



            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
              }}
              className="flex flex-wrap justify-center gap-3.5 mb-10"
            >
              <Link href="/archive">
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-xl shadow-emerald-900/20 px-8 py-4 rounded-2xl font-black text-sm group transition-all transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95">
                  Read Journal <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/submit">
                <Button size="lg" variant="outline" className="bg-white/40 backdrop-blur-xl border-emerald-200/50 text-emerald-950 hover:bg-white/60 px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-emerald-900/5 transition-all transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95">
                  Submit Article
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-slate-400"
        >
          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-emerald-500 to-transparent opacity-50"></div>
        </motion.div>
      </section>

      {/* Governing Bodies Section */}
      <section className="py-10 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <SectionTitle 
            title="Our Governing Bodies" 
            subtitle="Biospectra is officially published under the stewardship of these distinguished academic organizations."
            centered={true}
            compact={true}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
            {[
              {
                name: "Madhawi Shyam Educational Trust",
                acronym: "MSET",
                desc: "A dedicated foundation committed to advancing higher education and scientific research across the biological sciences.",
                logo: msetLogo,
                color: "emerald"
              },
              {
                name: "International Consortium of Contemporary Biologists",
                acronym: "ICCB",
                desc: "An international fellowship of scientists and researchers fostering global collaboration and innovation in modern biology.",
                logo: iccbLogo,
                color: "slate"
              }
            ].map((body, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute -right-6 -bottom-6 w-24 h-24 ${body.color === 'emerald' ? 'bg-emerald-50' : 'bg-slate-50'} rounded-full transition-transform duration-500 group-hover:scale-[2]`}></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative mb-4 group-hover:scale-110 transition-transform flex items-center justify-center">
                    <Image src={body.logo} alt={body.name} width={120} height={120} className="h-20 w-auto object-contain" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-1 tracking-tight leading-tight">
                    {body.name}
                  </h3>
                  <div className={`inline-block px-3 py-0.5 rounded-full ${body.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'} text-[9px] font-black uppercase tracking-widest mb-3`}>
                    {body.acronym}
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-xs mx-auto">
                    {body.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Section - Compacted for better vertical efficiency */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent"></div>
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-50 rounded-full mix-blend-multiply opacity-60 blur-3xl animate-blob"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div className="max-w-xl">
              <div className="flex items-center space-x-2 mb-3">
                <div className="h-px w-6 bg-emerald-600"></div>
                <span className="text-emerald-600 font-extrabold uppercase tracking-[0.2em] text-[9px]">
                  Recent Publications
                </span>
              </div>
              <SectionTitle 
                title="Latest Research Articles" 
                subtitle="Explore the most recent peer-reviewed studies published in Biospectra." 
                compact={true}
                dark={false}
              />
            </div>
            <div className="mt-4 md:mt-0">
              <Link href="/archive">
                <Button variant="outline" size="md" className="group rounded-xl border-emerald-100 text-emerald-700 font-bold uppercase tracking-widest px-6 py-4 hover:bg-emerald-50 transition-all shadow-lg shadow-emerald-900/5 text-xs">
                  Full Archive <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative group/carousel mt-6 md:mt-10">
            {/* Left Scroll Arrow */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hidden md:block">
              <button 
                onClick={() => scroll('left')}
                className="p-3 rounded-full bg-white/95 backdrop-blur-md border border-slate-100 shadow-xl text-emerald-700 hover:bg-emerald-50 hover:scale-110 transition-all focus:outline-none"
                aria-label="Scroll left"
              >
                <ChevronLeft size={24} />
              </button>
            </div>

            {/* Scrollable Container */}
            <div 
              ref={scrollContainerRef}
              className="flex items-stretch gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 px-4 -mx-4 md:px-2 md:-mx-2"
            >
              {articlesData.map((article) => (
                <div key={article.id} className="snap-start shrink-0 w-[300px] md:w-[360px]">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>

            {/* Right Scroll Arrow */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-20 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hidden md:block">
              <button 
                onClick={() => scroll('right')}
                className="p-3 rounded-full bg-white/95 backdrop-blur-md border border-slate-100 shadow-xl text-emerald-700 hover:bg-emerald-50 hover:scale-110 transition-all focus:outline-none"
                aria-label="Scroll right"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
             <div className="p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row items-center gap-6 max-w-3xl w-full">
                <div className="bg-white p-3 rounded-xl shadow-md border border-emerald-50">
                   <BookOpen size={24} className="text-emerald-600" />
                </div>
                <div className="text-center md:text-left">
                   <h4 className="text-lg font-black text-slate-900 mb-1 font-serif">Contribute to Science</h4>
                   <p className="text-[11px] text-slate-500 max-w-sm">We welcome original research papers and review articles. Join our community today.</p>
                </div>
                <div className="md:ml-auto">
                   <Link href="/submit">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-5 py-2.5 font-black uppercase tracking-widest text-[10px] shadow-md shadow-emerald-900/10">
                         Submit Paper
                      </Button>
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Editorial Highlights */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Elegant Image Collage */}
            <div className="relative group perspective-1000">
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-100 to-sky-50 rounded-[3rem] opacity-50 blur-2xl group-hover:opacity-70 transition-opacity duration-700"></div>
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-emerald-100 rounded-full mix-blend-multiply opacity-60 animate-blob"></div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-sky-100 rounded-full mix-blend-multiply opacity-60 animate-blob animation-delay-2000"></div>
              
              <div className="relative z-10 w-full max-w-md mx-auto aspect-[4/3] flex items-center justify-center">
                {/* Back Image - Ceremony */}
                <motion.div 
                  initial={{ opacity: 0, x: -30, rotate: -6 }}
                  whileInView={{ opacity: 1, x: 0, rotate: -6 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="absolute left-0 bottom-4 w-2/3 z-10 hover:z-30 transition-all duration-500 ease-out hover:-translate-y-4 hover:rotate-[-2deg] hover:scale-[1.05]"
                >
                  <div className="bg-white rounded-[2rem] p-2 shadow-xl shadow-slate-900/10 border border-slate-100/50">
                    <Image 
                      src={awardImg} 
                      alt="Research Excellence Award" 
                      width={300}
                      height={400}
                      className="rounded-[1.5rem] object-cover h-auto w-full"
                    />
                  </div>
                </motion.div>

                {/* Front Image - Journal Cover */}
                <motion.div 
                  initial={{ opacity: 0, x: 30, rotate: 6 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 6 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="absolute right-0 top-0 w-[55%] z-20 hover:z-30 transition-all duration-500 ease-out hover:-translate-y-4 hover:rotate-[2deg] hover:scale-[1.05]"
                >
                  <div className="bg-white rounded-[2rem] p-2 shadow-2xl shadow-emerald-900/15 border border-emerald-50">
                    <Image 
                      src={biospectraCover} 
                      alt="Biospectra Journal Cover" 
                      width={300}
                      height={400}
                      className="rounded-[1.5rem] object-cover h-auto w-full"
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Content List */}
            <div>
              <SectionTitle 
                title="Academic Excellence" 
                subtitle="Guided by a distinguished editorial board from premier national and international institutions." 
              />
              <div className="space-y-5 mt-10">
                {[
                  { icon: ShieldCheck, title: 'Peer-Reviewed', desc: 'Rigorous vetting process to ensure high-quality research standards and data integrity.' },
                  { icon: Layers, title: 'Interdisciplinary', desc: 'Covering a broad spectrum of Life Sciences including Zoology, Botany, and Biotechnology.' },
                  { icon: Globe, title: 'Global Reach', desc: 'Indexed and recognized by researchers worldwide for innovative scientific contributions.' },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: i * 0.15 + 0.2 }}
                    className="group flex flex-col sm:flex-row items-start sm:space-x-5 p-5 bg-white border border-slate-100/80 rounded-[1.5rem] hover:bg-emerald-50/30 hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="bg-emerald-50 p-4 rounded-2xl shadow-sm border border-emerald-100/50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-md group-hover:scale-110 transition-all duration-300 shrink-0 mb-4 sm:mb-0">
                      <item.icon size={22} className="stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 mb-1.5 font-serif tracking-tight group-hover:text-emerald-800 transition-colors">{item.title}</h4>
                      <p className="text-slate-600 text-[13px] leading-relaxed max-w-lg font-medium">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-8 md:py-12 bg-[#060c12] text-white relative overflow-hidden border-t border-emerald-950/40">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-emerald-600/5 rounded-full blur-[80px] -translate-y-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <div className="lg:w-[50%]">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center space-x-1.5 bg-emerald-900/30 border border-emerald-800/40 rounded-full px-2.5 py-0.5 text-emerald-400 text-[8px] font-bold uppercase tracking-widest mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-80"></div>
                  <span>Official Recognition</span>
                </div>
                
                <h2 className="text-xl md:text-2xl font-extrabold mb-3 tracking-normal leading-snug">
                  <span className="text-slate-100">Globally Recognized </span>
                  <span className="text-emerald-400">& Indexed</span>
                </h2>
                
                <p className="text-slate-400 text-[13px] md:text-sm mb-5 max-w-md leading-relaxed">
                  Biospectra is proud to be part of the <strong className="text-slate-200">SJIF Journals Master List</strong>, reflecting our commitment to academic rigor and scientific impact. Our Impact Factor is a testament to the exceptional quality of research we publish.
                </p>
                
                <div className="inline-flex flex-col bg-[#0b1715]/60 border border-emerald-900/40 rounded-xl px-4 py-2.5 backdrop-blur-sm">
                  <span className="text-emerald-500 font-bold text-[8px] uppercase tracking-widest mb-0.5">SJIF Impact Factor</span>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight">8.546</span>
                    <span className="text-[9px] text-emerald-500/80">(2023)</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-[40%] md:w-2/3 mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative group"
              >
                {/* Certificate Glow */}
                <div className="absolute -inset-1 bg-emerald-500/10 rounded-2xl blur-md transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                
                {/* Certificate Container */}
                <div className="relative bg-white/[0.02] p-2 rounded-xl border border-white/5 shadow-xl backdrop-blur-sm transition-transform duration-500 hover:scale-[1.01]">
                  <Image 
                    src={certificateImg} 
                    alt="SJIF Certificate of Indexing" 
                    width={600}
                    height={450}
                    className="rounded-lg w-full h-auto object-contain shadow-inner"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
