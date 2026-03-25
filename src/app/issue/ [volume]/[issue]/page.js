'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, ChevronRight } from 'lucide-react';
import articlesData from '@/data/articles.json';
import Button from '@/components/ui/Button';

const IssueContents = ({ params }) => {
  const { volume, issue } = React.use(params);

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

  // If no articles found (for dummy issues)
  const hasArticles = issueArticles.length > 0;

  return (
    <div className="pt-32 pb-24 bg-[#FDFDFD] min-h-screen relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#slate-100_1px,transparent_1px),linear-gradient(to_bottom,#slate-100_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
        
        {/* Navigation Back */}
        <div className="mb-12">
          <Link href="/archive">
            <Button variant="ghost" className="text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 pl-0">
              <ArrowLeft size={16} className="mr-2" /> Back to Archive
            </Button>
          </Link>
        </div>

        {/* TOC Header */}
        <header className="mb-16 border-b-4 border-slate-900 pb-12 text-center">
          <h4 className="text-emerald-700 font-bold uppercase tracking-[0.2em] mb-4 text-sm">Table of Contents</h4>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 font-serif tracking-tight mb-6">
            Biospectra
          </h1>
          <div className="flex items-center justify-center space-x-4 text-lg text-slate-600 font-medium italic">
            <span>Volume {volume}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Issue {issue}</span>
          </div>
        </header>

        {/* Contents List */}
        <main>
          {hasArticles ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-16"
            >
              {Object.entries(groupedArticles).map(([category, articles], idx) => (
                <section key={category}>
                  {/* Category Header */}
                  <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-4 mb-8 font-serif uppercase tracking-wide">
                    {category}
                  </h2>
                  
                  <div className="space-y-10">
                    {articles.map((article, i) => (
                      <article key={article.id} className="group relative">
                        <Link href={`/article/${article.id}`} className="block">
                          <div className="flex flex-col sm:flex-row sm:items-baseline gap-4">
                            
                            {/* Title & Metadata */}
                            <div className="flex-grow">
                              <h3 className="text-xl font-bold text-slate-800 mb-2 leading-snug group-hover:text-emerald-700 transition-colors font-serif">
                                {article.title}
                              </h3>
                              <p className="text-sm text-slate-500 italic mb-2">
                                {article.authors.join(', ')}
                              </p>
                              {/* DOI if available */}
                              {article.doi && article.doi !== "#" && (
                                <p className="text-[10px] text-slate-400 font-mono tracking-wider">
                                  DOI: {article.doi}
                                </p>
                              )}
                            </div>

                            {/* Dotted Leader (Desktop only) */}
                            <div className="hidden sm:block flex-grow border-b-2 border-dotted border-slate-300 mx-4 opacity-50 relative top-[-6px]"></div>

                            {/* Simulated Page Range / Action */}
                            <div className="shrink-0 flex items-center text-emerald-600 font-black text-xs uppercase tracking-widest mt-2 sm:mt-0">
                              <span className="group-hover:mr-2 transition-all">Read</span>
                              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
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
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <BookOpen size={48} className="mx-auto text-slate-300 mb-6" />
              <h2 className="text-2xl font-bold text-slate-900 mb-3 font-serif">Issue Pending Digitization</h2>
              <p className="text-slate-500 max-w-md mx-auto">
                The articles for Volume {volume}, Issue {issue} are currently being processed or are only available in physical format. Please check back later.
              </p>
            </div>
          )}
        </main>

        {/* Footer info */}
        <div className="mt-20 pt-8 border-t border-slate-200 text-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Madhawi Shyam Educational Trust. Biospectra ISSN: 0973-7057</p>
        </div>
      </div>
    </div>
  );
};

export default IssueContents;
