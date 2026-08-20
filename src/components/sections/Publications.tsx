import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { cn } from '../../lib/utils';

export function Publications() {
  const profile = usePortfolio();
  const [filter, setFilter] = useState('ALL');
  
  const categories = ['ALL', 'Scopus Indexed', 'Book Chapters'];
  
  const filteredPublications = profile.publications.filter(p => {
    if (filter === 'ALL') return true;
    if (filter === 'Scopus Indexed') return (p.indexing && p.indexing.toLowerCase().includes('scopus')) || (p.type && p.type.includes('Scopus Indexed'));
    if (filter === 'Book Chapters') return p.type && p.type.includes('Book Chapter');
    return true;
  });

  return (
    <section id="publications" className="py-16 bg-primary-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-text mb-4 uppercase tracking-widest">
            Publications
          </h2>
          <p className="text-secondary-text text-lg max-w-2xl mx-auto">
            Publications & Scholarly Contributions
          </p>
          <div className="w-12 h-1 bg-gold mx-auto mt-6" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                filter === cat 
                  ? "bg-gold text-white shadow-md" 
                  : "bg-secondary-bg text-secondary-text hover:bg-gold/10 hover:text-gold"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPublications.map((pub, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col justify-between h-full bg-card p-5 md:p-6 rounded-xl border border-border shadow-sm hover:border-gold/40 transition-colors"
              >
                <div>
                  <div className="flex flex-row justify-between items-start mb-4 gap-2">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold uppercase tracking-wider">
                      <span className="text-gold">{pub.type || 'Publication'}</span>
                      {pub.status && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-border"></span>
                          <span className={pub.status === 'Published' ? 'text-primary-text' : 'text-secondary-text'}>
                            {pub.status}
                          </span>
                        </>
                      )}
                    </div>
                    {pub.year && (
                      <div className="text-sm font-bold text-secondary-text">
                        {pub.year}
                      </div>
                    )}
                  </div>

                  <h3 className="font-serif text-lg md:text-xl font-bold text-primary-text mb-3 leading-tight">
                    {pub.title}
                  </h3>
                  
                  {pub.authors && (
                    <p className="text-sm font-medium text-primary-text/80 mb-3">
                      <span className="text-secondary-text">Book: </span>
                      {pub.bookUrl ? (
                        <a href={pub.bookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                          {pub.authors}
                        </a>
                      ) : (
                        pub.authors
                      )}
                    </p>
                  )}
                  
                  {pub.bookTitle && (
                    <p className="text-sm text-secondary-text mb-3">
                      Book: <a href={pub.bookUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-primary-text hover:text-gold transition-colors">{pub.bookTitle}</a>
                    </p>
                  )}

                  {(pub.container || pub.publisher || pub.isbn || pub.indexing) && (
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-secondary-text mb-4">
                      {(pub.container || pub.publisher) && (
                        <span>Publisher: <span className="font-medium text-primary-text">{pub.publisher || pub.container}</span></span>
                      )}
                      
                      {pub.isbn && !(pub.publisher || pub.container)?.includes(pub.isbn) && (
                        <>
                          {(pub.container || pub.publisher) && <span className="text-border">•</span>}
                          <span>ISBN: <span className="font-medium text-primary-text">{pub.isbn}</span></span>
                        </>
                      )}
                      
                      {pub.indexing && !(pub.publisher || pub.container)?.includes(pub.indexing) && (
                        <>
                          {((pub.container || pub.publisher) || (pub.isbn && !(pub.publisher || pub.container)?.includes(pub.isbn))) && <span className="text-border">•</span>}
                          <span className="font-medium text-primary-text">{pub.indexing}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>                <div className="mt-auto">
                  {pub.url && (
                    <a 
                      href={pub.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-primary-text hover:text-gold transition-colors"
                    >
                      {pub.summary || (pub.type === 'Book Chapter' ? 'View Chapter' : 'View Publication')}
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
