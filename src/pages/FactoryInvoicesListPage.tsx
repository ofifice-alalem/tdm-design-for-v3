import { useState } from 'react';
import { Search } from 'lucide-react';
import { ListPage } from '../compenntes/ui/ListPage';
import type { StatusConfig, ListItem } from '../compenntes/ui/listPage.types';
import { ModernInput, ModernSelect } from '../compenntes/ui/SpatialComponents';
import { DateInput } from '../compenntes/ui/DateInput';

const STATUS_CONFIG: Record<string, StatusConfig> = {
  'مكتمل': { bg: 'bg-emerald-500/10 dark:bg-emerald-500/15', text: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
  'ملغي':  { bg: 'bg-slate-500/10 dark:bg-slate-500/10',     text: 'text-slate-500 dark:text-white/40',     dot: 'bg-slate-400' },
};

const TABS = ['الكل', 'مكتمل', 'ملغي'];

const RAW = [
  { id: '#FI-20260406-00006', date: '2026-04-06', supplier: 'مورد النسيج الأول',        amount: 5100,  status: 'مكتمل' },
  { id: '#FI-20260329-00005', date: '2026-03-29', supplier: 'مورد الخياطة المتحدة',     amount: 8400,  status: 'مكتمل' },
  { id: '#FI-20260320-00004', date: '2026-03-20', supplier: 'مورد الأقمشة الحديثة',     amount: 3200,  status: 'مكتمل' },
  { id: '#FI-20260315-00003', date: '2026-03-15', supplier: 'مورد النسيج الأول',        amount: 4000,  status: 'ملغي'  },
  { id: '#FI-20260310-00002', date: '2026-03-10', supplier: 'مورد الخياطة المتحدة',     amount: 6200,  status: 'مكتمل' },
  { id: '#FI-20260305-00001', date: '2026-03-05', supplier: 'مورد الأقمشة الحديثة',     amount: 1800,  status: 'ملغي'  },
];

function fmt(n: number) {
  return n % 1 === 0 ? n.toLocaleString('en-US') : n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function FactoryInvoicesListPage() {
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
      subtitle: x.supplier,
      meta: (
        <div className="flex items-baseline gap-1">
          <span className="text-[20px] font-black text-primary">{fmt(x.amount)}</span>
          <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">دينار</span>
        </div>
      ),
      detailsHref: `/factory/invoices/${encodeURIComponent(x.id)}`,
    }));

  const filterPanel = (
    <div className="flex flex-col gap-4">
      <ModernInput label="رقم الفاتورة" placeholder="#FI-..." value={invoiceNum} onChange={setInvoiceNum} />
      <ModernSelect label="المورد" options={['الكل', 'مورد النسيج الأول', 'مورد الخياطة المتحدة', 'مورد الأقمشة الحديثة']} placeholder="الكل" />
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
      title="المخزن"
      breadcrumb="فواتير المشتريات"
      tabs={TABS}
      statusConfig={STATUS_CONFIG}
      items={items}
      filterPanel={filterPanel}
      filterTitle="فلترة متقدمة"
      emptyText="لا توجد فواتير"
    />
  );
}
