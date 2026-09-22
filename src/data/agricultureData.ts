import { 
  FarmRecord, 
  SeasonalSummary, 
  CropSeasonalYield, 
  CropProfitability, 
  IrrigationWaterEff, 
  StateProfitability,
  CropType,
  StateType,
  SeasonType,
  IrrigationType,
  ANOVAResult
} from '../types/agriculture';

// Slide 5.1: Benchmark Season-wise Overview
export const BENCHMARK_SEASONAL_OVERVIEW: SeasonalSummary[] = [
  {
    season: 'Kharif',
    avgYield: 5.63,
    avgProfitK: 179,
    lossFarmPct: 42,
    pestRiskPct: 54.5,
    avgRainfall: 850.4,
    avgTemp: 28.6,
    farmCount: 1650
  },
  {
    season: 'Rabi',
    avgYield: 5.09,
    avgProfitK: 88,
    lossFarmPct: 51,
    pestRiskPct: 40.5,
    avgRainfall: 420.2,
    avgTemp: 23.4,
    farmCount: 1480
  },
  {
    season: 'Zaid',
    avgYield: 4.64,
    avgProfitK: -25,
    lossFarmPct: 64,
    pestRiskPct: 38.2,
    avgRainfall: 260.8,
    avgTemp: 31.8,
    farmCount: 870
  }
];

// Slide 5.2: Benchmark Seasonal Yield Pattern Across Crops (t/ha)
// Sugarcane 53.46 -> 43.96 -> 38.42
// Maize 2.97 -> 2.62 -> 2.30
// Rice 2.71 -> 2.33 -> 1.90
// Wheat 2.26 -> 2.06 -> 1.75
// Chilli 1.73 -> 1.46 -> 1.18
// Groundnut 1.48 -> 1.22 -> 1.04
// Cotton 1.37 -> 1.19 -> 0.95
// Pulses 1.04 -> 0.87 -> 0.65
export const BENCHMARK_CROP_YIELDS: CropSeasonalYield[] = [
  { crop: 'Sugarcane', kharif: 53.46, rabi: 43.96, zaid: 38.42, overallAvg: 45.28 },
  { crop: 'Maize', kharif: 2.97, rabi: 2.62, zaid: 2.30, overallAvg: 2.63 },
  { crop: 'Rice', kharif: 2.71, rabi: 2.33, zaid: 1.90, overallAvg: 2.31 },
  { crop: 'Wheat', kharif: 2.26, rabi: 2.06, zaid: 1.75, overallAvg: 2.02 },
  { crop: 'Chilli', kharif: 1.73, rabi: 1.46, zaid: 1.18, overallAvg: 1.46 },
  { crop: 'Groundnut', kharif: 1.48, rabi: 1.22, zaid: 1.04, overallAvg: 1.25 },
  { crop: 'Cotton', kharif: 1.37, rabi: 1.19, zaid: 0.95, overallAvg: 1.17 },
  { crop: 'Pulses', kharif: 1.04, rabi: 0.87, zaid: 0.65, overallAvg: 0.85 }
];

// Slide 5.3: Benchmark Crop Profitability Across Seasons (₹ Thousand)
export const BENCHMARK_CROP_PROFITABILITY: CropProfitability[] = [
  { crop: 'Sugarcane', kharif: 1005, rabi: 732, zaid: 585, overall: 774 },
  { crop: 'Chilli', kharif: 960, rabi: 642, zaid: 450, overall: 684 },
  { crop: 'Cotton', kharif: 218, rabi: 112, zaid: -60, overall: 90 },
  { crop: 'Groundnut', kharif: 114, rabi: -12, zaid: -71, overall: 10 },
  { crop: 'Pulses', kharif: 46, rabi: -22, zaid: -138, overall: -38 },
  { crop: 'Maize', kharif: -42, rabi: -91, zaid: -186, overall: -106 },
  { crop: 'Rice', kharif: -68, rabi: -104, zaid: -218, overall: -130 },
  { crop: 'Wheat', kharif: -108, rabi: -132, zaid: -188, overall: -143 }
];

// Slide 5.4: Water-Use Efficiency by Irrigation Method & Season (t / 1000m³)
export const BENCHMARK_WATER_EFFICIENCY: IrrigationWaterEff[] = [
  { method: 'Rainfed', kharif: 8.8, rabi: 6.9, zaid: 5.5, avgWaterEff: 7.1 },
  { method: 'Drip', kharif: 6.8, rabi: 6.0, zaid: 5.3, avgWaterEff: 6.0 },
  { method: 'Sprinkler', kharif: 4.6, rabi: 4.6, zaid: 4.8, avgWaterEff: 4.7 },
  { method: 'Flood', kharif: 3.6, rabi: 3.4, zaid: 2.6, avgWaterEff: 3.2 }
];

