import { motion } from 'framer-motion';
import { Mail, GraduationCap, Quote, BookOpen, Code2 } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { usePortfolio } from '../../context/PortfolioContext';
import heroImg from '../../assets/profile-photo.png';
import { EmailModal } from '../ui/EmailModal';

export function Hero() {
  const profile = usePortfolio();
  return (
    <section id="about" className="pt-14 pb-16 bg-primary-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        
        {/* Centered Page Title */}
        <div className="text-center mb-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-text mb-4 uppercase tracking-widest">
            About Me
          </h2>
          <p className="text-secondary-text text-lg max-w-2xl mx-auto">
            Academic Profile & Vision
          </p>
          <div className="w-12 h-1 bg-gold mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        {/* Left Column - Photo & Brief */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-4 flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <div className="relative w-64 h-80 md:w-72 md:h-96 mb-8 lg:mb-0 group mx-auto lg:ml-8 lg:mr-0 touch-manipulation">
            {/* Outer Premium Gradient Glow */}
            <div className="absolute -inset-3 bg-gradient-to-br from-gold/50 via-transparent to-blue-900/30 rounded-2xl blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:from-gold/70 group-hover:to-blue-900/50 group-hover:blur-2xl group-active:from-gold/70 group-active:to-blue-900/50 group-active:blur-2xl motion-reduce:transition-none"></div>
            
            {/* Image Container with Refined Border and Soft Shadow */}
            <div 
              className="relative w-full h-full z-10 rounded-2xl shadow-lg overflow-hidden flex flex-col justify-end items-center pb-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-[0_8px_30px_rgba(201,160,78,0.15)] group-active:shadow-[0_8px_30px_rgba(201,160,78,0.15)] motion-reduce:transition-none"
              style={{ border: '1px solid rgba(201, 160, 78, 0.35)' }}
            >
              <img 
                src={heroImg} 
                alt="Profile Photo"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-active:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-active:scale-100"
              />
              
              {/* Name Overlay Container */}
              <div className="relative z-20">
                {/* Name Label Glow */}
                <div className="absolute -inset-1 bg-gradient-to-br from-gold/60 to-blue-900/50 rounded-full blur-md opacity-100"></div>
                {/* Name Label Pill */}
                <div className="relative px-4 py-1.5 bg-[#0B1221]/90 backdrop-blur-md rounded-full border border-white/10 text-[#F8F9FA] text-[11px] font-medium tracking-wider whitespace-nowrap shadow-lg">
                  Mr. A. Arnold Christopher
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Info Cards & Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-8 flex flex-col justify-start pt-1"
        >
          <div className="mb-6">
            <h3 className="font-serif text-2xl font-bold text-primary-text">
              {profile.name}
            </h3>
          </div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <InfoCard label="Designation" value={profile.designation} />
            <InfoCard label="Department" value={profile.department} />
            <InfoCard 
              label="Institution" 
              value={
                <a href={profile.institutionWebsite} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors underline-offset-4 hover:underline">
                  {profile.institution}
                </a>
              } 
            />
            <InfoCard label="Location" value={profile.aboutLocation} />
            <InfoCard 
              label="Degree" 
              value={
                <>
                  <span className="block mb-1">{profile.degree}</span>
                  <span className="text-xs font-bold tracking-widest text-gold uppercase">Pursuing</span>
                </>
              } 
            />
            <InfoCard label="CGPA" value={profile.cgpa} />
          </div>

          {/* Social Links Row */}
          <div className="flex flex-wrap items-center gap-4">
            <SocialLink href={profile.profiles.linkedin.url} icon={<FiLinkedin size={20} />} label="LinkedIn" />
            <SocialLink href={profile.profiles.googleScholar.url} icon={<GraduationCap size={20} />} label="Google Scholar" />
            <SocialLink href={profile.profiles.github.url} icon={<FiGithub size={20} />} label="GitHub" />
            <EmailModal email={profile.email}>
              <SocialLink isEmail={true} icon={<Mail size={20} />} label="Email" />
            </EmailModal>
          </div>
        </motion.div>

        </div>

        {/* ------------------------------------------------ */}
        {/* QUOTE SECTION */}
        {/* ------------------------------------------------ */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full text-center py-12 px-6 rounded-2xl bg-primary-bg border border-gold/30 mt-16 mb-16 relative"
        >
          <Quote className="absolute top-6 left-1/2 -translate-x-1/2 text-gold/20 w-12 h-12" />
          <h3 className="font-serif italic text-2xl md:text-3xl text-primary-text leading-relaxed max-w-4xl mx-auto mt-6 mb-8 relative z-10">
            “Build with curiosity. Research with purpose. Create what moves the future forward.”
          </h3>
          <p className="text-sm font-bold uppercase tracking-widest text-secondary-text">
            — ARNOLD CHRISTOPHER A
          </p>
        </motion.div>

        {/* ------------------------------------------------ */}
        {/* ACADEMIC PROFILE SECTION */}
        {/* ------------------------------------------------ */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card border border-gold/20 rounded-2xl p-6 md:p-8 shadow-sm mb-12"
        >
          <div className="flex items-center gap-3 mb-5 border-b border-border pb-4">
            <div className="p-2.5 bg-secondary-bg rounded-xl text-gold">
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-primary-text">
                Academic Profile
              </h3>
              <p className="text-gold font-medium text-sm mt-0.5">
                CSE (Artificial Intelligence & Machine Learning)
              </p>
            </div>
          </div>
          
          <div className="space-y-5 max-w-4xl mx-auto">
            <p className="text-base text-secondary-text leading-relaxed">
              I am a Bachelor of Engineering (B.E.) student in Computer Science and Engineering with a specialisation in Artificial Intelligence and Machine Learning at KalaignarKarunanidhi Institute of Technology (KIT), Coimbatore. I am interested in Artificial Intelligence, Machine Learning, Generative AI, software development and emerging technologies, with a strong focus on building practical technology-driven solutions.
            </p>
            
            <div>
              <h4 className="font-serif text-lg font-bold text-primary-text mb-2">Academic Journey</h4>
              <div className="text-sm text-secondary-text leading-relaxed space-y-2">
                <p>
                  My academic journey began with my schooling at Carmel Garden Matriculation Higher Secondary School, Coimbatore, where I completed SSLC in 2023 with 84.4% and HSC in 2025 with 83.3%, specialising in Computer Science with Mathematics.
                </p>
                <p>
                  I am currently pursuing a Bachelor of Engineering (B.E.) in Computer Science and Engineering with Specialisation in Artificial Intelligence and Machine Learning at KalaignarKarunanidhi Institute of Technology (KIT), Coimbatore, from 2025 to 2029.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        {/* ------------------------------------------------ */}

        {/* ------------------------------------------------ */}
        {/* AREAS OF TECHNICAL EXPERTISE SECTION */}
        {/* ------------------------------------------------ */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-card border border-gold/20 rounded-2xl p-6 md:p-8 shadow-sm mb-0"
        >
          <div className="flex items-center gap-3 mb-5 border-b border-border pb-4">
            <div className="p-2.5 bg-secondary-bg rounded-xl text-gold">
              <Code2 size={24} />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-primary-text">
                Areas of Technical Expertise
              </h3>
              <p className="text-gold font-medium text-sm mt-0.5">
                Hands-On Technical Skills & Core Stacks
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Card 1 */}
            <div className="bg-primary-bg rounded-xl p-4 md:p-5 border border-border">
              <h4 className="font-serif text-base font-bold text-primary-text mb-3 border-b border-border pb-2">Programming & Development</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-secondary-text text-xs font-medium"><div className="w-1.5 h-1.5 rounded-full bg-gold"></div> Python</li>
                <li className="flex items-center gap-2 text-secondary-text text-xs font-medium"><div className="w-1.5 h-1.5 rounded-full bg-gold"></div> Java</li>
                <li className="flex items-center gap-2 text-secondary-text text-xs font-medium"><div className="w-1.5 h-1.5 rounded-full bg-gold"></div> C</li>
                <li className="flex items-center gap-2 text-secondary-text text-xs font-medium"><div className="w-1.5 h-1.5 rounded-full bg-gold"></div> HTML & CSS</li>
                <li className="flex items-center gap-2 text-secondary-text text-xs font-medium"><div className="w-1.5 h-1.5 rounded-full bg-gold"></div> SQL / MySQL</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-primary-bg rounded-xl p-4 md:p-5 border border-border">
              <h4 className="font-serif text-base font-bold text-primary-text mb-3 border-b border-border pb-2">Artificial Intelligence</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-secondary-text text-xs font-medium"><div className="w-1.5 h-1.5 rounded-full bg-gold"></div> Machine Learning</li>
                <li className="flex items-center gap-2 text-secondary-text text-xs font-medium"><div className="w-1.5 h-1.5 rounded-full bg-gold"></div> Deep Learning</li>
                <li className="flex items-center gap-2 text-secondary-text text-xs font-medium"><div className="w-1.5 h-1.5 rounded-full bg-gold"></div> Explainable AI</li>
                <li className="flex items-center gap-2 text-secondary-text text-xs font-medium"><div className="w-1.5 h-1.5 rounded-full bg-gold"></div> Computer Vision</li>
                <li className="flex items-center gap-2 text-secondary-text text-xs font-medium"><div className="w-1.5 h-1.5 rounded-full bg-gold"></div> Data Science</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-primary-bg rounded-xl p-4 md:p-5 border border-border">
              <h4 className="font-serif text-base font-bold text-primary-text mb-3 border-b border-border pb-2">Research & Emerging Tech</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-secondary-text text-xs font-medium"><div className="w-1.5 h-1.5 rounded-full bg-gold"></div> IoT</li>
                <li className="flex items-center gap-2 text-secondary-text text-xs font-medium"><div className="w-1.5 h-1.5 rounded-full bg-gold"></div> Big Data</li>
                <li className="flex items-center gap-2 text-secondary-text text-xs font-medium"><div className="w-1.5 h-1.5 rounded-full bg-gold"></div> Intelligent Systems</li>
                <li className="flex items-center gap-2 text-secondary-text text-xs font-medium"><div className="w-1.5 h-1.5 rounded-full bg-gold"></div> Cybersecurity</li>
                <li className="flex items-center gap-2 text-secondary-text text-xs font-medium"><div className="w-1.5 h-1.5 rounded-full bg-gold"></div> Neuromorphic Computing</li>
                <li className="flex items-center gap-2 text-secondary-text text-xs font-medium"><div className="w-1.5 h-1.5 rounded-full bg-gold"></div> Sustainable AI</li>
              </ul>
            </div>
          </div>
        </motion.div>
        {/* ------------------------------------------------ */}

      </div>
    </section>
  );
}

function InfoCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-card p-5 rounded-lg border border-border shadow-sm hover:border-gold/30 transition-colors">
      <h3 className="text-[10px] font-bold tracking-wider text-gold uppercase mb-1">{label}</h3>
      <div className="text-primary-text font-medium text-sm">{value}</div>
    </div>
  );
}

function SocialLink({ href, icon, label, isEmail }: { href?: string; icon: React.ReactNode; label: string, isEmail?: boolean }) {
  const className = "flex items-center space-x-2 px-4 py-2 rounded-full border border-border bg-card text-secondary-text hover:text-gold hover:border-gold transition-all duration-300 text-sm font-medium shadow-sm";
  
  if (isEmail) {
    return (
      <button className={className}>
        {icon}
        <span>{label}</span>
      </button>
    );
  }

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={className}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
