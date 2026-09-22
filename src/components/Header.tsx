import React from 'react';
import { 
  BarChart3, 
  TestTube2, 
  Database, 
  Sparkles, 
  Sprout,
  Calendar,
  Layers
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  totalRecordsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  totalRecordsCount
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Executive Analytics', icon: BarChart3 },
    { id: 'anova', label: 'Statistical ANOVA Lab', icon: TestTube2 },
    { id: 'dataset', label: 'Dataset & Cleaning Audit', icon: Database },
    { id: 'simulator', label: 'Crop Recommendation Simulator', icon: Sparkles },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
      {/* Top Banner with Seasonal Agriculture Performance Analysis Headline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-400/30 shrink-0">
              <Sprout className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Seasonal Agriculture Performance Analysis
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Multi-dimensional empirical study across Kharif, Rabi &amp; Zaid seasons
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="font-mono text-emerald-300 font-semibold">{totalRecordsCount.toLocaleString()}</span>
              <span className="text-slate-400">Farms Analyzed</span>
            </div>
            <div className="hidden sm:flex text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>8 States &middot; 8 Crops</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-t border-slate-800/80 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 no-scrollbar" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
