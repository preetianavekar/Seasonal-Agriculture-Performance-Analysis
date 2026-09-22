import React, { useState } from 'react';
import { 
  Sparkles, 
  Wheat, 
  Droplets, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  ArrowRight,
  Sliders,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { StateType, SeasonType, CropType, IrrigationType } from '../types/agriculture';

export const RecommendationSimulator: React.FC = () => {
  const [state, setState] = useState<StateType>('Punjab');
  const [season, setSeason] = useState<SeasonType>('Kharif');
  const [farmArea, setFarmArea] = useState<number>(4.5);
  const [soilPh, setSoilPh] = useState<number>(6.8);
  const [soilMoisture, setSoilMoisture] = useState<number>(28);
  const [irrigationAccess, setIrrigationAccess] = useState<'Drip' | 'Canal/Flood' | 'Rainfed_Only'>('Drip');

  // Compute recommendation based on findings from Slides 5.1 - 5.5
  const recommendation = React.useMemo(() => {
    let recommendedCrop: CropType = 'Sugarcane';
    let alternativeCrop: CropType = 'Chilli';
    let avoidCrop: CropType = 'Wheat';
    let projectedYield = 53.4;
    let profitPerHa = 70000;
    let riskLevel: 'Low' | 'Moderate' | 'High' = 'Low';
    let recommendedIrrigation: IrrigationType = 'Drip';
    let rationale = '';

    if (season === 'Kharif') {
      if (irrigationAccess === 'Rainfed_Only') {
        recommendedCrop = 'Groundnut';
        alternativeCrop = 'Pulses';
        avoidCrop = 'Sugarcane';
        projectedYield = 1.48;
        profitPerHa = 35000;
        riskLevel = 'Moderate';
        recommendedIrrigation = 'Rainfed';
        rationale = 'In monsoon Kharif with rainfed setup, Groundnut and Pulses exhibit top water efficiency without requiring high pumping energy.';
      } else {
        recommendedCrop = 'Sugarcane';
        alternativeCrop = 'Chilli';
        avoidCrop = 'Rice';
        projectedYield = 53.46;
        profitPerHa = 95000;
        riskLevel = 'Low';
        recommendedIrrigation = 'Drip';
        rationale = 'Kharif Sugarcane and Chilli generate peak surplus (₹179K+ avg), taking advantage of abundant seasonal precipitation.';
      }
    } else if (season === 'Rabi') {
      if (state === 'Punjab' || state === 'Maharashtra') {
        recommendedCrop = 'Wheat';
        alternativeCrop = 'Chilli';
        avoidCrop = 'Rice';
        projectedYield = 2.45;
        profitPerHa = 28000;
        riskLevel = 'Low';
        recommendedIrrigation = 'Drip';
        rationale = 'Punjab and Maharashtra achieve strong winter grain and spice yields; pairing with Drip preserves water efficiency.';
      } else {
        recommendedCrop = 'Chilli';
        alternativeCrop = 'Groundnut';
        avoidCrop = 'Maize';
        projectedYield = 1.46;
        profitPerHa = 62000;
        riskLevel = 'Moderate';
        recommendedIrrigation = 'Drip';
        rationale = 'Chilli remains highly profitable in Rabi (₹642K avg), compensating for winter water deficits with strong market prices.';
      }
    } else {
      // Zaid (Summer) - High Loss Season (64% loss farms)
      if (state === 'Gujarat' || state === 'Andhra Pradesh') {
        recommendedCrop = 'Chilli';
        alternativeCrop = 'Sugarcane';
        avoidCrop = 'Rice';
        projectedYield = 1.18;
        profitPerHa = 45000;
        riskLevel = 'High';
        recommendedIrrigation = 'Drip';
        rationale = 'WARNING: Zaid has 64% loss probability. Rice, Wheat, and Maize incur heavy deficits. Strictly plant cash crops (Chilli/Cane) with Drip irrigation.';
      } else {
        recommendedCrop = 'Sugarcane';
        alternativeCrop = 'Chilli';
        avoidCrop = 'Pulses';
        projectedYield = 38.42;
        profitPerHa = 52000;
        riskLevel = 'Moderate';
        recommendedIrrigation = 'Drip';
        rationale = 'Punjab & Karnataka maintain positive Zaid profits. Water must be regulated via micro-irrigation to prevent pumping cost escalation.';
      }
    }

    const estimatedRevenue = Math.round(farmArea * profitPerHa * 1.55);
    const estimatedCost = Math.round(farmArea * (profitPerHa * 0.55));
    const estimatedProfit = estimatedRevenue - estimatedCost;

    return {
      recommendedCrop,
      alternativeCrop,
      avoidCrop,
      projectedYield,
      recommendedIrrigation,
      estimatedProfit,
      estimatedRevenue,
      estimatedCost,
      riskLevel,
      rationale
    };
  }, [state, season, farmArea, soilPh, soilMoisture, irrigationAccess]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          Prescriptive Decision Support
        </span>
        <h2 className="text-2xl font-bold text-white tracking-tight mt-0.5">
          Agronomic &amp; Crop Planning Recommendation Simulator
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl">
          Simulating prescriptive AI decision support for farmers and FPOs: Input local conditions to receive evidence-backed crop selections, irrigation recommendations, and financial risk forecasts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Farm Parameter Controls */}
        <div className="lg:col-span-5 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Input Farm Parameters</h3>
          </div>

          <div className="space-y-4 text-xs">
            {/* State */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">State Location</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value as StateType)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="Punjab">Punjab (High Irrigation)</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Gujarat">Gujarat (High Zaid Risk)</option>
                <option value="Andhra Pradesh">Andhra Pradesh (High Zaid Risk)</option>
              </select>
            </div>

            {/* Season */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">Target Season</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Kharif', 'Rabi', 'Zaid'] as SeasonType[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSeason(s)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                      season === s
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Farm Area Slider */}
            <div>
              <div className="flex items-center justify-between text-slate-300 font-medium mb-1">
                <span>Farm Area</span>
                <span className="font-mono text-emerald-400 font-bold">{farmArea} Hectares</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="15.0"
                step="0.5"
                value={farmArea}
                onChange={(e) => setFarmArea(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Soil pH */}
            <div>
              <div className="flex items-center justify-between text-slate-300 font-medium mb-1">
                <span>Soil pH</span>
                <span className="font-mono text-slate-300 font-bold">{soilPh} ({soilPh < 6.5 ? 'Acidic' : soilPh > 7.5 ? 'Alkaline' : 'Neutral'})</span>
              </div>
              <input
                type="range"
                min="5.0"
                max="8.5"
                step="0.1"
                value={soilPh}
                onChange={(e) => setSoilPh(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Water / Irrigation setup */}
            <div>
              <label className="block text-slate-300 font-medium mb-1">Water Infrastructure</label>
              <select
                value={irrigationAccess}
                onChange={(e) => setIrrigationAccess(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="Drip">Drip Irrigation (6.0 t/1000m³ Efficiency)</option>
                <option value="Canal/Flood">Flood / Canal (3.2 t/1000m³ Efficiency)</option>
                <option value="Rainfed_Only">Rainfed Only (Monsoon dependent)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Prescription & Financial Projection Output */}
        <div className="lg:col-span-7 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Recommended Agronomic Strategy</h3>
              </div>
              <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                recommendation.riskLevel === 'Low'
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                  : recommendation.riskLevel === 'Moderate'
                  ? 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                  : 'bg-rose-950/60 text-rose-300 border border-rose-800/40'
              }`}>
                {recommendation.riskLevel} Seasonal Risk
              </span>
            </div>

            {/* Prescribed Crops */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-emerald-950/30 border border-emerald-800/40 rounded-xl">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                  1st Choice (Optimal)
                </span>
                <div className="text-lg font-black text-white flex items-center gap-1.5">
                  <Wheat className="w-4 h-4 text-emerald-400" />
                  <span>{recommendation.recommendedCrop}</span>
                </div>
                <span className="text-xs text-slate-300 block mt-1">
                  Proj: {recommendation.projectedYield} t/ha
                </span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                  2nd Alternative
                </span>
                <div className="text-lg font-black text-white">
                  {recommendation.alternativeCrop}
                </div>
                <span className="text-xs text-slate-400 block mt-1">
                  Diversification crop
                </span>
              </div>

              <div className="p-4 bg-rose-950/20 border border-rose-800/30 rounded-xl">
                <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block mb-1">
                  High Risk / Avoid
                </span>
                <div className="text-lg font-black text-rose-300">
                  {recommendation.avoidCrop}
                </div>
                <span className="text-xs text-rose-400/80 block mt-1">
                  Negative net margins
                </span>
              </div>
            </div>

            {/* Financial Projection Cards */}
            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">Est. Revenue</div>
                <div className="text-base font-bold text-white mt-1">₹{recommendation.estimatedRevenue.toLocaleString()}</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">Est. Total Cost</div>
                <div className="text-base font-bold text-slate-300 mt-1">₹{recommendation.estimatedCost.toLocaleString()}</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400">Projected Net Profit</div>
                <div className="text-base font-black text-emerald-400 mt-1">
                  +₹{recommendation.estimatedProfit.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Agronomic Rationale Box */}
            <div className="mt-6 p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <div className="text-emerald-400 font-bold mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Empirical Agronomic Rationale:</span>
              </div>
              <p>{recommendation.rationale}</p>
              <div className="mt-3 pt-3 border-t border-slate-900 flex items-center justify-between text-slate-400">
                <span>Recommended Irrigation: <strong className="text-white">{recommendation.recommendedIrrigation}</strong></span>
                <span>Season Loss Base Rate: <strong className="text-amber-400">{season === 'Kharif' ? '42%' : season === 'Rabi' ? '51%' : '64%'}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
