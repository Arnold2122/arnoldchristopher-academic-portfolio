import { Mail, MapPin, GraduationCap, ArrowUp, Link } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { EmailModal } from '../ui/EmailModal';

export function SectionFooter() {
  const profile = usePortfolio();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1221] text-gray-300 pt-10 pb-6 mt-8 border-t-4 border-gold">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-8">
          
          {/* Left Column */}
          <div className="md:col-span-5">
            <h3 className="font-serif text-2xl font-bold text-white mb-1">{profile.name}</h3>
            <p className="text-gold font-medium text-sm uppercase tracking-wider mb-5">{profile.designation}</p>
            
            <div className="space-y-2 text-sm mb-6">
              <p><strong>Department:</strong> {profile.department}</p>
              <p>
                <strong>Institution:</strong>{' '}
                <a href="https://kitcbe.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors hover:underline underline-offset-2">
                  {profile.institution}
                </a>
              </p>
              <p><strong>Location:</strong> {profile.location}</p>
              <p><strong>Degree:</strong> {profile.degree}</p>
            </div>

            <div className="space-y-2">
              <EmailModal email={profile.email}>
                <div className="flex items-center gap-3 hover:text-gold transition-colors text-sm">
                  <Mail size={16} />
                  <span>{profile.email}</span>
                </div>
              </EmailModal>
              <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
                <MapPin size={16} />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-serif text-base font-bold text-white mb-4">PORTFOLIO</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { name: 'About Me', path: '/about' },
                  { name: 'Education', path: '/education' },
                  { name: 'Experience', path: '/experience' },
                  { name: 'Publications', path: '/publications' },
                  { name: 'Projects', path: '/projects' },
                  { name: 'Certificates', path: '/certificates' },
                  { name: 'Contact', path: '/contact' }
                ].map(item => (
                  <li key={item.name}>
                    <RouterLink to={item.path} onClick={scrollToTop} className="hover:text-gold transition-colors text-left block">
                      {item.name}
                    </RouterLink>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-serif text-base font-bold text-white mb-4">RESEARCH & ACADEMIC</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { name: 'Publications', path: '/publications' },
                  { name: 'Research Projects', path: '/projects' },
                  { name: 'Certificates', path: '/certificates' }
                ].map(item => (
                  <li key={item.name}>
                    <RouterLink to={item.path} onClick={scrollToTop} className="hover:text-gold transition-colors text-left block">
                      {item.name}
                    </RouterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-base font-bold text-white mb-4">SCHOLARLY / PROFESSIONAL PROFILES</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-2.5 text-sm">
              <a href={profile.profiles.googleScholar.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                <GraduationCap size={14} /> Google Scholar
              </a>
              <a href={profile.profiles.orcid.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Link size={14} /> ORCID
              </a>
              <a href={profile.profiles.scopus.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Link size={14} /> Scopus
              </a>
              <a href={profile.profiles.igiGlobal.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Link size={14} /> IGI Global
              </a>
              <a href={profile.profiles.linkedin.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                <FiLinkedin size={14} /> LinkedIn
              </a>
              <a href={profile.profiles.github.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                <FiGithub size={14} /> GitHub
              </a>
              <a href={profile.profiles.codechef.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Link size={14} /> CodeChef
              </a>
              <a href={profile.profiles.leetcode.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Link size={14} /> LeetCode
              </a>
              <a href={profile.profiles.codeforces.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Link size={14} /> Codeforces
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xs font-medium text-gray-400 mb-2">Connect on Scholarly Networks</span>
            <div className="flex items-center gap-3">
              <a href={profile.profiles.linkedin.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gold hover:text-primary-bg transition-colors">
                <FiLinkedin size={16} />
              </a>
              <a href={profile.profiles.github.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gold hover:text-primary-bg transition-colors">
                <FiGithub size={16} />
              </a>
              <EmailModal email={profile.email}>
                <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gold hover:text-primary-bg transition-colors">
                  <Mail size={16} />
                </div>
              </EmailModal>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 mx-auto md:ml-auto md:mr-0 text-sm font-medium text-gray-400 hover:text-gold transition-colors mb-3"
            >
              Back to Top <ArrowUp size={16} />
            </button>
            <p className="text-xs text-gray-500">
              © {currentYear} {profile.name}. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
