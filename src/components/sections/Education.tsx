import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

export function Education() {
  const profile = usePortfolio();
  return (
    <section id="education" className="py-16 bg-secondary-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-text mb-4 uppercase tracking-widest">
            Education
          </h2>
          <p className="text-secondary-text text-lg max-w-2xl mx-auto">
            Education & Academic Journey
          </p>
          <div className="w-12 h-1 bg-gold mx-auto mt-6" />
        </div>

        <div className="relative max-w-4xl mx-auto border-l border-gold/30 ml-3 md:ml-6 space-y-12">
          {profile.education.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <div className={`absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 ${index === 0 ? 'bg-gold border-gold' : 'bg-secondary-bg border-gold'}`}></div>
              
              <div className="bg-card p-6 md:p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-primary-text">{item.degree}</h3>
                    <p className="text-gold font-medium text-sm mt-1">{item.field}</p>
                  </div>
                  <div className="mt-2 md:mt-0 text-left md:text-right">
                    <span className="inline-block bg-secondary-bg px-3 py-1 rounded-full text-xs font-semibold text-secondary-text border border-border">
                      {item.startYear ? `${item.startYear} – ${item.endYear}` : item.endYear}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  {item.institutionUrl ? (
                    <a href={item.institutionUrl} target="_blank" rel="noopener noreferrer" className="text-primary-text font-medium hover:text-gold transition-colors inline-block">
                      {item.institution}
                    </a>
                  ) : (
                    <p className="text-primary-text font-medium">{item.institution}</p>
                  )}
                  <p className="text-secondary-text text-sm mt-1">{item.location} • {item.status}</p>
                </div>
                
                <p className="text-secondary-text leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
