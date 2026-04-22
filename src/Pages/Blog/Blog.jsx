import React, { useState } from "react";
import { 
  Search, 
  Clock, 
  User, 
  ChevronRight, 
  Bookmark, 
  Share2, 
  ArrowRight,
  Stethoscope,
  TrendingUp,
  Mail
} from "lucide-react";

const CATEGORIES = ["All", "Wellness", "Doctor Advice", "Medicine Tips", "Lab Tests", "Nutrition"];

const POSTS = [
  {
    id: 1,
    title: "How to choose the right General Physician for your family",
    excerpt: "Finding a doctor isn't just about location. Learn the 5 key factors you should consider before booking your next appointment...",
    author: "Dr. Sarah Johnson",
    category: "Doctor Advice",
    date: "Oct 12, 2023",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
    isFeatured: true
  },
  {
    id: 2,
    title: "Understanding Blood Tests: What your results actually mean",
    excerpt: "Deciphering lab reports can be stressful. We break down common markers like LDL, Hemoglobin, and Vitamin D levels...",
    author: "Lab Expert Team",
    category: "Lab Tests",
    date: "Oct 10, 2023",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1579152276506-2d5c2354a5a7?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    title: "The 10-minute morning routine for better mental health",
    excerpt: "Small habits lead to big changes. Discover how a 10-minute morning ritual can lower cortisol levels and improve focus...",
    author: "Wellness Coach Mark",
    category: "Wellness",
    date: "Oct 08, 2023",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400",
  }
];

const HealthBlog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* --- HEADER --- */}
      <div className="bg-white border-b border-slate-100 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            <TrendingUp size={14} /> Health Insights
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
            Your Guide to <span className="text-teal-600">Better Living</span>
          </h1>
          <p className="mt-6 text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Expert-backed medical advice, wellness tips, and deep dives into healthcare—delivered to help you stay informed.
          </p>
          
          {/* Search Bar */}
          <div className="mt-10 max-w-xl mx-auto relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search articles, symptoms, or topics..."
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all shadow-sm font-medium"
            />
          </div>
        </div>
      </div>

      {/* --- CATEGORY NAVIGATION --- */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 overflow-x-auto no-scrollbar">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
          <div className="flex items-center justify-center gap-2 md:gap-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-black whitespace-nowrap transition-all ${
                  activeCategory === cat 
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                  : "text-slate-500 hover:text-teal-600 hover:bg-teal-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {/* --- FEATURED ARTICLE --- */}
        {POSTS.filter(p => p.isFeatured).map(featured => (
          <section key={featured.id} className="mb-20">
            <div className="group relative grid lg:grid-cols-2 gap-8 items-center bg-white rounded-[3rem] border border-slate-200 p-6 sm:p-10 hover:shadow-2xl transition-all duration-500">
              <div className="overflow-hidden rounded-[2rem] aspect-[4/3] lg:aspect-auto h-full">
                <img src={featured.image} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" alt="Featured" />
              </div>
              <div className="flex flex-col justify-center space-y-6">
                <div className="flex items-center gap-3">
                  <span className="bg-teal-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                    Featured Article
                  </span>
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                    <Clock size={14} /> {featured.readTime}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                  {featured.title}
                </h2>
                <p className="text-slate-500 text-lg font-medium leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">{featured.author}</p>
                      <p className="text-xs font-bold text-slate-400">{featured.date}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-teal-600 font-black text-sm uppercase tracking-widest hover:gap-4 transition-all">
                    Read Story <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* --- RECENT POSTS GRID --- */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {POSTS.filter(p => !p.isFeatured).map(post => (
            <article key={post.id} className="group bg-white rounded-[2.5rem] border border-slate-200 p-4 hover:shadow-xl hover:border-teal-100 transition-all">
              <div className="relative overflow-hidden rounded-[2rem] mb-6 aspect-video">
                <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="Blog" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-teal-600">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="px-2 space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Clock size={12} /> {post.readTime} • {post.date}
                </div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-teal-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="pt-6 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                       <User size={16} />
                     </div>
                     <span className="text-xs font-bold text-slate-900">{post.author}</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors">
                        <Bookmark size={18} />
                     </button>
                     <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors">
                        <Share2 size={18} />
                     </button>
                   </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* --- NEWSLETTER SECTION --- */}
        <section className="mt-24 bg-slate-900 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden">
           {/* Decorative circles */}
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl" />
           <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
           
           <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="bg-teal-500/10 w-16 h-16 rounded-3xl flex items-center justify-center text-teal-400 mx-auto mb-4">
                <Mail size={32} />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Health in your <span className="text-teal-400 underline underline-offset-8 decoration-teal-400/30">Inbox</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium">
                Join 10k+ readers. Get the latest medical trends and wellness secrets delivered every Sunday.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:bg-white/10 focus:border-teal-400 transition-all font-medium"
                />
                <button className="bg-teal-500 text-slate-900 px-8 py-4 rounded-2xl font-black hover:bg-teal-400 transition-all active:scale-95 shadow-lg shadow-teal-500/20">
                  Subscribe Now
                </button>
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                No spam. Unsubscribe anytime.
              </p>
           </div>
        </section>
      </main>

      {/* --- FOOTER CTA --- */}
      <footer className="bg-white border-t border-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="text-xl font-black text-slate-900">Need medical advice now?</h4>
            <p className="text-slate-500 font-medium">Connect with a verified specialist in minutes.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:bg-teal-600 transition-all">
              <Stethoscope size={18} /> Find a Doctor
            </button>
            <button className="flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all">
              Nearby Stores <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HealthBlog;