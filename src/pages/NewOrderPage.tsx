import { ArrowRight, Package, Send, X } from 'lucide-react';
import { AppShell } from '../compenntes/layout';
import { SpatialCard, ModernInput, ModernSelect } from '../compenntes/ui/SpatialComponents';


export default function NewOrderPage() {
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
        <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">

          {/* ── Right Section: Products ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <SpatialCard
              title="المنتجات المطلوبة"
              icon={<Package className="w-5 h-5" />}
            >
              <p className="text-sm font-bold text-slate-400 dark:text-white/40 mb-6 -mt-2">
                اختر المنتجات والكميات المطلوبة
              </p>

              <div className="flex flex-col gap-5">
                {/* Product Row 1 */}
                <ProductRequestRow index={1} />

                {/* Divider */}
                <div className="py-1">
                  <div className="h-px bg-black/8 dark:bg-white/8 w-full" />
                </div>

                {/* Product Row 2 */}
                <ProductRequestRow index={2} />
              </div>

              {/* Add another product */}
              <button className="mt-5 w-full h-13 py-3.5 rounded-[18px] bg-black/3 dark:bg-white/3 hover:bg-black/8 dark:hover:bg-white/8 border border-dashed border-black/15 dark:border-white/15 text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all">
                + إضافة منتج آخر
              </button>
            </SpatialCard>
          </div>

          {/* ── Vertical Divider ── */}
          <div className="hidden lg:flex flex-col items-center gap-0 py-4">
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent" />
          </div>

          {/* ── Left Section: Notes + Actions ── */}
          <div className="w-full lg:w-[360px] xl:w-[400px] shrink-0 flex flex-col gap-5">

            {/* Notes */}
            <SpatialCard title="ملاحظات" headerDot={false} className="flex-1">
              <label className="text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-widest block mb-2">
                ملاحظات (اختياري)
              </label>
              <textarea
                placeholder="أضف أي ملاحظات أو تعليمات إضافية للطلب..."
                className="spatial-input w-full flex-1 resize-none rounded-[20px] p-5 text-sm font-bold mt-auto"
              />
            </SpatialCard>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mt-auto">
              {/* Submit */}
              <button className="spatial-button w-full h-14 rounded-[22px] flex items-center justify-center gap-2 text-[16px]">
                <Send className="w-4 h-4" />
                ارسال الطلب
              </button>

              {/* Cancel */}
              <button className="w-full h-12 rounded-[18px] flex items-center justify-center gap-2 text-[15px] font-bold bg-black/5 dark:bg-white/5 hover:bg-red-500/10 border border-black/8 dark:border-white/8 hover:border-red-500/30 text-slate-600 dark:text-white/60 hover:text-red-500 transition-all">
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

/* ── Single product request row ── */
function ProductRequestRow({ index }: { index: number }) {
  return (
    <div className="flex flex-col gap-4">
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
