'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const coreTeam = [
  { role: 'Editor-in-Chief', name: 'Prof. Jyoti Kumar', email: 'jyotikumar1ru@gmail.com' },
  { role: 'Managing Editor', name: 'Prof. Arun Kumar', email: 'prf.arunkumar@gmail.com' },
  { role: 'Executive Editor', name: 'Dr. Nayni Saxena', email: 'naynisaxena@gmail.com' },
  { role: 'Editor', name: 'Mr. Rahul Ranjan', email: 'rahulranjan.03@gmail.com' }
];

const nationalAdvisory = [
  "Prof. Neelima Gupta (Zoology) Bareilly", "Prof. Kamini Kumar (Botany) P.V.C., K.U.",
  "Prof. N. Banerjee (Botany) Santiniketan", "Dr. R. Ramani (IINRG) Ranchi",
  "Dr. Janardan Jee (Zool./PS, ICAR) Patna", "Prof. Amarjeet Singh (Botany) Patiala",
  "Prof. A. Nagpal (Botany) Amritsar", "Prof. K.L.Tiwari (Botany) Raipur",
  "Prof. Partha P. Barua (Botany) Gauhati", "Dr. Ajit Kr. Sinha (Zoology) V.C., R.U.",
  "Prof. M. C. Dash (Zoology) Bhubaneshwar", "Prof. N.K.Dubey (Botany) Varanasi",
  "Prof.H.P.Puttaraju (Zoology) Bangalore", "Prof. P. Nath (Zoology) Patna",
  "Dr. C.S.Gururaj (Sericulture) Bangalore", "Dr. P. K. Mahapatra (Botany) Cuttack",
  "Prof. R. K. Pandey (Botany) Ex-V.C., R.U.", "Dr. R. K. Gambhir Singh (Zoology) Manipur",
  "Prof. Prahlad Dubey (Zoology) Kota", "Dr. R.C. Mohanty (Botany) Bhubaneshwar"
];

const nationalEditors = [
  "Dr. Uma Shanker Singh D.Sc, IFS", "Dr. Noor Alam (Zoology) Giridih",
  "Dr. Jatinder Kaur (Botany) Amritsar", "Dr. S. M. Shamim (Zoology) Ranchi",
  "Dr. Satyendra Kumar (Zoology) Hajipur", "Dr. Rani Srivastava (Zoology) Patna",
  "Prof. Chandrawati Jee (Biotech.) Patna", "Dr. D. K. Paul (Zoology) Patna",
  "Prof. Arun Kumar Mitra (Microbiology) Kolkata", "Prof. Amritesh Shukla (Botany) Lucknow",
  "Prof. A. Hore (Zoology) Ranchi", "Prof. Kunul Kandir (Botany) Ranchi",
  "Dr. S. Nehar (Zoology) Ranchi", "Dr. Arbind Kumar (Zoology) Patna",
  "Prof. P. K. Mohanthy (Zoology) Bhubaneshwar", "Dr. Seema Keshari (Zoology) R.U., Ranchi",
  "Prof. S. C. Mandal (Pharmacognosy) Kolkata", "Prof. T. C. Narendran (Zoology) Calicut",
  "Dr. A. K. Panigrahi (Zoology), Kalyani", "Dr. A. D. Jadhav (Sericulture) Nagpur",
  "Dr. Shashi P. Agarwal (Zoology) Kanpur", "Prof. H. P. Sharma (Botany) R.U., Ranchi",
  "Dr. Abha Prasad (Zoology) R.W.C. Ranchi", "Dr. Anand Kumar Thakur (Zoology) R.U., Ranchi",
  "Prof. Habibur Rahman (Botany) Santiniketan", "Dr. Anupam Dikshit (Botany) Allahabad",
  "Dr. Sushma Das Guru (Botany) Ranchi", "Dr. A. K. Srivastava (Botany) Ranchi",
  "Dr. Vinod Kumar (Agri.) Sr. Sci., Dharwad", "Dr. R.D. Raviya (Life Sci.) Gujarat",
  "Dr. Prasanjit Mukherjee (Botany) Gumla", "Dr. Ashok Kumar Nag (Botany) Ranchi"
];

const foreignEditors = [
  "Prof. (Dr.) G.H.R. Rao UM, Minneapolis, USA", "Prof. S. I. Shalaby Cairo, Egypt",
  "Prof. Narendra Pd. Singh Columbia, USA", "Dr. Pascalis Harizanis Athens, Greece",
  "Dr. Ajit Bharti (Zoology) Boston", "Dr. V.R.P. Sinha Pittsberg, USA",
  "Dr. V.K. Gupta UG, Ireland", "Dr. Jerry L. Kaster UW, Milwaukee, USA"
];

const strategicTeam = [
  { name: "Dr. Astha Kiran", role: "President, MSET-ICCB" },
  { name: "Mrs. Pali Vasudha", role: "Secretary, MSET-ICCB" },
  { name: "Mr. P. Prabudh", role: "Corporate Planner, USA" },
  { name: "Mrs. B. Nanjudaiah", role: "Corporate Adviser, USA" },
  { name: "Mr. R. Ranjan", role: "Corporate Planner, USA" },
  { name: "Mrs. R. Narayan", role: "Corporate Adviser, USA" },
  { name: "Dr. Ranjit Ranjan", role: "Expert, Language & Lit." },
  { name: "Mr. Ravi Rahul Singh", role: "Office Admin. Editor" }
];

