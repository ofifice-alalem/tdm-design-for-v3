import { Link } from 'react-router-dom';
import { Plus, List, FileText, Pencil, RotateCcw, ChevronLeft } from 'lucide-react';

const ITEMS = [
  { title: 'إنشاء فاتورة',    to: '/invoice/create',    icon: <Plus className="w-5 h-5" /> },
  { title: 'عرض الفواتير',    to: '/invoices',           icon: <List className="w-5 h-5" /> },
  { title: 'تفاصيل الفاتورة', to: '/invoices/demo',      icon: <FileText className="w-5 h-5" /> },
  { title: 'تعديل فاتورة',    to: '/invoice/edit/demo',  icon: <Pencil className="w-5 h-5" /> },
  { title: 'ارجاع من فاتورة', to: '/invoice/return',     icon: <RotateCcw className="w-5 h-5" /> },
];

export default function StoreSalesPage() {
  return (
    <div className="flex justify-center pt-16 h-full">
      <div className="w-full max-w-xl">
        <div className="spatial-card overflow-hidden">
          {ITEMS.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center justify-between px-5 py-4 hover:bg-black/3 dark:hover:bg-white/5 transition-colors group ${
                i < ITEMS.length - 1 ? 'border-b border-black/5 dark:border-white/5' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[12px] bg-black/5 dark:bg-white/8 flex items-center justify-center text-slate-500 dark:text-white/50 group-hover:text-primary group-hover:bg-primary/10 transition-all">
                  {item.icon}
                </div>
                <span className="text-[15px] font-bold text-slate-700 dark:text-white/80 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {item.title}
                </span>
              </div>
              <ChevronLeft className="w-4 h-4 text-slate-300 dark:text-white/20 group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
