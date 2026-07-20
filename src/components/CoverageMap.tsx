import { useState } from 'react';
import { MapPin, Clock, Compass, Navigation } from 'lucide-react';
import { riyadhRegions } from '../data';

export default function CoverageMap() {
  const [activeRegionId, setActiveRegionId] = useState<string>('north-riyadh');

  const selectedRegion = riyadhRegions.find((r) => r.id === activeRegionId);

  return (
    <section id="coverage" className="py-24 bg-slate-900/40 border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-amber-500 text-sm font-extrabold uppercase tracking-widest">تغطية جغرافية كاملة وسريعة</h2>
          <p className="text-3xl sm:text-4xl font-black text-white">تغطية شاملة لكل أحياء الرياض</p>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            لدينا أسطول من سيارات الصيانة المتنقلة الموزعة استراتيجياً في كافة مناطق الرياض لضمان سرعة الاستجابة والوصول إليك في موقعك بأسرع وقت ممكن.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Regions Tabs Selector (Right-aligned) */}
          <div className="lg:col-span-4 space-y-3 order-1 lg:order-2">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-4">اختر منطقتك بالرياض:</h3>
            <div className="space-y-2">
              {riyadhRegions.map((region) => {
                const isActive = activeRegionId === region.id;
                return (
                  <button
                    key={region.id}
                    onClick={() => setActiveRegionId(region.id)}
                    className={`w-full text-right p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                      isActive
                        ? 'bg-gradient-to-l from-slate-900 to-slate-950 border-amber-500/60 shadow-lg text-white'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`p-2.5 rounded-xl border transition-colors ${
                        isActive ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}>
                        <Compass size={18} className={isActive ? 'animate-spin' : ''} style={{ animationDuration: '6s' }} />
                      </span>
                      <div>
                        <h4 className="text-sm sm:text-base font-extrabold">{region.name}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">وقت الوصول المتوقع: {region.arrivalTime}</p>
                      </div>
                    </div>
                    <MapPin size={16} className={isActive ? 'text-amber-500' : 'text-slate-700'} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Region Neighborhoods Detail View */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            {selectedRegion && (
              <div className="bg-slate-950 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl relative overflow-hidden animate-fadeIn">
                
                {/* Visual grid accent */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl"></div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-6">
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                      <Navigation size={22} className="text-amber-500 rotate-45" />
                      <span>الأحياء المغطاة في {selectedRegion.name}</span>
                    </h3>
                    <p className="text-xs text-slate-400">سيارات الصيانة لدينا مجهزة ومتواجدة حالياً بالقرب من هذه الأحياء.</p>
                  </div>
                  <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold px-3 py-2 rounded-xl">
                    <Clock size={14} />
                    <span>متوسط وقت الوصول: {selectedRegion.arrivalTime}</span>
                  </div>
                </div>

                {/* Neighborhoods Tags Grid */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">الأحياء المتاحة فوراً:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedRegion.neighborhoods.map((neighborhood, index) => (
                      <div
                        key={index}
                        className="bg-slate-900 border border-slate-800/60 hover:border-slate-800 hover:bg-slate-850 px-4 py-3.5 rounded-xl text-slate-300 font-bold text-xs sm:text-sm text-center transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>حي {neighborhood}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Riyadh Call Info Block */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-right space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-white">هل حيك غير متواجد في القائمة؟</h4>
                    <p className="text-[11px] sm:text-xs text-slate-400">لا تقلق، اتصل بمهندس الصيانة للتأكد من توفر فني قريب من موقعك الحالي بالرياض.</p>
                  </div>
                  <a
                    href="tel:0561241984"
                    className="shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-1.5"
                  >
                    <span>تأكيد الموقع</span>
                  </a>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
