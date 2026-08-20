import { Mail, ExternalLink } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { usePortfolio } from '../../context/PortfolioContext';
import { EmailModal } from '../ui/EmailModal';

export function Footer() {
  const profile = usePortfolio();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-bg border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex flex-col max-w-sm">
          <h2 className="font-serif text-2xl font-semibold text-primary-text mb-2">
            {profile.name}
          </h2>
          <p className="text-secondary-text text-sm mb-6">
            {profile.designation}
          </p>
          <div className="flex items-center space-x-4">
            <a href={profile.profiles.linkedin.url} target="_blank" rel="noopener noreferrer" className="text-secondary-text hover:text-gold transition-colors">
              <FiLinkedin size={20} />
            </a>
            <a href={profile.profiles.github.url} target="_blank" rel="noopener noreferrer" className="text-secondary-text hover:text-gold transition-colors">
              <FiGithub size={20} />
            </a>
            <EmailModal email={profile.email}>
              <div className="text-secondary-text hover:text-gold transition-colors">
                <Mail size={20} />
              </div>
            </EmailModal>
            <a href={profile.profiles.googleScholar.url} target="_blank" rel="noopener noreferrer" className="text-secondary-text hover:text-gold transition-colors" title="Google Scholar">
               <ExternalLink size={20} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
          <div className="flex flex-col space-y-3">
            <a href="#about" className="text-secondary-text hover:text-gold transition-colors">About Me</a>
            <a href="#education" className="text-secondary-text hover:text-gold transition-colors">Education</a>
            <a href="#experience" className="text-secondary-text hover:text-gold transition-colors">Experience</a>
          </div>
          <div className="flex flex-col space-y-3">
            <a href="#research" className="text-secondary-text hover:text-gold transition-colors">Research</a>
            <a href="#publications" className="text-secondary-text hover:text-gold transition-colors">Publications</a>
            <a href="#profiles" className="text-secondary-text hover:text-gold transition-colors">Profiles</a>
          </div>
          <div className="flex flex-col space-y-3">
            <a href="#projects" className="text-secondary-text hover:text-gold transition-colors">Projects</a>
            <a href="#certificates" className="text-secondary-text hover:text-gold transition-colors">Certificates</a>
            <a href="#contact" className="text-secondary-text hover:text-gold transition-colors">Contact</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs text-secondary-text">
        <p>© {currentYear} {profile.name}. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <span>{profile.location}</span>
        </div>
      </div>
    </footer>
  );
}
