// src/components/ui/ImageWithFallback.jsx
import { useState } from 'react';
import { cn } from '../../utils';

export default function ImageWithFallback({ 
  src, 
  alt, 
  fallbackSrc = null, 
  className = '', 
  ...props 
}) {
  const [error, setError] = useState(false);
  
  const handleError = () => {
    setError(true);
  };

  const imageSrc = error ? fallbackSrc : src;
  
  if (!imageSrc) {
    return (
      <div className={cn('bg-gray-200 flex items-center justify-center', className)} {...props}>
        <span className="text-gray-500">No image</span>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}