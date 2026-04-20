import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { ArrowRight, Printer, CheckCircle2, XCircle, Ban, Pencil } from 'lucide-react';
import { SpatialCard } from '../compenntes/ui/SpatialComponents';

type Status = 'مكتمل' | 'ملغي';

const STATUS_CONFIG: Record<Status, { bg: string; text: string; icon: React.ReactNode }> = {
  'مكتمل': { bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-600 dark:text-emerald-400', icon: <CheckCircle2 className="w-4 h-4" /> },
  'ملغي':  { bg: 'bg-slate-500/10 border-slate-500/20',     text: 'text-slate-500 dark:text-white/40',     icon: <Ban className="w-4 h-4" /> },
};

const INVOICES = {
  completed: {
    id: '#FI-20260406-00006', date: '2026-04-06', time: '10:00 AM', status: 'مكتمل' as Status,
    supplier: 'مورد النسيج الأول', phone: '0912345678',
    products: [
      { name: 'قماش قطني أبيض', qty: 100, buyPrice: 45, unitPrice: 45, total: 4500 },
      { name: 'خيط بوليستر',    qty: 50,  buyPrice: 12, unitPrice: 12, total: 600  },
    ],
    log: [
      { label: 'تم إنشاء الفاتورة', by: 'أحمد المدير',   date: '2026-04-06 10:00 AM' },
      { label: 'تم الاكتمال',        by: 'الحارث العالم', date: '2026-04-07 09:00 AM' },
    ],
  },
  cancelled: {
    id: '#FI-20260315-00003', date: '2026-03-15', time: '11:30 AM', status: 'ملغي' as Status,
    supplier: 'مورد الأقمشة الحديثة', phone: '0934567890',
    products: [
      { name: 'أزرار معدنية', qty: 500, buyPrice: 8, unitPrice: 8, total: 4000 },
    ],
    log: [
      { label: 'تم إنشاء الفاتورة', by: 'أحمد المدير',   date: '2026-03-15 11:30 AM' },
      { label: 'تم الإلغاء',         by: 'الحارث العالم', date: '2026-03-15 01:00 PM' },
    ],
  },
};

const DEMO_KEYS = ['completed', 'cancelled'] as const;
const DEMO_LABELS = { completed: 'مكتمل', cancelled: 'ملغي' };

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function FactoryInvoiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const decodedId = id ? decodeURIComponent(id) : '';
  const initKey = decodedId === INVOICES.cancelled.id ? 'cancelled' : 'completed';
  const [activeKey, setActiveKey] = useState<typeof DEMO_KEYS[number]>(initKey);
  const [showImageModal, setShowImageModal] = useState(false);

  const inv = INVOICES[activeKey];
  const sc = STATUS_CONFIG[inv.status];
  const totalQty   = inv.products.reduce((s, p) => s + p.qty, 0);
  const grandTotal = inv.products.reduce((s, p) => s + p.total, 0);

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
            <ArrowRight className="w-4 h-4" />عودة
          </button>
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-bold text-slate-400 dark:text-white/40">فاتورة مشتريات {inv.date} {inv.time}</span>
            <span className="text-[20px] font-black text-slate-800 dark:text-white">فاتورة {inv.id}</span>
          </div>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:items-start w-full">

          {/* Main */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">
            <SpatialCard title="معلومات الفاتورة">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[{ label: 'اسم المورد', value: inv.supplier }, { label: 'رقم الهاتف', value: inv.phone }].map((f) => (
                  <div key={f.label} className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">{f.label}</span>
                    <span className="text-[15px] font-black text-slate-800 dark:text-white">{f.value}</span>
                  </div>
                ))}
              </div>
            </SpatialCard>

            <SpatialCard title="المنتجات المشتراة">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">قائمة الأصناف</span>
                <span className="text-[12px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full">{inv.products.length} أصناف</span>
              </div>

              {/* PC header */}
              <div className="hidden sm:grid grid-cols-[2fr_1fr_1.5fr_1.5fr] gap-3 px-4 pb-3 border-b border-black/10 dark:border-white/10">
                {['المنتج', 'الكمية', 'سعر الشراء', 'الإجمالي'].map((h) => (
                  <span key={h} className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">{h}</span>
                ))}
              </div>

              {inv.products.map((p, i) => (
                <div key={i}>
                  <div className="hidden sm:grid grid-cols-[2fr_1fr_1.5fr_1.5fr] gap-3 px-4 py-4 items-center border-b border-black/5 dark:border-white/5 last:border-0">
                    <span className="text-[14px] font-black text-slate-800 dark:text-white">{p.name}</span>
                    <span className="text-[15px] font-black text-slate-700 dark:text-white/80">{p.qty}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[15px] font-black text-slate-700 dark:text-white/80">{fmt(p.buyPrice)}</span>
                      <span className="text-[11px] font-bold text-slate-400 dark:text-white/30">د</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[15px] font-black text-primary">{fmt(p.total)}</span>
                      <span className="text-[11px] font-bold text-slate-400 dark:text-white/30">د</span>
                    </div>
                  </div>
                  {/* Mobile */}
                  <div className="sm:hidden spatial-card p-4 flex flex-col gap-3 mt-3">
                    <span className="text-[15px] font-black text-slate-800 dark:text-white">{p.name}</span>
                    <div className="grid grid-cols-2 gap-2">
                      {[{l:'الكمية',v:String(p.qty)},{l:'سعر الشراء',v:fmt(p.buyPrice)+' د'},{l:'الإجمالي',v:fmt(p.total)+' د'}].map(({l,v})=>(
                        <div key={l} className="flex flex-col gap-0.5">
                          <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">{l}</span>
                          <span className="text-[14px] font-black text-slate-700 dark:text-white/80">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-black/10 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-slate-500 dark:text-white/50">إجمالي الكميات</span>
                  <span className="text-[14px] font-black text-slate-700 dark:text-white/80">{totalQty} قطعة</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/5">
                  <span className="text-[15px] font-black text-slate-700 dark:text-white/80">الإجمالي النهائي</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[24px] font-black text-primary">{fmt(grandTotal)}</span>
                    <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">دينار</span>
                  </div>
                </div>
              </div>
            </SpatialCard>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0 flex flex-col gap-5">
            <SpatialCard title="حالة الفاتورة">
              <div className={`flex items-center gap-3 px-4 py-3 rounded-[16px] border ${sc.bg}`}>
                <span className={sc.text}>{sc.icon}</span>
                <span className={`text-[15px] font-black ${sc.text}`}>{inv.status}</span>
              </div>
              <p className="text-[12px] font-bold text-slate-400 dark:text-white/40 mt-3">آخر تحديث: 1 week ago</p>
              <div className="flex flex-col gap-2 mt-4">
                <button className="spatial-button w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px]">
                  <Printer className="w-4 h-4" />طباعة PDF
                </button>
                <Link
                  to={`/factory/invoice/edit/${encodeURIComponent(inv.id)}`}
                  className="w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px] bg-violet-500/10 hover:bg-violet-500 border border-violet-500/30 hover:border-violet-500 text-violet-600 dark:text-violet-400 hover:text-white transition-all"
                >
                  <Pencil className="w-4 h-4" />تعديل الفاتورة
                </Link>
                {inv.status === 'مكتمل' && (
                  <button onClick={() => setShowImageModal(true)} className="w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px] bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/30 hover:border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:text-white transition-all">
                    <CheckCircle2 className="w-4 h-4" />عرض صورة التوثيق
                  </button>
                )}
              </div>
            </SpatialCard>

            <SpatialCard title="سجل العمليات">
              <div className="flex flex-col gap-0">
                {inv.log.map((entry, i) => (
                  <div key={i} className="flex gap-3 relative">
                    {i < inv.log.length - 1 && <div className="absolute right-[15px] top-8 bottom-0 w-px bg-black/10 dark:bg-white/10" />}
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

      {showImageModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-200" onClick={() => setShowImageModal(false)}>
          <div className="spatial-card p-5 w-[90vw] max-w-lg flex flex-col gap-4 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-black text-slate-800 dark:text-white">صورة الفاتورة المختومة</span>
              <button onClick={() => setShowImageModal(false)} className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20 transition-all">
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
