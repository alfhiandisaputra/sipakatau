import { WASTE_TYPES } from '../../../utils/constants';
import { Recycle, Package, FileText, HardDrive, Leaf, BookOpen } from 'lucide-react';
import { cn } from '../../../utils';

const wasteTypeIcons = {
  PLASTIC: Package,
  PAPER: FileText,
  METAL: HardDrive,
  GLASS: Package,
  ORGANIC: Leaf
};

const wasteTypeDescriptions = {
  PLASTIC: 'Material sintetik yang membutuhkan waktu ratusan tahun untuk terurai',
  PAPER: 'Material selulosa yang mudah terurai namun boros sumber daya',
  METAL: 'Material konduktif yang bisa didaur ulang tanpa batas',
  GLASS: 'Material inert yang 100% bisa didaur ulang tanpa kehilangan kualitas',
  ORGANIC: 'Material biodegradable yang bisa dikompos menjadi pupuk'
};

const WasteTypeSelector = ({ selectedType, onSelect, className }) => {
  const wasteTypes = Object.entries(WASTE_TYPES);

  return (
    <div className={cn("rounded-3xl p-6 bg-white border border-gray-200", className)}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-blue-100">
          <BookOpen className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Pilih Jenis Sampah untuk Dipelajari</h3>
          <p className="text-sm text-gray-600">Pelajari cara mengelola setiap jenis sampah</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {wasteTypes.map(([key, type]) => {
          const Icon = wasteTypeIcons[key] || Recycle;
          const isSelected = selectedType === key;
          
          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={cn(
                "p-4 rounded-2xl border-2 transition-all text-left hover:shadow-md",
                isSelected 
                  ? "border-emerald-500 bg-emerald-50 shadow-sm" 
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              )}
              style={isSelected ? { borderColor: type.color } : {}}
            >
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="p-3 rounded-lg"
                  style={{ 
                    backgroundColor: isSelected ? `${type.color}20` : 'bg-gray-100',
                    color: isSelected ? type.color : '#6B7280'
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{type.name}</div>
                  <div className="text-xs text-gray-500">Klik untuk pelajari</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  {wasteTypeDescriptions[key]}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Waktu terurai:</span>
                  <span className="font-medium" style={{ color: type.color }}>
                    {key === 'PLASTIC' && '450 tahun'}
                    {key === 'PAPER' && '2-5 bulan'}
                    {key === 'METAL' && '50-200 tahun'}
                    {key === 'GLASS' && '1 juta tahun'}
                    {key === 'ORGANIC' && '2-6 minggu'}
                  </span>
                </div>
              </div>
              
              {isSelected && (
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-emerald-100">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-xs text-emerald-600 font-medium">
                    Terpilih - Pelajari sekarang
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      <p className="text-sm text-gray-500 mt-6 text-center">
        Pilih jenis sampah untuk melihat informasi edukasi lengkap
      </p>
    </div>
  );
};

export default WasteTypeSelector;