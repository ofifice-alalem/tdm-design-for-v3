import { useState } from 'react';
import { ArrowRight, Send, X } from 'lucide-react';
import { ProductRowShell } from '../compenntes/ui/ProductRowShell';
import { AppShell } from '../compenntes/layout';
import { SpatialCard, ModernInput, ModernSelect } from '../compenntes/ui/SpatialComponents';

const STOCK_PRODUCTS = ['آيفون 15 برو ماكس', 'ماك بوك اير M3', 'سماعات ايربودز', 'كابل الشحن السريع', 'باور بانك 20000'];

export default function ReturnStockPage() {
  const [items, setItems] = useState([{ id: 1, name: '', qty: 0 }, { id: 2, name: '', qty: 0 }]);

  const addItem = () => setItems((p) => [...p, { id: Date.now(), name: '', qty: 0 }]);
  const removeItem = (id: number) => setItems((p) => p.filter((x) => x.id !== id));
  const updateItem = (id: number, patch: Partial<{ name: string; qty: number }>) =>
    setItems((p) => p.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const selectedNames = items.map((x) => x.name).filter(Boolean);
  const totalTypes = items.filter((x) => x.qty > 0).length;
  const totalQty = items.reduce((s, x) => s + x.qty, 0);

  return (
    <AppShell>
      <div className="flex flex-col gap-6 h-full">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 h-11 rounded-[16px] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-all font-bold text-[14px]">
              <ArrowRight className="w-4 h-4" />
              عودة
            </button>
            <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-white/30 font-bold">
              <span>المخزن</span>
              <span>/</span>
              <span className="text-slate-700 dark:text-white/80">ارجاع بضاعة للمخزن</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0 pb-44 lg:pb-0">

          {/* Products Section */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <SpatialCard title="" hideHeader transparent className="flex-none lg:flex-1">
              <div className="flex flex-col gap-4">
                {items.map((item, i) => (
                  <ReturnRow
                    key={item.id}
                    index={i + 1}
                    currentName={item.name}
                    availableOptions={STOCK_PRODUCTS.filter((n) => n === item.name || !selectedNames.includes(n))}
                    onRemove={() => removeItem(item.id)}
                    onNameChange={(name) => updateItem(item.id, { name })}
                    onQtyChange={(qty) => updateItem(item.id, { qty })}
                  />
                ))}
              </div>

              <button
                onClick={addItem}
                disabled={selectedNames.length >= STOCK_PRODUCTS.length}
                className="mt-5 w-full py-3.5 rounded-[18px] bg-black/3 dark:bg-white/3 hover:bg-black/8 dark:hover:bg-white/8 border border-dashed border-black/15 dark:border-white/15 text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:pointer-events-none"
              >
                <span className="text-lg">+</span> إضافة منتج آخر
              </button>
            </SpatialCard>
          </div>

          {/* Divider */}
          <div className="hidden lg:flex flex-col items-center py-4">
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent" />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[360px] xl:w-[400px] shrink-0 flex flex-col gap-5 lg:sticky lg:top-0 lg:self-start">

            <SpatialCard title="ملاحظات" headerDot={false}>
              <label className="text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-widest block mb-2">
                ملاحظات (اختياري)
              </label>
              <textarea
                placeholder="سبب الإرجاع أو أي تفاصيل إضافية..."
                className="spatial-input w-full min-h-[120px] resize-none rounded-[20px] p-5 text-sm font-bold transition-all"
              />
            </SpatialCard>

            <SpatialCard title="ملخص الإرجاع">
              <div className="flex items-center justify-between py-2.5 border-b border-black/5 dark:border-white/5">
                <span className="text-[14px] font-bold text-slate-500 dark:text-white/50">عدد الأصناف</span>
                <span className="text-[15px] font-black text-slate-700 dark:text-white/80">{totalTypes}</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-[14px] font-bold text-slate-500 dark:text-white/50">إجمالي الكمية</span>
                <span className="text-[15px] font-black text-orange-500">{totalQty}</span>
              </div>
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
              <button className="spatial-button w-full h-14 rounded-[22px] flex items-center justify-center gap-2 text-[16px]">
                <Send className="w-4 h-4" />
                ارسال الطلب
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

function ReturnRow({ index, onRemove, onNameChange, onQtyChange, availableOptions, currentName }: {
  index: number;
  onRemove: () => void;
  onNameChange: (name: string) => void;
  onQtyChange: (qty: number) => void;
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
        <ModernInput
          label="الكمية"
          type="number"
          placeholder="0"
          onChange={(v) => onQtyChange(Number(v) || 0)}
        />
      </div>
    </ProductRowShell>
  );
}
