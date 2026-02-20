
import React, { useState } from 'react';
import { 
  Users, Search, Filter, MoreVertical, ShieldCheck, 
  ShieldAlert, UserMinus, UserCheck, Mail, Phone,
  ChevronRight, Calendar, BadgeCheck, X, Star, 
  TrendingUp, Clock, MapPin, CreditCard, Bell
} from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Pelanggan' | 'Driver' | 'Merchant';
  status: 'Aktif' | 'Ditangguhkan';
  joinDate: string;
  avatar: string;
  stats?: {
    totalOrders?: number;
    rating?: number;
    totalEarnings?: string;
    totalSpent?: string;
    completedTrips?: number;
  };
}

const MOCK_USERS: UserData[] = [
  { 
    id: 'U101', 
    name: 'Budi Santoso', 
    email: 'budi@mail.com', 
    phone: '08123456789', 
    role: 'Pelanggan', 
    status: 'Aktif', 
    joinDate: '12 Jan 2024', 
    avatar: 'https://picsum.photos/seed/u1/100',
    stats: { totalOrders: 42, totalSpent: 'Rp 2.400.000' }
  },
  { 
    id: 'D502', 
    name: 'Agus Salim', 
    email: 'agus.salim@nusa.app', 
    phone: '08556677889', 
    role: 'Driver', 
    status: 'Aktif', 
    joinDate: '05 Feb 2024', 
    avatar: 'https://picsum.photos/seed/d1/100',
    stats: { rating: 4.9, completedTrips: 1240, totalEarnings: 'Rp 15.200.000' }
  },
  { 
    id: 'M303', 
    name: 'Kopi Kenangan', 
    email: 'admin@kopikenangan.com', 
    phone: '021998877', 
    role: 'Merchant', 
    status: 'Aktif', 
    joinDate: '20 Feb 2024', 
    avatar: 'https://picsum.photos/seed/m1/100',
    stats: { rating: 4.8, totalOrders: 3200, totalEarnings: 'Rp 82.500.000' }
  },
  { 
    id: 'U104', 
    name: 'Siti Aminah', 
    email: 'siti@mail.com', 
    phone: '08129988776', 
    role: 'Pelanggan', 
    status: 'Ditangguhkan', 
    joinDate: '01 Mar 2024', 
    avatar: 'https://picsum.photos/seed/u2/100',
    stats: { totalOrders: 5, totalSpent: 'Rp 150.000' }
  },
  { 
    id: 'D505', 
    name: 'Rudi Tabuti', 
    email: 'rudi@nusa.app', 
    phone: '08771122334', 
    role: 'Driver', 
    status: 'Aktif', 
    joinDate: '15 Mar 2024', 
    avatar: 'https://picsum.photos/seed/d2/100',
    stats: { rating: 4.7, completedTrips: 85, totalEarnings: 'Rp 1.100.000' }
  },
];

