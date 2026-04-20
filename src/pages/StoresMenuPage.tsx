import { Store, List, Eye, Settings, Plus } from 'lucide-react';
import { SectionsPage } from '../compenntes/ui/SectionsPage';

const SECTIONS = [
  {
    title: 'إدارة المتاجر',
    items: [
      { title: 'إضافة متجر',         sub: 'إنشاء متجر جديد',              to: '/stores/create',     icon: <Plus className="w-4 h-4" />,     accent: 'bg-primary/10 text-primary' },
      { title: 'عرض المتاجر',        sub: 'قائمة المتاجر والإحصائيات',    to: '/stores/list',       icon: <List className="w-4 h-4" />,     accent: 'bg-emerald-500/10 text-emerald-500' },
      { title: 'تعديل بيانات متجر',  sub: 'تعديل بيانات متجر محدد',    to: '/stores/1/edit',     icon: <Settings className="w-4 h-4" />, accent: 'bg-violet-500/10 text-violet-500' },
      { title: 'حركات متجر',         sub: 'عرض حركات متجر محدد',          to: '/stores/4',          icon: <Eye className="w-4 h-4" />,      accent: 'bg-orange-500/10 text-orange-500' },
    ],
  },
];

export default function StoresMenuPage() {
  return <SectionsPage sections={SECTIONS} />;
}
