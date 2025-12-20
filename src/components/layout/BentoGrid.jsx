// src/components/layout/BentoGrid.jsx
import { cn } from '../../utils';

export default function BentoGrid({ 
  children, 
  className = '',
  columns = 3,
  gap = 6,
  ...props 
}) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  const gapClasses = {
    2: 'gap-2',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8'
  };

  return (
    <div
      className={cn(
        'grid auto-rows-auto',
        gridClasses[columns],
        gapClasses[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}