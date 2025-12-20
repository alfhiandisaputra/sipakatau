// src/components/ui/Avatar.jsx
import { cn } from '../../utils';

export default function Avatar({ 
  src,
  alt = 'User avatar',
  size = 'md',
  className = '',
  fallback = 'U',
  ...props 
}) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-20 h-20 text-lg'
  };

  return (
    <div
      className={cn(
        'rounded-full overflow-hidden',
        'flex items-center justify-center',
        'bg-linear-to-br from-emerald-500 to-teal-500',
        'text-white font-semibold',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.textContent = fallback;
          }}
        />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
}