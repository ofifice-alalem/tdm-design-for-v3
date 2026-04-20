import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Building2, Store, CheckCircle, Clock, DollarSign, FileText, Calendar } from 'lucide-react';
import { ModernSelect } from '../compenntes/ui/SpatialComponents';

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// بيانات تجريبية
const COMPANY = {
  id: 1,
  name: 'شركة العالم',
  owner: 'محمد أحمد',
  approved: 55000,
  pending: -15000,
  total: 40000,
  type: 'مدين',
  active: true,
};

const BRANCHES = [
  { id: 101, name: 'فرع تاجوراء', marketer: 'محمد البحري', approved: 21193, pending: -8550, total: 12643 },
  { id: 102, name: 'فرع سوق الجمعة', marketer: 'أحمد علي', approved: 19548, pending: -2000, total: 17548 },
  { id: 103, name: 'فرع المشتل', marketer: 'محمد البحري', approved: 14259, pending: -4450, total: 9809 },
];

const ACTIVITIES = [
  { id: 1, date: '2024-01-15', branch: 'فرع تاجوراء', type: 'فاتورة', invoice: 'INV-001', amount: 5000, status: 'معتمد' },
  { id: 2, date: '2024-01-14', branch: 'فرع سوق الجمعة', type: 'دفعة', invoice: 'PAY-001', amount: -2000, status: 'معتمد' },
  { id: 3, date: '2024-01-13', branch: 'فرع المشتل', type: 'فاتورة', invoice: 'INV-002', amount: 3500, status: 'معلق' },
  { id: 4, date: '2024-01-12', branch: 'فرع تاجوراء', type: 'مرتجع', invoice: 'RET-001', amount: -1500, status: 'معتمد' },
  { id: 5, date: '2024-01-11', branch: 'فرع سوق الجمعة', type: 'فاتورة', invoice: 'INV-003', amount: 4200, status: 'معتمد' },
  { id: 6, date: '2024-01-10', branch: 'فرع المشتل', type: 'دفعة', invoice: 'PAY-002', amount: -3000, status: 'معتمد' },
  { id: 7, date: '2024-01-09', branch: 'فرع تاجوراء', type: 'فاتورة', invoice: 'INV-004', amount: 6500, status: 'معتمد' },
  { id: 8, date: '2024-01-08', branch: 'فرع سوق الجمعة', type: 'فاتورة', invoice: 'INV-005', amount: 2800, status: 'معلق' },
];

