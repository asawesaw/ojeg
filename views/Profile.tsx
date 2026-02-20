
import React, { useState, useRef } from 'react';
import { 
  ChevronLeft, User, CreditCard, MapPin, ShieldCheck, LogOut, 
  Camera, ChevronRight, Save, Plus, Trash2, Home, Briefcase, X
} from 'lucide-react';

type SubView = 'main' | 'edit' | 'payments' | 'addresses' | 'privacy';

interface ProfileProps {
  onLogout?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onLogout }) => {
  const [view, setView] = useState<SubView>('main');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    phone: '+62 812 3456 7890',
    email: 'john.doe@nusa.app',
    avatar: 'https://picsum.photos/seed/user1/200'
  });

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderHeader = (title: string) => (
    <div className="flex items-center gap-4 mb-6">
      <button 
        onClick={() => setView('main')}
        className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
      >
        <ChevronLeft size={24} className="text-slate-800" />
      </button>
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
    </div>
  );

  const handleLogoutClick = () => {
    if (confirm("Apakah Anda yakin ingin keluar dari NusaApp?")) {
      if (onLogout) {
        onLogout();
      } else {
        // Fallback jika props tidak ada
        window.location.reload();
      }
    }
  };

  return (
    <div className="px-4 py-8">
      {view === 'main' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          {/* User Profile Header */}
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-slate-100 border-4 border-violet-50 overflow-hidden shadow-inner flex items-center justify-center">
                <img src={userData.avatar} alt="Profil" className="w-full h-full object-cover" />
              </div>
              <button 
                onClick={handleCameraClick}
                className="absolute bottom-0 right-0 bg-violet-600 text-white p-2 rounded-full border-4 border-white shadow-lg active:scale-90 transition-transform"
              >
                <Camera size={16} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800">{userData.name}</h2>
              <p className="text-slate-400 text-sm font-medium">{userData.phone}</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden mx-2">
            {[
              { id: 'edit', label: 'Edit Profil', icon: User, color: 'text-blue-500', bg: 'bg-blue-50' },
              { id: 'payments', label: 'Metode Pembayaran', icon: CreditCard, color: 'text-violet-500', bg: 'bg-violet-50' },
              { id: 'addresses', label: 'Daftar Alamat', icon: MapPin, color: 'text-orange-500', bg: 'bg-orange-50' },
              { id: 'privacy', label: 'Kebijakan Privasi', icon: ShieldCheck, color: 'text-purple-500', bg: 'bg-purple-50' },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setView(item.id as SubView)}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group"
              >
                <div className="flex items-center gap-4">
                  <div className={`${item.bg} ${item.color} p-2.5 rounded-xl group-active:scale-90 transition-transform`}>
                    <item.icon size={20} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-slate-300" />
              </button>
            ))}
          </div>

          {/* Logout Button - Critical Fix */}
          <div className="px-2 pb-12">
            <button 
              onClick={handleLogoutClick}
              className="w-full flex items-center justify-center gap-2 p-5 text-red-500 font-bold bg-red-50 rounded-[32px] active:scale-95 transition-all hover:bg-red-100 border border-red-100"
            >
              <LogOut size={20} />
              Keluar Akun
            </button>
            <p className="text-center text-[10px] text-slate-400 mt-4 font-medium uppercase tracking-widest">NusaApp v2.4.0</p>
          </div>
        </div>
      )}

      {view === 'edit' && (
        <div className="px-2 animate-in slide-in-from-right-4 duration-300">
          {renderHeader('Edit Profil')}
          <div className="space-y-5 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nama Lengkap</label>
              <input 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                value={userData.name}
                onChange={(e) => setUserData({...userData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nomor Handphone</label>
              <input 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                value={userData.phone}
                onChange={(e) => setUserData({...userData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Alamat Email</label>
              <input 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                value={userData.email}
                onChange={(e) => setUserData({...userData, email: e.target.value})}
              />
            </div>
            <button 
              onClick={() => { alert("Profil diperbarui!"); setView('main'); }}
              className="w-full bg-violet-600 text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-violet-100 mt-4 active:scale-95 transition-transform"
            >
              <Save size={20} /> Simpan Perubahan
            </button>
          </div>
        </div>
      )}

      {view === 'payments' && (
        <div className="px-2 animate-in slide-in-from-right-4 duration-300">
          {renderHeader('Metode Pembayaran')}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-violet-600 to-violet-700 p-6 rounded-[32px] text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-xs opacity-80 block mb-1">Saldo NusaPay</span>
                <h3 className="text-2xl font-bold mb-4">Rp 1.250.000</h3>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-mono">**** **** **** 4492</span>
                  <div className="bg-white/20 px-3 py-1 rounded-lg text-[10px] font-bold">UTAMA</div>
                </div>
              </div>
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </div>

            <h3 className="font-bold text-slate-800 ml-2 mt-6">Kartu Tersimpan</h3>
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-4 flex items-center justify-between border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Visa Platinum</p>
                    <p className="text-[10px] text-slate-400">Exp 08/26</p>
                  </div>
                </div>
                <Trash2 size={18} className="text-slate-300 hover:text-red-500 cursor-pointer transition-colors" />
              </div>
              <button className="w-full p-4 flex items-center justify-center gap-2 text-violet-600 font-bold text-sm hover:bg-violet-50 transition-colors">
                <Plus size={18} /> Tambah Kartu Baru
              </button>
            </div>
          </div>
        </div>
      )}

      {view === 'addresses' && (
        <div className="px-2 animate-in slide-in-from-right-4 duration-300">
          {renderHeader('Daftar Alamat')}
          <div className="space-y-4">
            {[
              { id: 'home', label: 'Rumah', icon: Home, addr: 'Jl. Merdeka No. 12, Jakarta Selatan', color: 'text-blue-500' },
              { id: 'office', label: 'Kantor', icon: Briefcase, addr: 'Pacific Place, Lt. 15, SCBD, Jakarta', color: 'text-violet-500' },
            ].map((addr) => (
              <div key={addr.id} className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm flex items-start gap-4">
                <div className={`p-3 rounded-2xl bg-slate-50 ${addr.color}`}>
                  <addr.icon size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800">{addr.label}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">{addr.addr}</p>
                </div>
                <button className="text-violet-600 text-xs font-bold mt-1">Edit</button>
              </div>
            ))}
            <button className="w-full mt-4 p-5 border-2 border-dashed border-slate-200 rounded-[32px] text-slate-400 font-bold text-sm flex items-center justify-center gap-2 hover:border-violet-300 hover:text-violet-500 transition-all">
              <Plus size={20} /> Tambah Alamat Baru
            </button>
          </div>
        </div>
      )}

      {view === 'privacy' && (
        <div className="px-2 animate-in slide-in-from-right-4 duration-300">
          {renderHeader('Kebijakan Privasi')}
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800">1. Pengumpulan Data</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              NusaApp mengumpulkan data lokasi Anda untuk menyediakan layanan transportasi yang akurat dan pelacakan pengiriman makanan. Data ini hanya aktif saat aplikasi digunakan.
            </p>
            <h3 className="font-bold text-slate-800">2. Keamanan Pembayaran</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Informasi pembayaran Anda dienkripsi menggunakan protokol SSL standar industri. NusaApp tidak menyimpan detail kartu CVV lengkap Anda secara lokal.
            </p>
            <h3 className="font-bold text-slate-800">3. Layanan Pihak Ketiga</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Kami membagikan data terbatas kepada driver dan mitra toko hanya untuk memastikan penyelesaian layanan yang Anda minta.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
