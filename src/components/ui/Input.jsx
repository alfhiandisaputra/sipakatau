// src/components/ui/Input.jsx
import { cn } from '../../utils';

export default function Input({
  label,
  error,
  helperText,
  className = '',
  size = 'md',
  type = 'text',
  ...props
}) {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        className={cn(
          'w-full rounded-2xl border border-gray-300 bg-white',
          'focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20',
          'transition-colors duration-200 outline-none',
          'placeholder:text-gray-400',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
          sizeClasses[size],
          className
        )}
        {...props}
      />
      {helperText && (
        <p className={cn(
          'text-sm',
          error ? 'text-red-600' : 'text-gray-500'
        )}>
          {helperText}
        </p>
      )}
    </div>
  );
}