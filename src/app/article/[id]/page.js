'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, Share2, Printer, Calendar, FileText, User, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import articlesData from '@/data/articles.json';

const Article = ({ params }) => {
  const { id } = React.use(params);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const article = useMemo(() => {
    return articlesData.find(a => a.id === parseInt(id));
  }, [id]);

  if (!article) return <div className="pt-40 text-center">Article not found.</div>;

  return (
    <div className="pb-20 bg-white">
      {/* Article Header */}
      <section className="bg-slate-50 pt-32 pb-16 border-b">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/archive" className="inline-flex items-center text-emerald-700 font-semibold mb-8 hover:underline">
            <ArrowLeft size={18} className="mr-2" /> Back to Archive
          </Link>

          <div className="max-w-4xl">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight font-serif">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-8">
              <div className="flex items-center">
                <Calendar size={18} className="mr-2 text-emerald-600" />
                {mounted ? new Date(article.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Loading...'}
              </div>
              <div className="flex items-center">
                <FileText size={18} className="mr-2 text-emerald-600" />
                Vol {article.volume}, Issue {article.issue}
              </div>
              {article.doi && (
                <div className="text-sm font-mono bg-white px-3 py-1 rounded-md border border-slate-200">
                  DOI: {article.doi}
                </div>
              )}
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                <User size={20} className="mr-2 text-emerald-600" /> Authors
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed italic">
                {article.authors.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-2/3">
              <div className="prose prose-slate max-w-none">
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center font-serif">
                    Abstract
                    <div className="h-1 flex-grow bg-slate-100 ml-6 rounded-full"></div>
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed italic border-l-4 border-emerald-600 pl-6 py-2">
                    {article.abstract}
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center font-serif">
                    Discussion & Findings
                    <div className="h-1 flex-grow bg-slate-100 ml-6 rounded-full"></div>
                  </h2>
                  <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
                    {article.content ? article.content.split('\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    )) : (
                      <p className="italic text-slate-500">
                        Full text representation not available in the digital reader. Please refer to the PDF version or contact the editorial board for the full article.
                      </p>
                    )}
                    <p>
                      The standard format of article preparation for full-length papers involves MS Word typing on A-4 size paper. The materials are meticulously reviewed by the editorial board members to ensure the highest academic standards.
                    </p>
                    <p>
                      References were numbered according to the sequence of the text, arranged serially without alphabetical consideration as per the BIOSPECTRA guidelines. Reciprocal placing was strictly followed for all citations within the article.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Tools */}
            <div className="lg:w-1/3">
              <div className="sticky top-28 space-y-8">
                <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    Article Tools
                  </h3>
                  <div className="space-y-4">
                    <Button className="w-full justify-between bg-emerald-700 hover:bg-emerald-600 transition-colors">
                      Download PDF <Download size={20} />
                    </Button>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="ghost" className="text-white hover:bg-white/10 border border-white/20">
                        Print <Printer size={18} className="ml-2" />
                      </Button>
                      <Button variant="ghost" className="text-white hover:bg-white/10 border border-white/20">
                        Share <Share2 size={18} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl">
                  <h3 className="text-lg font-bold text-emerald-900 mb-4">How to Cite</h3>
                  <div className="p-4 bg-white border border-emerald-200 rounded-xl text-sm italic text-slate-700 mb-4">
                    {article.authors[0]} et al. ({mounted ? new Date(article.date).getFullYear() : '....'}). "{article.title}". Biospectra (ISSN: 0973-7057), Vol {article.volume}({article.issue}).
                  </div>
                  <Button variant="link" className="text-xs">Copy Citation</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Article;
