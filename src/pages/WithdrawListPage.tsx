import { useState } from 'react';
import { Search } from 'lucide-react';
import { ListPage } from '../compenntes/ui/ListPage';
import type { StatusConfig, ListItem } from '../compenntes/ui/listPage.types';
import { ModernInput, ModernSelect } from '../compenntes/ui/SpatialComponents';
import { DateInput } from '../compenntes/ui/DateInput';

const STATUS_CONFIG: Record<string, StatusConfig> = {
  'قيد الانتظار': { bg: 'bg-yellow-500/10 dark:bg-yellow-500/15',  text: 'text-yellow-600 dark:text-yellow-400', dot: 'bg-yellow-500' },
  'موثق':          { bg: 'bg-blue-500/10 dark:bg-blue-500/15',      text: 'text-blue-600 dark:text-blue-400',     dot: 'bg-blue-500' },
  'مرفوض':         { bg: 'bg-red-500/10 dark:bg-red-500/15',         text: 'text-red-500',                          dot: 'bg-red-500' },
  'ملغي':          { bg: 'bg-slate-500/10 dark:bg-slate-500/10',     text: 'text-slate-500 dark:text-white/40',     dot: 'bg-slate-400' },
};

const TABS = ['الكل', 'قيد الانتظار', 'موثق', 'مرفوض', 'ملغي'];

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const RAW = [
  { id: '#WD-20260406-00012', date: '2026-04-06', marketer: 'محمد البحري', amount: 1500,   status: 'قيد الانتظار' },
  { id: '#WD-20260329-00011', date: '2026-03-29', marketer: 'محمد البحري', amount: 2300,   status: 'موثق' },
  { id: '#WD-20260320-00010', date: '2026-03-20', marketer: 'أحمد علي',    amount: 800,    status: 'موثق' },
  { id: '#WD-20260315-00009', date: '2026-03-15', marketer: 'سارة خالد',   amount: 3200,   status: 'موثق' },
  { id: '#WD-20260310-00008', date: '2026-03-10', marketer: 'أحمد علي',    amount: 500,    status: 'مرفوض' },
  { id: '#WD-20260305-00007', date: '2026-03-05', marketer: 'محمد البحري', amount: 1200,   status: 'ملغي' },
];

export default function WithdrawListPage() {
  const [withdrawNum, setWithdrawNum] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const items: ListItem[] = RAW
    .filter((x) => {
      if (withdrawNum && !x.id.includes(withdrawNum)) return false;
      if (fromDate && x.date < fromDate) return false;
      if (toDate && x.date > toDate) return false;
      return true;
    })
    .map((x) => ({
      id: x.id,
      date: x.date,
      status: x.status,
      subtitle: x.marketer,
      meta: (
        <div className="flex items-baseline gap-1">
          <span className="text-[18px] font-black text-primary">{fmt(x.amount)}</span>
          <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">د.ل</span>
        </div>
      ),
      detailsHref: `/withdraw/list/${encodeURIComponent(x.id)}`,
    }));

  const filterPanel = (
    <div className="flex flex-col gap-4">
      <ModernInput label="رقم الطلب" placeholder="#WD-..." value={withdrawNum} onChange={setWithdrawNum} />
      <DateInput label="من تاريخ" value={fromDate} onChange={setFromDate} />
      <DateInput label="إلى تاريخ" value={toDate} onChange={setToDate} />
      <ModernSelect label="المسوق" options={['الكل', 'محمد البحري', 'أحمد علي', 'سارة خالد']} placeholder="الكل" />
      <button className="spatial-button w-full h-12 rounded-[18px] flex items-center justify-center gap-2 font-bold text-[15px]">
        <Search className="w-4 h-4" />
        فلترة
      </button>
    </div>
  );

  return (
    <ListPage
      title="طلبات السحب"
      tabs={TABS}
      statusConfig={STATUS_CONFIG}
      items={items}
      filterPanel={filterPanel}
      filterTitle="فلترة"
      emptyText="لا توجد طلبات سحب"
    />
  );
}
