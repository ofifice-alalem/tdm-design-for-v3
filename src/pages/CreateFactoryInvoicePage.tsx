import { useState, useMemo } from 'react';
import { Plus, FileText, ArrowRight, ReceiptText, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProductRowShell } from '../compenntes/ui/ProductRowShell';
import { SpatialCard, ModernInput, ModernSelect } from '../compenntes/ui/SpatialComponents';
import { UploadArea } from '../compenntes/ui/UploadArea';

const PRODUCTS = [
  { name: 'قماش قطني أبيض', price: 45 },
  { name: 'خيط بوليستر',    price: 12 },
  { name: 'أزرار معدنية',   price: 8  },
  { name: 'سحاب نايلون',    price: 15 },
  { name: 'بطانة حريرية',   price: 30 },
];

function fmt(n: number) {
  return n % 1 === 0 ? n.toLocaleString('en-US') : n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

interface ProductItem { id: number; name: string; buyPrice: number; qty: number; unitPrice: number; }

export default function CreateFactoryInvoicePage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<ProductItem[]>([
    { id: 1, name: '', buyPrice: 0, qty: 0, unitPrice: 0 },
    { id: 2, name: '', buyPrice: 0, qty: 0, unitPrice: 0 },
  ]);

  const addItem = () => setItems((p) => [...p, { id: Date.now(), name: '', buyPrice: 0, qty: 0, unitPrice: 0 }]);
  const removeItem = (id: number) => setItems((p) => p.filter((x) => x.id !== id));
  const updateItem = (id: number, patch: Partial<ProductItem>) => setItems((p) => p.map((x) => x.id === id ? { ...x, ...patch } : x));
  const selectedNames = items.map((x) => x.name).filter(Boolean);

  const totalQty   = useMemo(() => items.reduce((s, x) => s + x.qty, 0), [items]);
  const finalTotal = useMemo(() => items.reduce((s, x) => s + x.buyPrice * x.qty, 0), [items]);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-4 h-11 rounded-[16px] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-slate-600 dark:text-white/70 font-bold text-[14px] transition-all">
          <ArrowRight className="w-4 h-4" />عودة
        </button>
        <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-white/30 font-bold">
          <span>المخزن</span><span>/</span>
          <span className="text-slate-700 dark:text-white/80">إنشاء فاتورة مشتريات</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start w-full h-full min-h-0 pb-32 lg:pb-0">
        <div className="lg:hidden w-full">
          <ModernSelect label="اختيار المورد" options={['مورد النسيج الأول', 'مورد الخياطة المتحدة', 'مورد الأقمشة الحديثة']} />
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-6 w-full">
          <SpatialCard title="" hideHeader transparent>
            <div className="flex flex-col gap-4">
              {items.map((item, i) => (
                <ProductRowShell key={item.id} title={`المنتج ${i + 1}`} onRemove={() => removeItem(item.id)}>
                  <ModernSelect
                    label="اسم الصنف"
                    options={PRODUCTS.filter((p) => p.name === item.name || !selectedNames.includes(p.name)).map((p) => ({ label: p.name, meta: fmt(p.price) + ' د' }))}
                    onSelect={(name) => { const found = PRODUCTS.find(p => p.name === name); if (found) updateItem(item.id, { name: found.name, unitPrice: found.price }); }}
                  />
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
                    <ModernInput label="الكمية" type="number" placeholder="0"
                      value={item.qty > 0 ? String(item.qty) : ''}
                      onChange={(v) => updateItem(item.id, { qty: Number(v) || 0 })} />
                    <ModernInput label="سعر الشراء" type="number" placeholder="0.00"
                      value={item.buyPrice > 0 ? String(item.buyPrice) : ''}
                      onChange={(v) => updateItem(item.id, { buyPrice: Number(v) || 0 })} />
                    <ModernInput label="سعر الوحدة" type="text" placeholder="0.00"
                      value={item.unitPrice > 0 ? fmt(item.unitPrice) : ''}
                      className="opacity-70 pointer-events-none" />
                    <ModernInput label="الإجمالي" type="text" placeholder="0.00"
                      value={item.buyPrice * item.qty > 0 ? fmt(item.buyPrice * item.qty) : ''}
                      className="opacity-60 pointer-events-none" />
                  </div>
                </ProductRowShell>
              ))}
              <button onClick={addItem} disabled={items.filter(x => x.name).length >= PRODUCTS.length}
                className="w-full h-14 rounded-[20px] bg-black/3 dark:bg-white/5 hover:bg-black/5 dark:hover:bg-white/10 border border-dashed border-black/15 dark:border-white/10 text-slate-800 dark:text-white font-bold text-base flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:pointer-events-none">
                <Plus className="w-5 h-5" />إضافة سطر منتج جديد
              </button>
            </div>
          </SpatialCard>
        </div>

        <aside className="w-full lg:w-[400px] xl:w-[440px] shrink-0 flex flex-col gap-5 lg:sticky lg:top-0 lg:self-start">
          <div className="hidden lg:block">
            <ModernSelect label="اختيار المورد" options={['مورد النسيج الأول', 'مورد الخياطة المتحدة', 'مورد الأقمشة الحديثة']} />
          </div>

          <SpatialCard title="صورة الفاتورة" icon={<Upload className="w-5 h-5" />}>
            <UploadArea />
          </SpatialCard>

          <SpatialCard title="ملاحظات" icon={<FileText className="w-5 h-5" />}>
            <textarea className="spatial-input w-full min-h-[80px] resize-none rounded-[20px] p-5 text-sm font-bold" placeholder="أضف أي ملاحظات..." />
          </SpatialCard>

          <div className="flex flex-col gap-4 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:z-[100] max-lg:bg-white/95 max-lg:dark:bg-slate-900/95 max-lg:px-5 max-lg:py-4 max-lg:backdrop-blur-xl max-lg:rounded-t-[24px] max-lg:border-t max-lg:border-black/10 max-lg:dark:border-white/10">
            <div className="lg:hidden flex items-center justify-between gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">الإجمالي</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-primary">{fmt(finalTotal)}</span>
                  <span className="text-xs font-bold text-slate-400 dark:text-white/40">دينار</span>
                </div>
              </div>
              <button className="spatial-button h-12 px-6 rounded-[20px] flex items-center gap-2.5 text-[15px] font-black">
                <ReceiptText className="w-4 h-4" />إنشاء الفاتورة
              </button>
            </div>

            <SpatialCard title="ملخص الفاتورة" className="hidden lg:block">
              <div className="flex flex-col gap-1">
                {items.filter(x => x.name).map((x) => (
                  <div key={x.id} className="flex items-center justify-between py-2 border-b border-black/5 dark:border-white/5 last:border-0">
                    <span className="text-[13px] font-bold text-slate-500 dark:text-white/50">{x.name}</span>
                    <span className="text-[13px] font-black text-slate-700 dark:text-white/80">{x.qty} × {fmt(x.buyPrice)} د</span>
                  </div>
                ))}
                <div className="flex items-center justify-between py-2 border-b border-black/5 dark:border-white/5">
                  <span className="text-[13px] font-bold text-slate-500 dark:text-white/50">إجمالي الكميات</span>
                  <span className="text-[14px] font-black text-slate-700 dark:text-white/80">{totalQty} قطعة</span>
                </div>
                <div className="flex items-center justify-between pt-3 mt-1">
                  <span className="text-[15px] font-black text-slate-700 dark:text-white/80">الإجمالي النهائي</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-primary">{fmt(finalTotal)}</span>
                    <span className="text-base font-bold text-slate-400 dark:text-white/40">دينار</span>
                  </div>
                </div>
              </div>
            </SpatialCard>

            <button className="hidden lg:flex spatial-button w-full h-16 rounded-[24px] items-center justify-center gap-2.5 text-lg">
              <ReceiptText className="w-5 h-5" />إنشاء الفاتورة
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
