// src/data/mockRewards.js
export const mockRewards = [
  { 
    id: 1, 
    name: 'Voucher GoPay 50K', 
    points: 5000, 
    category: 'Voucher Digital', 
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=75', 
    available: true,
    description: 'Voucher GoPay senilai Rp 50.000',
    expiry: '2025-12-31',
    stock: 50
  },
  { 
    id: 2, 
    name: 'Pulsa 100K', 
    points: 8000, 
    category: 'Voucher Digital', 
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=600&q=75', 
    available: true,
    description: 'Pulsa semua operator senilai Rp 100.000',
    expiry: '2025-12-31',
    stock: 30
  },
  { 
    id: 3, 
    name: 'Beras Premium 5Kg', 
    points: 12000, 
    category: 'Sembako', 
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=75', 
    available: true,
    description: 'Beras premium kualitas terbaik',
    expiry: '2025-12-31',
    stock: 20
  },
  { 
    id: 4, 
    name: 'Minyak Goreng 2L', 
    points: 6000, 
    category: 'Sembako', 
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=75', 
    available: true,
    description: 'Minyak goreng kemasan 2 liter',
    expiry: '2025-12-31',
    stock: 40
  },
  { 
    id: 5, 
    name: 'Voucher Tokopedia 100K', 
    points: 9000, 
    category: 'Voucher Digital', 
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=75', 
    available: true,
    description: 'Voucher belanja Tokopedia senilai Rp 100.000',
    expiry: '2025-12-31',
    stock: 25
  },
  { 
    id: 6, 
    name: 'Diskon 20% Restoran Lokal', 
    points: 3000, 
    category: 'Diskon Lokal', 
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=75', 
    available: true,
    description: 'Diskon 20% untuk restoran mitra di Soppeng',
    expiry: '2025-12-31',
    stock: 100
  },
  { 
    id: 7, 
    name: 'Gula Pasir 1Kg', 
    points: 4000, 
    category: 'Sembako', 
    image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?auto=format&fit=crop&w=600&q=75', 
    available: true,
    description: 'Gula pasir kemasan 1 kg',
    expiry: '2025-12-31',
    stock: 35
  },
  { 
    id: 8, 
    name: 'Voucher OVO 75K', 
    points: 7000, 
    category: 'Voucher Digital', 
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=75', 
    available: true,
    description: 'Voucher OVO senilai Rp 75.000',
    expiry: '2025-12-31',
    stock: 15
  },
  { 
    id: 9, 
    name: 'Teh Premium 250gr', 
    points: 5500, 
    category: 'Sembako', 
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=75', 
    available: true,
    description: 'Teh celup premium kemasan 250 gram',
    expiry: '2025-12-31',
    stock: 25
  },
];

export const rewardCategories = [
  { id: 'all', name: 'Semua', icon: 'Gift' },
  { id: 'voucher-digital', name: 'Voucher Digital', icon: 'Smartphone' },
  { id: 'sembako', name: 'Sembako', icon: 'ShoppingBag' },
  { id: 'diskon-lokal', name: 'Diskon Lokal', icon: 'Tag' },
];