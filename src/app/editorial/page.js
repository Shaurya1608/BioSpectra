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
  return (
    <div className="pt-32 pb-10 bg-[#FAFAFA] min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header Title */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight"
          >
            Editorial Board
          </motion.h1>
          <div className="w-16 h-1 bg-emerald-600 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Core Team (Hero Card) */}
          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden"
          >
            <div className="bg-slate-900 px-6 py-3">
              <h2 className="text-sm font-bold tracking-widest text-white uppercase opacity-90">Executive Editors</h2>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {coreTeam.map((member, idx) => (
                <div key={idx} className="flex flex-col border-b border-slate-100 pb-3 last:border-0 md:last:border-b-0 md:[&:nth-last-child(2)]:border-b-0">
                  <p className="text-emerald-700 font-bold text-[10px] uppercase tracking-wider mb-0.5">{member.role}</p>
                  <h3 className="text-base font-black text-slate-900 mb-1">{member.name}</h3>
                  <a href={`mailto:${member.email}`} className="text-slate-500 text-[11px] flex items-center hover:text-emerald-600 transition-colors w-max">
                    <Mail size={12} className="mr-1.5 opacity-70" /> {member.email}
                  </a>
                </div>
              ))}
            </div>
          </motion.section>

          {/* National Advisory Editors */}
          <section>
            <div className="flex items-center mb-3">
              <h2 className="text-lg font-bold text-slate-900">National Advisory Editors</h2>
              <div className="h-px bg-slate-200 flex-grow ml-4"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {nationalAdvisory.map((item, idx) => {
                const info = parseNameInfo(item);
                return (
                  <motion.div 
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: (idx % 4) * 0.05 }}
                    key={idx} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-500/30 transition-colors group"
                  >
                    <h4 className="font-bold text-slate-900 text-xs mb-0.5">{info.name}</h4>
                    {info.dept && <p className="text-[10px] text-emerald-700 font-medium mb-0.5">({info.dept})</p>}
                    {info.loc && <p className="text-[10px] text-slate-500">{info.loc}</p>}
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* National Editors */}
          <section>
            <div className="flex items-center mb-3">
              <h2 className="text-lg font-bold text-slate-900">National Editors</h2>
              <div className="h-px bg-slate-200 flex-grow ml-4"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {nationalEditors.map((item, idx) => {
                const info = parseNameInfo(item);
                return (
                  <motion.div 
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: (idx % 4) * 0.05 }}
                    key={idx} className="bg-white p-2.5 rounded border border-slate-200 shadow-sm hover:border-emerald-500/30 transition-colors"
                  >
                    <h4 className="font-bold text-slate-900 text-[11px] mb-0.5">{info.name}</h4>
                    {info.dept && <p className="text-[10px] text-emerald-700 font-medium inline-block mr-1">({info.dept})</p>}
                    {info.loc && <p className="text-[10px] text-slate-500 inline-block">{info.loc}</p>}
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Foreign Editors & Strategic Team Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Foreign Editors */}
            <section>
              <div className="flex items-center mb-3">
                <h2 className="text-lg font-bold text-slate-900">Foreign Editors</h2>
                <div className="h-px bg-slate-200 flex-grow ml-3"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {foreignEditors.map((name, idx) => (
                  <div key={idx} className="bg-white px-3 py-2 rounded border border-slate-200 shadow-sm flex items-center">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 mr-2 shrink-0"></div>
                    <span className="text-[11px] font-semibold text-slate-800 tracking-tight">{name}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Strategic Resourcing */}
            <section>
              <div className="flex items-center mb-3">
                <h2 className="text-lg font-bold text-slate-900">Strategic Resourcing</h2>
                <div className="h-px bg-slate-200 flex-grow ml-3"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {strategicTeam.map((member, idx) => (
                  <div key={idx} className="bg-white p-2 rounded border border-emerald-100 shadow-sm flex flex-col hover:bg-emerald-50/50 transition-colors">
                    <h4 className="font-bold text-slate-900 text-[11px] leading-tight mb-0.5">{member.name}</h4>
                    <span className="text-[9px] font-bold text-emerald-700 tracking-wider uppercase">{member.role}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

        </div>
      </div>
    </div>
  );
};

export default EditorialBoard;
