import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ArrowRight } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import { usePortfolio } from '../../context/PortfolioContext';

export function Projects() {
  const profile = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // We can optionally sort or just rely on the context's ordering
  const projects = profile.projects;

  return (
    <section id="projects" className="py-16 bg-primary-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-text mb-4 uppercase tracking-widest">
            Projects
          </h2>
          <p className="text-secondary-text text-lg max-w-2xl mx-auto">
            Projects & Technical Work
          </p>
          <div className="w-12 h-1 bg-gold mx-auto mt-6" />
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md hover:border-gold/50 transition-all overflow-hidden flex flex-col h-full group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Card Image */}
                <div className="h-48 md:h-56 w-full relative overflow-hidden bg-secondary-bg">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-secondary-text text-sm">
                      No Image Provided
                    </div>
                  )}
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-gold text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm">
                      Featured
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold">
                      {project.category || 'Project'}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-border"></span>
                    <span className="text-[10px] font-semibold text-secondary-text uppercase tracking-wider">
                      {project.status || 'Completed'}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-primary-text mb-3 group-hover:text-gold transition-colors">
                    {project.name}
                  </h3>
                  
                  <p className="text-sm text-secondary-text leading-relaxed mb-4 flex-grow line-clamp-3">
                    {project.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {project.problem && (
                      <div>
                        <h4 className="text-[11px] font-bold uppercase text-primary-text mb-1">Problem</h4>
                        <p className="text-xs text-secondary-text line-clamp-2">{project.problem}</p>
                      </div>
                    )}
                    {project.solution && (
                      <div>
                        <h4 className="text-[11px] font-bold uppercase text-primary-text mb-1">Solution</h4>
                        <p className="text-xs text-secondary-text line-clamp-2">{project.solution}</p>
                      </div>
                    )}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies?.slice(0, 4).map((tech: string, idx: number) => (
                      <span key={idx} className="bg-secondary-bg text-secondary-text text-[10px] font-medium px-2 py-1 rounded border border-border">
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 4 && (
                      <span className="bg-secondary-bg text-secondary-text text-[10px] font-medium px-2 py-1 rounded border border-border">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                    <button 
                      className="text-xs font-semibold uppercase tracking-wider text-primary-text hover:text-gold transition-colors flex items-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                    >
                      View Details <ArrowRight size={14} />
                    </button>
                    
                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-secondary-text hover:text-gold transition-colors"
                          onClick={(e) => e.stopPropagation()}
                          title="GitHub Repository"
                        >
                          <FiGithub size={18} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-secondary-text hover:text-gold transition-colors"
                          onClick={(e) => e.stopPropagation()}
                          title="Live Demo"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-secondary-text py-12">
            No projects available to display.
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl relative flex flex-col border border-border overflow-hidden z-10 my-8"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto">
                {/* Modal Header Image */}
                {selectedProject.image && (
                  <div className="w-full h-64 md:h-80 relative bg-secondary-bg shrink-0">
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>
                )}

                <div className={`p-6 md:p-10 ${!selectedProject.image ? 'pt-10' : '-mt-16 relative z-10'}`}>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold bg-gold/10 px-2 py-1 rounded">
                      {selectedProject.category || 'Project'}
                    </span>
                    <span className="text-xs font-semibold text-secondary-text uppercase tracking-wider bg-secondary-bg px-2 py-1 rounded">
                      {selectedProject.status || 'Completed'}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-primary-text mb-6">
                    {selectedProject.name}
                  </h3>

                  <p className="text-lg text-secondary-text leading-relaxed mb-8 font-medium">
                    {selectedProject.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {selectedProject.problem && (
                      <div className="bg-primary-bg p-6 rounded-xl border border-border">
                        <h4 className="font-serif text-xl font-bold text-primary-text mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-400"></span>
                          The Problem
                        </h4>
                        <p className="text-sm text-secondary-text leading-relaxed whitespace-pre-wrap">
                          {selectedProject.problem}
                        </p>
                      </div>
                    )}
                    {selectedProject.solution && (
                      <div className="bg-primary-bg p-6 rounded-xl border border-border">
                        <h4 className="font-serif text-xl font-bold text-primary-text mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-400"></span>
                          The Solution
                        </h4>
                        <p className="text-sm text-secondary-text leading-relaxed whitespace-pre-wrap">
                          {selectedProject.solution}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mb-8">
                    <h4 className="font-serif text-lg font-bold text-primary-text mb-4">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies?.map((tech: string, idx: number) => (
                        <span key={idx} className="bg-secondary-bg text-secondary-text text-sm font-medium px-3 py-1.5 rounded-md border border-border">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-6 border-t border-border">
                    {selectedProject.githubUrl && (
                      <a 
                        href={selectedProject.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-secondary-bg hover:bg-card border border-border text-primary-text font-medium py-2.5 px-6 rounded-lg transition-colors"
                      >
                        <FiGithub size={18} />
                        View Source Code
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a 
                        href={selectedProject.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-medium py-2.5 px-6 rounded-lg transition-colors shadow-sm"
                      >
                        <ExternalLink size={18} />
                        Visit Live Project
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
