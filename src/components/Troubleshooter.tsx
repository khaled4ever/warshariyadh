import { useState } from 'react';
import { Activity, ShieldAlert, ArrowLeft, Calendar, Share2, MessageSquare, Wrench } from 'lucide-react';
import { symptomsData, servicesData } from '../data';
import { Symptom } from '../types';

export default function Troubleshooter({ onBookService }: { onBookService: (serviceName: string, notes: string) => void }) {
  const [selectedSymptomId, setSelectedSymptomId] = useState<string | null>(null);

  const currentSymptom = symptomsData.find((s) => s.id === selectedSymptomId);
  const recommendedService = currentSymptom
    ? servicesData.find((service) => service.id === currentSymptom.recommendedServiceId)
    : null;

  const handleShareToWhatsapp = () => {
    if (!currentSymptom || !recommendedService) return;

    const text = `مرحباً فني صيانة الرشود بالرياض،
قمت بتشخيص عطل سيارتي عبر الكاشف التفاعلي لموقعكم:

العرض المشهود:
- ${currentSymptom.text}

الأسباب المحتملة المقترحة:
${currentSymptom.possibleCauses.map((cause) => `• ${cause}`).join('\n')}

الخدمة الموصى بها:
- ${recommendedService.title}

أرغب في حجز موعد فحص وصيانة لسيارتي بموقعي في الرياض.`;

    const url = `https://wa.me/966561241984?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleQuickBook = () => {
    if (!currentSymptom || !recommendedService) return;
    const notes = `العرض المكتشف: ${currentSymptom.text}. الأسباب المقترحة: ${currentSymptom.possibleCauses[0]}`;
    onBookService(recommendedService.title, notes);
  };

  return (
    <section id="troubleshooter" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-right">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold px-3 py-1.5 rounded-full">
            <Activity size={14} className="animate-pulse" />
            <span>كاشف الأعطال التفاعلي والذكي</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">شخص عطل سيارتك في ثوانٍ</h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            اختر العَرَض أو المشكلة التي تلاحظها في سيارتك حالياً لتكتشف أسبابها المحتملة، والخدمة الموصى بها لحل المشكلة فوراً.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Symptoms List Selector (Right/Left according to layout, let's make it beautiful) */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-4">اختر المشكلة الحالية:</h3>
            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {symptomsData.map((symptom: Symptom) => {
                const isSelected = selectedSymptomId === symptom.id;
                return (
                  <button
                    key={symptom.id}
                    onClick={() => setSelectedSymptomId(symptom.id)}
                    className={`w-full text-right p-4 rounded-xl border text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-[0_4px_15px_rgba(245,158,11,0.25)]'
                        : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <span>{symptom.text}</span>
                    <ArrowLeft size={16} className={`shrink-0 transition-transform ${isSelected ? '-translate-x-1' : 'opacity-40'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Diagnosis Results Card */}
          <div className="md:col-span-7">
            {currentSymptom && recommendedService ? (
              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-fadeIn">
                
                {/* Result header */}
                <div className="flex items-start gap-4">
                  <span className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0">
                    <ShieldAlert size={24} />
                  </span>
                  <div>
                    <h4 className="text-xs text-slate-400">التشخيص الأولي المقترح</h4>
                    <h3 className="text-base sm:text-lg font-extrabold text-white mt-1 leading-tight">
                      {currentSymptom.text}
                    </h3>
                  </div>
                </div>

                <div className="border-t border-slate-800/60 pt-5 space-y-4">
                  <h4 className="text-xs sm:text-sm font-black text-slate-300">أبرز الأسباب المحتملة:</h4>
                  <ul className="space-y-3">
                    {currentSymptom.possibleCauses.map((cause, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                        <span className="text-amber-500 font-extrabold shrink-0 mt-0.5">•</span>
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Service Section */}
                <div className="bg-slate-950 border border-slate-800/50 rounded-xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Wrench size={16} className="text-amber-500" />
                    <span className="text-xs font-black text-amber-400">الخدمة الموصى بها لإصلاح العطل:</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold text-white">{recommendedService.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{recommendedService.description}</p>
                </div>

                {/* Interactive conversion actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleQuickBook}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
                  >
                    <Calendar size={16} className="stroke-[2.5]" />
                    <span>احجز فحص فوري بموقعك</span>
                  </button>
                  <button
                    onClick={handleShareToWhatsapp}
                    className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/30 text-slate-300 hover:text-emerald-400 font-bold text-xs sm:text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
                  >
                    <Share2 size={16} />
                    <span>مراسلة الفني بالتشخيص</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="bg-slate-900/40 border border-slate-900 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4 h-[380px]">
                <div className="p-4 rounded-full bg-slate-950 border border-slate-800 text-slate-500">
                  <Activity size={32} className="opacity-40" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-300">بانتظار اختيارك للمشكلة</h3>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    اضغط على أي من الأعراض الموضحة في القائمة الجانبية لعرض التشخيص الأولي والحلول المتاحة فوراً.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
