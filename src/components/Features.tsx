import React from 'react';
import { Dna, ShieldCheck, Heart, FileText, Cpu, EyeOff, LucideIcon } from 'lucide-react';

interface FeatureCard {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export const Features: React.FC = () => {
  const list: FeatureCard[] = [
    {
      title: "Genetic Data Analysis",
      description: "Advanced scanning of raw SNP (Single Nucleotide Polymorphism) sequences. Supports 23andMe, AncestryDNA, and custom TSV/CSV formats.",
      icon: Dna,
      color: "from-teal-500 to-teal-600 shadow-teal-500/10"
    },
    {
      title: "Disease Risk Assessment",
      description: "Maps polygenic and monogenic variations against global clinical databases to calculate predictive disease risk values.",
      icon: Heart,
      color: "from-red-500 to-red-650 shadow-red-500/10"
    },
    {
      title: "Personalized Health Insights",
      description: "Tailored lifestyle recommendations, vitamin guidelines, and physical checkup plans mapped to offset specific genetic risk indicators.",
      icon: ShieldCheck,
      color: "from-blue-500 to-blue-600 shadow-blue-500/10"
    },
    {
      title: "Interactive Reports",
      description: "Dynamic visual dashboards featuring filtering options, marker category breakdowns, and clinical lab-grade data representations.",
      icon: FileText,
      color: "from-cyan-500 to-cyan-600 shadow-cyan-500/10"
    },
    {
      title: "AI-Powered Prediction",
      description: "Employs machine learning algorithms trained on large-scale genomic association studies (GWAS) to weigh polygenic risk scores.",
      icon: Cpu,
      color: "from-purple-500 to-purple-600 shadow-purple-500/10"
    },
    {
      title: "Data Privacy & Security",
      description: "Enforces strict HIPAA compliance. All file parsing occurs locally in your browser memory; your raw genetic code is never saved.",
      icon: EyeOff,
      color: "from-slate-600 to-slate-700 shadow-slate-650/10"
    }
  ];

  return (
    <section id="features-section" className="py-16 bg-white/40 dark:bg-slate-900/40 border-y border-slate-200/50 dark:border-slate-800/50 font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl tracking-tight">
            GeneGuard AI Platform Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
            Clinical-grade computational genetics at your fingertips
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full mt-2"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Block */}
                  <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-5 shadow-lg group-hover:scale-108 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-xs text-slate-650 dark:text-slate-400 leading-relaxed font-medium mt-2">
                    {feature.description}
                  </p>
                </div>

                {/* Subtle bottom line transition */}
                <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full transition-all duration-500 mt-6"></div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
