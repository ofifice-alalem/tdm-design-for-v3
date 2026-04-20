import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Save, Building2 } from 'lucide-react';
import { SpatialCard, ModernInput } from '../compenntes/ui/SpatialComponents';

const COMPANIES_DATA: Record<string, {
  name: string; owner: string; phone: string; location: string; address: string; active: boolean;
}> = {
  '1': { name: 'شركة العالم', owner: 'محمد أحمد', phone: '0912345678', location: 'طرابلس', address: 'شارع الجمهورية', active: true },
  '2': { name: 'شركة النجاح', owner: 'علي محمود', phone: '0921234567', location: 'بنغازي', address: 'شارع عمر المختار', active: true },
  '3': { name: 'شركة الأمل', owner: 'خالد عبدالله', phone: '0934567890', location: 'مصراتة', address: 'شارع طرابلس', active: true },
};

export default function EditCompanyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const company = COMPANIES_DATA[id ?? '1'] ?? COMPANIES_DATA['1'];

  const [name, setName] = useState(company.name);
  const [owner, setOwner] = useState(company.owner);
  const [phone, setPhone] = useState(company.phone);
  const [location, setLocation] = useState(company.location);
  const [address, setAddress] = useState(company.address);
  const [active, setActive] = useState(company.active);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <button onClick={() => navigate(-1)} className="self-start flex items-center gap-2 px-4 h-11 rounded-[16px] bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-slate-600 dark:text-white/70 font-bold text-[14px] transition-all">
          <ArrowRight className="w-4 h-4" />عودة
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-bold text-slate-400 dark:text-white/40">تعديل البيانات</span>
            <span className="text-[20px] font-black text-slate-800 dark:text-white">تعديل بيانات الشركة</span>
            <span className="text-[13px] font-bold text-primary mt-0.5">{company.name}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start w-full pb-36 lg:pb-0">
        {/* Main */}
        <div className="w-full lg:flex-1 lg:min-w-0 flex flex-col gap-5">
          <SpatialCard title="بيانات الشركة">
            <div className="flex flex-col gap-4">
              <ModernInput label="اسم الشركة *" placeholder="مثال: شركة العالم" value={name} onChange={setName} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ModernInput label="اسم المالك *" placeholder="اسم المالك" value={owner} onChange={setOwner} />
                <ModernInput label="رقم الهاتف" placeholder="09XXXXXXXX" value={phone} onChange={setPhone} />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ModernInput label="المدينة" placeholder="المدينة" value={location} onChange={setLocation} />
                <ModernInput label="العنوان التفصيلي" placeholder="الشارع، الحي..." value={address} onChange={setAddress} />
              </div>
            </div>
          </SpatialCard>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-[340px] xl:w-[380px] shrink-0 flex flex-col gap-5 lg:sticky lg:top-0 lg:self-start">
          <SpatialCard title="حالة الشركة">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] font-black text-slate-800 dark:text-white">
                  {active ? 'الشركة نشطة' : 'الشركة موقوفة'}
                </span>
                <span className="text-[12px] font-bold text-slate-400 dark:text-white/40">
                  تفعيل أو إلغاء تفعيل الشركة
                </span>
              </div>
              <button
                onClick={() => setActive(!active)}
                className={`relative w-14 h-7 rounded-full transition-all duration-300 ${active ? 'bg-primary' : 'bg-black/10 dark:bg-white/10'}`}
              >
                <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${active ? 'right-1' : 'right-8'}`} />
              </button>
            </div>
          </SpatialCard>

          <div className="flex flex-col gap-3 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:z-[100] max-lg:bg-white/95 max-lg:dark:bg-slate-900/95 max-lg:px-5 max-lg:py-4 max-lg:backdrop-blur-xl max-lg:rounded-t-[24px] max-lg:border-t max-lg:border-black/10 max-lg:dark:border-white/10">
            <button className="spatial-button w-full h-12 rounded-[16px] flex items-center justify-center gap-2 font-bold text-[14px]">
              <Save className="w-4 h-4" />حفظ التعديلات
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full h-12 rounded-[16px] border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-white/70 font-bold text-[14px] transition-all"
            >
              إلغاء
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
