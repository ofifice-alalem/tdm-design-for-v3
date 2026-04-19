import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { ArrowRight, Printer, Clock, CheckCircle2, XCircle, Ban, ThumbsUp, Upload } from 'lucide-react';
import { SpatialCard } from '../compenntes/ui/SpatialComponents';

type Status = 'قيد الانتظار' | 'موثق' | 'مرفوض' | 'ملغي';

const STATUS_CONFIG: Record<Status, { bg: string; text: string; icon: React.ReactNode }> = {
  'قيد الانتظار': { bg: 'bg-yellow-500/10 border-yellow-500/20',  text: 'text-yellow-600 dark:text-yellow-400',   icon: <Clock className="w-4 h-4" /> },
  'موثق':          { bg: 'bg-blue-500/10 border-blue-500/20',      text: 'text-blue-600 dark:text-blue-400',       icon: <ThumbsUp className="w-4 h-4" /> },
  'مرفوض':         { bg: 'bg-red-500/10 border-red-500/20',         text: 'text-red-500',                           icon: <XCircle className="w-4 h-4" /> },
  'ملغي':          { bg: 'bg-slate-500/10 border-slate-500/20',     text: 'text-slate-500 dark:text-white/40',      icon: <Ban className="w-4 h-4" /> },
};

const ORDERS = {
  pending: {
    id: '#WD-20260406-00012', date: '2026-04-06', time: '09:13 AM',
    status: 'قيد الانتظار' as Status,
    marketer: 'محمد البحري', amount: 1500, available: 7423.76, notes: '',
    log: [{ label: 'تم إنشاء الطلب', by: 'محمد البحري', date: '2026-04-06 09:13 AM' }],
  },
  approved: {
    id: '#WD-20260320-00010', date: '2026-03-20', time: '11:00 AM',
    status: 'موثق' as Status,
    marketer: 'أحمد علي', amount: 800, available: 5200, notes: 'تحويل بنكي',
    log: [
      { label: 'تم إنشاء الطلب', by: 'أحمد علي',      date: '2026-03-20 11:00 AM' },
      { label: 'تم التوثيق',      by: 'الحارث العالم', date: '2026-03-20 12:00 PM' },
    ],
  },
  rejected: {
    id: '#WD-20260310-00008', date: '2026-03-10', time: '10:00 AM',
    status: 'مرفوض' as Status,
    marketer: 'أحمد علي', amount: 500, available: 3000, notes: '',
    log: [
      { label: 'تم إنشاء الطلب', by: 'أحمد علي',      date: '2026-03-10 10:00 AM' },
      { label: 'تم الرفض',        by: 'الحارث العالم', date: '2026-03-10 11:30 AM' },
    ],
  },
};

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function UploadArea({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  if (file) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-4 py-3 rounded-[20px] bg-emerald-500/10 border border-emerald-500/25">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-black text-emerald-600 dark:text-emerald-400">تم تحميل الصورة</span>
              <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 truncate max-w-[200px]">{file.name}</span>
            </div>
          </div>
          <button onClick={() => setFile(null)} className="text-[12px] font-black text-red-500 hover:text-red-600 transition-colors shrink-0">إلغاء</button>
        </div>
        <button onClick={onClose} className="spatial-button w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px]">
          <CheckCircle2 className="w-4 h-4" />
          تأكيد الرفع
        </button>
      </div>
    );
  }
  return (
    <label className="flex flex-col items-center justify-center gap-3 h-40 rounded-[20px] border-2 border-dashed border-black/15 dark:border-white/15 hover:border-primary/40 cursor-pointer transition-all group">
      <input type="file" accept="image/png,image/jpg,image/jpeg" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <Upload className="w-8 h-8 text-slate-400 dark:text-white/30 group-hover:text-primary transition-colors" />
      <div className="text-center">
        <p className="text-[13px] font-black text-slate-600 dark:text-white/60 group-hover:text-primary transition-colors">اضغط للرفع أو اسحب الصورة</p>
        <p className="text-[11px] font-bold text-slate-400 dark:text-white/30 mt-1">PNG, JPG أو JPEG (الحد الأقصى 2MB)</p>
      </div>
    </label>
  );
}