export default function CompanyActivityPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedBranch, setSelectedBranch] = useState<string>('الكل');
  const [selectedType, setSelectedType] = useState<string>('الكل');

  const filteredActivities = ACTIVITIES.filter(
    (a) =>
      (selectedBranch === 'الكل' || a.branch === selectedBranch) &&
      (selectedType === 'الكل' || a.type === selectedType)
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 h-11 rounded-[16px] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-slate-600 dark:text-white/70 font-bold text-[14px] transition-all"
          >
            <ArrowRight className="w-4 h-4" />
            <span className="hidden sm:inline">عودة</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-bold text-slate-400 dark:text-white/40">حركة الشركة</span>
              <span className="text-[20px] lg:text-[22px] font-black text-slate-800 dark:text-white">{COMPANY.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats & Branches - Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_1.2fr] gap-6">
        {/* Left: Stats in Plus Shape */}
        <div className="spatial-card overflow-hidden p-0">
          <div className="grid grid-cols-2 grid-rows-2">
            {/* معتمد - Top Left */}
            <div className="p-7 flex flex-col gap-4 border-l border-b border-black/[0.08] dark:border-white/[0.08] hover:bg-emerald-500/5 transition-all group cursor-pointer">
              <div className="w-12 h-12 rounded-[16px] bg-emerald-500/10 group-hover:bg-emerald-500 group-hover:scale-110 flex items-center justify-center transition-all shadow-sm group-hover:shadow-lg group-hover:shadow-emerald-500/20">
                <CheckCircle className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">معتمد</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[26px] font-black text-emerald-600 dark:text-emerald-400 leading-none">{fmt(COMPANY.approved)}</span>
                  <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">د</span>
                </div>
              </div>
            </div>

            {/* معلق - Top Right */}
            <div className="p-7 flex flex-col gap-4 border-b border-black/[0.08] dark:border-white/[0.08] hover:bg-rose-500/5 transition-all group cursor-pointer">
              <div className="w-12 h-12 rounded-[16px] bg-rose-500/10 group-hover:bg-rose-500 group-hover:scale-110 flex items-center justify-center transition-all shadow-sm group-hover:shadow-lg group-hover:shadow-rose-500/20">
                <Clock className="w-6 h-6 text-rose-500 group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">معلق</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[26px] font-black text-rose-500 leading-none">{fmt(COMPANY.pending)}</span>
                  <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">د</span>
                </div>
              </div>
            </div>

            {/* الإجمالي - Bottom Left */}
            <div className="p-7 flex flex-col gap-4 border-l border-black/[0.08] dark:border-white/[0.08] hover:bg-primary/5 transition-all group cursor-pointer">
              <div className="w-12 h-12 rounded-[16px] bg-primary/10 group-hover:bg-primary group-hover:scale-110 flex items-center justify-center transition-all shadow-sm group-hover:shadow-lg group-hover:shadow-primary/20">
                <DollarSign className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">الإجمالي</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[26px] font-black text-primary leading-none">{fmt(COMPANY.total)}</span>
                  <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">د</span>
                </div>
              </div>
            </div>

            {/* عدد الفروع - Bottom Right */}
            <div className="p-7 flex flex-col gap-4 hover:bg-blue-500/5 transition-all group cursor-pointer">
              <div className="w-12 h-12 rounded-[16px] bg-blue-500/10 group-hover:bg-blue-500 group-hover:scale-110 flex items-center justify-center transition-all shadow-sm group-hover:shadow-lg group-hover:shadow-blue-500/20">
                <Store className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[12px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">عدد الفروع</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[26px] font-black text-blue-600 dark:text-blue-400 leading-none">{BRANCHES.length}</span>
                  <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">فرع</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Branches */}
        <div className="spatial-card overflow-hidden flex flex-col">
          <div className="p-5 border-b border-black/5 dark:border-white/[0.06] shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="text-[17px] font-black text-slate-800 dark:text-white">فروع الشركة</h2>
              </div>
              <span className="text-[13px] font-bold text-slate-400 dark:text-white/40">{BRANCHES.length} فرع</span>
            </div>
          </div>
          <div className="p-5 flex flex-col gap-3 overflow-y-auto flex-1" style={{ maxHeight: '520px' }}>
            {BRANCHES.map((branch, idx) => (
              <div 
                key={branch.id} 
                className="group p-4 rounded-[18px] bg-gradient-to-br from-black/[0.02] to-transparent dark:from-white/[0.02] hover:from-emerald-500/5 hover:to-emerald-500/[0.02] dark:hover:from-emerald-500/10 dark:hover:to-emerald-500/5 border border-black/5 dark:border-white/5 hover:border-emerald-500/20 transition-all cursor-pointer hover:shadow-lg hover:scale-[1.01]"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <span className="text-[15px] font-black text-slate-800 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{branch.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-bold text-slate-400 dark:text-white/40 truncate">{branch.marketer}</span>
                      <span className="text-[10px] font-bold text-slate-300 dark:text-white/20">•</span>
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">نشط</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[20px] font-black text-primary group-hover:scale-110 transition-transform inline-block">{fmt(branch.total)}</span>
                      <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">د</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-white/30 uppercase tracking-wider">الإجمالي</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats - Mobile Only */}
      <div className="lg:hidden grid grid-cols-2 gap-3">
        <div className="spatial-card p-4 flex flex-col gap-2.5">
          <div className="w-10 h-10 rounded-[14px] bg-emerald-500/10 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest leading-tight">معتمد</span>
            <div className="flex items-baseline gap-1">
              <span className="text-[18px] font-black text-emerald-600 dark:text-emerald-400">{fmt(COMPANY.approved)}</span>
              <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">د</span>
            </div>
          </div>
        </div>
        <div className="spatial-card p-4 flex flex-col gap-2.5">
          <div className="w-10 h-10 rounded-[14px] bg-rose-500/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-rose-500" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest leading-tight">معلق</span>
            <div className="flex items-baseline gap-1">
              <span className="text-[18px] font-black text-rose-500">{fmt(COMPANY.pending)}</span>
              <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">د</span>
            </div>
          </div>
        </div>
        <div className="spatial-card p-4 flex flex-col gap-2.5">
          <div className="w-10 h-10 rounded-[14px] bg-primary/10 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest leading-tight">الإجمالي</span>
            <div className="flex items-baseline gap-1">
              <span className="text-[18px] font-black text-primary">{fmt(COMPANY.total)}</span>
              <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">د</span>
            </div>
          </div>
        </div>
        <div className="spatial-card p-4 flex flex-col gap-2.5">
          <div className="w-10 h-10 rounded-[14px] bg-blue-500/10 flex items-center justify-center">
            <Store className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest leading-tight">عدد الفروع</span>
            <div className="flex items-baseline gap-1">
              <span className="text-[18px] font-black text-blue-600 dark:text-blue-400">{BRANCHES.length}</span>
              <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">فرع</span>
            </div>
          </div>
        </div>
      </div>

      {/* Branches - Mobile Only */}
      <div className="lg:hidden spatial-card overflow-hidden">
        <div className="p-4 border-b border-black/5 dark:border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <h2 className="text-[15px] font-black text-slate-800 dark:text-white">فروع الشركة</h2>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BRANCHES.map((branch) => (
              <div key={branch.id} className="spatial-card p-3.5 flex flex-col gap-3 hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-[11px] bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
                    <Store className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <span className="text-[13px] font-black text-slate-800 dark:text-white truncate">{branch.name}</span>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 truncate">{branch.marketer}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="flex flex-col gap-0.5 rounded-[10px] bg-emerald-500/8 border border-emerald-500/15 p-2">
                    <span className="text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">معتمد</span>
                    <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400">{fmt(branch.approved)}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 rounded-[10px] bg-rose-500/8 border border-rose-500/15 p-2">
                    <span className="text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">معلق</span>
                    <span className={`text-[11px] font-black ${branch.pending !== 0 ? 'text-rose-500' : 'text-slate-300 dark:text-white/20'}`}>
                      {branch.pending !== 0 ? fmt(branch.pending) : '—'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 rounded-[10px] bg-primary/8 border border-primary/15 p-2">
                    <span className="text-[9px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">الكلي</span>
                    <span className="text-[11px] font-black text-primary">{fmt(branch.total)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="spatial-card overflow-hidden">
        <div className="p-4 border-b border-black/5 dark:border-white/[0.06] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <h2 className="text-[15px] lg:text-[16px] font-black text-slate-800 dark:text-white">سجل الحركات ({filteredActivities.length})</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ModernSelect
              label="الفرع"
              options={['الكل', ...BRANCHES.map(b => b.name)]}
              placeholder="اختر الفرع"
              defaultValue={selectedBranch}
              onSelect={(value) => setSelectedBranch(value)}
            />
            <ModernSelect
              label="نوع العملية"
              options={['الكل', 'فاتورة', 'دفعة', 'مرتجع']}
              placeholder="اختر النوع"
              defaultValue={selectedType}
              onSelect={(value) => setSelectedType(value)}
            />
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/[0.06]">
                {['التاريخ', 'الفرع', 'النوع', 'رقم العملية', 'المبلغ', 'الحالة'].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-right text-[11px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity) => (
                <tr
                  key={activity.id}
                  className="border-b border-black/5 dark:border-white/[0.04] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400 dark:text-white/40" />
                      <span className="text-[13px] font-bold text-slate-600 dark:text-white/60">{activity.date}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[13px] font-bold text-slate-700 dark:text-white/80">{activity.branch}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`text-[12px] font-black px-2.5 py-1 rounded-[8px] ${
                        activity.type === 'فاتورة'
                          ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                          : activity.type === 'دفعة'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
                      }`}
                    >
                      {activity.type}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-400 dark:text-white/40" />
                      <span className="text-[13px] font-black text-slate-800 dark:text-white">{activity.invoice}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-[14px] font-black ${
                          activity.amount > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
                        }`}
                      >
                        {fmt(Math.abs(activity.amount))}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-white/30">دينار</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`text-[12px] font-black px-2.5 py-1 rounded-[8px] ${
                        activity.status === 'معتمد'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden flex flex-col gap-3 p-4">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="spatial-card p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400 dark:text-white/40" />
                    <span className="text-[14px] font-black text-slate-800 dark:text-white">{activity.invoice}</span>
                  </div>
                  <span className="text-[12px] font-bold text-slate-600 dark:text-white/60">{activity.branch}</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-white/40" />
                    <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">{activity.date}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span
                    className={`text-[11px] font-black px-2 py-0.5 rounded-[6px] ${
                      activity.type === 'فاتورة'
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : activity.type === 'دفعة'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
                    }`}
                  >
                    {activity.type}
                  </span>
                  <span
                    className={`text-[11px] font-black px-2 py-0.5 rounded-[6px] ${
                      activity.status === 'معتمد'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t border-black/5 dark:border-white/5">
                <div className="flex items-baseline gap-1.5">
                  <span
                    className={`text-[18px] font-black ${
                      activity.amount > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
                    }`}
                  >
                    {activity.amount > 0 ? '+' : ''}{fmt(activity.amount)}
                  </span>
                  <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">دينار</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-400 dark:text-white/30">
            <FileText className="w-10 h-10 opacity-40" />
            <span className="text-[14px] font-bold">لا توجد حركات</span>
          </div>
        )}
      </div>
    </div>
  );
}
