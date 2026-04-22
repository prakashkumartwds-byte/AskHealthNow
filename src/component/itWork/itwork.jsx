import React from 'react';

const steps = [
  {
    title: "AI Health Chat",
    desc: "Free general health guidance with friendly AI",
    icon: "🤖",
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "group-hover:border-blue-400"
  },
  {
    title: "Consult Doctors",
    desc: "Verified doctors available online & nearby",
    icon: "👨‍⚕️",
    gradient: "from-indigo-500/20 to-purple-500/20",
    border: "group-hover:border-indigo-400"
  },
  {
    title: "Nearby Medical Stores",
    desc: "Find trusted medical stores around you",
    icon: "🏥",
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "group-hover:border-emerald-400"
  },
  {
    title: "Diet & Lifestyle Plans",
    desc: "Simple meal plans & daily health habits",
    icon: "🍎",
    gradient: "from-orange-500/20 to-rose-500/20",
    border: "group-hover:border-orange-400"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            How It Works
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`group relative p-8 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-200/50 transition-all duration-300 hover:-translate-y-2 ${step.border}`}
            >
              {/* Decorative Background Blob */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl bg-gradient-to-br ${step.gradient} blur-xl -z-10`}></div>
              
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-3xl mb-6 shadow-inner`}>
                {step.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">
                {step.title}
              </h3>
              
              <p className="text-slate-500 leading-relaxed text-sm">
                {step.desc}
              </p>

              {/* Subtle Arrow for interactivity */}
              <div className="mt-6 flex items-center text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-teal-600 transition-colors">
                Learn More 
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <span className="inline-block px-6 py-2 rounded-full bg-white shadow-sm border border-gray-100 text-slate-600 italic text-md">
            "No pressure. No judgement. Just support."
          </span>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;