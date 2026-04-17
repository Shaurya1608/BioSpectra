'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Assets from public directory
const madhaviImg = '/assets/madhavi.jpg';
const award1Img = '/assets/award2.jpg';
const award2Img = '/assets/award2(2).jpg';
const award3Img = '/assets/award1.jpg';

const About = () => {
  const P = {
    deepPurple: '#2d0057',
    richPurple: '#5a0096',
    magenta:    '#be00be',
    textBody:   '#3d2a5a',
    lavenderMist: '#f5eeff',
    border: 'rgba(139,0,204,0.1)',
  };

  return (
    <div 
      className="pt-32 pb-20 min-h-screen"
      style={{ background: '#fdfcff' }}
    >
      <section className="relative px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mb-12 text-center"
          >
            <div 
              style={{ width: 40, height: 2, background: P.magenta, marginBottom: 20 }}
            />
            <h1 
              style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }}
              className="text-3xl md:text-5xl font-black tracking-tight mb-4 uppercase"
            >
              Madhawi Shyam Educational Trust
            </h1>
            <span 
              className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: P.magenta }}
            >
              Excellence in Scientific Research
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center mb-14 w-full"
          >
            <div 
              className="p-1.5 bg-white shadow-2xl shadow-purple-900/10 mb-4"
              style={{ border: `1px solid ${P.border}` }}
            >
              <Image 
                src={madhaviImg} 
                alt="Founders of MSET" 
                width={800} 
                height={400} 
                className="w-full max-w-[600px] h-auto object-cover" 
                priority
              />
            </div>
            <div className="text-center">
              <p 
                style={{ color: P.deepPurple, letterSpacing: '0.05em' }}
                className="font-bold text-xs md:text-sm uppercase"
              >
                Prof. (Dr.) Mahendra Prasad & Mrs. Pali Vasudha
              </p>
              <p className="text-[9px] uppercase tracking-widest opacity-60 mt-1">Founders of Madhawi Shyam Educational Trust</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 w-full prose prose-purple">
            <div 
              style={{ background: 'white', border: `1px solid ${P.border}`, padding: 'clamp(24px, 5vw, 40px)' }}
              className="relative shadow-sm"
            >
              <div 
                style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: P.richPurple }}
              />
              <p style={{ color: P.textBody }} className="text-sm leading-relaxed text-justify m-0">
                The trust, <strong>Madhawi Shyam Educational Trust (MSET)</strong> was established on 30th Nov. 2005 under the Trust Registration Act at Ranchi. It was founded by Late <strong>Prof. (Dr.) Mahendra Prasad</strong>, a Senior Professor of Zoology at Ranchi University, and <strong>Mrs. Pali Vasudha</strong>, retired Asst. Director (OL) of BSNL, in fond memory of their parents. 
              </p>
            </div>
            <div 
              style={{ background: P.lavenderMist, border: `1px solid ${P.border}`, padding: 'clamp(24px, 5vw, 40px)' }}
              className="relative"
            >
              <p style={{ color: P.textBody }} className="text-sm leading-relaxed text-justify m-0">
                The trust is dedicated to multidimensional creative activities in the field of education, specifically biological sciences. Its primary academic forum, the <strong>International Consortium of Contemporary Biologists (ICCB)</strong>, was created in 2008 and has organized numerous international conferences across India.
              </p>
            </div>
          </div>

          <div className="w-full mb-16 px-6 py-10 bg-white border border-dashed border-purple-200 text-center">
             <h3 style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }} className="text-xl font-bold mb-4">Official Publication</h3>
             <p className="text-sm italic opacity-80 mb-2">BIOSPECTRA: ISSN-0973-7057</p>
             <p className="text-xs uppercase tracking-widest font-bold" style={{ color: P.magenta }}>An International Biannual Refereed Journal of Life Sciences</p>
          </div>

          {/* Recognition Gallery */}
          <div className="w-full">
            <h2 
              style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }}
              className="text-2xl font-black text-center mb-10 uppercase tracking-tight"
            >
              Recognition & Achievements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[award1Img, award2Img, award3Img].map((imgSrc, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ y: -5 }}
                  style={{ background: 'white', border: `1px solid ${P.border}` }}
                  className="p-1.5 shadow-sm group"
                >
                  <div className="overflow-hidden aspect-[4/3] relative">
                    <Image 
                      src={imgSrc} 
                      alt={`Award ceremony ${idx + 1}`} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
