import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  MapPin,
  Star,
  Clock,
  Stethoscope,
  Building2,
  FlaskConical,
  Headset,
  ChevronDown,
  Filter,
  CheckCircle2,
  CalendarDays,
  ChevronRight
} from "lucide-react";

const NEARBY_DOCTORS = [
  {
    id: "abhishek_verma",
    name: "Dr. Abhishek Verma",
    specialty: "Internal Medicine Physician",
    experience: "12+ Years Exp.",
    rating: 4.9,
    reviews: 155,
    location: "Fortis Hospital, Sec 62, Noida",
    distance: "900m away",
    hours: "02:00 PM - 06:30 PM",
    fee: "₹800",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abhishek",
    slots: ["02:30 PM", "03:15 PM", "05:00 PM"],
    isRecommended: true
  },
  {
    id: "chauhan_vs",
    name: "Dr. V. S. Chauhan",
    specialty: "Gastro & Robotic Surgeon",
    experience: "18+ Years Exp.",
    rating: 5.0,
    reviews: 210,
    location: "Fortis Hospital, Sec 62, Noida",
    distance: "900m away",
    hours: "10:00 AM - 09:00 PM",
    fee: "₹1000",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=VS",
    slots: ["11:00 AM", "12:30 PM", "04:00 PM"],
    isRecommended: true
  },
  {
    id: "polyclinic_21",
    name: "Goodhealth21 Polyclinic",
    specialty: "Diagnostic & Polyclinic",
    experience: "Established 2015",
    rating: 4.9,
    reviews: 180,
    location: "Vaibhav Khand, Indirapuram",
    distance: "1.2km away",
    hours: "07:30 AM - 09:00 PM",
    fee: "₹500",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Polyclinic",
    slots: ["08:00 AM", "09:30 AM", "10:15 AM"],
    isRecommended: false
  },
];

const distances = [
  { value: "2", label: "Within 2 km" },
  { value: "5", label: "Within 5 km" },
  { value: "10", label: "Within 10 km" },
  { value: "15", label: "Within 15 km" },
  { value: "25", label: "Within 25 km" },
  { value: "50", label: "Within 50 km" },
];

const specialties = [
  "All Specialties",
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedic",
  "Pediatrician",
  "Gynecologist",
  "Dentist",
  "Ophthalmologist",
  "Psychiatrist",
  "ENT Specialist",
  "Diabetologist",
];

