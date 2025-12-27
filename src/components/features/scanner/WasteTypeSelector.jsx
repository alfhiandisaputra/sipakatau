// src/components/features/scanner/WasteTypeSelector.jsx
import { WASTE_TYPES } from '../../../utils/constants';
import { Recycle, Package, FileText, HardDrive, Leaf } from 'lucide-react';
import { cn } from '../../../utils';

const wasteTypeIcons = {
  PLASTIC: Package,
  PAPER: FileText,
  METAL: HardDrive,
  GLASS: Package,
  ORGANIC: Leaf
};

const WasteTypeSelector = ({ selectedType, onSelect, className }) => {
  const wasteTypes = Object.entries(WASTE_TYPES);

  return (
    <div className={cn("rounded-3xl p-6 bg-white border border-gray-200", className)}>
      <h3 className="text-xl font-bold text-gray-900 mb-6">Pilih Jenis Sampah</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {wasteTypes.map(([key, type]) => {
          const Icon = wasteTypeIcons[key] || Recycle;
          const isSelected = selectedType === key;
          
          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={cn(
                "p-4 rounded-2xl border-2 transition-all text-left",
                isSelected 
                  ? "border-emerald-500 bg-emerald-50 shadow-sm" 
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              )}
              style={isSelected ? { borderColor: type.color } : {}}
            >
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="p-2 rounded-lg"
                  style={{ 
                    backgroundColor: isSelected ? `${type.color}20` : 'bg-gray-100',
                    color: isSelected ? type.color : '#6B7280'
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-semibold text-gray-900">{type.name}</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Poin/kg:</span>
                  <span className="font-bold" style={{ color: type.color }}>
                    {type.pointsPerKg}
                  </span>
                </div>
                
                {isSelected && (
                  <div className="text-xs text-gray-500 mt-2">
                    Klik untuk memilih
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      
      <p className="text-sm text-gray-500 mt-6 text-center">
        Pilih jenis sampah yang sesuai untuk mendapatkan poin yang tepat
      </p>
    </div>
  );
};

export default WasteTypeSelector;