import { Trash2, Plus, Box, FileText, ArrowRight } from 'lucide-react';
import { AppShell } from '../compenntes/layout';
import { SpatialCard, ModernInput, ModernSelect } from '../compenntes/ui/SpatialComponents';

export default function CreateInvoicePage() {
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

        <div className="flex flex-col lg:flex-row gap-8 items-start w-full h-full min-h-0">

        {/* ── Main column: products ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">

          <SpatialCard title="المنتجات المحددة" icon={<Box className="w-5 h-5" />}>
            <div className="flex flex-col gap-4">

              <ProductRow
                title="المنتج الأول"
                selectOptions={['آيفون 15 برو ماكس', 'ماك بوك اير M3', 'سماعات ايربودز']}
              />

              <ProductRow
                title="المنتج الثاني"
                selectOptions={['كابل الشحن السريع', 'مقابس باور بانك']}
              />

              <button className="w-full h-14 rounded-[20px] bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-slate-800 dark:text-white font-bold text-base flex items-center justify-center gap-2 transition-all mt-2">
                <Plus className="w-5 h-5" />
                إضافة سطر منتج جديد
              </button>

            </div>
          </SpatialCard>
        </div>

        {/* ── Sidebar column: store + summary + notes + submit ── */}
        <aside className="w-full lg:w-[400px] xl:w-[440px] shrink-0 flex flex-col gap-5">

          {/* Store Selector */}
          <ModernSelect
            label="اختيار المتجر"
            options={['المتجر الرئيسي - بغداد', 'فرع الكرادة', 'فرع المنصور', 'فرع الزعفرانية']}
          />

          {/* Invoice Summary */}
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-[30px] border border-black/5 dark:border-white/5 p-7 shadow-sm transition-colors duration-500">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,102,255,0.5)]" />
              <h3 className="text-[15px] font-black text-slate-800 dark:text-white tracking-wide">ملخص الفاتورة</h3>
            </div>

            <div className="flex flex-col gap-1">
              <SummaryRow label="عدد البضاعة" value="0" unit="" />
              <SummaryRow label="السعر الكلي" value="0.00" unit="دينار" />
              <SummaryRow label="تخفيض المنتجات" value="0.00" unit="دينار" isDiscount />
              <SummaryRow label="تخفيض الفاتورة" value="0.00" unit="دينار" isDiscount />

              <div className="border-t border-black/8 dark:border-white/8 my-3" />

              <div className="flex items-center justify-between">
                <span className="text-[15px] font-black text-slate-700 dark:text-white/80">المجموع النهائي</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-primary">0.00</span>
                  <span className="text-base font-bold text-slate-400 dark:text-white/40">دينار</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Notes */}
          <SpatialCard title="ملاحظات تفصيلية" icon={<FileText className="w-5 h-5" />}>
            <textarea
              className="spatial-input w-full min-h-[140px] resize-none rounded-[20px] p-5 text-sm font-bold mt-2"
              placeholder="أضف أي تفاصيل أو تعليمات شحن أو ملاحظات..."
            />
          </SpatialCard>

          {/* Submit Button */}
          <button className="spatial-button w-full h-16 rounded-[24px] flex items-center justify-center gap-2 text-lg shadow-[0_10px_30px_rgba(0,102,255,0.4)]">
            إنشاء الفاتورة النهائي
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
          <p className="text-center text-slate-400 dark:text-white/30 text-xs font-bold -mt-2">
            بالنقر هنا سيتم اعتماد الفاتورة فوراً في النظام.
          </p>

        </aside>
      </div>
    </div>
  </AppShell>
  );
}

/* ── Product row ── */
function ProductRow({ title, selectOptions }: { title: string; selectOptions: string[] }) {
  return (
    <div className="bg-black/5 dark:bg-black/20 p-6 rounded-[24px] border border-black/5 dark:border-white/5 flex flex-col gap-4 transition-colors duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-slate-800 dark:text-white font-bold text-base">{title}</h3>
        <button className="w-9 h-9 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <ModernSelect label="اسم الصنف" options={selectOptions} />
      <div className="grid grid-cols-3 gap-4">
        <ModernInput label="الكمية" type="number" placeholder="0" />
        <ModernInput label="هدية" type="number" placeholder="0" />
        <ModernInput label="سعر الوحدة" type="number" placeholder="0.00" />
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
