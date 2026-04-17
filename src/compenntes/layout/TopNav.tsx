import { Search, Bell, Moon, Sun } from 'lucide-react';

interface TopNavProps {
  isDark: boolean;
  onToggleTheme: () => void;
  pageTitle?: string;
}

export function TopNav({ isDark, onToggleTheme, pageTitle }: TopNavProps) {
  return (
    <header className="flex justify-between items-center mb-10 shrink-0">
      
      {/* Page title on the left side of topnav (optional) */}
      <div>
        {pageTitle && (
          <p className="text-sm font-bold text-slate-400 dark:text-white/40 tracking-widest uppercase">
            {pageTitle}
          </p>
        )}
      </div>

      {/* Controls (right aligned since RTL, appears on left visually) */}
      <div className="flex items-center gap-4">
        
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="البحث..."
            className="spatial-input w-56 h-11 rounded-full px-5 pl-11 text-sm"
          />
          <Search className="w-4 h-4 text-slate-400 dark:text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,102,255,0.35)] transition-all hover:scale-105 active:scale-95"
          title="تغيير المظهر"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button className="w-11 h-11 rounded-full bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-white hover:bg-white dark:hover:bg-white/10 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#1a1a24]" />
        </div>

        {/* User Avatar */}
        <div className="w-11 h-11 rounded-full border-2 border-primary/20 overflow-hidden shadow-lg shrink-0">
          <img src="https://i.pravatar.cc/150?img=11" alt="المستخدم" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
}
