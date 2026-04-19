import { Link } from 'react-router-dom';
import { Plus, List, FileText } from 'lucide-react';
import { AppShell } from '../compenntes/layout';

const CARDS = [
  {
    title: 'إنشاء فاتورة',
    description: 'إنشاء فاتورة بيع جديدة لمتجر',
    icon: <Plus className="w-6 h-6" />,
    to: '/invoice/create',
    color: 'text-primary bg-primary/10',
  },
  {
    title: 'عرض الفواتير',
    description: 'استعراض وفلترة جميع الفواتير',
    icon: <List className="w-6 h-6" />,
    to: '/invoices',
    color: 'text-emerald-500 bg-emerald-500/10',
  },
  {
    title: 'تفاصيل الفاتورة',
    description: 'عرض تفاصيل فاتورة محددة مع سجل العمليات',
    icon: <FileText className="w-6 h-6" />,
    to: '/invoices/demo',
    color: 'text-orange-500 bg-orange-500/10',
  },
];

export default function StoreSalesPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <span className="text-lg font-black text-slate-800 dark:text-white">بيع متاجر</span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CARDS.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="spatial-card p-6 flex flex-col gap-4 hover:scale-[1.01] transition-transform cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center ${card.color}`}>
                {card.icon}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[16px] font-black text-slate-800 dark:text-white">{card.title}</span>
                <span className="text-[13px] font-bold text-slate-400 dark:text-white/40">{card.description}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
