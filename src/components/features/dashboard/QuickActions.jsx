// src/components/features/dashboard/QuickActions.jsx
import { Scan, Truck, Gift, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const actions = [
  {
    id: '/scanner',
    title: 'Scan',
    subtitle: 'Dapatkan poin',
    icon: Scan,
    variant: 'ghost',
    color: 'emerald',
  },
  {
    id: '/pickup',
    title: 'Pickup',
    subtitle: 'Jadwalkan',
    icon: Truck,
    variant: 'ghost',
    color: 'blue',
  },
  {
    id: '/rewards',
    title: 'Hadiah',
    subtitle: 'Tukar poin',
    icon: Gift,
    variant: 'ghost',
    color: 'amber',
  },
  {
    id: '/map',
    title: 'Peta',
    subtitle: 'Bank sampah',
    icon: MapPin,
    variant: 'ghost',
    color: 'indigo',
  },
];

const colorClasses = {
  emerald: {
    primary: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25',
    ghost: 'text-emerald-600 hover:bg-emerald-50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  blue: {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/25',
    ghost: 'text-blue-600 hover:bg-blue-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  amber: {
    primary: 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/25',
    ghost: 'text-amber-600 hover:bg-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  indigo: {
    primary: 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-500/25',
    ghost: 'text-indigo-600 hover:bg-indigo-50',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
};

export default function QuickActions() {
    const navigate = useNavigate();
  return (
    <div className="mb-8">
      <h2 className="sr-only">Aksi Cepat</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {actions.map((action) => {
          const colors = colorClasses[action.color];
          const isPrimary = action.variant === 'primary';
          const Icon = action.icon;
          
          return (
            <button
              key={action.id}
              onClick={() => navigate(action.id)}
              className={`
                group relative overflow-hidden
                flex flex-col items-center justify-center
                p-4 md:p-5 rounded-2xl
                transition-all duration-200
                ${isPrimary 
                  ? `${colors.primary} shadow-lg hover:shadow-xl` 
                  : `${colors.ghost} bg-white border border-gray-200 hover:border-${action.color}-300`
                }
                hover:scale-[1.02] active:scale-[0.98]
              `}
            >
              {/* Background effect untuk primary button */}
              {isPrimary && (
                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-50"></div>
              )}
              
              {/* Icon */}
              <div className={`
                p-3 rounded-xl mb-3 md:mb-4
                ${isPrimary ? 'bg-white/20' : colors.iconBg}
                group-hover:scale-110 transition-transform duration-200
              `}>
                <Icon className={`
                  w-6 h-6 md:w-7 md:h-7
                  ${isPrimary ? 'text-white' : colors.iconColor}
                `} />
              </div>
              
              {/* Text Content */}
              <div className="text-center">
                <div className={`
                  font-semibold text-sm md:text-base
                  ${isPrimary ? 'text-white' : `text-${action.color}-700`}
                `}>
                  {action.title}
                </div>
                <div className={`
                  text-xs md:text-sm mt-1
                  ${isPrimary ? 'text-white/90' : 'text-gray-600'}
                `}>
                  {action.subtitle}
                </div>
              </div>
              
              {/* Hover indicator */}
              <div className={`
                absolute bottom-0 left-0 right-0 h-1
                transform scale-x-0 group-hover:scale-x-100
                transition-transform duration-200
                ${isPrimary ? 'bg-white/50' : `bg-${action.color}-500`}
              `}></div>
            </button>
          );
        })}
      </div>
    </div>
  );
}