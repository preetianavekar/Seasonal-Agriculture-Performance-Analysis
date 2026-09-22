export type SeasonType = 'Kharif' | 'Rabi' | 'Zaid';

export type IrrigationType = 'Rainfed' | 'Drip' | 'Sprinkler' | 'Flood';

export type CropType = 
  | 'Sugarcane' 
  | 'Chilli' 
  | 'Maize' 
  | 'Rice' 
  | 'Wheat' 
  | 'Cotton' 
  | 'Groundnut' 
  | 'Pulses';

export type StateType = 
  | 'Punjab' 
  | 'Karnataka' 
  | 'Maharashtra' 
  | 'Tamil Nadu' 
  | 'Telangana' 
  | 'Madhya Pradesh' 
  | 'Gujarat' 
  | 'Andhra Pradesh';

export interface FarmRecord {
  Farm_ID: string;
  State: StateType;
  District: string;
  Crop: CropType;
  Season: SeasonType;
  Farm_Area_Hectares: number;
  Rainfall_mm: number;
  Avg_Temperature_C: number;
  Humidity_pct: number;
  Sunlight_Hours_Day: number;
  Soil_pH: number;
  Soil_Moisture_pct: number;
  Nitrogen_kg_ha: number;
  Phosphorus_kg_ha: number;
  Potassium_kg_ha: number;
  Irrigation_Method: IrrigationType;
  Fertilizer_kg_ha: number;
  Pesticide_Litre_ha: number;
  Seed_Quality_Score: number;
  Yield_Tonnes_Ha: number;
  Production_Tonnes: number;
  Market_Price_INR_Tonne: number;
  Total_Cost_INR: number;
  Revenue_INR: number;
  Profit_INR: number;
  Water_Used_m3: number;
  Water_Efficiency_t_per_1000m3: number;
  Disease_Pest_Risk_pct: number;
}

export interface SeasonalSummary {
  season: SeasonType;
  avgYield: number;
  avgProfitK: number;
  lossFarmPct: number;
  pestRiskPct: number;
  avgRainfall: number;
  avgTemp: number;
  farmCount: number;
}

export interface CropSeasonalYield {
  crop: CropType;
  kharif: number;
  rabi: number;
  zaid: number;
  overallAvg: number;
}

export interface CropProfitability {
  crop: CropType;
  kharif: number;
  rabi: number;
  zaid: number;
  overall: number;
}

export interface IrrigationWaterEff {
  method: IrrigationType;
  kharif: number;
  rabi: number;
  zaid: number;
  avgWaterEff: number;
}

export interface StateProfitability {
  state: StateType;
  kharif: number;
  rabi: number;
  zaid: number;
  avgProfitK: number;
}

export interface ANOVAResult {
  variableName: string;
  factor: string;
  fStatistic: number;
  pValue: number;
  dfBetween: number;
  dfWithin: number;
  isSignificant: boolean;
  interpretation: string;
  groupStats: {
    group: string;
    mean: number;
    std: number;
    count: number;
  }[];
}

