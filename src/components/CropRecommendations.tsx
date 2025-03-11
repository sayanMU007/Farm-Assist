import React from 'react';
import { Plane as Plant, TrendingUp } from 'lucide-react';
import type { CropRecommendation } from '../types';

interface Props {
  recommendations: CropRecommendation[];
}

export function CropRecommendations({ recommendations }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <Plant className="w-6 h-6 text-green-500" />
        <h2 className="text-xl font-semibold">Recommended Crops</h2>
      </div>
      
      <div className="space-y-4">
        {recommendations.map((crop, index) => (
          <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">{crop.name}</h3>
                <p className="text-sm text-gray-600">Expected Yield: {crop.expectedYield}</p>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="font-medium">{crop.confidence}%</span>
              </div>
            </div>
            
            <div className="mt-2 text-sm text-gray-500">
              <p>Ideal Temperature: {crop.idealConditions.temperature}</p>
              <p>Ideal Humidity: {crop.idealConditions.humidity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}