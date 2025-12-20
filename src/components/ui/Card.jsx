// src/components/ui/Card.jsx
import { cn } from '../../utils/index';

export default function Card({ 
  children, 
  className = '',
  variant = 'default',
  hoverable = false,
  padding = 'default',
  ...props 
}) {
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg border border-gray-100',
    glass: 'glass-effect',
    gradient: 'bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  return (
    <div
      className={cn(
        'rounded-3xl transition-all duration-200',
        variantClasses[variant],
        paddingClasses[padding],
        hoverable && 'hover:shadow-xl hover:-translate-y-1 hover:border-emerald-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}