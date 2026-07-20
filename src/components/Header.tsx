import React, { useState } from 'react';
import {
  Menu,
  X,
  Phone,
  Wrench,
  ShieldCheck,
  ChevronDown,
  Cpu,
  CodeXml,
  Zap,
  Wind,
  Workflow,
  Disc,
  Sun,
  BatteryCharging,
  KeyRound,
  Radio,
  SlidersHorizontal
} from 'lucide-react';
import { servicesData } from '../data';

// Service icon mapping
const serviceIcons: Record<string, React.ComponentType<any>> = {
  'computer-diagnostics': Cpu,
  'computer-programming': CodeXml,
  'mechanics': Wrench,
  'electrician': Zap,
  'ac-repair': Wind,
  'hydraulics-steering': Workflow,
  'brakes': Disc,
  'sunroof': Sun,
  'battery-alternator': BatteryCharging,
  'starter-ignition': KeyRound,
  'radio-programming': Radio,
  'gearbox': SlidersHorizontal,
};

// Categories mapping
const categories = [
  { id: 'diagnostics', label: 'فحص وبرمجة' },
  { id: 'mechanics', label: 'ميكانيكا وصيانة' },
  { id: 'electric', label: 'أنظمة كهربائية' },
  { id: 'chassis', label: 'فرامل وهيدروليك' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const phoneNumber = '0561241984';
  const displayPhone = '0561241984';

  const otherMenuItems = [
    { label: 'الرئيسية', href: '#home' },
    { label: 'كاشف الأعطال التفاعلي', href: '#troubleshooter' },
    { label: 'مناطق التغطية', href: '#coverage' },
    { label: 'آراء العملاء', href: '#testimonials' },
    { label: 'الأسئلة الشائعة', href: '#faq' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleServiceClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    setIsDropdownOpen(false);

    const targetElement = document.getElementById(`service-card-${id}`);
    if (targetElement) {
      // Scroll to the specific service card
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Dispatch a custom event so the grid automatically expands the service details
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('expand-service-card', { detail: { id } }));
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-900" id="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-amber-600 to-amber-400 p-2.5 rounded-xl text-slate-950 shadow-[0_4px_20px_rgba(245,158,11,0.25)] flex items-center justify-center">
              <Wrench size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-1.5">
                الرشود <span className="text-amber-500">للصيانة المتنقلة</span>
              </h1>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">صيانة سيارتك عند باب بيتك بالرياض</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <a
              href="#home"
              onClick={(e) => handleScroll(e, '#home')}
              className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors duration-200"
            >
              الرئيسية
            </a>

            {/* "خدماتنا" Dropdown menu */}
            <div
              className="relative py-2"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors duration-200 flex items-center gap-1 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector('#services');
                  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                <span>خدماتنا</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-amber-500' : ''}`} />
              </button>

              {/* Mega Dropdown Panel */}
              {isDropdownOpen && (
                <div className="absolute right-1/2 translate-x-1/2 mt-3 w-[820px] bg-slate-950/98 border border-slate-800/80 rounded-2xl p-5 shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl z-50 text-right grid grid-cols-4 gap-4 animate-fadeIn">
                  {categories.map((cat) => {
                    const catServices = servicesData.filter(s => s.category === cat.id);
                    return (
                      <div key={cat.id} className="space-y-3 pr-2 border-r border-slate-900/60 first:border-r-0">
                        <h4 className="text-[11px] font-black text-amber-500 tracking-wider pb-1.5 border-b border-slate-900">
                          {cat.label}
                        </h4>
                        <div className="flex flex-col gap-1">
                          {catServices.map((service) => {
                            const ServiceIcon = serviceIcons[service.id] || Wrench;
                            return (
                              <a
                                key={service.id}
                                href={`#service-card-${service.id}`}
                                onClick={(e) => handleServiceClick(e, service.id)}
                                className="group flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-900/50 transition-all duration-150 text-slate-400 hover:text-amber-400"
                              >
                                <span className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-amber-400 group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all duration-150 shrink-0">
                                  <ServiceIcon size={12} />
                                </span>
                                <span className="text-[11px] font-bold text-slate-300 group-hover:text-white transition-colors duration-150 line-clamp-1 leading-snug">
                                  {service.title}
                                </span>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Other standard navigation links */}
            {otherMenuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action Call Button */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>ضمان كامل على العمل</span>
            </div>
            <a
              href={`tel:${phoneNumber}`}
              className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-[0_4px_15px_rgba(245,158,11,0.2)] hover:shadow-[0_4px_20px_rgba(245,158,11,0.35)] transition-all duration-300 scale-100 hover:scale-[1.02]"
            >
              <Phone size={16} className="stroke-[2.5]" />
              <span>اتصل الآن: {displayPhone}</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900 border border-slate-800"
              aria-label="القائمة"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-900 transition-all duration-300 max-h-[85vh] overflow-y-auto">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 text-right">
            
            <a
              href="#home"
              onClick={(e) => handleScroll(e, '#home')}
              className="block px-4 py-3 text-base font-bold text-slate-300 hover:text-amber-400 hover:bg-slate-900/50 rounded-xl"
            >
              الرئيسية
            </a>

            {/* Mobile Collapsible "خدماتنا" Accordion */}
            <div className="border-b border-slate-900/60 pb-1">
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-base font-bold text-slate-300 hover:text-amber-400 hover:bg-slate-900/50 rounded-xl"
              >
                <span>خدماتنا</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180 text-amber-500' : ''}`} />
              </button>
              
              {isMobileServicesOpen && (
                <div className="mt-1 mb-2 mr-4 pr-3 border-r border-slate-800 space-y-1 animate-fadeIn">
                  {servicesData.map((service) => {
                    const ServiceIcon = serviceIcons[service.id] || Wrench;
                    return (
                      <a
                        key={service.id}
                        href={`#service-card-${service.id}`}
                        onClick={(e) => handleServiceClick(e, service.id)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-900/40 text-slate-400 hover:text-white transition-all duration-150"
                      >
                        <span className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-500 shrink-0">
                          <ServiceIcon size={14} />
                        </span>
                        <span className="text-xs font-semibold">{service.title}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Other standard items */}
            {otherMenuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="block px-4 py-3 text-base font-bold text-slate-300 hover:text-amber-400 hover:bg-slate-900/50 rounded-xl"
              >
                {item.label}
              </a>
            ))}
            
            {/* Call action inside mobile menu */}
            <div className="pt-4 px-4 flex flex-col gap-3">
              <a
                href={`tel:${phoneNumber}`}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-3.5 rounded-xl text-center flex items-center justify-center gap-2 shadow-lg"
              >
                <Phone size={18} className="stroke-[2.5]" />
                <span>اتصل بنا فوراً: {displayPhone}</span>
              </a>
              <p className="text-center text-xs text-slate-400">خدمة سريعة في موقعك على مدار الساعة</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
