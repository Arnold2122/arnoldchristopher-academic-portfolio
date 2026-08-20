import { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { usePortfolio } from '../../context/PortfolioContext';
import { EmailModal } from '../ui/EmailModal';

export function Contact() {
  const profile = usePortfolio();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Placeholder for actual form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-16 bg-primary-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-text mb-4 uppercase tracking-widest">
            Contact
          </h2>
          <p className="text-secondary-text text-lg max-w-2xl mx-auto">
            Let's Connect
          </p>
          <div className="w-12 h-1 bg-gold mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 max-w-5xl mx-auto">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="font-serif text-2xl font-bold text-primary-text mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <ContactItem 
                icon={<Mail size={24} />} 
                label="Email" 
                value={profile.email} 
                isEmail={true}
              />
              <ContactItem 
                icon={<MapPin size={24} />} 
                label="Location" 
                value={profile.location} 
              />
              <ContactItem 
                icon={<FiLinkedin size={24} />} 
                label="LinkedIn" 
                value="linkedin.com/in/..." 
                href={profile.profiles.linkedin.url} 
              />
              <ContactItem 
                icon={<FiGithub size={24} />} 
                label="GitHub" 
                value="github.com/..." 
                href={profile.profiles.github.url} 
              />
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-7">
            <div className="bg-card p-8 md:p-10 rounded-2xl border border-border shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-primary-text mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-secondary-text">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full bg-secondary-bg border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-secondary-text">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full bg-secondary-bg border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-secondary-text">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full bg-secondary-bg border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                    placeholder="Topic of conversation"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-secondary-text">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full bg-secondary-bg border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-none"
                    placeholder="Hello..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-text text-primary-bg font-medium py-4 rounded-lg hover:bg-gold hover:text-white transition-colors disabled:opacity-70 flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : isSuccess ? (
                    <span>Message Sent!</span>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, label, value, href, isEmail }: { icon: React.ReactNode, label: string, value: string, href?: string, isEmail?: boolean }) {
  const content = (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:border-gold/50 transition-colors w-full">
      <div className="text-gold mt-1">
        {icon}
      </div>
      <div className="text-left">
        <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-text mb-1">{label}</h4>
        <p className="text-sm font-medium text-primary-text break-all">{value}</p>
      </div>
    </div>
  );

  if (isEmail) {
    return (
      <EmailModal email={value} className="block w-full">
        {content}
      </EmailModal>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block w-full">
        {content}
      </a>
    );
  }
  return content;
}
