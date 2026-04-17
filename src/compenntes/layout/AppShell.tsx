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
    <div className="h-screen w-screen flex items-center justify-center p-4 lg:p-6 transition-colors duration-500 overflow-hidden">
      
      {/* Frosted-glass application window — fills available space */}
      <div className="spatial-window w-full h-full flex relative overflow-hidden">

        {/* ── Sidebar: stretches full height ──────────── */}
        <AppSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
        />

        {/* ── Content area: only this part scrolls ───── */}
        <div className="flex-1 flex flex-col p-8 lg:p-10 overflow-y-auto min-w-0 h-full">
          
          {/* Top Nav */}
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
