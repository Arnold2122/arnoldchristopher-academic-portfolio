import React, { useState, useEffect, useRef } from 'react';
import { supabase, hasSupabaseConfig } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { X, Eye, EyeOff, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPassword('');
      setError(null);
      setMessage(null);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle clicking outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!hasSupabaseConfig) {
      setError('Supabase is not configured. Please check your .env file.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      onClose();
      navigate('/admin/dashboard');
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email address first to reset your password.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!hasSupabaseConfig) {
      setError('Supabase is not configured. Please check your .env file.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/dashboard`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Password reset instructions have been sent to your email.');
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            ref={modalRef}
            className="w-full max-w-[440px] bg-card p-8 rounded-2xl border border-border shadow-2xl flex flex-col relative"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-secondary-text hover:text-gold transition-colors p-1"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center mb-6 mt-2">
              <div className="w-12 h-12 bg-primary-bg border border-border rounded-2xl flex items-center justify-center mb-4 text-gold shadow-sm">
                <GraduationCap size={24} strokeWidth={1.5} />
              </div>
              <h2 className="font-serif text-2xl font-bold text-primary-text tracking-wide text-center">Admin CMS Login</h2>
              <div className="w-10 h-px bg-gold/50 mt-3 mb-3" />
              <p className="text-secondary-text text-sm text-center">
                Sign in to manage your portfolio content.
              </p>
            </div>

            {/* Messages */}
            {error && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
            {message && (
              <div className="mb-5 bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-sm text-center">
                {message}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-text mb-1.5 tracking-wide">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-primary-bg border border-border rounded-lg px-4 py-3 text-primary-text text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors placeholder:text-gray-400"
                  placeholder="admin@example.com"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-medium text-primary-text tracking-wide">Password</label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-primary-bg border border-border rounded-lg px-4 py-3 text-primary-text text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors placeholder:text-gray-400 pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-text hover:text-gold transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="flex justify-end mt-1.5">
                  <button 
                    type="button" 
                    onClick={handleResetPassword}
                    className="text-xs text-secondary-text hover:text-gold transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold hover:bg-gold-dark text-white shadow-sm font-semibold tracking-wide py-3 px-4 rounded-lg transition-colors flex items-center justify-center mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
