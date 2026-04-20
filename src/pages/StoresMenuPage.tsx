import { Store, List, Eye, Settings, Plus, Building2, Activity } from 'lucide-react';
import { SectionsPage } from '../compenntes/ui/SectionsPage';

const SECTIONS = [
  {
    title: 'إدارة الشركات',
    items: [
      { title: 'إضافة شركة',         sub: 'إنشاء شركة جديدة',              to: '/companies/create',     icon: <Building2 className="w-4 h-4" />,     accent: 'bg-primary/10 text-primary' },
      { title: 'عرض حركة شركة',      sub: 'عرض كل الفروع والعمليات',      to: '/companies/1/activity', icon: <Activity className="w-4 h-4" />,    accent: 'bg-blue-500/10 text-blue-500' },
      { title: 'تعديل بيانات شركة',  sub: 'تعديل بيانات شركة محددة',       to: '/companies/1/edit',     icon: <Settings className="w-4 h-4" />,    accent: 'bg-violet-500/10 text-violet-500' },
    ],
  },
  {
    title: 'إدارة الفروع',
    items: [
      { title: 'إضافة فرع',          sub: 'إنشاء فرع جديد',                to: '/branches/create',      icon: <Plus className="w-4 h-4" />,        accent: 'bg-emerald-500/10 text-emerald-500' },
      { title: 'عرض تفاصيل فرع',     sub: 'عرض حركات فرع محدد',            to: '/branches/101',         icon: <Eye className="w-4 h-4" />,         accent: 'bg-orange-500/10 text-orange-500' },
      { title: 'تعديل بيانات فرع',   sub: 'تعديل بيانات فرع محدد',         to: '/branches/101/edit',    icon: <Settings className="w-4 h-4" />,    accent: 'bg-rose-500/10 text-rose-500' },
    ],
  },
  {
    title: 'عرض شامل',
    items: [
      { title: 'عرض كل المتاجر',     sub: 'قائمة الشركات والفروع',        to: '/stores/list',          icon: <List className="w-4 h-4" />,        accent: 'bg-slate-500/10 text-slate-600 dark:text-slate-400' },
    ],
  },
];

export default function StoresMenuPage() {
  return <SectionsPage sections={SECTIONS} />;
}
