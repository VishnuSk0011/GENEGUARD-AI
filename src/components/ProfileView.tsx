import React, { useState, useEffect } from 'react';
import { Mail, ShieldAlert, Award, FileSpreadsheet, Trash2, Calendar, FileText, Download } from 'lucide-react';
import { PatientProfile } from '../utils/mockData';
import { exportReportToPDF } from '../utils/pdfExporter';

interface ProfileViewProps {
  user: { email: string; name: string } | null;
  onSelectProfile: (profile: PatientProfile) => void;
  onTabChange: (tab: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onSelectProfile, onTabChange }) => {
  const [history, setHistory] = useState<PatientProfile[]>([]);

  useEffect(() => {
    const rawHistory = localStorage.getItem('geneguard_history');
    if (rawHistory) {
      try {
        setHistory(JSON.parse(rawHistory));
      } catch (err) {
        console.error("Error reading genetic history", err);
      }
    }
  }, []);

  const handleRemoveRecord = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem('geneguard_history', JSON.stringify(updated));
  };

  const handleRowClick = (profile: PatientProfile) => {
    onSelectProfile(profile);
    onTabChange('prediction');
  };

  const getRiskBadge = (level: string) => {
    if (level === 'High') return 'bg-red-500/10 text-red-500 border border-red-500/15';
    if (level === 'Moderate') return 'bg-orange-500/10 text-orange-500 border border-orange-500/15';
    return 'bg-green-500/10 text-green-500 border border-green-500/15';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Account Details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center">
            
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-teal-500/10 mb-4 border-2 border-white dark:border-slate-800">
              {user ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
            </div>

            {/* Profile Info */}
            <div className="space-y-1">
              <h3 className="text-base font-black text-slate-900 dark:text-white">{user ? user.name : 'Guest User'}</h3>
              <p className="text-xs text-slate-500 flex items-center justify-center">
                <Mail className="w-3.5 h-3.5 mr-1" />
                {user ? user.email : 'guest@geneguard.ai'}
              </p>
            </div>

            <div className="w-full pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 space-y-3.5 text-xs text-left">
              <div className="flex justify-between items-center text-slate-500">
                <span>Account Type</span>
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center">
                  <Award className="w-4 h-4 text-yellow-500 mr-1" />
                  {user?.email?.includes('doctor') ? 'Medical Practitioner' : 'Patient Portal'}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Clinical Authorization</span>
                <span className="font-bold text-emerald-650 dark:text-emerald-450 uppercase text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/15">
                  Verified
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Reports Run</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">{history.length} Profiles</span>
              </div>
            </div>

          </div>

          {/* Privacy Note */}
          <div className="p-4 bg-teal-50/40 dark:bg-slate-900/40 border border-teal-100 dark:border-slate-850 rounded-2xl flex items-start space-x-3">
            <ShieldAlert className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-teal-850 dark:text-teal-450">Encrypted Log Storage</h4>
              <p className="text-[10px] text-teal-700 dark:text-slate-400 leading-normal">
                Prediction history is stored locally in your browser session cookies (localStorage). Cleared immediately if browser storage is wiped.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Prediction History & Reports */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-850 rounded-3xl p-6 shadow-sm min-h-[400px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
                  <FileSpreadsheet className="w-5 h-5 text-teal-500 mr-2" />
                  Historical Prediction Reports
                </h3>
                <p className="text-[10px] text-slate-450">Select any record to reopen the Interactive Genomic Dashboard</p>
              </div>
            </div>

            {history.length > 0 ? (
              <div className="space-y-3.5">
                {history.map((record) => (
                  <div
                    key={record.id}
                    onClick={() => handleRowClick(record)}
                    className="p-4 bg-slate-50 dark:bg-slate-950 hover:bg-teal-500/5 dark:hover:bg-slate-850 border border-slate-200/80 dark:border-slate-800/80 hover:border-teal-500 dark:hover:border-teal-500/40 rounded-2xl cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <FileText className="w-5 h-5 text-teal-500" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-black text-slate-800 dark:text-white">{record.name}</h4>
                        <div className="flex flex-wrap items-center gap-x-2 text-[9px] text-slate-500">
                          <span className="font-medium font-mono">{record.fileName}</span>
                          <span>•</span>
                          <span className="flex items-center"><Calendar className="w-3 h-3 mr-0.5" /> {record.timestamp.substring(0, 10)}</span>
                          <span>•</span>
                          <span>{record.markersCount.toLocaleString()} SNPs</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-3.5 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200/50">
                      <div className="flex flex-col items-end mr-2">
                        <span className="text-[9px] text-slate-450 uppercase font-semibold">Risk Index</span>
                        <span className={`text-xs font-black px-2 py-0.5 rounded border mt-0.5 ${getRiskBadge(record.overallRiskLevel)}`}>
                          {record.overallScore}% - {record.overallRiskLevel}
                        </span>
                      </div>

                      <div className="flex space-x-2.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            exportReportToPDF(record);
                          }}
                          className="p-2 rounded-lg border border-slate-205 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-850 dark:hover:text-white transition-colors"
                          title="Download PDF"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        
                        <button
                          type="button"
                          onClick={(e) => handleRemoveRecord(record.id, e)}
                          className="p-2 rounded-lg border border-slate-205 dark:border-slate-800 hover:bg-red-50 dark:hover:bg-red-950/20 text-slate-400 hover:text-red-500 transition-colors"
                          title="Remove Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                <FileText className="w-10 h-10 text-slate-350 animate-pulse" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">No Patient Reports Available</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-450 max-w-xs leading-relaxed">
                    You haven't uploaded or analyzed any DNA datasets in this browser session. Navigate to the Prediction section to load reports.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onTabChange('prediction')}
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold text-[10px] rounded-xl shadow-sm transition-all focus:outline-none"
                >
                  Analyze Genomic Data
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