const CustomDropdown = ({
  icon: IconComponent,
  options,
  value,
  onChange,
  isObject = false,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const displayLabel = isObject
    ? options.find((o) => o.value === value)?.label || options[0]?.label
    : value;

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 sm:px-4 py-3 text-sm font-medium text-slate-700 transition-all hover:border-teal-300 hover:bg-slate-50"
      >
        {IconComponent && (
          <IconComponent className="shrink-0 text-teal-600" size={15} />
        )}
        <span className="flex-1 truncate text-left">{displayLabel}</span>
        <ChevronDown
          size={14}
          className={`shrink-0 text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60">
          {options.map((opt) => {
            const label = isObject ? opt.label : opt;
            const val = isObject ? opt.value : opt;
            const isSelected = value === val;

            return (
              <button
                type="button"
                key={val}
                onClick={() => {
                  onChange(val);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${
                  isSelected
                    ? "bg-teal-50 font-semibold text-teal-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {isSelected && (
                  <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                )}
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ConsultDoctor = () => {
  const [activeTab, setActiveTab] = useState("Find Doctor");
  const [distance, setDistance] = useState("5");
  const [specialty, setSpecialty] = useState("All Specialties");
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#F8FAFC] overflow-x-hidden">
      {/* SECTION 1: TOP SEARCH BAR */}
      <div className="border-b border-slate-200 bg-white pt-6 sm:pt-8 pb-8 sm:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-sm">
            {/* Tabs */}
            <div className="mb-4 flex overflow-x-auto border-b border-slate-200 px-1 sm:px-2 no-scrollbar">
              {[
                { name: "Find Doctor", icon: Stethoscope },
                { name: "Find Medical Store", icon: Building2 },
                { name: "Find Labs", icon: FlaskConical },
              ].map((tab) => (
                <button
                  type="button"
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`relative flex shrink-0 items-center gap-2 px-4 sm:px-6 py-3 text-xs sm:text-sm font-bold whitespace-nowrap ${
                    activeTab === tab.name ? "text-teal-600" : "text-slate-500"
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.name}
                  {activeTab === tab.name && (
                    <div className="absolute bottom-[-1px] left-0 h-[2.5px] w-full rounded-full bg-teal-500" />
                  )}
                </button>
              ))}
            </div>

            {/* Search Form */}
            <div className="grid grid-cols-1 gap-3 px-2 pb-2 md:grid-cols-10 md:gap-2">
              <div className="md:col-span-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100">
                <Search className="shrink-0 text-slate-400" size={17} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search doctors, specialties..."
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="md:col-span-2">
                <CustomDropdown
                  icon={MapPin}
                  options={distances}
                  value={distance}
                  onChange={setDistance}
                  isObject={true}
                />
              </div>

              <div className="md:col-span-2">
                <CustomDropdown
                  icon={Stethoscope}
                  options={specialties}
                  value={specialty}
                  onChange={setSpecialty}
                  isObject={false}
                />
              </div>

              <button
                type="button"
                className="md:col-span-2 flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-teal-200 transition-all hover:bg-teal-700 active:scale-95"
              >
                <Search size={15} />
                Search Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: FILTER + DOCTORS */}
      <div className="mx-auto mt-8 sm:mt-12 max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 lg:shrink-0">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 lg:sticky lg:top-24">
              <h3 className="mb-6 flex items-center gap-2 border-b pb-4 font-black text-slate-900">
                <Filter size={18} /> Filters
              </h3>

              <p className="mb-4 text-xs font-black uppercase text-slate-400">
                Availability
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {["Available Today", "Available Tomorrow", "Weekend Open"].map(
                  (item) => (
                    <label
                      key={item}
                      className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-teal-600"
                      />
                      <span>{item}</span>
                    </label>
                  )
                )}
              </div>
            </div>
          </aside>

          {/* Doctors Listing */}
          <div className="flex-1 pb-20">
            <h2 className="mb-6 sm:mb-8 px-1 sm:px-2 text-xl sm:text-2xl font-black text-slate-900">
              Verified Doctors <span className="text-teal-600">Near You</span>
            </h2>

            <div className="grid gap-6">
              {NEARBY_DOCTORS.map((doc) => (
                <div
                  key={doc.id}
                  className="group relative flex flex-col rounded-[2rem] border border-slate-200 bg-white transition-all hover:border-teal-200 hover:shadow-xl hover:shadow-slate-200/50 overflow-hidden md:flex-row"
                >
                  {/* Recommended Badge */}
                  {doc.isRecommended && (
                    <div className="absolute left-0 top-0 bg-teal-600 px-4 py-1.5 rounded-br-2xl z-10">
                       <span className="text-[10px] font-black uppercase tracking-widest text-white">Highly Recommended</span>
                    </div>
                  )}

                  {/* Left Section: Doctor Info */}
                  <div className="flex flex-1 flex-col p-6 sm:p-8 md:flex-row gap-6">
                    {/* Avatar Block */}
                    <div className="flex flex-col items-center gap-3 shrink-0">
                      <div className="relative">
                        <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-[2rem] border-4 border-slate-50 bg-slate-100 overflow-hidden shadow-inner">
                          <img
                            src={doc.image}
                            alt={doc.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-md">
                          <CheckCircle2 size={20} className="text-teal-500 fill-teal-50" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1 border border-slate-100">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        <span className="text-sm font-black text-slate-700">{doc.rating}</span>
                        <span className="text-xs font-bold text-slate-400">({doc.reviews})</span>
                      </div>
                    </div>

                    {/* Text Details */}
                    <div className="flex flex-1 flex-col justify-center text-center md:text-left">
                      <div className="mb-2">
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-teal-600 transition-colors">
                          {doc.name}
                        </h3>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-1">
                          <span className="text-sm font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">{doc.specialty}</span>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">• {doc.experience}</span>
                        </div>
                      </div>

                      <div className="space-y-2 mt-3 text-sm font-semibold text-slate-500">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                          <MapPin size={16} className="shrink-0 text-slate-400" />
                          <span>{doc.location}</span>
                          <span className="text-xs text-teal-600 font-bold bg-teal-50 px-2 rounded-full">{doc.distance}</span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-2">
                          <Clock size={16} className="shrink-0 text-slate-400" />
                          <span>Available Today: <span className="text-slate-700">{doc.hours}</span></span>
                        </div>
                      </div>

                      {/* Slots Preview */}
                      <div className="mt-5">
                         <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Next Available Slots</p>
                         <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            {doc.slots.map(slot => (
                              <button key={slot} className="px-3 py-1.5 rounded-lg border border-slate-100 bg-slate-50 text-xs font-bold text-slate-600 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-600 transition-all">
                                {slot}
                              </button>
                            ))}
                            <button className="px-2 py-1.5 text-xs font-black text-teal-600 hover:underline">
                              +More
                            </button>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section: Pricing & Action (The Sidebar) */}
                  <div className="w-full md:w-64 bg-slate-50/50 border-t md:border-t-0 md:border-l border-slate-100 p-6 sm:p-8 flex flex-col justify-center items-center md:items-stretch">
                    <div className="text-center md:text-right mb-6">
                      <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Consultation Fee</p>
                      <p className="text-3xl font-black text-slate-900 leading-none mt-1">
                        {doc.fee}
                      </p>
                    </div>

                    <div className="space-y-3 w-full">
                      <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-teal-600 py-4 text-sm font-black text-white shadow-lg shadow-teal-100 transition hover:bg-teal-700 hover:-translate-y-0.5 active:scale-95"
                      >
                        <CalendarDays size={18} />
                        Book Appointment
                      </button>
                      <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-white border border-slate-200 py-3.5 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                      >
                        View Profile
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: WE HELP YOU WITH */}
      <div className="border-t border-slate-200 bg-slate-100/50 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-8 sm:mb-10 text-center md:text-left text-2xl sm:text-3xl font-black text-slate-900">
            We Help You <span className="text-teal-600">With</span>
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: "Chat with AI to Decide",
                desc: "Instantly check symptoms and get guidance on which specialist to see.",
                icon: Headset,
                btn: "Start Chat",
                bg: "bg-blue-50/50",
                border: "border-blue-100",
              },
              {
                title: "Find the Right Doctor",
                desc: "Book appointments with top verified specialists in your immediate area.",
                icon: Stethoscope,
                btn: "Search Doctors",
                bg: "bg-emerald-50/50",
                border: "border-emerald-100",
              },
              {
                title: "Locate Labs for Tests",
                desc: "Find diagnostic centers for blood work, X-Rays, and full body checkups.",
                icon: FlaskConical,
                btn: "Find Labs",
                bg: "bg-teal-50/50",
                border: "border-teal-100",
              },
            ].map((service) => (
              <div
                key={service.title}
                className={`${service.bg} ${service.border} group flex flex-col items-center rounded-[28px] sm:rounded-[40px] border p-6 sm:p-8 text-center transition hover:bg-white hover:shadow-2xl`}
              >
                <div className="mb-5 sm:mb-6 rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 text-teal-600 shadow-sm transition group-hover:scale-110">
                  <service.icon size={32} />
                </div>
                <h3 className="mb-3 text-lg sm:text-xl font-extrabold text-slate-900">
                  {service.title}
                </h3>
                <p className="mb-6 sm:mb-8 flex-1 text-sm leading-relaxed text-slate-600">
                  {service.desc}
                </p>
                <button
                  type="button"
                  className="w-full rounded-2xl bg-teal-600 py-3.5 sm:py-4 text-sm font-bold text-white shadow-lg transition hover:bg-teal-700"
                >
                  {service.btn}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultDoctor;