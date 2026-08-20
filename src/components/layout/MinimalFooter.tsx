import { Mail, ExternalLink } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { usePortfolio } from '../../context/PortfolioContext';
import { EmailModal } from '../ui/EmailModal';

export function MinimalFooter() {
  const profile = usePortfolio();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-bg border-t border-border py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-xs text-secondary-text gap-4">
        <p>© {currentYear} {profile.name}. All rights reserved.</p>
        
        <div className="flex items-center space-x-4">
          <a href={profile.profiles.linkedin.url} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
            <FiLinkedin size={16} />
          </a>
          <a href={profile.profiles.github.url} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
            <FiGithub size={16} />
          </a>
          <EmailModal email={profile.email}>
            <div className="hover:text-gold transition-colors">
              <Mail size={16} />
            </div>
          </EmailModal>
          <a href={profile.profiles.googleScholar.url} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" title="Google Scholar">
             <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
