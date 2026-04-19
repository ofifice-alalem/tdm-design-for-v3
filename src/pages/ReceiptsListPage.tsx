import { useState } from 'react';
import { Search, Wallet } from 'lucide-react';
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
  { id: '#RC-20260406-00005', date: '2026-04-06', client: 'شركة طريق المطار احمد علي', amount: 3150, method: 'نقدي',   status: 'موثق' },
  { id: '#RC-20260329-00004', date: '2026-03-29', client: 'الزاهد الكريمية',            amount: 4200, method: 'حوالة',  status: 'موثق' },
  { id: '#RC-20260320-00003', date: '2026-03-20', client: 'مؤسسة النور للتجارة',        amount: 1800, method: 'شيك',    status: 'قيد الانتظار' },
  { id: '#RC-20260315-00002', date: '2026-03-15', client: 'الزاهد الكريمية',            amount: 950,  method: 'نقدي',   status: 'مرفوض' },
  { id: '#RC-20260310-00001', date: '2026-03-10', client: 'شركة الأمل',                 amount: 2300, method: 'حوالة',  status: 'ملغي' },
];

const METHOD_COLORS: Record<string, string> = {
  'نقدي':  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'حوالة': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  'شيك':   'bg-violet-500/10 text-violet-600 dark:text-violet-400',
};

function fmt(n: number) {
  return n % 1 === 0 ? n.toLocaleString('en-US') : n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function ReceiptsListPage() {
  const [receiptNum, setReceiptNum] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const items: ListItem[] = RAW
    .filter((x) => {
      if (receiptNum && !x.id.includes(receiptNum)) return false;
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
        <div className="flex items-center gap-2">
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-[8px] flex items-center gap-1 ${METHOD_COLORS[x.method]}`}>
            <Wallet className="w-3 h-3" />
            {x.method}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-[20px] font-black text-teal-500">{fmt(x.amount)}</span>
            <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">دينار</span>
          </div>
        </div>
      ),
      detailsHref: `/receipts/${encodeURIComponent(x.id)}`,
    }));

  const filterPanel = (
    <div className="flex flex-col gap-4">
      <ModernInput label="رقم الإيصال" placeholder="#RC-..." value={receiptNum} onChange={setReceiptNum} />
      <ModernSelect label="المتجر" options={['الكل', 'المتجر الرئيسي - طرابلس', 'فرع بنغازي', 'فرع مصراتة']} placeholder="الكل" />
      <ModernSelect label="المسوق" options={['الكل', 'أحمد علي', 'محمد حسن', 'سارة خالد']} placeholder="الكل" />
      <ModernSelect label="طريقة الدفع" options={['الكل', 'نقدي', 'حوالة', 'شيك']} placeholder="الكل" />
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
      title="بيع متاجر"
      breadcrumb="إيصالات القبض"
      tabs={TABS}
      statusConfig={STATUS_CONFIG}
      items={items}
      filterPanel={filterPanel}
      filterTitle="فلترة متقدمة"
      emptyText="لا توجد إيصالات"
    />
  );
}
