// src/components/features/dashboard/StatsCard.jsx
import { Card } from '../../ui';
import { cn } from '../../../utils';

const colorConfig = {
  emerald: {
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    changeColor: 'text-emerald-600',
  },
  amber: {
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    changeColor: 'text-amber-600',
  },
  blue: {
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    changeColor: 'text-blue-600',
  },
};

export default function StatsCard({ title, value, change, icon, color = 'emerald' }) {
  const colors = colorConfig[color] || colorConfig.emerald;

  return (
    <Card className={`p-6 rounded-3xl ${colors.bg}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          <p className={cn("text-sm font-medium mt-1", colors.changeColor)}>
            {change}
          </p>
        </div>
        <div className={`p-3 rounded-xl ${colors.iconBg}`}>
          <div className={colors.iconColor}>{icon}</div>
        </div>
      </div>
    </Card>
  );
}