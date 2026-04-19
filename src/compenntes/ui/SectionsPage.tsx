import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface SectionItem {
  title: string;
  sub: string;
  to: string;
  icon: React.ReactNode;
  accent: string;
}

interface Section {
  title: string;
  items: SectionItem[];
}

interface SectionsPageProps {
  sections: Section[];
}

function Card({ item, i }: { item: SectionItem; i: number }) {
  return (
    <Link
      to={item.to}
      className="spatial-card group flex flex-col gap-4 p-4 border border-black/10 dark:border-white/[0.12] hover:border-black/20 dark:hover:border-white/25 hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center ${item.accent}`}>
          <span className="[&>svg]:w-4 [&>svg]:h-4">{item.icon}</span>
        </div>
        <span className="text-[32px] lg:text-[40px] font-black text-black/5 dark:text-white/10 leading-none">
          {String(i + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <span className="text-[15px] lg:text-[19px] font-black text-slate-800 dark:text-white">{item.title}</span>
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 flex-1">{item.sub}</span>
          <ChevronLeft className={`w-4 h-4 lg:w-5 lg:h-5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity ${item.accent.split(' ')[1]}`} />
        </div>
      </div>
    </Link>
  );
}

export function SectionsPage({ sections }: SectionsPageProps) {
  return (
    <div className="pt-6 flex flex-col gap-6 lg:gap-10">
      {sections.map((section) => (
        <div key={section.title} className="flex flex-col gap-3 lg:gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-[11px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest shrink-0">
              {section.title}
            </h2>
            <div className="flex-1 h-px bg-black/5 dark:bg-white/10" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {section.items.map((item, i) => (
              <Card key={item.to} item={item} i={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
