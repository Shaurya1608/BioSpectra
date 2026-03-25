'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';

const Contact = () => {
  return (
    <div className="pt-32 pb-16 bg-slate-50/50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight"
          >
            Contact the Editorial Office
          </motion.h1>
          <div className="w-16 h-1 bg-emerald-600 mx-auto rounded-full mb-4"></div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Get in touch with the Biospectra Editorial Office for queries regarding manuscript submissions, memberships, or collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <div className="w-2 h-6 bg-emerald-600 rounded-full mr-3"></div>
                Headquarters
              </h3>
              
              <div className="space-y-5">
                <div className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-emerald-700 shrink-0 group-hover:bg-emerald-50 transition-colors">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Address</h4>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      Madhawi-Shyam Educational Trust,<br />
                      Ranchi, Jharkhand, India.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 group">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-emerald-700 shrink-0 group-hover:bg-emerald-50 transition-colors">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Phone</h4>
                    <p className="text-slate-600 text-xs mt-0.5 tracking-wide">+91 94313 89253</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 group">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-emerald-700 shrink-0 group-hover:bg-emerald-50 transition-colors">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Email</h4>
                    <a href="mailto:biospectra@yahoo.com" className="text-emerald-700 font-medium text-xs mt-0.5 hover:underline">
                      biospectra@yahoo.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg overflow-hidden relative border border-slate-800">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500 rounded-full blur-full opacity-10 -mr-10 -mt-10"></div>
              <h3 className="text-base font-bold mb-3 flex items-center tracking-wide">
                <MessageSquare className="mr-2 text-emerald-500" size={18} /> Support Hours
              </h3>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                  <span>Mon – Sat</span> 
                  <span className="font-medium text-slate-100">10:00 AM – 4:00 PM (IST)</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>Sunday</span> 
                  <span className="font-medium text-[#c52c2c]">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Send a Secure Message</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">Your Name</label>
                  <input type="text" placeholder="Dr. John Doe" className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-400" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">Email Address</label>
                  <input type="email" placeholder="john@university.edu" className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-400" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">Subject</label>
                  <input type="text" placeholder="Manuscript Inquiry" className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-400" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">Message</label>
                  <textarea rows={4} placeholder="How can we help you?" className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none placeholder:text-slate-400"></textarea>
                </div>
                <div className="md:col-span-2 pt-2">
                  <button type="button" className="w-full sm:w-auto px-8 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-900/10 transition-all flex items-center justify-center focus:ring-4 focus:ring-emerald-500/30 active:scale-[0.98]">
                    Send Message <Send size={16} className="ml-2" />
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
