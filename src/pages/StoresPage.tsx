import { useState, useEffect, useRef } from 'react';
import { Plus, Search, Store, TrendingDown, TrendingUp, Wallet, AlertCircle, Settings, Eye, Building2, ChevronDown, ChevronRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const STATS = [
  { label: 'ديون سابقة',              value: 202416,  color: 'text-orange-500',  bg: 'bg-orange-500/10',  icon: <AlertCircle className="w-5 h-5" /> },
  { label: 'إجمالي الفواتير',          value: 334027,  color: 'text-primary',     bg: 'bg-primary/10',     icon: <TrendingUp className="w-5 h-5" /> },
  { label: 'إجمالي المدفوع والمرتجع',  value: 338583,  color: 'text-emerald-500', bg: 'bg-emerald-500/10', icon: <Wallet className="w-5 h-5" /> },
  { label: 'إجمالي المتبقي',           value: 197860,  color: 'text-rose-500',    bg: 'bg-rose-500/10',    icon: <TrendingDown className="w-5 h-5" /> },
];

const COMPANIES = [
  {
    id: 1,
    name: 'شركة العالم',
    owner: 'محمد أحمد',
    approved: 55000,
    pending: -15000,
    total: 40000,
    type: 'مدين',
    active: true,
    branches: [
      { id: 101, name: 'فرع تاجوراء', marketer: 'محمد البحري', approved: 21193, pending: -8550, total: 12643, type: 'مدين', active: true },
      { id: 102, name: 'فرع سوق الجمعة', marketer: 'أحمد علي', approved: 19548, pending: -2000, total: 17548, type: 'مدين', active: true },
      { id: 103, name: 'فرع المشتل', marketer: 'محمد البحري', approved: 14259, pending: -4450, total: 9809, type: 'مدين', active: true },
    ],
  },
  {
    id: 2,
    name: 'شركة النجاح',
    owner: 'علي محمود',
    approved: 38500,
    pending: -13610,
    total: 24890,
    type: 'مدين',
    active: true,
    branches: [
      { id: 201, name: 'فرع غوط الديس', marketer: 'محمد البحري', approved: 14885, pending: 0, total: 14885, type: 'مدين', active: true },
      { id: 202, name: 'فرع المتفوق', marketer: 'سارة خالد', approved: 13500, pending: -11610, total: 1890, type: 'مدين', active: true },
      { id: 203, name: 'فرع أبو جطيلة', marketer: 'محمد حسن', approved: 10115, pending: -2000, total: 8115, type: 'مدين', active: true },
    ],
  },
  {
    id: 3,
    name: 'شركة الأمل',
    owner: 'خالد عبدالله',
    approved: 20185,
    pending: -4500,
    total: 15685,
    type: 'مدين',
    active: true,
    branches: [
      { id: 301, name: 'فرع غوط الديس 2', marketer: 'محمد البحري', approved: 10640, pending: -2000, total: 8640, type: 'مدين', active: true },
      { id: 302, name: 'فرع المجموعة', marketer: 'أحمد علي', approved: 9545, pending: -2500, total: 7045, type: 'مدين', active: true },
    ],
  },
];

export default function StoresPage() {
  const [search, setSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedCompanies, setExpandedCompanies] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'companies' | 'branches'>('companies');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isSearchOpen && isMobile) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [isSearchOpen, isMobile]);

  const toggleCompany = (id: number) => {
    setExpandedCompanies(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const allBranches = COMPANIES.flatMap(c => c.branches.map(b => ({ ...b, companyName: c.name })));

  const filteredCompanies = COMPANIES.filter(c =>
    c.name.includes(search) || c.owner.includes(search) ||
    c.branches.some(b => b.name.includes(search) || b.marketer.includes(search))
  );

  const filteredBranches = allBranches.filter(b =>
    b.name.includes(search) || b.marketer.includes(search) || b.companyName.includes(search)
  );

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-bold text-slate-400 dark:text-white/40">بيع متاجر</span>
          <span className="text-[22px] font-black text-slate-800 dark:text-white">إدارة المتاجر</span>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/companies/create" className="spatial-button h-11 px-4 rounded-[16px] flex items-center gap-2 font-bold text-[13px]">
            <Building2 className="w-4 h-4" />
            <span className="hidden sm:inline">إضافة شركة</span>
          </Link>
          <Link to="/branches/create" className="spatial-button h-11 px-4 rounded-[16px] flex items-center gap-2 font-bold text-[13px]">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">إضافة فرع</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STATS.map((s) => (
          <div key={s.label} className="spatial-card p-5 flex flex-col gap-3">
            <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center ${s.bg} ${s.color}`}>
              {s.icon}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest leading-tight">{s.label}</span>
              <div className="flex items-baseline gap-1">
                <span className={`text-[18px] lg:text-[20px] font-black ${s.color}`}>{fmt(s.value)}</span>
                <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">دينار</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode('companies')}
          className={`h-10 px-5 rounded-[14px] font-bold text-[13px] transition-all ${
            viewMode === 'companies'
              ? 'bg-primary text-white'
              : 'bg-black/5 dark:bg-white/5 text-slate-600 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10'
          }`}
        >
          عرض الشركات
        </button>
        <button
          onClick={() => setViewMode('branches')}
          className={`h-10 px-5 rounded-[14px] font-bold text-[13px] transition-all ${
            viewMode === 'branches'
              ? 'bg-primary text-white'
              : 'bg-black/5 dark:bg-white/5 text-slate-600 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10'
          }`}
        >
          عرض الفروع
        </button>
      </div>

      {/* Table card */}
      <div className="spatial-card overflow-hidden">
        {/* Search bar */}
        <div className="p-4 border-b border-black/5 dark:border-white/[0.06] flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/40" />
            <input
              type="text"
              placeholder="بحث باسم المتجر أو المسوق..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={() => isMobile && setIsSearchOpen(true)}
              readOnly={isMobile}
              className="spatial-input w-full h-10 rounded-[14px] pr-10 pl-4 text-[13px] font-bold"
            />
          </div>
          <span className="text-[12px] font-bold text-slate-400 dark:text-white/40 shrink-0">
            {viewMode === 'companies' ? `${filteredCompanies.length} شركة` : `${filteredBranches.length} فرع`}
          </span>
        </div>

        {/* Mobile Search Modal */}
        {isSearchOpen && isMobile && createPortal(
          <div className="fixed inset-0 z-[500] flex flex-col bg-white dark:bg-[#0f1428] animate-in fade-in duration-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/5 dark:border-white/5 shrink-0">
              <span className="text-base font-black text-slate-800 dark:text-white">بحث في المتاجر</span>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-white/60"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 border-b border-black/5 dark:border-white/5 shrink-0">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-white/40 pointer-events-none" />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="بحث باسم المتجر أو المسوق..."
                  className="w-full rounded-[14px] pr-11 pl-4 bg-black/5 dark:bg-white/5 border border-transparent focus:border-primary/30 font-bold text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 outline-none transition-all h-11 text-[14px]"
                />
              </div>
            </div>
            <div className="overflow-y-auto flex-1 p-4">
              {viewMode === 'companies' ? (
                filteredCompanies.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-400 dark:text-white/30">
                    <Building2 className="w-10 h-10 opacity-40" />
                    <span className="text-[14px] font-bold">لا توجد نتائج</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {filteredCompanies.map((company) => (
                      <div key={company.id} className="spatial-card p-4 flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className="w-10 h-10 rounded-[12px] bg-primary/10 flex items-center justify-center shrink-0">
                              <Building2 className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                              <span className="text-[14px] font-black text-slate-800 dark:text-white leading-snug">{company.name}</span>
                              <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">{company.owner}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                            <span className={`text-[11px] font-black px-2 py-0.5 rounded-[6px] ${company.active ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-slate-500/10 text-slate-500'}`}>
                              {company.active ? 'نشط' : 'موقوف'}
                            </span>
                            <span className={`text-[11px] font-black px-2 py-0.5 rounded-[6px] ${company.type === 'دائن' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-500'}`}>
                              {company.type}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="flex flex-col gap-0.5 rounded-[12px] bg-emerald-500/5 border border-emerald-500/10 p-2.5">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">معتمد</span>
                            <span className="text-[13px] font-black text-emerald-600 dark:text-emerald-400">{fmt(company.approved)}</span>
                          </div>
                          <div className="flex flex-col gap-0.5 rounded-[12px] bg-rose-500/5 border border-rose-500/10 p-2.5">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">معلق</span>
                            <span className={`text-[13px] font-black ${company.pending !== 0 ? 'text-rose-500' : 'text-slate-300 dark:text-white/20'}`}>
                              {company.pending !== 0 ? fmt(company.pending) : '—'}
                            </span>
                          </div>
                          <div className="flex flex-col gap-0.5 rounded-[12px] bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 p-2.5">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">الإجمالي</span>
                            <span className="text-[13px] font-black text-slate-800 dark:text-white">{fmt(company.total)}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/companies/${company.id}/activity`} onClick={() => setIsSearchOpen(false)} className="flex-1 h-9 rounded-[12px] bg-blue-500/10 hover:bg-blue-500 hover:text-white text-blue-600 dark:text-blue-400 text-[13px] font-black transition-all flex items-center justify-center gap-1.5">
                            <Activity className="w-3.5 h-3.5" />الحركة
                          </Link>
                          <Link to={`/companies/${company.id}/edit`} onClick={() => setIsSearchOpen(false)} className="flex-1 h-9 rounded-[12px] bg-primary/10 hover:bg-primary hover:text-white text-primary text-[13px] font-black transition-all flex items-center justify-center gap-1.5">
                            <Settings className="w-3.5 h-3.5" />تعديل
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                filteredBranches.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-400 dark:text-white/30">
                    <Store className="w-10 h-10 opacity-40" />
                    <span className="text-[14px] font-bold">لا توجد نتائج</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {filteredBranches.map((branch) => (
                      <div key={branch.id} className="spatial-card p-4 flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className="w-10 h-10 rounded-[12px] bg-emerald-500/10 flex items-center justify-center shrink-0">
                              <Store className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                              <span className="text-[14px] font-black text-slate-800 dark:text-white leading-snug">{branch.name}</span>
                              <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">{branch.companyName}</span>
                              <span className="text-[11px] font-bold text-slate-500 dark:text-white/50">{branch.marketer}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                            <span className={`text-[11px] font-black px-2 py-0.5 rounded-[6px] ${branch.active ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-slate-500/10 text-slate-500'}`}>
                              {branch.active ? 'نشط' : 'موقوف'}
                            </span>
                            <span className={`text-[11px] font-black px-2 py-0.5 rounded-[6px] ${branch.type === 'دائن' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-500'}`}>
                              {branch.type}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="flex flex-col gap-0.5 rounded-[12px] bg-emerald-500/5 border border-emerald-500/10 p-2.5">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">معتمد</span>
                            <span className="text-[13px] font-black text-emerald-600 dark:text-emerald-400">{fmt(branch.approved)}</span>
                          </div>
                          <div className="flex flex-col gap-0.5 rounded-[12px] bg-rose-500/5 border border-rose-500/10 p-2.5">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">معلق</span>
                            <span className={`text-[13px] font-black ${branch.pending !== 0 ? 'text-rose-500' : 'text-slate-300 dark:text-white/20'}`}>
                              {branch.pending !== 0 ? fmt(branch.pending) : '—'}
                            </span>
                          </div>
                          <div className="flex flex-col gap-0.5 rounded-[12px] bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 p-2.5">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">الإجمالي</span>
                            <span className="text-[13px] font-black text-slate-800 dark:text-white">{fmt(branch.total)}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/branches/${branch.id}`} onClick={() => setIsSearchOpen(false)} className="flex-1 h-9 rounded-[12px] bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-600 dark:text-emerald-400 text-[13px] font-black transition-all flex items-center justify-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" />عرض
                          </Link>
                          <Link to={`/branches/${branch.id}/edit`} onClick={() => setIsSearchOpen(false)} className="flex-1 h-9 rounded-[12px] bg-primary/10 hover:bg-primary hover:text-white text-primary text-[13px] font-black transition-all flex items-center justify-center gap-1.5">
                            <Settings className="w-3.5 h-3.5" />تعديل
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>,
          document.body
        )}

        {/* Desktop table - Companies View */}
        {viewMode === 'companies' && (
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/5 dark:border-white/[0.06]">
                  {['', 'اسم الشركة', 'المالك', 'معتمد', 'معلق', 'الإجمالي', 'دائن / مدين', 'الحالة', 'الإجراءات'].map((h) => (
                    <th key={h} className="px-4 py-3 text-right text-[11px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company) => (
                  <>
                    <tr key={company.id} className="border-b border-black/5 dark:border-white/[0.04] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => toggleCompany(company.id)}
                          className="w-7 h-7 rounded-[8px] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center transition-all"
                        >
                          {expandedCompanies.includes(company.id) ? (
                            <ChevronDown className="w-4 h-4 text-slate-600 dark:text-white/60" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-600 dark:text-white/60" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-[10px] bg-primary/10 flex items-center justify-center shrink-0">
                            <Building2 className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-[13px] font-black text-slate-800 dark:text-white">{company.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-[13px] font-bold text-slate-600 dark:text-white/60 whitespace-nowrap">{company.owner}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-baseline gap-1">
                          <span className="text-[13px] font-black text-emerald-600 dark:text-emerald-400">{fmt(company.approved)}</span>
                          <span className="text-[10px] font-bold text-slate-400 dark:text-white/30">د</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        {company.pending !== 0 ? (
                          <div className="flex items-baseline gap-1">
                            <span className="text-[13px] font-black text-rose-500">{fmt(company.pending)}</span>
                            <span className="text-[10px] font-bold text-slate-400 dark:text-white/30">د</span>
                          </div>
                        ) : (
                          <span className="text-[13px] font-bold text-slate-300 dark:text-white/20">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-baseline gap-1">
                          <span className="text-[14px] font-black text-slate-800 dark:text-white">{fmt(company.total)}</span>
                          <span className="text-[10px] font-bold text-slate-400 dark:text-white/30">دينار</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`text-[12px] font-black px-2.5 py-1 rounded-[8px] ${
                          company.type === 'دائن'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-rose-500/10 text-rose-500'
                        }`}>
                          {company.type}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`text-[12px] font-black px-2.5 py-1 rounded-[8px] ${
                          company.active
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-slate-500/10 text-slate-500 dark:text-white/40'
                        }`}>
                          {company.active ? 'نشط' : 'موقوف'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/companies/${company.id}/activity`}
                            className="w-8 h-8 rounded-[10px] bg-blue-500/10 hover:bg-blue-500 hover:text-white text-blue-600 dark:text-blue-400 transition-all flex items-center justify-center"
                            title="عرض الحركة"
                          >
                            <Activity className="w-4 h-4" />
                          </Link>
                          <Link
                            to={`/companies/${company.id}/edit`}
                            className="w-8 h-8 rounded-[10px] bg-primary/10 hover:bg-primary hover:text-white text-primary transition-all flex items-center justify-center"
                            title="تعديل البيانات"
                          >
                            <Settings className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                    {expandedCompanies.includes(company.id) && company.branches.map((branch) => (
                      <tr key={branch.id} className="border-b border-black/5 dark:border-white/[0.04] bg-black/[0.01] dark:bg-white/[0.01] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3.5"></td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2 pr-6">
                            <div className="w-7 h-7 rounded-[8px] bg-emerald-500/10 flex items-center justify-center shrink-0">
                              <Store className="w-3.5 h-3.5 text-emerald-600" />
                            </div>
                            <span className="text-[13px] font-bold text-slate-700 dark:text-white/80">{branch.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-[12px] font-bold text-slate-500 dark:text-white/50 whitespace-nowrap">{branch.marketer}</td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-baseline gap-1">
                            <span className="text-[12px] font-black text-emerald-600 dark:text-emerald-400">{fmt(branch.approved)}</span>
                            <span className="text-[10px] font-bold text-slate-400 dark:text-white/30">د</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          {branch.pending !== 0 ? (
                            <div className="flex items-baseline gap-1">
                              <span className="text-[12px] font-black text-rose-500">{fmt(branch.pending)}</span>
                              <span className="text-[10px] font-bold text-slate-400 dark:text-white/30">د</span>
                            </div>
                          ) : (
                            <span className="text-[12px] font-bold text-slate-300 dark:text-white/20">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-baseline gap-1">
                            <span className="text-[13px] font-black text-slate-800 dark:text-white">{fmt(branch.total)}</span>
                            <span className="text-[10px] font-bold text-slate-400 dark:text-white/30">دينار</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`text-[11px] font-black px-2 py-0.5 rounded-[6px] ${
                            branch.type === 'دائن'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'bg-rose-500/10 text-rose-500'
                          }`}>
                            {branch.type}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`text-[11px] font-black px-2 py-0.5 rounded-[6px] ${
                            branch.active
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'bg-slate-500/10 text-slate-500 dark:text-white/40'
                          }`}>
                            {branch.active ? 'نشط' : 'موقوف'}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/branches/${branch.id}`}
                              className="w-7 h-7 rounded-[8px] bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-600 dark:text-emerald-400 transition-all flex items-center justify-center"
                              title="عرض التفاصيل"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Link>
                            <Link
                              to={`/branches/${branch.id}/edit`}
                              className="w-7 h-7 rounded-[8px] bg-primary/10 hover:bg-primary hover:text-white text-primary transition-all flex items-center justify-center"
                              title="تعديل البيانات"
                            >
                              <Settings className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Desktop table - Branches View */}
        {viewMode === 'branches' && (
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/5 dark:border-white/[0.06]">
                  {['#', 'اسم الفرع', 'الشركة', 'المسوق', 'معتمد', 'معلق', 'الإجمالي', 'دائن / مدين', 'الحالة', 'الإجراءات'].map((h) => (
                    <th key={h} className="px-4 py-3 text-right text-[11px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredBranches.map((branch) => (
                  <tr key={branch.id} className="border-b border-black/5 dark:border-white/[0.04] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3.5 text-[13px] font-black text-slate-400 dark:text-white/40">{branch.id}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-[10px] bg-emerald-500/10 flex items-center justify-center shrink-0">
                          <Store className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-[13px] font-black text-slate-800 dark:text-white">{branch.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-[13px] font-bold text-slate-600 dark:text-white/60 whitespace-nowrap">{branch.companyName}</td>
                    <td className="px-4 py-3.5 text-[13px] font-bold text-slate-600 dark:text-white/60 whitespace-nowrap">{branch.marketer}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-baseline gap-1">
                        <span className="text-[13px] font-black text-emerald-600 dark:text-emerald-400">{fmt(branch.approved)}</span>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-white/30">د</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      {branch.pending !== 0 ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-[13px] font-black text-rose-500">{fmt(branch.pending)}</span>
                          <span className="text-[10px] font-bold text-slate-400 dark:text-white/30">د</span>
                        </div>
                      ) : (
                        <span className="text-[13px] font-bold text-slate-300 dark:text-white/20">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-baseline gap-1">
                        <span className="text-[14px] font-black text-slate-800 dark:text-white">{fmt(branch.total)}</span>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-white/30">دينار</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-[12px] font-black px-2.5 py-1 rounded-[8px] ${
                        branch.type === 'دائن'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-rose-500/10 text-rose-500'
                      }`}>
                        {branch.type}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-[12px] font-black px-2.5 py-1 rounded-[8px] ${
                        branch.active
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-slate-500/10 text-slate-500 dark:text-white/40'
                      }`}>
                        {branch.active ? 'نشط' : 'موقوف'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/branches/${branch.id}`}
                          className="w-8 h-8 rounded-[10px] bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-600 dark:text-emerald-400 transition-all flex items-center justify-center"
                          title="عرض التفاصيل"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/branches/${branch.id}/edit`}
                          className="w-8 h-8 rounded-[10px] bg-primary/10 hover:bg-primary hover:text-white text-primary transition-all flex items-center justify-center"
                          title="تعديل البيانات"
                        >
                          <Settings className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile cards - Companies View */}
        {viewMode === 'companies' && (
          <div className="lg:hidden flex flex-col gap-3 p-4">
            {filteredCompanies.map((company) => (
              <div key={company.id} className="flex flex-col gap-3">
                <div className="spatial-card p-4 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-[12px] bg-primary/10 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                        <span className="text-[14px] font-black text-slate-800 dark:text-white leading-snug">{company.name}</span>
                        <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">{company.owner}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                      <span className={`text-[11px] font-black px-2 py-0.5 rounded-[6px] ${company.active ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-slate-500/10 text-slate-500'}`}>
                        {company.active ? 'نشط' : 'موقوف'}
                      </span>
                      <span className={`text-[11px] font-black px-2 py-0.5 rounded-[6px] ${company.type === 'دائن' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-500'}`}>
                        {company.type}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col gap-0.5 rounded-[12px] bg-emerald-500/5 border border-emerald-500/10 p-2.5">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">معتمد</span>
                      <span className="text-[13px] font-black text-emerald-600 dark:text-emerald-400">{fmt(company.approved)}</span>
                    </div>
                    <div className="flex flex-col gap-0.5 rounded-[12px] bg-rose-500/5 border border-rose-500/10 p-2.5">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">معلق</span>
                      <span className={`text-[13px] font-black ${company.pending !== 0 ? 'text-rose-500' : 'text-slate-300 dark:text-white/20'}`}>
                        {company.pending !== 0 ? fmt(company.pending) : '—'}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5 rounded-[12px] bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 p-2.5">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">الإجمالي</span>
                      <span className="text-[13px] font-black text-slate-800 dark:text-white">{fmt(company.total)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleCompany(company.id)}
                      className="flex-1 h-9 rounded-[12px] bg-blue-500/10 hover:bg-blue-500 hover:text-white text-blue-600 dark:text-blue-400 text-[13px] font-black transition-all flex items-center justify-center gap-1.5"
                    >
                      {expandedCompanies.includes(company.id) ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      {expandedCompanies.includes(company.id) ? 'إخفاء الفروع' : `عرض الفروع (${company.branches.length})`}
                    </button>
                    <Link to={`/companies/${company.id}/activity`} className="h-9 px-3 rounded-[12px] bg-blue-500/10 hover:bg-blue-500 hover:text-white text-blue-600 dark:text-blue-400 text-[13px] font-black transition-all flex items-center justify-center">
                      <Activity className="w-3.5 h-3.5" />
                    </Link>
                    <Link to={`/companies/${company.id}/edit`} className="h-9 px-3 rounded-[12px] bg-primary/10 hover:bg-primary hover:text-white text-primary text-[13px] font-black transition-all flex items-center justify-center">
                      <Settings className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
                {expandedCompanies.includes(company.id) && (
                  <div className="flex flex-col gap-2 pr-4">
                    {company.branches.map((branch) => (
                      <div key={branch.id} className="spatial-card p-3 flex flex-col gap-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className="w-8 h-8 rounded-[10px] bg-emerald-500/10 flex items-center justify-center shrink-0">
                              <Store className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                              <span className="text-[13px] font-bold text-slate-800 dark:text-white leading-snug">{branch.name}</span>
                              <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">{branch.marketer}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-[5px] ${branch.active ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-slate-500/10 text-slate-500'}`}>
                              {branch.active ? 'نشط' : 'موقوف'}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5">
                          <div className="flex flex-col gap-0.5 rounded-[10px] bg-emerald-500/5 border border-emerald-500/10 p-2">
                            <span className="text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">معتمد</span>
                            <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400">{fmt(branch.approved)}</span>
                          </div>
                          <div className="flex flex-col gap-0.5 rounded-[10px] bg-rose-500/5 border border-rose-500/10 p-2">
                            <span className="text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">معلق</span>
                            <span className={`text-[11px] font-black ${branch.pending !== 0 ? 'text-rose-500' : 'text-slate-300 dark:text-white/20'}`}>
                              {branch.pending !== 0 ? fmt(branch.pending) : '—'}
                            </span>
                          </div>
                          <div className="flex flex-col gap-0.5 rounded-[10px] bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 p-2">
                            <span className="text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">الإجمالي</span>
                            <span className="text-[11px] font-black text-slate-800 dark:text-white">{fmt(branch.total)}</span>
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          <Link to={`/branches/${branch.id}`} className="flex-1 h-8 rounded-[10px] bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-600 dark:text-emerald-400 text-[12px] font-black transition-all flex items-center justify-center gap-1">
                            <Eye className="w-3 h-3" />عرض
                          </Link>
                          <Link to={`/branches/${branch.id}/edit`} className="flex-1 h-8 rounded-[10px] bg-primary/10 hover:bg-primary hover:text-white text-primary text-[12px] font-black transition-all flex items-center justify-center gap-1">
                            <Settings className="w-3 h-3" />تعديل
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Mobile cards - Branches View */}
        {viewMode === 'branches' && (
          <div className="lg:hidden flex flex-col gap-3 p-4">
            {filteredBranches.map((branch) => (
              <div key={branch.id} className="spatial-card p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-[12px] bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <Store className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <span className="text-[14px] font-black text-slate-800 dark:text-white leading-snug">{branch.name}</span>
                      <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">{branch.companyName}</span>
                      <span className="text-[11px] font-bold text-slate-500 dark:text-white/50">{branch.marketer}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                    <span className={`text-[11px] font-black px-2 py-0.5 rounded-[6px] ${branch.active ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-slate-500/10 text-slate-500'}`}>
                      {branch.active ? 'نشط' : 'موقوف'}
                    </span>
                    <span className={`text-[11px] font-black px-2 py-0.5 rounded-[6px] ${branch.type === 'دائن' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-500'}`}>
                      {branch.type}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col gap-0.5 rounded-[12px] bg-emerald-500/5 border border-emerald-500/10 p-2.5">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">معتمد</span>
                    <span className="text-[13px] font-black text-emerald-600 dark:text-emerald-400">{fmt(branch.approved)}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 rounded-[12px] bg-rose-500/5 border border-rose-500/10 p-2.5">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">معلق</span>
                    <span className={`text-[13px] font-black ${branch.pending !== 0 ? 'text-rose-500' : 'text-slate-300 dark:text-white/20'}`}>
                      {branch.pending !== 0 ? fmt(branch.pending) : '—'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 rounded-[12px] bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 p-2.5">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">الإجمالي</span>
                    <span className="text-[13px] font-black text-slate-800 dark:text-white">{fmt(branch.total)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/branches/${branch.id}`} className="flex-1 h-9 rounded-[12px] bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-600 dark:text-emerald-400 text-[13px] font-black transition-all flex items-center justify-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />عرض
                  </Link>
                  <Link to={`/branches/${branch.id}/edit`} className="flex-1 h-9 rounded-[12px] bg-primary/10 hover:bg-primary hover:text-white text-primary text-[13px] font-black transition-all flex items-center justify-center gap-1.5">
                    <Settings className="w-3.5 h-3.5" />تعديل
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {((viewMode === 'companies' && filteredCompanies.length === 0) || (viewMode === 'branches' && filteredBranches.length === 0)) && (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-400 dark:text-white/30">
            {viewMode === 'companies' ? <Building2 className="w-10 h-10 opacity-40" /> : <Store className="w-10 h-10 opacity-40" />}
            <span className="text-[14px] font-bold">
              {viewMode === 'companies' ? 'لا توجد شركات' : 'لا توجد فروع'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
