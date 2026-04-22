import React, { useState } from "react";
import { 
  Search, MapPin, Phone, Clock, Navigation, 
  ShieldCheck, Truck, Store, ChevronRight, Filter, Info
} from "lucide-react";

// Mock data for nearby medical stores
const STORES = [
  { 
    id: 1, 
    name: "Apollo Pharmacy", 
    area: "Sector 18, Noida", 
    distance: "0.8 km", 
    status: "Open 24/7", 
    delivery: true, 
    rating: 4.8, 
    specialty: "Wide Stock",
    image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=400"
  },
  { 
    id: 2, 
    name: "Wellness Forever", 
    area: "Indirapuram, GZB", 
    distance: "1.5 km", 
    status: "Open until 11 PM", 
    delivery: true, 
    rating: 4.5, 
    specialty: "Ayurvedic Specialist",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=400"
  },
  { 
    id: 3, 
    name: "Guardian Life Care", 
    area: "Sector 62, Noida", 
    distance: "2.1 km", 
    status: "Closing Soon", 
    delivery: false, 
    rating: 4.2, 
    specialty: "Surgical Equipment",
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=400"
  },
];

const MedicalStores = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* --- HERO SECTION: Focused on Finding --- */}
      <div className="bg-white border-b border-slate-200 pt-16 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-50/50 skew-x-12 translate-x-20" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <MapPin size={14} /> Local Search
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Locate Your Nearest <br />
              <span className="text-teal-600 underline decoration-teal-200 decoration-4">Trusted Pharmacy</span>
            </h1>
            <p className="mt-4 text-slate-500 text-lg font-medium">
              Connect with local medical stores for immediate availability, 
              home delivery, and expert pharmaceutical advice.
            </p>

            <div className="mt-8 flex flex-col md:flex-row gap-3">
              <div className="flex-1 flex items-center bg-white rounded-2xl px-5 py-4 border-2 border-slate-100 focus-within:border-teal-500 transition-all shadow-xl shadow-slate-200/40">
                <Search className="text-slate-400 mr-3" size={22} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter area or pharmacy name..." 
                  className="bg-transparent outline-none w-full text-slate-700 font-medium"
                />
              </div>
              <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black shadow-lg hover:bg-teal-700 transition-all active:scale-95">
                Find Stores
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar: Service Filters */}
          <aside className="w-full lg:w-72 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm sticky top-6">
              <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 uppercase text-xs tracking-widest">
                <Filter size={16} className="text-teal-500" /> Store Services
              </h3>
              
              <div className="space-y-4">
                {["Home Delivery", "Open 24/7", "Verified Partners", "Prescription Service", "Health Checkups"].map((service) => (
                  <label key={service} className="flex items-center group cursor-pointer">
                    <input type="checkbox" className="peer hidden" />
                    <div className="h-5 w-5 border-2 border-slate-200 rounded-md peer-checked:bg-teal-500 peer-checked:border-teal-500 transition-all" />
                    <span className="ml-3 text-sm font-bold text-slate-600 group-hover:text-teal-600 transition-colors">
                      {service}
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <div className="bg-slate-50 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-teal-600 mb-2">
                    <Info size={16} />
                    <span className="text-xs font-black uppercase">Note</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
                    Store timings and stock availability are updated by the stores directly. Always call ahead for critical medicines.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Store Results Area */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-slate-900">
                Verified Stores <span className="text-teal-600">Near You</span>
              </h2>
              <div className="text-sm font-bold text-slate-400">
                Showing {STORES.length} results
              </div>
            </div>

            <div className="grid gap-6">
              {STORES.map((store) => (
                <div key={store.id} className="group bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden flex flex-col md:flex-row hover:shadow-2xl hover:border-teal-200 transition-all duration-300">
                  {/* Store Image */}
                  <div className="w-full md:w-64 h-48 md:h-auto relative overflow-hidden">
                    <img src={store.image} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt={store.name} />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-teal-600 shadow-sm">
                        {store.distance}
                      </span>
                    </div>
                  </div>

                  {/* Store Details */}
                  <div className="flex-1 p-8">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-2xl font-black text-slate-900 tracking-tight">{store.name}</h4>
                          <ShieldCheck size={20} className="text-blue-500" />
                        </div>
                        <p className="flex items-center gap-1 text-slate-500 font-bold text-sm">
                          <MapPin size={14} className="text-teal-500" /> {store.area}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wide ${
                          store.status.includes('24/7') ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {store.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl text-sm font-bold text-slate-700">
                        <Store size={16} className="text-teal-500" /> {store.specialty}
                      </div>
                      {store.delivery && (
                        <div className="flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-xl text-sm font-bold text-teal-700">
                          <Truck size={16} /> Home Delivery
                        </div>
                      )}
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 border-t border-slate-100 pt-6">
                      <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black text-sm hover:bg-teal-700 transition-all">
                        <Phone size={16} /> Call Store
                      </button>
                      <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all">
                        <Navigation size={16} /> Directions
                      </button>
                      <button className="hidden sm:flex ml-auto items-center gap-1 text-teal-600 font-black text-sm uppercase tracking-widest hover:gap-3 transition-all">
                        View More <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* --- PLATFORM FEATURES --- */}
      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center text-white space-y-3">
              <div className="bg-teal-500/10 p-4 rounded-full text-teal-400">
                <ShieldCheck size={32} />
              </div>
              <h5 className="text-lg font-black">Verified Pharmacies</h5>
              <p className="text-slate-400 text-sm">We only list licensed medical stores with verified stock history.</p>
            </div>
            <div className="flex flex-col items-center text-center text-white space-y-3">
              <div className="bg-teal-500/10 p-4 rounded-full text-teal-400">
                <Truck size={32} />
              </div>
              <h5 className="text-lg font-black">Local Delivery</h5>
              <p className="text-slate-400 text-sm">Get medicines from your neighborhod store in under 60 minutes.</p>
            </div>
            <div className="flex flex-col items-center text-center text-white space-y-3">
              <div className="bg-teal-500/10 p-4 rounded-full text-teal-400">
                <Clock size={32} />
              </div>
              <h5 className="text-lg font-black">24/7 Support</h5>
              <p className="text-slate-400 text-sm">Find stores that are open late night for emergency medical needs.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MedicalStores;