'use client';
import React, { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Award, Zap } from 'lucide-react';
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
  const [isHovered1, setIsHovered1] = useState(false);
  const [isDragging1, setIsDragging1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isDragging2, setIsDragging2] = useState(false);

  const isPaused1 = isHovered1 || isDragging1;
  const isPaused2 = isHovered2 || isDragging2;

  const onEnter1 = useCallback(() => setIsHovered1(true), []);
  const onLeave1 = useCallback(() => setIsHovered1(false), []);
  const onDragStart1 = useCallback(() => setIsDragging1(true), []);
  const onDragEnd1 = useCallback(() => setIsDragging1(false), []);

  const onEnter2 = useCallback(() => setIsHovered2(true), []);
  const onLeave2 = useCallback(() => setIsHovered2(false), []);
  const onDragStart2 = useCallback(() => setIsDragging2(true), []);
  const onDragEnd2 = useCallback(() => setIsDragging2(false), []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Slider Section */}
      <section className="relative min-h-[90vh] lg:h-[100vh] w-full flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src={biospectraBg} 
            alt="Bio science research" 
            fill
            priority
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/20 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-20"
            >
              <div className="bg-white/40 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-white/40 shadow-2xl shadow-slate-200/50 max-w-xl">
                <div className="flex flex-col mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-px w-8 bg-emerald-600"></div>
                    <span className="text-emerald-800 font-extrabold tracking-[0.15em] uppercase text-[10px]">
                      Madhawi Shyam Educational Trust
                    </span>
                  </div>
                  <span className="text-slate-500 font-bold tracking-[0.05em] uppercase text-[9px] mb-6 leading-relaxed">
                    & International Consortium of Contemporary Biologists (ICCB)
                  </span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 mb-4 leading-none tracking-tighter">
                  BIOSPECTRA
                </h1>
                
                <p className="text-base text-slate-600 mb-8 leading-relaxed font-medium">
                  An International Biannual Refereed Journal of Life Sciences (ISSN: 0973-7057). Published since 2006.
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <div className="bg-emerald-700 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-emerald-700/20">
                    Vol 21 | Issue 1
                  </div>
                  <div className="text-slate-400 text-[9px] font-bold uppercase tracking-widest border-l border-slate-200 pl-4">
                    Reg. No. 20560/IV-1815/2005
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link href="/archive">
                    <Button size="lg" className="bg-slate-900 text-white hover:bg-emerald-800 shadow-xl shadow-slate-900/10 px-8 py-6 rounded-2xl group transition-all">
                      Read Journal <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/submit">
                    <Button size="lg" variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 px-8 py-6 rounded-2xl font-bold">
                      Submit Article
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            <div className="hidden lg:block relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
              ></motion.div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 md:bottom-12 left-0 w-full z-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-x-8 items-center justify-between max-w-6xl mx-auto border-t border-slate-200/30 pt-6 md:pt-10">
              {[
                { label: 'Impact Factor', value: '8.546', icon: Award },
                { label: 'Issues', value: '38+', icon: BookOpen },
                { label: 'Papers', value: '1200+', icon: Zap },
                { label: 'Reviewers', value: '250+', icon: Users },
              ].map((stat, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="bg-white/50 backdrop-blur-md p-2 rounded-xl border border-white/50 shadow-sm">
                    <stat.icon size={16} className="text-emerald-700" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-black text-slate-900 leading-none">{stat.value}</span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1.5">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Governing Bodies Section */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <SectionTitle 
            title="Our Governing Bodies" 
            subtitle="Biospectra is officially published under the stewardship of these distinguished academic organizations."
            centered={true}
            compact={true}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute -right-8 -bottom-8 w-32 h-32 ${body.color === 'emerald' ? 'bg-emerald-50' : 'bg-slate-50'} rounded-full transition-transform duration-500 group-hover:scale-150`}></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative mb-6 group-hover:scale-110 transition-transform flex items-center justify-center">
                    <Image src={body.logo} alt={body.name} width={150} height={150} className="h-32 w-auto object-contain" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight leading-tight">
                    {body.name}
                  </h3>
                  <div className={`inline-block px-3 py-1 rounded-full ${body.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'} text-[10px] font-black uppercase tracking-widest mb-4`}>
                    {body.acronym}
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                    {body.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Marquee Section */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <SectionTitle 
              title="Latest Research Articles" 
              subtitle="Stay updated with the newest discoveries and theoretical studies in biological sciences." 
              compact={true}
            />
            <div className="mb-4">
              <Link href="/archive">
                <Button variant="outline" size="sm" className="group text-xs font-black uppercase tracking-widest px-5 py-4 rounded-xl">
                  View Archive <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div className="relative overflow-hidden group">
            <motion.div 
              drag="x"
              dragConstraints={{ right: 0, left: -6000 }}
              dragElastic={0.15}
              animate={isPaused1 ? {} : { x: [0, -4000] }}
              onMouseEnter={onEnter1}
              onMouseLeave={onLeave1}
              onDragStart={onDragStart1}
              onDragEnd={onDragEnd1}
              transition={{ 
                duration: 200, 
                repeat: Infinity, 
                ease: "linear",
                repeatType: "loop"
              }}
              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
              className="flex space-x-6 px-4 cursor-grab active:cursor-grabbing"
            >
              {[...articlesData, ...articlesData, ...articlesData].map((article, i) => (
                <ArticleCard key={`${article.id}-row1-${i}`} article={article} />
              ))}
            </motion.div>
          </div>

          <div className="relative overflow-hidden group">
            <motion.div 
              drag="x"
              dragConstraints={{ right: -6000, left: 0 }}
              dragElastic={0.15}
              animate={isPaused2 ? {} : { x: [-4000, 0] }}
              onMouseEnter={onEnter2}
              onMouseLeave={onLeave2}
              onDragStart={onDragStart2}
              onDragEnd={onDragEnd2}
              transition={{ 
                duration: 180, 
                repeat: Infinity, 
                ease: "linear",
                repeatType: "loop"
              }}
              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
              className="flex space-x-6 px-4 cursor-grab active:cursor-grabbing"
            >
              {[...articlesData, ...articlesData, ...articlesData].map((article, i) => (
                <ArticleCard key={`${article.id}-row2-${i}`} article={article} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Editorial Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-100 rounded-full mix-blend-multiply opacity-70 animate-blob"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-sky-100 rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-2000"></div>
              
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <Image 
                  src={biospectraCover} 
                  alt="Biospectra Journal Cover" 
                  width={300}
                  height={400}
                  className="rounded-2xl shadow-xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500"
                />
                <Image 
                  src={awardImg} 
                  alt="Research Excellence Award" 
                  width={300}
                  height={400}
                  className="rounded-2xl shadow-xl border-4 border-white -rotate-2 hover:rotate-0 transition-transform duration-500 mt-8"
                />
              </div>
            </div>
            <div>
              <SectionTitle 
                title="Academic Excellence" 
                subtitle="Guided by a distinguished editorial board from premier national and international institutions." 
              />
              <div className="space-y-8">
                {[
                  { title: 'Peer-Reviewed', desc: 'Rigorous vetting process to ensure high-quality research standards and data integrity.' },
                  { title: 'Interdisciplinary', desc: 'Covering a broad spectrum of Life Sciences including Zoology, Botany, and Biotechnology.' },
                  { title: 'Global Reach', desc: 'Indexed and recognized by researchers worldwide for innovative scientific contributions.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-6">
                    <div className="bg-slate-900 text-white rounded-2xl p-4 shrink-0 shadow-lg">
                      <Zap size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-8 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-3/5">
              <h2 className="!text-white text-2xl md:text-3xl font-black mb-4 tracking-tight">Globally Recognized & Indexed</h2>
              <p className="!text-slate-300 text-sm mb-6 max-w-xl leading-relaxed">
                Biospectra is proud to be part of the SJIF Journals Master List, reflecting our commitment to academic rigor and scientific impact. Our Impact Factor is a testament to the quality of research we publish.
              </p>
              <div className="inline-block bg-emerald-600/10 border border-emerald-500/20 px-4 py-3 rounded-xl backdrop-blur-sm">
                <div className="text-emerald-500 font-bold text-[9px] uppercase tracking-widest mb-1">SJIF Impact Factor</div>
                <div className="text-2xl font-black text-white font-serif">8.546 <span className="text-sm font-bold text-emerald-500 ml-1">(2023)</span></div>
              </div>
            </div>
            <div className="lg:w-2/5">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative bg-white/5 p-2 rounded-xl border border-white/10 shadow-2xl backdrop-blur-xl"
              >
                <Image 
                  src={certificateImg} 
                  alt="Certificate of Indexing" 
                  width={500}
                  height={700}
                  className="rounded-lg w-full h-auto opacity-90 hover:opacity-100 transition-opacity"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
