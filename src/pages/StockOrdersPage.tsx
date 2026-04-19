import { useState } from 'react';
import { SlidersHorizontal, Search, FileText, ChevronDown, Package } from 'lucide-react';
import { AppShell } from '../compenntes/layout';
import { SpatialCard, ModernInput, ModernSelect } from '../compenntes/ui/SpatialComponents';

type Status = 'الكل' | 'قيد الانتظار' | 'تمت الموافقة' | 'موثق' | 'مرفوض' | 'ملغي';

const STATUS_TABS: Status[] = ['الكل', 'قيد الانتظار', 'تمت الموافقة', 'موثق', 'مرفوض', 'ملغي'];

const STATUS_COLOR: Record<Status, { bg: string; text: string; dot: string }> = {
  'الكل':            { bg: '', text: '', dot: '' },
  'قيد الانتظار':   { bg: 'bg-yellow-500/10 dark:bg-yellow-500/15',  text: 'text-yellow-600 dark:text-yellow-400', dot: 'bg-yellow-500' },
  'تمت الموافقة':   { bg: 'bg-blue-500/10 dark:bg-blue-500/15',      text: 'text-blue-600 dark:text-blue-400',    dot: 'bg-blue-500' },
  'موثق':            { bg: 'bg-emerald-500/10 dark:bg-emerald-500/15', text: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
  'مرفوض':           { bg: 'bg-red-500/10 dark:bg-red-500/15',         text: 'text-red-500',                        dot: 'bg-red-500' },
  'ملغي':            { bg: 'bg-slate-500/10 dark:bg-slate-500/10',     text: 'text-slate-500 dark:text-white/40',   dot: 'bg-slate-400' },
};

const ORDERS = [
  { id: '#MR-20260406-00006', date: '2026-04-06', marketer: 'محمد البحري',   products: 1, status: 'موثق' as Status },
  { id: '#MR-20260329-00005', date: '2026-03-29', marketer: 'محمد البحري',   products: 1, status: 'موثق' as Status },
  { id: '#MR-20260320-00004', date: '2026-03-20', marketer: 'أحمد علي',      products: 3, status: 'قيد الانتظار' as Status },
  { id: '#MR-20260315-00003', date: '2026-03-15', marketer: 'سارة خالد',     products: 2, status: 'تمت الموافقة' as Status },
  { id: '#MR-20260310-00002', date: '2026-03-10', marketer: 'أحمد علي',      products: 1, status: 'مرفوض' as Status },
  { id: '#MR-20260305-00001', date: '2026-03-05', marketer: 'محمد البحري',   products: 4, status: 'ملغي' as Status },
];

export default function StockOrdersPage() {
  const [activeTab, setActiveTab] = useState<Status>('الكل');
  const [filterOpen, setFilterOpen] = useState(false);
  const [orderNum, setOrderNum] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const filtered = ORDERS.filter((o) => {
    if (activeTab !== 'الكل' && o.status !== activeTab) return false;
    if (orderNum && !o.id.includes(orderNum)) return false;
    if (fromDate && o.date < fromDate) return false;
    if (toDate && o.date > toDate) return false;
    return true;
  });

  const filterPanel = (
    <div className="flex flex-col gap-4">
      <ModernInput label="رقم الطلب" placeholder="#MR-..." value={orderNum} onChange={setOrderNum} />
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-700 dark:text-white/75 uppercase tracking-widest">من تاريخ</label>
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)}
          className="spatial-input h-14 rounded-[20px] px-5 text-[15px] font-bold w-full [color-scheme:light] dark:[color-scheme:dark]" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-700 dark:text-white/75 uppercase tracking-widest">إلى تاريخ</label>
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)}
          className="spatial-input h-14 rounded-[20px] px-5 text-[15px] font-bold w-full [color-scheme:light] dark:[color-scheme:dark]" />
      </div>
      <ModernSelect label="المسوق" options={['محمد البحري', 'أحمد علي', 'سارة خالد']} placeholder="الكل" />
      <button className="spatial-button w-full h-12 rounded-[18px] flex items-center justify-center gap-2 font-bold text-[15px]">
        <Search className="w-4 h-4" />
        فلترة
      </button>
    </div>
  );

  return (
    <AppShell>
      <div className="flex flex-col gap-6 h-full">

        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="text-slate-700 dark:text-white/80 text-lg font-black">إدارة المخزن</span>
          <span className="text-slate-400 dark:text-white/30 font-bold">/</span>
          <span className="text-slate-500 dark:text-white/50 font-bold text-[15px]">طلبات المسوقين</span>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="w-full flex items-center justify-between px-5 h-12 rounded-[18px] spatial-input font-bold text-[14px] text-slate-700 dark:text-white/70"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              فلترة متقدمة
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${filterOpen ? 'rotate-180' : ''}`} />
          </button>
          {filterOpen && (
            <div className="mt-3 spatial-card p-5 animate-in fade-in slide-in-from-top-2 duration-200">
              {filterPanel}
            </div>
          )}
        </div>

        {/* Main Layout */}
        <div className="flex gap-6 flex-1 min-h-0">

          {/* Orders List */}
          <div className="flex-1 min-w-0 flex flex-col gap-4 overflow-y-auto custom-scroll pb-6">

            {/* Status Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
              {STATUS_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 h-9 rounded-[12px] font-bold text-[13px] transition-all border shrink-0 ${
                    activeTab === tab
                      ? 'bg-primary border-primary text-white'
                      : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-slate-600 dark:text-white/60 hover:border-primary/30 hover:text-primary'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Order Cards */}
            {filtered.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 py-20 text-slate-400 dark:text-white/30">
                <FileText className="w-12 h-12 opacity-30" />
                <span className="font-bold text-[15px]">لا توجد طلبات</span>
              </div>
            ) : (
              filtered.map((order) => (
                <div key={order.id} className="spatial-card overflow-hidden flex flex-col sm:flex-row sm:items-stretch">

                  {/* Status strip */}
                  <div className={`flex sm:flex-col sm:w-24 shrink-0 items-center sm:justify-center justify-between px-4 py-3 sm:px-3 sm:py-0 border-b sm:border-b-0 sm:border-l border-black/5 dark:border-white/5 ${STATUS_COLOR[order.status].bg}`}>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 sm:hidden ${STATUS_COLOR[order.status].dot}`} />
                      <span className={`text-[13px] font-black ${STATUS_COLOR[order.status].text}`}>{order.status}</span>
                    </div>
                    <span className="sm:hidden text-[13px] font-black text-primary">{order.id}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center min-w-0 px-4 py-3 gap-2 sm:gap-5">

                    {/* PC */}
                    <div className="hidden sm:flex flex-col gap-1 flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="text-[15px] font-black text-primary">{order.id}</span>
                        <span className="text-[12px] font-bold text-slate-500 dark:text-white/60 bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-[8px]">{order.date}</span>
                      </div>
                      <span className="text-[14px] font-bold text-slate-600 dark:text-white/60">{order.marketer}</span>
                    </div>

                    {/* Mobile */}
                    <span className="sm:hidden text-[12px] font-bold text-slate-500 dark:text-white/60 bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-[8px] self-start">{order.date}</span>
                    <span className="sm:hidden text-[15px] font-black text-slate-800 dark:text-white">{order.marketer}</span>

                    {/* Products count + Action */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 mt-1 sm:mt-0 shrink-0">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-black/5 dark:bg-white/8">
                        <Package className="w-3.5 h-3.5 text-slate-400 dark:text-white/40" />
                        <span className="text-[13px] font-black text-slate-700 dark:text-white/80">{order.products} {order.products === 1 ? 'منتج' : 'منتجات'}</span>
                      </div>
                      <button className="px-4 h-9 rounded-[12px] bg-black/5 dark:bg-white/5 hover:bg-primary hover:text-white border border-black/10 dark:border-white/10 hover:border-primary text-slate-600 dark:text-white/60 font-bold text-[13px] transition-all shrink-0">
                        التفاصيل
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* PC Filter Sidebar */}
          <div className="hidden lg:block w-[320px] shrink-0 mt-14">
            <SpatialCard title="فلترة" icon={<SlidersHorizontal className="w-4 h-4" />}>
              {filterPanel}
            </SpatialCard>
          </div>

        </div>
      </div>
    </AppShell>
  );
}
