import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { CodingStats } from './components/CodingStats';
import { Journey } from './components/Journey';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackgroundGlow } from './components/BackgroundGlow';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'education', 'journey', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-200 selection:bg-blue-600/30 selection:text-blue-200">
      {/* Subtle Ambient Background Gradients & Matrix */}
      <BackgroundGlow />

      {/* Main Sticky Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Page Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <CodingStats />
        <Journey />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
