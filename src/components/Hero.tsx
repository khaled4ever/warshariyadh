import { Phone, CheckCircle2, Clock, MapPin, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { trackGoogleConversion } from '../utils/analytics';

export default function Hero() {
  const phoneNumber = '0561241984';
  const whatsappUrl = `https://wa.me/966561241984?text=${encodeURIComponent('مرحباً، أريد طلب خدمة صيانة متنقلة فورية لسيارتي بالرياض.')}`;
  // Generated image path
  const heroImage = 'https://i.postimg.cc/JnZw6pDH/riyadh-mobile-mechanic-1784556705572.jpg';

  const stats = [
    { label: 'متوسط وقت الوصول', value: '30 دقيقة', icon: Clock, color: 'text-amber-500' },
    { label: 'سيارة صيانة بالرياض', value: '10,000+', icon: CheckCircle2, color: 'text-emerald-500' },
    { label: 'تغطية شاملة', value: 'كل أحياء الرياض', icon: MapPin, color: 'text-rose-500' },
    { label: 'ضمان الخدمة والقطع', value: 'ضمان حقيقي', icon: Shield, color: 'text-blue-500' },
  ];

  const benefits = [
    'صيانة سيارتك المتعطلة أمام المنزل وفي موقعك مباشرة.',
    'فحص كمبيوتر متطور وتحديد دقيق للأعطال لتجنب الهدر المالي.',
    'مهندسون ميكانيكيون وكهربائيون بخبرة لا تقل عن 10 سنوات.',
    'حلول فورية لأعطال التكييف، المساعدات، الهيدروليك والفرامل.'
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 bg-slate-950">
      {/* Decorative background radial glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Content (Right-aligned in Arabic RTL) */}
          <div className="lg:col-span-7 space-y-8 text-right order-2 lg:order-1">
            
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full text-amber-400 text-xs sm:text-sm font-bold">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>ورشة متنقلة متكاملة مجهزة بالكامل لخدمتكم 24/7 بالرياض</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              أفضل صيانة سيارات <span className="bg-clip-text text-transparent bg-gradient-to-l from-amber-400 to-amber-500">متنقلة في الرياض</span> أمام المنزل وبموقعك
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              لا داعي لسطحات نقل السيارات أو الانتظار طويلاً في الورش! فريقنا من أكفأ فنيي الميكانيكا والكهرباء والبرمجة بالرياض يصلك فوراً بأحدث الأجهزة لحل مشكلتك أينما كنت وبأعلى درجات الموثوقية.
            </p>

            {/* Core Benefits Bullets */}
            <ul className="space-y-3.5" id="hero-benefits">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-sm sm:text-base font-medium">
                  <span className="text-amber-500 bg-amber-500/10 p-1 rounded-md shrink-0 mt-0.5">
                    <CheckCircle2 size={16} />
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={`tel:${phoneNumber}`}
                onClick={trackGoogleConversion}
                className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-black text-base px-8 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(245,158,11,0.3)] transition-all duration-300"
              >
                <Phone size={20} className="stroke-[2.5]" />
                <span>اتصل فوراً بالفني: {phoneNumber}</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackGoogleConversion}
                className="bg-slate-900 hover:bg-slate-850 text-white border border-slate-800 hover:border-emerald-500/40 hover:text-emerald-400 font-bold text-base px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300"
              >
                {/* Custom WhatsApp SVG */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.8.983 3.834 1.503 5.903 1.505h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>طلب الخدمة عبر الواتساب</span>
              </a>
            </div>

          </div>

          {/* Hero Visual Block */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-full">
              {/* Outer decorative ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl blur-md opacity-35"></div>
              
              <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
                <img
                  src={heroImage}
                  alt="صيانة متنقلة بالرياض"
                  className="w-full h-[300px] sm:h-[380px] lg:h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  id="hero-main-img"
                />
                
                {/* Overlay card for Riyadh coverage */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                  <div className="text-right">
                    <p className="text-xs text-slate-400">منطقة تغطيتنا</p>
                    <h3 className="text-sm sm:text-base font-bold text-white">مدينة الرياض وضواحيها بالكامل</h3>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs px-3 py-1.5 rounded-lg font-extrabold">
                    تغطية فورية 24 ساعة
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Statistics Bar */}
        <div className="mt-16 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" id="hero-stats">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-900/80 hover:border-slate-800 rounded-2xl p-5 text-right flex flex-col justify-between transition-all duration-300 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`p-2.5 rounded-xl bg-slate-950 border border-slate-800 ${stat.color}`}>
                    <IconComponent size={20} className="stroke-[2.5]" />
                  </span>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
