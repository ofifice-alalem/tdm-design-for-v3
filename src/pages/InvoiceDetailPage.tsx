import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { ArrowRight, Printer, Upload, Clock, CheckCircle2, XCircle, Ban } from 'lucide-react';
import { SpatialCard } from '../compenntes/ui/SpatialComponents';
import { UploadArea } from '../compenntes/ui/UploadArea';

type Status = 'قيد الانتظار' | 'موثق' | 'مرفوض' | 'ملغي';

const STATUS_CONFIG: Record<Status, { bg: string; text: string; icon: React.ReactNode }> = {
  'قيد الانتظار': { bg: 'bg-yellow-500/10 border-yellow-500/20',  text: 'text-yellow-600 dark:text-yellow-400', icon: <Clock className="w-4 h-4" /> },
  'موثق':          { bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-600 dark:text-emerald-400', icon: <CheckCircle2 className="w-4 h-4" /> },
  'مرفوض':         { bg: 'bg-red-500/10 border-red-500/20',         text: 'text-red-500',                          icon: <XCircle className="w-4 h-4" /> },
  'ملغي':          { bg: 'bg-slate-500/10 border-slate-500/20',     text: 'text-slate-500 dark:text-white/40',     icon: <Ban className="w-4 h-4" /> },
};

const INVOICES = {
  pending: {
    id: '#SI-20260406-00153',
    date: '2026-04-06',
    time: '09:13 PM',
    status: 'قيد الانتظار' as Status,
    store: 'الشيخ محمود / البحرى',
    phone: '---',
    marketer: 'محمد البحري',
    products: [
      { name: 'سلة فراولة p.p', variant: '---', qty: 50, free: 0, price: 150, total: 7500 },
    ],
    log: [
      { label: 'تم إنشاء الفاتورة', by: 'محمد البحري', date: '2026-04-06 09:13 PM' },
    ],
  },
  verified: {
    id: '#SI-20260329-00151',
    date: '2026-03-29',
    time: '03:28 PM',
    status: 'موثق' as Status,
    store: 'عزدين الحمدي',
    phone: '---',
    marketer: 'محمد البحري',
    products: [
      { name: 'سلة فراولة p.p', variant: '---', qty: 20, free: 0, price: 150, total: 3000 },
    ],
    log: [
      { label: 'تم إنشاء الفاتورة',  by: 'محمد البحري',    date: '2026-03-29 03:28 PM' },
      { label: 'تم التوثيق',          by: 'الحارث العالم',  date: '2026-04-06 10:27 AM' },
    ],
  },
  rejected: {
    id: '#SI-20260311-00167',
    date: '2026-03-11',
    time: '11:26 AM',
    status: 'مرفوض' as Status,
    store: 'القماطى / البحرى',
    phone: '---',
    marketer: 'محمد البحري',
    products: [
      { name: 'اكواب المتفوقون عبوة 2000', variant: '---', qty: 20, free: 0, price: 105, total: 2100 },
      { name: 'صحون 19', variant: '---', qty: 6, free: 0, price: 93, total: 558 },
    ],
    log: [
      { label: 'تم إنشاء الفاتورة', by: 'محمد البحري',   date: '2026-03-11 11:26 AM' },
      { label: 'تم الرفض',          by: 'الحارث العالم', date: '2026-03-11 12:32 PM' },
    ],
  },
};

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}


