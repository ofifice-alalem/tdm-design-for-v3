import { useState } from 'react';
import { Upload, CheckCircle2 } from 'lucide-react';

export function UploadArea() {
  const [file, setFile] = useState<File | null>(null);

  if (file) {
    return (
      <div className="flex items-center justify-between px-4 py-3 rounded-[20px] bg-emerald-500/10 border border-emerald-500/25">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-black text-emerald-600 dark:text-emerald-400">تم تحميل الصورة</span>
            <span className="text-[11px] font-bold text-slate-400 dark:text-white/40 truncate max-w-[160px]">{file.name}</span>
          </div>
        </div>
        <button onClick={() => setFile(null)} className="text-[12px] font-black text-red-500 hover:text-red-600 transition-colors shrink-0">
          إلغاء الصورة
        </button>
      </div>
    );
  }

  return (
    <label className="flex flex-col items-center justify-center gap-3 h-36 rounded-[20px] border-2 border-dashed border-black/15 dark:border-white/15 hover:border-primary/40 cursor-pointer transition-all group">
      <input type="file" accept="image/png,image/jpg,image/jpeg" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <Upload className="w-8 h-8 text-slate-400 dark:text-white/30 group-hover:text-primary transition-colors" />
      <div className="text-center">
        <p className="text-[13px] font-black text-slate-600 dark:text-white/60 group-hover:text-primary transition-colors">اضغط للرفع أو اسحب الصورة</p>
        <p className="text-[11px] font-bold text-slate-400 dark:text-white/30 mt-1">PNG, JPG أو JPEG (الحد الأقصى 2MB)</p>
      </div>
    </label>
  );
}
