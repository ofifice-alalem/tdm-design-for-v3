import { Plus, List, FileText, Pencil } from 'lucide-react';
import { SectionsPage } from '../compenntes/ui/SectionsPage';

const SECTIONS = [
  {
    title: 'فواتير المشتريات',
    items: [
      { title: 'إنشاء فاتورة',    sub: 'فاتورة مشتريات جديدة',       to: '/factory/invoice/create',   icon: <Plus className="w-4 h-4" />,     accent: 'bg-primary/10 text-primary' },
      { title: 'عرض الفواتير',    sub: 'استعراض وفلترة',              to: '/factory/invoices',          icon: <List className="w-4 h-4" />,     accent: 'bg-emerald-500/10 text-emerald-500' },
      { title: 'تعديل فاتورة',    sub: 'تعديل فاتورة قائمة',          to: '/factory/invoice/edit/demo', icon: <Pencil className="w-4 h-4" />,   accent: 'bg-violet-500/10 text-violet-500' },
      { title: 'تفاصيل الفاتورة', sub: 'سجل العمليات والحالة',        to: '/factory/invoices/demo',     icon: <FileText className="w-4 h-4" />, accent: 'bg-orange-500/10 text-orange-500' },
    ],
  },
];

export default function PurchasesPage() {
  return <SectionsPage sections={SECTIONS} />;
}
