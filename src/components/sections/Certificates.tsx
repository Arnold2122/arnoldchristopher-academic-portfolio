import { motion } from 'framer-motion';
import { ExternalLink, Award } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export function Certificates() {
  const profile = usePortfolio();
  if (profile.certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-16 bg-secondary-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-text mb-4 uppercase tracking-widest">
            CERTIFICATES
          </h2>
          <p className="text-secondary-text text-lg max-w-2xl mx-auto">
            Certifications & Professional Learning
          </p>
          <div className="w-12 h-1 bg-gold mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.certificates.map((certificate, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group flex flex-col justify-between h-full bg-card p-5 md:p-6 rounded-xl border border-border shadow-sm hover:border-gold/50 transition-colors"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-secondary-bg flex items-center justify-center text-gold group-hover:bg-gold/10 transition-colors flex-shrink-0">
                    <Award size={20} />
                  </div>
                  <span className="inline-block px-3 py-1 bg-secondary-bg rounded-full text-xs font-semibold text-secondary-text border border-border">
                    {certificate.year}
                  </span>
                </div>
                
                <h3 className="font-serif text-lg md:text-xl font-bold text-primary-text mb-2">
                  {certificate.title}
                </h3>
                
                <p className="text-sm font-medium text-secondary-text mb-4">
                  Offered by:{' '}
                  {certificate.issuerUrl ? (
                    <a 
                      href={certificate.issuerUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gold hover:underline"
                    >
                      {certificate.issuer}
                    </a>
                  ) : (
                    <span className="text-gold">{certificate.issuer}</span>
                  )}
                </p>
              </div>
              
              <div className="mt-auto">
                <a 
                  href={certificate.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-primary-text hover:text-gold transition-colors"
                >
                  View Certificate
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