const AdminUsers: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'Semua' | 'Pelanggan' | 'Driver' | 'Merchant'>('Semua');
  const [users, setUsers] = useState<UserData[]>(MOCK_USERS);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                          user.email.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === 'Semua' || user.role === activeTab;
    return matchesSearch && matchesTab;
  });

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const newStatus = u.status === 'Aktif' ? 'Ditangguhkan' : 'Aktif';
        return { ...u, status: newStatus };
      }
      return u;
    }));
    if (selectedUser && selectedUser.id === id) {
      setSelectedUser(prev => prev ? { ...prev, status: prev.status === 'Aktif' ? 'Ditangguhkan' : 'Aktif' } : null);
    }
  };

  return (
    <div className="px-4 py-8 space-y-6 animate-in fade-in duration-500 pb-32 relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Manajemen User</h1>
          <p className="text-xs text-slate-400 font-medium">Kelola akses dan data seluruh mitra</p>
        </div>
        <div className="bg-violet-100 p-2.5 rounded-2xl text-violet-600">
          <Users size={22} />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-all" size={20} />
          <input 
            type="text" 
            placeholder="Cari nama atau email..."
            className="w-full bg-white border border-slate-100 rounded-[24px] py-5 pl-14 pr-4 text-sm font-black focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none shadow-xl shadow-slate-200/40 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="bg-slate-900 text-white p-5 rounded-[24px] shadow-lg active:scale-95 transition-all">
          <Filter size={20} />
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {['Semua', 'Pelanggan', 'Driver', 'Merchant'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-3 rounded-2xl text-xs font-black whitespace-nowrap transition-all ${
              activeTab === tab 
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-100' 
                : 'bg-white text-slate-500 border border-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredUsers.map(user => (
          <div key={user.id} className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden group">
            <div className="p-5 flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-50">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                {user.status === 'Aktif' ? (
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-sm">
                    <ShieldCheck size={10} />
                  </div>
                ) : (
                  <div className="absolute -bottom-1 -right-1 bg-red-500 text-white p-1 rounded-full border-2 border-white shadow-sm">
                    <ShieldAlert size={10} />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-bold text-slate-800 text-sm truncate">{user.name}</h3>
                  <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter ${
                    user.role === 'Driver' ? 'bg-blue-50 text-blue-600' : 
                    user.role === 'Merchant' ? 'bg-orange-50 text-orange-600' : 
                    'bg-violet-50 text-violet-600'
                  }`}>
                    {user.role}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Mail size={10} /> {user.email}
                  </p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Calendar size={10} /> {user.joinDate}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => toggleUserStatus(user.id)}
                  className={`p-2.5 rounded-xl transition-all active:scale-90 ${
                    user.status === 'Aktif' 
                      ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                      : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                  }`}
                  title={user.status === 'Aktif' ? 'Suspend User' : 'Activate User'}
                >
                  {user.status === 'Aktif' ? <UserMinus size={18} /> : <UserCheck size={18} />}
                </button>
              </div>
            </div>
            
            <div className="px-5 py-3 bg-slate-50 flex justify-between items-center border-t border-slate-100/50">
               <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <Phone size={10} className="text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-600">{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BadgeCheck size={10} className="text-blue-500" />
                    <span className="text-[10px] font-bold text-slate-600">Terverifikasi</span>
                  </div>
               </div>
               <button 
                onClick={() => setSelectedUser(user)}
                className="text-[10px] font-black text-violet-600 flex items-center gap-0.5 hover:underline"
               >
                  DETAIL <ChevronRight size={12} />
               </button>
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
              <Users size={40} />
            </div>
            <div>
              <p className="text-slate-800 font-bold">User Tidak Ditemukan</p>
              <p className="text-slate-400 text-xs">Coba gunakan kata kunci pencarian yang lain.</p>
            </div>
          </div>
        )}
      </div>

      {/* User Detail Overlay */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-end justify-center p-4 animate-in fade-in duration-300">
           <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-500 flex flex-col max-h-[90vh]">
              {/* Overlay Header */}
              <div className="p-6 pb-2 flex justify-between items-start">
                 <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src={selectedUser.avatar} className="w-16 h-16 rounded-3xl object-cover border-4 border-slate-50 shadow-sm" alt="Profile" />
                      <div className={`absolute -bottom-1 -right-1 p-1.5 rounded-full border-2 border-white shadow-sm ${
                        selectedUser.status === 'Aktif' ? 'bg-emerald-500' : 'bg-red-500'
                      }`}>
                         {selectedUser.status === 'Aktif' ? <ShieldCheck size={12} className="text-white" /> : <ShieldAlert size={12} className="text-white" />}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-800">{selectedUser.name}</h2>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selectedUser.id} • {selectedUser.role}</p>
                    </div>
                 </div>
                 <button 
                  onClick={() => setSelectedUser(null)}
                  className="p-2 bg-slate-100 text-slate-400 rounded-full hover:bg-slate-200 transition-colors"
                 >
                   <X size={20} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
                 {/* Quick Stats */}
                 <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex flex-col items-center">
                       <TrendingUp size={18} className="text-blue-600 mb-2" />
                       <span className="text-[10px] font-black text-slate-400 uppercase">Performa</span>
                       <p className="text-sm font-black text-slate-800">
                         {selectedUser.role === 'Pelanggan' ? `${selectedUser.stats?.totalOrders} Order` : 
                          selectedUser.role === 'Driver' ? `${selectedUser.stats?.completedTrips} Trip` : 
                          `${selectedUser.stats?.totalOrders} Penjualan`}
                       </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex flex-col items-center">
                       <Star size={18} className="text-yellow-500 mb-2 fill-yellow-500" />
                       <span className="text-[10px] font-black text-slate-400 uppercase">Rating</span>
                       <p className="text-sm font-black text-slate-800">
                         {selectedUser.role === 'Pelanggan' ? 'Gold Tier' : `${selectedUser.stats?.rating} / 5.0`}
                       </p>
                    </div>
                 </div>

                 {/* Account Details */}
                 <div className="space-y-3">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                       <BadgeCheck size={16} className="text-blue-500" /> Data Akun Terverifikasi
                    </h4>
                    <div className="bg-white rounded-3xl border border-slate-100 divide-y divide-slate-50">
                       <div className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <Mail size={16} className="text-slate-400" />
                             <span className="text-[11px] font-bold text-slate-600">Email</span>
                          </div>
                          <span className="text-[11px] font-black text-slate-800">{selectedUser.email}</span>
                       </div>
                       <div className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <Phone size={16} className="text-slate-400" />
                             <span className="text-[11px] font-bold text-slate-600">No. HP</span>
                          </div>
                          <span className="text-[11px] font-black text-slate-800">{selectedUser.phone}</span>
                       </div>
                       <div className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <CreditCard size={16} className="text-slate-400" />
                             <span className="text-[11px] font-bold text-slate-600">
                                {selectedUser.role === 'Pelanggan' ? 'Pengeluaran' : 'Pendapatan'}
                             </span>
                          </div>
                          <span className="text-[11px] font-black text-violet-600">
                             {selectedUser.role === 'Pelanggan' ? selectedUser.stats?.totalSpent : selectedUser.stats?.totalEarnings}
                          </span>
                       </div>
                    </div>
                 </div>

                 {/* Administrative Actions */}
                 <div className="grid grid-cols-2 gap-3 pt-4">
                    <button 
                      onClick={() => toggleUserStatus(selectedUser.id)}
                      className={`flex items-center justify-center gap-2 py-4 rounded-3xl font-bold text-xs transition-all active:scale-95 ${
                        selectedUser.status === 'Aktif' 
                          ? 'bg-red-50 text-red-500 border border-red-100' 
                          : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      }`}
                    >
                       {selectedUser.status === 'Aktif' ? <><UserMinus size={16} /> Suspend Akun</> : <><UserCheck size={16} /> Aktifkan Akun</>}
                    </button>
                    <button className="bg-slate-900 text-white flex items-center justify-center gap-2 py-4 rounded-3xl font-bold text-xs active:scale-95 transition-all">
                       <Bell size={16} /> Kirim Notif
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
