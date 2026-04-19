import { Link } from 'react-router-dom';
import { Plus, List, FileText, Pencil, RotateCcw, ChevronLeft, Wallet, ReceiptText } from 'lucide-react';

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
  return (
    <div className="pt-6">
      {/* Mobile */}
      <div className="flex justify-center lg:hidden">
        <div className="w-full max-w-2xl flex flex-col gap-4">
          {SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-1.5">
              <h2 className="text-[11px] font-black text-slate-400 dark:text-white/40 px-1 uppercase tracking-widest">
                {section.title}
              </h2>
              <div className="spatial-card overflow-hidden border border-black/10 dark:border-white/[0.12]">
                {section.items.map((item, i) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-3 px-4 py-3.5 hover:bg-black/5 dark:hover:bg-white/5 transition-all ${
                      i < section.items.length - 1 ? 'border-b border-black/5 dark:border-white/[0.06]' : ''
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0 ${item.accent}`}>
                      {item.icon}
                    </div>
                    <div className="flex flex-col gap-0 flex-1 min-w-0">
                      <span className="text-[14px] font-black text-slate-800 dark:text-white">{item.title}</span>
                      <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">{item.sub}</span>
                    </div>
                    <ChevronLeft className={`w-3.5 h-3.5 shrink-0 ${item.accent.split(' ')[1]}`} />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex flex-col gap-10">
        {SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-[11px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest shrink-0">
                {section.title}
              </h2>
              <div className="flex-1 h-px bg-black/5 dark:bg-white/10" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {section.items.map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="spatial-card group flex flex-col gap-5 p-5 border border-black/10 dark:border-white/[0.12] hover:border-black/20 dark:hover:border-white/25 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-[16px] flex items-center justify-center ${item.accent}`}>
                      <span className="[&>svg]:w-5 [&>svg]:h-5">{item.icon}</span>
                    </div>
                    <span className="text-[40px] font-black text-black/5 dark:text-white/10 leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <span className="text-[19px] font-black text-slate-800 dark:text-white">{item.title}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[12px] font-bold text-slate-400 dark:text-white/40 leading-relaxed flex-1">{item.sub}</span>
                      <ChevronLeft className={`w-5 h-5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity ${item.accent.split(' ')[1]}`} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
