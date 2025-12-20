// src/data/mockUsers.js
export const mockUsers = [
  {
    id: 1,
    name: 'Budi Santoso',
    email: 'budi@example.com',
    password: 'password123',
    points: 150,
    role: 'user',
    avatar: null,
    joinDate: '2024-01-15',
    level: 'Pemula'
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
    level: 'Master'
  },
  {
    id: 3,
    name: 'Siti Nurhaliza',
    email: 'siti@example.com',
    password: 'password123',
    points: 320,
    role: 'user',
    avatar: null,
    joinDate: '2024-02-10',
    level: 'Aktif'
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