import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, Database, RefreshCw, AlertCircle } from 'lucide-react';
import { PatientProfile, mockProfileA, mockProfileB, mockProfileC, generateProfileFromUploadedFile } from '../utils/mockData';

interface UploadSectionProps {
  onUploadSuccess: (profile: PatientProfile) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onUploadSuccess }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string } | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateAnalysis = (fileName: string, fileSizeStr: string) => {
    setIsAnalyzing(true);
    setUploadProgress(0);
    setErrorMsg('');

    const steps = [
      { progress: 15, text: "Verifying encrypted file structure..." },
      { progress: 40, text: "Extracting DNA variants (SNPs)..." },
      { progress: 70, text: "Matching against genome risk databases..." },
      { progress: 90, text: "Calculating polygenic risk models..." },
      { progress: 100, text: "Structuring clinical report dashboards..." }
    ];

    let currentStepIdx = 0;
    const interval = setInterval(() => {
      if (currentStepIdx < steps.length) {
        const step = steps[currentStepIdx];
        setUploadProgress(step.progress);
        setUploadStatus(step.text);
        currentStepIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnalyzing(false);
          const generatedProfile = generateProfileFromUploadedFile(fileName, fileSizeStr);
          onUploadSuccess(generatedProfile);
        }, 600);
      }
    }, 550);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const processFile = (file: File) => {
    const validExtensions = ['.csv', '.tsv', '.txt', '.xlsx'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!validExtensions.includes(fileExtension)) {
      setErrorMsg('Invalid file format. Please upload a .txt, .csv, .tsv, or .xlsx genetic dataset.');
      return;
    }

    const sizeStr = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${(file.size / 1024).toFixed(1)} KB`;

    setSelectedFile({ name: file.name, size: sizeStr });
    simulateAnalysis(file.name, sizeStr);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleSampleSelect = (profileType: 'cardio' | 'neuro' | 'healthy') => {
    let profile: PatientProfile;
    if (profileType === 'cardio') profile = mockProfileA;
    else if (profileType === 'neuro') profile = mockProfileB;
    else profile = mockProfileC;

    setSelectedFile({ name: profile.fileName, size: profile.fileSize });
    simulateAnalysis(profile.fileName, profile.fileSize);
  };

  return (
    <section className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 font-sans select-none">
      
      {/* Title */}
      <div className="text-center space-y-3 mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Genomic Sequence Upload Portal
        </h2>
        <p className="text-xs sm:text-sm text-slate-555 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Provide raw genetic testing data. Securely upload clinical data or load pre-compiled laboratory profiles for a comprehensive demonstration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        
        {/* Upload Column (Left / Main) */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-300 ${
              isDragActive 
                ? 'border-teal-500 bg-teal-50/20 dark:bg-teal-950/10 scale-99 shadow-lg' 
                : 'border-slate-300 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500/50 hover:bg-slate-50 dark:hover:bg-slate-900/40 bg-white/40 dark:bg-slate-900/20 backdrop-blur-sm'
            }`}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              className="hidden" 
              onChange={handleFileChange}
              accept=".csv,.tsv,.txt,.xlsx"
            />

            {!isAnalyzing ? (
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-teal-500/10 dark:bg-teal-500/5 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 animate-bounce" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Drag and Drop genomic dataset file here
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Supports 23andMe, AncestryDNA, or raw SNP tables (.txt, .csv, .tsv, .xlsx)
                  </p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 border border-slate-200 dark:border-slate-800 hover:border-teal-500 text-xs font-semibold rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 shadow-sm"
                >
                  Browse Files
                </button>
              </div>
            ) : (
              <div className="w-full space-y-6">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-500">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                </div>
                
                <div className="space-y-2 max-w-sm mx-auto">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-350">
                    <span className="truncate max-w-[200px]">{selectedFile?.name}</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  
                  {/* Progress bar wrapper */}
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-teal-400 to-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 italic">
                    {uploadStatus}
                  </p>
                </div>
              </div>
            )}
          </div>

          {errorMsg && (
            <div className="mt-4 flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-xs text-red-650 dark:text-red-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Demo Datasets Column (Right) */}
        <div className="md:col-span-5 flex flex-col">
          <div className="flex-1 rounded-3xl p-6 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-850 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-slate-800 dark:text-white">
                <Database className="w-4 h-4 text-teal-500" />
                <h3 className="text-sm font-bold">Quick-Inject Sandbox Profiles</h3>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
                Don't have raw DNA data files on hand? Inject one of these realistic laboratory dataset profiles to view the prediction panels instantly.
              </p>
            </div>

            {/* Profile Action List */}
            <div className="space-y-3 mt-6">
              
              {/* Cardio Profile */}
              <button
                type="button"
                onClick={() => handleSampleSelect('cardio')}
                disabled={isAnalyzing}
                className="w-full text-left p-3.5 bg-white dark:bg-slate-900 border border-slate-250/70 dark:border-slate-800/80 hover:border-teal-500 dark:hover:border-teal-500/50 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">Marcus Vance (Profile A)</h4>
                  <span className="text-[9px] text-red-650 font-semibold uppercase tracking-wider">Cardiovascular & Hypertension Risk</span>
                </div>
                <CheckCircle className="w-4 h-4 text-slate-300" />
              </button>

              {/* Neuro Profile */}
              <button
                type="button"
                onClick={() => handleSampleSelect('neuro')}
                disabled={isAnalyzing}
                className="w-full text-left p-3.5 bg-white dark:bg-slate-900 border border-slate-250/70 dark:border-slate-800/80 hover:border-teal-500 dark:hover:border-teal-500/50 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">Elena Rostova (Profile B)</h4>
                  <span className="text-[9px] text-red-650 font-semibold uppercase tracking-wider">Alzheimer's & Oncology Risk</span>
                </div>
                <CheckCircle className="w-4 h-4 text-slate-300" />
              </button>

              {/* Healthy Profile */}
              <button
                type="button"
                onClick={() => handleSampleSelect('healthy')}
                disabled={isAnalyzing}
                className="w-full text-left p-3.5 bg-white dark:bg-slate-900 border border-slate-250/70 dark:border-slate-800/80 hover:border-teal-500 dark:hover:border-teal-500/50 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">Sarah Jenkins (Profile C)</h4>
                  <span className="text-[9px] text-green-650 font-semibold uppercase tracking-wider">Low General Polygenic Risks</span>
                </div>
                <CheckCircle className="w-4 h-4 text-slate-300" />
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
