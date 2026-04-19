import { useState } from 'react';
import { Search } from 'lucide-react';
import { ListPage } from '../compenntes/ui/ListPage';
import type { StatusConfig, ListItem } from '../compenntes/ui/listPage.types';
import { ModernInput, ModernSelect } from '../compenntes/ui/SpatialComponents';
import { DateInput } from '../compenntes/ui/DateInput';

const STATUS_CONFIG: Record<string, StatusConfig> = {
  'قيد الانتظار': { bg: 'bg-yellow-500/10 dark:bg-yellow-500/15',  text: 'text-yellow-600 dark:text-yellow-400', dot: 'bg-yellow-500' },
  'موثق':          { bg: 'bg-emerald-500/10 dark:bg-emerald-500/15', text: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
  'مرفوض':         { bg: 'bg-red-500/10 dark:bg-red-500/15',         text: 'text-red-500',                          dot: 'bg-red-500' },
  'ملغي':          { bg: 'bg-slate-500/10 dark:bg-slate-500/10',     text: 'text-slate-500 dark:text-white/40',     dot: 'bg-slate-400' },
};

const TABS = ['الكل', 'قيد الانتظار', 'موثق', 'مرفوض', 'ملغي'];

const RAW = [
  { id: '#SI-20260316-00139', date: '2026-03-16', client: 'شركة طريق المطار احمد علي', amount: 3150,  status: 'موثق' },
  { id: '#SI-20260316-00138', date: '2026-03-16', client: 'الزاهد الكريمية',            amount: 4200,  status: 'موثق' },
  { id: '#SI-20260316-00137', date: '2026-03-16', client: 'شركة طريق المطار احمد علي', amount: 3150,  status: 'موثق' },
  { id: '#SI-20260315-00136', date: '2026-03-15', client: 'مؤسسة النور للتجارة',        amount: 1800,  status: 'قيد الانتظار' },
  { id: '#SI-20260315-00135', date: '2026-03-15', client: 'الزاهد الكريمية',            amount: 950,   status: 'مرفوض' },
  { id: '#SI-20260314-00134', date: '2026-03-14', client: 'شركة الأمل',                 amount: 2300,  status: 'ملغي' },
];

function fmt(n: number) {
  return n % 1 === 0 ? n.toLocaleString('en-US') : n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function InvoicesListPage() {
  const [invoiceNum, setInvoiceNum] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const items: ListItem[] = RAW
    .filter((x) => {
      if (invoiceNum && !x.id.includes(invoiceNum)) return false;
      if (fromDate && x.date < fromDate) return false;
      if (toDate && x.date > toDate) return false;
      return true;
    })
    .map((x) => ({
      id: x.id,
      date: x.date,
      status: x.status,
      subtitle: x.client,
      meta: (
        <div className="flex items-baseline gap-1">
          <span className="text-[20px] font-black text-primary">{fmt(x.amount)}</span>
          <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">دينار</span>
        </div>
      ),
      detailsHref: `/invoices/${encodeURIComponent(x.id)}`,
    }));

  const filterPanel = (
    <div className="flex flex-col gap-4">
      <ModernInput label="رقم الفاتورة" placeholder="#SI-..." value={invoiceNum} onChange={setInvoiceNum} />
      <ModernSelect label="المتجر" options={['الكل', 'المتجر الرئيسي - طرابلس', 'فرع بنغازي', 'فرع مصراتة']} placeholder="الكل" />
      <ModernSelect label="المسوق" options={['الكل', 'أحمد علي', 'محمد حسن', 'سارة خالد']} placeholder="الكل" />
      <DateInput label="من تاريخ" value={fromDate} onChange={setFromDate} />
      <DateInput label="إلى تاريخ" value={toDate} onChange={setToDate} />
      <button className="spatial-button w-full h-12 rounded-[18px] flex items-center justify-center gap-2 font-bold text-[15px]">
        <Search className="w-4 h-4" />
        بحث
      </button>
    </div>
  );

  return (
    <ListPage
      title="الفواتير"
      tabs={TABS}
      statusConfig={STATUS_CONFIG}
      items={items}
      filterPanel={filterPanel}
      filterTitle="فلترة متقدمة"
      emptyText="لا توجد فواتير"
    />
  );
}
