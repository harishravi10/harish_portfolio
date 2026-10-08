import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  CreditCard, 
  ShoppingCart, 
  Search, 
  CheckCircle, 
  Package, 
  Plus
} from 'lucide-react';

interface MockupProps {
  type: 'hospital' | 'ecommerce';
}

export const ProjectMockup: React.FC<MockupProps> = ({ type }) => {
  // E-commerce interactive state
  const [cartCount, setCartCount] = useState(2);
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const handleAddToCart = (item: string) => {
    setCartCount(prev => prev + 1);
    setAddedItem(item);
    setTimeout(() => setAddedItem(null), 1500);
  };

  if (type === 'hospital') {
    return (
      <div className="rounded-xl bg-[#090d16] border border-slate-800 overflow-hidden text-xs font-sans shadow-2xl select-none">
        {/* Top Window Bar */}
        <div className="px-4 py-2.5 bg-[#0d1220] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-[11px] font-mono text-slate-300 ml-2 font-medium">
              Hospital_Portal // Admin Dashboard
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              MySQL: Connected
            </span>
          </div>
        </div>

        {/* Mockup Dashboard Content */}
        <div className="p-4 space-y-3.5">
          {/* Stat Cards 4-grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="p-2.5 rounded-lg bg-[#0e1424] border border-slate-800/80">
              <div className="flex items-center justify-between text-slate-400 text-[10px]">
                <span>Patients</span>
                <Users className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-sm font-bold text-white mt-1">142</div>
              <div className="text-[9px] text-emerald-400 mt-0.5">+12 this week</div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0e1424] border border-slate-800/80">
              <div className="flex items-center justify-between text-slate-400 text-[10px]">
                <span>Doctors</span>
                <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <div className="text-sm font-bold text-white mt-1">18</div>
              <div className="text-[9px] text-slate-400 mt-0.5">Across 6 Depts</div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0e1424] border border-slate-800/80">
              <div className="flex items-center justify-between text-slate-400 text-[10px]">
                <span>Appointments</span>
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-sm font-bold text-white mt-1">34</div>
              <div className="text-[9px] text-blue-400 mt-0.5">8 In-Queue</div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0e1424] border border-slate-800/80">
              <div className="flex items-center justify-between text-slate-400 text-[10px]">
                <span>Billing</span>
                <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-sm font-bold text-white mt-1">₹42,500</div>
              <div className="text-[9px] text-emerald-400 mt-0.5">Settled today</div>
            </div>
          </div>

          {/* Appointments Mini Table */}
          <div className="rounded-lg bg-[#0d1220]/70 border border-slate-800/80 overflow-hidden">
            <div className="px-3 py-2 bg-[#0a0f1c] border-b border-slate-800/60 flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-200">Recent Appointments</span>
              <span className="text-[10px] text-slate-500 font-mono">Live Sync</span>
            </div>

            <div className="divide-y divide-slate-800/60 text-[11px]">
              <div className="px-3 py-2 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-[10px]">
                    RK
                  </div>
                  <div>
                    <div className="font-medium text-slate-200">Rajesh Kumar</div>
                    <div className="text-[10px] text-slate-400">Dr. Sharma &bull; Cardiology</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Confirmed
                  </span>
                  <div className="text-[9px] text-slate-500 mt-0.5">10:30 AM</div>
                </div>
              </div>

              <div className="px-3 py-2 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-[10px]">
                    AS
                  </div>
                  <div>
                    <div className="font-medium text-slate-200">Anitha Sundar</div>
                    <div className="text-[10px] text-slate-400">Dr. Priya &bull; Neurology</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Scheduled
                  </span>
                  <div className="text-[9px] text-slate-500 mt-0.5">11:15 AM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Architecture Status Tag */}
          <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500 font-mono">
            <span>Module: Java OOP + JDBC DAO</span>
            <span className="text-slate-400">Mockup UI representation</span>
          </div>
        </div>
      </div>
    );
  }

  // E-Commerce Mockup
  return (
    <div className="rounded-xl bg-[#090d16] border border-slate-800 overflow-hidden text-xs font-sans shadow-2xl select-none">
      {/* Top Window Bar */}
      <div className="px-4 py-2.5 bg-[#0d1220] border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-[11px] font-mono text-slate-300 ml-2 font-medium">
            TechStore // Catalog &amp; Cart
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-600/20 text-blue-300 border border-blue-500/30 text-[10px]">
            <ShoppingCart className="w-3 h-3" />
            <span>Cart ({cartCount})</span>
          </div>
        </div>
      </div>

      {/* Mockup Store Content */}
      <div className="p-4 space-y-3.5">
        {/* Search & Categories Bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0e1424] border border-slate-800 text-[11px] text-slate-400">
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span>Search electronics, peripherals...</span>
          </div>
          <span className="px-2 py-1.5 rounded-lg bg-slate-800/50 text-[10px] font-mono text-slate-300 border border-slate-700/50">
            All Products
          </span>
        </div>

        {/* Product Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Product 1 */}
          <div className="p-3 rounded-lg bg-[#0e1424] border border-slate-800/80 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase tracking-wider text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
                  Peripherals
                </span>
                <span className="text-[10px] text-amber-400">4.9 ★</span>
              </div>
              <div className="font-semibold text-slate-100 text-xs mt-1.5">
                Mechanical RGB Keyboard
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                Hot-swappable tactile blue switches
              </p>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="font-bold text-white text-xs">₹3,499</span>
              <button
                type="button"
                onClick={() => handleAddToCart('Keyboard')}
                className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-medium flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>{addedItem === 'Keyboard' ? 'Added!' : 'Add'}</span>
              </button>
            </div>
          </div>

          {/* Product 2 */}
          <div className="p-3 rounded-lg bg-[#0e1424] border border-slate-800/80 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase tracking-wider text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                  Accessories
                </span>
                <span className="text-[10px] text-amber-400">4.7 ★</span>
              </div>
              <div className="font-semibold text-slate-100 text-xs mt-1.5">
                Ergonomic Wireless Mouse
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                Dual-mode 2.4G &amp; Bluetooth sensor
              </p>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="font-bold text-white text-xs">₹1,299</span>
              <button
                type="button"
                onClick={() => handleAddToCart('Mouse')}
                className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-medium flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>{addedItem === 'Mouse' ? 'Added!' : 'Add'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Order Lifecycle Flow */}
        <div className="p-2.5 rounded-lg bg-[#0c101d] border border-slate-800/60">
          <div className="text-[10px] font-mono text-slate-400 mb-1.5">
            Order Fulfillment Pipeline
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-300">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle className="w-3 h-3" /> Placed
            </span>
            <span className="w-6 h-[1px] bg-slate-700" />
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle className="w-3 h-3" /> Verified
            </span>
            <span className="w-6 h-[1px] bg-slate-700" />
            <span className="flex items-center gap-1 text-blue-400">
              <Package className="w-3 h-3" /> Dispatched
            </span>
          </div>
        </div>

        {/* Architecture Status Tag */}
        <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500 font-mono">
          <span>Stack: HTML / CSS / JS / Java / MySQL</span>
          <span className="text-slate-400">Mockup UI representation</span>
        </div>
      </div>
    </div>
  );
};
