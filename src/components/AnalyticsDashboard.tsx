import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { Filter, BarChart3, PieChart as PieIcon, LineChart as LineIcon } from 'lucide-react';
import { PatientProfile } from '../utils/mockData';

interface AnalyticsDashboardProps {
  profile: PatientProfile;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ profile }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [riskFilter, setRiskFilter] = useState<string>('All');

  // Filtered predictions
  const filteredPredictions = profile.predictions.filter(p => {
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchRisk = riskFilter === 'All' || p.riskLevel === riskFilter;
    return matchCat && matchRisk;
  });

  // Data for Disease Probability Bar Chart
  const barChartData = filteredPredictions.map(p => ({
    name: p.name.split(' ')[0], // short name
    fullName: p.name,
    Probability: p.probability,
    Risk: p.riskLevel
  }));

  // Calculate Marker Impact Counts for Pie Chart
  const markerCounts = profile.markers.reduce((acc, curr) => {
    acc[curr.impact] = (acc[curr.impact] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(markerCounts).map(([key, val]) => ({
    name: `${key} Impact`,
    value: val
  }));

  // Colors for Pie Chart Cells
  const COLORS = {
    High: '#ef4444',     // Red
    Moderate: '#f97316', // Orange
    Low: '#3b82f6',      // Blue
    Protective: '#22c55e' // Green
  };

  // Data for Area Chart: Risk Level Tendency by Category
  const categoriesList = ['Cardiovascular', 'Neurological', 'Metabolic', 'Oncology'];
  const categoryData = categoriesList.map(cat => {
    const matchingPreds = profile.predictions.filter(p => p.category === cat);
    const avgProb = matchingPreds.length > 0
      ? Math.round(matchingPreds.reduce((sum, curr) => sum + curr.probability, 0) / matchingPreds.length)
      : 0;
    return {
      category: cat,
      "Genetic Risk intensity": avgProb
    };
  });

  const getCustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-805 text-white p-3 rounded-xl shadow-xl text-xs font-sans">
          <p className="font-bold text-teal-400">{data.fullName || data.name || data.category}</p>
          <p className="mt-1">Probability: <span className="font-bold text-white">{payload[0].value}%</span></p>
          {data.Risk && <p className="text-[10px] text-slate-400 mt-0.5">Category: {data.Risk}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 font-sans select-none">
      
      {/* Filtering Actions Panel */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-slate-100 dark:bg-slate-900/50 border border-slate-205 dark:border-slate-850 rounded-2xl">
        <div className="flex items-center space-x-2 text-slate-850 dark:text-white">
          <Filter className="w-4 h-4 text-teal-500" />
          <span className="text-xs font-bold">Filter Dashboard Analytics</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Category</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Cardiovascular">Cardiovascular</option>
              <option value="Neurological">Neurological</option>
              <option value="Metabolic">Metabolic</option>
              <option value="Oncology">Oncology</option>
            </select>
          </div>

          {/* Risk Level Filter */}
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Severity</span>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 focus:outline-none"
            >
              <option value="All">All Risks</option>
              <option value="High">High Risk Only</option>
              <option value="Moderate">Moderate Risk Only</option>
              <option value="Low">Low Risk Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Bar Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 dark:text-white">
            <BarChart3 className="w-4 h-4 text-teal-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Disease Risk Profiles</h3>
          </div>

          {barChartData.length > 0 ? (
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.08)" />
                  <XAxis dataKey="name" tick={{ fill: 'currentColor', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fill: 'currentColor', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={getCustomTooltip} />
                  <Bar dataKey="Probability" radius={[6, 6, 0, 0]}>
                    {barChartData.map((entry, index) => {
                      const color = entry.Risk === 'High' 
                        ? '#ef4444' 
                        : entry.Risk === 'Moderate' 
                        ? '#f97316' 
                        : '#14b8a6';
                      return <Cell key={`cell-${index}`} fill={color} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-400">
              No matching disease data for active filters.
            </div>
          )}
        </div>

        {/* Right Column: Pie Chart */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 dark:text-white">
            <PieIcon className="w-4 h-4 text-teal-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Genetic Markers Breakdown</h3>
          </div>

          {pieChartData.length > 0 ? (
            <div className="w-full h-72 flex flex-col justify-between">
              <div className="h-56 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => {
                        const impactType = entry.name.split(' ')[0] as 'High' | 'Moderate' | 'Low' | 'Protective';
                        return <Cell key={`cell-${index}`} fill={COLORS[impactType] || '#cbd5e1'} />;
                      })}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center visual label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-lg font-black text-slate-900 dark:text-white">
                    {profile.markers.length}
                  </span>
                  <span className="text-[9px] text-slate-450 uppercase font-semibold">Markers</span>
                </div>
              </div>

              {/* Legends list */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                {pieChartData.map((entry, idx) => {
                  const impactType = entry.name.split(' ')[0] as keyof typeof COLORS;
                  return (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[impactType] }}></span>
                      <span>{entry.name}: {entry.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="h-72 flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-400">
              No genetic variant markers recorded.
            </div>
          )}
        </div>

      </div>

      {/* Area Chart: Risk Trend Distribution by Medical Category */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-3xl p-5 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 text-slate-900 dark:text-white">
          <LineIcon className="w-4 h-4 text-teal-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider">Genetic Risk Profile Intensity By Category</h3>
        </div>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.08)" />
              <XAxis dataKey="category" tick={{ fill: 'currentColor', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: 'currentColor', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={getCustomTooltip} />
              <Area type="monotone" dataKey="Genetic Risk intensity" stroke="#14b8a6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRisk)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
