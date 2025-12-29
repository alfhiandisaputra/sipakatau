// src/components/features/auth/LoginForm.jsx
import { useState } from 'react';
import { Button, Input } from '../../ui';
import { Mail, Lock, Eye, EyeOff, KeyRound } from 'lucide-react';
import { validateUser } from '../../../data/mockUsers';

export default function LoginForm({ onSubmit, loading, onToggleForm }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Email dan password harus diisi');
      return;
    }

    const user = validateUser(formData.email, formData.password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      onSubmit(userWithoutPassword);
    } else {
      setError('Email atau password salah');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-emerald-500 to-teal-500 rounded-2xl mb-4">
          <KeyRound className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Masuk ke Akun</h2>
        <p className="text-gray-600 mt-2">Selamat datang kembali! Masuk untuk melanjutkan.</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl">
          <div className="flex items-center">
            <div className="shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          <Input
            label="Alamat Email"
            name="email"
            type="email"
            placeholder="contoh@email.com"
            value={formData.email}
            onChange={handleInputChange}
            required
            icon={<Mail className="w-5 h-5 text-gray-400" />}
            className="rounded-2xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20"
          />

          <div className="relative">
            <Input
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password Anda"
              value={formData.password}
              onChange={handleInputChange}
              required
              icon={<Lock className="w-5 h-5 text-gray-400" />}
              className="rounded-2xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-12 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => onToggleForm()}
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
          >
            Belum punya akun?
          </button>
          
          <button
            type="button"
            onClick={() => alert('Fitur lupa password akan datang!')}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline transition-colors"
          >
            Lupa password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full rounded-2xl py-4 text-lg font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Memproses...
            </>
          ) : (
            <>
              Masuk ke Akun
            </>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Atau masuk dengan</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => alert('Login dengan Google akan datang!')}
          className="flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="font-medium text-gray-700">Google</span>
        </button>
        
        <button
          type="button"
          onClick={() => alert('Login dengan Facebook akan datang!')}
          className="flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span className="font-medium text-gray-700">Facebook</span>
        </button>
      </div>
    </div>
  );
}