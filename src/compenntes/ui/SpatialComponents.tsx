import { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────
   SpatialCard — بطاقة زجاجية قابلة لإعادة الاستخدام
───────────────────────────────────────── */
export function SpatialCard({
  title,
  icon,
  children,
  action,
  headerDot = true,
  hideHeader = false,
  className = "",
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
  headerDot?: boolean;
  hideHeader?: boolean;
  className?: string;
}) {
  return (
    <div className={`spatial-card ${className}`}>
      <div className="p-6 flex flex-col h-full">
        {!hideHeader && (
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {headerDot && (
                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,102,255,0.5)]" />
              )}
              {icon && (
                <div className="text-slate-500 dark:text-white/70">{icon}</div>
              )}
              <h2 className="text-[17px] font-bold text-slate-800 dark:text-white tracking-wide transition-colors">
                {title}
              </h2>
            </div>
            {action && <div>{action}</div>}
          </div>
        )}
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ModernInput — حقل إدخال انسيابي
───────────────────────────────────────── */
export function ModernInput({
  label,
  type = 'text',
  placeholder,
  className = '',
}: {
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-xs font-bold text-slate-700 dark:text-white/75 uppercase tracking-widest">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="spatial-input h-14 rounded-[20px] px-5 text-[15px] font-bold w-full"
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   ModernSelect — قائمة منسدلة مخصصة بالكامل
───────────────────────────────────────── */
export function ModernSelect({
  label,
  options,
  className = '',
  placeholder = 'اختر...',
}: {
  label: string;
  options: string[];
  className?: string;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Auto-focus search when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchRef.current?.focus(), 50);
    } else {
      setSearch('');
    }
  }, [isOpen]);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`flex flex-col gap-2 ${className}`} ref={ref}>
      {label && (
        <label className="text-xs font-bold text-slate-700 dark:text-white/75 uppercase tracking-widest">
          {label}
        </label>
      )}
      <div className="relative">

        {/* Trigger */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`
            spatial-input h-14 rounded-[20px] px-5 text-[15px] font-bold w-full
            flex items-center justify-between cursor-pointer select-none
            ${isOpen ? 'ring-2 ring-primary/40 border-primary/50 dark:border-primary/40 bg-white dark:bg-black/40' : ''}
          `}
        >
          <span className={selected ? 'text-slate-800 dark:text-white' : 'text-slate-600 dark:text-white/60'}>
            {selected || placeholder}
          </span>
          <div
            className="text-slate-400 dark:text-white/50 transition-transform duration-300"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Dropdown Panel */}
        {isOpen && (
          <div className="
            absolute z-[200] top-full mt-2 w-full
            rounded-[24px] overflow-hidden
            bg-white dark:bg-[#18181d]
            border border-black/8 dark:border-white/10
            shadow-[0_24px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.6)]
            backdrop-blur-2xl
            animate-in fade-in zoom-in-95 duration-200
          ">

            {/* Search Input */}
            <div className="p-3 border-b border-black/5 dark:border-white/5">
              <div className="relative">
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-white/40 pointer-events-none"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="بحث سريع..."
                  className="
                    w-full h-11 rounded-[14px] pr-11 pl-4
                    bg-black/5 dark:bg-white/5
                    border border-transparent focus:border-primary/30
                    text-[14px] font-bold text-slate-700 dark:text-white
                    placeholder:text-slate-400 dark:placeholder:text-white/30
                    outline-none transition-all
                  "
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {/* Options List */}
            <ul className="max-h-52 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <li className="px-4 py-4 text-center text-sm font-bold text-slate-400 dark:text-white/30">
                  لا توجد نتائج
                </li>
              ) : (
                filtered.map((opt) => (
                  <li
                    key={opt}
                    onClick={() => { setSelected(opt); setIsOpen(false); }}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-[14px] cursor-pointer
                      text-[15px] font-bold transition-all duration-150
                      ${selected === opt
                        ? 'bg-primary text-white shadow-[0_4px_14px_rgba(0,102,255,0.35)]'
                        : 'text-slate-700 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/8 hover:text-slate-900 dark:hover:text-white'
                      }
                    `}
                  >
                    {/* Checkmark for selected */}
                    <span className={`w-4 h-4 shrink-0 rounded-full border-2 flex items-center justify-center transition-all
                      ${selected === opt ? 'border-white bg-white/30' : 'border-slate-300 dark:border-white/20'}`}>
                      {selected === opt && (
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                    {opt}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

