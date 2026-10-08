import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { TiltCard } from './TiltCard';
import { 
  Code2, 
  Server, 
  Database, 
  Layout, 
  Wrench, 
  BrainCircuit, 
  CheckCircle2, 
  Terminal
} from 'lucide-react';

export const Skills: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  // Category Icon Mapping
  const getCategoryIcon = (title: string) => {
    switch (title) {
      case 'Programming Languages':
        return <Code2 className="w-5 h-5 text-amber-400" />;
      case 'Backend Development':
        return <Server className="w-5 h-5 text-blue-400" />;
      case 'Databases & Storage':
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Web Technologies':
        return <Layout className="w-5 h-5 text-cyan-400" />;
      case 'Tools & IDEs':
        return <Wrench className="w-5 h-5 text-purple-400" />;
      case 'Core Computer Science Concepts':
        return <BrainCircuit className="w-5 h-5 text-rose-400" />;
      default:
        return <Terminal className="w-5 h-5 text-indigo-400" />;
    }
  };

  const filterTabs = [
    'All',
    'Languages',
    'Backend',
    'Databases',
    'Web',
    'Tools',
    'Core Concepts'
  ];

  const filteredCategories = portfolioData.skills.filter((category) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Languages' && category.title.includes('Languages')) return true;
    if (selectedFilter === 'Backend' && category.title.includes('Backend')) return true;
    if (selectedFilter === 'Databases' && category.title.includes('Databases')) return true;
    if (selectedFilter === 'Web' && category.title.includes('Web')) return true;
    if (selectedFilter === 'Tools' && category.title.includes('Tools')) return true;
    if (selectedFilter === 'Core Concepts' && category.title.includes('Core')) return true;
    return false;
  });

  return (
    <section id="skills" className="py-20 md:py-28 relative" aria-label="Technical Skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-blue-400 uppercase tracking-wider">
              <Code2 className="w-4 h-4" />
              <span>Developer Toolkit</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Technical Skills
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
          </div>

          <p className="text-slate-400 max-w-md text-sm leading-relaxed">
            Proficiencies across Java enterprise systems, relational database architecture, front-end technologies, and computer science fundamentals.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                selectedFilter === tab
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 border border-blue-500'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Skill Cards Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat, idx) => (
            <TiltCard 
              key={idx}
              maxTilt={6}
              perspective={1100}
              glareOpacity={0.08}
              className="rounded-2xl"
            >
              <div
                className="p-6 rounded-2xl bg-gradient-to-br from-[#0c111f]/90 via-[#0a0e1a]/90 to-[#080b14]/90 border border-slate-800/80 hover:border-slate-700 hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 group flex flex-col justify-between h-full"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-105 transition-transform">
                        {getCategoryIcon(cat.title)}
                      </div>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-300 transition-colors">
                        {cat.title}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      {cat.skills.length} skills
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-200 text-xs sm:text-sm font-medium hover:bg-blue-950/40 hover:border-blue-700/50 hover:text-blue-200 transition-all cursor-default group/skill"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400/70 group-hover/skill:text-blue-400" />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer indicator */}
                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Verified knowledge</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
};