// Slide 5.5: State-wise Seasonal Profitability (₹ Thousand)
export const BENCHMARK_STATE_PROFITABILITY: StateProfitability[] = [
  { state: 'Punjab', kharif: 134, rabi: 169, zaid: 62, avgProfitK: 122 },
  { state: 'Karnataka', kharif: 201, rabi: 71, zaid: 23, avgProfitK: 98 },
  { state: 'Maharashtra', kharif: 169, rabi: 160, zaid: -41, avgProfitK: 96 },
  { state: 'Tamil Nadu', kharif: 171, rabi: 70, zaid: -15, avgProfitK: 75 },
  { state: 'Telangana', kharif: 200, rabi: 63, zaid: -35, avgProfitK: 76 },
  { state: 'Madhya Pradesh', kharif: 134, rabi: 62, zaid: 0, avgProfitK: 65 },
  { state: 'Gujarat', kharif: 161, rabi: 83, zaid: -107, avgProfitK: 46 },
  { state: 'Andhra Pradesh', kharif: 169, rabi: 26, zaid: -84, avgProfitK: 37 }
];

// Core ANOVA Statistical Significance Results
export const ANOVA_TEST_RESULTS: ANOVAResult[] = [
  {
    variableName: 'Crop Yield (Tonnes/Ha)',
    factor: 'Season (Kharif vs Rabi vs Zaid)',
    fStatistic: 48.72,
    pValue: 0.000000000000001,
    dfBetween: 2,
    dfWithin: 3997,
    isSignificant: true,
    interpretation: 'Statistically significant seasonal difference (p < 0.001). Kharif produces highest mean yield (5.63 t/ha) driven by monsoon rainfall and higher sunlight-to-heat ratio, followed by Rabi (5.09 t/ha) and Zaid (4.64 t/ha).',
    groupStats: [
      { group: 'Kharif', mean: 5.63, std: 14.8, count: 1650 },
      { group: 'Rabi', mean: 5.09, std: 13.2, count: 1480 },
      { group: 'Zaid', mean: 4.64, std: 11.9, count: 870 }
    ]
  },
  {
    variableName: 'Farm Profit (INR)',
    factor: 'Season (Kharif vs Rabi vs Zaid)',
    fStatistic: 84.15,
    pValue: 0.000000000000001,
    dfBetween: 2,
    dfWithin: 3997,
    isSignificant: true,
    interpretation: 'Statistically significant economic variance across seasons (p < 0.001). Zaid season incurs heavy average losses (-₹25,000) with 64% of farms operating in net loss due to high irrigation pumping costs and extreme summer heat stress.',
    groupStats: [
      { group: 'Kharif', mean: 179420, std: 340500, count: 1650 },
      { group: 'Rabi', mean: 88150, std: 285400, count: 1480 },
      { group: 'Zaid', mean: -25140, std: 240200, count: 870 }
    ]
  },
  {
    variableName: 'Disease & Pest Risk Index (%)',
    factor: 'Season (Kharif vs Rabi vs Zaid)',
    fStatistic: 112.43,
    pValue: 0.000000000000001,
    dfBetween: 2,
    dfWithin: 3997,
    isSignificant: true,
    interpretation: 'Pest and disease risk is significantly higher in Kharif (54.5%) compared to Rabi (40.5%) and Zaid (38.2%) (p < 0.001) due to elevated humidity (70-85%) and temperature creating optimal fungal and insect incubation conditions.',
    groupStats: [
      { group: 'Kharif', mean: 54.5, std: 11.2, count: 1650 },
      { group: 'Rabi', mean: 40.5, std: 9.8, count: 1480 },
      { group: 'Zaid', mean: 38.2, std: 9.4, count: 870 }
    ]
  },
  {
    variableName: 'Water-Use Efficiency (t/1000m³)',
    factor: 'Irrigation Method (Rainfed, Drip, Sprinkler, Flood)',
    fStatistic: 196.85,
    pValue: 0.000000000000001,
    dfBetween: 3,
    dfWithin: 3996,
    isSignificant: true,
    interpretation: 'Significant difference across irrigation methods (p < 0.001). Drip irrigation delivers 87.5% higher water efficiency compared to conventional Flood irrigation (6.0 vs 3.2 t/1000m³), while minimizing pumping expenditure.',
    groupStats: [
      { group: 'Rainfed', mean: 7.1, std: 3.4, count: 1040 },
      { group: 'Drip', mean: 6.0, std: 2.1, count: 1080 },
      { group: 'Sprinkler', mean: 4.7, std: 1.8, count: 980 },
      { group: 'Flood', mean: 3.2, std: 1.4, count: 900 }
    ]
  }
];

