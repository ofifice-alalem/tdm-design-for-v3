import { useState } from 'react';
import { Trash2, Plus, FileText, ArrowRight, ReceiptText } from 'lucide-react';
import { AppShell } from '../compenntes/layout';
import { SpatialCard, ModernInput, ModernSelect } from '../compenntes/ui/SpatialComponents';

export default function CreateInvoicePage() {
  const [products, setProducts] = useState([
    { id: 1 },
    { id: 2 },
  ]);

  const addProduct = () => setProducts((p) => [...p, { id: Date.now() }]);
  const removeProduct = (id: number) => setProducts((p) => p.filter((x) => x.id !== id));
  return (
    <AppShell>
      <div className="flex flex-col gap-6 h-full">
        
        {/* ── Page Header ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Back Button */}
            <button className="flex items-center gap-2 px-4 h-11 rounded-[16px] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/8 dark:border-white/8 text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-all font-bold text-[14px]">
              <ArrowRight className="w-4 h-4" />
              عودة
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-white/30 font-bold">
              <span>الفواتير</span>
              <span>/</span>
              <span className="text-slate-700 dark:text-white/80">إنشاء فاتورة بيع</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start w-full h-full min-h-0 pb-32 lg:pb-0">

        {/* Store Selector - mobile only */}
        <div className="lg:hidden w-full">
          <ModernSelect
            label="اختيار المتجر"
            options={['المتجر الرئيسي - بغداد', 'فرع الكرادة', 'فرع المنصور', 'فرع الزعفرانية']}
          />
        </div>

        {/* ── Main column: products ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-6 w-full">

          <SpatialCard title="" hideHeader>
            <div className="flex flex-col gap-4">

              {products.map((p, i) => (
                <ProductRow
                  key={p.id}
                  title={`المنتج ${i + 1}`}
                  onRemove={() => removeProduct(p.id)}
                />
              ))}

              <button
                onClick={addProduct}
                className="w-full h-14 rounded-[20px] bg-black/3 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 border border-dashed border-black/15 dark:border-white/10 text-slate-800 dark:text-white font-bold text-base flex items-center justify-center gap-2 transition-all mt-2">
                <Plus className="w-5 h-5" />
                إضافة سطر منتج جديد
              </button>

            </div>
          </SpatialCard>
        </div>

        {/* ── Sidebar column: store + summary + notes + submit ── */}
        <aside className="w-full lg:w-[400px] xl:w-[440px] shrink-0 flex flex-col gap-5">

          {/* Store Selector - desktop only */}
          <div className="hidden lg:block">
            <ModernSelect
              label="اختيار المتجر"
              options={['المتجر الرئيسي - بغداد', 'فرع الكرادة', 'فرع المنصور', 'فرع الزعفرانية']}
            />
          </div>

          {/* Detailed Notes */}
          <SpatialCard title="ملاحظات تفصيلية" icon={<FileText className="w-5 h-5" />}>
            <textarea
              className="spatial-input w-full min-h-[100px] lg:min-h-[120px] resize-none rounded-[20px] p-5 text-sm font-bold"
              placeholder="أضف أي تفاصيل أو تعليمات شحن أو ملاحظات..."
            />
          </SpatialCard>

          {/* Summary - mobile only, shown in page flow */}
          <div className="lg:hidden bg-black/5 dark:bg-white/5 rounded-[24px] border border-black/5 dark:border-white/5 p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,102,255,0.5)]" />
              <h3 className="text-[15px] font-black text-slate-800 dark:text-white">ملخص الفاتورة</h3>
            </div>
            <SummaryRow label="عدد البضاعة" value="0" unit="" />
            <SummaryRow label="السعر الكلي" value="0.00" unit="دينار" />
            <SummaryRow label="تخفيض المنتجات" value="0.00" unit="دينار" isDiscount />
            <SummaryRow label="تخفيض الفاتورة" value="0.00" unit="دينار" isDiscount />
          </div>

          {/* Invoice Summary & Submit - Sticky on Mobile */}
          <div className="
            flex flex-col gap-4 
            max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:z-[100]
            max-lg:bg-white/95 max-lg:dark:bg-slate-900/95
            max-lg:px-5 max-lg:py-4
            max-lg:shadow-[0_-1px_0_rgba(0,0,0,0.06),0_-20px_40px_rgba(0,0,0,0.08)]
            max-lg:backdrop-blur-xl
            max-lg:rounded-t-[24px]
            max-lg:border-t max-lg:border-black/8 max-lg:dark:border-white/8
          ">
            {/* Mobile: single row — total + create button */}
            <div className="lg:hidden flex items-center justify-between gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">المجموع النهائي</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-primary">0.00</span>
                  <span className="text-xs font-bold text-slate-400 dark:text-white/40">دينار</span>
                </div>
              </div>
              <button className="spatial-button h-12 px-6 rounded-[20px] flex items-center gap-2.5 text-[15px] font-black shadow-[0_6px_24px_rgba(0,102,255,0.45)]">
                <ReceiptText className="w-4 h-4" />
                إنشاء الفاتورة
              </button>
            </div>

            {/* Desktop: full summary card + button */}
            <div className="hidden lg:block bg-black/5 dark:bg-white/5 backdrop-blur-xl rounded-[24px] border border-black/5 dark:border-white/5 p-7 transition-all">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,102,255,0.5)]" />
                <h3 className="text-[15px] font-black text-slate-800 dark:text-white tracking-wide">ملخص الفاتورة</h3>
              </div>
              <div className="flex flex-col gap-1">
                <SummaryRow label="عدد البضاعة" value="0" unit="" />
                <SummaryRow label="السعر الكلي" value="0.00" unit="دينار" />
                <SummaryRow label="تخفيض المنتجات" value="0.00" unit="دينار" isDiscount />
                <SummaryRow label="تخفيض الفاتورة" value="0.00" unit="دينار" isDiscount />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[15px] font-black text-slate-700 dark:text-white/80">المجموع النهائي</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-primary">0.00</span>
                    <span className="text-base font-bold text-slate-400 dark:text-white/40">دينار</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="hidden lg:flex spatial-button w-full h-16 rounded-[24px] items-center justify-center gap-2.5 text-lg shadow-[0_10px_30px_rgba(0,102,255,0.4)]">
              <ReceiptText className="w-5 h-5" />
              إنشاء الفاتورة
            </button>
          </div>

        </aside>
      </div>
    </div>
  </AppShell>
  );
}

