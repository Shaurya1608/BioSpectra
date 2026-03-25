'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, Info, Send } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';

const Submit = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pb-20 container mx-auto px-4 text-center min-h-[70vh] flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md mx-auto bg-white p-12 rounded-3xl shadow-xl border border-emerald-100"
        >
          <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-600">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Received!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed text-sm">
            Thank you for your submission to Biospectra Journal. Our editorial board will review your manuscript and get back to you via email within 45 days.
          </p>
          <Button onClick={() => setSubmitted(false)} className="w-full">Submit Another Article</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 max-w-6xl mx-auto">
          {/* Form Side */}
          <div className="lg:w-3/5">
            <div className="bg-white p-6 md:p-12 rounded-3xl shadow-xl border border-slate-200">
              <SectionTitle title="Submit Article" subtitle="Please fill in the details of your original research or review article." />
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Author(s) Name *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-sm" placeholder="Enter full names" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address *</label>
                    <input type="email" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-sm" placeholder="your@email.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Subject *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-sm" placeholder="Article subject" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Research Area *</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-sm">
                      <option>Zoology</option>
                      <option>Botany</option>
                      <option>Biotechnology</option>
                      <option>Life Science - General</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Phone</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-sm" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Postal Address</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-sm" placeholder="Full postal address" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Upload Article (Doc/PDF) *</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer group">
                    <Upload className="mx-auto text-slate-400 group-hover:text-emerald-600 mb-4" size={32} />
                    <p className="text-slate-600 font-medium text-sm">Click to upload or drag and drop</p>
                    <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-bold">Maximum file size 10MB</p>
                  </div>
                </div>

                <div className="pt-6">
                  <Button type="submit" className="w-full h-14 text-base font-black uppercase tracking-widest">
                    Send Submission <Send size={20} className="ml-2" />
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Instructions Side */}
          <div className="lg:w-2/5 space-y-8">
            <div className="bg-emerald-900 text-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center italic underline">
                Guidelines for Authors
              </h3>
              <div className="space-y-6 text-sm text-emerald-100">
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-600 p-2 rounded-lg shrink-0 w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <p className="leading-relaxed">Materials should be typed in double space MS Word on A-4 size paper.</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-600 p-2 rounded-lg shrink-0 w-8 h-8 flex items-center justify-center font-bold">2</div>
                  <p className="leading-relaxed">Article must be submitted 45 days in advance for consideration.</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-600 p-2 rounded-lg shrink-0 w-8 h-8 flex items-center justify-center font-bold">3</div>
                  <p className="leading-relaxed">References must follow reciprocal placing and be numbered serially.</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-600 p-2 rounded-lg shrink-0 w-8 h-8 flex items-center justify-center font-bold">4</div>
                  <p className="leading-relaxed">Plagiarism is strictly prohibited to achieve quality control.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center">
                <Info size={18} className="mr-2 text-emerald-600" /> Need Help?
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                If you encounter any issues with the online submission system, please email your manuscript directly to <strong>biospectra@yahoo.com</strong> or contact our managing editor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submit;
