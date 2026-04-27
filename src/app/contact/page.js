'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, ShieldCheck, UploadCloud, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [inquiryType, setInquiryType] = useState('general');

  return (
    <div 
      className="relative min-h-screen overflow-hidden pt-20 pb-12 px-4 md:px-8 bg-slate-50 flex flex-col justify-center"
    >
      <div className="relative z-10 max-w-6xl w-full mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col lg:flex-row border border-slate-200"
        >
          {/* LEFT PANEL - CONTACT INFO (Dark Glass) */}
          <div className="lg:w-5/12 bg-emerald-900 p-8 md:p-12 relative overflow-hidden text-white flex flex-col justify-between">
            {/* Background Texture inside dark panel */}
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div className="relative z-10 mb-12">
              <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight" style={{ color: '#ffffff', fontFamily: 'var(--font-crimson-pro), serif' }}>
                Get in Touch
              </h2>
              <p className="text-emerald-100/90 text-sm leading-relaxed max-w-sm font-medium">
                Our editorial team is here to assist you with manuscript submissions, peer-review inquiries, or any questions regarding the journal.
              </p>
            </div>

            <div className="relative z-10 space-y-8">
              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300 shrink-0 group-hover:bg-white/20 transition-all shadow-lg">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-emerald-100/70 uppercase tracking-widest block mb-1.5">Post Address</span>
                  <p className="text-white font-bold text-sm leading-relaxed drop-shadow-md">
                    Madhawi Shyam Educational Trust,<br />
                    Ranchi, Jharkhand, India.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300 shrink-0 group-hover:bg-white/20 transition-all shadow-lg">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-emerald-100/70 uppercase tracking-widest block mb-1.5">Editorial Email</span>
                  <a href="mailto:biospectra@yahoo.com" className="text-white font-bold text-sm hover:text-emerald-300 transition-colors drop-shadow-md">
                    biospectra@yahoo.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300 shrink-0 group-hover:bg-white/20 transition-all shadow-lg">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-emerald-100/70 uppercase tracking-widest block mb-1.5">Direct Phone</span>
                  <p className="text-white font-bold text-sm drop-shadow-md">
                    +91 94313 89253
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom info inside dark panel */}
            <div className="relative z-10 mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-emerald-100/70 uppercase tracking-widest block mb-1">Office Hours</span>
                <span className="font-bold text-emerald-50 text-sm drop-shadow-md">Mon–Sat, 10:00–16:00 IST</span>
              </div>
              <Clock size={20} className="text-emerald-100/50" />
            </div>
          </div>

          {/* RIGHT PANEL - FORM (Clean Mode) */}
          <div className="lg:w-7/12 p-8 md:p-12 bg-white">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-slate-900" style={{ fontFamily: 'var(--font-crimson-pro), serif' }}>
                Send an Inquiry
              </h3>
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 text-emerald-900 rounded-full border border-emerald-100 shadow-sm">
                <ShieldCheck size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">Secure Form</span>
              </div>
            </div>

            <form className="space-y-6">
              {/* Category Selector */}
              <div className="space-y-3 mb-6">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Inquiry Type</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'general', label: 'General Inquiry' },
                    { id: 'submission', label: 'Manuscript Submission' }
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setInquiryType(type.id)}
                      className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        inquiryType === type.id 
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/10 border border-emerald-500' 
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Dr. John Doe" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-sm font-bold text-slate-900 placeholder-slate-400" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@university.edu" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-sm font-bold text-slate-900 placeholder-slate-400" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Subject</label>
                <input 
                  type="text" 
                  placeholder={inquiryType === 'submission' ? "Paper Title (e.g., A Novel Approach to...)" : "Manuscript Submission Inquiry"} 
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-sm font-bold text-slate-900 placeholder-slate-400" 
                />
              </div>

              {inquiryType === 'submission' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-emerald-800">Upload Manuscript Document</label>
                  <label className="w-full px-4 py-4 rounded-xl bg-emerald-50/50 border-2 border-dashed border-emerald-200 flex flex-row items-center justify-between cursor-pointer hover:bg-emerald-50 hover:border-emerald-400 transition-all group">
                    <div className="flex items-center space-x-4">
                      <div className="p-2.5 bg-white rounded-lg shadow-sm border border-emerald-100 group-hover:scale-105 transition-transform">
                        <UploadCloud size={20} className="text-emerald-600" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-bold text-emerald-950">Click to upload document</span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-800/60 mt-1">PDF, DOCX up to 20MB</span>
                      </div>
                    </div>
                    <div className="px-5 py-2.5 bg-white rounded-lg border border-emerald-100 text-[10px] font-black uppercase tracking-widest text-emerald-800 shadow-sm group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500 transition-colors">Browse</div>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                  </label>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Message Details</label>
                <textarea 
                  rows={3} 
                  placeholder="Type your message here..." 
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-sm font-bold text-slate-900 placeholder-slate-400 resize-none" 
                />
              </div>

              <div className="pt-4">
                <button 
                  type="button" 
                  className="w-full group bg-emerald-900 text-white px-6 py-4 rounded-xl flex items-center justify-center space-x-3 text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-900/10 hover:bg-emerald-800 hover:shadow-emerald-900/20 transition-all active:scale-95"
                >
                  <span>Submit Inquiry securely</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
