import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server, FileLock2, KeyRound } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const securityItems = [
    {
      title: "HIPAA Compliance Standard",
      description: "Our platform adheres strictly to Health Insurance Portability and Accountability Act (HIPAA) rules, ensuring patient health records remain confidential.",
      icon: ShieldCheck
    },
    {
      title: "Local Sandboxed Parsing",
      description: "All file reading, genome mapping, and ML predictions happen inside your browser memory cache. Your raw DNA is never uploaded to any server.",
      icon: EyeOff
    },
    {
      title: "End-to-End Encryption",
      description: "Session data outputs and state transitions use active SSL/TLS pathways with advanced AES-256 local storage encryption keys.",
      icon: Lock
    },
    {
      title: "Zero-Knowledge Storage",
      description: "We do not host long-term genetic database tables on central servers. Once your active session ends, decrypted data is purged from memory.",
      icon: Server
    },
    {
      title: "Protected Health Reports",
      description: "PDF report generations occur dynamically on the client side, preventing data exposure during transfer or transmission processes.",
      icon: FileLock2
    },
    {
      title: "Granular User Permissions",
      description: "Authorized patient portal structures allow access only via cryptographically authenticated accounts, protecting your history log.",
      icon: KeyRound
    }
  ];

  return (
    <section id="security-section" className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 border-t border-slate-200/50 dark:border-slate-800/50 font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex p-2.5 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-3 animate-pulse">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl tracking-tight">
            Protected Health Information Standards
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
            HIPAA-compliant, client-side sandboxed genomics
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto rounded-full mt-2"></div>
        </div>

        {/* Security Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center space-x-3.5 mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 text-emerald-500">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-655 dark:text-slate-400 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Seal Banner */}
        <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-900/30 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 text-center sm:text-left">
            <Lock className="w-8 h-8 text-teal-500 hidden sm:block" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Privacy and Non-Disclosure Commitment</h4>
              <p className="text-[10px] text-slate-550 dark:text-slate-400 mt-1 max-w-xl">
                GeneGuard AI is committed to genetic non-discrimination. We do not transmit or sell genetic information to insurance companies, marketing firms, or research groups.
              </p>
            </div>
          </div>
          <div className="flex space-x-3 flex-shrink-0">
            <span className="px-3.5 py-1.5 rounded-lg border border-slate-205 dark:border-slate-800 text-[9px] font-bold text-slate-600 dark:text-slate-350 uppercase bg-white dark:bg-slate-900">
              HIPAA SECURE
            </span>
            <span className="px-3.5 py-1.5 rounded-lg border border-slate-205 dark:border-slate-800 text-[9px] font-bold text-slate-600 dark:text-slate-350 uppercase bg-white dark:bg-slate-900">
              AES-256 ENCRYPTED
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
