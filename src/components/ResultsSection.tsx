import React from 'react';
import { ShieldCheck, Heart, Brain, Activity, Sparkles, AlertTriangle, CheckCircle, Download } from 'lucide-react';
import { PatientProfile, DiseasePrediction } from '../utils/mockData';
import { exportReportToPDF } from '../utils/pdfExporter';

interface ResultsSectionProps {
  profile: PatientProfile;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ profile }) => {
  
  const getRiskIcon = (category: string) => {
    switch (category) {
      case 'Cardiovascular':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'Neurological':
        return <Brain className="w-5 h-5 text-purple-500" />;
      case 'Metabolic':
        return <Activity className="w-5 h-5 text-amber-500" />;
      case 'Oncology':
        return <Sparkles className="w-5 h-5 text-indigo-500" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-teal-500" />;
    }
  };

  const getRiskBadgeColor = (level: 'Low' | 'Moderate' | 'High') => {
    switch (level) {
      case 'High':
        return 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-650 dark:text-red-400';
      case 'Moderate':
        return 'bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 text-orange-650 dark:text-orange-400';
      default:
        return 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-905/55 text-green-650 dark:text-green-400';
    }
  };

  // Compile all recommendations from High & Moderate predictions
  const compileRecommendations = (preds: DiseasePrediction[]) => {
    const list: { disease: string; rec: string }[] = [];
    preds.forEach(p => {
      if (p.riskLevel === 'High' || p.riskLevel === 'Moderate') {
        p.recommendations.forEach(r => {
          list.push({ disease: p.name, rec: r });
        });
      }
    });

    if (list.length === 0) {
      preds.forEach(p => {
        p.recommendations.forEach(r => {
          list.push({ disease: p.name, rec: r });
        });
      });
    }

    return list.slice(0, 6); // Top 6 recommendations
  };

  const recommendations = compileRecommendations(profile.predictions);

  return (
    <div className="space-y-10 font-sans select-none">
      
      {/* Risk Cards Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Disease Prediction Likelihoods</h3>
            <p className="text-[10px] text-slate-500">Individual disease likelihoods mapped to genetic markers</p>
          </div>
          
          <button
            onClick={() => exportReportToPDF(profile)}
            className="flex items-center space-x-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 rounded-xl shadow-md transition-all focus:outline-none"
          >
            <Download className="w-4 h-4" />
            <span>Download Report (PDF)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.predictions.map((pred) => (
            <div 
              key={pred.id} 
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-850">
                    {getRiskIcon(pred.category)}
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${getRiskBadgeColor(pred.riskLevel)}`}>
                    {pred.riskLevel}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{pred.name}</h4>
                  <p className="text-[11px] text-slate-555 dark:text-slate-400 leading-relaxed min-h-[50px]">
                    {pred.description}
                  </p>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-350">
                  <span>Probability</span>
                  <span>{pred.probability}%</span>
                </div>
                
                {/* Micro Progress Bar */}
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      pred.riskLevel === 'High' 
                        ? 'bg-red-500' 
                        : pred.riskLevel === 'Moderate' 
                        ? 'bg-orange-500' 
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${pred.probability}%` }}
                  ></div>
                </div>

                <div className="text-[9px] text-slate-450 truncate">
                  Markers: {pred.contributingMarkers.length > 0 ? pred.contributingMarkers.join(', ') : 'None detected'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations & Guidelines Section */}
      <div className="p-6 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 rounded-3xl">
        <div className="flex items-center space-x-2 text-slate-900 dark:text-white mb-6">
          <AlertTriangle className="w-5 h-5 text-teal-500" />
          <div>
            <h3 className="text-sm font-bold">Personalized Preventive Guidelines</h3>
            <p className="text-[10px] text-slate-500">Action items constructed to offset inherited risk profiles</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-xl p-4 flex items-start space-x-3.5 shadow-sm"
            >
              <div className="p-1 rounded-full bg-teal-500/10 dark:bg-teal-500/5 text-teal-600 dark:text-teal-400 mt-0.5">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider block">
                  {item.disease} mitigation
                </span>
                <p className="text-[11px] text-slate-655 dark:text-slate-350 leading-relaxed font-medium">
                  {item.rec}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
