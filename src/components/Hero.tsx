import React from 'react';
import { Shield, ArrowRight, Activity, Cpu, Sparkles } from 'lucide-react';
import { DNAAnimation } from './DNAAnimation';

interface HeroProps {
  onGetStartedClick: () => void;
  onLearnMoreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStartedClick, onLearnMoreClick }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 font-sans select-none">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-teal-500/10 dark:bg-teal-500/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 md:space-y-8">
            
            {/* Promo Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-teal-500/10 dark:bg-teal-500/5 border border-teal-500/20 text-teal-700 dark:text-teal-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-teal-500" />
              <span>Next-Gen Genome Predictive Engine</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Genetic Disease Risk <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-teal-600 to-blue-600 dark:from-teal-400 dark:via-teal-400 dark:to-blue-400">
                Prediction System
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-650 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Upload genetic testing data and receive AI-powered insights into potential future health risks. Empower yourself with personalized prevention and clinical recommendations.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3.5 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onGetStartedClick}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-xl transition-all flex items-center justify-center space-x-2 group focus:outline-none"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={onLearnMoreClick}
                className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors focus:outline-none"
              >
                Learn More
              </button>
            </div>

            {/* Mini Trust Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start text-teal-600 dark:text-teal-400 mb-1">
                  <Activity className="w-4 h-4 mr-1.5" />
                  <span className="text-sm font-black text-slate-900 dark:text-white">99.8%</span>
                </div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Analysis Accuracy</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start text-blue-600 dark:text-blue-400 mb-1">
                  <Shield className="w-4 h-4 mr-1.5" />
                  <span className="text-sm font-black text-slate-900 dark:text-white">HIPAA</span>
                </div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Data Compliant</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start text-cyan-600 dark:text-cyan-400 mb-1">
                  <Cpu className="w-4 h-4 mr-1.5" />
                  <span className="text-sm font-black text-slate-900 dark:text-white">6+ Major</span>
                </div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Diseases Mapped</div>
              </div>
            </div>

          </div>

          {/* Right Visual DNA Animation Column */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            <DNAAnimation />
          </div>

        </div>
      </div>
    </section>
  );
};