const parseNameInfo = (str) => {
  const match = str.match(/(.*?)\s*\((.*?)\)\s*(.*)/);
  if (match) {
    return { name: match[1], dept: match[2], loc: match[3] };
  }
  return { name: str, dept: null, loc: null };
};

const EditorialBoard = () => {
  const P = {
    deepPurple: '#2d0057',
    richPurple: '#5a0096',
    magenta:    '#be00be',
    textBody:   '#3d2a5a',
    textMuted:  '#7c5da0',
    lavenderMist: '#f5eeff',
    border:     'rgba(139,0,204,0.1)',
  };

  return (
    <div 
      className="pt-40 pb-20 min-h-screen"
      style={{ background: '#fdfcff' }}
    >
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div style={{ width: 40, height: 2, background: P.magenta, marginBottom: 20 }} />
            <h1 
              style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }}
              className="text-3xl md:text-5xl font-black mb-4 tracking-tight uppercase"
            >
              Editorial Board
            </h1>
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-60 font-bold">Biospectra Journal Global Team</span>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Core Team (Hero Card) */}
          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-xl shadow-purple-900/5 overflow-hidden"
            style={{ border: `1px solid ${P.border}` }}
          >
            <div 
              style={{ background: `linear-gradient(90deg, ${P.deepPurple}, ${P.richPurple})` }}
              className="px-8 py-4"
            >
              <h2 className="text-xs font-bold tracking-[0.2em] text-white uppercase italic">Executive Editorial Team</h2>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreTeam.map((member, idx) => (
                <div key={idx} className="flex flex-col">
                  <span style={{ color: P.magenta }} className="text-[9px] font-black uppercase tracking-widest mb-2">{member.role}</span>
                  <h3 style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }} className="text-xl font-bold mb-2">{member.name}</h3>
                  <a 
                    href={`mailto:${member.email}`} 
                    style={{ color: P.textMuted }}
                    className="text-[11px] flex items-center hover:text-magenta transition-colors w-max"
                  >
                    <Mail size={11} className="mr-2" /> {member.email}
                  </a>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Grid for Advisor & Editors */}
          <div className="grid grid-cols-1 gap-12">
            
            {/* National Advisory Editors */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }} className="text-2xl font-black uppercase">National Advisory Editors</h2>
                <div className="flex-grow h-[1px]" style={{ background: P.border }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {nationalAdvisory.map((item, idx) => {
                  const info = parseNameInfo(item);
                  return (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0 }} 
                      whileInView={{ opacity: 1 }} 
                      viewport={{ once: true }}
                      style={{ background: 'white', border: `1px solid ${P.border}` }}
                      className="p-4 hover:border-magenta/30 transition-colors group"
                    >
                      <h4 style={{ color: P.deepPurple }} className="font-bold text-sm mb-1">{info.name}</h4>
                      {info.dept && <p style={{ color: P.magenta }} className="text-[10px] font-bold uppercase mb-0.5">{info.dept}</p>}
                      {info.loc && <p style={{ color: P.textMuted }} className="text-[10px] opacity-70 italic">{info.loc}</p>}
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* National Editors */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }} className="text-2xl font-black uppercase">National Editors</h2>
                <div className="flex-grow h-[1px]" style={{ background: P.border }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {nationalEditors.map((item, idx) => {
                  const info = parseNameInfo(item);
                  return (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                      style={{ background: 'white', border: `1px solid ${P.border}` }}
                      className="p-3.5 hover:border-magenta/30 transition-colors"
                    >
                      <h4 style={{ color: P.deepPurple }} className="font-bold text-xs mb-1">{info.name}</h4>
                      <div className="flex flex-wrap gap-2 items-center">
                        {info.dept && <span style={{ background: P.lavenderMist, color: P.richPurple }} className="text-[9px] font-bold px-1.5 py-0.5">({info.dept})</span>}
                        {info.loc && <span style={{ color: P.textMuted }} className="text-[10px] italic">{info.loc}</span>}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Foreign Editors */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }} className="text-2xl font-black uppercase">Foreign Editors</h2>
                  <div className="flex-grow h-[1px]" style={{ background: P.border }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {foreignEditors.map((name, idx) => (
                    <div key={idx} className="bg-white p-3 border border-purple-100 flex items-center">
                      <div style={{ background: P.magenta }} className="w-1.5 h-1.5 rounded-full mr-3 shrink-0" />
                      <span style={{ color: P.deepPurple }} className="text-[11px] font-bold tracking-tight">{name}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Strategic Resourcing */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }} className="text-2xl font-black uppercase">Strategic Team</h2>
                  <div className="flex-grow h-[1px]" style={{ background: P.border }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {strategicTeam.map((member, idx) => (
                    <div 
                      key={idx} 
                      style={{ border: `1px solid ${P.border}`, background: P.lavenderMist }}
                      className="p-4 flex flex-col hover:bg-white transition-colors duration-300"
                    >
                      <h4 style={{ color: P.deepPurple }} className="font-bold text-sm mb-1 leading-tight">{member.name}</h4>
                      <span style={{ color: P.magenta }} className="text-[9px] font-black tracking-widest uppercase">{member.role}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default EditorialBoard;
