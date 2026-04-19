import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { ArrowRight, Printer, Clock, CheckCircle2, XCircle, Ban, Wallet } from 'lucide-react';
import { SpatialCard } from '../compenntes/ui/SpatialComponents';
import { UploadArea } from '../compenntes/ui/UploadArea';

type Status = 'قيد الانتظار' | 'موثق' | 'مرفوض' | 'ملغي';

const STATUS_CONFIG: Record<Status, { bg: string; text: string; icon: React.ReactNode }> = {
  'قيد الانتظار': { bg: 'bg-yellow-500/10 border-yellow-500/20',  text: 'text-yellow-600 dark:text-yellow-400', icon: <Clock className="w-4 h-4" /> },
  'موثق':          { bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-600 dark:text-emerald-400', icon: <CheckCircle2 className="w-4 h-4" /> },
  'مرفوض':         { bg: 'bg-red-500/10 border-red-500/20',         text: 'text-red-500',                          icon: <XCircle className="w-4 h-4" /> },
  'ملغي':          { bg: 'bg-slate-500/10 border-slate-500/20',     text: 'text-slate-500 dark:text-white/40',     icon: <Ban className="w-4 h-4" /> },
};

const METHOD_COLORS: Record<string, string> = {
  'نقدي':  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  'حوالة': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  'شيك':   'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
};

const RECEIPTS: Record<string, {
  id: string; date: string; time: string; status: Status;
  store: string; phone: string; marketer: string;
  amount: number; method: string; debt: number; remaining: number;
  notes: string;
  log: { label: string; by: string; date: string }[];
}> = {
  pending: {
    id: '#RC-20260406-00005',
    date: '2026-04-06', time: '10:30 AM',
    status: 'قيد الانتظار',
    store: 'شركة طريق المطار احمد علي', phone: '0912345678', marketer: 'محمد البحري',
    amount: 2000, method: 'نقدي', debt: 3150, remaining: 1150,
    notes: '',
    log: [
      { label: 'تم إنشاء الإيصال', by: 'محمد البحري', date: '2026-04-06 10:30 AM' },
    ],
  },
  verified: {
    id: '#RC-20260329-00004',
    date: '2026-03-29', time: '02:15 PM',
    status: 'موثق',
    store: 'الزاهد الكريمية', phone: '0921234567', marketer: 'أحمد علي',
    amount: 4200, method: 'حوالة', debt: 4200, remaining: 0,
    notes: 'تم السداد الكامل',
    log: [
      { label: 'تم إنشاء الإيصال', by: 'أحمد علي',       date: '2026-03-29 02:15 PM' },
      { label: 'تم التوثيق',        by: 'الحارث العالم',  date: '2026-03-30 09:00 AM' },
    ],
  },
};

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const DEMO_KEYS = Object.keys(RECEIPTS) as (keyof typeof RECEIPTS)[];
const DEMO_LABELS: Record<string, string> = { pending: 'قيد الانتظار', verified: 'موثق' };

export default function ReceiptDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const decodedId = id ? decodeURIComponent(id) : '';
  const initKey = decodedId === RECEIPTS.verified.id ? 'verified' : 'pending';
  const [activeKey, setActiveKey] = useState(initKey);
  const [showImageModal, setShowImageModal] = useState(false);
  const rec = RECEIPTS[activeKey];
  const sc = STATUS_CONFIG[rec.status];

  return (
    <>
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
          <ArrowRight className="w-4 h-4" />
          عودة
        </button>
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-bold text-slate-400 dark:text-white/40">إيصال قبض {rec.date} {rec.time}</span>
          <span className="text-[20px] font-black text-slate-800 dark:text-white">إيصال {rec.id}</span>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:items-start w-full">

        {/* Right: main content */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">

          {/* معلومات الإيصال */}
          <SpatialCard title="معلومات الإيصال">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'اسم المتجر',  value: rec.store },
                { label: 'رقم الهاتف', value: rec.phone },
                { label: 'المسوق',      value: rec.marketer },
              ].map((f) => (
                <div key={f.label} className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">{f.label}</span>
                  <span className="text-[15px] font-black text-slate-800 dark:text-white">{f.value}</span>
                </div>
              ))}
            </div>
          </SpatialCard>

          {/* تفاصيل الدفع */}
          <SpatialCard title="تفاصيل الدفع">
            <div className="flex flex-col gap-0">
              {[
                { label: 'طريقة الدفع', value: (
                  <span className={`text-[13px] font-black px-3 py-1 rounded-[10px] border flex items-center gap-1.5 w-fit ${METHOD_COLORS[rec.method]}`}>
                    <Wallet className="w-3.5 h-3.5" />
                    {rec.method}
                  </span>
                )},
                { label: 'الدين الحالي', value: (
                  <div className="flex items-baseline gap-1">
                    <span className="text-[20px] font-black text-red-500">{fmt(rec.debt)}</span>
                    <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">دينار</span>
                  </div>
                )},
                { label: 'المبلغ المسدد', value: (
                  <div className="flex items-baseline gap-1">
                    <span className="text-[20px] font-black text-teal-500">{fmt(rec.amount)}</span>
                    <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">دينار</span>
                  </div>
                )},
                { label: 'باقي الدين', value: (
                  <div className="flex items-baseline gap-1">
                    <span className={`text-[20px] font-black ${rec.remaining === 0 ? 'text-emerald-500' : 'text-orange-500'}`}>{fmt(rec.remaining)}</span>
                    <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">دينار</span>
                  </div>
                )},
              ].map((row, i, arr) => (
                <div key={row.label} className={`flex items-center justify-between py-3.5 ${i < arr.length - 1 ? 'border-b border-black/5 dark:border-white/5' : ''}`}>
                  <span className="text-[13px] font-bold text-slate-500 dark:text-white/50">{row.label}</span>
                  {row.value}
                </div>
              ))}
            </div>
            {rec.notes && (
              <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5">
                <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">ملاحظات</span>
                <p className="text-[14px] font-bold text-slate-700 dark:text-white/80 mt-1">{rec.notes}</p>
              </div>
            )}
          </SpatialCard>

        </div>

        {/* Left: sidebar */}
        <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0 flex flex-col gap-5">

          {/* الحالة */}
          <SpatialCard title="حالة الإيصال">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-[16px] border ${sc.bg}`}>
              <span className={sc.text}>{sc.icon}</span>
              <span className={`text-[15px] font-black ${sc.text}`}>{rec.status}</span>
            </div>
            <p className="text-[12px] font-bold text-slate-400 dark:text-white/40 mt-3">آخر تحديث: 1 week ago</p>
            <div className="flex flex-col gap-2 mt-4">
              <button className="spatial-button w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px]">
                <Printer className="w-4 h-4" />
                طباعة PDF
              </button>
              {rec.status === 'موثق' && (
                <button
                  onClick={() => setShowImageModal(true)}
                  className="w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px] bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/30 hover:border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:text-white transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  عرض صورة التوثيق
                </button>
              )}
              {rec.status === 'قيد الانتظار' && (
                <button className="w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px] bg-red-500/10 hover:bg-red-500 border border-red-500/30 hover:border-red-500 text-red-500 hover:text-white transition-all">
                  <XCircle className="w-4 h-4" />
                  رفض الإيصال
                </button>
              )}
            </div>
          </SpatialCard>

          {/* رفع الصورة - قيد الانتظار فقط */}
          {rec.status === 'قيد الانتظار' && (
            <SpatialCard title="صورة الإيصال المختومة">
              <UploadArea />
            </SpatialCard>
          )}

          {/* سجل العمليات */}
          <SpatialCard title="سجل العمليات">
            <div className="flex flex-col gap-0">
              {rec.log.map((entry, i) => (
                <div key={i} className="flex gap-3 relative">
                  {i < rec.log.length - 1 && (
                    <div className="absolute right-[15px] top-8 bottom-0 w-px bg-black/10 dark:bg-white/10" />
                  )}
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
            {rec.status === 'قيد الانتظار' && (
              <div className="mt-2 pt-4 border-t border-black/5 dark:border-white/5">
                <p className="text-[13px] font-bold text-slate-400 dark:text-white/40 text-center">في الانتظار...</p>
              </div>
            )}
          </SpatialCard>

        </div>
      </div>
    </div>

      {showImageModal && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="spatial-card p-5 w-[90vw] max-w-lg flex flex-col gap-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-black text-slate-800 dark:text-white">صورة الإيصال المختومة</span>
              <button
                onClick={() => setShowImageModal(false)}
                className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20 transition-all"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
            <div className="rounded-[20px] overflow-hidden bg-black/5 dark:bg-white/5 flex items-center justify-center min-h-[300px]">
              <div className="flex flex-col items-center gap-3 text-slate-400 dark:text-white/30">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 opacity-50" />
                <span className="text-[13px] font-bold">صورة التوثيق</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
