import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import { ProjectMockup } from './ProjectMockups';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './SocialIcons';
import { TiltCard } from './TiltCard';
import { 
  FolderGit2, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 md:py-28 relative" aria-label="Featured Projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-blue-400 uppercase tracking-wider">
              <FolderGit2 className="w-4 h-4" />
              <span>Engineering Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Featured Projects
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
          </div>

          <p className="text-slate-400 max-w-md text-sm leading-relaxed">
            Hands-on applications showcasing modular Java architecture, relational database management, and responsive front-end development.
          </p>
        </div>

        {/* Project Cards Stack / Grid */}
        <div className="space-y-12">
          {portfolioData.projects.map((project, idx) => (
            <TiltCard 
              key={project.id}
              maxTilt={4}
              perspective={1400}
              glareOpacity={0.08}
              className="rounded-3xl"
            >
              <div
                className="rounded-3xl bg-gradient-to-br from-[#0c1120]/90 via-[#0a0e1a]/90 to-[#080b14]/90 border border-slate-800/90 shadow-2xl p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-slate-700 hover:shadow-blue-900/10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  
                  {/* Left Column: Project Info */}
                  <div className="lg:col-span-6 space-y-6">
                    
                    {/* Category & Badge */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {project.category}
                      </span>
                      <span className="text-slate-600 text-xs font-mono">
                        Project #{idx + 1}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-3">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-blue-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Badges */}
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                        Technologies Used
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-900/90 text-slate-200 border border-slate-800"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features Quick List */}
                    <div className="space-y-2 pt-1">
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-500">
                        Core Capabilities
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                        {project.features.slice(0, 4).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs sm:text-sm shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02]"
                      >
                        <span>View Project Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <a
                        href={project.githubUrl || 'https://github.com/harishravi10'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 font-medium text-xs sm:text-sm transition-all"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>View on GitHub</span>
                      </a>
                    </div>

                  </div>

                  {/* Right Column: Visual UI Mockup */}
                  <div className="lg:col-span-6">
                    <div className="relative group">
                      {/* Subtle glow border */}
                      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur opacity-50 group-hover:opacity-80 transition duration-300" />
                      
                      <div className="relative">
                        <ProjectMockup type={project.mockupType} />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </TiltCard>
          ))}
        </div>

      </div>

      {/* Deep-dive Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
