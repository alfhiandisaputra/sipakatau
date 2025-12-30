// src/components/features/profile/SettingsPanel.jsx
import { useState } from 'react';
import { Card, Button } from '../../ui';
import { 
  Bell,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Globe,
  Moon,
  HelpCircle,
  LogOut,
  Save,
  Check,
  X
} from 'lucide-react';

const SettingsPanel = ({ onLogout }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    pushNotifications: true,
    darkMode: false,
    language: 'id',
    privacy: 'public'
  });

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleSettingChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handlePasswordChange = () => {
    if (passwordData.new !== passwordData.confirm) {
      alert('Password baru tidak cocok!');
      return;
    }
    alert('Password berhasil diubah!');
    setIsChangingPassword(false);
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const notificationSettings = [
    { id: 'notifications', label: 'Notifikasi Aktif', description: 'Aktifkan semua notifikasi' },
    { id: 'emailNotifications', label: 'Notifikasi Email', description: 'Kirim notifikasi via email' },
    { id: 'pushNotifications', label: 'Push Notifikasi', description: 'Notifikasi di perangkat' },
  ];

  const privacySettings = [
    { id: 'public', label: 'Publik', description: 'Semua orang dapat melihat profil Anda' },
    { id: 'friends', label: 'Teman Saja', description: 'Hanya teman yang dapat melihat' },
    { id: 'private', label: 'Privat', description: 'Hanya Anda yang dapat melihat' },
  ];

  return (
    <Card className="p-6 rounded-2xl">
      <h3 className="font-bold text-gray-900 text-xl mb-6">Pengaturan Akun</h3>

      {/* Notification Settings */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Pengaturan Notifikasi</h4>
            <p className="text-sm text-gray-600">Kelola preferensi notifikasi</p>
          </div>
        </div>

        <div className="space-y-3">
          {notificationSettings.map((setting) => (
            <div key={setting.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{setting.label}</p>
                <p className="text-sm text-gray-600">{setting.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[setting.id]}
                  onChange={(e) => handleSettingChange(setting.id, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Shield className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Privasi</h4>
            <p className="text-sm text-gray-600">Atur siapa yang dapat melihat profil Anda</p>
          </div>
        </div>

        <div className="space-y-2">
          {privacySettings.map((option) => (
            <label key={option.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="privacy"
                value={option.id}
                checked={settings.privacy === option.id}
                onChange={(e) => handleSettingChange('privacy', e.target.value)}
                className="text-emerald-500 focus:ring-emerald-500"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{option.label}</p>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Password Change */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <Lock className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Keamanan</h4>
            <p className="text-sm text-gray-600">Kelola kata sandi dan keamanan akun</p>
          </div>
        </div>

        {isChangingPassword ? (
          <div className="space-y-4 p-4 bg-red-50 rounded-xl">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Password Saat Ini
                </label>
                <input
                  type="password"
                  value={passwordData.current}
                  onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Masukkan password saat ini"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Password Baru
                </label>
                <input
                  type="password"
                  value={passwordData.new}
                  onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Password baru minimal 8 karakter"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Konfirmasi Password Baru
                </label>
                <input
                  type="password"
                  value={passwordData.confirm}
                  onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Ketik ulang password baru"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => setIsChangingPassword(false)}
                className="flex-1"
              >
                <X className="w-4 h-4 mr-2" />
                Batal
              </Button>
              <Button
                variant="primary"
                onClick={handlePasswordChange}
                className="flex-1"
              >
                <Check className="w-4 h-4 mr-2" />
                Simpan Password
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={() => setIsChangingPassword(true)}
            className="w-full"
          >
            <Lock className="w-4 h-4 mr-2" />
            Ubah Password
          </Button>
        )}
      </div>

      {/* Logout */}
      <div className="pt-6 border-t border-gray-200">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Keluar dari Akun
        </Button>
      </div>
    </Card>
  );
};

export default SettingsPanel;