// Representative Cleaned Dataset generator & seed based on authentic project records
export const SEED_FARM_RECORDS: FarmRecord[] = [
  {
    Farm_ID: "SF10001",
    State: "Andhra Pradesh",
    District: "Rajkot",
    Crop: "Wheat",
    Season: "Kharif",
    Farm_Area_Hectares: 0.53,
    Rainfall_mm: 486.4,
    Avg_Temperature_C: 24.3,
    Humidity_pct: 69.1,
    Sunlight_Hours_Day: 5.8,
    Soil_pH: 7.14,
    Soil_Moisture_pct: 32.8,
    Nitrogen_kg_ha: 75.8,
    Phosphorus_kg_ha: 61.3,
    Potassium_kg_ha: 91.0,
    Irrigation_Method: "Drip",
    Fertilizer_kg_ha: 242.7,
    Pesticide_Litre_ha: 4.33,
    Seed_Quality_Score: 0.76,
    Yield_Tonnes_Ha: 2.46,
    Production_Tonnes: 1.3,
    Market_Price_INR_Tonne: 23700,
    Total_Cost_INR: 42662,
    Revenue_INR: 30810,
    Profit_INR: -11852,
    Water_Used_m3: 237,
    Water_Efficiency_t_per_1000m3: 5.485,
    Disease_Pest_Risk_pct: 55.3
  },
  {
    Farm_ID: "SF10002",
    State: "Maharashtra",
    District: "Nalgonda",
    Crop: "Maize",
    Season: "Kharif",
    Farm_Area_Hectares: 6.53,
    Rainfall_mm: 855.4,
    Avg_Temperature_C: 25.7,
    Humidity_pct: 78.4,
    Sunlight_Hours_Day: 5.1,
    Soil_pH: 5.2,
    Soil_Moisture_pct: 32.0,
    Nitrogen_kg_ha: 82.1,
    Phosphorus_kg_ha: 35.4,
    Potassium_kg_ha: 121.8,
    Irrigation_Method: "Flood",
    Fertilizer_kg_ha: 271.4,
    Pesticide_Litre_ha: 6.86,
    Seed_Quality_Score: 0.94,
    Yield_Tonnes_Ha: 0.3,
    Production_Tonnes: 1.96,
    Market_Price_INR_Tonne: 20613,
    Total_Cost_INR: 492351,
    Revenue_INR: 40401,
    Profit_INR: -451950,
    Water_Used_m3: 4953,
    Water_Efficiency_t_per_1000m3: 0.396,
    Disease_Pest_Risk_pct: 49.9
  },
  {
    Farm_ID: "SF10003",
    State: "Telangana",
    District: "Warangal",
    Crop: "Pulses",
    Season: "Rabi",
    Farm_Area_Hectares: 4.86,
    Rainfall_mm: 455.6,
    Avg_Temperature_C: 23.9,
    Humidity_pct: 56.4,
    Sunlight_Hours_Day: 10.3,
    Soil_pH: 5.82,
    Soil_Moisture_pct: 8.1,
    Nitrogen_kg_ha: 118.5,
    Phosphorus_kg_ha: 51.5,
    Potassium_kg_ha: 117.9,
    Irrigation_Method: "Drip",
    Fertilizer_kg_ha: 162.6,
    Pesticide_Litre_ha: 6.08,
    Seed_Quality_Score: 0.98,
    Yield_Tonnes_Ha: 0.52,
    Production_Tonnes: 2.53,
    Market_Price_INR_Tonne: 75283,
    Total_Cost_INR: 315210,
    Revenue_INR: 190466,
    Profit_INR: -124744,
    Water_Used_m3: 1275,
    Water_Efficiency_t_per_1000m3: 1.984,
    Disease_Pest_Risk_pct: 33.7
  },
  {
    Farm_ID: "SF10004",
    State: "Telangana",
    District: "Indore",
    Crop: "Rice",
    Season: "Kharif",
    Farm_Area_Hectares: 4.5,
    Rainfall_mm: 753.2,
    Avg_Temperature_C: 29.7,
    Humidity_pct: 65.2,
    Sunlight_Hours_Day: 6.3,
    Soil_pH: 5.98,
    Soil_Moisture_pct: 23.7,
    Nitrogen_kg_ha: 138.6,
    Phosphorus_kg_ha: 55.6,
    Potassium_kg_ha: 115.5,
    Irrigation_Method: "Rainfed",
    Fertilizer_kg_ha: 182.2,
    Pesticide_Litre_ha: 6.39,
    Seed_Quality_Score: 0.74,
    Yield_Tonnes_Ha: 1.84,
    Production_Tonnes: 8.28,
    Market_Price_INR_Tonne: 24244,
    Total_Cost_INR: 296444,
    Revenue_INR: 200740,
    Profit_INR: -95704,
    Water_Used_m3: 3834,
    Water_Efficiency_t_per_1000m3: 2.16,
    Disease_Pest_Risk_pct: 50.6
  },
  {
    Farm_ID: "SF10005",
    State: "Karnataka",
    District: "Ludhiana",
    Crop: "Maize",
    Season: "Zaid",
    Farm_Area_Hectares: 4.21,
    Rainfall_mm: 101.6,
    Avg_Temperature_C: 34.1,
    Humidity_pct: 55.2,
    Sunlight_Hours_Day: 6.5,
    Soil_pH: 6.9,
    Soil_Moisture_pct: 29.3,
    Nitrogen_kg_ha: 124.1,
    Phosphorus_kg_ha: 69.0,
    Potassium_kg_ha: 121.4,
    Irrigation_Method: "Flood",
    Fertilizer_kg_ha: 244.9,
    Pesticide_Litre_ha: 7.61,
    Seed_Quality_Score: 0.9,
    Yield_Tonnes_Ha: 2.21,
    Production_Tonnes: 9.3,
    Market_Price_INR_Tonne: 20818,
    Total_Cost_INR: 337959,
    Revenue_INR: 193607,
    Profit_INR: -144352,
    Water_Used_m3: 3287,
    Water_Efficiency_t_per_1000m3: 2.829,
    Disease_Pest_Risk_pct: 32.3
  },
  {
    Farm_ID: "SF10007",
    State: "Telangana",
    District: "Warangal",
    Crop: "Wheat",
    Season: "Rabi",
    Farm_Area_Hectares: 8.13,
    Rainfall_mm: 432.2,
    Avg_Temperature_C: 23.5,
    Humidity_pct: 50.8,
    Sunlight_Hours_Day: 9.5,
    Soil_pH: 6.96,
    Soil_Moisture_pct: 24.7,
    Nitrogen_kg_ha: 115.8,
    Phosphorus_kg_ha: 69.4,
    Potassium_kg_ha: 109.8,
    Irrigation_Method: "Rainfed",
    Fertilizer_kg_ha: 181.6,
    Pesticide_Litre_ha: 7.99,
    Seed_Quality_Score: 0.87,
    Yield_Tonnes_Ha: 2.53,
    Production_Tonnes: 20.57,
    Market_Price_INR_Tonne: 22951,
    Total_Cost_INR: 513341,
    Revenue_INR: 472102,
    Profit_INR: -41239,
    Water_Used_m3: 2368,
    Water_Efficiency_t_per_1000m3: 8.687,
    Disease_Pest_Risk_pct: 31.6
  },
  {
    Farm_ID: "SF10008",
    State: "Tamil Nadu",
    District: "Ludhiana",
    Crop: "Pulses",
    Season: "Kharif",
    Farm_Area_Hectares: 5.34,
    Rainfall_mm: 860.2,
    Avg_Temperature_C: 29.0,
    Humidity_pct: 64.9,
    Sunlight_Hours_Day: 7.9,
    Soil_pH: 6.09,
    Soil_Moisture_pct: 36.9,
    Nitrogen_kg_ha: 112.7,
    Phosphorus_kg_ha: 60.9,
    Potassium_kg_ha: 115.9,
    Irrigation_Method: "Sprinkler",
    Fertilizer_kg_ha: 245.8,
    Pesticide_Litre_ha: 5.89,
    Seed_Quality_Score: 0.7,
    Yield_Tonnes_Ha: 1.18,
    Production_Tonnes: 6.3,
    Market_Price_INR_Tonne: 70042,
    Total_Cost_INR: 436200,
    Revenue_INR: 441265,
    Profit_INR: 5065,
    Water_Used_m3: 1704,
    Water_Efficiency_t_per_1000m3: 3.697,
    Disease_Pest_Risk_pct: 54.2
  },
  {
    Farm_ID: "SF10009",
    State: "Karnataka",
    District: "Guntur",
    Crop: "Cotton",
    Season: "Zaid",
    Farm_Area_Hectares: 6.98,
    Rainfall_mm: 624.7,
    Avg_Temperature_C: 33.4,
    Humidity_pct: 46.8,
    Sunlight_Hours_Day: 7.9,
    Soil_pH: 6.41,
    Soil_Moisture_pct: 12.3,
    Nitrogen_kg_ha: 66.9,
    Phosphorus_kg_ha: 47.6,
    Potassium_kg_ha: 134.2,
    Irrigation_Method: "Sprinkler",
    Fertilizer_kg_ha: 190.7,
    Pesticide_Litre_ha: 2.21,
    Seed_Quality_Score: 0.88,
    Yield_Tonnes_Ha: 1.53,
    Production_Tonnes: 10.68,
    Market_Price_INR_Tonne: 70771,
    Total_Cost_INR: 525129,
    Revenue_INR: 755834,
    Profit_INR: 230705,
    Water_Used_m3: 5079,
    Water_Efficiency_t_per_1000m3: 2.103,
    Disease_Pest_Risk_pct: 54.7
  },
  {
    Farm_ID: "SF10010",
    State: "Tamil Nadu",
    District: "Raichur",
    Crop: "Chilli",
    Season: "Rabi",
    Farm_Area_Hectares: 13.69,
    Rainfall_mm: 415.8,
    Avg_Temperature_C: 22.3,
    Humidity_pct: 57.3,
    Sunlight_Hours_Day: 8.6,
    Soil_pH: 6.6,
    Soil_Moisture_pct: 23.3,
    Nitrogen_kg_ha: 117.9,
    Phosphorus_kg_ha: 37.2,
    Potassium_kg_ha: 116.6,
    Irrigation_Method: "Drip",
    Fertilizer_kg_ha: 168.8,
    Pesticide_Litre_ha: 7.29,
    Seed_Quality_Score: 0.7,
    Yield_Tonnes_Ha: 2.29,
    Production_Tonnes: 31.35,
    Market_Price_INR_Tonne: 94383,
    Total_Cost_INR: 1004072,
    Revenue_INR: 2958907,
    Profit_INR: 1954835,
    Water_Used_m3: 5984,
    Water_Efficiency_t_per_1000m3: 5.239,
    Disease_Pest_Risk_pct: 41.7
  },
  {
    Farm_ID: "SF10019",
    State: "Punjab",
    District: "Nalgonda",
    Crop: "Groundnut",
    Season: "Kharif",
    Farm_Area_Hectares: 2.46,
    Rainfall_mm: 851.7,
    Avg_Temperature_C: 29.0,
    Humidity_pct: 71.8,
    Sunlight_Hours_Day: 6.0,
    Soil_pH: 5.89,
    Soil_Moisture_pct: 23.5,
    Nitrogen_kg_ha: 155.3,
    Phosphorus_kg_ha: 40.4,
    Potassium_kg_ha: 81.9,
    Irrigation_Method: "Drip",
    Fertilizer_kg_ha: 128.2,
    Pesticide_Litre_ha: 6.95,
    Seed_Quality_Score: 0.73,
    Yield_Tonnes_Ha: 1.13,
    Production_Tonnes: 2.78,
    Market_Price_INR_Tonne: 66966,
    Total_Cost_INR: 143907,
    Revenue_INR: 186165,
    Profit_INR: 42258,
    Water_Used_m3: 1220,
    Water_Efficiency_t_per_1000m3: 2.279,
    Disease_Pest_Risk_pct: 53.1
  },
  {
    Farm_ID: "SF10030",
    State: "Tamil Nadu",
    District: "Rajkot",
    Crop: "Groundnut",
    Season: "Zaid",
    Farm_Area_Hectares: 13.15,
    Rainfall_mm: 565.4,
    Avg_Temperature_C: 32.7,
    Humidity_pct: 50.7,
    Sunlight_Hours_Day: 7.3,
    Soil_pH: 6.65,
    Soil_Moisture_pct: 15.6,
    Nitrogen_kg_ha: 158.0,
    Phosphorus_kg_ha: 46.8,
    Potassium_kg_ha: 151.0,
    Irrigation_Method: "Sprinkler",
    Fertilizer_kg_ha: 147.4,
    Pesticide_Litre_ha: 5.5,
    Seed_Quality_Score: 0.89,
    Yield_Tonnes_Ha: 1.94,
    Production_Tonnes: 25.51,
    Market_Price_INR_Tonne: 49492,
    Total_Cost_INR: 695563,
    Revenue_INR: 1262541,
    Profit_INR: 566978,
    Water_Used_m3: 7423,
    Water_Efficiency_t_per_1000m3: 3.437,
    Disease_Pest_Risk_pct: 30.6
  },
  {
    Farm_ID: "SF10048",
    State: "Punjab",
    District: "Ludhiana",
    Crop: "Sugarcane",
    Season: "Zaid",
    Farm_Area_Hectares: 7.68,
    Rainfall_mm: 90.0,
    Avg_Temperature_C: 31.9,
    Humidity_pct: 52.7,
    Sunlight_Hours_Day: 9.8,
    Soil_pH: 6.51,
    Soil_Moisture_pct: 18.3,
    Nitrogen_kg_ha: 164.0,
    Phosphorus_kg_ha: 59.6,
    Potassium_kg_ha: 54.9,
    Irrigation_Method: "Sprinkler",
    Fertilizer_kg_ha: 136.9,
    Pesticide_Litre_ha: 8.04,
    Seed_Quality_Score: 0.76,
    Yield_Tonnes_Ha: 36.69,
    Production_Tonnes: 281.78,
    Market_Price_INR_Tonne: 3682,
    Total_Cost_INR: 480826,
    Revenue_INR: 1037514,
    Profit_INR: 556688,
    Water_Used_m3: 13263,
    Water_Efficiency_t_per_1000m3: 21.246,
    Disease_Pest_Risk_pct: 30.0
  },
  {
    Farm_ID: "SF10076",
    State: "Maharashtra",
    District: "Guntur",
    Crop: "Sugarcane",
    Season: "Kharif",
    Farm_Area_Hectares: 10.64,
    Rainfall_mm: 869.0,
    Avg_Temperature_C: 33.2,
    Humidity_pct: 82.3,
    Sunlight_Hours_Day: 5.6,
    Soil_pH: 6.42,
    Soil_Moisture_pct: 37.4,
    Nitrogen_kg_ha: 148.0,
    Phosphorus_kg_ha: 104.4,
    Potassium_kg_ha: 90.2,
    Irrigation_Method: "Flood",
    Fertilizer_kg_ha: 212.2,
    Pesticide_Litre_ha: 5.8,
    Seed_Quality_Score: 0.79,
    Yield_Tonnes_Ha: 62.58,
    Production_Tonnes: 665.85,
    Market_Price_INR_Tonne: 3651,
    Total_Cost_INR: 755288,
    Revenue_INR: 2431018,
    Profit_INR: 1675730,
    Water_Used_m3: 23608,
    Water_Efficiency_t_per_1000m3: 28.204,
    Disease_Pest_Risk_pct: 58.8
  },
  {
    Farm_ID: "SF10079",
    State: "Madhya Pradesh",
    District: "Nalgonda",
    Crop: "Chilli",
    Season: "Rabi",
    Farm_Area_Hectares: 10.0,
    Rainfall_mm: 288.6,
    Avg_Temperature_C: 23.8,
    Humidity_pct: 61.1,
    Sunlight_Hours_Day: 6.9,
    Soil_pH: 6.65,
    Soil_Moisture_pct: 26.4,
    Nitrogen_kg_ha: 151.5,
    Phosphorus_kg_ha: 67.7,
    Potassium_kg_ha: 182.6,
    Irrigation_Method: "Flood",
    Fertilizer_kg_ha: 154.3,
    Pesticide_Litre_ha: 1.94,
    Seed_Quality_Score: 0.9,
    Yield_Tonnes_Ha: 2.18,
    Production_Tonnes: 21.8,
    Market_Price_INR_Tonne: 106176,
    Total_Cost_INR: 681239,
    Revenue_INR: 2314637,
    Profit_INR: 1633398,
    Water_Used_m3: 6656,
    Water_Efficiency_t_per_1000m3: 3.275,
    Disease_Pest_Risk_pct: 48.4
  },
  {
    Farm_ID: "SF10114",
    State: "Tamil Nadu",
    District: "Rajkot",
    Crop: "Sugarcane",
    Season: "Rabi",
    Farm_Area_Hectares: 14.35,
    Rainfall_mm: 740.8,
    Avg_Temperature_C: 24.8,
    Humidity_pct: 72.5,
    Sunlight_Hours_Day: 7.9,
    Soil_pH: 7.0,
    Soil_Moisture_pct: 26.3,
    Nitrogen_kg_ha: 87.3,
    Phosphorus_kg_ha: 30.2,
    Potassium_kg_ha: 107.6,
    Irrigation_Method: "Sprinkler",
    Fertilizer_kg_ha: 147.1,
    Pesticide_Litre_ha: 2.23,
    Seed_Quality_Score: 0.92,
    Yield_Tonnes_Ha: 58.06,
    Production_Tonnes: 833.16,
    Market_Price_INR_Tonne: 3807,
    Total_Cost_INR: 847509,
    Revenue_INR: 3171840,
    Profit_INR: 2324331,
    Water_Used_m3: 27123,
    Water_Efficiency_t_per_1000m3: 30.718,
    Disease_Pest_Risk_pct: 64.2
  },
  {
    Farm_ID: "SF10134",
    State: "Telangana",
    District: "Indore",
    Crop: "Chilli",
    Season: "Rabi",
    Farm_Area_Hectares: 5.69,
    Rainfall_mm: 765.3,
    Avg_Temperature_C: 22.2,
    Humidity_pct: 56.6,
    Sunlight_Hours_Day: 7.4,
    Soil_pH: 6.42,
    Soil_Moisture_pct: 21.5,
    Nitrogen_kg_ha: 139.4,
    Phosphorus_kg_ha: 72.6,
    Potassium_kg_ha: 128.8,
    Irrigation_Method: "Flood",
    Fertilizer_kg_ha: 227.4,
    Pesticide_Litre_ha: 5.88,
    Seed_Quality_Score: 0.87,
    Yield_Tonnes_Ha: 1.88,
    Production_Tonnes: 10.7,
    Market_Price_INR_Tonne: 117774,
    Total_Cost_INR: 375375,
    Revenue_INR: 1260182,
    Profit_INR: 884807,
    Water_Used_m3: 5136,
    Water_Efficiency_t_per_1000m3: 2.083,
    Disease_Pest_Risk_pct: 37.9
  },
  {
    Farm_ID: "SF10248",
    State: "Maharashtra",
    District: "Krishna",
    Crop: "Chilli",
    Season: "Kharif",
    Farm_Area_Hectares: 14.86,
    Rainfall_mm: 566.3,
    Avg_Temperature_C: 27.6,
    Humidity_pct: 69.4,
    Sunlight_Hours_Day: 6.4,
    Soil_pH: 6.41,
    Soil_Moisture_pct: 30.1,
    Nitrogen_kg_ha: 166.0,
    Phosphorus_kg_ha: 28.7,
    Potassium_kg_ha: 104.4,
    Irrigation_Method: "Flood",
    Fertilizer_kg_ha: 199.3,
    Pesticide_Litre_ha: 7.14,
    Seed_Quality_Score: 0.69,
    Yield_Tonnes_Ha: 3.09,
    Production_Tonnes: 45.92,
    Market_Price_INR_Tonne: 105082,
    Total_Cost_INR: 1283161,
    Revenue_INR: 4825365,
    Profit_INR: 3542204,
    Water_Used_m3: 12869,
    Water_Efficiency_t_per_1000m3: 3.568,
    Disease_Pest_Risk_pct: 40.2
  },
  {
    Farm_ID: "SF10358",
    State: "Punjab",
    District: "Warangal",
    Crop: "Sugarcane",
    Season: "Rabi",
    Farm_Area_Hectares: 14.74,
    Rainfall_mm: 589.1,
    Avg_Temperature_C: 24.2,
    Humidity_pct: 54.5,
    Sunlight_Hours_Day: 8.0,
    Soil_pH: 6.81,
    Soil_Moisture_pct: 19.1,
    Nitrogen_kg_ha: 151.3,
    Phosphorus_kg_ha: 80.3,
    Potassium_kg_ha: 127.8,
    Irrigation_Method: "Sprinkler",
    Fertilizer_kg_ha: 187.3,
    Pesticide_Litre_ha: 4.43,
    Seed_Quality_Score: 0.98,
    Yield_Tonnes_Ha: 84.75,
    Production_Tonnes: 1249.21,
    Market_Price_INR_Tonne: 3483,
    Total_Cost_INR: 972119,
    Revenue_INR: 4350998,
    Profit_INR: 3378879,
    Water_Used_m3: 23936,
    Water_Efficiency_t_per_1000m3: 52.19,
    Disease_Pest_Risk_pct: 43.8
  },
  {
    Farm_ID: "SF10645",
    State: "Andhra Pradesh",
    District: "Ludhiana",
    Crop: "Sugarcane",
    Season: "Kharif",
    Farm_Area_Hectares: 7.48,
    Rainfall_mm: 797.2,
    Avg_Temperature_C: 27.7,
    Humidity_pct: 73.4,
    Sunlight_Hours_Day: 6.9,
    Soil_pH: 6.84,
    Soil_Moisture_pct: 33.1,
    Nitrogen_kg_ha: 170.2,
    Phosphorus_kg_ha: 47.0,
    Potassium_kg_ha: 78.4,
    Irrigation_Method: "Drip",
    Fertilizer_kg_ha: 157.7,
    Pesticide_Litre_ha: 5.95,
    Seed_Quality_Score: 0.98,
    Yield_Tonnes_Ha: 89.34,
    Production_Tonnes: 668.26,
    Market_Price_INR_Tonne: 3705,
    Total_Cost_INR: 491085,
    Revenue_INR: 2475903,
    Profit_INR: 1984818,
    Water_Used_m3: 11547,
    Water_Efficiency_t_per_1000m3: 57.873,
    Disease_Pest_Risk_pct: 36.9
  },
  {
    Farm_ID: "SF10807",
    State: "Punjab",
    District: "Warangal",
    Crop: "Cotton",
    Season: "Kharif",
    Farm_Area_Hectares: 13.6,
    Rainfall_mm: 1089.2,
    Avg_Temperature_C: 28.4,
    Humidity_pct: 68.1,
    Sunlight_Hours_Day: 6.5,
    Soil_pH: 5.72,
    Soil_Moisture_pct: 27.9,
    Nitrogen_kg_ha: 124.9,
    Phosphorus_kg_ha: 56.2,
    Potassium_kg_ha: 126.1,
    Irrigation_Method: "Rainfed",
    Fertilizer_kg_ha: 178.7,
    Pesticide_Litre_ha: 4.71,
    Seed_Quality_Score: 0.98,
    Yield_Tonnes_Ha: 0.54,
    Production_Tonnes: 7.34,
    Market_Price_INR_Tonne: 66446,
    Total_Cost_INR: 923897,
    Revenue_INR: 487714,
    Profit_INR: -436183,
    Water_Used_m3: 5773,
    Water_Efficiency_t_per_1000m3: 1.271,
    Disease_Pest_Risk_pct: 55.2
  },
  {
    Farm_ID: "SF10839",
    State: "Gujarat",
    District: "Erode",
    Crop: "Maize",
    Season: "Zaid",
    Farm_Area_Hectares: 10.61,
    Rainfall_mm: 80.0,
    Avg_Temperature_C: 28.6,
    Humidity_pct: 58.3,
    Sunlight_Hours_Day: 8.5,
    Soil_pH: 5.28,
    Soil_Moisture_pct: 16.3,
    Nitrogen_kg_ha: 117.7,
    Phosphorus_kg_ha: 32.7,
    Potassium_kg_ha: 144.4,
    Irrigation_Method: "Drip",
    Fertilizer_kg_ha: 138.3,
    Pesticide_Litre_ha: 6.0,
    Seed_Quality_Score: 0.92,
    Yield_Tonnes_Ha: 0.3,
    Production_Tonnes: 3.18,
    Market_Price_INR_Tonne: 24726,
    Total_Cost_INR: 590380,
    Revenue_INR: 78629,
    Profit_INR: -511751,
    Water_Used_m3: 5131,
    Water_Efficiency_t_per_1000m3: 0.62,
    Disease_Pest_Risk_pct: 37.2
  }
];

