import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Building2, Store, TrendingUp, TrendingDown, Wallet, FileText, Calendar } from 'lucide-react';

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
      <div className="flex flex-col gap-3">
        <button
          onClick={() => navigate(-1)}
          className="self-start flex items-center gap-2 px-4 h-11 rounded-[16px] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-slate-600 dark:text-white/70 font-bold text-[14px] transition-all"
        >
          <ArrowRight className="w-4 h-4" />
          عودة
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-[16px] bg-primary/10 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-bold text-slate-400 dark:text-white/40">حركة الشركة</span>
            <span className="text-[20px] font-black text-slate-800 dark:text-white">{COMPANY.name}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="spatial-card p-5 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-[14px] bg-emerald-500/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">معتمد</span>
            <div className="flex items-baseline gap-1">
              <span className="text-[20px] font-black text-emerald-600 dark:text-emerald-400">{fmt(COMPANY.approved)}</span>
              <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">دينار</span>
            </div>
          </div>
        </div>
        <div className="spatial-card p-5 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-[14px] bg-rose-500/10 flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-rose-500" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">معلق</span>
            <div className="flex items-baseline gap-1">
              <span className="text-[20px] font-black text-rose-500">{fmt(COMPANY.pending)}</span>
              <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">دينار</span>
            </div>
          </div>
        </div>
        <div className="spatial-card p-5 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-[14px] bg-primary/10 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-primary" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">الإجمالي</span>
            <div className="flex items-baseline gap-1">
              <span className="text-[20px] font-black text-primary">{fmt(COMPANY.total)}</span>
              <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">دينار</span>
            </div>
          </div>
        </div>
      </div>

      {/* Branches */}
      <div className="spatial-card">
        <div className="p-5 border-b border-black/5 dark:border-white/[0.06]">
          <h2 className="text-[16px] font-black text-slate-800 dark:text-white">الفروع</h2>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {BRANCHES.map((branch) => (
              <div key={branch.id} className="spatial-card p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-[10px] bg-emerald-500/10 flex items-center justify-center">
                    <Store className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <span className="text-[13px] font-black text-slate-800 dark:text-white">{branch.name}</span>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">{branch.marketer}</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[16px] font-black text-primary">{fmt(branch.total)}</span>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-white/40">دينار</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="spatial-card">
        <div className="p-5 border-b border-black/5 dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-[16px] font-black text-slate-800 dark:text-white">الحركات</h2>
          <div className="flex gap-2">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="spatial-input h-9 rounded-[12px] px-3 text-[12px] font-bold"
            >
              <option value="الكل">كل الفروع</option>
              {BRANCHES.map((b) => (
                <option key={b.id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="spatial-input h-9 rounded-[12px] px-3 text-[12px] font-bold"
            >
              <option value="الكل">كل الأنواع</option>
              <option value="فاتورة">فاتورة</option>
              <option value="دفعة">دفعة</option>
              <option value="مرتجع">مرتجع</option>
            </select>
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
                <div className="flex flex-col gap-1">
                  <span className="text-[13px] font-black text-slate-800 dark:text-white">{activity.invoice}</span>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-white/50">{activity.branch}</span>
                  <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">{activity.date}</span>
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
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-[16px] font-black ${
                    activity.amount > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
                  }`}
                >
                  {activity.amount > 0 ? '+' : ''}{fmt(activity.amount)}
                </span>
                <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">دينار</span>
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
