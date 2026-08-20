import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export function Experience() {
  const profile = usePortfolio();
  return (
    <section id="experience" className="py-16 bg-primary-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-text mb-4 uppercase tracking-widest">
            Experience
          </h2>
          <p className="text-secondary-text text-lg max-w-2xl mx-auto">
            Experience & Professional Journey
          </p>
          <div className="w-12 h-1 bg-gold mx-auto mt-6" />
        </div>

        <div className="relative max-w-4xl mx-auto border-l border-gold/30 ml-3 md:ml-6 space-y-12">
          {profile.experience.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-secondary-bg border-2 border-gold"></div>
              
              <div className="bg-card p-6 md:p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-primary-text">{item.role}</h3>
                    <p className="text-primary-text font-medium text-sm mt-1">{item.organisation}</p>
                  </div>
                  <div className="mt-2 md:mt-0 text-left md:text-right flex flex-col items-start md:items-end">
                    <span className="inline-block bg-secondary-bg px-3 py-1 rounded-full text-xs font-semibold text-secondary-text border border-border">
                      {item.startYear} – {item.endYear}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4 text-sm text-secondary-text">
                  <span>{item.location}</span>
                  <span className="mx-2">•</span>
                  <span className="text-gold">{item.type}</span>
                </div>
                
                <p className="text-secondary-text leading-relaxed text-sm mb-4">
                  {item.description}
                </p>

                {item.responsibilities.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-secondary-text space-y-1 mb-4">
                    {item.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                )}

                {item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                    {item.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs font-medium bg-primary-bg px-2 py-1 rounded border border-border text-primary-text">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {item.certificateUrl && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <a 
                      href={item.certificateUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-text hover:text-gold transition-colors"
                    >
                      View Certificate
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
