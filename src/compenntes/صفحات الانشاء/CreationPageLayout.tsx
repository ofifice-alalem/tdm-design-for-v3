import React, { useEffect, useState, useRef } from 'react';
import { Search, Bell, Home, Heart, MessageCircle, FileText, User, LayoutGrid, Power, Moon, Sun, PanelRightClose, PanelRightOpen } from 'lucide-react';

interface CreationPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export function CreationPageLayout({
  title,
  subtitle,
  children,
  sidebar,
}: CreationPageLayoutProps) {
  const [isDark, setIsDark] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const body = document.body;
    
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      document.documentElement.classList.add('dark');
      body.classList.add('body-bg-dark');
      body.classList.remove('body-bg-light');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      body.classList.add('body-bg-light');
      body.classList.remove('body-bg-dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const body = document.body;
    if (isDark) {
      document.documentElement.classList.remove('dark');
      body.classList.add('body-bg-light');
      body.classList.remove('body-bg-dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      body.classList.add('body-bg-dark');
      body.classList.remove('body-bg-light');
      localStorage.setItem('theme', 'dark');
    }
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen py-10 px-4 lg:px-8 flex items-center justify-center transition-colors duration-500">
      
      {/* The Massive Spatial Window Overlay */}
      <div className="spatial-window w-[98vw] max-w-[1700px] min-h-[88vh] flex relative">
        
        {/* State-Managed Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-[88px]'} transition-all duration-500 overflow-hidden border-l border-black/5 dark:border-white/[0.08] flex flex-col py-8 h-full bg-white/20 dark:bg-white/[0.02] relative z-50`}>
          
          {/* Top Bar: Logo & Toggle Button */}
          <div className={`flex items-center w-full mb-8 ${isSidebarOpen ? 'justify-between px-5' : 'justify-center px-0'}`}>
            {isSidebarOpen && (
              <div className="flex items-center gap-3 animate-in fade-in transition-all">
                <div className="w-10 h-10 bg-black/10 dark:bg-white/10 rounded-xl flex items-center justify-center font-bold tracking-tighter text-slate-800 dark:text-white transition-colors duration-500 text-lg shadow-inner">
                  M<span className="text-primary">+</span>
                </div>
                <span className="text-xl font-black text-slate-800 dark:text-white whitespace-nowrap">
                  منصة نون
                </span>
              </div>
            )}
            
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 dark:text-white/50 hover:text-slate-800 dark:hover:text-white transition-all focus:outline-none"
              title="طي القائمة"
            >
              {isSidebarOpen ? <PanelRightClose className="w-5 h-5" /> : <PanelRightOpen className="w-5 h-5" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col gap-3 mt-6 w-full px-4">
            
            <button className={`flex items-center w-full p-2 rounded-[20px] transition-all duration-300 group ${!isSidebarOpen && 'justify-center'} hover:bg-black/5 dark:hover:bg-white/5`}>
              <div className="w-12 h-12 shrink-0 rounded-[14px] flex items-center justify-center bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 text-slate-500 dark:text-white/50 group-hover:text-primary transition-all shadow-sm">
                 <Home className="w-5 h-5" />
              </div>
              {isSidebarOpen && <span className="text-[15px] font-bold text-slate-600 dark:text-white/70 group-hover:text-slate-900 dark:group-hover:text-white mr-4 animate-in fade-in whitespace-nowrap">الرئيسية</span>}
            </button>
            
            <button className={`flex items-center w-full p-2 rounded-[20px] transition-all duration-300 group ${!isSidebarOpen && 'justify-center'} hover:bg-black/5 dark:hover:bg-white/5`}>
              <div className="w-12 h-12 shrink-0 rounded-[14px] flex items-center justify-center bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 text-slate-500 dark:text-white/50 group-hover:text-primary transition-all shadow-sm">
                 <Heart className="w-5 h-5" />
              </div>
              {isSidebarOpen && <span className="text-[15px] font-bold text-slate-600 dark:text-white/70 group-hover:text-slate-900 dark:group-hover:text-white mr-4 animate-in fade-in whitespace-nowrap">المفضلة</span>}
            </button>

            <button className={`flex items-center w-full p-2 rounded-[20px] transition-all duration-300 group ${!isSidebarOpen && 'justify-center'} hover:bg-black/5 dark:hover:bg-white/5`}>
              <div className="w-12 h-12 shrink-0 rounded-[14px] flex items-center justify-center bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 text-slate-500 dark:text-white/50 group-hover:text-primary transition-all shadow-sm">
                 <MessageCircle className="w-5 h-5" />
              </div>
              {isSidebarOpen && <span className="text-[15px] font-bold text-slate-600 dark:text-white/70 group-hover:text-slate-900 dark:group-hover:text-white mr-4 animate-in fade-in whitespace-nowrap">الرسائل</span>}
            </button>
            
            {/* Active Item - Sleek Glowing Blue */}
            <button className={`flex items-center w-full p-2 rounded-[20px] transition-all duration-300 group ${!isSidebarOpen && 'justify-center'} bg-primary shadow-[0_4px_20px_rgba(0,102,255,0.4)]`}>
              <div className="w-12 h-12 shrink-0 rounded-[14px] flex items-center justify-center bg-white/20 text-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] backdrop-blur-md">
                 <FileText className="w-5 h-5 drop-shadow-md" />
              </div>
              {isSidebarOpen && <span className="text-[15px] font-bold text-white mr-4 animate-in fade-in whitespace-nowrap drop-shadow-sm">الفواتير العالقة</span>}
            </button>

            <button className={`flex items-center w-full p-2 rounded-[20px] transition-all duration-300 group ${!isSidebarOpen && 'justify-center'} hover:bg-black/5 dark:hover:bg-white/5`}>
              <div className="w-12 h-12 shrink-0 rounded-[14px] flex items-center justify-center bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 text-slate-500 dark:text-white/50 group-hover:text-primary transition-all shadow-sm">
                 <User className="w-5 h-5" />
              </div>
              {isSidebarOpen && <span className="text-[15px] font-bold text-slate-600 dark:text-white/70 group-hover:text-slate-900 dark:group-hover:text-white mr-4 animate-in fade-in whitespace-nowrap">العملاء</span>}
            </button>

            <button className={`flex items-center w-full p-2 rounded-[20px] transition-all duration-300 group ${!isSidebarOpen && 'justify-center'} hover:bg-black/5 dark:hover:bg-white/5`}>
              <div className="w-12 h-12 shrink-0 rounded-[14px] flex items-center justify-center bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 text-slate-500 dark:text-white/50 group-hover:text-primary transition-all shadow-sm">
                 <LayoutGrid className="w-5 h-5" />
              </div>
              {isSidebarOpen && <span className="text-[15px] font-bold text-slate-600 dark:text-white/70 group-hover:text-slate-900 dark:group-hover:text-white mr-4 animate-in fade-in whitespace-nowrap">مخزون المنتجات</span>}
            </button>
            
          </nav>
          
          <div className="px-4 w-full mt-auto pt-4 border-t border-black/5 dark:border-white/5">
            <button className={`flex items-center w-full p-2 rounded-[20px] transition-all duration-300 group ${!isSidebarOpen && 'justify-center'} hover:bg-red-500/10`}>
              <div className="w-12 h-12 shrink-0 rounded-[14px] flex items-center justify-center bg-red-500/5 text-red-400 group-hover:bg-red-500 group-hover:text-white transition-all">
                 <Power className="w-5 h-5" />
              </div>
              {isSidebarOpen && <span className="text-[15px] font-bold text-red-400 group-hover:text-red-500 mr-4 animate-in fade-in whitespace-nowrap">تسجيل الخروج</span>}
            </button>
          </div>
        </aside>

        {/* Main Application Area */}
        <div className="flex-1 flex flex-col p-8 lg:p-12 relative overflow-y-auto w-full">
          
          {/* Top Header Controls */}
          <header className="flex justify-between items-center mb-12">
            <div></div> {/* Empty div to keep flex space-between correct since we removed left buttons */}
            
            <div className="flex items-center gap-6">
              {/* Search Bar */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="البحث..." 
                  className="spatial-input w-64 h-12 rounded-full px-6 pl-12 text-sm"
                />
                <Search className="w-4 h-4 text-slate-400 dark:text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
              
              {/* Theme Toggle Button replacing Phone */}
              <button 
                onClick={toggleTheme}
                className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,102,255,0.4)] transition-all"
                title="تغيير المظهر"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <div className="relative">
                <button className="w-12 h-12 rounded-full bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-white hover:bg-white dark:hover:bg-white/10 transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-[#1a1a24]"></span>
              </div>
              
              {/* User Avatar */}
              <div className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/20 overflow-hidden shadow-lg">
                <img src="https://i.pravatar.cc/150?img=11" alt="User" />
              </div>
            </div>
          </header>

          {/* Form Body Area Layout */}
          <div className="flex flex-col lg:flex-row gap-10 items-start flex-1 h-full w-full">
            <main className="flex-1 w-full space-y-8">
              <div className="mb-4">
                <h1 className="text-4xl lg:text-6xl font-black text-slate-800 dark:text-white leading-tight tracking-tight drop-shadow-sm dark:drop-shadow-lg transition-colors duration-500">
                  {title}
                </h1>
                {subtitle && <p className="text-slate-500 dark:text-white/50 text-lg mt-6 max-w-sm transition-colors">{subtitle}</p>}
                
                {/* Embedded within the form */}
                <div className="mt-8">{children}</div>
              </div>
            </main>
            
            {/* The left sidebar containing Notes and Submission */}
            {sidebar && (
              <aside className="w-full lg:w-[400px] xl:w-[500px] shrink-0 flex flex-col gap-6">
                {sidebar}
              </aside>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export function SpatialCard({
  title,
  icon,
  children,
  action,
  headerDot = true,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
  headerDot?: boolean;
}) {
  return (
    <div className="spatial-card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             {headerDot && <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"></span>}
            {icon && (
              <div className="text-slate-500 dark:text-white/70">
                {icon}
              </div>
            )}
            <h2 className="text-[17px] font-bold text-slate-800 dark:text-white tracking-wide transition-colors">{title}</h2>
          </div>
          {action && <div>{action}</div>}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export function ModernInput({ label, type = "text", placeholder, className = "" }: { label: string, type?: string, placeholder?: string, className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-widest">{label}</label>}
      <input 
        type={type} 
        placeholder={placeholder} 
        className="spatial-input h-14 rounded-[20px] px-5 text-[15px] font-bold w-full" 
      />
    </div>
  );
}

export function ModernSelect({ label, options, className = "" }: { label: string, options: string[], className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`flex flex-col gap-2 ${className}`} ref={ref}>
      {label && <label className="text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-widest">{label}</label>}
      <div className="relative">
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className={`spatial-input h-14 rounded-[20px] px-5 text-[15px] font-bold w-full flex items-center justify-between cursor-pointer ${isOpen ? 'ring-1 ring-primary/50 dark:ring-white/20 border-primary/50 dark:border-white/30 bg-white dark:bg-black/40' : ''}`}
        >
          <span className={selected ? 'text-slate-800 dark:text-white' : 'text-slate-400 dark:text-white/40'}>
            {selected || "اختر..."}
          </span>
          <div className="text-slate-400 dark:text-white/50 transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
        
        {isOpen && (
          <div className="absolute z-[100] top-full mt-2 w-full rounded-[24px] bg-white/95 dark:bg-[#1c1c21]/90 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <ul className="max-h-56 overflow-auto p-2">
              {options.map((opt, i) => (
                <li 
                  key={i} 
                  onClick={() => { setSelected(opt); setIsOpen(false); }}
                  className={`px-4 py-3 rounded-xl cursor-pointer transition-colors text-[15px] font-bold ${selected === opt ? 'bg-primary text-white shadow-[0_0_15px_rgba(0,102,255,0.3)]' : 'text-slate-700 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
