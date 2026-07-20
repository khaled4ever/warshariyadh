import React from 'react';
import { Wrench, Phone, Mail, MapPin, ShieldAlert } from 'lucide-react';

export default function Footer() {
  const phoneNumber = '0561241984';
  const displayPhone = '0561241984';

  const servicesLinks = [
    { label: 'فحص كمبيوتر وبرمجة', href: '#services' },
    { label: 'صيانة ميكانيكا وعضلات', href: '#services' },
    { label: 'كهربائي سيارات متنقل', href: '#services' },
    { label: 'إصلاح التكييف وتعبئة فريون', href: '#services' },
    { label: 'الهيدروليك ونظام الدركسون', href: '#services' },
    { label: 'صيانة الفرامل والهوبات', href: '#services' },
  ];

  const quickLinks = [
    { label: 'الرئيسية', href: '#home' },
    { label: 'كاشف الأعطال التفاعلي', href: '#troubleshooter' },
    { label: 'مناطق التغطية بالرياض', href: '#coverage' },
    { label: 'آراء وتقييمات العملاء', href: '#testimonials' },
    { label: 'الأسئلة الشائعة', href: '#faq' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900" id="main-footer">
      
      {/* Primary Footer Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-right">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand/Summary column */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-tr from-amber-600 to-amber-400 p-2 rounded-lg text-slate-950">
                <Wrench size={18} className="stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-black text-white">الرشود للصيانة المتنقلة بالرياض</h3>
            </div>
            
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              مركز صيانة متنقل رائد في مدينة الرياض. نقدم خدمات إصلاح السيارات الكهربائية والميكانيكية، فحص وبرمجة كمبيوتر، صيانة التكييف، المساعدات، الهيدروليك، والفرامل، مباشرة أمام منزلك أو بموقعك وبقطع غيار أصلية وضمان معتمد.
            </p>

            <div className="flex flex-col gap-2 pt-2 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-2.5">
                <MapPin size={16} className="text-amber-500" />
                <span>المملكة العربية السعودية، مدينة الرياض (تغطية شاملة)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-amber-500" />
                <a href={`tel:${phoneNumber}`} className="hover:text-amber-400 dir-ltr">{displayPhone}</a>
              </div>
            </div>
          </div>

          {/* Quick Links column */}
          <div className="md:col-span-2.5 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">روابط سريعة</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services shortcuts column */}
          <div className="md:col-span-2.5 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">أبرز خدماتنا</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {servicesLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency / Call Out column */}
          <div className="md:col-span-2.5 bg-slate-900/40 border border-slate-900 rounded-2xl p-5 text-center space-y-4">
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-2.5 rounded-xl inline-block">
              <ShieldAlert size={20} className="animate-pulse" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-black text-white">هل سيارتك متعطلة الآن؟</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                اضغط على الزر أدناه للاتصال المباشر فوراً بفني الطوارئ المتنقل وسنتحرك فوراً لموقعك.
              </p>
            </div>
            <a
              href={`tel:${phoneNumber}`}
              className="block w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs py-3 rounded-xl transition-all duration-200"
            >
              اتصال سريع: {displayPhone}
            </a>
          </div>

        </div>
      </div>

      {/* Sub-footer copyright */}
      <div className="bg-slate-950 border-t border-slate-900/60 py-6 text-center">
        <p className="text-[11px] text-slate-500">
          جميع الحقوق محفوظة &copy; {new Date().getFullYear()} الرشود لصيانة السيارات المتنقلة في الرياض.
        </p>
      </div>

    </footer>
  );
}
