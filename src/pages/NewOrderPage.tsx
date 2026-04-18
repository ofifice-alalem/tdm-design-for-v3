import { useState } from 'react';
import { ArrowRight, Send, X, Trash2 } from 'lucide-react';
import { AppShell } from '../compenntes/layout';
import { SpatialCard, ModernInput, ModernSelect } from '../compenntes/ui/SpatialComponents';


export default function NewOrderPage() {
  const [products, setProducts] = useState([{ id: 1 }, { id: 2 }]);
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
                    onRemove={() => removeProduct(p.id)}
                  />
                ))}
              </div>

              <button
                onClick={addProduct}
                className="mt-5 w-full h-13 py-3.5 rounded-[18px] bg-black/3 dark:bg-white/3 hover:bg-black/8 dark:hover:bg-white/8 border border-dashed border-black/15 dark:border-white/15 text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all">
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
                className="spatial-input w-full min-h-[400px] resize-none rounded-[20px] p-5 text-sm font-bold transition-all"
              />
            </SpatialCard>

            {/* Action Buttons - Sticky on mobile */}
            <div className="
              flex flex-col gap-3 mt-auto 
              max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:p-6 
              max-lg:pb-10
              max-lg:bg-white/95 max-lg:dark:bg-slate-900/95 max-lg:backdrop-blur-xl 
              max-lg:border-t max-lg:border-black/5 max-lg:dark:border-white/10 max-lg:z-[100]
              max-lg:rounded-[32px_32px_0px_0px] max-lg:shadow-[0_-20px_40px_rgba(0,0,0,0.1)]
            ">
              {/* Submit */}
              <button className="spatial-button w-full h-14 rounded-[22px] flex items-center justify-center gap-2 text-[16px]">
                <Send className="w-4 h-4" />
                ارسال الطلب
              </button>

              {/* Cancel (Hidden or visible based on mobile preference) */}
              <button className="
                w-full h-12 rounded-[18px] flex items-center justify-center gap-2 text-[15px] font-bold 
                bg-black/5 dark:bg-white/5 hover:bg-red-500/10 border border-black/8 dark:border-white/8 
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
function ProductRequestRow({ index, onRemove }: { index: number; onRemove: () => void }) {
  return (
    <div className="bg-black/5 dark:bg-black/20 p-6 rounded-[24px] border border-black/5 dark:border-white/5 flex flex-col gap-4 transition-colors duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-slate-800 dark:text-white font-bold text-base">المنتج {index}</h3>
        <button
          onClick={onRemove}
          className="w-9 h-9 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center border border-red-500/30">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <ModernSelect
          label="المنتج"
          options={['آيفون 15 برو ماكس', 'ماك بوك اير M3', 'سماعات ايربودز', 'كابل الشحن السريع', 'باور بانك 20000']}
          placeholder={`اختر المنتج ${index}...`}
          className="sm:col-span-2"
        />
        <ModernInput label="الكمية" type="number" placeholder="0" />
      </div>
    </div>
  );
}
