import React from 'react';

export const DNAAnimation: React.FC = () => {
  // Generate 15 base pairs along a horizontal or diagonal plane
  const nodes = Array.from({ length: 16 }, (_, i) => i);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-slate-900/10 dark:bg-slate-950/20 rounded-3xl border border-slate-200/50 dark:border-slate-800/30 backdrop-blur-sm shadow-inner">
      {/* Background ambient glowing cells */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[15%] w-24 h-24 rounded-full bg-teal-500/10 blur-xl animate-pulse-slow"></div>
        <div className="absolute bottom-[25%] right-[20%] w-32 h-32 rounded-full bg-blue-500/10 blur-2xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-[40%] right-[30%] w-16 h-16 rounded-full bg-cyan-500/5 blur-lg animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative flex flex-row items-center justify-center space-x-3 md:space-x-5 px-4 select-none">
        {nodes.map((idx) => {
          // Dynamic styling for wave offset
          const delay1 = `${idx * 0.25}s`;
          const delay2 = `${idx * 0.25 + 2}s`; // out of phase for second strand

          return (
            <div key={idx} className="relative flex flex-col items-center justify-between h-48 w-4">
              {/* Strand Node A */}
              <div 
                className="w-4 h-4 rounded-full bg-gradient-to-br from-teal-400 to-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.6)] animate-bounce"
                style={{ 
                  animationDuration: '2.5s',
                  animationDelay: delay1,
                  animationTimingFunction: 'ease-in-out'
                }}
              ></div>

              {/* Connecting ladder rung */}
              <div 
                className="w-0.5 h-36 bg-gradient-to-b from-teal-500/30 via-slate-400/20 to-blue-500/30 dark:from-teal-500/20 dark:via-slate-800/30 dark:to-blue-500/20 rounded"
                style={{
                  // The ladder rung stretches or pulses
                  animation: 'pulse 2.5s ease-in-out infinite',
                  animationDelay: delay1
                }}
              ></div>

              {/* Strand Node B */}
              <div 
                className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] animate-bounce"
                style={{ 
                  animationDuration: '2.5s',
                  animationDelay: delay2,
                  animationTimingFunction: 'ease-in-out'
                }}
              ></div>
            </div>
          );
        })}
      </div>

      {/* Futuristic Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      {/* Decorative medical UI indicators */}
      <div className="absolute top-4 left-4 flex items-center space-x-2 text-xs font-mono text-teal-600 dark:text-teal-400 select-none">
        <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
        <span>SEQUENCE_ANALYZER_ONLINE</span>
      </div>
      <div className="absolute bottom-4 right-4 text-right text-[10px] font-mono text-slate-400 dark:text-slate-600 select-none">
        <div>HELIX_RESOLUTION: 5.4 Angstrom</div>
        <div>POLYMERASE_LOCK: ENABLED</div>
      </div>
    </div>
  );
};
