import React, { useState, useEffect, useRef } from 'react';
import { Mail, X } from 'lucide-react';
import { SiGmail, SiApple } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';

interface EmailModalProps {
  email: string;
  children: React.ReactNode;
  className?: string;
}

export function EmailModal({ email, children, className = '' }: EmailModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Handle clicking outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleGmail = () => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
    setIsOpen(false);
  };

  const handleAppleMail = () => {
    window.location.href = `mailto:${email}`;
    setIsOpen(false);
  };

  return (
    <>
      <div 
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }} 
        className={`cursor-pointer inline-block ${className}`}
      >
        {children}
      </div>

      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0B1221]/80 backdrop-blur-sm"
            onClick={handleBackdropClick}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              ref={modalRef}
              className="w-full max-w-[300px] bg-[#0F172A] p-6 rounded-2xl border border-gold/20 shadow-2xl flex flex-col relative"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gold transition-colors p-1"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center mb-5 mt-1">
                <div className="w-10 h-10 bg-[#0B1221] border border-gold/30 rounded-xl flex items-center justify-center mb-3 text-gold shadow-sm">
                  <Mail size={20} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg font-bold text-white tracking-wide text-center">Contact Me</h3>
                <p className="text-gray-400 text-xs text-center mt-1">
                  Choose your email client
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleGmail}
                  className="flex items-center justify-center gap-3 w-full bg-[#0B1221] border border-gray-700 hover:border-gold hover:text-gold text-gray-200 py-3 px-4 rounded-xl transition-all duration-300 group"
                >
                  <SiGmail className="text-gray-400 group-hover:text-gold transition-colors" size={18} />
                  <span className="font-medium text-sm">Gmail</span>
                </button>
                <button
                  onClick={handleAppleMail}
                  className="flex items-center justify-center gap-3 w-full bg-[#0B1221] border border-gray-700 hover:border-gold hover:text-gold text-gray-200 py-3 px-4 rounded-xl transition-all duration-300 group"
                >
                  <SiApple className="text-gray-400 group-hover:text-gold transition-colors" size={18} />
                  <span className="font-medium text-sm">Apple Mail</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
