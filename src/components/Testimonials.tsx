import { Star, User, Quote, ShieldCheck } from 'lucide-react';
import { testimonialsData } from '../data';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-900/40 border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-amber-500 text-sm font-extrabold uppercase tracking-widest">ثقة عملائنا هي سر نجاحنا</h2>
          <p className="text-3xl sm:text-4xl font-black text-white">آراء وتجارب عملائنا في الرياض</p>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
          <p className="text-slate-400 text-sm">
            بفضل الله قمنا بصيانة آلاف السيارات في كافة أنحاء الرياض بأعلى مستويات الاحترافية وبنسبة رضا عالية جداً من عملائنا. تفخر ورشة الرشود بتقديم خدمة ممتازة.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-slate-950 border border-slate-800/80 hover:border-slate-700 p-6 rounded-2xl flex flex-col justify-between shadow-xl transition-all duration-300 relative group"
            >
              {/* Quote marks icon */}
              <Quote size={28} className="text-amber-500/10 absolute top-4 left-4" />

              <div className="space-y-4 relative z-10">
                {/* Rating Stars */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed text-justify">
                  "{testimonial.review}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 border-t border-slate-900 pt-4 mt-6">
                <div className="bg-slate-900 p-2.5 rounded-full border border-slate-800 text-slate-400 group-hover:text-amber-400 transition-colors">
                  <User size={18} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-white">{testimonial.name}</h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                    <span>{testimonial.car}</span>
                    <span className="text-slate-700">•</span>
                    <span>{testimonial.region}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Local trust indicators */}
        <div className="mt-16 bg-slate-950 border border-slate-800/80 rounded-2xl p-6 max-w-4xl mx-auto flex flex-col sm:flex-row justify-around items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-full bg-emerald-500/10 text-emerald-500">
              <ShieldCheck size={24} />
            </span>
            <div className="text-right">
              <h4 className="text-sm font-black text-white">ضمان كامل على قطع الغيار والتركيب</h4>
              <p className="text-[11px] text-slate-500">كل قطعة غيار نوفرها أو عمل نقوم به مكفول بضمان كامل.</p>
            </div>
          </div>
          <div className="h-px w-full sm:h-10 sm:w-px bg-slate-900"></div>
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-full bg-amber-500/10 text-amber-500">
              <Star size={24} className="fill-amber-500 text-amber-500" />
            </span>
            <div className="text-right">
              <h4 className="text-sm font-black text-white">تقييم ممتاز 4.9/5 من عملاء الرياض</h4>
              <p className="text-[11px] text-slate-500">نهتم بأدق التفاصيل لرضى وراحة عملائنا في موقعهم.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
