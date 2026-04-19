import { useState } from 'react';
import { ArrowRight, X, ReceiptText, Banknote, Building2, FileCheck } from 'lucide-react';

import { SpatialCard, ModernInput, ModernSelect } from '../compenntes/ui/SpatialComponents';

type PaymentMethod = 'نقدي' | 'حوالة' | 'شيك';

const PAYMENT_METHODS: { value: PaymentMethod; icon: React.ReactNode }[] = [
  { value: 'نقدي',   icon: <Banknote className="w-5 h-5" /> },
  { value: 'حوالة',  icon: <Building2 className="w-5 h-5" /> },
  { value: 'شيك',    icon: <FileCheck className="w-5 h-5" /> },
];

const STORES: { name: string; debt: number }[] = [
  { name: 'المتجر الرئيسي - طرابلس', debt: 3150 },
  { name: 'فرع بنغازي', debt: 0 },
  { name: 'فرع مصراتة', debt: 820.5 },
];

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function CreateReceiptPage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedStore, setSelectedStore] = useState<typeof STORES[0] | null>(null);

  function handleStoreSelect(name: string) {
    setSelectedStore(STORES.find((s) => s.name === name) ?? null);
    setAmount('');
  }

  const paid = Number(amount) || 0;
  const remaining = selectedStore ? Math.max(0, selectedStore.debt - paid) : null;
  const overpaid = selectedStore ? Math.max(0, paid - selectedStore.debt) : null;

  return (

      <div className="flex flex-col gap-6 h-full">

        {/* Header */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 h-11 rounded-[16px] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-all font-bold text-[14px]">
            <ArrowRight className="w-4 h-4" />
            عودة
          </button>
          <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-white/30 font-bold">
            <span>الإيصالات</span>
            <span>/</span>
            <span className="text-slate-700 dark:text-white/80">إنشاء إيصال قبض</span>
          </div>
        </div>

        {/* Main */}
        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0 pb-44 lg:pb-0">

          {/* Left: Form */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">

            <SpatialCard title="" hideHeader>
              <div className="flex flex-col gap-5">
                <ModernSelect
                  label="المتجر"
                  options={STORES.map((s) => ({
                    label: s.name,
                    meta: s.debt > 0 ? fmt(s.debt) + ' د' : 'لا يوجد دين',
                  }))}
                  placeholder="اختر المتجر..."
                  onSelect={handleStoreSelect}
                />

                {/* المبلغ والدين */}
                <div className="flex flex-col lg:flex-row gap-4 items-start">
                  <div className="flex-1 w-full">
                    <ModernInput
                      label="المبلغ المسدد"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(v) => {
                        if (selectedStore) {
                          const n = Number(v) || 0;
                          setAmount(n > selectedStore.debt ? String(selectedStore.debt) : v);
                        } else {
                          setAmount(v);
                        }
                      }}
                    />
                  </div>

                  {selectedStore && (
                    <div className="spatial-card flex-1 w-full px-6 py-4 flex flex-col gap-1">
                      <div className="flex items-center justify-between py-3 border-b border-black/8 dark:border-white/8">
                        <span className="text-[14px] font-bold text-slate-500 dark:text-white/50">الدين الحالي</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className={`text-[18px] font-black ${
                            selectedStore.debt > 0 ? 'text-red-500' : 'text-emerald-500'
                          }`} style={{ WebkitTextStroke: '0.2px white', paintOrder: 'stroke fill' }}>{fmt(selectedStore.debt)}</span>
                          <span className="text-[13px] font-bold text-slate-400 dark:text-white/30">د.ل</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-[14px] font-bold text-slate-500 dark:text-white/50">باقي الدين</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className={`text-[18px] font-black ${
                            (remaining ?? selectedStore.debt) > 0 ? 'text-orange-500' : 'text-emerald-500'
                          }`}>{fmt(remaining ?? selectedStore.debt)}</span>
                          <span className="text-[13px] font-bold text-slate-400 dark:text-white/30">د.ل</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </SpatialCard>

            <SpatialCard title="" hideHeader>
              <div className="grid grid-cols-3 gap-3">
                {PAYMENT_METHODS.map(({ value, icon }) => (
                  <button
                    key={value}
                    onClick={() => setPaymentMethod(value)}
                    className={`
                      flex flex-col items-center justify-center gap-2 h-24 rounded-[20px] border font-bold text-[15px] transition-all
                      ${paymentMethod === value
                        ? 'bg-primary border-primary text-white'
                        : 'spatial-input text-slate-600 dark:text-white/60 hover:border-primary/40 hover:text-primary'
                      }
                    `}
                  >
                    {icon}
                    {value}
                  </button>
                ))}
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

            {/* Actions */}
            <div className="
              flex flex-col gap-3 mt-auto
              max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:p-6
              max-lg:pb-10
              max-lg:bg-white/95 max-lg:dark:bg-slate-900/95 max-lg:backdrop-blur-xl
              max-lg:border-t max-lg:border-black/5 max-lg:dark:border-white/10 max-lg:z-[100]
              max-lg:rounded-[32px_32px_0px_0px]
            ">
              <button
                disabled={!paymentMethod || !amount}
                className="spatial-button w-full h-14 rounded-[22px] flex items-center justify-center gap-2 text-[16px] disabled:opacity-40 disabled:pointer-events-none"
              >
                <ReceiptText className="w-4 h-4" />
                انشاء الايصال
              </button>
              <button className="
                w-full h-12 rounded-[18px] flex items-center justify-center gap-2 text-[15px] font-bold
                bg-black/5 dark:bg-white/5 hover:bg-red-500/10 border border-black/10 dark:border-white/10
                hover:border-red-500/30 text-slate-600 dark:text-white/60 hover:text-red-500 transition-all
                max-lg:hidden
              ">
                <X className="w-4 h-4" />
                إلغاء
              </button>
            </div>

          </div>
        </div>
      </div>

  );
}
