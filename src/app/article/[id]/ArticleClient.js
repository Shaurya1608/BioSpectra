'use client';
import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share2, Printer, Calendar, BookOpen, User, ArrowLeft, Copy, CheckCircle2, Bookmark, ExternalLink } from 'lucide-react';

const ArticleClient = ({ article }) => {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  const P = {
    deepGreen:  '#064e3b',
    emerald:    '#059669',
    richPurple: '#6d28d9',
    violet:     '#7c3aed',
    textBody:   '#1e293b',
    textMuted:  '#64748b',
    border:     'rgba(5, 150, 105, 0.1)',
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopyCitation = () => {
    const citation = `${article.authors[0]} et al. (${new Date(article.date).getFullYear()}). "${article.title}". Biospectra (ISSN: 0973-7057), Vol ${article.volume}(${article.issue}).`;
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!article) return (
    <div className="pt-40 pb-20 min-h-screen bg-bg flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-black text-deepPurple mb-4">Article Not Found</h2>
      <Link href="/archive" className="text-magenta font-bold hover:underline">Return to Archive</Link>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-bg overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-violet-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* ── HEADER SECTION ── */}
        <header className="pt-24 pb-12 border-b border-border bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            
            <Link 
              href="/archive" 
              className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-magenta hover:translate-x-[-4px] transition-transform mb-8"
            >
              <ArrowLeft size={14} className="mr-2" /> Back to Archive
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-0.5 bg-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">
                  {article.category || 'Scientific Research'}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-6xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight" style={{ fontFamily: 'var(--font-crimson-pro), serif' }}>
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-8 text-[10px] font-black uppercase tracking-widest text-textMuted mb-12">
                <div className="flex items-center bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100">
                  <Calendar size={14} className="mr-2 text-magenta" />
                  {mounted ? new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '...'}
                </div>
                <div className="flex items-center bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100">
                  <BookOpen size={14} className="mr-2 text-magenta" />
                  Vol. {article.volume}, Issue {article.issue}
                </div>
                {article.doi && article.doi !== "#" && (
                  <div className="flex items-center bg-deepPurple text-white px-3 py-1.5 rounded-lg shadow-lg shadow-purple-900/10">
                    <span className="opacity-70 mr-2">DOI:</span> {article.doi}
                  </div>
                )}
              </div>

              <div className="inline-flex items-center p-6 bg-white border border-border rounded-2xl shadow-xl shadow-slate-900/5 group hover:shadow-2xl transition-all">
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mr-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <User size={24} />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 block mb-1">Corresponding Authors</span>
                  <span className="text-xl font-black text-slate-900" style={{ fontFamily: 'var(--font-crimson-pro), serif' }}>
                    {article.authors.join(', ')}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* ── CONTENT SECTION ── */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 xl:gap-24">
              
              {/* Main Content Body */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Abstract */}
                <div className="mb-20">
                  <div className="flex items-center mb-10 group">
                    <h2 className="text-3xl font-black italic text-deepPurple pr-6" style={{ fontFamily: 'var(--font-crimson-pro), serif' }}>
                      Abstract
                    </h2>
                    <div className="h-px flex-grow bg-border group-hover:bg-magenta/30 transition-colors" />
                  </div>
                  
                  <div className="relative pl-8 md:pl-12 border-l-2 border-magenta/20">
                    <p className="text-lg md:text-xl text-textBody leading-[1.8] font-medium text-justify">
                      {article.abstract}
                    </p>
                  </div>
                </div>

                {/* Full Text Representation */}
                <div>
                  <div className="flex items-center mb-10 group">
                    <h2 className="text-3xl font-black italic text-deepPurple pr-6" style={{ fontFamily: 'var(--font-crimson-pro), serif' }}>
                      Full Text
                    </h2>
                    <div className="h-px flex-grow bg-border group-hover:bg-magenta/30 transition-colors" />
                  </div>

                  <div className="space-y-8 text-textBody leading-relaxed text-justify">
                    {article.content ? (
                      article.content.split('\n').map((para, i) => (
                        <p key={i} className="text-base md:text-lg">{para}</p>
                      ))
                    ) : (
                      <div className="bg-white border border-border rounded-2xl p-10 md:p-16 text-center shadow-xl shadow-purple-900/5">
                        <div className="w-16 h-16 bg-purple-50 text-magenta rounded-full flex items-center justify-center mx-auto mb-6">
                          <BookOpen size={32} />
                        </div>
                        <p className="text-sm font-bold text-textMuted max-w-sm mx-auto italic leading-relaxed">
                          The full digital version of this research paper is currently being processed. Please refer to the official PDF for complete data, figures, and methodology.
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-12 p-8 bg-purple-50/50 rounded-2xl border border-purple-100 italic text-sm text-textMuted">
                      <p className="mb-4">
                        <strong>Editorial Note:</strong> All research published in Biospectra undergoes a rigorous double-blind peer-review process to ensure scientific integrity and contribution to the biological sciences.
                      </p>
                      <p>
                        References and citations follow the journal's standardized format, meticulously verified by the editorial board of the Madhawi Shyam Educational Trust.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sidebar Tools */}
              <aside className="relative">
                <div className="sticky top-24 space-y-6">
                  
                  {/* Action Card */}
                  <div className="bg-white rounded-3xl border border-border p-8 shadow-2xl shadow-purple-900/5 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-deepPurple to-magenta" />
                    <h3 className="text-xl font-black text-deepPurple mb-8" style={{ fontFamily: 'var(--font-crimson-pro), serif' }}>
                      Research Tools
                    </h3>
                    
                    <div className="space-y-4">
                      <button className="w-full group bg-emerald-600 text-white px-6 py-4 rounded-xl flex items-center justify-between text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20 active:scale-95">
                        <span>Download PDF</span>
                        <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                      </button>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center space-x-2 bg-white border border-border text-deepPurple py-3 rounded-xl hover:border-magenta hover:text-magenta transition-all text-[9px] font-black uppercase tracking-widest">
                          <Printer size={16} />
                          <span>Print</span>
                        </button>
                        <button className="flex items-center justify-center space-x-2 bg-white border border-border text-deepPurple py-3 rounded-xl hover:border-magenta hover:text-magenta transition-all text-[9px] font-black uppercase tracking-widest">
                          <Share2 size={16} />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Citation Card */}
                  <div className="bg-deepPurple rounded-3xl p-8 text-white shadow-2xl shadow-purple-900/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-magenta/20 blur-3xl rounded-full -mr-16 -mt-16" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-magenta">Citation</h3>
                        <Bookmark size={16} className="text-magenta" />
                      </div>
                      
                      <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6 text-xs text-white/80 leading-relaxed font-medium italic">
                        {article.authors[0]} et al. ({mounted ? new Date(article.date).getFullYear() : '....'}). "{article.title}". Biospectra, Vol {article.volume}({article.issue}).
                      </div>

                      <button 
                        onClick={handleCopyCitation}
                        className="w-full flex items-center justify-center space-x-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3 rounded-xl transition-all text-[9px] font-black uppercase tracking-widest"
                      >
                        {copied ? (
                          <>
                            <CheckCircle2 size={14} className="text-green-400" />
                            <span className="text-green-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>Copy Citation</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Related Info */}
                  <div className="p-8 rounded-3xl bg-purple-50/50 border border-purple-100">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-deepPurple mb-6 flex items-center">
                      <ExternalLink size={14} className="mr-2 text-magenta" />
                      Journal Info
                    </h3>
                    <ul className="space-y-4 text-[11px] font-bold text-textMuted uppercase tracking-wide">
                      <li className="flex justify-between">
                        <span>ISSN:</span>
                        <span className="text-deepPurple">0973-7057</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Frequency:</span>
                        <span className="text-deepPurple">Half Yearly</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Publisher:</span>
                        <span className="text-deepPurple">MSET</span>
                      </li>
                    </ul>
                  </div>

                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArticleClient;
