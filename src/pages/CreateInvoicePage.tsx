import { useState, useMemo } from 'react';
import { Plus, FileText, ArrowRight, ReceiptText } from 'lucide-react';
import { ProductRowShell } from '../compenntes/ui/ProductRowShell';
import { AppShell } from '../compenntes/layout';
import { SpatialCard, ModernInput, ModernSelect } from '../compenntes/ui/SpatialComponents';

const PRODUCTS = [
  { name: 'آيفون 15 برو ماكس', price: 1850, gift: null },
  { name: 'ماك بوك اير M3', price: 2100, gift: null },
  { name: 'سماعات ايربودز', price: 320, gift: { buyQty: 5, freeQty: 1 } },
  { name: 'كابل الشحن السريع', price: 25, gift: { buyQty: 10, freeQty: 1 } },
  { name: 'مقابس باور بانك', price: 85, gift: null },
];

function fmt(n: number) {
  return n % 1 === 0
    ? n.toLocaleString('en-US')
    : n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

interface ProductItem { id: number; name: string; price: number; qty: number; gift: number; giftRule: { buyQty: number; freeQty: number } | null; }

export default function CreateInvoicePage() {
  const [items, setItems] = useState<ProductItem[]>([
    { id: 1, name: '', price: 0, qty: 0, gift: 0, giftRule: null },
    { id: 2, name: '', price: 0, qty: 0, gift: 0, giftRule: null },
  ]);
  const discountProducts = useMemo(() => items.reduce((s, x) => {
    if (!x.giftRule) return s;
    const gifts = Math.floor(x.qty / x.giftRule.buyQty) * x.giftRule.freeQty;
    return s + x.price * gifts;
  }, 0), [items]);
  const [discountInvoice, setDiscountInvoice] = useState(0);

  const addItem = () => setItems((p) => [...p, { id: Date.now(), name: '', price: 0, qty: 0, gift: 0, giftRule: null }]);
  const removeItem = (id: number) => setItems((p) => p.filter((x) => x.id !== id));
  const updateItem = (id: number, patch: Partial<ProductItem>) =>
    setItems((p) => p.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const selectedNames = items.map((x) => x.name).filter(Boolean);

  const totalQty = useMemo(() => items.reduce((s, x) => {
    const gifts = x.giftRule ? Math.floor(x.qty / x.giftRule.buyQty) * x.giftRule.freeQty : 0;
    return s + x.qty + gifts;
  }, 0), [items]);
  const totalGift = useMemo(() => items.reduce((s, x) => {
    if (!x.giftRule) return s;
    return s + Math.floor(x.qty / x.giftRule.buyQty) * x.giftRule.freeQty;
  }, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((s, x) => {
    const gifts = x.giftRule ? Math.floor(x.qty / x.giftRule.buyQty) * x.giftRule.freeQty : 0;
    return s + x.price * (x.qty + gifts);
  }, 0), [items]);
  const finalTotal = useMemo(() => Math.max(0, totalPrice - discountProducts - discountInvoice), [totalPrice, discountProducts, discountInvoice]);

  return (
    <AppShell>
      <div className="flex flex-col gap-6 h-full">

        {/* ── Page Header ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 h-11 rounded-[16px] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-all font-bold text-[14px]">
              <ArrowRight className="w-4 h-4" />
              عودة
            </button>
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
            <ModernSelect label="اختيار المتجر" options={['المتجر الرئيسي - طرابلس', 'فرع بنغازي', 'فرع مصراتة']} />
          </div>

          {/* ── Main column ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-6 w-full">
            <SpatialCard title="" hideHeader>
              <div className="flex flex-col gap-4">
                {items.map((item, i) => (
                  <ProductRow
                    key={item.id}
                    title={`المنتج ${i + 1}`}
                    item={item}
                    availableOptions={PRODUCTS.filter((p) => p.name === item.name || !selectedNames.includes(p.name))}
                    onRemove={() => removeItem(item.id)}
                    onChange={(patch) => updateItem(item.id, patch)}
                  />
                ))}
                <button
                  onClick={addItem}
                  disabled={items.filter(x => x.name).length >= PRODUCTS.length}
                  className="w-full h-14 rounded-[20px] bg-black/3 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 border border-dashed border-black/15 dark:border-white/10 text-slate-800 dark:text-white font-bold text-base flex items-center justify-center gap-2 transition-all mt-2 disabled:opacity-40 disabled:pointer-events-none">
                  <Plus className="w-5 h-5" />
                  إضافة سطر منتج جديد
                </button>
              </div>
            </SpatialCard>
          </div>

          {/* ── Sidebar column ── */}
          <aside className="w-full lg:w-[400px] xl:w-[440px] shrink-0 flex flex-col gap-5 lg:sticky lg:top-0 lg:self-start">

            <div className="hidden lg:block">
              <ModernSelect label="اختيار المتجر" options={['المتجر الرئيسي - طرابلس', 'فرع بنغازي', 'فرع مصراتة']} />
            </div>

            <SpatialCard title="ملاحظات تفصيلية" icon={<FileText className="w-5 h-5" />}>
              <textarea
                className="spatial-input w-full min-h-[100px] lg:min-h-[120px] resize-none rounded-[20px] p-5 text-sm font-bold"
                placeholder="أضف أي تفاصيل أو تعليمات شحن أو ملاحظات..."
              />
            </SpatialCard>

            {/* Summary - mobile only */}
            <SpatialCard title="ملخص الفاتورة" className="lg:hidden">
              <SummaryRow label="عدد البضاعة" value={fmt(totalQty)} unit="" />
              <SummaryRow label="السعر الكلي" value={fmt(totalPrice)} unit="دينار" />
              <SummaryRow label="تخفيض المنتجات" value={fmt(discountProducts)} unit="دينار" isDiscount />
              <SummaryRow label="تخفيض الفاتورة" value={fmt(discountInvoice)} unit="دينار" isDiscount />
            </SpatialCard>

            {/* Sticky bottom */}
            <div className="
              flex flex-col gap-4
              max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:z-[100]
              max-lg:bg-white/95 max-lg:dark:bg-slate-900/95
              max-lg:px-5 max-lg:py-4
              max-lg:backdrop-blur-xl
              max-lg:rounded-t-[24px]
              max-lg:border-t max-lg:border-black/10 max-lg:dark:border-white/10
            ">
              <div className="lg:hidden flex items-center justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">المجموع النهائي</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-primary">{fmt(finalTotal)}</span>
                    <span className="text-xs font-bold text-slate-400 dark:text-white/40">دينار</span>
                  </div>
                </div>
                <button className="spatial-button h-12 px-6 rounded-[20px] flex items-center gap-2.5 text-[15px] font-black">
                  <ReceiptText className="w-4 h-4" />
                  إنشاء الفاتورة
                </button>
              </div>

              {/* Desktop summary */}
              <SpatialCard title="ملخص الفاتورة" className="hidden lg:block">
                <div className="flex flex-col gap-1">
                  <SummaryRow label="عدد البضاعة" value={fmt(totalQty)} unit="" />
                  <SummaryRow label="السعر الكلي" value={fmt(totalPrice)} unit="دينار" />
                  <SummaryRow label="تخفيض المنتجات" value={fmt(discountProducts)} unit="دينار" isDiscount />
                  <SummaryRow label="تخفيض الفاتورة" value={fmt(discountInvoice)} unit="دينار" isDiscount
                    editable onEdit={(v) => setDiscountInvoice(Number(v) || 0)} />
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[15px] font-black text-slate-700 dark:text-white/80">المجموع النهائي</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-primary">{fmt(finalTotal)}</span>
                      <span className="text-base font-bold text-slate-400 dark:text-white/40">دينار</span>
                    </div>
                  </div>
                </div>
              </SpatialCard>

              <button className="hidden lg:flex spatial-button w-full h-16 rounded-[24px] items-center justify-center gap-2.5 text-lg">
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
function ProductRow({ title, item, availableOptions, onRemove, onChange }: {
  title: string;
  item: ProductItem;
  availableOptions: typeof PRODUCTS;
  onRemove: () => void;
  onChange: (patch: Partial<ProductItem>) => void;
}) {
  const total = item.price * item.qty;

  function handleSelect(name: string) {
    const found = PRODUCTS.find((p) => p.name === name);
    if (found) onChange({ name: found.name, price: found.price, giftRule: found.gift, gift: 0 });
  }

  const autoGift = item.giftRule ? Math.floor(item.qty / item.giftRule.buyQty) * item.giftRule.freeQty : 0;

  return (
    <ProductRowShell title={title} onRemove={onRemove}>
      <ModernSelect
        label="اسم الصنف"
        options={availableOptions.map((p) => ({
          label: p.name,
          meta: p.price % 1 === 0
            ? p.price.toLocaleString('en-US') + ' د'
            : p.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' د',
          badge: p.gift ? '🎁' : undefined,
        }))}
        onSelect={handleSelect}
      />
      {item.giftRule && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-[14px] bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-base">🎁</span>
          <p className="text-[13px] font-black text-emerald-600 dark:text-emerald-400">
            اشترِ {item.giftRule.buyQty} قطعة واحصل على {item.giftRule.freeQty} مجاناً
            {autoGift > 0 && <span className="mr-2 text-emerald-700 dark:text-emerald-300">— ستحصل على {autoGift} هدية الآن</span>}
          </p>
        </div>
      )}
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4">
        <ModernInput label="الكمية" type="number" placeholder="0"
          value={item.qty > 0 ? String(item.qty) : ''}
          onChange={(v) => onChange({ qty: Number(v) || 0 })} />
        <ModernInput label="هدية" type="number" placeholder="0"
          value={autoGift > 0 ? String(autoGift) : ''}
          className="opacity-70 pointer-events-none" />
        <ModernInput label="سعر الوحدة" type="text" placeholder="0.00"
          value={item.price > 0 ? fmt(item.price) : ''}
          className="opacity-70 pointer-events-none" />
        <ModernInput label="الإجمالي" type="text" placeholder="0.00"
          value={total > 0 ? fmt(total) : ''}
          className="col-span-3 lg:col-span-2 opacity-60 pointer-events-none" />
      </div>
    </ProductRowShell>
  );
}

/* ── Summary row ── */
function SummaryRow({ label, value, unit, isDiscount = false, editable = false, onEdit }: {
  label: string; value: string; unit: string; isDiscount?: boolean; editable?: boolean; onEdit?: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-black/5 dark:border-white/5 last:border-0">
      <span className="text-[14px] font-bold text-slate-500 dark:text-white/50">{label}</span>
      <div className="flex items-baseline gap-1.5">
        {editable ? (
          <input
            type="number"
            defaultValue={0}
            onChange={(e) => onEdit?.(e.target.value)}
            className="w-20 text-left bg-transparent outline-none text-[15px] font-black text-red-500 border-b border-red-500/30 focus:border-red-500"
          />
        ) : (
          <span className={`text-[15px] font-black ${isDiscount ? 'text-red-500' : 'text-slate-700 dark:text-white/80'}`}>
            {isDiscount && value !== '0' && value !== '0.00' ? `- ${value}` : value}
          </span>
        )}
        {unit && <span className="text-[13px] font-bold text-slate-400 dark:text-white/30">{unit}</span>}
      </div>
    </div>
  );
}
