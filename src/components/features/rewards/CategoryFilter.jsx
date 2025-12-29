// src/components/features/rewards/CategoryFilter.jsx
import { Button } from '../../ui';
import { Smartphone, ShoppingBag, Tag, Gift } from 'lucide-react';

const categoryIcons = {
  'Semua': Gift,
  'Voucher Digital': Smartphone,
  'Sembako': ShoppingBag,
  'Diskon Lokal': Tag,
};

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) {
  const IconComponent = categoryIcons[selectedCategory] || Gift;

  return (
    <div className="mb-8 overflow-x-auto pb-2 no-scrollbar">
      <div className="flex flex-nowrap md:flex-wrap gap-2 md:gap-3 min-w-max md:min-w-0">
        {categories.map((category) => {
          const Icon = categoryIcons[category];
          return (
            <Button
              key={category}
              onClick={() => onSelectCategory(category)}
              variant={selectedCategory === category ? 'primary' : 'outline'}
              className={`rounded-2xl px-4 md:px-6 py-4 md:py-5 text-sm transition-all whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg border-0'
                  : 'border-2 border-gray-200 hover:border-emerald-500 text-gray-700 bg-white'
              }`}
            >
              {Icon && <Icon className="w-4 h-4 mr-2" />}
              {category}
            </Button>
          );
        })}
      </div>
    </div>
  );
}