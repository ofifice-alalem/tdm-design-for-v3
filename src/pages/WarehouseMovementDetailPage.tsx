import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Printer, CheckCircle2, Ban, Pencil, ArrowDownCircle, ArrowUpCircle, ArrowLeftRight } from 'lucide-react';
import { SpatialCard } from '../compenntes/ui/SpatialComponents';

type Status = 'مكتمل' | 'ملغي';

const STATUS_CONFIG: Record<Status, { bg: string; text: string; icon: React.ReactNode }> = {
  'مكتمل': { bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-600 dark:text-emerald-400', icon: <CheckCircle2 className="w-4 h-4" /> },
  'ملغي':  { bg: 'bg-slate-500/10 border-slate-500/20',     text: 'text-slate-500 dark:text-white/40',     icon: <Ban className="w-4 h-4" /> },
};

const TYPE_ICONS: Record<string, React.ReactNode> = {
  'إدخال':  <ArrowDownCircle className="w-4 h-4" />,
  'إخراج':  <ArrowUpCircle className="w-4 h-4" />,
  'تحويل':  <ArrowLeftRight className="w-4 h-4" />,
};

const TYPE_COLORS: Record<string, string> = {
  'إدخال':  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  'إخراج':  'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  'تحويل':  'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
};

const MOVEMENTS = {
  completed: {
    id: '#WM-20260406-00006', date: '2026-04-06', time: '10:00 AM', status: 'مكتمل' as Status,
    warehouse: 'المستودع الرئيسي', type: 'إدخال',
    products: [
      { name: 'قماش قطني أبيض', qty: 100 },
      { name: 'خيط بوليستر',    qty: 50  },
    ],
    log: [
      { label: 'تم إنشاء الحركة', by: 'أحمد المدير',   date: '2026-04-06 10:00 AM' },
      { label: 'تم الاكتمال',      by: 'الحارث العالم', date: '2026-04-06 11:00 AM' },
    ],
  },
  cancelled: {
    id: '#WM-20260315-00003', date: '2026-03-15', time: '11:30 AM', status: 'ملغي' as Status,
    warehouse: 'المستودع الرئيسي', type: 'إخراج',
    products: [
      { name: 'أزرار معدنية', qty: 300 },
    ],
    log: [
      { label: 'تم إنشاء الحركة', by: 'أحمد المدير',   date: '2026-03-15 11:30 AM' },
      { label: 'تم الإلغاء',       by: 'الحارث العالم', date: '2026-03-15 12:00 PM' },
    ],
  },
};

const DEMO_KEYS = ['completed', 'cancelled'] as const;
const DEMO_LABELS = { completed: 'مكتمل', cancelled: 'ملغي' };

export default function WarehouseMovementDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const decodedId = id ? decodeURIComponent(id) : '';
  const initKey = decodedId === MOVEMENTS.cancelled.id ? 'cancelled' : 'completed';
  const [activeKey, setActiveKey] = useState<typeof DEMO_KEYS[number]>(initKey);

  const mov = MOVEMENTS[activeKey];
  const sc = STATUS_CONFIG[mov.status];
  const totalQty = mov.products.reduce((s, p) => s + p.qty, 0);

  return (
    <div className="flex flex-col gap-6 overflow-y-auto custom-scroll pb-32 lg:pb-6">

      {/* Demo tabs */}
      <div className="flex gap-2">
        {DEMO_KEYS.map((k) => (
          <button key={k} onClick={() => setActiveKey(k)}
            className={`px-4 h-9 rounded-[12px] font-bold text-[13px] border transition-all ${
              activeKey === k ? 'bg-primary border-primary text-white' : 'spatial-input text-slate-600 dark:text-white/60'
            }`}>
            {DEMO_LABELS[k]}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col gap-3">
        <button onClick={() => navigate(-1)} className="self-start flex items-center gap-2 px-4 h-11 rounded-[16px] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-slate-600 dark:text-white/70 font-bold text-[14px] transition-all">
          <ArrowRight className="w-4 h-4" />عودة
        </button>
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-bold text-slate-400 dark:text-white/40">حركة مخزن {mov.date} {mov.time}</span>
          <span className="text-[20px] font-black text-slate-800 dark:text-white">حركة {mov.id}</span>
        </div>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:items-start w-full">

        {/* Main */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">
          <SpatialCard title="معلومات الحركة">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">المستودع</span>
                <span className="text-[15px] font-black text-slate-800 dark:text-white">{mov.warehouse}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">نوع الحركة</span>
                <span className={`text-[13px] font-black px-3 py-1 rounded-[10px] border flex items-center gap-1.5 w-fit ${TYPE_COLORS[mov.type]}`}>
                  {TYPE_ICONS[mov.type]}{mov.type}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">إجمالي الكميات</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[20px] font-black text-primary">{totalQty}</span>
                  <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">قطعة</span>
                </div>
              </div>
            </div>
          </SpatialCard>

          <SpatialCard title="الأصناف">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">قائمة الأصناف</span>
              <span className="text-[12px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full">{mov.products.length} أصناف</span>
            </div>
            <div className="hidden sm:grid grid-cols-[2fr_1fr] gap-3 px-4 pb-3 border-b border-black/10 dark:border-white/10">
              {['الصنف', 'الكمية'].map((h) => (
                <span key={h} className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">{h}</span>
              ))}
            </div>
            {mov.products.map((p, i) => (
              <div key={i}>
                <div className="hidden sm:grid grid-cols-[2fr_1fr] gap-3 px-4 py-4 items-center border-b border-black/5 dark:border-white/5 last:border-0">
                  <span className="text-[14px] font-black text-slate-800 dark:text-white">{p.name}</span>
                  <span className="text-[15px] font-black text-primary">{p.qty} قطعة</span>
                </div>
                <div className="sm:hidden spatial-card p-4 flex items-center justify-between mt-3">
                  <span className="text-[14px] font-black text-slate-800 dark:text-white">{p.name}</span>
                  <span className="text-[15px] font-black text-primary">{p.qty} قطعة</span>
                </div>
              </div>
            ))}
          </SpatialCard>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0 flex flex-col gap-5">
          <SpatialCard title="حالة الحركة">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-[16px] border ${sc.bg}`}>
              <span className={sc.text}>{sc.icon}</span>
              <span className={`text-[15px] font-black ${sc.text}`}>{mov.status}</span>
            </div>
            <p className="text-[12px] font-bold text-slate-400 dark:text-white/40 mt-3">آخر تحديث: 1 week ago</p>
            <div className="flex flex-col gap-2 mt-4">
              <button className="spatial-button w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px]">
                <Printer className="w-4 h-4" />طباعة PDF
              </button>
              <Link
                to={`/warehouse/movement/edit/${encodeURIComponent(mov.id)}`}
                className="w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px] bg-violet-500/10 hover:bg-violet-500 border border-violet-500/30 hover:border-violet-500 text-violet-600 dark:text-violet-400 hover:text-white transition-all"
              >
                <Pencil className="w-4 h-4" />تعديل الحركة
              </Link>
            </div>
          </SpatialCard>

          <SpatialCard title="سجل العمليات">
            <div className="flex flex-col gap-0">
              {mov.log.map((entry, i) => (
                <div key={i} className="flex gap-3 relative">
                  {i < mov.log.length - 1 && <div className="absolute right-[15px] top-8 bottom-0 w-px bg-black/10 dark:bg-white/10" />}
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div className="flex flex-col gap-0.5 pb-5">
                    <span className="text-[14px] font-black text-slate-800 dark:text-white">{entry.label}</span>
                    <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">بواسطة: {entry.by}</span>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-white/30">{entry.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </SpatialCard>
        </div>
      </div>
    </div>
  );
}
