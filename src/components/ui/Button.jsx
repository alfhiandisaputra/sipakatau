// src/components/ui/Button.jsx
import { cn } from '../../utils';

export default function Button({ 
  children, 
  onClick, 
  className = '', 
  size = 'md',
  variant = 'primary',
  disabled = false,
  loading = false,
  type = 'button',
  ...props 
}) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-base rounded-2xl',
    lg: 'px-8 py-4 text-lg rounded-3xl',
    xl: 'px-10 py-5 text-xl rounded-3xl'
  };

  const variantClasses = {
    // Tailwind v4: Gunakan background-image untuk gradient
    primary: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25',
    secondary: 'bg-teal-500 hover:bg-teal-600 text-white',
    outline: 'border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-50',
    ghost: 'text-gray-700 hover:bg-gray-100',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    gold: 'bg-[linear-gradient(to_right,#F59E0B,#F97316)] hover:bg-[linear-gradient(to_right,#D97706,#EA580C)] text-white'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-emerald-500/30',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'active:scale-95',
        sizeClasses[size],
        variantClasses[variant],
        loading && 'relative text-transparent',
        className
      )}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {children}
    </button>
  );
}