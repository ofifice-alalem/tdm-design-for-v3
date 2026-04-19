import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { ArrowRight, Printer, Clock, CheckCircle2, XCircle, Ban } from 'lucide-react';
import { SpatialCard } from '../compenntes/ui/SpatialComponents';
import { UploadArea } from '../compenntes/ui/UploadArea';

type Status = 'قيد الانتظار' | 'موثق' | 'مرفوض' | 'ملغي';

const STATUS_CONFIG: Record<Status, { bg: string; text: string; icon: React.ReactNode }> = {
  'قيد الانتظار': { bg: 'bg-yellow-500/10 border-yellow-500/20',  text: 'text-yellow-600 dark:text-yellow-400', icon: <Clock className="w-4 h-4" /> },
  'موثق':          { bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-600 dark:text-emerald-400', icon: <CheckCircle2 className="w-4 h-4" /> },
  'مرفوض':         { bg: 'bg-red-500/10 border-red-500/20',         text: 'text-red-500',                          icon: <XCircle className="w-4 h-4" /> },
  'ملغي':          { bg: 'bg-slate-500/10 border-slate-500/20',     text: 'text-slate-500 dark:text-white/40',     icon: <Ban className="w-4 h-4" /> },
};

const RETURNS: Record<string, {
  id: string; date: string; time: string; status: Status;
  store: string; phone: string; marketer: string;
  invoiceRef: string;
  products: { name: string; variant: string; qty: number; price: number; total: number }[];
  notes: string;
  log: { label: string; by: string; date: string }[];
}> = {
  pending: {
    id: '#RI-20260406-00004',
    date: '2026-04-06', time: '11:00 AM',
    status: 'قيد الانتظار',
    store: 'شركة طريق المطار احمد علي', phone: '0912345678', marketer: 'محمد البحري',
    invoiceRef: '#SI-20260406-00153',
    products: [
      { name: 'سلة فراولة p.p', variant: '---', qty: 10, price: 150, total: 1500 },
    ],
    notes: '',
    log: [
      { label: 'تم إنشاء طلب الإرجاع', by: 'محمد البحري', date: '2026-04-06 11:00 AM' },
    ],
  },
  verified: {
    id: '#RI-20260329-00003',
    date: '2026-03-29', time: '04:00 PM',
    status: 'موثق',
    store: 'الزاهد الكريمية', phone: '0921234567', marketer: 'أحمد علي',
    invoiceRef: '#SI-20260329-00151',
    products: [
      { name: 'سلة فراولة p.p', variant: '---', qty: 5, price: 150, total: 750 },
      { name: 'اكواب المتفوقون عبوة 2000', variant: '---', qty: 4, price: 105, total: 420 },
    ],
    notes: 'بضاعة تالفة',
    log: [
      { label: 'تم إنشاء طلب الإرجاع', by: 'أحمد علي',       date: '2026-03-29 04:00 PM' },
      { label: 'تم التوثيق',             by: 'الحارث العالم',  date: '2026-03-30 10:15 AM' },
    ],
  },
};

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const DEMO_KEYS = Object.keys(RETURNS) as (keyof typeof RETURNS)[];
const DEMO_LABELS: Record<string, string> = { pending: 'قيد الانتظار', verified: 'موثق' };

export default function ReturnInvoiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const decodedId = id ? decodeURIComponent(id) : '';
  const initKey = decodedId === RETURNS.verified.id ? 'verified' : 'pending';
  const [activeKey, setActiveKey] = useState(initKey);
  const [showImageModal, setShowImageModal] = useState(false);
  const ret = RETURNS[activeKey];
  const sc = STATUS_CONFIG[ret.status];
  const subtotal = ret.products.reduce((s, p) => s + p.total, 0);
  const totalQty = ret.products.reduce((s, p) => s + p.qty, 0);

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
          <ArrowRight className="w-4 h-4" />
          عودة
        </button>
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-bold text-slate-400 dark:text-white/40">فاتورة إرجاع {ret.date} {ret.time}</span>
          <span className="text-[20px] font-black text-slate-800 dark:text-white">إرجاع {ret.id}</span>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:items-start w-full">

        {/* Right: main content */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">

          {/* معلومات الإرجاع */}
          <SpatialCard title="معلومات الإرجاع">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'اسم المتجر',    value: ret.store },
                { label: 'رقم الهاتف',   value: ret.phone },
                { label: 'المسوق',         value: ret.marketer },
                { label: 'الفاتورة المرجعية', value: ret.invoiceRef },
              ].map((f) => (
                <div key={f.label} className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">{f.label}</span>
                  <span className="text-[14px] font-black text-slate-800 dark:text-white">{f.value}</span>
                </div>
              ))}
            </div>
          </SpatialCard>

          {/* المنتجات المرجعة */}
          <SpatialCard title="المنتجات المرجعة">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">قائمة الأصناف المرجعة</span>
              <span className="text-[12px] font-black text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full">{ret.products.length} أصناف</span>
            </div>

            {/* Header - PC only */}
            <div className="hidden sm:grid grid-cols-[2fr_1fr_1.5fr_1.5fr] gap-3 px-4 pb-3 border-b border-black/10 dark:border-white/10">
              {['المنتج', 'الكمية', 'السعر', 'الإجمالي'].map((h) => (
                <span key={h} className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">{h}</span>
              ))}
            </div>

            {ret.products.map((p, i) => (
              <div key={i}>
                {/* PC row */}
                <div className="hidden sm:grid grid-cols-[2fr_1fr_1.5fr_1.5fr] gap-3 px-4 py-4 items-center border-b border-black/5 dark:border-white/5 last:border-0">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-black text-slate-800 dark:text-white">{p.name}</span>
                    <span className="text-[12px] font-bold text-slate-400 dark:text-white/30">{p.variant}</span>
                  </div>
                  <span className="text-[15px] font-black text-slate-700 dark:text-white/80">{p.qty}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[15px] font-black text-slate-700 dark:text-white/80">{fmt(p.price)}</span>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-white/30">د</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[15px] font-black text-rose-500">{fmt(p.total)}</span>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-white/30">د</span>
                  </div>
                </div>

                {/* Mobile card */}
                <div className="sm:hidden spatial-card p-4 flex flex-col gap-3 mt-3">
                  <span className="text-[15px] font-black text-slate-800 dark:text-white">{p.name}</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[{l:'الكمية', v: String(p.qty)}, {l:'السعر', v: fmt(p.price)+' د'}].map(({l,v}) => (
                      <div key={l} className="flex flex-col gap-0.5">
                        <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">{l}</span>
                        <span className="text-[14px] font-black text-slate-700 dark:text-white/80">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">الإجمالي</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[18px] font-black text-rose-500">{fmt(p.total)}</span>
                      <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">دينار</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Totals */}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-black/10 dark:border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-500 dark:text-white/50">عدد البضاعة</span>
                <span className="text-[14px] font-black text-slate-700 dark:text-white/80">{totalQty}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/5">
                <span className="text-[15px] font-black text-slate-700 dark:text-white/80">إجمالي الإرجاع</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[24px] font-black text-rose-500">{fmt(subtotal)}</span>
                  <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">دينار</span>
                </div>
              </div>
            </div>
          </SpatialCard>

        </div>

        {/* Left: sidebar */}
        <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0 flex flex-col gap-5">

          {/* الحالة */}
          <SpatialCard title="حالة الإرجاع">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-[16px] border ${sc.bg}`}>
              <span className={sc.text}>{sc.icon}</span>
              <span className={`text-[15px] font-black ${sc.text}`}>{ret.status}</span>
            </div>
            <p className="text-[12px] font-bold text-slate-400 dark:text-white/40 mt-3">آخر تحديث: 1 week ago</p>
            <div className="flex flex-col gap-2 mt-4">
              <button className="spatial-button w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px]">
                <Printer className="w-4 h-4" />
                طباعة PDF
              </button>
              {ret.status === 'موثق' && (
                <button
                  onClick={() => setShowImageModal(true)}
                  className="w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px] bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/30 hover:border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:text-white transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  عرض صورة التوثيق
                </button>
              )}
              {ret.status === 'قيد الانتظار' && (
                <>
                  <button className="w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px] bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/30 hover:border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:text-white transition-all">
                    <CheckCircle2 className="w-4 h-4" />
                    توثيق الإرجاع
                  </button>
                  <button className="w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px] bg-red-500/10 hover:bg-red-500 border border-red-500/30 hover:border-red-500 text-red-500 hover:text-white transition-all">
                    <XCircle className="w-4 h-4" />
                    رفض الإرجاع
                  </button>
                </>
              )}
            </div>
          </SpatialCard>

          {/* رفع الصورة - قيد الانتظار فقط */}
          {ret.status === 'قيد الانتظار' && (
            <SpatialCard title="صورة الإرجاع المختومة">
              <UploadArea />
            </SpatialCard>
          )}

          {/* ملاحظات */}
          {ret.notes && (
            <SpatialCard title="ملاحظات">
              <p className="text-[14px] font-bold text-slate-700 dark:text-white/80">{ret.notes}</p>
            </SpatialCard>
          )}

          {/* سجل العمليات */}
          <SpatialCard title="سجل العمليات">
            <div className="flex flex-col gap-0">
              {ret.log.map((entry, i) => (
                <div key={i} className="flex gap-3 relative">
                  {i < ret.log.length - 1 && (
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
            {ret.status === 'قيد الانتظار' && (
              <div className="mt-2 pt-4 border-t border-black/5 dark:border-white/5">
                <p className="text-[13px] font-bold text-slate-400 dark:text-white/40 text-center">في الانتظار...</p>
              </div>
            )}
          </SpatialCard>

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
              <span className="text-[15px] font-black text-slate-800 dark:text-white">صورة الإرجاع المختومة</span>
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
    </div>
  );
}
