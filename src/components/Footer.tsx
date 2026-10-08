import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { Mail, ArrowUp, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-800/80 bg-[#06080e] pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-slate-800/60">
          
          {/* Identity */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Terminal className="w-4 h-4 text-blue-100" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {personal.name}
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm font-medium">
              Computer Science Engineer | Java Full Stack Developer
            </p>
            <p className="text-slate-500 text-xs">
              {personal.college}
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#education" className="hover:text-white transition-colors">Education</a>
            <a href="#coding" className="hover:text-white transition-colors">Problem Solving</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all hover:scale-105"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-slate-700 transition-all hover:scale-105"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${personal.email}`}
              aria-label="Email"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all hover:scale-105"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 transition-all hover:scale-105 ml-2"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Sub-row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            &copy; 2026 {personal.name}. All rights reserved.
          </div>
          <div>
            Designed &amp; engineered with React, TypeScript &amp; Tailwind CSS
          </div>
        </div>

      </div>
    </footer>
  );
};
