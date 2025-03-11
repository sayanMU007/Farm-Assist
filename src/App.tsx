import React, { useState, useEffect } from 'react';
import { Tractor } from 'lucide-react';
import { SensorDisplay } from './components/SensorDisplay';
import { CropRecommendations } from './components/CropRecommendations';
import type { SensorData, CropRecommendation } from './types';

// Simulated data for demonstration
const mockSensorData: SensorData = {
  temperature: 25,
  humidity: 65,
  timestamp: new Date().toISOString()
};

const mockRecommendations: CropRecommendation[] = [
  {
    name: "Rice",
    confidence: 95,
    expectedYield: "5-6 tons/hectare",
    idealConditions: {
      temperature: "24-30°C",
      humidity: "60-80%"
    }
  },
  {
    name: "Maize",
    confidence: 85,
    expectedYield: "8-10 tons/hectare",
    idealConditions: {
      temperature: "20-30°C",
      humidity: "50-80%"
    }
  },
  {
    name: "Soybeans",
    confidence: 75,
    expectedYield: "2.5-3.5 tons/hectare",
    idealConditions: {
      temperature: "20-30°C",
      humidity: "60-70%"
    }
  }
];

function App() {
  const [sensorData, setSensorData] = useState<SensorData>(mockSensorData);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>(mockRecommendations);

  // TODO: Implement actual Bluetooth connection
  useEffect(() => {
    // Simulate receiving data every 5 seconds
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        temperature: prev.temperature + (Math.random() * 2 - 1),
        humidity: Math.max(0, Math.min(100, prev.humidity + (Math.random() * 2 - 1))),
        timestamp: new Date().toISOString()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Tractor className="w-8 h-8 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-800">AgroCar Dashboard</h1>
        </div>

        {/* Last Updated */}
        <p className="text-sm text-gray-500 mb-6">
          Last updated: {new Date(sensorData.timestamp).toLocaleTimeString()}
        </p>

        {/* Sensor Data */}
        <div className="mb-8">
          <SensorDisplay data={sensorData} />
        </div>

        {/* Recommendations */}
        <CropRecommendations recommendations={recommendations} />
      </div>
    </div>
  );
}

export default App;