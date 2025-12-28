// src/components/features/scanner/PointsCalculator.jsx
import { useState } from 'react';
import { Calculator, Scale, TrendingUp, Award } from 'lucide-react';
import { WASTE_TYPES } from '../../../utils/constants';
import { cn } from '../../../utils';

const PointsCalculator = ({ wasteType, onCalculate, className }) => {
  const [weight, setWeight] = useState(1);
  const typeInfo = WASTE_TYPES[wasteType] || WASTE_TYPES.PLASTIC;
  
  const calculatedPoints = Math.round(weight * typeInfo.pointsPerKg);
  
  const weightOptions = [0.5, 1, 2, 5, 10];

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate({
      wasteType,
      weight,
      points: calculatedPoints,
      wasteTypeName: typeInfo.name
    });
  };

  return (
    <div className={cn("rounded-3xl p-6 bg-linear-to-br from-amber-50 to-orange-50 border border-amber-100", className)}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-amber-100">
          <Calculator className="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Kalkulator Poin</h3>
          <p className="text-sm text-gray-600">Hitung poin berdasarkan berat sampah</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Weight Selection */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-2 font-medium text-gray-900">
              <Scale className="w-5 h-5 text-gray-600" />
              Berat Sampah (kg)
            </label>
            <div className="text-2xl font-bold text-gray-900">{weight.toFixed(1)} kg</div>
          </div>
          
          <input
            type="range"
            min="0.1"
            max="20"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
            className="w-full h-3 bg-amber-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
          />
          
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>0.1 kg</span>
            <span>20 kg</span>
          </div>
          
          {/* Quick Weight Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            {weightOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setWeight(option)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                  weight === option
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-amber-100 border border-amber-200'
                )}
              >
                {option} kg
              </button>
            ))}
          </div>
        </div>

        {/* Points Calculation */}
        <div className="bg-white rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100">
                <Award className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Total Poin</div>
                <div className="text-sm text-gray-600">
                  {weight} kg × {typeInfo.pointsPerKg} poin/kg
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-emerald-600">
                {calculatedPoints}
              </div>
              <div className="text-sm text-gray-500">poin</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span>Poin akan ditambahkan ke akun Anda setelah konfirmasi</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
        >
          Konfirmasi {calculatedPoints} Poin
        </button>
        
        <p className="text-center text-sm text-gray-500 mt-4">
          Pastikan sampah sudah sesuai dengan jenis dan berat yang diinput
        </p>
      </form>
    </div>
  );
};

export default PointsCalculator;