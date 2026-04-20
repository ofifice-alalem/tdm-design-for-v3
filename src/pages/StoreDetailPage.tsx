import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Receipt, Wallet, TrendingUp, TrendingDown, Store, CheckCircle2 } from 'lucide-react';
import { SpatialCard } from '../compenntes/ui/SpatialComponents';

function fmt(n: number) {
  return Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const STORES_DATA: Record<string, {
  name: string; owner: string; phone: string; marketer: string; active: boolean;
  summary: { sales: number; payments: number; returns: number; pendingReceipts: number; totalDebt: number; type: string; approved: number; pending: number; };
  transactions: { type: 'فاتورة مبيعات' | 'إيصال قبض'; id: string; date: string; marketer: string; amount: number; }[];
}> = {
  '1': {
    name: 'الصحن الفضى / محمد البحلرى', owner: 'محمد البحلرى', phone: '0912345678', marketer: 'محمد البحري', active: true,
    summary: { sales: 21193, payments: 8550, returns: 0, pendingReceipts: -8550, totalDebt: 12643, type: 'مدين', approved: 21193, pending: -8550 },
    transactions: [
      { type: 'فاتورة مبيعات', id: 'SI-20260325-00147',  date: '06 Apr 2026', marketer: 'محمد البحري', amount: 3920 },
      { type: 'إيصال قبض',    id: 'RCP-20260326-00088', date: '06 Apr 2026', marketer: 'محمد البحري', amount: -1600 },
      { type: 'إيصال قبض',    id: 'RCP-20260325-00076', date: '25 Mar 2026', marketer: 'محمد البحري', amount: -3000 },
      { type: 'إيصال قبض',    id: 'RCP-20260323-00011', date: '23 Mar 2026', marketer: 'محمد البحري', amount: -5000 },
      { type: 'إيصال قبض',    id: 'RCP-20260323-00017', date: '23 Mar 2026', marketer: 'محمد البحري', amount: -270 },
      { type: 'إيصال قبض',    id: 'RCP-20260323-00018', date: '23 Mar 2026', marketer: 'محمد البحري', amount: -1855 },
    ],
  },
  '4': {
    name: 'محل المتفوق محمد البحرى', owner: 'محمد البحيري', phone: '0945678901', marketer: 'محمد البحري', active: true,
    summary: { sales: 25225, payments: 23335, returns: 0, pendingReceipts: -11610, totalDebt: 1890, type: 'مدين', approved: 13500, pending: -11610 },
    transactions: [
      { type: 'فاتورة مبيعات', id: 'SI-20260325-00147',  date: '06 Apr 2026', marketer: 'محمد البحري', amount: 3920 },
      { type: 'إيصال قبض',    id: 'RCP-20260326-00088', date: '06 Apr 2026', marketer: 'محمد البحري', amount: -1600 },
      { type: 'إيصال قبض',    id: 'RCP-20260325-00076', date: '25 Mar 2026', marketer: 'محمد البحري', amount: -3000 },
      { type: 'إيصال قبض',    id: 'RCP-20260323-00011', date: '23 Mar 2026', marketer: 'محمد البحري', amount: -5000 },
      { type: 'إيصال قبض',    id: 'RCP-20260323-00017', date: '23 Mar 2026', marketer: 'محمد البحري', amount: -270 },
      { type: 'إيصال قبض',    id: 'RCP-20260323-00018', date: '23 Mar 2026', marketer: 'محمد البحري', amount: -1855 },
      { type: 'فاتورة مبيعات', id: 'SI-20260310-00106',  date: '11 Mar 2026', marketer: 'محمد البحري', amount: 6200 },
      { type: 'فاتورة مبيعات', id: 'SI-20260310-00130',  date: '11 Mar 2026', marketer: 'محمد البحري', amount: 5250 },
      { type: 'فاتورة مبيعات', id: 'INV-OLD-00003',      date: '06 Mar 2026', marketer: 'النظام',       amount: 9855 },
    ],
  },
};

const TX_CONFIG = {
  'فاتورة مبيعات': { icon: <Receipt className="w-4 h-4" />,  bg: 'bg-primary/10',     text: 'text-primary',     color: 'text-emerald-500' },
  'إيصال قبض':    { icon: <Wallet className="w-4 h-4" />,   bg: 'bg-teal-500/10',    text: 'text-teal-500',    color: 'text-rose-500' },
};

export default function StoreDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const store = STORES_DATA[id ?? '4'] ?? STORES_DATA['4'];
  const s = store.summary;

  return (
    <div className="flex flex-col gap-6 overflow-y-auto custom-scroll pb-32 lg:pb-6">

      {/* Header */}
      <div className="flex flex-col gap-3">
        <button onClick={() => navigate(-1)} className="self-start flex items-center gap-2 px-4 h-11 rounded-[16px] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-slate-600 dark:text-white/70 font-bold text-[14px] transition-all">
          <ArrowRight className="w-4 h-4" />العودة للمتاجر
        </button>
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-bold text-slate-400 dark:text-white/40">عرض التفاصيل، السجل، الحركات المالية</span>
          <span className="text-[22px] font-black text-slate-800 dark:text-white">{store.name}</span>
        </div>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:items-start">

        {/* Main — transactions */}
        <div className="flex-1 min-w-0">
          <SpatialCard title="سجل الحركات المالية">
            <div className="flex flex-col gap-0">
              {store.transactions.map((tx, i) => {
                const cfg = TX_CONFIG[tx.type];
                const isPositive = tx.amount > 0;
                return (
                  <div key={i} className={`flex items-center gap-4 py-4 ${i < store.transactions.length - 1 ? 'border-b border-black/5 dark:border-white/[0.05]' : ''}`}>
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center shrink-0 ${cfg.bg} ${cfg.text}`}>
                      {cfg.icon}
                    </div>
                    {/* Info */}
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <span className={`text-[12px] font-black ${cfg.text}`}>{tx.type}</span>
                      <span className="text-[14px] font-black text-slate-800 dark:text-white">{tx.id}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">{tx.date}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20" />
                        <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">{tx.marketer}</span>
                      </div>
                    </div>
                    {/* Amount */}
                    <div className="flex flex-col items-end gap-0.5 shrink-0">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">المبلغ الإجمالي</span>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-[16px] font-black ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {isPositive ? '+' : '-'}{fmt(tx.amount)}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">دينار</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </SpatialCard>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 flex flex-col gap-5">

          {/* بيانات المتجر */}
          <SpatialCard title="بيانات المتجر">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-[12px] bg-primary/10 flex items-center justify-center">
                    <Store className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex flex-col gap-0">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">المالك المسؤول</span>
                    <span className="text-[14px] font-black text-slate-800 dark:text-white">{store.owner}</span>
                  </div>
                </div>
                <span className={`text-[12px] font-black px-2.5 py-1 rounded-[8px] flex items-center gap-1 ${store.active ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-slate-500/10 text-slate-500'}`}>
                  {store.active && <CheckCircle2 className="w-3 h-3" />}
                  {store.active ? 'نشط' : 'موقوف'}
                </span>
              </div>
              <div className="h-px bg-black/5 dark:bg-white/5" />
              {[
                { label: 'رقم الهاتف',       value: store.phone },
                { label: 'المسوق المسؤول',   value: store.marketer },
              ].map((f) => (
                <div key={f.label} className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">{f.label}</span>
                  <span className="text-[13px] font-black text-slate-700 dark:text-white/80">{f.value}</span>
                </div>
              ))}
            </div>
          </SpatialCard>

          {/* الملخص المالي */}
          <SpatialCard title="الملخص المالي">
            <div className="flex flex-col gap-0">
              {[
                { label: 'المبيعات',        value: s.sales,           color: 'text-primary',     icon: <TrendingUp className="w-3.5 h-3.5" /> },
                { label: 'المدفوعات',       value: s.payments,        color: 'text-emerald-500', icon: <Wallet className="w-3.5 h-3.5" /> },
                { label: 'المرتجعات',       value: s.returns,         color: 'text-orange-500',  icon: <TrendingDown className="w-3.5 h-3.5" /> },
              ].map((row, i) => (
                <div key={row.label} className={`flex items-center justify-between py-3 ${i < 2 ? 'border-b border-black/5 dark:border-white/5' : ''}`}>
                  <div className={`flex items-center gap-1.5 text-[13px] font-bold text-slate-500 dark:text-white/50 ${row.color}`}>
                    {row.icon}
                    <span className="text-slate-500 dark:text-white/50">{row.label}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[14px] font-black text-slate-700 dark:text-white/80">{fmt(row.value)}</span>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-white/30">د</span>
                  </div>
                </div>
              ))}

              <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/10 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">إيصالات معلقة</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[13px] font-black text-rose-500">- {fmt(s.pendingReceipts)}</span>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-white/30">دينار</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5">
                  <span className="text-[14px] font-black text-slate-700 dark:text-white/80">إجمالي الدين</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-black px-2 py-0.5 rounded-[6px] ${s.type === 'دائن' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-500'}`}>
                      {s.type}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[18px] font-black text-slate-800 dark:text-white">{fmt(s.totalDebt)}</span>
                      <span className="text-[11px] font-bold text-slate-400 dark:text-white/40">دينار</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/10 grid grid-cols-2 gap-3">
                {[
                  { label: 'معتمد', value: s.approved, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/5' },
                  { label: 'معلق',  value: s.pending,  color: 'text-rose-500',                          bg: 'bg-rose-500/5' },
                ].map((item) => (
                  <div key={item.label} className={`flex flex-col gap-1 p-3 rounded-[14px] ${item.bg}`}>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">{item.label}</span>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-[15px] font-black ${item.color}`}>{fmt(item.value)}</span>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-white/30">د</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SpatialCard>

        </div>
      </div>
    </div>
  );
}
