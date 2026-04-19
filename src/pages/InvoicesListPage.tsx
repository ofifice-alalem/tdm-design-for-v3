import { useState } from 'react';
import { SlidersHorizontal, Search, FileText, ChevronDown } from 'lucide-react';
import { AppShell } from '../compenntes/layout';
import { SpatialCard, ModernInput, ModernSelect } from '../compenntes/ui/SpatialComponents';

type Status = 'الكل' | 'قيد الانتظار' | 'موثق' | 'مرفوض' | 'ملغي';

const STATUS_TABS: Status[] = ['الكل', 'قيد الانتظار', 'موثق', 'مرفوض', 'ملغي'];

const STATUS_STYLE: Record<Status, string> = {
  'الكل':          '',
  'قيد الانتظار': 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20',
  'موثق':          'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
  'مرفوض':         'bg-red-500/10 text-red-500 border border-red-500/20',
  'ملغي':          'bg-slate-500/10 text-slate-500 dark:text-white/40 border border-slate-500/20',
};

const INVOICES = [
  { id: '#SI-20260316-00139', date: '2026-03-16', client: 'شركة طريق المطار احمد علي',  amount: 3150,  status: 'موثق' as Status },
  { id: '#SI-20260316-00138', date: '2026-03-16', client: 'الزاهد الكريمية',             amount: 4200,  status: 'موثق' as Status },
  { id: '#SI-20260316-00137', date: '2026-03-16', client: 'شركة طريق المطار احمد علي',  amount: 3150,  status: 'موثق' as Status },
  { id: '#SI-20260315-00136', date: '2026-03-15', client: 'مؤسسة النور للتجارة',         amount: 1800,  status: 'قيد الانتظار' as Status },
  { id: '#SI-20260315-00135', date: '2026-03-15', client: 'الزاهد الكريمية',             amount: 950,   status: 'مرفوض' as Status },
  { id: '#SI-20260314-00134', date: '2026-03-14', client: 'شركة الأمل',                  amount: 2300,  status: 'ملغي' as Status },
];

