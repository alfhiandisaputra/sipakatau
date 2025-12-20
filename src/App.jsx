// src/App.jsx
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, login, logout, isLoading } = useAuth();

  const handleLogin = () => {
    //sample user data
    login({
      name: 'John Doe',
      email: 'john@example.com',
      points: 150,
      role: 'user', // ubah ke 'admin' untk meliht menu Admin 
      avatar: null
    });
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">SIPAKATAU Auth Test</h1>
      
      {user ? (
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold">Logged in as:</h2>
            <p>Name: {user.name}</p>
            <p>Role: {user.role}</p>
            <p>Points: {user.points}</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-600">You are not logged in</p>
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg"
          >
            Login as User
          </button>
          <button
            onClick={() => login({
              name: 'Admin User',
              email: 'admin@example.com',
              points: 500,
              role: 'admin',
              avatar: null
            })}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Login as Admin
          </button>
        </div>
      )}
    </div>
  );
}

export default App;