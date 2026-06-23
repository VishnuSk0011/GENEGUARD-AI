import React, { useState } from 'react';
import { User, Clipboard, BarChart3, ArrowLeft, Heart, Layers, Download } from 'lucide-react';
import { PatientProfile } from '../utils/mockData';
import { ResultsSection } from './ResultsSection';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { exportReportToPDF } from '../utils/pdfExporter';

interface PredictionDashboardProps {
  profile: PatientProfile;
  onClear: () => void;
}

export const PredictionDashboard: React.FC<PredictionDashboardProps> = ({ profile, onClear }) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'results' | 'analytics'>('overview');

  const getImpactBadge = (impact: 'High' | 'Moderate' | 'Low' | 'Protective') => {
    switch (impact) {
      case 'High':
        return 'bg-red-500/10 text-red-500 border border-red-500/20';
      case 'Moderate':
        return 'bg-orange-500/10 text-orange-500 border border-orange-500/20';
      case 'Protective':
        return 'bg-green-500/10 text-green-500 border border-green-500/20';
      default:
        return 'bg-blue-500/10 text-blue-500 border border-blue-500/20';
    }
  };

  // Draw customized SVG gauge for overall genetic risk index
  const getGaugeColor = (level: string) => {
    if (level === 'High') return '#ef4444'; // red
    if (level === 'Moderate') return '#f97316'; // orange
    return '#10b981'; // green
  };

  const scoreColor = getGaugeColor(profile.overallRiskLevel);
  // Semi-circle path calculation (radius 50, center 60,60)
  // Circumference of semi-circle = pi * r = 3.14159 * 50 = 157
  const strokeDashoffset = 157 - (profile.overallScore / 100) * 157;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5 mb-8 gap-4 select-none">
        <div className="flex items-center space-x-3">
          <button
            onClick={onClear}
            className="p-2 rounded-xl border border-slate-205 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors focus:outline-none"
            title="Upload New File"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
              Prediction Analysis Suite 
              <span className="ml-2 text-xs px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/15">HIPAA SECURE</span>
            </h2>
            <p className="text-[10px] text-slate-500 dark:text-slate-450">ID: {profile.id} • Processed: {profile.timestamp}</p>
          </div>
        </div>

        <div className="flex space-x-3 select-none">
          <button
            onClick={() => exportReportToPDF(profile)}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-blue-650 hover:from-teal-600 hover:to-blue-700 rounded-xl shadow-md transition-all focus:outline-none"
          >
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 select-none">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs font-bold border-b-2 tracking-wide transition-all ${
            activeSubTab === 'overview'
              ? 'border-teal-500 text-teal-600 dark:text-teal-400'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Patient Summary</span>
        </button>

        <button
          onClick={() => setActiveSubTab('results')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs font-bold border-b-2 tracking-wide transition-all ${
            activeSubTab === 'results'
              ? 'border-teal-500 text-teal-600 dark:text-teal-400'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Disease Probability</span>
        </button>

        <button
          onClick={() => setActiveSubTab('analytics')}
          className={`flex items-center space-x-2 px-4 py-3 text-xs font-bold border-b-2 tracking-wide transition-all ${
            activeSubTab === 'analytics'
              ? 'border-teal-500 text-teal-600 dark:text-teal-400'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Recharts Analytics</span>
        </button>
      </div>

      {/* Sub-Tab Contents */}
      <div className="space-y-8">
        {activeSubTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Vitals Information Card */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-850 rounded-3xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center mb-6">
                  <Clipboard className="w-4.5 h-4.5 text-teal-500 mr-2" />
                  Demographic & File Specifications
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs select-none">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-450 uppercase tracking-wide block">Patient Name</span>
                    <span className="font-bold text-slate-800 dark:text-white">{profile.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-450 uppercase tracking-wide block">Date of Birth</span>
                    <span className="font-bold text-slate-800 dark:text-white">{profile.dob}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-450 uppercase tracking-wide block">Sex / Gender</span>
                    <span className="font-bold text-slate-800 dark:text-white">{profile.gender}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-450 uppercase tracking-wide block">Blood Type</span>
                    <span className="font-bold text-slate-800 dark:text-white">{profile.bloodType}</span>
                  </div>
                  
                  <div className="col-span-2 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-[10px] font-semibold text-slate-450 uppercase tracking-wide block">Genomic Filename</span>
                    <span className="font-bold text-slate-800 dark:text-white truncate block max-w-xs">{profile.fileName}</span>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-[10px] font-semibold text-slate-450 uppercase tracking-wide block">File Size</span>
                    <span className="font-bold text-slate-800 dark:text-white">{profile.fileSize}</span>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-[10px] font-semibold text-slate-450 uppercase tracking-wide block">Variants Inventoried</span>
                    <span className="font-bold text-slate-800 dark:text-white">{profile.markersCount.toLocaleString()} SNPs</span>
                  </div>
                </div>
              </div>

              {/* Genetic Markers Table */}
              <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-850 rounded-3xl shadow-sm overflow-hidden select-none">
                <div className="p-6 border-b border-slate-150 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
                    <Layers className="w-4.5 h-4.5 text-teal-500 mr-2" />
                    Inventoried Critical Genomic Markers
                  </h3>
                  <p className="text-[10px] text-slate-450">List of key single nucleotide polymorphisms mapped during parsing</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[600px]">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-950 text-slate-500 border-b border-slate-150 dark:border-slate-850 font-bold">
                        <th className="px-6 py-3.5">RSID</th>
                        <th className="px-6 py-3.5">Gene</th>
                        <th className="px-6 py-3.5">Genotype</th>
                        <th className="px-6 py-3.5">Impact Severity</th>
                        <th className="px-6 py-3.5">Clinical Association Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {profile.markers.map((marker) => (
                        <tr key={marker.rsid} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/20 transition-colors">
                          <td className="px-6 py-4 font-mono font-bold text-slate-900 dark:text-white">{marker.rsid}</td>
                          <td className="px-6 py-4 font-semibold">{marker.gene}</td>
                          <td className="px-6 py-4 font-mono">{marker.genotype}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${getImpactBadge(marker.impact)}`}>
                              {marker.impact}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-555 dark:text-slate-400 leading-relaxed font-medium min-w-[200px]">
                            {marker.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Right Column: Risk Dial Gauge */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-850 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-between text-center min-h-[360px] select-none">
              <div className="w-full">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Overall Genetic Risk Index</h3>
                <p className="text-[10px] text-slate-450 mt-1">Weighted aggregation of active high-impact risk alleles</p>
              </div>

              {/* SVG Semi-Circle Dial */}
              <div className="relative w-48 h-28 flex items-center justify-center overflow-hidden">
                <svg className="w-48 h-48 transform -rotate-180 origin-center absolute -top-8" viewBox="0 0 120 120">
                  {/* Background Track */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="rgba(148, 163, 184, 0.12)"
                    strokeWidth="10"
                    strokeDasharray="157"
                    strokeDashoffset="0"
                  />
                  {/* Gauge Color fill */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke={scoreColor}
                    strokeWidth="10"
                    strokeDasharray="157"
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                {/* Score value indicator */}
                <div className="absolute bottom-2 flex flex-col items-center">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">{profile.overallScore}%</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider mt-1.5 ${
                    profile.overallRiskLevel === 'High' 
                      ? 'bg-red-500/10 text-red-500 border border-red-500/15' 
                      : profile.overallRiskLevel === 'Moderate'
                      ? 'bg-orange-500/10 text-orange-500 border border-orange-500/15'
                      : 'bg-green-500/10 text-green-500 border border-green-500/15'
                  }`}>
                    {profile.overallRiskLevel} Risk
                  </span>
                </div>
              </div>

              {/* Summary descriptor */}
              <div className="w-full pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-xs py-1 text-slate-500 font-medium">
                  <span>Heart Disease</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {profile.predictions.find(p => p.id === 'heart_disease')?.probability}%
                  </span>
                </div>
                <div className="flex justify-between text-xs py-1 text-slate-500 font-medium">
                  <span>Alzheimer's Disease</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {profile.predictions.find(p => p.id === 'alzheimers')?.probability}%
                  </span>
                </div>
                <div className="flex justify-between text-xs py-1 text-slate-500 font-medium">
                  <span>Certain Cancers</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {profile.predictions.find(p => p.id === 'cancers')?.probability}%
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {activeSubTab === 'results' && (
          <ResultsSection profile={profile} />
        )}

        {activeSubTab === 'analytics' && (
          <AnalyticsDashboard profile={profile} />
        )}
      </div>

    </div>
  );
};
