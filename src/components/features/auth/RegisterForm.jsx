// src/components/features/auth/RegisterForm.jsx
import { useState } from 'react';
import { Button, Input } from '../../ui';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Sparkles, CheckCircle } from 'lucide-react';
import { createUser } from '../../../data/mockUsers';

export default function RegisterForm({ onSubmit, loading, onToggleForm }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nama harus diisi';
    if (!formData.email.trim()) newErrors.email = 'Email harus diisi';
    if (!formData.password) newErrors.password = 'Password harus diisi';
    if (formData.password.length < 6) newErrors.password = 'Password minimal 6 karakter';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const newUser = createUser({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });

    const { password: _, ...userWithoutPassword } = newUser;
    onSubmit(userWithoutPassword);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-emerald-500 to-teal-500 rounded-2xl mb-4">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Buat Akun Baru</h2>
        <p className="text-gray-600 mt-2">Bergabung dengan komunitas peduli lingkungan</p>
      </div>

      {/* Bonus Info */}
      <div className="bg-linear-to-r from-emerald-500 to-teal-500 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Bonus 50 Poin Gratis!</h3>
            <p className="text-sm opacity-90">Untuk pendaftaran pertama kali</p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
          <span className="text-gray-700">Tukar poin dengan hadiah menarik</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
          <span className="text-gray-700">Jadwalkan pickup sampah dengan mudah</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
          <span className="text-gray-700">Pantau kontribusi lingkungan Anda</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          <Input
            label="Nama Lengkap"
            name="name"
            type="text"
            placeholder="Masukkan nama lengkap Anda"
            value={formData.name}
            onChange={handleInputChange}
            error={errors.name}
            required
            icon={<User className="w-5 h-5 text-gray-400" />}
            className="rounded-2xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20"
          />

          <Input
            label="Alamat Email"
            name="email"
            type="email"
            placeholder="contoh@email.com"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
            icon={<Mail className="w-5 h-5 text-gray-400" />}
            className="rounded-2xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20"
          />

          <div className="relative">
            <Input
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Minimal 6 karakter"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
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

          <Input
            label="Konfirmasi Password"
            name="confirmPassword"
            type="password"
            placeholder="Ulangi password Anda"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            required
            icon={<Lock className="w-5 h-5 text-gray-400" />}
            className="rounded-2xl border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => onToggleForm()}
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
          >
            Sudah punya akun?
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
              Mendaftarkan...
            </>
          ) : (
            <>
              Daftar Sekarang
            </>
          )}
        </Button>
      </form>

      {/* Terms & Privacy */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          Dengan mendaftar, Anda menyetujui{' '}
          <button 
            className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
            onClick={() => alert('Syarat & Ketentuan')}
          >
            Syarat & Ketentuan
          </button>{' '}
          dan{' '}
          <button 
            className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
            onClick={() => alert('Kebijakan Privasi')}
          >
            Kebijakan Privasi
          </button>
        </p>
      </div>
    </div>
  );
}