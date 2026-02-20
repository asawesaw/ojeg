
import React, { useState } from 'react';
import { Search, ShoppingCart, Filter, Star, Plus } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';

const ID_CATEGORIES = ['Semua', 'Makanan', 'Minuman', 'Elektronik', 'Swalayan', 'Apotek'];

const Marketplace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = selectedCategory === 'Semua' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => {
        if (selectedCategory === 'Makanan') return p.category === 'Food';
        if (selectedCategory === 'Minuman') return p.category === 'Drink';
        if (selectedCategory === 'Elektronik') return p.category === 'Elektronik';
        return false;
    });

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-800">Belanja</h1>
        <div className="relative">
          <div className="bg-violet-100 p-2 rounded-xl text-violet-700">
            <ShoppingCart size={22} />
          </div>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white">
              {cartCount}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-all" size={20} />
          <input 
            type="text" 
            placeholder="Cari produk impianmu..."
            className="w-full bg-white border border-slate-100 rounded-[24px] py-5 pl-14 pr-4 text-sm font-bold focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none shadow-xl shadow-slate-200/40 transition-all"
          />
        </div>
        <button className="bg-slate-900 text-white p-5 rounded-[24px] shadow-lg active:scale-95 transition-all">
          <Filter size={20} />
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {ID_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-3 rounded-2xl text-xs font-black whitespace-nowrap transition-all ${
              selectedCategory === cat 
                ? 'bg-violet-600 text-white shadow-md shadow-violet-100' 
                : 'bg-white text-slate-500 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 pb-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col group">
            <div className="h-40 overflow-hidden relative">
              <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} />
              <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                <Star size={10} className="fill-yellow-400 text-yellow-400" />
                <span className="text-[10px] font-bold text-slate-700">{product.rating}</span>
              </div>
            </div>
            <div className="p-3 flex flex-col flex-1">
              <span className="text-xs text-slate-400 font-medium mb-1">{product.category === 'Food' ? 'Makanan' : product.category === 'Drink' ? 'Minuman' : product.category}</span>
              <h3 className="font-bold text-slate-800 text-sm line-clamp-1 mb-2">{product.name}</h3>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-violet-700 font-bold text-sm">Rp {product.price.toLocaleString('id-ID')}</span>
                <button 
                  onClick={() => setCartCount(prev => prev + 1)}
                  className="bg-violet-600 text-white w-8 h-8 flex items-center justify-center rounded-xl shadow-md active:scale-90 transition-transform"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