/* ── Product row ── */
const PRODUCTS = [
  { name: 'آيفون 15 برو ماكس', price: 1850 },
  { name: 'ماك بوك اير M3', price: 2100 },
  { name: 'سماعات ايربودز', price: 320 },
  { name: 'كابل الشحن السريع', price: 25 },
  { name: 'مقابس باور بانك', price: 85 },
];

function ProductRow({ title, onRemove }: { title: string; onRemove: () => void }) {
  const [unitPrice, setUnitPrice] = useState('');

  function handleSelect(name: string) {
    const found = PRODUCTS.find((p) => p.name === name);
    if (found) {
      const price = found.price;
      setUnitPrice(price % 1 === 0
        ? price.toLocaleString('en-US')
        : price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      );
    }
  }

  return (
    <div className="bg-black/5 dark:bg-black/20 p-4 lg:p-6 rounded-[24px] border border-black/5 dark:border-white/5 flex flex-col gap-3 lg:gap-4 transition-colors duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-slate-800 dark:text-white font-bold text-base">{title}</h3>
        <button
          onClick={onRemove}
          className="w-9 h-9 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center border border-red-500/30">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <ModernSelect
        label="اسم الصنف"
        options={PRODUCTS.map((p) => ({
    label: p.name,
    meta: p.price % 1 === 0
      ? p.price.toLocaleString('en-US') + ' د'
      : p.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' د'
  }))}
        onSelect={handleSelect}
      />
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
        <ModernInput label="الكمية" type="number" placeholder="0" />
        <ModernInput label="هدية" type="number" placeholder="0" />
        <ModernInput label="سعر الوحدة" type="text" placeholder="0.00" value={unitPrice} className="opacity-70 pointer-events-none" />
        <ModernInput label="الإجمالي" type="number" placeholder="0.00" className="col-span-3 lg:col-span-1 opacity-60 pointer-events-none" />
      </div>
    </div>
  );
}

/* ── Summary row ── */
function SummaryRow({ label, value, unit, isDiscount = false }: {
  label: string; value: string; unit: string; isDiscount?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-black/5 dark:border-white/5 last:border-0">
      <span className="text-[14px] font-bold text-slate-500 dark:text-white/50">{label}</span>
      <div className="flex items-baseline gap-1.5">
        <span className={`text-[15px] font-black ${isDiscount ? 'text-red-500' : 'text-slate-700 dark:text-white/80'}`}>
          {isDiscount && value !== '0' && value !== '0.00' ? `- ${value}` : value}
        </span>
        {unit && <span className="text-[13px] font-bold text-slate-400 dark:text-white/30">{unit}</span>}
      </div>
    </div>
  );
}
