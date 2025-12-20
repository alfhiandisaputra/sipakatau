// src/components/ui/Progress.jsx
import { cn } from '../../utils/index';

export default function Progress({ 
  value = 0, 
  max = 100,
  size = 'md',
  showLabel = false,
  labelPosition = 'right',
  className = '',
  ...props 
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  };

  return (
    <div className={cn('space-y-2', className)} {...props}>
      {showLabel && labelPosition === 'top' && (
        <div className="flex justify-between text-sm text-gray-600">
          <span>{Math.round(percentage)}%</span>
          <span>{value} / {max}</span>
        </div>
      )}
      
      <div
        className={cn(
          'w-full bg-gray-200 rounded-full overflow-hidden',
          sizeClasses[size]
        )}
      >
        <div
          className="h-full bg-linear-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {showLabel && labelPosition === 'bottom' && (
        <div className="flex justify-between text-sm text-gray-600">
          <span>{Math.round(percentage)}%</span>
          <span>{value} / {max}</span>
        </div>
      )}
    </div>
  );
}