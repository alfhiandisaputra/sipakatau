// src/components/features/profile/ProfileInfo.jsx
import { useState } from 'react';
import { Card, Button } from '../../ui';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  X
} from 'lucide-react';

const ProfileInfo = ({ user, isEditing, editData, onEditToggle, onEditChange, onSave }) => {
  const [localData, setLocalData] = useState(editData);

  const handleFieldChange = (field, value) => {
    setLocalData({ ...localData, [field]: value });
    onEditChange(field, value);
  };

  const handleSave = () => {
    onSave(localData);
  };

  const handleCancel = () => {
    setLocalData({});
    onEditToggle();
  };

  const fields = [
    {
      id: 'name',
      label: 'Nama Lengkap',
      value: isEditing ? localData.name || user.name : user.name,
      icon: User,
      type: 'text',
      placeholder: 'Masukkan nama lengkap'
    },
    {
      id: 'email',
      label: 'Email',
      value: isEditing ? localData.email || user.email : user.email,
      icon: Mail,
      type: 'email',
      placeholder: 'Masukkan email'
    },
    {
      id: 'phone',
      label: 'Nomor Telepon',
      value: isEditing ? localData.phone || user.phone : user.phone || 'Belum diisi',
      icon: Phone,
      type: 'tel',
      placeholder: 'Masukkan nomor telepon'
    },
    {
      id: 'address',
      label: 'Alamat',
      value: isEditing ? localData.address || user.address : user.address || 'Belum diisi',
      icon: MapPin,
      type: 'text',
      placeholder: 'Masukkan alamat lengkap'
    },
    {
      id: 'birthDate',
      label: 'Tanggal Lahir',
      value: isEditing ? localData.birthDate || user.birthDate : user.birthDate || 'Belum diisi',
      icon: Calendar,
      type: 'date',
      placeholder: 'Pilih tanggal lahir'
    }
  ];

  return (
    <Card className="p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-gray-900 text-xl">Informasi Pribadi</h3>
          <p className="text-gray-600 text-sm">Kelola data profil Anda</p>
        </div>
        
        {!isEditing ? (
          <Button
            variant="outline"
            onClick={onEditToggle}
            className="rounded-xl flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Profil
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={handleCancel}
              className="rounded-xl flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Batal
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              className="rounded-xl flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Simpan
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3 sm:w-1/3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <label className="font-medium text-gray-900 text-sm">
                  {field.label}
                </label>
              </div>
              
              <div className="sm:w-2/3">
                {isEditing ? (
                  <input
                    type={field.type}
                    value={localData[field.id] || user[field.id] || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                    placeholder={field.placeholder}
                  />
                ) : (
                  <p className="px-4 py-2.5 bg-white rounded-lg border border-transparent">
                    {field.value}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      {!isEditing && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Informasi Tambahan</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-emerald-50 rounded-lg">
              <p className="text-sm text-gray-600">ID Pengguna</p>
              <p className="font-mono font-bold text-gray-900">{user?.id || 'USR-001'}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Status Verifikasi</p>
              <p className="font-bold text-green-600">Terverifikasi</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ProfileInfo;