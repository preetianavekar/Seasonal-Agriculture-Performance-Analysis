/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { StatisticalLab } from './components/StatisticalLab';
import { DatasetExplorer } from './components/DatasetExplorer';
import { RecommendationSimulator } from './components/RecommendationSimulator';
import { generateFullDataset } from './data/agricultureData';
import { Sprout } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Generate dataset once with authentic baseline
  const records = useMemo(() => generateFullDataset(), []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalRecordsCount={records.length}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <Dashboard records={records} />
        )}

        {activeTab === 'anova' && (
          <StatisticalLab records={records} />
        )}

        {activeTab === 'dataset' && (
          <DatasetExplorer records={records} />
        )}

        {activeTab === 'simulator' && (
          <RecommendationSimulator />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-500" />
            <span className="font-semibold text-slate-300">
              Seasonal Agriculture Performance Analysis
            </span>
            <span>&middot;</span>
            <span>Empirical Agronomic &amp; Resource Efficiency Research</span>
          </div>

          <div className="text-slate-500 text-[11px]">
            Analysis across Kharif, Rabi &amp; Zaid seasons &middot; 4,000 farm records &middot; 8 agricultural states
          </div>
        </div>
      </footer>
    </div>
  );
}
