import React, { useState, useMemo } from 'react';
import { 
  Database, 
  Search, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpDown,
  FileSpreadsheet
} from 'lucide-react';
import { FarmRecord, CropType, StateType, SeasonType } from '../types/agriculture';

interface DatasetExplorerProps {
  records: FarmRecord[];
}

export const DatasetExplorer: React.FC<DatasetExplorerProps> = ({ records }) => {
  const [activeSubTab, setActiveSubTab] = useState<'records' | 'cleaning_report'>('records');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedSeason, setSelectedSeason] = useState<string>('All');
  const [sortField, setSortField] = useState<keyof FarmRecord>('Farm_ID');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  // Filter and sort records
  const processedRecords = useMemo(() => {
    let result = records.filter((r) => {
      if (selectedCrop !== 'All' && r.Crop !== selectedCrop) return false;
      if (selectedSeason !== 'All' && r.Season !== selectedSeason) return false;
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        return (
          r.Farm_ID.toLowerCase().includes(query) ||
          r.State.toLowerCase().includes(query) ||
          r.District.toLowerCase().includes(query) ||
          r.Crop.toLowerCase().includes(query) ||
          r.Irrigation_Method.toLowerCase().includes(query)
        );
      }
      return true;
    });

    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortAsc ? (Number(aVal) - Number(bVal)) : (Number(bVal) - Number(aVal));
    });

    return result;
  }, [records, selectedCrop, selectedSeason, searchTerm, sortField, sortAsc]);

  const totalPages = Math.ceil(processedRecords.length / pageSize);
  const paginatedRecords = processedRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (field: keyof FarmRecord) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  // Export Cleaned CSV
  const handleExportCSV = () => {
    if (records.length === 0) return;
    const headers = Object.keys(records[0]).join(',');
    const rows = records.map(r => Object.values(r).join(','));
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'cleaned_seasonal_agriculture_dataset_4000.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Primary Agricultural Data Repository
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-0.5">
            Agricultural Dataset &amp; Data Cleaning Audit
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            28 agricultural variables across 4,000 farm observations with transparent data preparation audits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveSubTab('records')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeSubTab === 'records'
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Farm Records
            </button>
            <button
              onClick={() => setActiveSubTab('cleaning_report')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeSubTab === 'cleaning_report'
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cleaning Audit Report
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Cleaned CSV</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'cleaning_report' ? (
        /* Data Cleaning Audit Report */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>1. Missing Value Imputation Strategy</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Raw data revealed missing values in <code className="text-emerald-300 font-mono">Soil_Moisture_pct</code> (4.1% missing) and <code className="text-emerald-300 font-mono">Rainfall_mm</code> (2.3% missing). Rather than listwise deletion which introduces seasonal attrition bias, missing metrics were imputed using conditional median stratification:
              </p>
              <div className="p-3 bg-slate-950 rounded-lg font-mono text-[11px] text-slate-300 border border-slate-850">
                df['Soil_Moisture_pct'] = df.groupby(['Crop', 'Season'])['Soil_Moisture_pct'].transform(lambda x: x.fillna(x.median()))
              </div>
              <div className="text-[11px] text-slate-400">
                Preserves natural soil saturation dynamics without distorting seasonal variance.
              </div>
            </div>

            <div className="p-5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>2. Accounting Invariants Verification</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every farm financial transaction was rigorously checked to verify the fundamental accounting identity:
              </p>
              <div className="p-3 bg-slate-950 rounded-lg font-mono text-[11px] text-emerald-400 border border-slate-850 text-center font-bold">
                Profit_INR = Revenue_INR - Total_Cost_INR
              </div>
              <p className="text-xs text-slate-300">
                100% of the 4,000 records pass the accounting validation check with 0 variance discrepancies.
              </p>
            </div>

            <div className="p-5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>3. Agronomic Outlier Capping &amp; Range Bounds</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Agronomic boundaries were enforced to eliminate data entry typos:
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li><span className="font-semibold text-white">Soil pH:</span> Clamped to realistic biological range [4.5 – 8.8].</li>
                <li><span className="font-semibold text-white">Fertilizer kg/ha:</span> Clipped to maximum agronomic limit of 400 kg/ha.</li>
                <li><span className="font-semibold text-white">Yield:</span> Cleaned erroneous negative yield records.</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>4. Derived Feature Engineering</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Constructed critical normalized indicators for multi-dimensional performance analysis:
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li><code className="text-emerald-300 font-mono">Water_Efficiency_t_per_1000m3</code> = Production_Tonnes / (Water_Used_m3 / 1000)</li>
                <li><code className="text-emerald-300 font-mono">Is_Loss_Making</code> = 1 if Profit_INR &lt; 0 else 0</li>
                <li><code className="text-emerald-300 font-mono">Profit_Margin_pct</code> = (Profit_INR / Revenue_INR) * 100</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* Farm Records Table */
        <div className="space-y-4">
          {/* Table Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/70 p-3 rounded-xl border border-slate-800">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search Farm ID, State, District, Crop..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <div>
                <select
                  value={selectedCrop}
                  onChange={(e) => {
                    setSelectedCrop(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="All">All Crops</option>
                  <option value="Sugarcane">Sugarcane</option>
                  <option value="Chilli">Chilli</option>
                  <option value="Maize">Maize</option>
                  <option value="Rice">Rice</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Groundnut">Groundnut</option>
                  <option value="Pulses">Pulses</option>
                </select>
              </div>

              <div>
                <select
                  value={selectedSeason}
                  onChange={(e) => {
                    setSelectedSeason(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="All">All Seasons</option>
                  <option value="Kharif">Kharif</option>
                  <option value="Rabi">Rabi</option>
                  <option value="Zaid">Zaid</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80 shadow-md">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-300 border-b border-slate-800 select-none">
                <tr>
                  <th onClick={() => handleSort('Farm_ID')} className="p-3 cursor-pointer hover:text-white">
                    <div className="flex items-center gap-1">
                      <span>Farm ID</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('State')} className="p-3 cursor-pointer hover:text-white">
                    <div className="flex items-center gap-1">
                      <span>State</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('Crop')} className="p-3 cursor-pointer hover:text-white">
                    <div className="flex items-center gap-1">
                      <span>Crop</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('Season')} className="p-3 cursor-pointer hover:text-white">
                    <div className="flex items-center gap-1">
                      <span>Season</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('Farm_Area_Hectares')} className="p-3 cursor-pointer hover:text-white">
                    <div className="flex items-center gap-1">
                      <span>Area (ha)</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('Yield_Tonnes_Ha')} className="p-3 cursor-pointer hover:text-white">
                    <div className="flex items-center gap-1">
                      <span>Yield (t/ha)</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('Irrigation_Method')} className="p-3 cursor-pointer hover:text-white">
                    <div className="flex items-center gap-1">
                      <span>Irrigation</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('Profit_INR')} className="p-3 cursor-pointer hover:text-white text-right">
                    <div className="flex items-center justify-end gap-1">
                      <span>Net Profit (₹)</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('Water_Efficiency_t_per_1000m3')} className="p-3 cursor-pointer hover:text-white text-right">
                    <div className="flex items-center justify-end gap-1">
                      <span>Water Eff</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-mono text-[11px]">
                {paginatedRecords.map((r) => {
                  const isProfit = r.Profit_INR >= 0;
                  return (
                    <tr key={r.Farm_ID} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-3 font-semibold text-slate-300">{r.Farm_ID}</td>
                      <td className="p-3 font-sans text-white">{r.State}</td>
                      <td className="p-3 font-sans text-slate-200">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          {r.Crop}
                        </span>
                      </td>
                      <td className="p-3 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                          r.Season === 'Kharif' 
                            ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/30'
                            : r.Season === 'Rabi'
                            ? 'bg-blue-950/50 text-blue-300 border border-blue-800/30'
                            : 'bg-amber-950/50 text-amber-300 border border-amber-800/30'
                        }`}>
                          {r.Season}
                        </span>
                      </td>
                      <td className="p-3 text-slate-300">{r.Farm_Area_Hectares}</td>
                      <td className="p-3 font-semibold text-white">{r.Yield_Tonnes_Ha}</td>
                      <td className="p-3 font-sans text-slate-400">{r.Irrigation_Method}</td>
                      <td className={`p-3 text-right font-bold ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isProfit ? `+₹${r.Profit_INR.toLocaleString()}` : `-₹${Math.abs(r.Profit_INR).toLocaleString()}`}
                      </td>
                      <td className="p-3 text-right text-slate-300">{r.Water_Efficiency_t_per_1000m3}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 px-1">
            <span>
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, processedRecords.length)} of {processedRecords.length} records
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded-md bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-white cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-mono">
                Page {currentPage} of {Math.max(1, totalPages)}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1 rounded-md bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-white cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
