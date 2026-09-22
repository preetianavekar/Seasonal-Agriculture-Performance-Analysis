import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  RotateCcw, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Droplet, 
  Layers, 
  MapPin, 
  Wheat, 
  DollarSign,
  ShieldAlert,
  Info
} from 'lucide-react';
import { 
  FarmRecord, 
  CropType, 
  StateType, 
  SeasonType, 
  IrrigationType 
} from '../types/agriculture';
import { 
  BENCHMARK_SEASONAL_OVERVIEW, 
  BENCHMARK_CROP_YIELDS, 
  BENCHMARK_CROP_PROFITABILITY, 
  BENCHMARK_WATER_EFFICIENCY, 
  BENCHMARK_STATE_PROFITABILITY 
} from '../data/agricultureData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  Legend, 
  CartesianGrid, 
  LineChart, 
  Line 
} from 'recharts';

interface DashboardProps {
  records: FarmRecord[];
}

export const Dashboard: React.FC<DashboardProps> = ({ records }) => {
  // Filter states
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedSeason, setSelectedSeason] = useState<string>('All');
  const [selectedIrrigation, setSelectedIrrigation] = useState<string>('All');
  const [sizeFilter, setSizeFilter] = useState<string>('All');

  const states: StateType[] = ['Punjab', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Telangana', 'Madhya Pradesh', 'Gujarat', 'Andhra Pradesh'];
  const crops: CropType[] = ['Sugarcane', 'Chilli', 'Maize', 'Rice', 'Wheat', 'Cotton', 'Groundnut', 'Pulses'];
  const seasons: SeasonType[] = ['Kharif', 'Rabi', 'Zaid'];
  const irrigationMethods: IrrigationType[] = ['Rainfed', 'Drip', 'Sprinkler', 'Flood'];

  // Filtered dataset
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      if (selectedState !== 'All' && r.State !== selectedState) return false;
      if (selectedCrop !== 'All' && r.Crop !== selectedCrop) return false;
      if (selectedSeason !== 'All' && r.Season !== selectedSeason) return false;
      if (selectedIrrigation !== 'All' && r.Irrigation_Method !== selectedIrrigation) return false;
      if (sizeFilter === 'Small' && r.Farm_Area_Hectares >= 2) return false;
      if (sizeFilter === 'Medium' && (r.Farm_Area_Hectares < 2 || r.Farm_Area_Hectares > 8)) return false;
      if (sizeFilter === 'Large' && r.Farm_Area_Hectares <= 8) return false;
      return true;
    });
  }, [records, selectedState, selectedCrop, selectedSeason, selectedIrrigation, sizeFilter]);

  // Compute live KPIs
  const kpis = useMemo(() => {
    if (filteredRecords.length === 0) {
      return {
        totalFarms: 0,
        avgYield: 0,
        avgProfit: 0,
        lossFarmsPct: 0,
        avgWaterEff: 0,
        avgPestRisk: 0,
        totalProduction: 0
      };
    }

    const totalFarms = filteredRecords.length;
    const totalYield = filteredRecords.reduce((acc, r) => acc + r.Yield_Tonnes_Ha, 0);
    const totalProfit = filteredRecords.reduce((acc, r) => acc + r.Profit_INR, 0);
    const lossFarms = filteredRecords.filter((r) => r.Profit_INR < 0).length;
    const totalWaterEff = filteredRecords.reduce((acc, r) => acc + r.Water_Efficiency_t_per_1000m3, 0);
    const totalPest = filteredRecords.reduce((acc, r) => acc + r.Disease_Pest_Risk_pct, 0);
    const totalProd = filteredRecords.reduce((acc, r) => acc + r.Production_Tonnes, 0);

    return {
      totalFarms,
      avgYield: +(totalYield / totalFarms).toFixed(2),
      avgProfit: Math.round(totalProfit / totalFarms),
      lossFarmsPct: Math.round((lossFarms / totalFarms) * 100),
      avgWaterEff: +(totalWaterEff / totalFarms).toFixed(2),
      avgPestRisk: +(totalPest / totalFarms).toFixed(1),
      totalProduction: Math.round(totalProd)
    };
  }, [filteredRecords]);

  const resetFilters = () => {
    setSelectedState('All');
    setSelectedCrop('All');
    setSelectedSeason('All');
    setSelectedIrrigation('All');
    setSizeFilter('All');
  };

  return (
    <div className="space-y-8">
      {/* Title & Introduction */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Interactive Internship Analytics Dashboard
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-0.5">
            Agricultural Performance by Season, Crop & Geography
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Analyzing 4,000 empirical farm observations against the 5 key findings documented in the project PPT (5.1 – 5.5).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Interactive Filter Bar */}
      <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <Filter className="w-3.5 h-3.5 text-emerald-400" />
          <span>Multivariate Slicing Controls</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400 font-normal">Active Farms: {filteredRecords.length} of {records.length}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* State Filter */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">State (8 States)</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="All">All States (8)</option>
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Crop Filter */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Crop (8 Crops)</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="All">All Crops (8)</option>
              {crops.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Season Filter */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Season</label>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="All">All Seasons (3)</option>
              {seasons.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Irrigation Filter */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Irrigation Method</label>
            <select
              value={selectedIrrigation}
              onChange={(e) => setSelectedIrrigation(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="All">All Methods (4)</option>
              {irrigationMethods.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Farm Size Filter */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Farm Scale</label>
            <select
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="All">All Scales</option>
              <option value="Small">Small (&lt; 2 Hectares)</option>
              <option value="Medium">Medium (2 - 8 Hectares)</option>
              <option value="Large">Large (&gt; 8 Hectares)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dynamic Key Performance Indicators (KPIs) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Average Yield */}
        <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Average Crop Yield</span>
            <Wheat className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {kpis.avgYield} <span className="text-xs font-normal text-slate-400">t/ha</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
            <span className="text-emerald-400 font-medium">Kharif: 5.63</span>
            <span>·</span>
            <span>Rabi: 5.09</span>
            <span>·</span>
            <span className="text-slate-500">Zaid: 4.64</span>
          </div>
        </div>

        {/* KPI 2: Average Profit */}
        <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Average Farm Profit</span>
            <DollarSign className={`w-4 h-4 ${kpis.avgProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`} />
          </div>
          <div className={`text-2xl font-black ${kpis.avgProfit >= 0 ? 'text-white' : 'text-rose-400'}`}>
            {kpis.avgProfit >= 0 ? `₹${(kpis.avgProfit / 1000).toFixed(0)}K` : `-₹${(Math.abs(kpis.avgProfit) / 1000).toFixed(0)}K`}
          </div>
          <div className="mt-2 text-[11px] flex items-center justify-between">
            <span className="text-slate-400">Share in Loss:</span>
            <span className={`font-semibold ${kpis.lossFarmsPct > 50 ? 'text-rose-400' : 'text-amber-400'}`}>
              {kpis.lossFarmsPct}% of farms
            </span>
          </div>
        </div>

        {/* KPI 3: Water Efficiency */}
        <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Water-Use Efficiency</span>
            <Droplet className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {kpis.avgWaterEff} <span className="text-xs font-normal text-slate-400">t/1000m³</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            Drip (6.0) out-produces Flood (3.2) by <span className="text-cyan-400 font-semibold">+87.5%</span>
          </div>
        </div>

        {/* KPI 4: Pest Risk */}
        <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Pest & Disease Risk</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">
            {kpis.avgPestRisk}%
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            Peak humidity risk in <span className="text-amber-300 font-medium">Kharif (54.5%)</span>
          </div>
        </div>
      </div>

      {/* SECTION 5.1: Season-wise Yield, Profit and Loss-Risk Overview */}
      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Section 5.1 &middot; Overview</div>
            <h3 className="text-lg font-bold text-white mt-0.5">Season-wise Yield, Profit & Loss-Risk Overview</h3>
          </div>
          <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
            ANOVA F = 84.15 (p &lt; 0.001)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Yield Chart */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Average Yield by Season (t/ha)
            </h4>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BENCHMARK_SEASONAL_OVERVIEW}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="season" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 7]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                    formatter={(val: any) => [`${val} t/ha`, 'Yield']}
                  />
                  <Bar dataKey="avgYield" radius={[6, 6, 0, 0]}>
                    <Cell fill="#059669" />
                    <Cell fill="#2563eb" />
                    <Cell fill="#94a3b8" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Kharif leads on productivity (5.63 t/ha) driven by natural rainfall, whereas Zaid exhibits lowest yield (4.64 t/ha).
            </p>
          </div>

          {/* Profit & Loss Chart */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Average Farm Profit & Loss-Making Share (%)
            </h4>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BENCHMARK_SEASONAL_OVERVIEW}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="season" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[-50, 200]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                    formatter={(val: any) => [`₹${val}K`, 'Profit']}
                  />
                  <Bar dataKey="avgProfitK" radius={[6, 6, 0, 0]}>
                    <Cell fill="#059669" />
                    <Cell fill="#16a34a" />
                    <Cell fill="#dc2626" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2 text-center text-xs">
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Kharif Losses</span>
                <span className="font-semibold text-emerald-400">42% farms</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Rabi Losses</span>
                <span className="font-semibold text-amber-400">51% farms</span>
              </div>
              <div className="p-2 bg-rose-950/30 rounded-lg border border-rose-800/40">
                <span className="text-rose-300 text-[10px] block">Zaid Losses</span>
                <span className="font-bold text-rose-400">64% farms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5.2: Seasonal Yield Pattern Across Crops */}
      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Section 5.2 &middot; Crop Yield Patterns</div>
            <h3 className="text-lg font-bold text-white mt-0.5">Seasonal Yield Pattern Across Crops</h3>
          </div>
          <span className="text-xs text-slate-400">Universal yield decline: Kharif &gt; Rabi &gt; Zaid</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Comparative Crop Yields by Season (t/ha)
            </h4>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BENCHMARK_CROP_YIELDS.filter(c => c.crop !== 'Sugarcane')}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="crop" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                    formatter={(val: any) => [`${val} t/ha`, '']}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="kharif" name="Kharif" fill="#059669" />
                  <Bar dataKey="rabi" name="Rabi" fill="#2563eb" />
                  <Bar dataKey="zaid" name="Zaid" fill="#94a3b8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Sugarcane Biomass Outlier
              </div>
              <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl mb-4">
                <div className="text-xs text-emerald-400 font-medium">Sugarcane Average Yield</div>
                <div className="text-2xl font-black text-white mt-1">
                  53.46 <span className="text-xs font-normal text-slate-400">t/ha (Kharif)</span>
                </div>
                <div className="text-xs text-slate-400 mt-2 flex justify-between">
                  <span>Rabi: 43.96 t/ha</span>
                  <span>Zaid: 38.42 t/ha</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-400 leading-relaxed border border-slate-800">
              <span className="font-semibold text-white block mb-1">Empirical Conclusion:</span>
              Yield decays monotonically across all 8 crops from Kharif to Rabi to Zaid due to increasing solar radiation stress and shrinking ground moisture reserves.
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5.3: Crop Profitability Across Seasons */}
      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Section 5.3 &middot; Profitability Dynamics</div>
            <h3 className="text-lg font-bold text-white mt-0.5">Crop Profitability Across Seasons</h3>
          </div>
          <span className="text-xs text-slate-400">Commercial Cash Crops vs Staple Food Cereals</span>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BENCHMARK_CROP_PROFITABILITY}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="crop" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  formatter={(val: any) => [`₹${val} Thousand`, '']}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="kharif" name="Kharif" fill="#059669" />
                <Bar dataKey="rabi" name="Rabi" fill="#2563eb" />
                <Bar dataKey="zaid" name="Zaid" fill="#94a3b8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-800/80 text-xs">
            <div className="p-3 bg-emerald-950/20 border border-emerald-800/30 rounded-lg">
              <span className="font-bold text-emerald-400 block mb-1">High-Surplus Crops (Sugarcane &amp; Chilli):</span>
              <p className="text-slate-300">
                Sugarcane averages ₹774K and Chilli averages ₹684K annual net surplus per farm due to robust market pricing (₹104K/tonne for chilli, ₹3,500/tonne for cane) and strong industrial demand.
              </p>
            </div>
            <div className="p-3 bg-rose-950/20 border border-rose-800/30 rounded-lg">
              <span className="font-bold text-rose-400 block mb-1">Subsidized Cereal Deficits (Rice, Wheat, Maize):</span>
              <p className="text-slate-300">
                Rice (-₹130K avg), Wheat (-₹143K avg), and Maize (-₹106K avg) operate at persistent net losses when accounting for total operational costs, highlighting why farmers rely heavily on government procurement MSP.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5.4 & 5.5: Resource Efficiency, Pest Risk & State Profitability */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SECTION 5.4: Resource Efficiency & Disease Risk */}
        <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Section 5.4 &middot; Resource Efficiency</div>
            <h3 className="text-base font-bold text-white mt-0.5">Resource Efficiency &amp; Pest Risk</h3>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Water Efficiency by Irrigation Method (t / 1000m³)
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BENCHMARK_WATER_EFFICIENCY}>
                  <XAxis dataKey="method" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                    formatter={(val: any) => [`${val} t/1000m³`, '']}
                  />
                  <Bar dataKey="avgWaterEff" fill="#0284c7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
              <span>Rainfed: 7.1</span>
              <span>Drip: 6.0</span>
              <span>Sprinkler: 4.7</span>
              <span>Flood: 3.2</span>
            </div>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Disease &amp; Pest Risk Index by Season (%)
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Kharif Risk</span>
                <span className="text-xl font-bold text-emerald-400">54.5%</span>
                <span className="text-[10px] text-slate-500 block mt-1">High Humidity Vector</span>
              </div>
              <div className="p-3 bg-blue-950/30 border border-blue-800/40 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Rabi Risk</span>
                <span className="text-xl font-bold text-blue-400">40.5%</span>
                <span className="text-[10px] text-slate-500 block mt-1">Moderate Winter Risk</span>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Zaid Risk</span>
                <span className="text-xl font-bold text-slate-300">38.2%</span>
                <span className="text-[10px] text-slate-500 block mt-1">Low Humidity Vector</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5.5: State-wise Seasonal Profitability */}
        <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Section 5.5 &middot; State Performance</div>
              <h3 className="text-base font-bold text-white mt-0.5">State-wise Seasonal Profitability</h3>
            </div>
            <span className="text-xs text-rose-400 font-medium">5 of 8 States Negative in Zaid</span>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 overflow-x-auto">
            <div className="min-w-[400px] text-xs">
              <div className="grid grid-cols-4 gap-2 pb-2 font-semibold text-slate-400 border-b border-slate-800 px-2">
                <div>State</div>
                <div className="text-center">Kharif</div>
                <div className="text-center">Rabi</div>
                <div className="text-center">Zaid</div>
              </div>
              <div className="divide-y divide-slate-800/60 mt-1">
                {BENCHMARK_STATE_PROFITABILITY.map((s) => (
                  <div key={s.state} className="grid grid-cols-4 gap-2 py-2 px-2 items-center hover:bg-slate-900/40 rounded-lg">
                    <span className="font-medium text-white">{s.state}</span>
                    <span className="text-center font-mono font-semibold text-emerald-400 bg-emerald-950/40 py-0.5 rounded border border-emerald-800/20">
                      ₹{s.kharif}K
                    </span>
                    <span className="text-center font-mono font-semibold text-emerald-300 bg-emerald-950/20 py-0.5 rounded border border-emerald-800/20">
                      ₹{s.rabi}K
                    </span>
                    <span className={`text-center font-mono font-semibold py-0.5 rounded border ${
                      s.zaid < 0 
                        ? 'text-rose-400 bg-rose-950/40 border-rose-800/30' 
                        : s.zaid === 0 
                        ? 'text-slate-400 bg-slate-900 border-slate-800' 
                        : 'text-emerald-400 bg-emerald-950/30 border-emerald-800/20'
                    }`}>
                      {s.zaid < 0 ? `-₹${Math.abs(s.zaid)}K` : `₹${s.zaid}K`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-900 rounded-lg text-[11px] text-slate-400 border border-slate-800">
              <strong className="text-white">Regional Takeaway:</strong> Punjab is the only state achieving positive net profit across all three seasons (₹134K Kharif, ₹169K Rabi, ₹62K Zaid). Gujarat (-₹107K) and Andhra Pradesh (-₹84K) suffer severe water depletion during Zaid.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
