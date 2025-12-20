// src/components/ui/Label.jsx
import { cn } from '../../utils/index';

export default function Label({
  children,
  htmlFor,
  required = false,
  className = '',
  ...props
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'block text-sm font-medium text-gray-700 mb-2',
        required && 'after:content-["*"] after:ml-1 after:text-red-500',
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}