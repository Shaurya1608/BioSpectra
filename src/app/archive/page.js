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
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Page Header */}
        <div className="mb-12">
          <SectionTitle 
            title="Journal Archive" 
            subtitle="Explore our comprehensive repository of previously published volumes and peer-reviewed biological research."
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-7xl mx-auto">
          
          {/* Left Sidebar: Sticky Year Navigation */}
          <aside className="lg:w-1/4 shrink-0">
            <div className="sticky top-28 bg-white rounded-3xl p-5 border border-slate-100 shadow-xl shadow-slate-200/40">
              <div className="flex items-center justify-between mb-4 text-emerald-900 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Library size={18} className="text-emerald-600" />
                  <h3 className="text-base font-black uppercase tracking-widest">Published Years</h3>
                </div>
              </div>

              {/* Year Search Input */}
              <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Search size={14} />
                </div>
                <input 
                  type="text" 
                  placeholder="Filter year..."
                  value={yearQuery}
                  onChange={(e) => setYearQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors placeholder:text-slate-400"
                />
              </div>
              
              {/* Scrollable Years List */}
              <div 
                className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[49vh] pb-4 lg:pb-0 pr-1 scrollbar-emerald"
                data-lenis-prevent
              >
                {filteredYears.length > 0 ? (
                  filteredYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => { setActiveYear(year); setSearchQuery(''); }}
                      className={`px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap text-left flex justify-between items-center group
                        ${activeYear === year 
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-100 lg:scale-[1.02] ml-0 lg:ml-1' 
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-emerald-700'
                        }`}
                    >
                      <span>Volume {archives.find(a => a.year === year)?.volume} ({year})</span>
                      {activeYear === year && <ChevronRight size={16} className="hidden lg:block opacity-70" />}
                    </button>
                  ))
                ) : (
                  <div className="text-center py-4 text-slate-400 text-sm italic">
                    No years found.
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Right Content Area: Search & Issues Grid */}
          <main className="lg:w-3/4 flex-grow">
            
            {/* Search Top Bar */}
            <div className="bg-white rounded-xl p-2.5 border border-slate-100 shadow-sm mb-6 flex items-center">
              <div className="bg-slate-50 p-2 rounded-lg mr-3 text-emerald-600">
                <Search size={16} />
              </div>
              <input 
                type="text" 
                placeholder={`Search within Volume ${activeVolume.volume} (${activeVolume.year})...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none text-slate-800 text-sm font-medium placeholder:text-slate-400"
              />
            </div>

            {/* Active Volume Header */}
            <div className="flex items-center space-x-3 mb-5">
              <div className="bg-emerald-50 text-emerald-700 p-2.5 rounded-xl shadow-inner border border-emerald-100">
                <Book size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Volume {activeVolume.volume}
                </h2>
                <div className="flex items-center text-emerald-700 font-bold text-[10px] tracking-widest uppercase mt-0.5">
                  <span>Year: {activeVolume.year}</span>
                  <span className="mx-2">•</span>
                  <span>{activeVolume.issues.length} Issues</span>
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
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {filteredIssues.length > 0 ? (
                  filteredIssues.map((issue) => (
                    <Link 
                      href={`/issue/${activeVolume.volume}/${issue.number}`}
                      key={issue.number}
                      className="bg-white rounded-[1.25rem] border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-emerald-200 transition-all duration-300 group cursor-pointer overflow-hidden relative p-4 flex flex-col"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600 group-hover:w-1.5 transition-all duration-300"></div>
                      
                      <div className="flex items-start justify-between mb-3 pl-1">
                        <div className="bg-emerald-50 text-emerald-700 w-10 h-10 rounded-[0.6rem] flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shrink-0">
                          <span className="text-lg font-black">{issue.number}</span>
                        </div>
                        <div className="bg-slate-50 px-2 py-1 rounded border border-slate-100 group-hover:border-emerald-200 transition-colors ml-2 mt-1">
                          <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">
                            {issue.month} Issue
                          </span>
                        </div>
                      </div>

                      <div className="mb-4 pl-1">
                        <h4 className="text-[15px] font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors leading-snug">
                          Issue {issue.number} - {issue.month} {activeVolume.year}
                        </h4>
                        <div className="flex items-center text-[11px] font-medium text-slate-500">
                          <FileText size={10} className="mr-1 text-slate-400 group-hover:text-emerald-500 shrink-0" />
                          {issue.articleCount} Peer-Reviewed Papers
                        </div>
                      </div>

                      <div className="mt-auto pt-2 border-t border-slate-100 flex items-center justify-between text-emerald-700 text-[9px] font-black uppercase tracking-widest group-hover:text-emerald-600 pl-1">
                        <span>Explore Contents</span>
                        <div className="bg-emerald-50 p-1 rounded group-hover:bg-emerald-100 group-hover:translate-x-0.5 transition-all">
                          <ChevronRight size={12} />
                        </div>
                      </div>
                    </Link>
                  ))

                ) : (
                  <div className="col-span-full bg-white p-12 text-center rounded-3xl border border-slate-100">
                    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                      <Search size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No issues found</h3>
                    <p className="text-slate-500">We couldn't find any issues matching "{searchQuery}" in Volume {activeVolume.volume}.</p>
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
