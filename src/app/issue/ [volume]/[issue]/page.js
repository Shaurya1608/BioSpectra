'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, ChevronRight } from 'lucide-react';
import articlesData from '@/data/articles.json';
import Button from '@/components/ui/Button';

const IssueContents = ({ params }) => {
  const { volume, issue } = React.use(params);

  const P = {
    deepPurple: '#2d0057',
    richPurple: '#5a0096',
    magenta:    '#be00be',
    textBody:   '#3d2a5a',
    textMuted:  '#7c5da0',
    lavenderMist: '#f5eeff',
    border:     'rgba(139,0,204,0.1)',
  };

  // Filter articles based on URL params
  const issueArticles = useMemo(() => {
    return articlesData.filter(
      article => article.volume === parseInt(volume) && article.issue === parseInt(issue)
    );
  }, [volume, issue]);

  // Group by category for classic TOC look
  const groupedArticles = useMemo(() => {
    const groups = {};
    issueArticles.forEach(article => {
      if (!groups[article.category]) {
        groups[article.category] = [];
      }
      groups[article.category].push(article);
    });
    return groups;
  }, [issueArticles]);

  const hasArticles = issueArticles.length > 0;

  return (
    <div 
      className="pt-40 pb-24 min-h-screen relative overflow-hidden"
      style={{ background: '#fdfcff' }}
    >
      {/* Editorial Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-purple-900/[0.02] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
        
        {/* Navigation Back */}
        <div className="mb-14">
          <Link href="/archive">
            <button 
              style={{ color: P.textMuted, border: `1px solid ${P.border}`, background: 'white' }}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-[#5a0096] transition-all duration-300"
            >
              <ArrowLeft size={14} /> Back to Archive
            </button>
          </Link>
        </div>

        {/* TOC Header */}
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <span 
              style={{ color: P.magenta }}
              className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4"
            >
              Table of Contents
            </span>
            <h1 
              style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }}
              className="text-5xl md:text-7xl font-black mb-8 tracking-tighter"
            >
              Biospectra
            </h1>
            <div 
              style={{ borderTop: `1px solid ${P.border}`, borderBottom: `1px solid ${P.border}` }}
              className="flex items-center justify-center py-4 px-10 gap-6 text-sm font-bold uppercase tracking-widest"
            >
              <span style={{ color: P.textBody }}>Volume {volume}</span>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: P.magenta }} />
              <span style={{ color: P.textBody }}>Issue {issue}</span>
            </div>
          </motion.div>
        </header>

        {/* Contents List */}
        <main>
          {hasArticles ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-20"
            >
              {Object.entries(groupedArticles).map(([category, articles]) => (
                <section key={category}>
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-10">
                    <h2 
                      style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.richPurple }}
                      className="text-xl md:text-2xl font-bold uppercase tracking-wide whitespace-nowrap"
                    >
                      {category}
                    </h2>
                    <div className="flex-grow h-[1px]" style={{ background: P.border }} />
                  </div>
                  
                  <div className="space-y-12">
                    {articles.map((article) => (
                      <article key={article.id} className="group relative">
                        <Link href={`/article/${article.id}`} className="block">
                          <div className="flex flex-col sm:flex-row sm:items-baseline gap-6">
                            
                            {/* Title & Metadata */}
                            <div className="flex-grow">
                              <h3 
                                style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }}
                                className="text-xl md:text-2xl font-bold mb-3 leading-snug group-hover:text-magenta transition-colors"
                              >
                                {article.title}
                              </h3>
                              <div className="flex items-center gap-3">
                                <p style={{ color: P.textMuted }} className="text-sm font-medium italic">
                                  {article.authors.join(', ')}
                                </p>
                                {article.doi && article.doi !== "#" && (
                                  <>
                                    <div style={{ width: 3, height: 3, borderRadius: '50%', background: P.border }} />
                                    <p className="text-[10px] text-slate-400 font-mono tracking-wider">
                                      {article.doi}
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Dotted Leader & Action */}
                            <div className="shrink-0 flex items-center gap-4">
                              <div 
                                style={{ color: P.magenta }}
                                className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] transform group-hover:translate-x-1 transition-transform"
                              >
                                Read Article <ChevronRight size={14} className="ml-1" />
                              </div>
                            </div>

                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-white border border-dashed border-purple-200">
              <BookOpen size={48} style={{ color: P.border }} className="mx-auto mb-6" />
              <h2 style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }} className="text-2xl font-bold mb-3">Issue Pending Digitization</h2>
              <p style={{ color: P.textMuted }} className="text-sm max-w-sm mx-auto">
                The articles for Volume {volume}, Issue {issue} are currently available in physical format. Digital synchronization is in progress.
              </p>
            </div>
          )}
        </main>

        {/* Branding Footer */}
        <div 
          style={{ borderTop: `1px solid ${P.border}` }}
          className="mt-24 pt-10 text-center"
        >
          <p style={{ color: P.textMuted }} className="text-[11px] font-bold uppercase tracking-[0.2em] mb-2">
            Madhawi Shyam Educational Trust
          </p>
          <p style={{ color: P.textMuted }} className="text-[10px] uppercase opacity-60">
            Biospectra Journal • ISSN: 0973-7057
          </p>
        </div>
      </div>
    </div>
  );
};

export default IssueContents;
