// src/utils/index.js
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Export other utils
export * from './constants';
export * from './formatters';
export * from './calculations';