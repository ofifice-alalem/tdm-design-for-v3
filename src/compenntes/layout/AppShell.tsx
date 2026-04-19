import { useEffect, useState } from 'react';
import { AppSidebar } from './AppSidebar';
import { TopNav } from './TopNav';

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * AppShell — the global application chrome.
 * Wraps every page with the sidebar + top navigation.
 *
 * Usage:
 * ```tsx
 * <AppShell activeItem="الفواتير">
 *   <YourPageContent />
 * </AppShell>
 * ```
 */
export function AppShell({ children }: AppShellProps) {
  const [isDark, setIsDark] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Initialise theme from localStorage / system preference
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const body = document.body;

    const useDark = saved === 'dark' || (!saved && prefersDark);
    applyTheme(useDark, body);
    setIsDark(useDark);
  }, []);

  function applyTheme(dark: boolean, body: HTMLElement = document.body) {
    if (dark) {
      document.documentElement.classList.add('dark');
      body.classList.add('body-bg-dark');
      body.classList.remove('body-bg-light');
    } else {
      document.documentElement.classList.remove('dark');
      body.classList.add('body-bg-light');
      body.classList.remove('body-bg-dark');
    }
  }

  const toggleTheme = () => {
    const next = !isDark;
    applyTheme(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setIsDark(next);
  };

  return (
    // Outer wrapper: exactly the viewport height, no overflow
    <div className="h-[100dvh] w-screen flex items-center justify-center p-0 lg:p-6 transition-colors duration-500 overflow-hidden bg-slate-100 dark:bg-slate-950 lg:bg-transparent">
      
      {/* Frosted-glass application window — fills available space */}
      <div className="spatial-window w-full h-full flex relative overflow-hidden rounded-none lg:rounded-[40px]">

        {/* Mobile Overlay for Sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998] lg:hidden animate-in fade-in duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* ── Sidebar ── */}
        <AppSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
        />

        {/* ── Content area ── */}
        <div className="flex-1 flex flex-col p-4 md:p-8 lg:p-10 overflow-y-auto min-w-0 h-full relative custom-scroll">
          
          {/* Top Nav (Modified for mobile) */}
          <div className="lg:hidden flex items-center mb-6">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center"
            >
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            </button>
            <span className="mr-4 font-black text-slate-800 dark:text-white text-lg">منصة نون</span>
          </div>

          <TopNav isDark={isDark} onToggleTheme={toggleTheme} />

          {/* Page content injected here */}
          <div className="flex-1">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}
