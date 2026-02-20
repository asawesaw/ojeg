
import React, { useState } from 'react';
import { 
  Settings, Percent, Power, ShieldAlert, Tag, 
  ChevronRight, Save, Bell, Smartphone, ShieldCheck,
  AlertTriangle, CheckCircle2, Plus, Trash2, X, Info, LogOut
} from 'lucide-react';

interface Voucher {
  id: string;
  code: string;
  discount: string;
  usage: number;
  status: 'Aktif' | 'Nonaktif';
  expiry: string;
}

const MOCK_VOUCHERS: Voucher[] = [
  { id: 'v1', code: 'NUSAHEMAT50', discount: '50%', usage: 120, status: 'Aktif', expiry: '31 Des 2024' },
  { id: 'v2', code: 'MAKANGRATIS', discount: 'Rp 20.000', usage: 450, status: 'Aktif', expiry: '15 Jan 2025' },
  { id: 'v3', code: 'WEEKENDSERU', discount: '15%', usage: 85, status: 'Nonaktif', expiry: '01 Feb 2025' },
];

interface AdminSettingsProps {
  onLogout?: () => void;
}

const AdminSettings: React.FC<AdminSettingsProps> = ({ onLogout }) => {
  const [commissions, setCommissions] = useState({
    ride: 20,
    car: 15,
    food: 25,
    delivery: 10
  });

  const [services, setServices] = useState({
    ride: true,
    car: true,
    food: true,
    delivery: true,
    maintenance: false
  });

  const [vouchers, setVouchers] = useState<Voucher[]>(MOCK_VOUCHERS);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [newVoucher, setNewVoucher] = useState({ code: '', discount: '', expiry: '' });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Pengaturan sistem berhasil diperbarui!');
    }, 1000);
  };

  const toggleService = (key: keyof typeof services) => {
    setServices(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddVoucher = () => {
    if (!newVoucher.code || !newVoucher.discount) return;
    const voucher: Voucher = {
      id: Math.random().toString(36).substr(2, 9),
      code: newVoucher.code.toUpperCase(),
      discount: newVoucher.discount,
      usage: 0,
      status: 'Aktif',
      expiry: newVoucher.expiry || 'Seterusnya'
    };
    setVouchers([voucher, ...vouchers]);
    setNewVoucher({ code: '', discount: '', expiry: '' });
  };

  const deleteVoucher = (id: string) => {
    if (confirm('Hapus voucher ini?')) {
      setVouchers(vouchers.filter(v => v.id !== id));
    }
  };

  const toggleVoucherStatus = (id: string) => {
    setVouchers(vouchers.map(v => 
      v.id === id ? { ...v, status: v.status === 'Aktif' ? 'Nonaktif' : 'Aktif' } : v
    ));
  };

  return (
    <div className="px-4 py-8 space-y-8 animate-in fade-in duration-500 pb-32 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Setelan Sistem</h1>
        <div className="bg-slate-100 p-2.5 rounded-2xl text-slate-500">
          <Settings size={22} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 ml-1">
          <Percent size={18} className="text-violet-600" />
          <h2 className="font-bold text-slate-800">Komisi Platform (%)</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'ride', label: 'Nusa Ojeg', val: commissions.ride },
            { id: 'car', label: 'Nusa Mobil', val: commissions.car },
            { id: 'food', label: 'Nusa Makanan', val: commissions.food },
            { id: 'delivery', label: 'Nusa Kirim', val: commissions.delivery },
          ].map(item => (
            <div key={item.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">{item.label}</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  value={item.val} 
                  onChange={(e) => setCommissions({...commissions, [item.id]: parseInt(e.target.value) || 0})}
                  className="w-full bg-slate-50 rounded-xl px-3 py-2 font-bold text-slate-800 outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                />
                <span className="font-bold text-slate-400">%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 ml-1">
          <Power size={18} className="text-blue-600" />
          <h2 className="font-bold text-slate-800">Kontrol Layanan</h2>
        </div>
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          {[
            { id: 'ride', label: 'Layanan Ojeg & Mobil', desc: 'Aktifkan fitur transportasi' },
            { id: 'food', label: 'Layanan Marketplace', desc: 'Aktifkan fitur belanja & makanan' },
            { id: 'delivery', label: 'Layanan Logistik', desc: 'Aktifkan fitur kirim barang' },
          ].map((s, idx) => (
            <div key={s.id} className={`p-5 flex items-center justify-between ${idx !== 2 ? 'border-b border-slate-50' : ''}`}>
              <div>
                <h4 className="text-sm font-bold text-slate-800">{s.label}</h4>
                <p className="text-[10px] text-slate-400 font-medium">{s.desc}</p>
              </div>
              <button 
                onClick={() => toggleService(s.id as any)}
                className={`w-12 h-6 rounded-full transition-all relative ${services[s.id as keyof typeof services] ? 'bg-violet-500' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${services[s.id as keyof typeof services] ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 ml-1">
          <ShieldAlert size={18} className="text-red-500" />
          <h2 className="font-bold text-slate-800">Keamanan & Pemeliharaan</h2>
        </div>
        <div className="bg-red-50 p-5 rounded-[32px] border border-red-100 flex items-center justify-between">
           <div className="flex gap-3">
              <AlertTriangle className="text-red-500 shrink-0" size={20} />
              <div>
                <h4 className="text-sm font-bold text-red-900">Mode Pemeliharaan</h4>
                <p className="text-[10px] text-red-700 font-medium">Matikan akses publik ke aplikasi</p>
              </div>
           </div>
           <button 
                onClick={() => toggleService('maintenance')}
                className={`w-12 h-6 rounded-full transition-all relative ${services.maintenance ? 'bg-red-500' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${services.maintenance ? 'left-7' : 'left-1'}`}></div>
              </button>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-violet-600 text-white py-5 rounded-[32px] font-bold text-lg shadow-xl shadow-violet-100 active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          {isSaving ? (
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Save size={20} />
              Simpan Perubahan
            </>
          )}
        </button>

        <button 
          onClick={() => {
            if(confirm("Apakah Anda yakin ingin keluar dari sistem admin?")) {
              if (onLogout) onLogout();
            }
          }}
          className="w-full bg-slate-100 text-red-500 py-5 rounded-[32px] font-bold text-sm active:scale-95 transition-all flex items-center justify-center gap-3 border border-red-50"
        >
          <LogOut size={20} />
          Keluar Akun Admin
        </button>
      </div>

      {isVoucherModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-end justify-center p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-500 flex flex-col max-h-[90vh]">
            <div className="p-6 pb-2 flex justify-between items-center border-b border-slate-50">
              <div className="flex items-center gap-3">
                 <div className="bg-purple-100 text-purple-600 p-2 rounded-xl">
                   <Tag size={20} />
                 </div>
                 <h2 className="text-xl font-black text-slate-800 tracking-tight">Manajemen Promo</h2>
              </div>
              <button 
                onClick={() => setIsVoucherModalOpen(false)}
                className="p-2 bg-slate-100 text-slate-400 rounded-full hover:bg-slate-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
              <div className="bg-slate-50 p-5 rounded-[32px] border border-slate-100 space-y-4">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <Plus size={16} className="text-violet-500" /> Tambah Voucher Baru
                </h3>
                <div className="space-y-3">
                  <input 
                    placeholder="KODE VOUCHER (Contoh: MERDEKA)" 
                    className="w-full bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none border border-slate-200 focus:ring-2 focus:ring-violet-500 transition-all uppercase"
                    value={newVoucher.code}
                    onChange={(e) => setNewVoucher({...newVoucher, code: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      placeholder="Besar Diskon (50% / 10rb)" 
                      className="w-full bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none border border-slate-200 focus:ring-2 focus:ring-violet-500 transition-all"
                      value={newVoucher.discount}
                      onChange={(e) => setNewVoucher({...newVoucher, discount: e.target.value})}
                    />
                    <input 
                      placeholder="Tgl Berakhir" 
                      className="w-full bg-white rounded-2xl px-4 py-3 text-sm font-bold outline-none border border-slate-200 focus:ring-2 focus:ring-violet-500 transition-all"
                      value={newVoucher.expiry}
                      onChange={(e) => setNewVoucher({...newVoucher, expiry: e.target.value})}
                    />
                  </div>
                  <button 
                    onClick={handleAddVoucher}
                    disabled={!newVoucher.code || !newVoucher.discount}
                    className="w-full bg-slate-900 text-white py-3 rounded-2xl font-bold text-xs disabled:opacity-50 active:scale-95 transition-all"
                  >
                    Simpan Voucher
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest ml-1">Daftar Voucher Aktif</h3>
                {vouchers.map(v => (
                  <div key={v.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${v.status === 'Aktif' ? 'bg-violet-50 text-violet-600' : 'bg-slate-100 text-slate-400'}`}>
                        <Tag size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                           <h4 className="text-sm font-black text-slate-800">{v.code}</h4>
                           <span className="text-[10px] font-bold text-violet-600">{v.discount}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">Exp: {v.expiry} • {v.usage} Terpakai</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <button 
                        onClick={() => toggleVoucherStatus(v.id)}
                        className={`p-2 rounded-lg transition-colors ${v.status === 'Aktif' ? 'bg-violet-50 text-violet-600 hover:bg-violet-100' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'}`}
                        title={v.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
                       >
                         {v.status === 'Aktif' ? <CheckCircle2 size={16} /> : <Power size={16} />}
                       </button>
                       <button 
                        onClick={() => deleteVoucher(v.id)}
                        className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                       >
                         <Trash2 size={16} />
                       </button>
                    </div>
                  </div>
                ))}

                {vouchers.length === 0 && (
                   <div className="py-10 text-center text-slate-400">
                      <Info size={32} className="mx-auto mb-2 opacity-20" />
                      <p className="text-xs font-medium">Tidak ada voucher promo</p>
                   </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center">
        <p className="text-[10px] text-slate-400 font-medium">NusaApp Admin Panel v2.4.0 • Build 882</p>
      </div>
    </div>
  );
};

export default AdminSettings;