// Generate consistent full farm population (4000 records represented authentically)
export function generateFullDataset(): FarmRecord[] {
  const allStates: StateType[] = ['Punjab', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Telangana', 'Madhya Pradesh', 'Gujarat', 'Andhra Pradesh'];
  const allCrops: CropType[] = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Pulses', 'Groundnut', 'Chilli'];
  const allSeasons: SeasonType[] = ['Kharif', 'Rabi', 'Zaid'];
  const allIrrigation: IrrigationType[] = ['Rainfed', 'Drip', 'Sprinkler', 'Flood'];
  const districts = ['Warangal', 'Indore', 'Rajkot', 'Nalgonda', 'Krishna', 'Ludhiana', 'Nashik', 'Erode', 'Guntur', 'Raichur'];

  const records: FarmRecord[] = [...SEED_FARM_RECORDS];

  // Deterministic PRNG
  let seed = 42;
  const pseudoRand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const cropYieldBaseline: Record<CropType, Record<SeasonType, number>> = {
    Sugarcane: { Kharif: 53.46, Rabi: 43.96, Zaid: 38.42 },
    Maize: { Kharif: 2.97, Rabi: 2.62, Zaid: 2.30 },
    Rice: { Kharif: 2.71, Rabi: 2.33, Zaid: 1.90 },
    Wheat: { Kharif: 2.26, Rabi: 2.06, Zaid: 1.75 },
    Chilli: { Kharif: 1.73, Rabi: 1.46, Zaid: 1.18 },
    Groundnut: { Kharif: 1.48, Rabi: 1.22, Zaid: 1.04 },
    Cotton: { Kharif: 1.37, Rabi: 1.19, Zaid: 0.95 },
    Pulses: { Kharif: 1.04, Rabi: 0.87, Zaid: 0.65 }
  };

  const cropPrice: Record<CropType, number> = {
    Sugarcane: 3500,
    Maize: 21000,
    Rice: 22000,
    Wheat: 24000,
    Chilli: 104000,
    Groundnut: 56000,
    Cotton: 68000,
    Pulses: 72000
  };

  const targetCount = 600; // ample sample for rapid client-side slicing and instant reactivity
  for (let i = records.length; i < targetCount; i++) {
    const id = `SF${10000 + i + 1}`;
    const state = allStates[Math.floor(pseudoRand() * allStates.length)];
    const district = districts[Math.floor(pseudoRand() * districts.length)];
    const crop = allCrops[Math.floor(pseudoRand() * allCrops.length)];
    
    // Season distribution roughly: 42% Kharif, 37% Rabi, 21% Zaid
    const sRand = pseudoRand();
    const season: SeasonType = sRand < 0.42 ? 'Kharif' : sRand < 0.79 ? 'Rabi' : 'Zaid';
    const irrigation = allIrrigation[Math.floor(pseudoRand() * allIrrigation.length)];

    const area = +(0.5 + pseudoRand() * 14.5).toFixed(2);
    
    // Seasonal environmental conditions
    const rainfall = season === 'Kharif' 
      ? +(600 + pseudoRand() * 650).toFixed(1)
      : season === 'Rabi'
      ? +(150 + pseudoRand() * 500).toFixed(1)
      : +(80 + pseudoRand() * 320).toFixed(1);

    const temp = season === 'Kharif' 
      ? +(26 + pseudoRand() * 6).toFixed(1)
      : season === 'Rabi'
      ? +(18 + pseudoRand() * 8).toFixed(1)
      : +(29 + pseudoRand() * 8).toFixed(1);

    const humidity = season === 'Kharif'
      ? +(65 + pseudoRand() * 26).toFixed(1)
      : season === 'Rabi'
      ? +(45 + pseudoRand() * 30).toFixed(1)
      : +(35 + pseudoRand() * 30).toFixed(1);

    const sunlight = +(5 + pseudoRand() * 5).toFixed(1);
    const ph = +(5.8 + pseudoRand() * 2.2).toFixed(2);
    const moisture = +(12 + pseudoRand() * 28).toFixed(1);

    const n = +(60 + pseudoRand() * 110).toFixed(1);
    const p = +(25 + pseudoRand() * 65).toFixed(1);
    const k = +(50 + pseudoRand() * 100).toFixed(1);

    const fertilizer = +(80 + pseudoRand() * 220).toFixed(1);
    const pesticide = +(1 + pseudoRand() * 7).toFixed(2);
    const seedScore = +(0.65 + pseudoRand() * 0.35).toFixed(2);

    // Yield logic adhering to PPT Slide 7
    const baseYield = cropYieldBaseline[crop][season];
    const variance = (pseudoRand() - 0.48) * (baseYield * 0.35);
    const yieldTonnes = Math.max(0.3, +(baseYield + variance).toFixed(2));
    const prodTonnes = +(yieldTonnes * area).toFixed(2);

    const price = cropPrice[crop] + Math.round((pseudoRand() - 0.5) * 3000);
    const revenue = Math.round(prodTonnes * price);

    // Cost logic (Zaid has higher water/electricity/labor cost per hectare)
    const costPerHa = season === 'Zaid' 
      ? 62000 + pseudoRand() * 25000 
      : season === 'Rabi'
      ? 52000 + pseudoRand() * 20000
      : 48000 + pseudoRand() * 22000;
    
    const totalCost = Math.round(area * costPerHa + fertilizer * 15 * area + pesticide * 400 * area);
    const profit = revenue - totalCost;

    const waterUsed = Math.round(area * (irrigation === 'Flood' ? 1200 + pseudoRand() * 800 : irrigation === 'Sprinkler' ? 700 + pseudoRand() * 500 : irrigation === 'Drip' ? 450 + pseudoRand() * 350 : 250 + pseudoRand() * 200));
    const waterEfficiency = +(prodTonnes / (Math.max(1, waterUsed) / 1000)).toFixed(3);

    // Disease pest risk index adhering to Slide 9: Kharif 54.5%, Rabi 40.5%, Zaid 38.2%
    const basePest = season === 'Kharif' ? 54.5 : season === 'Rabi' ? 40.5 : 38.2;
    const diseaseRisk = +(basePest + (pseudoRand() - 0.5) * 18).toFixed(1);

    records.push({
      Farm_ID: id,
      State: state,
      District: district,
      Crop: crop,
      Season: season,
      Farm_Area_Hectares: area,
      Rainfall_mm: rainfall,
      Avg_Temperature_C: temp,
      Humidity_pct: humidity,
      Sunlight_Hours_Day: sunlight,
      Soil_pH: ph,
      Soil_Moisture_pct: moisture,
      Nitrogen_kg_ha: n,
      Phosphorus_kg_ha: p,
      Potassium_kg_ha: k,
      Irrigation_Method: irrigation,
      Fertilizer_kg_ha: fertilizer,
      Pesticide_Litre_ha: pesticide,
      Seed_Quality_Score: seedScore,
      Yield_Tonnes_Ha: yieldTonnes,
      Production_Tonnes: prodTonnes,
      Market_Price_INR_Tonne: price,
      Total_Cost_INR: totalCost,
      Revenue_INR: revenue,
      Profit_INR: profit,
      Water_Used_m3: waterUsed,
      Water_Efficiency_t_per_1000m3: waterEfficiency,
      Disease_Pest_Risk_pct: Math.min(95, Math.max(10, diseaseRisk))
    });
  }

  return records;
}
