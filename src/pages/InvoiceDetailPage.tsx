import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Printer, Upload, Clock, CheckCircle2, XCircle, Ban } from 'lucide-react';
import { AppShell } from '../compenntes/layout';
import { SpatialCard } from '../compenntes/ui/SpatialComponents';

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
};

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const decodedId = id ? decodeURIComponent(id) : '';

  // Demo switcher للعرض فقط
  const [activeDemo, setActiveDemo] = useState<'pending' | 'verified'>(
    decodedId === INVOICES.verified.id ? 'verified' : 'pending'
  );
  const inv = INVOICES[activeDemo];
  const sc = STATUS_CONFIG[inv.status];
  const subtotal = inv.products.reduce((s, p) => s + p.total, 0);
  const totalQty = inv.products.reduce((s, p) => s + p.qty, 0);

  return (
    <AppShell>
      <div className="flex flex-col gap-6 h-full overflow-y-auto custom-scroll pb-6">

        {/* Demo switcher */}
        <div className="flex gap-2">
          {(['pending', 'verified'] as const).map((k) => (
            <button key={k} onClick={() => setActiveDemo(k)}
              className={`px-4 h-9 rounded-[12px] font-bold text-[13px] border transition-all ${
                activeDemo === k ? 'bg-primary border-primary text-white' : 'spatial-input text-slate-600 dark:text-white/60'
              }`}>
              {k === 'pending' ? 'قيد الانتظار' : 'موثق'}
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-4 h-11 rounded-[16px] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-slate-600 dark:text-white/70 font-bold text-[14px] transition-all">
              <ArrowRight className="w-4 h-4" />
              عودة
            </button>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-slate-400 dark:text-white/40">فاتورة بيع {inv.date} {inv.time}</span>
              <span className="text-[18px] font-black text-slate-800 dark:text-white">فاتورة {inv.id}</span>
            </div>
          </div>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

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

              {/* Table header */}
              <div className="hidden sm:grid grid-cols-5 gap-3 px-3 pb-2 border-b border-black/5 dark:border-white/5">
                {['المنتج', 'الكمية', 'مجاني', 'السعر', 'الإجمالي'].map((h) => (
                  <span key={h} className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">{h}</span>
                ))}
              </div>

              {inv.products.map((p, i) => (
                <div key={i} className="grid grid-cols-2 sm:grid-cols-5 gap-3 px-3 py-3 border-b border-black/5 dark:border-white/5 last:border-0">
                  <div className="col-span-2 sm:col-span-1 flex flex-col gap-0.5">
                    <span className="text-[14px] font-black text-slate-800 dark:text-white">{p.name}</span>
                    <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">{p.variant}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 sm:contents">
                    <span className="sm:hidden text-[11px] font-bold text-slate-400 dark:text-white/40">الكمية</span>
                    <span className="text-[14px] font-black text-slate-700 dark:text-white/80">{p.qty}</span>
                    <span className="sm:hidden text-[11px] font-bold text-slate-400 dark:text-white/40">مجاني</span>
                    <span className="text-[14px] font-black text-slate-700 dark:text-white/80">{p.free}</span>
                    <span className="sm:hidden text-[11px] font-bold text-slate-400 dark:text-white/40">السعر</span>
                    <span className="text-[14px] font-black text-slate-700 dark:text-white/80">{fmt(p.price)} <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">دينار</span></span>
                    <span className="sm:hidden text-[11px] font-bold text-slate-400 dark:text-white/40">الإجمالي</span>
                    <span className="text-[14px] font-black text-primary">{fmt(p.total)} <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">دينار</span></span>
                  </div>
                </div>
              ))}

              {/* Totals */}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-black/5 dark:border-white/5">
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
                <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5">
                  <span className="text-[15px] font-black text-slate-700 dark:text-white/80">الإجمالي النهائي</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[22px] font-black text-primary">{fmt(subtotal)}</span>
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
              </div>
            </SpatialCard>

            {/* رفع الصورة - فقط في قيد الانتظار */}
            {inv.status === 'قيد الانتظار' && (
              <SpatialCard title="صورة الفاتورة المختومة">
                <label className="flex flex-col items-center justify-center gap-3 h-36 rounded-[20px] border-2 border-dashed border-black/15 dark:border-white/15 hover:border-primary/40 cursor-pointer transition-all group">
                  <input type="file" accept="image/png,image/jpg,image/jpeg" className="hidden" />
                  <Upload className="w-8 h-8 text-slate-400 dark:text-white/30 group-hover:text-primary transition-colors" />
                  <div className="text-center">
                    <p className="text-[13px] font-black text-slate-600 dark:text-white/60 group-hover:text-primary transition-colors">اضغط للرفع أو اسحب الصورة</p>
                    <p className="text-[11px] font-bold text-slate-400 dark:text-white/30 mt-1">PNG, JPG أو JPEG (الحد الأقصى 2MB)</p>
                  </div>
                </label>
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
    </AppShell>
  );
}