export default function WithdrawDetailPage() {
  const navigate = useNavigate();
  const [activeDemo, setActiveDemo] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const order = ORDERS[activeDemo];
  const sc = STATUS_CONFIG[order.status];

  return (
    <>
      <div className="flex flex-col gap-6 pb-32 lg:pb-6">

        {/* Demo switcher */}
        <div className="flex gap-2 flex-wrap">
          {(['pending', 'approved', 'rejected'] as const).map((k) => (
            <button key={k} onClick={() => setActiveDemo(k)}
              className={`px-4 h-9 rounded-[12px] font-bold text-[13px] border transition-all ${
                activeDemo === k ? 'bg-primary border-primary text-white' : 'spatial-input text-slate-600 dark:text-white/60'
              }`}>
              {{ pending: 'قيد الانتظار', approved: 'موثق', rejected: 'مرفوض' }[k]}
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
            <span className="text-[13px] font-bold text-slate-400 dark:text-white/40">طلب سحب {order.date} {order.time}</span>
            <span className="text-[20px] font-black text-slate-800 dark:text-white">طلب {order.id}</span>
          </div>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:items-start w-full">

          {/* Right */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">

            <SpatialCard title="معلومات الطلب">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">المسوق</span>
                  <span className="text-[15px] font-black text-slate-800 dark:text-white">{order.marketer}</span>
                </div>
                {order.notes && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">ملاحظات</span>
                    <span className="text-[15px] font-black text-slate-800 dark:text-white">{order.notes}</span>
                  </div>
                )}
              </div>
            </SpatialCard>

            <SpatialCard title="تفاصيل السحب">
              <div className="flex flex-col">
                <div className="flex items-center justify-between py-3 border-b border-black/5 dark:border-white/5">
                  <span className="text-[14px] font-bold text-slate-500 dark:text-white/50">الرصيد المتاح</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[16px] font-black text-slate-700 dark:text-white/80">{fmt(order.available)}</span>
                    <span className="text-[12px] font-bold text-slate-400 dark:text-white/30">د.ل</span>
                  </div>
                </div>
                <div className={`flex items-center justify-between py-3 ${order.status === 'موثق' ? 'border-b border-black/5 dark:border-white/5' : ''}`}>
                  <span className="text-[14px] font-bold text-slate-500 dark:text-white/50">المبلغ المطلوب</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[24px] font-black text-primary">{fmt(order.amount)}</span>
                    <span className="text-[12px] font-bold text-slate-400 dark:text-white/30">د.ل</span>
                  </div>
                </div>
                {order.status === 'موثق' && (
                  <div className="flex items-center justify-between py-3">
                    <span className="text-[14px] font-bold text-slate-500 dark:text-white/50">الرصيد المتبقي</span>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-[18px] font-black ${order.available - order.amount > 0 ? 'text-orange-500' : 'text-emerald-500'}`}>
                        {fmt(Math.max(0, order.available - order.amount))}
                      </span>
                      <span className="text-[12px] font-bold text-slate-400 dark:text-white/30">د.ل</span>
                    </div>
                  </div>
                )}
              </div>
            </SpatialCard>

          </div>

          {/* Left: sidebar */}
          <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0 flex flex-col gap-5">

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

            {/* قيد الانتظار */}
            {order.status === 'قيد الانتظار' && (
              <SpatialCard title="الإجراءات">
                <div className="flex flex-col gap-2">
                  <button onClick={() => setShowUploadModal(true)}
                    className="w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-600 dark:text-white/60 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all">
                    <Upload className="w-4 h-4" />
                    رفع صورة التحويل
                  </button>
                  <button className="spatial-button w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px]">
                    <ThumbsUp className="w-4 h-4" />
                    الموافقة على الطلب
                  </button>
                  <button onClick={() => setShowRejectModal(true)}
                    className="w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px] bg-red-500/10 hover:bg-red-500 border border-red-500/30 hover:border-red-500 text-red-500 hover:text-white transition-all">
                    <XCircle className="w-4 h-4" />
                    رفض الطلب
                  </button>
                </div>
              </SpatialCard>
            )}

            {/* موثق */}
            {order.status === 'موثق' && (
              <SpatialCard title="إيصال الصرف">
                <button onClick={() => setShowReceiptModal(true)}
                  className="w-full h-11 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px] bg-blue-500/10 hover:bg-blue-500 border border-blue-500/30 hover:border-blue-500 text-blue-600 dark:text-blue-400 hover:text-white transition-all">
                  <CheckCircle2 className="w-4 h-4" />
                  عرض إيصال الصرف
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

      {/* Modal رفع صورة التحويل */}
      {showUploadModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-200" onClick={() => setShowUploadModal(false)}>
          <div className="spatial-card p-5 w-[90vw] max-w-md flex flex-col gap-4 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-black text-slate-800 dark:text-white">رفع صورة التحويل</span>
              <button onClick={() => setShowUploadModal(false)} className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20 transition-all">
                <XCircle className="w-4 h-4" />
              </button>
            </div>
            <UploadArea onClose={() => setShowUploadModal(false)} />
          </div>
        </div>,
        document.body
      )}

      {/* Modal إيصال الصرف */}
      {showReceiptModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-200" onClick={() => setShowReceiptModal(false)}>
          <div className="spatial-card p-5 w-[90vw] max-w-lg flex flex-col gap-4 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-black text-slate-800 dark:text-white">إيصال الصرف</span>
              <button onClick={() => setShowReceiptModal(false)} className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20 transition-all">
                <XCircle className="w-4 h-4" />
              </button>
            </div>
            <div className="rounded-[20px] bg-black/5 dark:bg-white/5 flex items-center justify-center min-h-[300px]">
              <div className="flex flex-col items-center gap-3 text-slate-400 dark:text-white/30">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 opacity-50" />
                <span className="text-[13px] font-bold">إيصال الصرف</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Modal رفض الطلب */}
      {showRejectModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-200" onClick={() => setShowRejectModal(false)}>
          <div className="spatial-card p-5 w-[90vw] max-w-md flex flex-col gap-4 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-black text-slate-800 dark:text-white">رفض الطلب</span>
              <button onClick={() => setShowRejectModal(false)} className="w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/20 transition-all">
                <XCircle className="w-4 h-4" />
              </button>
            </div>
            <textarea placeholder="سبب الرفض..." className="spatial-input w-full min-h-[100px] resize-none rounded-[20px] p-4 text-sm font-bold" />
            <div className="flex gap-3">
              <button className="flex-1 h-11 rounded-[16px] font-bold text-[14px] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-600 dark:text-white/60 hover:bg-black/10 transition-all" onClick={() => setShowRejectModal(false)}>إلغاء</button>
              <button className="flex-1 h-11 rounded-[16px] font-bold text-[14px] bg-red-500 hover:bg-red-600 text-white transition-all">تأكيد الرفض</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
