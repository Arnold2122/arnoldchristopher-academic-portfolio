import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, GraduationCap, Library, BookOpen, Code2, Code, Terminal } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { usePortfolio } from '../../context/PortfolioContext';
import { cn } from '../../lib/utils';

export function Profiles() {
  const profile = usePortfolio();
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Academic / Research', 'Professional', 'Competitive Programming'];

  const allProfiles = [
    // Academic / Research
    {
      category: "Academic / Research",
      name: "Google Scholar",
      ...profile.profiles.googleScholar,
      icon: <GraduationCap size={20} />
    },
    {
      category: "Academic / Research",
      name: "Scopus",
      ...profile.profiles.scopus,
      icon: <Library size={20} />
    },
    {
      category: "Academic / Research",
      name: "ORCID",
      ...profile.profiles.orcid,
      icon: <BookOpen size={20} />
    },
    {
      category: "Academic / Research",
      name: "IGI Global",
      ...profile.profiles.igiGlobal,
      icon: <BookOpen size={20} />
    },
    // Professional
    {
      category: "Professional",
      name: "LinkedIn",
      ...profile.profiles.linkedin,
      icon: <FiLinkedin size={20} />
    },
    {
      category: "Professional",
      name: "GitHub",
      ...profile.profiles.github,
      icon: <FiGithub size={20} />
    },
    // Competitive Programming
    {
      category: "Competitive Programming",
      name: "CodeChef",
      ...profile.profiles.codechef,
      icon: <Code size={20} />
    },
    {
      category: "Competitive Programming",
      name: "LeetCode",
      ...profile.profiles.leetcode,
      icon: <Code2 size={20} />
    },
    {
      category: "Competitive Programming",
      name: "Codeforces",
      ...profile.profiles.codeforces,
      icon: <Terminal size={20} />
    }
  ];

  const filteredProfiles = filter === 'All' 
    ? allProfiles 
    : allProfiles.filter(p => p.category === filter);

  return (
    <section id="profiles" className="py-16 bg-secondary-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-text mb-4 uppercase tracking-widest">
            Professional & Academic Profiles
          </h2>
          <p className="text-secondary-text text-lg max-w-2xl mx-auto">
            Research, professional presence and competitive programming profiles.
          </p>
          <div className="w-12 h-1 bg-gold mx-auto mt-6" />
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-row flex-wrap md:flex-nowrap justify-center gap-3 mb-12 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
                filter === cat 
                  ? "bg-gold text-white shadow-md" 
                  : "bg-card text-secondary-text border border-border hover:border-gold/50 hover:text-gold"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProfiles.map((item) => (
              <motion.a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col h-full bg-card p-4 md:p-5 rounded-xl border border-border shadow-sm hover:border-gold hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2.5 rounded-lg bg-secondary-bg text-primary-text group-hover:text-gold group-hover:bg-gold/10 transition-colors">
                    {item.icon}
                  </div>
                  <ExternalLink size={16} className="text-secondary-text group-hover:text-gold transition-colors" />
                </div>
                
                <h4 className="font-serif text-base md:text-lg font-bold text-primary-text mb-1.5">
                  {item.name}
                </h4>
                
                <div className="h-7 mb-2">
                  {(item as any).authorId && (
                    <p className="text-[11px] font-mono text-secondary-text bg-primary-bg inline-block px-1.5 py-0.5 rounded border border-border">
                      {item.name === 'Scopus' ? 'Scopus ID: ' : 'ID: '}{(item as any).authorId}
                    </p>
                  )}
                </div>
                
                <p className="text-xs md:text-sm text-secondary-text leading-relaxed">
                  {item.description}
                </p>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
