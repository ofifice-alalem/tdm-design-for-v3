import { ShoppingCart, List, PackageX, FileText, TrendingDown } from 'lucide-react';
import { SectionsPage } from '../compenntes/ui/SectionsPage';

const SECTIONS = [
  {
    title: 'الطلبات',
    items: [
      { title: 'طلب بضاعة',         sub: 'إنشاء طلب بضاعة جديد',          to: '/order/new',          icon: <ShoppingCart className="w-4 h-4" />, accent: 'bg-primary/10 text-primary' },
      { title: 'طلبات المسوقين',     sub: 'استعراض وفلترة الطلبات',         to: '/stock/orders',       icon: <List className="w-4 h-4" />,        accent: 'bg-emerald-500/10 text-emerald-500' },
      { title: 'تفاصيل طلب',         sub: 'عرض تفاصيل طلب مسوق',           to: '/stock/orders/demo',  icon: <FileText className="w-4 h-4" />,    accent: 'bg-orange-500/10 text-orange-500' },
      { title: 'ارجاع البضاعة',      sub: 'إرجاع بضاعة للمخزن',            to: '/stock/return',       icon: <PackageX className="w-4 h-4" />,    accent: 'bg-rose-500/10 text-rose-500' },
    ],
  },
  {
    title: 'السحب',
    items: [
      { title: 'طلب سحب',            sub: 'سحب الأرباح المتاحة',            to: '/withdraw/new',       icon: <TrendingDown className="w-4 h-4" />, accent: 'bg-violet-500/10 text-violet-500' },
      { title: 'عرض طلبات السحب',    sub: 'استعراض وفلترة طلبات السحب',    to: '/withdraw/list',      icon: <List className="w-4 h-4" />,         accent: 'bg-teal-500/10 text-teal-500' },
    ],
  },
];

export default function MarketersPage() {
  return <SectionsPage sections={SECTIONS} />;
}
