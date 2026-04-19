import { Link } from 'react-router-dom';
import { Plus, List, FileText, Pencil, RotateCcw, ChevronLeft, Wallet, ReceiptText } from 'lucide-react';

const SECTIONS = [
  {
    title: 'الفواتير',
    items: [
      { title: 'إنشاء فاتورة',    sub: 'فاتورة بيع جديدة',          to: '/invoice/create',    icon: <Plus className="w-5 h-5" />,        accent: 'bg-primary/10 text-primary',           border: 'border-primary/20' },
      { title: 'عرض الفواتير',    sub: 'استعراض وفلترة',             to: '/invoices',           icon: <List className="w-5 h-5" />,        accent: 'bg-emerald-500/10 text-emerald-500',   border: 'border-emerald-500/20' },
      { title: 'تفاصيل الفاتورة', sub: 'سجل العمليات والحالة',       to: '/invoices/demo',      icon: <FileText className="w-5 h-5" />,    accent: 'bg-orange-500/10 text-orange-500',     border: 'border-orange-500/20' },
      { title: 'تعديل فاتورة',    sub: 'تعديل فاتورة قائمة',         to: '/invoice/edit/demo',  icon: <Pencil className="w-5 h-5" />,      accent: 'bg-violet-500/10 text-violet-500',     border: 'border-violet-500/20' },
    ],
  },
  {
    title: 'إيصالات القبض',
    items: [
      { title: 'إيصال قبض',       sub: 'إنشاء إيصال قبض لمتجر',     to: '/receipt/create',     icon: <Wallet className="w-5 h-5" />,      accent: 'bg-teal-500/10 text-teal-500',         border: 'border-teal-500/20' },
      { title: 'إيصالات القبض',   sub: 'استعراض وفلترة الإيصالات',   to: '/receipts',           icon: <ReceiptText className="w-5 h-5" />, accent: 'bg-teal-500/10 text-teal-500',         border: 'border-teal-500/20' },
    ],
  },
  {
    title: 'الإرجاع',
    items: [
      { title: 'ارجاع من فاتورة', sub: 'إرجاع بضاعة من فاتورة',     to: '/invoice/return',     icon: <RotateCcw className="w-5 h-5" />,   accent: 'bg-rose-500/10 text-rose-500',         border: 'border-rose-500/20' },
      { title: 'فواتير الإرجاع',  sub: 'استعراض وفلترة الإرجاعات',   to: '/invoices/returns',   icon: <RotateCcw className="w-5 h-5" />,   accent: 'bg-rose-500/10 text-rose-500',         border: 'border-rose-500/20' },
    ],
  },
];

export default function StoreSalesPage() {
  return (
    <div className="pt-10 flex justify-center">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col gap-2">
            <h2 className="text-[13px] font-black text-slate-400 dark:text-white/40 px-1 mb-1">
              {section.title}
            </h2>
            {section.items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`spatial-card flex items-center gap-4 px-5 py-4 border ${item.border} hover:scale-[1.01] transition-all`}
              >
                <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center shrink-0 ${item.accent}`}>
                  {item.icon}
                </div>
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <span className="text-[15px] font-black text-slate-800 dark:text-white">{item.title}</span>
                  <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">{item.sub}</span>
                </div>
                <ChevronLeft className={`w-4 h-4 shrink-0 ${item.accent.split(' ')[1]}`} />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
