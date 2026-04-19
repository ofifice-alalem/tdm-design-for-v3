import { useState } from 'react';
import { ArrowRight, Send, X } from 'lucide-react';
import { ProductRowShell } from '../compenntes/ui/ProductRowShell';
import { AppShell } from '../compenntes/layout';
import { SpatialCard, ModernInput, ModernSelect } from '../compenntes/ui/SpatialComponents';


const ALL_PRODUCTS = ['آيفون 15 برو ماكس', 'ماك بوك اير M3', 'سماعات ايربودز', 'كابل الشحن السريع', 'باور بانك 20000'];

export default function NewOrderPage() {
  const [products, setProducts] = useState([{ id: 1, qty: 0, name: '' }, { id: 2, qty: 0, name: '' }]);
  const addProduct = () => setProducts((p) => [...p, { id: Date.now(), qty: 0, name: '' }]);
  const removeProduct = (id: number) => setProducts((p) => p.filter((x) => x.id !== id));
  const updateQty = (id: number, qty: number) => setProducts((p) => p.map((x) => x.id === id ? { ...x, qty } : x));
  const updateName = (id: number, name: string) => setProducts((p) => p.map((x) => x.id === id ? { ...x, name } : x));

  const selectedNames = products.map((p) => p.name).filter(Boolean);
  const totalTypes = products.filter((p) => p.qty > 0).length;
  const totalQty = products.reduce((s, p) => s + p.qty, 0);
  return (
    <AppShell>
      <div className="flex flex-col gap-6 h-full">

        {/* ── Page Header ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Back Button */}
            <button className="flex items-center gap-2 px-4 h-11 rounded-[16px] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-all font-bold text-[14px]">
              <ArrowRight className="w-4 h-4" />
              عودة
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-white/30 font-bold">
              <span>طلب جديد</span>
              <span>/</span>
              <span className="text-slate-700 dark:text-white/80">إنشاء طلب بضاعة</span>
            </div>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0 pb-44 lg:pb-0">

          {/* ── Right Section: Products ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <SpatialCard
              title=""
              hideHeader
              className="flex-none lg:flex-1"
            >

              <div className="flex flex-col gap-4">
                {products.map((p, i) => (
                  <ProductRequestRow
                    key={p.id}
                    index={i + 1}
                    currentName={p.name}
                    availableOptions={ALL_PRODUCTS.filter((n) => n === p.name || !selectedNames.includes(n))}
                    onRemove={() => removeProduct(p.id)}
                    onQtyChange={(qty) => updateQty(p.id, qty)}
                    onNameChange={(name) => updateName(p.id, name)}
                  />
                ))}
              </div>

              <button
                onClick={addProduct}
                disabled={selectedNames.length >= ALL_PRODUCTS.length}
                className="mt-5 w-full h-13 py-3.5 rounded-[18px] bg-black/3 dark:bg-white/3 hover:bg-black/8 dark:hover:bg-white/8 border border-dashed border-black/15 dark:border-white/15 text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:pointer-events-none">
                <span className="text-lg">+</span> إضافة منتج آخر
              </button>
            </SpatialCard>
          </div>

          {/* ── Vertical Divider (Hidden on Mobile) ── */}
          <div className="hidden lg:flex flex-col items-center gap-0 py-4">
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent" />
          </div>

          {/* ── Left Section: Notes + Actions ── */}
          <div className="w-full lg:w-[360px] xl:w-[400px] shrink-0 flex flex-col gap-5 lg:sticky lg:top-0 lg:self-start">

            {/* Notes */}
            <SpatialCard title="ملاحظات" headerDot={false} className="flex-none lg:flex-1">
              <label className="text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-widest block mb-2">
                ملاحظات (اختياري)
              </label>
              <textarea
                placeholder="أضف أي ملاحظات أو تعليمات إضافية للطلب..."
                className="spatial-input w-full min-h-[120px] resize-none rounded-[20px] p-5 text-sm font-bold transition-all"
              />
            </SpatialCard>

            {/* Summary */}
            <SpatialCard title="ملخص الطلب">
              <div className="flex items-center justify-between py-2.5 border-b border-black/5 dark:border-white/5">
                <span className="text-[14px] font-bold text-slate-500 dark:text-white/50">عدد الأصناف</span>
                <span className="text-[15px] font-black text-slate-700 dark:text-white/80">{totalTypes}</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-[14px] font-bold text-slate-500 dark:text-white/50">إجمالي عدد البضاعة</span>
                <span className="text-[15px] font-black text-primary">{totalQty}</span>
              </div>
            </SpatialCard>

            {/* Action Buttons */}
            <div className="
              flex flex-col gap-3 mt-auto 
              max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:p-6 
              max-lg:pb-10
              max-lg:bg-white/95 max-lg:dark:bg-slate-900/95 max-lg:backdrop-blur-xl 
              max-lg:border-t max-lg:border-black/5 max-lg:dark:border-white/10 max-lg:z-[100]
              max-lg:rounded-[32px_32px_0px_0px]
            ">
              {/* Submit */}
              <button className="spatial-button w-full h-14 rounded-[22px] flex items-center justify-center gap-2 text-[16px]">
                <Send className="w-4 h-4" />
                ارسال الطلب
              </button>

              {/* Cancel (Hidden or visible based on mobile preference) */}
              <button className="
                w-full h-12 rounded-[18px] flex items-center justify-center gap-2 text-[15px] font-bold 
                bg-black/5 dark:bg-white/5 hover:bg-red-500/10 border border-black/10 dark:border-white/10 
                hover:border-red-500/30 text-slate-600 dark:text-white/60 hover:text-red-500 transition-all 
                max-lg:hidden
              ">
                <X className="w-4 h-4" />
                إلغاء الطلب
              </button>
            </div>

          </div>
        </div>
      </div>
    </AppShell>
  );
}

/* ── Single product request row ── */
function ProductRequestRow({ index, onRemove, onQtyChange, onNameChange, availableOptions, currentName }: {
  index: number;
  onRemove: () => void;
  onQtyChange: (qty: number) => void;
  onNameChange: (name: string) => void;
  availableOptions: string[];
  currentName: string;
}) {
  return (
    <ProductRowShell title={`المنتج ${index}`} onRemove={onRemove}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <ModernSelect
          label="المنتج"
          options={availableOptions}
          placeholder={`اختر المنتج ${index}...`}
          className="sm:col-span-2"
          onSelect={onNameChange}
        />
        <ModernInput label="الكمية" type="number" placeholder="0"
          onChange={(v) => onQtyChange(Number(v) || 0)} />
      </div>
    </ProductRowShell>
  );
}
