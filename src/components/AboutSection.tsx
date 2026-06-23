import React from 'react';
import { HelpCircle, BookOpen, AlertTriangle, ShieldCheck, Fingerprint, Layers, Cpu } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const steps = [
    {
      title: "1. DNA Data Ingestion",
      description: "We read raw genomic text formats (SNP lists). The files list specific positions on chromosomes and corresponding genetic alleles.",
      icon: Fingerprint
    },
    {
      title: "2. Allele Reference Mapping",
      description: "Our system aligns your genotypes against large clinical reference indexes containing published associations between variants and diseases.",
      icon: Layers
    },
    {
      title: "3. Polygenic Scoring (ML)",
      description: "We sum up the statistical impact weights of multiple risk alleles to compute an integrated genetic risk probability percentage.",
      icon: Cpu
    },
    {
      title: "4. Preventive Translation",
      description: "Based on final risk intensities, the engine compiles clinical guidelines and lifestyle recommendations to support cardiovascular, metabolic, or neurological health.",
      icon: ShieldCheck
    }
  ];

  return (
    <section id="about-section" className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-800/50 font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex p-2.5 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-600 dark:text-blue-400 mb-3">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl tracking-tight">
            How Genetic Risk Analysis Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
            Scientific foundation of the GeneGuard AI engine
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-teal-500 mx-auto rounded-full mt-2"></div>
        </div>

        {/* Workflow Timeline / Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="relative bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 rounded-2xl p-6 shadow-sm"
              >
                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-xl text-teal-500 w-11 h-11 flex items-center justify-center mb-4 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-[11px] text-slate-655 dark:text-slate-400 leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Explanation text / Science */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-850 dark:text-white flex items-center">
              <HelpCircle className="w-5 h-5 text-teal-500 mr-2" /> Understanding Genetic Predisposition
            </h3>
            <p className="text-xs text-slate-655 dark:text-slate-400 leading-relaxed font-medium">
              Genes are not destiny. Having a high genetic risk score for a condition like Type 2 Diabetes or Heart Disease simply means that your hereditary variants align with patterns seen more frequently in affected cohorts in clinical research. 
            </p>
            <p className="text-xs text-slate-655 dark:text-slate-400 leading-relaxed font-medium">
              Environmental factors—including physical fitness, nutrition, stress indices, sleep hygeine, and toxic exposures—play a major role in whether those genetic switches are turned on or off (epigenetics). Knowing your profile allows you to tailor your lifestyle habits to reduce overall disease susceptibility.
            </p>
          </div>

          {/* Legal Disclaimer Box */}
          <div className="lg:col-span-4 p-5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-3xl space-y-3">
            <div className="flex items-center space-x-2 text-red-650 dark:text-red-400">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <h4 className="text-xs font-extrabold uppercase tracking-wider">Clinical Disclaimer</h4>
            </div>
            <p className="text-[10px] text-red-750 dark:text-red-350 leading-relaxed font-semibold">
              Predictions are for educational and research purposes only and should not replace professional medical advice, clinical diagnosis, or therapeutic regimens.
            </p>
            <p className="text-[9px] text-red-700 dark:text-red-400 leading-relaxed font-medium">
              Do not modify medication, diet, or treatment protocols based solely on these results. Always discuss genomic data with a qualified physician or certified genetic counselor.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
