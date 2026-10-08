import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { 
  Milestone, 
  GraduationCap, 
  Code, 
  Database, 
  Globe, 
  Rocket
} from 'lucide-react';

export const Journey: React.FC = () => {
  const getMilestoneIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-blue-400" />;
      case 'Code':
        return <Code className="w-5 h-5 text-indigo-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5 text-purple-400" />;
      default:
        return <Milestone className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="journey" className="py-20 md:py-28 relative" aria-label="Development Journey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-purple-400 uppercase tracking-wider">
              <Milestone className="w-4 h-4" />
              <span>Growth Roadmap</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              My Development Journey
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
          </div>

          <p className="text-slate-400 max-w-md text-sm leading-relaxed">
            The progression of core programming fundamentals, database architecture, and full-stack software development.
          </p>
        </div>

        {/* Development Timeline Pathway */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical connecting gradient line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 -translate-x-1/2 hidden sm:block opacity-40" />

          <div className="space-y-8 sm:space-y-12">
            {portfolioData.journey.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={idx}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card (Left or Right on desktop) */}
                  <div className="w-full sm:w-[calc(50%-2rem)]">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c1120]/90 via-[#0a0e1a]/90 to-[#080b14]/90 border border-slate-800/80 hover:border-slate-700 hover:shadow-xl transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-blue-600/10 text-blue-400 border border-blue-500/20">
                          {item.periodOrTag}
                        </span>
                        <span className="text-xs font-mono text-slate-500">
                          Step {item.step}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node Indicator */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#090d18] border-2 border-indigo-500/80 items-center justify-center z-10 shadow-lg shadow-indigo-500/20">
                    {getMilestoneIcon(item.iconName)}
                  </div>

                  {/* Empty spacer for the opposite side */}
                  <div className="hidden sm:block w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
