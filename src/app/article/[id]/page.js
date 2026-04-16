'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, Share2, Printer, Calendar, BookOpen, User, ArrowLeft } from 'lucide-react';
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

  if (!article) return <div style={{ paddingTop: 160, textAlign: 'center', background: '#f7f5ef', minHeight: '100vh', fontFamily: 'var(--font-inter), sans-serif' }}>Article not found.</div>;

  return (
    <div style={{ background: '#f7f5ef', minHeight: '100vh', fontFamily: 'var(--font-inter), sans-serif', color: '#4a5568' }}>
      
      {/* ── HEADER SECTION ── */}
      <section style={{ paddingTop: 'clamp(120px, 15vw, 160px)', paddingBottom: 'clamp(60px, 8vw, 80px)', borderBottom: '1px solid rgba(26,46,26,0.06)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 clamp(20px, 4vw, 40px)' }}>
          
          <Link href="/archive" style={{ display: 'inline-flex', alignItems: 'center', fontWeight: 600, color: '#1a7a3a', marginBottom: 32, fontSize: 13, letterSpacing: '0.02em', textDecoration: 'none' }} className="hover:underline">
            <ArrowLeft size={16} style={{ marginRight: 8 }} /> Back to Archive
          </Link>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 8, height: 8, background: '#1a2e1a', borderRadius: '50%' }} />
              <span style={{ fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 800, color: '#1a2e1a' }}>
                {article.category}
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-crimson-pro), serif', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900, color: '#0d1a0d', lineHeight: 1.15, letterSpacing: '0.01em', margin: '0 0 24px 0' }}>
              {article.title}
            </h1>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20, marginBottom: 32, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6b7280' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Calendar size={13} style={{ marginRight: 6, color: '#1a2e1a' }} />
                {mounted ? new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Loading...'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <BookOpen size={13} style={{ marginRight: 6, color: '#1a2e1a' }} />
                Vol {article.volume}, Issue {article.issue}
              </div>
              {article.doi && article.doi !== "#" && (
                <div style={{ padding: '4px 10px', background: 'rgba(26,46,26,0.05)', border: '1px solid rgba(26,46,26,0.1)', color: '#1a2e1a' }}>
                  DOI: {article.doi}
                </div>
              )}
            </div>

            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              padding: '16px 24px', 
              background: '#fff', 
              border: '1px solid rgba(26,46,26,0.08)',
              borderLeft: '4px solid #1a2e1a',
              minWidth: 280
            }}>
              <div style={{ padding: 8, background: 'rgba(26,46,26,0.05)', border: '1px solid rgba(26,46,26,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
                <User size={16} color="#1a2e1a" />
              </div>
              <div>
                <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 800, color: '#6b7280', display: 'block', marginBottom: 2 }}>Authors</span>
                <span style={{ fontSize: 16, fontFamily: 'var(--font-crimson-pro), serif', fontWeight: 700, color: '#1a2e1a' }}>
                  {article.authors.join(', ')}
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── CONTENT SECTION ── */}
      <section style={{ padding: 'clamp(50px, 8vw, 80px) 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 4vw, 40px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', lg: { gridTemplateColumns: 'minmax(0, 1fr) 300px' }, gap: 'clamp(40px, 6vw, 64px)' }} className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-16">
            
            {/* Main Content Body */}
            <div>
              <div style={{ marginBottom: 48 }}>
                <h2 style={{ fontFamily: 'var(--font-crimson-pro), serif', fontSize: 28, fontWeight: 800, color: '#0d1a0d', marginBottom: 20, display: 'flex', alignItems: 'center' }}>
                  Abstract
                  <div style={{ height: 1, flexGrow: 1, background: 'rgba(26,46,26,0.1)', marginLeft: 20 }} />
                </h2>
                <div style={{ borderLeft: '2px solid #1a2e1a', paddingLeft: 24 }}>
                  <p style={{ fontSize: 16, color: '#1a2e1a', lineHeight: 1.8, fontStyle: 'italic', margin: 0 }}>
                    {article.abstract}
                  </p>
                </div>
              </div>

              <div>
                <h2 style={{ fontFamily: 'var(--font-crimson-pro), serif', fontSize: 24, fontWeight: 800, color: '#0d1a0d', marginBottom: 20, display: 'flex', alignItems: 'center' }}>
                  Full Text
                  <div style={{ height: 1, flexGrow: 1, background: 'rgba(26,46,26,0.1)', marginLeft: 20 }} />
                </h2>
                <div style={{ fontSize: 14.5, color: '#4a5568', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {article.content ? article.content.split('\n').map((para, i) => (
                    <p key={i} style={{ margin: 0 }}>{para}</p>
                  )) : (
                    <div style={{ background: '#fff', border: '1px solid rgba(26,46,26,0.08)', padding: 24, textAlign: 'center', fontStyle: 'italic', color: '#6b7280' }}>
                      Full text representation not available in the digital reader. Please refer to the PDF version or contact the editorial board for the full article.
                    </div>
                  )}
                  <p style={{ margin: 0 }}>
                    The standard format of article preparation for full-length papers involves MS Word typing on A-4 size paper. The materials are meticulously reviewed by the editorial board members to ensure the highest academic standards.
                  </p>
                  <p style={{ margin: 0 }}>
                    References were numbered according to the sequence of the text, arranged serially without alphabetical consideration as per the BIOSPECTRA guidelines. Reciprocal placing was strictly followed for all citations within the article.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar Tools */}
            <div>
              <div style={{ position: 'sticky', top: 120, display: 'flex', flexDirection: 'column', gap: 32 }}>
                
                {/* Actions */}
                <div style={{ background: '#fff', border: '1px solid rgba(26,46,26,0.08)', padding: 32, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -1, left: -1, right: -1, height: 3, background: '#1a2e1a' }} />
                  <h3 style={{ fontFamily: 'var(--font-crimson-pro), serif', fontSize: 20, fontWeight: 800, color: '#0d1a0d', marginBottom: 20 }}>
                    Article Tools
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <button style={{ width: '100%', background: '#1a2e1a', color: '#fff', border: 'none', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#2d5a2d'} onMouseLeave={e => e.currentTarget.style.background = '#1a2e1a'}>
                      Download PDF <Download size={16} />
                    </button>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <button style={{ background: 'transparent', border: '1px solid rgba(26,46,26,0.1)', color: '#1a2e1a', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = '#1a2e1a'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1a2e1a'; }}>
                        Print <Printer size={14} />
                      </button>
                      <button style={{ background: 'transparent', border: '1px solid rgba(26,46,26,0.1)', color: '#1a2e1a', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = '#1a2e1a'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1a2e1a'; }}>
                        Share <Share2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Citation */}
                <div style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(26,46,26,0.08)', padding: 24 }}>
                  <h3 style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#1a2e1a', marginBottom: 12 }}>How to Cite</h3>
                  <div style={{ background: '#fff', border: '1px solid rgba(26,46,26,0.06)', padding: 16, fontSize: 11.5, color: '#4a5568', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 16 }}>
                    {article.authors[0]} et al. ({mounted ? new Date(article.date).getFullYear() : '....'}). "{article.title}". Biospectra (ISSN: 0973-7057), Vol {article.volume}({article.issue}).
                  </div>
                  <button style={{ background: 'none', border: 'none', color: '#1a7a3a', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: 0, cursor: 'pointer', textDecoration: 'underline' }}>
                    Copy Citation
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
