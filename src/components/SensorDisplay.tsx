import React from 'react';
import { Thermometer, Droplets } from 'lucide-react';
import type { SensorData } from '../types';

interface Props {
  data: SensorData;
}

export function SensorDisplay({ data }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-3">
          <Thermometer className="w-6 h-6 text-red-500" />
          <h3 className="text-gray-600">Temperature</h3>
        </div>
        <p className="text-3xl font-bold mt-2">{data.temperature}°C</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-3">
          <Droplets className="w-6 h-6 text-blue-500" />
          <h3 className="text-gray-600">Humidity</h3>
        </div>
        <p className="text-3xl font-bold mt-2">{data.humidity}%</p>
      </div>
    </div>
  );
}