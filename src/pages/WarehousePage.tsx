import { Plus, List, FileText, Pencil } from 'lucide-react';
import { SectionsPage } from '../compenntes/ui/SectionsPage';

const SECTIONS = [
  {
    title: 'حركة المخزن',
    items: [
      { title: 'إنشاء حركة',      sub: 'إدخال أو إخراج بضاعة',       to: '/warehouse/movement/create',   icon: <Plus className="w-4 h-4" />,     accent: 'bg-primary/10 text-primary' },
      { title: 'عرض الحركات',     sub: 'استعراض وفلترة',              to: '/warehouse/movements',          icon: <List className="w-4 h-4" />,     accent: 'bg-emerald-500/10 text-emerald-500' },
      { title: 'تعديل حركة',      sub: 'تعديل حركة قائمة',            to: '/warehouse/movement/edit/demo', icon: <Pencil className="w-4 h-4" />,   accent: 'bg-violet-500/10 text-violet-500' },
      { title: 'تفاصيل الحركة',   sub: 'سجل العمليات والحالة',        to: '/warehouse/movements/demo',     icon: <FileText className="w-4 h-4" />, accent: 'bg-orange-500/10 text-orange-500' },
    ],
  },
];

export default function WarehousePage() {
  return <SectionsPage sections={SECTIONS} />;
}
