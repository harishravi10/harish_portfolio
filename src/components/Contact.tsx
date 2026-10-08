import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  ExternalLink
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { personal } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personal.rawPhone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill out all fields before submitting.');
      return;
    }

    setErrorMsg('');
    setFormSubmitted(true);

    // Form fallback: generate mailto link with encoded subject and body
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Harish,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n`
    );
    
    // Open default mail client
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative" aria-label="Contact Section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-blue-400 uppercase tracking-wider">
              <Mail className="w-4 h-4" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Let's Connect
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
          </div>

          <p className="text-slate-300 max-w-lg text-base leading-relaxed">
            "I'm currently focused on improving my software development skills and exploring opportunities where I can learn, contribute, and grow as a developer."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1120]/90 via-[#0a0e1a]/90 to-[#080b14]/90 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Email Address</div>
                  <a 
                    href={`mailto:${personal.email}`}
                    className="text-sm sm:text-base font-semibold text-slate-100 hover:text-blue-400 transition-colors break-all"
                  >
                    {personal.email}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Copy email address"
                aria-label="Copy email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1120]/90 via-[#0a0e1a]/90 to-[#080b14]/90 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-600/10 text-emerald-400 border border-emerald-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Phone Number</div>
                  <a 
                    href={`tel:${personal.rawPhone}`}
                    className="text-sm sm:text-base font-semibold text-slate-100 hover:text-emerald-400 transition-colors"
                  >
                    {personal.phone}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Copy phone number"
                aria-label="Copy phone"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* LinkedIn Card */}
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1120]/90 via-[#0a0e1a]/90 to-[#080b14]/90 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">LinkedIn Profile</div>
                  <div className="text-sm sm:text-base font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
                    linkedin.com/in/harishravi10
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
            </a>

            {/* GitHub Card */}
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1120]/90 via-[#0a0e1a]/90 to-[#080b14]/90 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-slate-800 text-slate-300 border border-slate-700">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">GitHub Profile</div>
                  <div className="text-sm sm:text-base font-semibold text-slate-100 group-hover:text-white transition-colors">
                    github.com/harishravi10
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
            </a>

            {/* Location Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1120]/90 via-[#0a0e1a]/90 to-[#080b14]/90 border border-slate-800/80 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-rose-600/10 text-rose-400 border border-rose-500/20">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400">Current Location</div>
                <div className="text-sm sm:text-base font-semibold text-slate-100">
                  {personal.location}
                </div>
              </div>
            </div>

            {/* Direct Mailto Button Fallback */}
            <div className="pt-2">
              <a
                href={`mailto:${personal.email}?subject=Opportunity%20Inquiry`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-400 hover:text-blue-300 border border-blue-500/30 text-sm font-semibold transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email Me Directly (mailto link)</span>
              </a>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c1120]/90 via-[#0a0e1a]/90 to-[#080b14]/90 border border-slate-800/90 shadow-2xl relative">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Send a Message
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Have an internship, project discussion, or junior engineering opportunity? Fill out this form to connect directly.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 space-y-3 animate-in fade-in">
                  <div className="flex items-center gap-2 font-semibold text-emerald-400">
                    <Check className="w-5 h-5" />
                    <span>Email client initiated</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    A pre-filled email draft has been generated in your default mail application addressing <strong className="text-white">{personal.email}</strong>. 
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs font-mono text-emerald-400 hover:underline pt-2"
                  >
                    Send another message &rarr;
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="e.g. John Doe / Tech Recruiter"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#080c14] border border-slate-800 text-slate-100 placeholder:text-slate-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#080c14] border border-slate-800 text-slate-100 placeholder:text-slate-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      placeholder="Discuss an internship role, project collaboration, or general inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#080c14] border border-slate-800 text-slate-100 placeholder:text-slate-600 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submission Honest Note */}
                  <div className="text-[11px] text-slate-500 font-mono">
                    * This form prepares a direct draft to <span className="text-slate-400">{personal.email}</span> with zero third-party tracking.
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
