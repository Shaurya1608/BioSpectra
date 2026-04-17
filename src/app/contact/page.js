'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';

const Contact = () => {
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
        <div className="text-center mb-16 max-w-2xl mx-auto">
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
              Contact Us
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60 mb-6">Editorial Office & Inquiries</p>
            <p style={{ color: P.textBody }} className="text-sm leading-relaxed opacity-80">
              Get in touch with the Biospectra Editorial Office for queries regarding manuscript submissions, memberships, or collaborations.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8">
            <div 
              style={{ background: 'white', border: `1px solid ${P.border}` }}
              className="p-8 relative overflow-hidden shadow-xl shadow-purple-900/5 transition-all"
            >
              <div 
                style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: P.richPurple }}
              />
              
              <h3 
                style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }}
                className="text-2xl font-bold mb-8 flex items-center"
              >
                Headquarters
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-5 group">
                  <div 
                    style={{ background: P.lavenderMist, border: `1px solid ${P.border}`, color: P.richPurple }}
                    className="w-12 h-12 flex items-center justify-center shrink-0 group-hover:bg-[#5a0096] group-hover:text-white transition-all duration-300"
                  >
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 style={{ color: P.deepPurple }} className="font-black text-xs uppercase tracking-widest">Post Address</h4>
                    <p style={{ color: P.textBody }} className="text-sm mt-2 leading-relaxed opacity-80">
                      Madhawi Shyam Educational Trust,<br />
                      Ranchi, Jharkhand, India.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-5 group">
                  <div 
                    style={{ background: P.lavenderMist, border: `1px solid ${P.border}`, color: P.richPurple }}
                    className="w-12 h-12 flex items-center justify-center shrink-0 group-hover:bg-[#5a0096] group-hover:text-white transition-all duration-300"
                  >
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 style={{ color: P.deepPurple }} className="font-black text-xs uppercase tracking-widest">Direct Phone</h4>
                    <p style={{ color: P.textBody }} className="text-sm mt-1 font-bold">+91 94313 89253</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-5 group">
                  <div 
                    style={{ background: P.lavenderMist, border: `1px solid ${P.border}`, color: P.richPurple }}
                    className="w-12 h-12 flex items-center justify-center shrink-0 group-hover:bg-[#5a0096] group-hover:text-white transition-all duration-300"
                  >
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 style={{ color: P.deepPurple }} className="font-black text-xs uppercase tracking-widest">Editorial Email</h4>
                    <a 
                      href="mailto:biospectra@yahoo.com" 
                      style={{ color: P.magenta }}
                      className="font-bold text-sm mt-1 hover:underline"
                    >
                      biospectra@yahoo.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div 
              style={{ background: `linear-gradient(135deg, ${P.deepPurple}, #1a0038)`, color: 'white' }}
              className="p-8 shadow-2xl relative border border-purple-900/20"
            >
              <h3 
                style={{ fontFamily: 'var(--font-crimson-pro), serif' }}
                className="text-lg font-bold mb-4 flex items-center tracking-wide"
              >
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: P.magenta, marginRight: 12 }} />
                Support Hours (IST)
              </h3>
              <div className="space-y-3 text-xs opacity-80">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="font-bold uppercase tracking-widest">Mon – Sat</span> 
                  <span className="font-medium">10:00 AM – 4:00 PM</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-bold uppercase tracking-widest">Sunday</span> 
                  <span style={{ color: P.magenta }}>CLOSED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div 
              style={{ background: 'white', border: `1px solid ${P.border}` }}
              className="p-8 shadow-xl shadow-purple-900/5 transition-all"
            >
              <h3 
                style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }}
                className="text-2xl font-black mb-8 border-b pb-4"
              >
                Secure Inquiry Form
              </h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label style={{ color: P.deepPurple }} className="text-[10px] font-black tracking-[0.1em] uppercase">Full Name</label>
                  <input type="text" placeholder="Dr. John Doe" className="w-full px-4 py-3 text-sm border-b border-slate-200 bg-slate-50/30 focus:border-magenta focus:bg-white outline-none transition-all placeholder:text-slate-300" />
                </div>
                <div className="space-y-2">
                  <label style={{ color: P.deepPurple }} className="text-[10px] font-black tracking-[0.1em] uppercase">Email Address</label>
                  <input type="email" placeholder="john@university.edu" className="w-full px-4 py-3 text-sm border-b border-slate-200 bg-slate-50/30 focus:border-magenta focus:bg-white outline-none transition-all placeholder:text-slate-300" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label style={{ color: P.deepPurple }} className="text-[10px] font-black tracking-[0.1em] uppercase">Subject of Message</label>
                  <input type="text" placeholder="Manuscript Inquiry" className="w-full px-4 py-3 text-sm border-b border-slate-200 bg-slate-50/30 focus:border-magenta focus:bg-white outline-none transition-all placeholder:text-slate-300" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label style={{ color: P.deepPurple }} className="text-[10px] font-black tracking-[0.1em] uppercase">Inquiry Details</label>
                  <textarea rows={4} placeholder="Type your message here..." className="w-full px-4 py-3 text-sm border-b border-slate-200 bg-slate-50/30 focus:border-magenta focus:bg-white outline-none transition-all resize-none placeholder:text-slate-300"></textarea>
                </div>
                <div className="md:col-span-2 pt-4">
                  <button 
                    type="button" 
                    style={{ background: P.deepPurple }}
                    className="w-full sm:w-auto px-10 py-4 text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-[#5a0096] transition-all flex items-center justify-center active:scale-[0.98]"
                  >
                    Send Secure Message <Send size={15} className="ml-3" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
