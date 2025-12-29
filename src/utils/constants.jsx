// src/utils/constants.js
export const COLORS = {
  emerald: '#10B981',
  teal: '#06B6D4',
  slate: '#F8FAFC',
  gold: '#D4AF37',
  orange: '#F59E0B',
  red: '#EF4444',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827'
  }
};

export const TYPOGRAPHY = {
  primary: "'Plus Jakarta Sans', sans-serif",
  secondary: "'Poppins', sans-serif"
};

export const BREAKPOINTS = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px'
};

export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  SCANNER: '/scanner',
  MAP: '/map',
  PICKUP: '/pickup',
  REWARDS: '/rewards',
  ADMIN: '/admin'
};

export const WASTE_TYPES = {
  PLASTIC: {
    name: 'Plastik',
    color: '#3B82F6',
    description: 'Material sintetik yang membutuhkan waktu lama untuk terurai'
  },
  PAPER: {
    name: 'Kertas',
    color: '#10B981',
    description: 'Material selulosa yang mudah didaur ulang'
  },
  METAL: {
    name: 'Logam',
    color: '#F59E0B',
    description: 'Material konduktif dengan nilai daur ulang tinggi'
  },
  GLASS: {
    name: 'Kaca',
    color: '#8B5CF6',
    description: 'Material inert yang 100% bisa didaur ulang'
  },
  ORGANIC: {
    name: 'Organik',
    color: '#EF4444',
    description: 'Material biodegradable untuk kompos'
  }
};