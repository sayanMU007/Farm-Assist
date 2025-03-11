export interface SensorData {
  temperature: number;
  humidity: number;
  timestamp: string;
}

export interface CropRecommendation {
  name: string;
  confidence: number;
  expectedYield: string;
  idealConditions: {
    temperature: string;
    humidity: string;
  };
}