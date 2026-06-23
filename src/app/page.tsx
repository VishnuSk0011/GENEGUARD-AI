"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { UploadSection } from '../components/UploadSection';
import { PredictionDashboard } from '../components/PredictionDashboard';
import { SecuritySection } from '../components/SecuritySection';
import { AboutSection } from '../components/AboutSection';
import { ContactSection } from '../components/ContactSection';
import { ProfileView } from '../components/ProfileView';
import { AuthModal } from '../components/AuthModal';
import { Chatbot } from '../components/Chatbot';
import { PatientProfile } from '../utils/mockData';
import { ShieldCheck, Lock, Heart, Award } from 'lucide-react';

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [activeDNAProfile, setActiveDNAProfile] = useState<PatientProfile | null>(null);

  // [x] Launch Next.js local server and verify features
  // Initialize Theme and Session from localStorage on mount
  useEffect(() => {
    setMounted(true);
    // 1. Theme Configuration
    const savedTheme = localStorage.getItem('geneguard_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // 2. Auth Session
    const savedSession = localStorage.getItem('geneguard_user');
    if (savedSession) {
      try {
        setUser(JSON.parse(savedSession));
      } catch (err) {
        console.error("Error reading saved user session", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('geneguard_user');
    setUser(null);
    setActiveDNAProfile(null);
    setCurrentTab('home');
  };

  const handleAuthSuccess = (authenticatedUser: { email: string; name: string }) => {
    setUser(authenticatedUser);
  };

  const handleUploadSuccess = (profile: PatientProfile) => {
    setActiveDNAProfile(profile);
    
    // Save to historical reports list in localStorage
    const rawHistory = localStorage.getItem('geneguard_history');
    let historyList: PatientProfile[] = [];
    if (rawHistory) {
      try {
        historyList = JSON.parse(rawHistory);
      } catch (err) {
        console.error("Error parsing history records", err);
      }
    }

    // Avoid duplicating the exact same ID
    if (!historyList.some(h => h.id === profile.id)) {
      const updated = [profile, ...historyList].slice(0, 10); // cap at 10 items
      localStorage.setItem('geneguard_history', JSON.stringify(updated));
    }
    
    setCurrentTab('prediction');
  };

  const handleGetStarted = () => {
    setCurrentTab('prediction');
  };

  const handleLearnMore = () => {
    setCurrentTab('features');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300 font-sans">
      
      {/* Navigation Header */}
      <Navbar 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        user={user}
        onLogout={handleLogout}
        onLoginClick={() => setAuthModalOpen(true)}
      />

      {/* Main Body Layout */}
      <main className="flex-grow">
        
        {currentTab === 'home' && (
          <div className="animate-fade-in space-y-6">
            <Hero 
              onGetStartedClick={handleGetStarted}
              onLearnMoreClick={handleLearnMore}
            />
            <Features />
            <SecuritySection />
          </div>
        )}

        {currentTab === 'features' && (
          <div className="animate-fade-in pt-6">
            <Features />
            <SecuritySection />
          </div>
        )}

        {currentTab === 'prediction' && (
          <div className="animate-fade-in py-8">
            {activeDNAProfile ? (
              <PredictionDashboard 
                profile={activeDNAProfile}
                onClear={() => setActiveDNAProfile(null)}
              />
            ) : (
              <UploadSection onUploadSuccess={handleUploadSuccess} />
            )}
          </div>
        )}

        {currentTab === 'reports' && (
          <div className="animate-fade-in">
            <ProfileView 
              user={user} 
              onSelectProfile={(p) => setActiveDNAProfile(p)}
              onTabChange={setCurrentTab}
            />
          </div>
        )}

        {currentTab === 'about' && (
          <div className="animate-fade-in">
            <AboutSection />
            <SecuritySection />
          </div>
        )}

        {currentTab === 'contact' && (
          <div className="animate-fade-in">
            <ContactSection />
          </div>
        )}

      </main>

      {/* Medical Professional Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 font-sans select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
            
            {/* Logo and desc */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-2 text-white">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-blue-500">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <span className="text-base font-extrabold tracking-tight">GeneGuard AI</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Next-generation genomic risk modeling. Translating complex DNA sequence alignments into actionable clinical recommendations for future disease prevention.
              </p>
            </div>

            {/* Links Column 1 */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Product Features</h4>
              <ul className="space-y-1.5 text-xs">
                <li><button onClick={() => setCurrentTab('prediction')} className="hover:text-white transition-colors">Risk Assessment</button></li>
                <li><button onClick={() => setCurrentTab('features')} className="hover:text-white transition-colors">Interactive Analytics</button></li>
                <li><button onClick={() => setCurrentTab('about')} className="hover:text-white transition-colors">Scientific Ingestion</button></li>
                <li><button onClick={() => setCurrentTab('contact')} className="hover:text-white transition-colors">FAQ Support</button></li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Clinical Standards</h4>
              <div className="space-y-2 text-[10px]">
                <div className="flex items-center space-x-2">
                  <Lock className="w-3.5 h-3.5 text-teal-400" />
                  <span>HIPAA Secure Safe-Harbor Infrastructure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-3.5 h-3.5 text-teal-400" />
                  <span>Genomic Non-Discrimination Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-3.5 h-3.5 text-teal-400" />
                  <span>Patient-First Preventative Design</span>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-[10px] text-slate-500 space-y-3">
            <p>© {new Date().getFullYear()} GeneGuard AI. All rights reserved. Calculations are for research and educational purposes only.</p>
            <p className="max-w-3xl mx-auto italic leading-normal">
              Disclaimer: GeneGuard AI predictions are based on statistical association models and do not indicate a medical diagnosis. Users should seek advice from a doctor or genetic counselor before making any health decisions.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating AI Chat Assistant */}
      <Chatbot />

      {/* Authentication Gateway */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

    </div>
  );
}
