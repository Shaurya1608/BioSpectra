'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, Share2, Printer, Calendar, BookOpen, User, ArrowLeft } from 'lucide-react';
import articlesData from '@/data/articles.json';

const Article = ({ params }) => {
  const { id } = React.use(params);
  const [mounted, setMounted] = React.useState(false);

  const P = {
    deepPurple: '#2d0057',
    richPurple: '#5a0096',
    magenta:    '#be00be',
    textBody:   '#3d2a5a',
    textMuted:  '#7c5da0',
    lavenderMist: '#f5eeff',
    border:     'rgba(139,0,204,0.1)',
  };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const article = useMemo(() => {
    return articlesData.find(a => a.id === parseInt(id));
  }, [id]);

  if (!article) return <div style={{ paddingTop: 160, textAlign: 'center', background: '#fdfcff', minHeight: '100vh', color: P.deepPurple }}>Article not found.</div>;

  return (
    <div style={{ background: '#fdfcff', minHeight: '100vh', fontFamily: 'var(--font-inter), sans-serif', color: P.textBody }}>
      
      {/* ── HEADER SECTION ── */}
      <section style={{ paddingTop: 'clamp(140px, 15vw, 180px)', paddingBottom: 'clamp(60px, 8vw, 100px)', borderBottom: `1px solid ${P.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 4vw, 40px)' }}>
          
          <Link href="/archive" style={{ display: 'inline-flex', alignItems: 'center', fontWeight: 800, color: P.magenta, marginBottom: 40, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }} className="hover:opacity-70 transition-opacity">
            <ArrowLeft size={14} style={{ marginRight: 8 }} /> Back to Archive
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 10, height: 2, background: P.magenta }} />
              <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 900, color: P.magenta }}>
                {article.category}
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-crimson-pro), serif', fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 900, color: P.deepPurple, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 32px 0' }}>
              {article.title}
            </h1>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24, marginBottom: 48, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: P.textMuted }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Calendar size={14} style={{ marginRight: 8, color: P.magenta }} />
                {mounted ? new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Loading...'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <BookOpen size={14} style={{ marginRight: 8, color: P.magenta }} />
                Vol {article.volume}, Issue {article.issue}
              </div>
              {article.doi && article.doi !== "#" && (
                <div style={{ padding: '6px 14px', background: P.lavenderMist, border: `1px solid ${P.border}`, color: P.richPurple, borderRadius: '2px' }}>
                  DOI: {article.doi}
                </div>
              )}
            </div>

            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              padding: '20px 32px', 
              background: 'white', 
              border: `1px solid ${P.border}`,
              borderLeft: `4px solid ${P.deepPurple}`,
              boxShadow: '0 20px 40px rgba(45,0,87,0.05)'
            }}>
              <div style={{ padding: 10, background: P.lavenderMist, border: `1px solid ${P.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 20 }}>
                <User size={18} color={P.richPurple} />
              </div>
              <div>
                <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 900, color: P.textMuted, display: 'block', marginBottom: 4 }}>Corresponding Authors</span>
                <span style={{ fontSize: 18, fontFamily: 'var(--font-crimson-pro), serif', fontWeight: 800, color: P.deepPurple }}>
                  {article.authors.join(', ')}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT SECTION ── */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) 0' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 clamp(20px, 4vw, 40px)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 lg:gap-24">
            
            {/* Main Content Body */}
            <div>
              <div style={{ marginBottom: 64 }}>
                <h2 style={{ fontFamily: 'var(--font-crimson-pro), serif', fontSize: 32, fontStyle: 'italic', fontWeight: 900, color: P.deepPurple, marginBottom: 32, display: 'flex', alignItems: 'center' }}>
                  Abstract
                  <div style={{ height: 1, flexGrow: 1, background: P.border, marginLeft: 24 }} />
                </h2>
                <div style={{ position: 'relative', paddingLeft: 40 }}>
                  <div 
                    style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: P.magenta, opacity: 0.3 }}
                  />
                  <p style={{ fontSize: 18, color: P.textBody, lineHeight: 1.85, fontStyle: 'normal', margin: 0, textAlign: 'justify' }}>
                    {article.abstract}
                  </p>
                </div>
              </div>

              <div>
                <h2 style={{ fontFamily: 'var(--font-crimson-pro), serif', fontSize: 32, fontStyle: 'italic', fontWeight: 900, color: P.deepPurple, marginBottom: 32, display: 'flex', alignItems: 'center' }}>
                  Full Text
                  <div style={{ height: 1, flexGrow: 1, background: P.border, marginLeft: 24 }} />
                </h2>
                <div style={{ fontSize: 16, color: P.textBody, lineHeight: 1.9, display: 'flex', flexDirection: 'column', gap: 24, textAlign: 'justify' }}>
                  {article.content ? article.content.split('\n').map((para, i) => (
                    <p key={i} style={{ margin: 0 }}>{para}</p>
                  )) : (
                    <div style={{ background: 'white', border: `1px solid ${P.border}`, padding: 40, textAlign: 'center', fontStyle: 'italic', color: P.textMuted, fontSize: 14 }}>
                      Full text representation currently unavailable in the digital reader. Please refer to the official PDF version for complete research data, figures, and charts.
                    </div>
                  )}
                  <p style={{ margin: 0, fontWeight: 500 }}>
                    The standard format of article preparation for full-length papers involves MS Word typing on A-4 size paper. The materials follow a rigorous peer-review process governed by the editorial board of Biospectra.
                  </p>
                  <p style={{ margin: 0, fontWeight: 500 }}>
                    As per journal standards, references are numbered according to their text sequence and are arranged serially. Reciprocal citing practices are strictly maintained across all volumes published by the Madhawi Shyam Educational Trust.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar Tools */}
            <div>
              <div style={{ position: 'sticky', top: 120, display: 'flex', flexDirection: 'column', gap: 40 }}>
                
                {/* Actions */}
                <div style={{ background: 'white', border: `1px solid ${P.border}`, padding: 40, boxShadow: '0 30px 60px rgba(45,0,87,0.05)' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: P.deepPurple }} />
                  <h3 style={{ fontFamily: 'var(--font-crimson-pro), serif', fontSize: 24, fontWeight: 900, color: P.deepPurple, marginBottom: 24 }}>
                    Reader Tools
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <button 
                      style={{ 
                        width: '100%', 
                        background: P.deepPurple, 
                        color: 'white', 
                        border: 'none', 
                        padding: '18px 24px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        fontSize: 10, 
                        fontWeight: 900, 
                        letterSpacing: '0.2em', 
                        textTransform: 'uppercase', 
                        cursor: 'pointer', 
                        transition: 'all 0.3s' 
                      }} 
                      onMouseEnter={e => e.currentTarget.style.background = P.richPurple} 
                      onMouseLeave={e => e.currentTarget.style.background = P.deepPurple}
                    >
                      Download PDF <Download size={16} />
                    </button>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <button 
                        style={{ 
                          background: 'white', 
                          border: `1px solid ${P.border}`, 
                          color: P.deepPurple, 
                          padding: '12px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          gap: 10, 
                          fontSize: 9, 
                          fontWeight: 900, 
                          letterSpacing: '0.15em', 
                          textTransform: 'uppercase', 
                          cursor: 'pointer', 
                          transition: 'all 0.3s' 
                        }} 
                        onMouseEnter={e => { e.currentTarget.style.borderColor = P.magenta; e.currentTarget.style.color = P.magenta; }} 
                        onMouseLeave={e => { e.currentTarget.style.borderColor = P.border; e.currentTarget.style.color = P.deepPurple; }}
                      >
                        Print <Printer size={14} />
                      </button>
                      <button 
                         style={{ 
                          background: 'white', 
                          border: `1px solid ${P.border}`, 
                          color: P.deepPurple, 
                          padding: '12px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          gap: 10, 
                          fontSize: 9, 
                          fontWeight: 900, 
                          letterSpacing: '0.15em', 
                          textTransform: 'uppercase', 
                          cursor: 'pointer', 
                          transition: 'all 0.3s' 
                        }} 
                        onMouseEnter={e => { e.currentTarget.style.borderColor = P.magenta; e.currentTarget.style.color = P.magenta; }} 
                        onMouseLeave={e => { e.currentTarget.style.borderColor = P.border; e.currentTarget.style.color = P.deepPurple; }}
                      >
                        Share <Share2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Citation */}
                <div style={{ background: P.lavenderMist, border: `1px solid ${P.border}`, padding: 32 }}>
                  <h3 style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', color: P.magenta, marginBottom: 16 }}>Bibliographic Citation</h3>
                  <div style={{ background: 'white', border: `1px solid ${P.border}`, padding: 20, fontSize: 12, color: P.textBody, lineHeight: 1.7, fontStyle: 'italic', marginBottom: 20 }}>
                    {article.authors[0]} et al. ({mounted ? new Date(article.date).getFullYear() : '....'}). "{article.title}". Biospectra (ISSN: 0973-7057), Vol {article.volume}({article.issue}).
                  </div>
                  <button 
                    style={{ background: 'none', border: 'none', color: P.richPurple, fontSize: 10, fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', padding: 0, cursor: 'pointer', textDecoration: 'underline' }}
                    className="hover:text-magenta transition-colors"
                  >
                    Copy to Clipboard
                  </button>
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
