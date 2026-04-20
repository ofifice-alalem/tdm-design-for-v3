import { useState } from 'react';
import { Search, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { ListPage } from '../compenntes/ui/ListPage';
import type { StatusConfig, ListItem } from '../compenntes/ui/listPage.types';
import { ModernInput, ModernSelect } from '../compenntes/ui/SpatialComponents';
import { DateInput } from '../compenntes/ui/DateInput';

const STATUS_CONFIG: Record<string, StatusConfig> = {
  'قيد الانتظار': { bg: 'bg-yellow-500/10 dark:bg-yellow-500/15',  text: 'text-yellow-600 dark:text-yellow-400', dot: 'bg-yellow-500' },
  'مكتمل': { bg: 'bg-emerald-500/10 dark:bg-emerald-500/15', text: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
  'ملغي':  { bg: 'bg-slate-500/10 dark:bg-slate-500/10',     text: 'text-slate-500 dark:text-white/40',     dot: 'bg-slate-400' },
};

const TABS = ['الكل', 'قيد الانتظار', 'مكتمل', 'ملغي'];

const RAW = [
  { id: '#WM-20260408-00007', date: '2026-04-08', warehouse: 'المستودع الرئيسي', type: 'إدخال',  qty: 260, status: 'قيد الانتظار' },
  { id: '#WM-20260406-00006', date: '2026-04-06', warehouse: 'المستودع الرئيسي', type: 'إدخال',  qty: 150, status: 'مكتمل' },
  { id: '#WM-20260329-00005', date: '2026-03-29', warehouse: 'مستودع طرابلس',    type: 'إخراج',  qty: 80,  status: 'مكتمل' },
  { id: '#WM-20260320-00004', date: '2026-03-20', warehouse: 'مستودع بنغازي',    type: 'تحويل',  qty: 200, status: 'مكتمل' },
  { id: '#WM-20260315-00003', date: '2026-03-15', warehouse: 'المستودع الرئيسي', type: 'إدخال',  qty: 300, status: 'ملغي'  },
  { id: '#WM-20260310-00002', date: '2026-03-10', warehouse: 'مستودع طرابلس',    type: 'إخراج',  qty: 50,  status: 'مكتمل' },
  { id: '#WM-20260305-00001', date: '2026-03-05', warehouse: 'مستودع بنغازي',    type: 'إدخال',  qty: 420, status: 'ملغي'  },
];

const TYPE_COLORS: Record<string, string> = {
  'إدخال':  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'إخراج':  'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  'تحويل':  'bg-blue-500/10 text-blue-600 dark:text-blue-400',
};

export default function WarehouseMovementsListPage() {
  const [movementNum, setMovementNum] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const items: ListItem[] = RAW
    .filter((x) => {
      if (movementNum && !x.id.includes(movementNum)) return false;
      if (fromDate && x.date < fromDate) return false;
      if (toDate && x.date > toDate) return false;
      return true;
    })
    .map((x) => ({
      id: x.id,
      date: x.date,
      status: x.status,
      subtitle: x.warehouse,
      meta: (
        <div className="flex items-center gap-2">
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-[8px] flex items-center gap-1 ${TYPE_COLORS[x.type]}`}>
            {x.type === 'إدخال' ? <ArrowDownCircle className="w-3 h-3" /> : x.type === 'إخراج' ? <ArrowUpCircle className="w-3 h-3" /> : null}
            {x.type}
          </span>
          <span className="text-[15px] font-black text-slate-700 dark:text-white/80">{x.qty} <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">قطعة</span></span>
        </div>
      ),
      detailsHref: `/warehouse/movements/${encodeURIComponent(x.id)}`,
    }));

  const filterPanel = (
    <div className="flex flex-col gap-4">
      <ModernInput label="رقم الحركة" placeholder="#WM-..." value={movementNum} onChange={setMovementNum} />
      <ModernSelect label="المستودع" options={['الكل', 'المستودع الرئيسي', 'مستودع طرابلس', 'مستودع بنغازي']} placeholder="الكل" />
      <ModernSelect label="نوع الحركة" options={['الكل', 'إدخال', 'إخراج', 'تحويل']} placeholder="الكل" />
      <DateInput label="من تاريخ" value={fromDate} onChange={setFromDate} />
      <DateInput label="إلى تاريخ" value={toDate} onChange={setToDate} />
      <button className="spatial-button w-full h-12 rounded-[18px] flex items-center justify-center gap-2 font-bold text-[15px]">
        <Search className="w-4 h-4" />بحث
      </button>
    </div>
  );

  return (
    <ListPage
      title="المخزن"
      breadcrumb="حركات المخزن"
      tabs={TABS}
      statusConfig={STATUS_CONFIG}
      items={items}
      filterPanel={filterPanel}
      filterTitle="فلترة متقدمة"
      emptyText="لا توجد حركات"
    />
  );
}
