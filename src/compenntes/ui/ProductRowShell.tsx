import { Trash2 } from 'lucide-react';

export function ProductRowShell({
  title,
  onRemove,
  children,
}: {
  title: string;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="spatial-card p-4 lg:p-6 flex flex-col gap-3 lg:gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-slate-800 dark:text-white font-bold text-base">{title}</h3>
        <button
          onClick={onRemove}
          className="w-9 h-9 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center border border-red-500/30"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      {children}
    </div>
  );
}
