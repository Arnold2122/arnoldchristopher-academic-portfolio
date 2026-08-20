import { motion } from 'framer-motion';
import { BookOpen, FlaskConical, Code } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export function Research() {
  const profile = usePortfolio();
  return (
    <section id="research" className="py-16 bg-secondary-bg">
      <div className="max-w-7xl mx-auto px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-text mb-4 uppercase tracking-widest">
            Research
          </h2>
          <p className="text-secondary-text text-lg max-w-2xl mx-auto">
            Research & Areas of Interest
          </p>
          <div className="w-12 h-1 bg-gold mx-auto mt-6" />
        </div>

        {/* Metrics Row */}
        <div className="flex justify-center gap-8 md:gap-16 mb-16 border-b border-border pb-12">
          <MetricItem value={profile.metrics.publications} label="Published Contributions" icon={<BookOpen size={24} className="text-gold mb-2" />} />
          <MetricItem value={profile.metrics.bookChapters} label="Book Chapters" icon={<FlaskConical size={24} className="text-gold mb-2" />} />
          <MetricItem value={profile.metrics.projects} label="Research Projects" icon={<Code size={24} className="text-gold mb-2" />} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.researchAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-8 rounded-xl border border-border shadow-sm hover:border-gold/50 transition-colors"
            >
              <h3 className="font-serif text-xl font-bold text-primary-text mb-3">{area.title}</h3>
              <p className="text-sm text-secondary-text leading-relaxed">
                {area.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricItem({ value, label, icon }: { value: string, label: string, icon: React.ReactNode }) {
  if (value === "0" || !value) return null; // Logic to hide if no real metrics later
  return (
    <div className="flex flex-col items-center text-center">
      {icon}
      <span className="text-3xl font-serif font-bold text-primary-text mb-1">{value}</span>
      <span className="text-xs uppercase tracking-wider text-secondary-text font-semibold">{label}</span>
    </div>
  );
}
