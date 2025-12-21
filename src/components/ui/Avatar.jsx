// src/components/ui/Avatar.jsx
import { cn } from '../../utils';
import { User } from 'lucide-react';
import { useState } from 'react';

export default function Avatar({ 
  src,
  alt = 'User avatar',
  size = 'md',
  className = '',
  fallback = 'U',
  showBadge = false,
  badgeColor = 'emerald',
  onClick,
  ...props 
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-20 h-20 text-lg',
    '2xl': 'w-24 h-24 text-xl'
  };

  const badgeColors = {
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    gray: 'bg-gray-400'
  };

  const getInitials = (name) => {
    if (!name || name === 'U') return fallback;
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const renderContent = () => {
    if (src && !imageError) {
      return (
        <>
          <img 
            src={src} 
            alt={alt} 
            className={cn(
              "w-full h-full object-cover transition-opacity duration-200",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse bg-gray-200 rounded-full w-full h-full"></div>
            </div>
          )}
        </>
      );
    }

    return (
      <div className="flex items-center justify-center w-full h-full">
        {getInitials(fallback) || <User className="w-1/2 h-1/2" />}
      </div>
    );
  };

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          'rounded-full overflow-hidden',
          'flex items-center justify-center',
          'bg-linear-to-br from-emerald-500 to-teal-500',
          'text-white font-semibold',
          'relative transition-all duration-200',
          onClick && 'cursor-pointer hover:scale-105 active:scale-95',
          sizeClasses[size],
          className
        )}
        onClick={onClick}
        {...props}
      >
        <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-50"></div>
        {renderContent()}
      </div>
      
      {showBadge && (
        <div className={cn(
          'absolute bottom-0 right-0',
          'w-3 h-3 rounded-full border-2 border-white',
          badgeColors[badgeColor] || badgeColors.emerald
        )} />
      )}
    </div>
  );
}