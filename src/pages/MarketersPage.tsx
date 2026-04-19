import { Link } from 'react-router-dom';
import { ShoppingCart, List, PackageX, FileText, ChevronLeft } from 'lucide-react';

const ITEMS = [
  {
    title: 'طلب بضاعة',
    sub: 'إنشاء طلب بضاعة جديد',
    to: '/order/new',
    icon: <ShoppingCart className="w-5 h-5" />,
    accent: 'bg-primary/10 text-primary',
    border: 'border-primary/20',
  },
  {
    title: 'طلبات المسوقين',
    sub: 'استعراض وفلترة الطلبات',
    to: '/stock/orders',
    icon: <List className="w-5 h-5" />,
    accent: 'bg-emerald-500/10 text-emerald-500',
    border: 'border-emerald-500/20',
  },
  {
    title: 'تفاصيل طلب',
    sub: 'عرض تفاصيل طلب مسوق',
    to: '/stock/orders/demo',
    icon: <FileText className="w-5 h-5" />,
    accent: 'bg-orange-500/10 text-orange-500',
    border: 'border-orange-500/20',
  },
  {
    title: 'ارجاع البضاعة',
    sub: 'إرجاع بضاعة للمخزن',
    to: '/stock/return',
    icon: <PackageX className="w-5 h-5" />,
    accent: 'bg-rose-500/10 text-rose-500',
    border: 'border-rose-500/20',
  },
];

export default function MarketersPage() {
  return (
    <div className="pt-10 flex justify-center">
      <div className="w-full max-w-2xl flex flex-col gap-3">
        {ITEMS.map((item) => (
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
    </div>
  );
}