function fmt(n: number) {
  return n % 1 === 0
    ? n.toLocaleString('en-US')
    : n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function InvoicesListPage() {
  const [activeTab, setActiveTab] = useState<Status>('الكل');
  const [filterOpen, setFilterOpen] = useState(false);
  const [invoiceNum, setInvoiceNum] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const filtered = INVOICES.filter((inv) => {
    if (activeTab !== 'الكل' && inv.status !== activeTab) return false;
    if (invoiceNum && !inv.id.includes(invoiceNum)) return false;
    if (fromDate && inv.date < fromDate) return false;
    if (toDate && inv.date > toDate) return false;
    return true;
  });

  const filterPanel = (
    <div className="flex flex-col gap-4">
      <ModernInput label="رقم الفاتورة" placeholder="#SI-..." value={invoiceNum} onChange={setInvoiceNum} />
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-700 dark:text-white/75 uppercase tracking-widest">من تاريخ</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="spatial-input h-14 rounded-[20px] px-5 text-[15px] font-bold w-full [color-scheme:light] dark:[color-scheme:dark]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-700 dark:text-white/75 uppercase tracking-widest">إلى تاريخ</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="spatial-input h-14 rounded-[20px] px-5 text-[15px] font-bold w-full [color-scheme:light] dark:[color-scheme:dark]"
        />
      </div>
      <ModernSelect label="المتجر" options={['المتجر الرئيسي - طرابلس', 'فرع بنغازي', 'فرع مصراتة']} placeholder="الكل" />
      <ModernSelect label="المسوق" options={['أحمد علي', 'محمد حسن', 'سارة خالد']} placeholder="الكل" />
      <button className="spatial-button w-full h-12 rounded-[18px] flex items-center justify-center gap-2 font-bold text-[15px]">
        <Search className="w-4 h-4" />
        بحث
      </button>
    </div>
  );

  return (
    <AppShell>
      <div className="flex flex-col gap-6 h-full">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-400 dark:text-white/30 font-bold">
            <span className="text-slate-700 dark:text-white/80 text-lg font-black">الفواتير</span>
          </div>
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

          {/* Invoices List */}
          <div className="flex-1 min-w-0 flex flex-col gap-4 overflow-y-auto custom-scroll pb-6">

            {/* Status Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
              {STATUS_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 h-9 rounded-[12px] font-bold text-[13px] transition-all border ${
                    activeTab === tab
                      ? 'bg-primary border-primary text-white'
                      : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-slate-600 dark:text-white/60 hover:border-primary/30 hover:text-primary'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Invoice Cards */}
            {filtered.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 py-20 text-slate-400 dark:text-white/30">
                <FileText className="w-12 h-12 opacity-30" />
                <span className="font-bold text-[15px]">لا توجد فواتير</span>
              </div>
            ) : (
              filtered.map((inv) => (
                <div key={inv.id} className="spatial-card overflow-hidden flex flex-col sm:flex-row sm:items-stretch">

                  {/* Status strip */}
                  <div className={`flex sm:flex-col sm:w-24 shrink-0 items-center sm:justify-center justify-between px-4 py-3 sm:px-3 sm:py-0 border-b sm:border-b-0 sm:border-l border-black/5 dark:border-white/5 ${
                    inv.status === 'موثق'          ? 'bg-emerald-500/10 dark:bg-emerald-500/15'
                    : inv.status === 'قيد الانتظار' ? 'bg-yellow-500/10 dark:bg-yellow-500/15'
                    : inv.status === 'مرفوض'         ? 'bg-red-500/10 dark:bg-red-500/15'
                    : 'bg-slate-500/10 dark:bg-slate-500/10'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 sm:hidden ${
                        inv.status === 'موثق'          ? 'bg-emerald-500'
                        : inv.status === 'قيد الانتظار' ? 'bg-yellow-500'
                        : inv.status === 'مرفوض'         ? 'bg-red-500'
                        : 'bg-slate-400'
                      }`} />
                      <span className={`text-[13px] font-black ${
                        inv.status === 'موثق'          ? 'text-emerald-600 dark:text-emerald-400'
                        : inv.status === 'قيد الانتظار' ? 'text-yellow-600 dark:text-yellow-400'
                        : inv.status === 'مرفوض'         ? 'text-red-500'
                        : 'text-slate-500 dark:text-white/40'
                      }`}>{inv.status}</span>
                    </div>
                    <span className="sm:hidden text-[13px] font-black text-primary">{inv.id}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center min-w-0 px-4 py-3 gap-2 sm:gap-5">

                    {/* PC: رقم + تاريخ + عميل */}
                    <div className="hidden sm:flex flex-col gap-1 flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="text-[15px] font-black text-primary">{inv.id}</span>
                        <span className="text-[12px] font-bold text-slate-500 dark:text-white/60 bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-[8px]">{inv.date}</span>
                      </div>
                      <span className="text-[14px] font-bold text-slate-600 dark:text-white/60 truncate">{inv.client}</span>
                    </div>

                    {/* موبايل: تاريخ */}
                    <span className="sm:hidden text-[12px] font-bold text-slate-500 dark:text-white/60 bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-[8px] self-start">{inv.date}</span>

                    {/* اسم العميل - موبايل فقط */}
                    <span className="sm:hidden text-[15px] font-black text-slate-800 dark:text-white truncate">{inv.client}</span>

                    {/* المبلغ + زر */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 mt-1 sm:mt-0 shrink-0">
                      <div className="flex items-baseline gap-1">
                        <span className="text-[20px] font-black text-primary">{fmt(inv.amount)}</span>
                        <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">دينار</span>
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

          {/* PC Filter Sidebar - يمين */}
          <div className="hidden lg:block w-[320px] shrink-0 mt-14">
            <SpatialCard title="فلترة متقدمة" icon={<SlidersHorizontal className="w-4 h-4" />}>
              {filterPanel}
            </SpatialCard>
          </div>

        </div>
      </div>
    </AppShell>
  );
}
