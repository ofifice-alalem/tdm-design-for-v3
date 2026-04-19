import { useState } from 'react';
import { ArrowRight, Wallet, Send } from 'lucide-react';

import { SpatialCard, ModernInput } from '../compenntes/ui/SpatialComponents';

const AVAILABLE_BALANCE = 7423.76;

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function WithdrawPage() {
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const paid = Number(amount) || 0;
  const remaining = Math.max(0, AVAILABLE_BALANCE - paid);

  return (

      <div className="flex flex-col gap-6 h-full">

        {/* Header */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 h-11 rounded-[16px] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-all font-bold text-[14px]">
            <ArrowRight className="w-4 h-4" />
            عودة
          </button>
          <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-white/30 font-bold">
            <span>المالية</span>
            <span>/</span>
            <span className="text-slate-700 dark:text-white/80">طلب سحب جديد</span>
          </div>
        </div>

        {/* Main */}
        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0 pb-44 lg:pb-0">

          {/* Form */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">

            {/* الرصيد المتاح */}
            <SpatialCard title="اسحب أرباحك المتاحة" icon={<Wallet className="w-5 h-5" />}>
              <div className="flex flex-col items-center gap-1 py-4">
                <span className="text-[13px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">الرصيد المتاح للسحب</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-[42px] font-black text-primary leading-none">{fmt(AVAILABLE_BALANCE)}</span>
                  <span className="text-[16px] font-bold text-slate-400 dark:text-white/40">دينار</span>
                </div>
              </div>
            </SpatialCard>

            {/* المبلغ والباقي */}
            <SpatialCard title="" hideHeader>
              <div className="flex flex-col lg:flex-row gap-4 items-start">
                <div className="flex-1 w-full flex flex-col gap-2">
                  <ModernInput
                    label="المبلغ المطلوب *"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(v) => {
                      const n = Number(v) || 0;
                      setAmount(n > AVAILABLE_BALANCE ? String(AVAILABLE_BALANCE) : v);
                    }}
                  />
                  <span className="text-[12px] font-bold text-slate-400 dark:text-white/40 px-1">
                    الحد الأقصى: {fmt(AVAILABLE_BALANCE)} دينار
                  </span>
                </div>

                <div className="spatial-card flex-1 w-full px-6 py-4 flex flex-col gap-1">
                  <div className="flex items-center justify-between py-3 border-b border-black/10 dark:border-white/10">
                    <span className="text-[14px] font-bold text-slate-500 dark:text-white/50">الرصيد المتاح</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[18px] font-black text-primary" style={{ WebkitTextStroke: '0.4px white', paintOrder: 'stroke fill' }}>
                        {fmt(AVAILABLE_BALANCE)}
                      </span>
                      <span className="text-[13px] font-bold text-slate-400 dark:text-white/30">د.ل</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-[14px] font-bold text-slate-500 dark:text-white/50">باقي الرصيد</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className={`text-[18px] font-black ${remaining > 0 ? 'text-orange-500' : 'text-emerald-500'}`}>
                        {fmt(remaining)}
                      </span>
                      <span className="text-[13px] font-bold text-slate-400 dark:text-white/30">د.ل</span>
                    </div>
                  </div>
                </div>
              </div>
            </SpatialCard>

          </div>

          {/* Divider */}
          <div className="hidden lg:flex flex-col items-center py-4">
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent" />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[360px] xl:w-[400px] shrink-0 flex flex-col gap-5 lg:sticky lg:top-0 lg:self-start">

            <SpatialCard title="ملاحظات" headerDot={false}>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="أضف أي ملاحظات..."
                className="spatial-input w-full min-h-[200px] resize-none rounded-[20px] p-5 text-sm font-bold transition-all"
              />
            </SpatialCard>

            <div className="
              flex flex-col gap-3 mt-auto
              max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:p-6
              max-lg:pb-10
              max-lg:bg-white/95 max-lg:dark:bg-slate-900/95 max-lg:backdrop-blur-xl
              max-lg:border-t max-lg:border-black/5 max-lg:dark:border-white/10 max-lg:z-[100]
              max-lg:rounded-[32px_32px_0px_0px]
            ">
              <button
                disabled={!amount || paid <= 0}
                className="spatial-button w-full h-14 rounded-[22px] flex items-center justify-center gap-2 text-[16px] disabled:opacity-40 disabled:pointer-events-none"
              >
                <Send className="w-4 h-4" />
                انشاء طلب السحب
              </button>
            </div>

          </div>
        </div>
      </div>

  );
}
