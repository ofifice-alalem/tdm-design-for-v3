import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, FileText, ChevronDown } from 'lucide-react';
import { SpatialCard } from '../ui/SpatialComponents';
import type { StatusConfig, ListItem } from './listPage.types';

export type { StatusConfig, ListItem } from './listPage.types';

interface ListPageProps {
  title: string;
  breadcrumb?: string;
  emptyText?: string;
  tabs: string[];
  statusConfig: Record<string, StatusConfig>;
  items: ListItem[];
  filterPanel: React.ReactNode;
  filterTitle?: string;
}

export function ListPage({
  title,
  breadcrumb,
  emptyText = 'لا توجد نتائج',
  tabs,
  statusConfig,
  items,
  filterPanel,
  filterTitle = 'فلترة',
}: ListPageProps) {
  const [activeTab, setActiveTab] = useState('الكل');
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = activeTab === 'الكل' ? items : items.filter((x) => x.status === activeTab);

  return (
    <div className="flex flex-col gap-6 pb-32 lg:pb-0">

        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="text-slate-700 dark:text-white/80 text-lg font-black">{title}</span>
          {breadcrumb && (
            <>
              <span className="text-slate-400 dark:text-white/30 font-bold">/</span>
              <span className="text-slate-500 dark:text-white/50 font-bold text-[15px]">{breadcrumb}</span>
            </>
          )}
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="w-full flex items-center justify-between px-5 h-12 rounded-[18px] spatial-input font-bold text-[14px] text-slate-700 dark:text-white/70"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              {filterTitle}
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
        <div className="flex gap-6">

          {/* List */}
          <div className="flex-1 min-w-0 flex flex-col gap-4 pb-6">

            {/* Status Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
              {tabs.map((tab) => (
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

            {/* Cards */}
            {filtered.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 py-20 text-slate-400 dark:text-white/30">
                <FileText className="w-12 h-12 opacity-30" />
                <span className="font-bold text-[15px]">{emptyText}</span>
              </div>
            ) : (
              filtered.map((item) => {
                const sc = statusConfig[item.status] ?? { bg: '', text: 'text-slate-500', dot: 'bg-slate-400' };
                return (
                  <div key={item.id} className="spatial-card overflow-hidden flex flex-col sm:flex-row sm:items-stretch">

                    {/* Status strip */}
                    <div className={`flex sm:flex-col sm:w-24 shrink-0 items-center sm:justify-center justify-between px-4 py-3 sm:px-3 sm:py-0 border-b sm:border-b-0 sm:border-l border-black/5 dark:border-white/5 ${sc.bg}`}>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full shrink-0 sm:hidden ${sc.dot}`} />
                        <span className={`text-[13px] font-black ${sc.text}`}>{item.status}</span>
                      </div>
                      <span className="sm:hidden text-[13px] font-black text-primary">{item.id}</span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center min-w-0 px-4 py-3 gap-2 sm:gap-5">

                      {/* PC */}
                      <div className="hidden sm:flex flex-col gap-1 flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="text-[15px] font-black text-primary">{item.id}</span>
                          <span className="text-[12px] font-bold text-slate-500 dark:text-white/60 bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-[8px]">{item.date}</span>
                        </div>
                        <span className="text-[14px] font-bold text-slate-600 dark:text-white/60 truncate">{item.subtitle}</span>
                      </div>

                      {/* Mobile */}
                      <span className="sm:hidden text-[12px] font-bold text-slate-500 dark:text-white/60 bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-[8px] self-start">{item.date}</span>
                      <span className="sm:hidden text-[15px] font-black text-slate-800 dark:text-white truncate">{item.subtitle}</span>

                      {/* Meta + Action */}
                      <div className="flex items-center justify-between sm:justify-end gap-4 mt-1 sm:mt-0 shrink-0">
                        {item.meta}
                        {item.detailsHref ? (
                          <Link to={item.detailsHref} className="px-4 h-9 rounded-[12px] bg-black/5 dark:bg-white/5 hover:bg-primary hover:text-white border border-black/10 dark:border-white/10 hover:border-primary text-slate-600 dark:text-white/60 font-bold text-[13px] transition-all shrink-0 flex items-center">
                            التفاصيل
                          </Link>
                        ) : (
                          <button className="px-4 h-9 rounded-[12px] bg-black/5 dark:bg-white/5 hover:bg-primary hover:text-white border border-black/10 dark:border-white/10 hover:border-primary text-slate-600 dark:text-white/60 font-bold text-[13px] transition-all shrink-0">
                            التفاصيل
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* PC Filter Sidebar */}
          <div className="hidden lg:block w-[320px] shrink-0 mt-14">
            <SpatialCard title={filterTitle} icon={<SlidersHorizontal className="w-4 h-4" />}>
              {filterPanel}
            </SpatialCard>
          </div>

        </div>
      </div>
  );
}
