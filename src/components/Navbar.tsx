import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080c14]/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 text-white font-semibold tracking-tight text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
            aria-label="Harish R - Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Terminal className="w-4 h-4 text-blue-100" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                {portfolioData.personal.name}
              </span>
              <span className="text-[10px] text-slate-400 font-mono -mt-1 hidden sm:block">
                Java Full Stack Dev
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all relative ${
                    isActive
                      ? 'text-blue-400 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action / Social Icons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile (opens in new tab)"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg border border-slate-800 hover:border-slate-700 transition-all hover:scale-105"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile (opens in new tab)"
              className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800/80 rounded-lg border border-slate-800 hover:border-slate-700 transition-all hover:scale-105"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="ml-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/25 transition-all hover:scale-[1.02]"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-1.5 text-slate-400 hover:text-white"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-1.5 text-slate-400 hover:text-blue-400"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0a0e1a]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          
          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-300 hover:text-white"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-300 hover:text-blue-400"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>

            <a
              href="#contact"
              onClick={handleLinkClick}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-sm shadow-md"
            >
              <span>Contact Me</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