export default function InvoiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const decodedId = id ? decodeURIComponent(id) : '';
  const [showImageModal, setShowImageModal] = useState(false);

  const [activeDemo, setActiveDemo] = useState<'pending' | 'verified' | 'rejected'>(
    decodedId === INVOICES.verified.id ? 'verified' :
    decodedId === INVOICES.rejected.id ? 'rejected' : 'pending'
  );
  const inv = INVOICES[activeDemo];
  const sc = STATUS_CONFIG[inv.status];
  const subtotal = inv.products.reduce((s, p) => s + p.total, 0);
  const totalQty = inv.products.reduce((s, p) => s + p.qty, 0);

  return (
    <>
      <div className="flex flex-col gap-6 overflow-y-auto custom-scroll pb-32 lg:pb-6">

        {/* Demo switcher */}
        <div className="flex gap-2">
          {(['pending', 'verified', 'rejected'] as const).map((k) => (
            <button key={k} onClick={() => setActiveDemo(k)}
              className={`px-4 h-9 rounded-[12px] font-bold text-[13px] border transition-all ${
                activeDemo === k ? 'bg-primary border-primary text-white' : 'spatial-input text-slate-600 dark:text-white/60'
              }`}>
              {k === 'pending' ? 'قيد الانتظار' : k === 'verified' ? 'موثق' : 'مرفوض'}
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
            <span className="text-[13px] font-bold text-slate-400 dark:text-white/40">فاتورة بيع {inv.date} {inv.time}</span>
            <span className="text-[20px] font-black text-slate-800 dark:text-white">فاتورة {inv.id}</span>
          </div>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:items-start w-full">

          {/* Right: main content */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">

            {/* معلومات الفاتورة */}
            <SpatialCard title="معلومات الفاتورة">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'اسم المتجر',  value: inv.store },
                  { label: 'رقم الهاتف', value: inv.phone },
                  { label: 'المسوق',      value: inv.marketer },
                ].map((f) => (
                  <div key={f.label} className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">{f.label}</span>
                    <span className="text-[15px] font-black text-slate-800 dark:text-white">{f.value}</span>
                  </div>
                ))}
              </div>
            </SpatialCard>

            {/* المنتجات */}
            <SpatialCard title="المنتجات المباعة">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">قائمة الأصناف في هذه الفاتورة</span>
                <span className="text-[12px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full">{inv.products.length} أصناف</span>
              </div>

              {/* Header - PC only */}
              <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1.5fr_1.5fr] gap-3 px-4 pb-3 border-b border-black/10 dark:border-white/10">
                {['المنتج', 'الكمية', 'مجاني', 'السعر', 'الإجمالي'].map((h) => (
                  <span key={h} className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">{h}</span>
                ))}
              </div>

              {/* Rows */}
              {inv.products.map((p, i) => (
                <div key={i}>
                  {/* PC row */}
                  <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1.5fr_1.5fr] gap-3 px-4 py-4 items-center border-b border-black/5 dark:border-white/5 last:border-0">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[14px] font-black text-slate-800 dark:text-white">{p.name}</span>
                      <span className="text-[12px] font-bold text-slate-400 dark:text-white/30">{p.variant}</span>
                    </div>
                    <span className="text-[15px] font-black text-slate-700 dark:text-white/80">{p.qty}</span>
                    <span className="text-[15px] font-black text-slate-700 dark:text-white/80">{p.free}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[15px] font-black text-slate-700 dark:text-white/80">{fmt(p.price)}</span>
                      <span className="text-[11px] font-bold text-slate-400 dark:text-white/30">د</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[15px] font-black text-primary">{fmt(p.total)}</span>
                      <span className="text-[11px] font-bold text-slate-400 dark:text-white/30">د</span>
                    </div>
                  </div>

                  {/* Mobile card */}
                  <div className="sm:hidden spatial-card p-4 flex flex-col gap-3 mt-3 last:mb-0">
                    <span className="text-[15px] font-black text-slate-800 dark:text-white">{p.name}</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[{l:'الكمية', v: String(p.qty)}, {l:'مجاني', v: String(p.free)}, {l:'السعر', v: fmt(p.price)+' د'}].map(({l,v}) => (
                        <div key={l} className="flex flex-col gap-0.5">
                          <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">{l}</span>
                          <span className="text-[14px] font-black text-slate-700 dark:text-white/80">{v}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5">
                      <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">الإجمالي</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[18px] font-black text-primary">{fmt(p.total)}</span>
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
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-slate-500 dark:text-white/50">المجموع الفرعي</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[14px] font-black text-slate-700 dark:text-white/80">{fmt(subtotal)}</span>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">دينار</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/5">
                  <span className="text-[15px] font-black text-slate-700 dark:text-white/80">الإجمالي النهائي</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[24px] font-black text-primary">{fmt(subtotal)}</span>
                    <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">دينار</span>
                  </div>
                </div>
              </div>
            </SpatialCard>

          </div>

          {/* Left: sidebar */}
          <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0 flex flex-col gap-5">

            {/* الحالة */}
            <SpatialCard title="حالة الفاتورة الحالية">
              <div className={`flex items-center gap-3 px-4 py-3 rounded-[16px] border ${sc.bg}`}>
                <span className={sc.text}>{sc.icon}</span>
                <span className={`text-[15px] font-black ${sc.text}`}>{inv.status}</span>
              </div>
              <p className="text-[12px] font-bold text-slate-400 dark:text-white/40 mt-3">آخر تحديث: 1 week ago</p>

              {/* أزرار الإجراءات */}
              <div className="flex flex-col gap-2 mt-4">
                <button className="spatial-button w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px]">
                  <Printer className="w-4 h-4" />
                  طباعة PDF
                </button>
                {inv.status === 'موثق' && (
                  <button
                    onClick={() => setShowImageModal(true)}
                    className="w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px] bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/30 hover:border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:text-white transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    عرض صورة التوثيق
                  </button>
                )}
              </div>
            </SpatialCard>

            {/* رفع الصورة + أزرار التوثيق - فقط في قيد الانتظار */}
            {inv.status === 'قيد الانتظار' && (
              <SpatialCard title="صورة الفاتورة المختومة">
                <UploadArea />
                <div className="flex flex-col gap-2 mt-4">
                  <button className="spatial-button w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px]">
                    <CheckCircle2 className="w-4 h-4" />
                    توثيق الفاتورة
                  </button>
                  <button className="w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px] bg-red-500/10 hover:bg-red-500 border border-red-500/30 hover:border-red-500 text-red-500 hover:text-white transition-all">
                    <XCircle className="w-4 h-4" />
                    رفض الفاتورة
                  </button>
                </div>
              </SpatialCard>
            )}

            {/* سجل العمليات */}
            <SpatialCard title="سجل العمليات">
              <div className="flex flex-col gap-0">
                {inv.log.map((entry, i) => (
                  <div key={i} className="flex gap-3 relative">
                    {/* خط رأسي */}
                    {i < inv.log.length - 1 && (
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

              {/* التوثيق */}
              {inv.status === 'قيد الانتظار' && (
                <div className="mt-2 pt-4 border-t border-black/5 dark:border-white/5">
                  <p className="text-[13px] font-bold text-slate-400 dark:text-white/40 text-center">في الانتظار...</p>
                </div>
              )}
            </SpatialCard>

          </div>
        </div>
      </div>

      {/* Modal صورة التوثيق */}
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
              <span className="text-[15px] font-black text-slate-800 dark:text-white">صورة الفاتورة المختومة</span>
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
