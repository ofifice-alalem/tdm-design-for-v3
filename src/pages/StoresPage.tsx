import { useState } from 'react';
import { Plus, Search, Store, TrendingDown, TrendingUp, Wallet, AlertCircle, Settings, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const STATS = [
  { label: 'ديون سابقة',              value: 202416,  color: 'text-orange-500',  bg: 'bg-orange-500/10',  icon: <AlertCircle className="w-5 h-5" /> },
  { label: 'إجمالي الفواتير',          value: 334027,  color: 'text-primary',     bg: 'bg-primary/10',     icon: <TrendingUp className="w-5 h-5" /> },
  { label: 'إجمالي المدفوع والمرتجع',  value: 338583,  color: 'text-emerald-500', bg: 'bg-emerald-500/10', icon: <Wallet className="w-5 h-5" /> },
  { label: 'إجمالي المتبقي',           value: 197860,  color: 'text-rose-500',    bg: 'bg-rose-500/10',    icon: <TrendingDown className="w-5 h-5" /> },
];

const STORES = [
  { id: 1, name: 'الصحن الفضى / محمد البحلرى',                      marketer: 'محمد البحري', approved: 21193, pending: -8550,  total: 12643,  type: 'مدين', active: true },
  { id: 2, name: 'شركة طريق المطار احمد على',                        marketer: 'محمد البحري', approved: 19548, pending: -2000,  total: 17548,  type: 'مدين', active: true },
  { id: 3, name: 'غوط الديس 1',                                      marketer: 'محمد البحري', approved: 14885, pending: 0,      total: 14885,  type: 'مدين', active: true },
  { id: 4, name: 'محل المتفوق محمد البحرى',                          marketer: 'محمد البحري', approved: 13500, pending: -11610, total: 1890,   type: 'مدين', active: true },
  { id: 5, name: 'مصطفى ابو جطيلة / البحرى',                        marketer: 'محمد البحري', approved: 10917, pending: 0,      total: 10917,  type: 'مدين', active: true },
  { id: 6, name: 'سوق غوط الديس 2 / البحرى',                        marketer: 'محمد البحري', approved: 10640, pending: -2000,  total: 8640,   type: 'مدين', active: true },
  { id: 7, name: 'محل المجموعة عبدالسلام المرغنى/0913790911',        marketer: 'محمد البحري', approved: 9545,  pending: -2500,  total: 7045,   type: 'مدين', active: true },
];

export default function StoresPage() {
  const [search, setSearch] = useState('');

  const filtered = STORES.filter((s) =>
    s.name.includes(search) || s.marketer.includes(search)
  );

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-bold text-slate-400 dark:text-white/40">بيع متاجر</span>
          <span className="text-[22px] font-black text-slate-800 dark:text-white">إدارة المتاجر</span>
        </div>
        <Link to="/stores/create" className="spatial-button h-11 px-5 rounded-[16px] flex items-center gap-2 font-bold text-[14px]">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">إضافة متجر</span>
        </Link>
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
              className="spatial-input w-full h-10 rounded-[14px] pr-10 pl-4 text-[13px] font-bold"
            />
          </div>
          <span className="text-[12px] font-bold text-slate-400 dark:text-white/40 shrink-0">{filtered.length} متجر</span>
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/[0.06]">
                {['#', 'اسم المتجر', 'المسوق', 'معتمد', 'معلق', 'الإجمالي', 'دائن / مدين', 'الحالة', 'الإجراءات'].map((h) => (
                  <th key={h} className="px-4 py-3 text-right text-[11px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((store) => (
                <tr key={store.id} className="border-b border-black/5 dark:border-white/[0.04] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3.5 text-[13px] font-black text-slate-400 dark:text-white/40">{store.id}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-[10px] bg-primary/10 flex items-center justify-center shrink-0">
                        <Store className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-[13px] font-black text-slate-800 dark:text-white">{store.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[13px] font-bold text-slate-600 dark:text-white/60 whitespace-nowrap">{store.marketer}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[13px] font-black text-emerald-600 dark:text-emerald-400">{fmt(store.approved)}</span>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-white/30">د</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    {store.pending !== 0 ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-[13px] font-black text-rose-500">{fmt(store.pending)}</span>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-white/30">د</span>
                      </div>
                    ) : (
                      <span className="text-[13px] font-bold text-slate-300 dark:text-white/20">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[14px] font-black text-slate-800 dark:text-white">{fmt(store.total)}</span>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-white/30">دينار</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[12px] font-black px-2.5 py-1 rounded-[8px] ${
                      store.type === 'دائن'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-rose-500/10 text-rose-500'
                    }`}>
                      {store.type}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[12px] font-black px-2.5 py-1 rounded-[8px] ${
                      store.active
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-slate-500/10 text-slate-500 dark:text-white/40'
                    }`}>
                      {store.active ? 'نشط' : 'موقوف'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/stores/${store.id}`}
                        className="w-8 h-8 rounded-[10px] bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-600 dark:text-emerald-400 transition-all flex items-center justify-center"
                        title="عرض التفاصيل"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/stores/${store.id}/edit`}
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

        {/* Mobile cards */}
        <div className="lg:hidden flex flex-col gap-3 p-4">
          {filtered.map((store) => (
            <div key={store.id} className="spatial-card p-4 flex flex-col gap-3">
              {/* Row 1: name + badges */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <span className="text-[14px] font-black text-slate-800 dark:text-white leading-snug">{store.name}</span>
                  <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">{store.marketer}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                  <span className={`text-[11px] font-black px-2 py-0.5 rounded-[6px] ${store.active ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-slate-500/10 text-slate-500'}`}>
                    {store.active ? 'نشط' : 'موقوف'}
                  </span>
                  <span className={`text-[11px] font-black px-2 py-0.5 rounded-[6px] ${store.type === 'دائن' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-500'}`}>
                    {store.type}
                  </span>
                </div>
              </div>

              {/* Row 2: financial summary */}
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col gap-0.5 rounded-[12px] bg-emerald-500/5 border border-emerald-500/10 p-2.5">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">معتمد</span>
                  <span className="text-[13px] font-black text-emerald-600 dark:text-emerald-400">{fmt(store.approved)}</span>
                </div>
                <div className="flex flex-col gap-0.5 rounded-[12px] bg-rose-500/5 border border-rose-500/10 p-2.5">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">معلق</span>
                  <span className={`text-[13px] font-black ${store.pending !== 0 ? 'text-rose-500' : 'text-slate-300 dark:text-white/20'}`}>
                    {store.pending !== 0 ? fmt(store.pending) : '—'}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 rounded-[12px] bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 p-2.5">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">الإجمالي</span>
                  <span className="text-[13px] font-black text-slate-800 dark:text-white">{fmt(store.total)}</span>
                </div>
              </div>

              {/* Row 3: actions */}
              <div className="flex gap-2">
                <Link to={`/stores/${store.id}`} className="flex-1 h-9 rounded-[12px] bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-600 dark:text-emerald-400 text-[13px] font-black transition-all flex items-center justify-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />عرض
                </Link>
                <Link to={`/stores/${store.id}/edit`} className="flex-1 h-9 rounded-[12px] bg-primary/10 hover:bg-primary hover:text-white text-primary text-[13px] font-black transition-all flex items-center justify-center gap-1.5">
                  <Settings className="w-3.5 h-3.5" />تعديل
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-400 dark:text-white/30">
            <Store className="w-10 h-10 opacity-40" />
            <span className="text-[14px] font-bold">لا توجد متاجر</span>
          </div>
        )}
      </div>
    </div>
  );
}
