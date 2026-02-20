
import React, { useState, useCallback } from 'react';
import Layout from './components/Layout';
import UserHome from './views/UserHome';
import Marketplace from './views/Marketplace';
import RideHailing from './views/RideHailing';
import LogisticsService from './views/LogisticsService';
import Profile from './views/Profile';
import Auth from './views/Auth';
import Wallet from './views/Wallet';
import MerchantOrders from './views/MerchantOrders';
import AdminSettings from './views/AdminSettings';
import AdminUsers from './views/AdminUsers';
import { DriverDashboard, MerchantDashboard, AdminDashboard } from './views/Dashboards';
import FloatingBot from './components/FloatingBot';
import { UserRole } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [role, setRole] = useState<UserRole>(UserRole.USER);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [walletAction, setWalletAction] = useState<'topup' | 'transfer' | null>(null);

  const handleLogin = (userRole: UserRole, data: any) => {
    setRole(userRole);
    setIsAuthenticated(true);
    // Set initial tab based on role
    switch(userRole) {
      case UserRole.DRIVER: setActiveTab('dashboard'); break;
      case UserRole.MERCHANT: setActiveTab('store'); break;
      case UserRole.ADMIN: setActiveTab('admin'); break;
      default: setActiveTab('home');
    }
  };

  const handleLogout = useCallback(() => {
    // Hard Reset All States
    setIsAuthenticated(false);
    setActiveTab('home');
    setRole(UserRole.USER);
    setActiveService(null);
    setWalletAction(null);
    // Optional: Clear any local session if needed
    console.log("User logged out successfully");
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col h-screen overflow-hidden max-w-md mx-auto bg-white shadow-xl">
        <Auth onLogin={handleLogin} />
      </div>
    );
  }

  const renderContent = () => {
    // Universal view (Profile is accessible by all roles now)
    if (activeTab === 'profile') {
      return <Profile onLogout={handleLogout} />;
    }

    if (role === UserRole.USER) {
      if (activeService === 'ride' || activeService === 'mobil') {
        return <RideHailing onBack={() => setActiveService(null)} initialType={activeService === 'mobil' ? 'MOBIL' : 'MOTOR'} />;
      }
      if (activeService === 'kirim' || activeService === 'box') {
        return <LogisticsService type={activeService === 'kirim' ? 'KIRIM' : 'BOX'} onBack={() => setActiveService(null)} />;
      }

      switch (activeTab) {
        case 'home': return <UserHome setView={(v) => {
          if (['ride', 'mobil', 'kirim', 'box'].includes(v)) setActiveService(v);
          else if (v === 'topup' || v === 'transfer') {
            setWalletAction(v as 'topup' | 'transfer');
            setActiveTab('wallet');
          }
          else setActiveTab(v);
        }} />;
        case 'market': return <Marketplace />;
        case 'wallet': return <Wallet initialAction={walletAction} onActionHandled={() => setWalletAction(null)} />;
        default: return <UserHome setView={setActiveTab} />;
      }
    }

    if (role === UserRole.DRIVER) {
      switch (activeTab) {
        case 'dashboard': return <DriverDashboard onLogout={handleLogout} />;
        case 'earnings': return <Wallet />;
        default: return <DriverDashboard onLogout={handleLogout} />;
      }
    }

    if (role === UserRole.MERCHANT) {
      switch (activeTab) {
        case 'store': return <MerchantDashboard onLogout={handleLogout} />;
        case 'orders': return <MerchantOrders />;
        default: return <MerchantDashboard onLogout={handleLogout} />;
      }
    }

    if (role === UserRole.ADMIN) {
      switch (activeTab) {
        case 'admin': return <AdminDashboard />;
        case 'users': return <AdminUsers />;
        case 'config': return <AdminSettings onLogout={handleLogout} />;
        default: return <AdminDashboard />;
      }
    }

    return <UserHome setView={setActiveTab} />;
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      role={role} 
      setRole={setRole}
      onLogout={handleLogout}
    >
      {renderContent()}
      <FloatingBot />
    </Layout>
  );
};

export default App;
