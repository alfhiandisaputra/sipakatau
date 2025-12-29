// src/components/features/map/WasteCategoryFilter.jsx
import { 
  Trash2,
  Newspaper,
  Battery,
  Leaf,
  Wine,
  HardDrive,
  Filter
} from 'lucide-react';
import { Card } from '../../ui';

export default function WasteCategoryFilter({ 
  selectedCategories, 
  onCategoryToggle 
}) {
  const categories = [
    { id: 'all', label: 'Semua', icon: Filter, color: 'bg-gray-100 text-gray-700' },
    { id: 'plastic', label: 'Plastik', icon: Wine, color: 'bg-blue-100 text-blue-700' },
    { id: 'paper', label: 'Kertas', icon: Newspaper, color: 'bg-amber-100 text-amber-700' },
    { id: 'metal', label: 'Logam', icon: HardDrive, color: 'bg-gray-100 text-gray-700' },
    { id: 'organic', label: 'Organik', icon: Leaf, color: 'bg-green-100 text-green-700' },
    { id: 'electronic', label: 'Elektronik', icon: Battery, color: 'bg-purple-100 text-purple-700' },
    { id: 'mixed', label: 'Campuran', icon: Trash2, color: 'bg-orange-100 text-orange-700' },
  ];

  return (
    <Card className="p-6 rounded-3xl">
      <h3 className="font-bold text-gray-900 mb-4">Filter Jenis Sampah</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryToggle(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium transition-all ${
                selectedCategories.includes(category.id) 
                  ? `${category.color} ring-2 ring-offset-2 ring-opacity-50` 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {category.label}
            </button>
          );
        })}
      </div>
    </Card>
  );
}