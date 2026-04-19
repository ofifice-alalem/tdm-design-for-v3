import { useState } from 'react';
import { Search, Package } from 'lucide-react';
import { ListPage } from '../compenntes/ui/ListPage';
import type { StatusConfig, ListItem } from '../compenntes/ui/listPage.types';
import { ModernInput, ModernSelect } from '../compenntes/ui/SpatialComponents';
import { DateInput } from '../compenntes/ui/DateInput';

const STATUS_CONFIG: Record<string, StatusConfig> = {
  'قيد الانتظار': { bg: 'bg-yellow-500/10 dark:bg-yellow-500/15',  text: 'text-yellow-600 dark:text-yellow-400', dot: 'bg-yellow-500' },
  'تمت الموافقة': { bg: 'bg-blue-500/10 dark:bg-blue-500/15',      text: 'text-blue-600 dark:text-blue-400',     dot: 'bg-blue-500' },
  'موثق':          { bg: 'bg-emerald-500/10 dark:bg-emerald-500/15', text: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
  'مرفوض':         { bg: 'bg-red-500/10 dark:bg-red-500/15',         text: 'text-red-500',                          dot: 'bg-red-500' },
  'ملغي':          { bg: 'bg-slate-500/10 dark:bg-slate-500/10',     text: 'text-slate-500 dark:text-white/40',     dot: 'bg-slate-400' },
};

const TABS = ['الكل', 'قيد الانتظار', 'تمت الموافقة', 'موثق', 'مرفوض', 'ملغي'];

const RAW = [
  { id: '#MR-20260406-00006', date: '2026-04-06', marketer: 'محمد البحري', products: 1, status: 'موثق' },
  { id: '#MR-20260329-00005', date: '2026-03-29', marketer: 'محمد البحري', products: 1, status: 'موثق' },
  { id: '#MR-20260320-00004', date: '2026-03-20', marketer: 'أحمد علي',    products: 3, status: 'قيد الانتظار' },
  { id: '#MR-20260315-00003', date: '2026-03-15', marketer: 'سارة خالد',   products: 2, status: 'تمت الموافقة' },
  { id: '#MR-20260310-00002', date: '2026-03-10', marketer: 'أحمد علي',    products: 1, status: 'مرفوض' },
  { id: '#MR-20260305-00001', date: '2026-03-05', marketer: 'محمد البحري', products: 4, status: 'ملغي' },
];

export default function StockOrdersPage() {
  const [orderNum, setOrderNum] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const items: ListItem[] = RAW
    .filter((x) => {
      if (orderNum && !x.id.includes(orderNum)) return false;
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
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-black/5 dark:bg-white/8">
          <Package className="w-3.5 h-3.5 text-slate-400 dark:text-white/40" />
          <span className="text-[13px] font-black text-slate-700 dark:text-white/80">
            {x.products} {x.products === 1 ? 'منتج' : 'منتجات'}
          </span>
        </div>
      ),
    }));

  const filterPanel = (
    <div className="flex flex-col gap-4">
      <ModernInput label="رقم الطلب" placeholder="#MR-..." value={orderNum} onChange={setOrderNum} />
      <DateInput label="من تاريخ" value={fromDate} onChange={setFromDate} />
      <DateInput label="إلى تاريخ" value={toDate} onChange={setToDate} />
      <ModernSelect label="المسوق" options={['محمد البحري', 'أحمد علي', 'سارة خالد']} placeholder="الكل" />
      <button className="spatial-button w-full h-12 rounded-[18px] flex items-center justify-center gap-2 font-bold text-[15px]">
        <Search className="w-4 h-4" />
        فلترة
      </button>
    </div>
  );

  return (
    <ListPage
      title="إدارة المخزن"
      breadcrumb="طلبات المسوقين"
      tabs={TABS}
      statusConfig={STATUS_CONFIG}
      items={items}
      filterPanel={filterPanel}
      filterTitle="فلترة"
      emptyText="لا توجد طلبات"
    />
  );
}
