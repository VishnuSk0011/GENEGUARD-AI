import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldAlert, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: { email: string; name: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate successful auth
      const userName = isLogin 
        ? (email === 'doctor@geneguard.ai' ? 'Dr. Charles Vance' : 'Marcus Vance') 
        : name;

      const userSession = { email, name: userName };
      
      // Persist in localStorage
      localStorage.setItem('geneguard_user', JSON.stringify(userSession));
      onAuthSuccess(userSession);
      onClose();
    }, 1000);
  };

  const handleDemoFill = (type: 'doctor' | 'patient') => {
    if (type === 'doctor') {
      setEmail('doctor@geneguard.ai');
      setPassword('password123');
      setIsLogin(true);
    } else {
      setEmail('marcus.vance@gmail.com');
      setPassword('password123');
      setIsLogin(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-sans">
      {/* Overlay Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-md mx-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform scale-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="px-6 pt-8 pb-4 text-center">
          <div className="inline-flex p-3 bg-gradient-to-br from-teal-500/10 to-blue-500/10 dark:from-teal-500/5 dark:to-blue-500/5 rounded-2xl border border-teal-500/20 mb-3">
            <Lock className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isLogin ? 'Welcome Back to GeneGuard AI' : 'Create Your Genetic Portal'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isLogin 
              ? 'Access your clinical dashboard and genome analytics reports.' 
              : 'Sign up to secure your genomic sequence records and history.'}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          
          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-xs text-red-600 dark:text-red-400">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Name Field (Signup only) */}
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 focus:border-teal-500 dark:focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="doctor@geneguard.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 focus:border-teal-500 dark:focus:border-teal-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 focus:border-teal-500 dark:focus:border-teal-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 disabled:from-slate-300 disabled:to-slate-450 dark:disabled:from-slate-800 dark:disabled:to-slate-800 disabled:text-slate-400 text-white font-medium text-xs rounded-xl shadow-lg shadow-teal-500/10 hover:shadow-xl transition-all flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <span>{isLogin ? 'Access Dashboard' : 'Complete Registration'}</span>
            )}
          </button>

          {/* Tab Switcher */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors underline font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>

          {/* Quick Demo Preloads */}
          {isLogin && (
            <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center mb-2">
                <Sparkles className="w-3 h-3 text-yellow-500 mr-1 animate-pulse" /> Developer Demo Auto-Fill
              </span>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => handleDemoFill('doctor')}
                  className="flex-1 text-[10px] py-1.5 px-2 bg-slate-100 dark:bg-slate-850 hover:bg-teal-50 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-800 text-slate-600 dark:text-slate-350 rounded-lg transition-colors font-medium"
                >
                  Doctor Account
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoFill('patient')}
                  className="flex-1 text-[10px] py-1.5 px-2 bg-slate-100 dark:bg-slate-850 hover:bg-teal-50 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-800 text-slate-600 dark:text-slate-350 rounded-lg transition-colors font-medium"
                >
                  Patient Account
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
