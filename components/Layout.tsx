
import React, { useState, useEffect, useRef } from 'react';
import { Home, ShoppingBag, MapPin, User, Wallet, ShieldAlert, Settings, LayoutDashboard, LogOut } from 'lucide-react';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, role, setRole, onLogout }) => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollThreshold = 15;

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const currentScrollY = e.currentTarget.scrollTop;
    
    if (currentScrollY < 10) {
      setIsNavVisible(true);
      lastScrollY.current = currentScrollY;
      return;
    }

    const diff = Math.abs(currentScrollY - lastScrollY.current);
    
    if (diff > scrollThreshold) {
      if (currentScrollY > lastScrollY.current) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      lastScrollY.current = currentScrollY;
    }
  };

  const getNavItems = () => {
    switch (role) {
      case UserRole.DRIVER:
        return [
          { id: 'dashboard', label: 'Tugas', icon: MapPin },
          { id: 'earnings', label: 'Dompet', icon: Wallet },
          { id: 'profile', label: 'Profil', icon: User },
        ];
      case UserRole.MERCHANT:
        return [
          { id: 'store', label: 'Toko', icon: ShoppingBag },
          { id: 'orders', label: 'Pesanan', icon: LayoutDashboard },
          { id: 'profile', label: 'Profil', icon: User },
        ];
      case UserRole.ADMIN:
        return [
          { id: 'admin', label: 'Sistem', icon: ShieldAlert },
          { id: 'users', label: 'User', icon: User },
          { id: 'config', label: 'Setelan', icon: Settings },
          { id: 'profile', label: 'Profil', icon: User },
        ];
      default:
        return [
          { id: 'home', label: 'Beranda', icon: Home },
          { id: 'market', label: 'Belanja', icon: ShoppingBag },
          { id: 'wallet', label: 'Dompet', icon: Wallet },
          { id: 'profile', label: 'Profil', icon: User },
        ];
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden max-w-md mx-auto bg-slate-50 shadow-2xl relative border-x border-slate-100">
      {/* Top Bar with Role Switcher & Fast Logout */}
      <div className={`absolute top-4 left-0 right-0 z-[60] px-4 flex justify-center transition-all duration-500 ${
        isNavVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
      }`}>
        <div className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-full shadow-lg flex items-center gap-1 pl-4 pr-1 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <select 
            value={role} 
            onChange={(e) => {
              const newRole = e.target.value as UserRole;
              setRole(newRole);
              if (newRole === UserRole.USER) setActiveTab('home');
              else if (newRole === UserRole.DRIVER) setActiveTab('dashboard');
              else if (newRole === UserRole.MERCHANT) setActiveTab('store');
              else if (newRole === UserRole.ADMIN) setActiveTab('admin');
            }}
            className="text-[10px] font-black text-slate-800 bg-transparent outline-none cursor-pointer uppercase tracking-widest px-2"
          >
            <option value={UserRole.USER}>Role: Pelanggan</option>
            <option value={UserRole.DRIVER}>Role: Driver</option>
            <option value={UserRole.MERCHANT}>Role: Mitra Toko</option>
            <option value={UserRole.ADMIN}>Role: Admin Sistem</option>
          </select>
          <button 
            onClick={() => { if(confirm("Keluar dari aplikasi?")) onLogout?.(); }}
            className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all"
            title="Keluar Akun Cepat"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>

      <main 
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto no-scrollbar pt-12 pb-28"
      >
        {children}
      </main>

      {/* Floating Navigation */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[340px] px-2 z-50 transition-all duration-500 ease-in-out ${
        isNavVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
      }`}>
        <nav className="bg-white/95 backdrop-blur-xl border border-slate-100 flex justify-around py-2 px-1 rounded-[24px] shadow-2xl shadow-slate-900/15">
          {getNavItems().map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center gap-0.5 group transition-all duration-300 flex-1 ${
                  isActive ? 'text-violet-600' : 'text-slate-400'
                }`}
              >
                <div className={`p-1.5 rounded-[18px] transition-all duration-300 ${
                  isActive ? 'bg-violet-50 nav-active-glow scale-110' : 'group-hover:bg-slate-50'
                }`}>
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[9px] font-black tracking-tighter uppercase transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50 h-0 overflow-hidden'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute -bottom-0.5 w-1 h-1 bg-violet-600 rounded-full"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Layout;
