import { Plus, List, FileText, Pencil, RotateCcw, Wallet, ReceiptText } from 'lucide-react';
import { SectionsPage } from '../compenntes/ui/SectionsPage';

const SECTIONS = [
  {
    title: 'الفواتير',
    items: [
      { title: 'إنشاء فاتورة',    sub: 'فاتورة بيع جديدة',          to: '/invoice/create',        icon: <Plus className="w-4 h-4" />,        accent: 'bg-primary/10 text-primary' },
      { title: 'عرض الفواتير',    sub: 'استعراض وفلترة',             to: '/invoices',               icon: <List className="w-4 h-4" />,        accent: 'bg-emerald-500/10 text-emerald-500' },
      { title: 'تفاصيل الفاتورة', sub: 'سجل العمليات والحالة',       to: '/invoices/demo',          icon: <FileText className="w-4 h-4" />,    accent: 'bg-orange-500/10 text-orange-500' },
      { title: 'تعديل فاتورة',    sub: 'تعديل فاتورة قائمة',         to: '/invoice/edit/demo',      icon: <Pencil className="w-4 h-4" />,      accent: 'bg-violet-500/10 text-violet-500' },
    ],
  },
  {
    title: 'إيصالات القبض',
    items: [
      { title: 'إيصال قبض',       sub: 'إنشاء إيصال قبض لمتجر',     to: '/receipt/create',         icon: <Wallet className="w-4 h-4" />,      accent: 'bg-teal-500/10 text-teal-500' },
      { title: 'إيصالات القبض',   sub: 'استعراض وفلترة الإيصالات',   to: '/receipts',               icon: <ReceiptText className="w-4 h-4" />, accent: 'bg-teal-500/10 text-teal-500' },
      { title: 'تفاصيل إيصال',    sub: 'سجل العمليات والحالة',       to: '/receipts/demo',          icon: <FileText className="w-4 h-4" />,    accent: 'bg-orange-500/10 text-orange-500' },
    ],
  },
  {
    title: 'الإرجاع',
    items: [
      { title: 'ارجاع من فاتورة', sub: 'إرجاع بضاعة من فاتورة',     to: '/invoice/return',         icon: <RotateCcw className="w-4 h-4" />,   accent: 'bg-rose-500/10 text-rose-500' },
      { title: 'فواتير الإرجاع',  sub: 'استعراض وفلترة الإرجاعات',   to: '/invoices/returns',       icon: <RotateCcw className="w-4 h-4" />,   accent: 'bg-rose-500/10 text-rose-500' },
      { title: 'تفاصيل إرجاع',    sub: 'سجل العمليات والحالة',       to: '/invoices/returns/demo',  icon: <FileText className="w-4 h-4" />,    accent: 'bg-orange-500/10 text-orange-500' },
    ],
  },
];

export default function StoreSalesPage() {
  return <SectionsPage sections={SECTIONS} />;
}
