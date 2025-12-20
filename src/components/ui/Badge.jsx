// src/components/ui/Badge.jsx
import { cn } from '../../utils';

const Badge = ({ 
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props 
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-emerald-100 text-emerald-800',
    secondary: 'bg-teal-100 text-teal-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    gold: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span
      className={cn(
        'rounded-full font-medium inline-flex items-center',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;