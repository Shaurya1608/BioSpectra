'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, ChevronRight, FileText, Search, Library } from 'lucide-react';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';

const Archive = () => {
  const [activeYear, setActiveYear] = useState(2024);
  const [searchQuery, setSearchQuery] = useState('');
  const [yearQuery, setYearQuery] = useState('');

  const P = {
    deepPurple: '#2d0057',
    richPurple: '#5a0096',
    magenta:    '#be00be',
    textBody:   '#3d2a5a',
    textMuted:  '#7c5da0',
    lavenderMist: '#f5eeff',
    border:     'rgba(139,0,204,0.1)',
  };
  // Expanded Mock data from 2036 down to 2006 (31 years)
  const archives = useMemo(() => {
    return Array.from({ length: 31 }, (_, i) => {
      const year = 2036 - i;
      const volume = year - 2005; // 2006 represents Volume 1
      const count1 = 12 + (year % 5);
      const count2 = 14 + (year % 4);
      return {
        volume,
        year,
        issues: [
          { number: 2, month: 'September', articleCount: count2 },
          { number: 1, month: 'March', articleCount: count1 },
        ]
      };
    });
  }, []);

  const availableYears = archives.map(a => a.year);

  const filteredYears = useMemo(() => {
    if (!yearQuery) return availableYears;
    return availableYears.filter(year => year.toString().includes(yearQuery));
  }, [yearQuery, availableYears]);

  const activeVolume = useMemo(() => {
    return archives.find(a => a.year === activeYear) || archives[0];
  }, [activeYear, archives]);

  const filteredIssues = useMemo(() => {
    if (!searchQuery) return activeVolume.issues;
    return activeVolume.issues.filter(issue => 
      issue.month.toLowerCase().includes(searchQuery.toLowerCase()) || 
      issue.number.toString().includes(searchQuery)
    );
  }, [searchQuery, activeVolume]);
  return (
    <div 
      className="pt-40 pb-20 min-h-screen"
      style={{ background: '#fdfcff' }}
    >
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Page Header */}
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
              Journal Archive
            </h1>
            <p style={{ color: P.textBody }} className="text-sm leading-relaxed opacity-80">
              Explore our comprehensive repository of previously published volumes and peer-reviewed biological research.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 max-w-7xl mx-auto">
          
          {/* Left Sidebar: Sticky Year Navigation */}
          <aside className="lg:w-1/4 shrink-0">
            <div 
              style={{ background: 'white', border: `1px solid ${P.border}` }}
              className="sticky top-28 p-6 shadow-xl shadow-purple-900/5 transition-all"
            >
              <div 
                style={{ color: P.deepPurple, borderBottom: `1px solid ${P.border}` }}
                className="flex items-center justify-between mb-6 pb-4"
              >
                <div className="flex items-center space-x-3">
                  <Library size={18} style={{ color: P.magenta }} />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Published Volumes</h3>
                </div>
              </div>

              {/* Year Search Input */}
              <div className="mb-6 relative group">
                <div 
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors"
                  style={{ color: P.textMuted }}
                >
                  <Search size={14} />
                </div>
                <input 
                  type="text" 
                  placeholder="Filter by year..."
                  value={yearQuery}
                  onChange={(e) => setYearQuery(e.target.value)}
                  style={{ border: `1px solid ${P.border}`, background: '#f9f6ff' }}
                  className="w-full py-2.5 pl-9 pr-3 text-xs focus:outline-none focus:border-magenta focus:bg-white transition-all placeholder:text-slate-300 font-bold"
                />
              </div>
              
              {/* Scrollable Years List */}
              <div 
                className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[50vh] pb-4 lg:pb-0 pr-1"
                style={{ scrollbarWidth: 'thin', scrollbarColor: `${P.magenta} transparent` }}
              >
                {filteredYears.length > 0 ? (
                  filteredYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => { setActiveYear(year); setSearchQuery(''); }}
                      style={{ 
                        background: activeYear === year ? P.deepPurple : 'transparent',
                        color: activeYear === year ? 'white' : P.textBody,
                        border: activeYear === year ? 'none' : `1px solid transparent` 
                      }}
                      className={`px-4 py-3 text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap text-left flex justify-between items-center group
                        ${activeYear === year 
                          ? 'shadow-lg shadow-purple-900/20' 
                          : 'hover:bg-purple-50 hover:text-magenta'
                        }`}
                    >
                      <span>Vol. {archives.find(a => a.year === year)?.volume} ({year})</span>
                      {activeYear === year && <ChevronRight size={14} className="hidden lg:block opacity-60" />}
                    </button>
                  ))
                ) : (
                  <div style={{ color: P.textMuted }} className="text-center py-4 text-[10px] font-bold uppercase italic opacity-60">
                    No volumes found.
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Right Content Area: Search & Issues Grid */}
          <main className="lg:w-3/4 flex-grow">
            
            {/* Search Top Bar */}
            <div 
              style={{ background: 'white', border: `1px solid ${P.border}` }}
              className="p-3 shadow-xl shadow-purple-900/5 mb-8 flex items-center group"
            >
              <div 
                style={{ background: P.lavenderMist, color: P.richPurple }}
                className="p-2.5 rounded-sm mr-4 transition-colors group-focus-within:bg-magenta group-focus-within:text-white"
              >
                <Search size={16} />
              </div>
              <input 
                type="text" 
                placeholder={`Search within Volume ${activeVolume.volume} (${activeVolume.year})...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none text-slate-800 text-sm font-bold uppercase tracking-wide placeholder:text-slate-300 placeholder:normal-case"
              />
            </div>

            {/* Active Volume Header */}
            <div className="flex items-center space-x-4 mb-8">
              <div 
                style={{ background: P.deepPurple, color: 'white' }}
                className="w-12 h-12 flex items-center justify-center shadow-2xl"
              >
                <Book size={20} />
              </div>
              <div>
                <h2 
                  style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }}
                  className="text-3xl font-black tracking-tight"
                >
                  Volume {activeVolume.volume}
                </h2>
                <div style={{ color: P.magenta }} className="flex items-center font-black text-[10px] tracking-[0.2em] uppercase mt-1">
                  <span>Year: {activeVolume.year}</span>
                  <span className="mx-3 opacity-30">|</span>
                  <span>{activeVolume.issues.length} Issues Released</span>
                </div>
              </div>
            </div>

            {/* Issues Grid with Animation */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeYear + searchQuery}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {filteredIssues.length > 0 ? (
                  filteredIssues.map((issue) => (
                    <Link 
                      href={`/issue/${activeVolume.volume}/${issue.number}`}
                      key={issue.number}
                      style={{ background: 'white', border: `1px solid ${P.border}` }}
                      className="shadow-xl shadow-purple-900/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group cursor-pointer overflow-hidden p-6 flex flex-col relative"
                    >
                      <div 
                        style={{ background: P.magenta }}
                        className="absolute left-0 top-0 bottom-0 w-1 group-hover:w-2 transition-all duration-300" 
                      />
                      
                      <div className="flex items-start justify-between mb-6">
                        <div 
                          style={{ border: `1px solid ${P.border}`, background: P.lavenderMist, color: P.deepPurple }}
                          className="w-12 h-12 flex items-center justify-center group-hover:bg-[#be00be] group-hover:text-white transition-all duration-300"
                        >
                          <span className="text-xl font-black">{issue.number}</span>
                        </div>
                        <div 
                          style={{ border: `1px solid ${P.border}`, color: P.textMuted }}
                          className="px-3 py-1 font-black text-[9px] uppercase tracking-widest group-hover:border-magenta group-hover:text-magenta transition-colors"
                        >
                          {issue.month} Issue
                        </div>
                      </div>

                      <div className="mb-8">
                        <h4 
                          style={{ fontFamily: 'var(--font-crimson-pro), serif', color: P.deepPurple }}
                          className="text-xl font-black mb-1 group-hover:text-magenta transition-colors leading-snug"
                        >
                          Issue {issue.number} - {issue.month} {activeVolume.year}
                        </h4>
                        <div style={{ color: P.textMuted }} className="flex items-center text-[11px] font-bold uppercase tracking-wider">
                          <FileText size={11} style={{ color: P.magenta }} className="mr-2 shrink-0 opacity-60" />
                          {issue.articleCount} Scientific Papers
                        </div>
                      </div>

                      <div 
                        style={{ color: P.richPurple, borderTop: `1px solid ${P.border}` }}
                        className="mt-auto pt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-magenta"
                      >
                        <span>View Issue Details</span>
                        <div className="group-hover:translate-x-1 transition-all">
                          <ChevronRight size={14} />
                        </div>
                      </div>
                    </Link>
                  ))

                ) : (
                  <div 
                    style={{ background: 'white', border: `1px solid ${P.border}` }}
                    className="col-span-full p-20 text-center shadow-xl shadow-purple-900/5"
                  >
                    <div style={{ background: P.lavenderMist, color: P.richPurple }} className="w-24 h-24 flex items-center justify-center mx-auto mb-6">
                      <Search size={32} />
                    </div>
                    <h3 style={{ color: P.deepPurple }} className="text-2xl font-black mb-2 uppercase tracking-tight">No issues found</h3>
                    <p style={{ color: P.textMuted }} className="text-sm font-medium">We couldn't find any issues matching "{searchQuery}" in Volume {activeVolume.volume}.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

          </main>
        </div>
      </div>
    </div>
  );
};

export default Archive;
