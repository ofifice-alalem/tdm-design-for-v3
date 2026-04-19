import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { ArrowRight, Printer, Clock, CheckCircle2, XCircle, Ban, ThumbsUp, Upload } from 'lucide-react';
import { SpatialCard } from '../compenntes/ui/SpatialComponents';

type Status = 'قيد الانتظار' | 'تمت الموافقة' | 'موثق' | 'مرفوض' | 'ملغي';

const STATUS_CONFIG: Record<Status, { bg: string; text: string; icon: React.ReactNode }> = {
  'قيد الانتظار': { bg: 'bg-yellow-500/10 border-yellow-500/20',  text: 'text-yellow-600 dark:text-yellow-400',   icon: <Clock className="w-4 h-4" /> },
  'تمت الموافقة': { bg: 'bg-blue-500/10 border-blue-500/20',      text: 'text-blue-600 dark:text-blue-400',       icon: <ThumbsUp className="w-4 h-4" /> },
  'موثق':          { bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-600 dark:text-emerald-400', icon: <CheckCircle2 className="w-4 h-4" /> },
  'مرفوض':         { bg: 'bg-red-500/10 border-red-500/20',         text: 'text-red-500',                           icon: <XCircle className="w-4 h-4" /> },
  'ملغي':          { bg: 'bg-slate-500/10 border-slate-500/20',     text: 'text-slate-500 dark:text-white/40',      icon: <Ban className="w-4 h-4" /> },
};

const ORDERS = {
  pending: {
    id: '#MR-20260406-00006',
    date: '2026-04-06',
    time: '09:13 AM',
    status: 'قيد الانتظار' as Status,
    marketer: 'محمد البحري',
    products: [
      { name: 'اكواب المتفوقون عبوة 2000', qty: 20 },
    ],
    log: [
      { label: 'تم إنشاء الطلب', by: 'محمد البحري', date: '2026-04-06 09:13 AM' },
    ],
  },
  approved: {
    id: '#MR-20260329-00005',
    date: '2026-03-29',
    time: '03:28 PM',
    status: 'تمت الموافقة' as Status,
    marketer: 'محمد البحري',
    products: [
      { name: 'سلة فراولة p.p', qty: 30 },
      { name: 'صحون 19', qty: 10 },
    ],
    log: [
      { label: 'تم إنشاء الطلب',    by: 'محمد البحري',   date: '2026-03-29 03:28 PM' },
      { label: 'تمت الموافقة',       by: 'الحارث العالم', date: '2026-03-29 05:10 PM' },
    ],
  },
  rejected: {
    id: '#MR-20260320-00004',
    date: '2026-03-20',
    time: '11:00 AM',
    status: 'مرفوض' as Status,
    marketer: 'أحمد علي',
    products: [
      { name: 'كابل الشحن السريع', qty: 50 },
    ],
    log: [
      { label: 'تم إنشاء الطلب', by: 'أحمد علي',        date: '2026-03-20 11:00 AM' },
      { label: 'تم الرفض',        by: 'الحارث العالم',   date: '2026-03-20 12:30 PM' },
    ],
  },
  verified: {
    id: '#MR-20260315-00003',
    date: '2026-03-15',
    time: '10:00 AM',
    status: 'موثق' as Status,
    marketer: 'سارة خالد',
    products: [
      { name: 'سماعات ايربودز', qty: 5 },
      { name: 'باور بانك 20000', qty: 2 },
    ],
    log: [
      { label: 'تم إنشاء الطلب',  by: 'سارة خالد',    date: '2026-03-15 10:00 AM' },
      { label: 'تمت الموافقة',      by: 'الحارث العالم', date: '2026-03-15 11:30 AM' },
      { label: 'تم التوثيق',        by: 'الحارث العالم', date: '2026-03-15 02:00 PM' },
    ],
  },
};

function UploadAreaLocal() {
  const [file, setFile] = useState<File | null>(null);
  if (file) {
    return (
      <div className="flex items-center justify-between px-4 py-3 rounded-[20px] bg-emerald-500/10 border border-emerald-500/25">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-black text-emerald-600 dark:text-emerald-400">تم تحميل الصورة</span>
            <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 truncate max-w-[160px]">{file.name}</span>
          </div>
        </div>
        <button onClick={() => setFile(null)} className="text-[12px] font-black text-red-500 hover:text-red-600 transition-colors shrink-0">إلغاء الصورة</button>
      </div>
    );
  }
  return (
    <label className="flex flex-col items-center justify-center gap-3 h-36 rounded-[20px] border-2 border-dashed border-black/15 dark:border-white/15 hover:border-primary/40 cursor-pointer transition-all group">
      <input type="file" accept="image/png,image/jpg,image/jpeg" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <Upload className="w-8 h-8 text-slate-400 dark:text-white/30 group-hover:text-primary transition-colors" />
      <div className="text-center">
        <p className="text-[13px] font-black text-slate-600 dark:text-white/60 group-hover:text-primary transition-colors">اضغط للرفع أو اسحب الصورة</p>
        <p className="text-[11px] font-bold text-slate-400 dark:text-white/30 mt-1">PNG, JPG أو JPEG (الحد الأقصى 2MB)</p>
      </div>
    </label>
  );
}

export default function OrderDetailPage() {
  const navigate = useNavigate();
  const [activeDemo, setActiveDemo] = useState<'pending' | 'approved' | 'rejected' | 'verified'>('pending');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const order = ORDERS[activeDemo];
  const sc = STATUS_CONFIG[order.status];
  const totalQty = order.products.reduce((s, p) => s + p.qty, 0);

  return (
    <>
      <div className="flex flex-col gap-6 pb-32 lg:pb-6">

        {/* Demo switcher */}
        <div className="flex gap-2">
          {(['pending', 'approved', 'rejected', 'verified'] as const).map((k) => (
            <button key={k} onClick={() => setActiveDemo(k)}
              className={`px-4 h-9 rounded-[12px] font-bold text-[13px] border transition-all ${
                activeDemo === k ? 'bg-primary border-primary text-white' : 'spatial-input text-slate-600 dark:text-white/60'
              }`}>
              {k === 'pending' ? 'قيد الانتظار' : k === 'approved' ? 'تمت الموافقة' : k === 'rejected' ? 'مرفوض' : 'موثق'}
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
            <span className="text-[13px] font-bold text-slate-400 dark:text-white/40">طلب بضاعة {order.date} {order.time}</span>
            <span className="text-[20px] font-black text-slate-800 dark:text-white">طلب {order.id}</span>
          </div>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:items-start w-full">

          {/* Right: main content */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">

            {/* معلومات الطلب */}
            <SpatialCard title="معلومات الطلب">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">المسوق</span>
                <span className="text-[15px] font-black text-slate-800 dark:text-white">{order.marketer}</span>
              </div>
            </SpatialCard>

            {/* المنتجات */}
            <SpatialCard title="المنتجات المطلوبة">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">قائمة الأصناف في هذا الطلب</span>
                <span className="text-[12px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full">{order.products.length} أصناف</span>
              </div>

              {/* Header - PC */}
              <div className="hidden sm:grid grid-cols-[3fr_1fr] gap-3 px-4 pb-3 border-b border-black/10 dark:border-white/10">
                {['المنتج', 'الكمية'].map((h) => (
                  <span key={h} className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">{h}</span>
                ))}
              </div>

              {order.products.map((p, i) => (
                <div key={i}>
                  {/* PC row */}
                  <div className="hidden sm:grid grid-cols-[3fr_1fr] gap-3 px-4 py-4 items-center border-b border-black/5 dark:border-white/5 last:border-0">
                    <span className="text-[14px] font-black text-slate-800 dark:text-white">{p.name}</span>
                    <span className="text-[15px] font-black text-slate-700 dark:text-white/80">{p.qty}</span>
                  </div>

                  {/* Mobile card */}
                  <div className="sm:hidden spatial-card p-4 flex items-center justify-between mt-3 last:mb-0">
                    <span className="text-[15px] font-black text-slate-800 dark:text-white">{p.name}</span>
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">الكمية</span>
                      <span className="text-[18px] font-black text-primary">{p.qty}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/10 dark:border-white/10">
                <span className="text-[14px] font-bold text-slate-500 dark:text-white/50">إجمالي الكمية</span>
                <span className="text-[20px] font-black text-primary">{totalQty}</span>
              </div>
            </SpatialCard>

          </div>

          {/* Left: sidebar */}
          <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0 flex flex-col gap-5">

            {/* الحالة */}
            <SpatialCard title="حالة الطلب الحالية">
              <div className={`flex items-center gap-3 px-4 py-3 rounded-[16px] border ${sc.bg}`}>
                <span className={sc.text}>{sc.icon}</span>
                <span className={`text-[15px] font-black ${sc.text}`}>{order.status}</span>
              </div>
              <p className="text-[12px] font-bold text-slate-400 dark:text-white/40 mt-3">آخر تحديث: 1 week ago</p>

              <div className="flex flex-col gap-2 mt-4">
                <button className="spatial-button w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px]">
                  <Printer className="w-4 h-4" />
                  طباعة PDF
                </button>
              </div>
            </SpatialCard>

            {/* أزرار الموافقة/الرفض - فقط في قيد الانتظار */}
            {order.status === 'قيد الانتظار' && (
              <SpatialCard title="الإجراءات">
                <div className="flex flex-col gap-2">
                  <button className="spatial-button w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px]">
                    <ThumbsUp className="w-4 h-4" />
                    الموافقة على الطلب
                  </button>
                  <button
                    onClick={() => setShowRejectModal(true)}
                    className="w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px] bg-red-500/10 hover:bg-red-500 border border-red-500/30 hover:border-red-500 text-red-500 hover:text-white transition-all"
                  >
                    <XCircle className="w-4 h-4" />
                    رفض الطلب
                  </button>
                </div>
              </SpatialCard>
            )}

            {/* ارفاق الصورة - تمت الموافقة فقط */}
            {order.status === 'تمت الموافقة' && (
              <SpatialCard title="ارفاق صورة التسليم">
                <UploadAreaLocal />
                <div className="flex flex-col gap-2 mt-4">
                  <button className="spatial-button w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px]">
                    <CheckCircle2 className="w-4 h-4" />
                    توثيق الطلب
                  </button>
                  <button
                    onClick={() => setShowRejectModal(true)}
                    className="w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px] bg-red-500/10 hover:bg-red-500 border border-red-500/30 hover:border-red-500 text-red-500 hover:text-white transition-all"
                  >
                    <XCircle className="w-4 h-4" />
                    رفض الطلب
                  </button>
                </div>
              </SpatialCard>
            )}

            {order.status === 'موثق' && (
              <SpatialCard title="صورة التسليم">
                <button
                  onClick={() => setShowImageModal(true)}
                  className="w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px] bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/30 hover:border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:text-white transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  عرض صورة التوثيق
                </button>
              </SpatialCard>
            )}

            {/* سجل العمليات */}
            <SpatialCard title="سجل العمليات">
              <div className="flex flex-col gap-0">
                {order.log.map((entry, i) => (
                  <div key={i} className="flex gap-3 relative">
                    {i < order.log.length - 1 && (
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
              {order.status === 'قيد الانتظار' && (
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-200" onClick={() => setShowImageModal(false)}>
          <div className="spatial-card p-5 w-[90vw] max-w-lg flex flex-col gap-4 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-black text-slate-800 dark:text-white">صورة التسليم</span>
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

      {/* Modal رفض الطلب */}
      {showRejectModal && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowRejectModal(false)}
        >
          <div
            className="spatial-card p-5 w-[90vw] max-w-md flex flex-col gap-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-black text-slate-800 dark:text-white">رفض الطلب</span>
              <button onClick={() => setShowRejectModal(false)} className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20 transition-all">
                <XCircle className="w-4 h-4" />
              </button>
            </div>
            <textarea
              placeholder="سبب الرفض..."
              className="spatial-input w-full min-h-[100px] resize-none rounded-[20px] p-4 text-sm font-bold"
            />
            <div className="flex gap-3">
              <button className="flex-1 h-11 rounded-[16px] font-bold text-[14px] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-600 dark:text-white/60 hover:bg-black/10 transition-all" onClick={() => setShowRejectModal(false)}>
                إلغاء
              </button>
              <button className="flex-1 h-11 rounded-[16px] font-bold text-[14px] bg-red-500 hover:bg-red-600 text-white transition-all">
                تأكيد الرفض
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
