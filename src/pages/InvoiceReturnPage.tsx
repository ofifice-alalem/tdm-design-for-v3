import { useState } from 'react';
import { ArrowRight, X, RotateCcw } from 'lucide-react';
import { AppShell } from '../compenntes/layout';
import { SpatialCard, ModernInput, ModernSelect } from '../compenntes/ui/SpatialComponents';

function fmt(n: number) {
  return n % 1 === 0
    ? n.toLocaleString('en-US')
    : n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const INVOICES = [
  {
    id: '#SI-20260316-00139',
    client: 'شركة طريق المطار احمد علي',
    total: 3150,
    products: [
      { name: 'اكواب المتفوقون عبوة 2000', original: 30, available: 30, price: 105 },
      { name: 'كابل الشحن السريع', original: 10, available: 8, price: 25 },
    ],
  },
  {
    id: '#SI-20260310-00121',
    client: 'مؤسسة النور للتجارة',
    total: 1800,
    products: [
      { name: 'سماعات ايربودز', original: 5, available: 5, price: 320 },
      { name: 'باور بانك 20000', original: 2, available: 2, price: 85 },
    ],
  },
];

interface ReturnItem { name: string; original: number; available: number; price: number; returnQty: number; }

export default function InvoiceReturnPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<typeof INVOICES[0] | null>(null);
  const [items, setItems] = useState<ReturnItem[]>([]);
  const [notes, setNotes] = useState('');

  function handleSelectInvoice(id: string) {
    const inv = INVOICES.find((x) => x.id === id) ?? null;
    setSelectedInvoice(inv);
    setItems(inv ? inv.products.map((p) => ({ ...p, returnQty: 0 })) : []);
  }

  function setQty(name: string, qty: number) {
    setItems((p) => p.map((x) => x.name === name ? { ...x, returnQty: Math.min(qty, x.available) } : x));
  }

  const totalProducts = items.filter((x) => x.returnQty > 0).length;
  const totalAmount = items.reduce((s, x) => s + x.returnQty * x.price, 0);

  return (
    <AppShell>
      <div className="flex flex-col gap-6 h-full">

        {/* Header */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 h-11 rounded-[16px] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-all font-bold text-[14px]">
            <ArrowRight className="w-4 h-4" />
            عودة
          </button>
          <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-white/30 font-bold">
            <span>المخزن</span>
            <span>/</span>
            <span className="text-slate-700 dark:text-white/80">اختيار الفاتورة</span>
          </div>
        </div>

        {/* Main */}
        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0 pb-44 lg:pb-0">

          {/* Left: Invoice + Products */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">

            {/* Invoice Selector */}
            <SpatialCard title="اختر الفاتورة المراد إرجاع بضاعتها">
              <ModernSelect
                label=""
                options={INVOICES.map((inv) => ({
                  label: inv.id,
                  meta: fmt(inv.total) + ' د',
                  badge: inv.client,
                }))}
                placeholder="اختر فاتورة..."
                onSelect={handleSelectInvoice}
              />

              {selectedInvoice && (
                <div className="mt-4 flex items-center justify-between px-5 py-4 rounded-[18px] bg-primary/8 dark:bg-primary/10 border border-primary/20">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] font-black text-primary">{selectedInvoice.id}</span>
                    <span className="text-[13px] font-bold text-slate-600 dark:text-white/60">{selectedInvoice.client}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-slate-800 dark:text-white">{fmt(selectedInvoice.total)}</span>
                    <span className="text-xs font-bold text-slate-400 dark:text-white/40">دينار</span>
                  </div>
                </div>
              )}
            </SpatialCard>

            {/* Products */}
            {selectedInvoice && (
              <SpatialCard title="المنتجات المتاحة للإرجاع">
                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <div key={item.name} className="spatial-card p-4 flex flex-col gap-3">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start lg:justify-between justify-center gap-3">
                          <span className="text-[15px] font-black text-slate-800 dark:text-white lg:text-right text-center">{item.name}</span>
                          <div className="hidden lg:flex items-center gap-3 shrink-0">
                            <div className="flex items-center gap-1">
                              <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">الأصلية:</span>
                              <span className="text-[14px] font-black text-slate-700 dark:text-white/80">{item.original}</span>
                            </div>
                            <div className="w-px h-4 bg-black/10 dark:bg-white/10" />
                            <div className="flex items-center gap-1">
                              <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">متاح:</span>
                              <span className="text-[14px] font-black text-emerald-500">{item.available}</span>
                            </div>
                          </div>
                        </div>
                        <div className="h-px w-[70%] mx-auto bg-black/10 dark:bg-white/10 lg:hidden" />
                        <div className="flex items-center lg:hidden justify-center gap-3">
                          <div className="flex items-center gap-1">
                            <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">الأصلية:</span>
                            <span className="text-[14px] font-black text-slate-700 dark:text-white/80">{item.original}</span>
                          </div>
                          <div className="w-px h-4 bg-black/10 dark:bg-white/10" />
                          <div className="flex items-center gap-1">
                            <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">متاح:</span>
                            <span className="text-[14px] font-black text-emerald-500">{item.available}</span>
                          </div>
                        </div>
                        <div className="h-px w-[70%] mx-auto bg-black/10 dark:bg-white/10 lg:hidden" />
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                        <ModernInput
                          label="الكمية المرجعة"
                          type="number"
                          placeholder="0"
                          value={item.returnQty > 0 ? String(item.returnQty) : ''}
                          onChange={(v) => setQty(item.name, Number(v) || 0)}
                        />
                        <ModernInput
                          label="السعر"
                          type="text"
                          placeholder="0.00"
                          value={fmt(item.price)}
                          className="opacity-60 pointer-events-none"
                        />
                        <ModernInput
                          label="الإجمالي"
                          type="text"
                          placeholder="0.00"
                          value={item.returnQty > 0 ? fmt(item.returnQty * item.price) : ''}
                          className="col-span-2 lg:col-span-1 opacity-60 pointer-events-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SpatialCard>
            )}
          </div>

          {/* Divider */}
          <div className="hidden lg:flex flex-col items-center py-4">
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent" />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[360px] xl:w-[400px] shrink-0 flex flex-col gap-5 lg:sticky lg:top-0 lg:self-start">

            <SpatialCard title="ملخص الإرجاع">
              <div className="flex items-center justify-between py-2.5 border-b border-black/5 dark:border-white/5">
                <span className="text-[14px] font-bold text-slate-500 dark:text-white/50">عدد الأصناف</span>
                <span className="text-[15px] font-black text-slate-700 dark:text-white/80">{totalProducts}</span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-b border-black/5 dark:border-white/5">
                <span className="text-[14px] font-bold text-slate-500 dark:text-white/50">عدد المنتجات</span>
                <span className="text-[15px] font-black text-slate-700 dark:text-white/80">{items.reduce((s, x) => s + x.returnQty, 0)}</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-[14px] font-bold text-slate-500 dark:text-white/50">المبلغ الإجمالي</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[15px] font-black text-primary">{fmt(totalAmount)}</span>
                  <span className="text-[13px] font-bold text-slate-400 dark:text-white/30">دينار</span>
                </div>
              </div>
            </SpatialCard>

            <SpatialCard title="ملاحظات" headerDot={false}>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="سبب الإرجاع أو أي تفاصيل إضافية..."
                className="spatial-input w-full min-h-[120px] resize-none rounded-[20px] p-5 text-sm font-bold transition-all"
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
                disabled={totalProducts === 0}
                className="spatial-button w-full h-14 rounded-[22px] flex items-center justify-center gap-2 text-[16px] disabled:opacity-40 disabled:pointer-events-none"
              >
                <RotateCcw className="w-4 h-4" />
                الإجراءات
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
    </AppShell>
  );
}
