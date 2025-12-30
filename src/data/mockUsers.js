// src/data/mockUsers.js
export const mockUsers = [
  {
    id: 1,
    name: 'Baco Santoso',
    email: 'baco@example.com',
    password: 'password123',
    points: 9000,
    role: 'user',
    avatar: null,
    joinDate: '2024-01-15',
    level: 'Master'
  },
  {
    id: 2,
    name: 'Admin SIPAKATAU',
    email: 'admin@example.com',
    password: 'admin123',
    points: 500,
    role: 'admin',
    avatar: null,
    joinDate: '2023-11-20',
    level: 'Sadar Lingkungan'
  },
  {
    id: 3,
    name: 'Siti Nurhaliza',
    email: 'siti@example.com',
    password: 'password123',
    points: 1250,
    role: 'user',
    avatar: null,
    joinDate: '2024-02-10',
    level: 'Warrior'
  },
  {
    id: 4,
    name: 'Agus Pratama',
    email: 'agus@example.com',
    password: 'password123',
    points: 12000,
    role: 'user',
    avatar: null,
    joinDate: '2024-03-05',
    level: 'Planet Hero'
  },
  {
    id: 5,
    name: 'Dewi Lestari',
    email: 'dewi@example.com',
    password: 'password123',
    points: 980,
    role: 'user',
    avatar: null,
    joinDate: '2024-01-25',
    level: 'Sadar Lingkungan'
  },
  {
    id: 6,
    name: 'Rizky Ramadhan',
    email: 'rizky@example.com',
    password: 'password123',
    points: 420,
    role: 'user',
    avatar: null,
    joinDate: '2024-03-15',
    level: 'Pemula'
  },
  {
    id: 7,
    name: 'Rina Melati',
    email: 'rina@example.com',
    password: 'password123',
    points: 50,
    role: 'user',
    avatar: null,
    joinDate: '2024-03-20',
    level: 'Pemula'
  },
  {
    id: 8,
    name: 'Agus Kadua',
    email: 'guss@example.com',
    password: 'password123',
    points: 5200,
    role: 'user',
    avatar: null,
    joinDate: '2023-12-01',
    level: 'Master'
  }
];


export const validateUser = (email, password) => {
  return mockUsers.find(user => 
    user.email === email && user.password === password
  );
};

export const createUser = (userData) => {
  const newUser = {
    id: mockUsers.length + 1,
    points: 50, 
    role: 'user',
    avatar: null,
    joinDate: new Date().toISOString().split('T')[0],
    level: 'Pemula',
    ...userData
  };
  
  console.log('User created:', newUser);
  return newUser;
};