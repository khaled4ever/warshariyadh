import React, { useState, useEffect } from 'react';
import {
  Cpu,
  CodeXml,
  Wrench,
  Zap,
  Wind,
  Workflow,
  Disc,
  Sun,
  BatteryCharging,
  KeyRound,
  Radio,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  PhoneCall,
  MessageSquareCode,
  Link
} from 'lucide-react';
import { servicesData } from '../data';
import { Service } from '../types';

// Helper to resolve icon by name
const iconMap: Record<string, React.ComponentType<any>> = {
  Cpu,
  CodeXml,
  Wrench,
  Zap,
  Wind,
  Workflow,
  Disc,
  Sun,
  BatteryCharging,
  KeyRound,
  Radio,
  SlidersHorizontal,
};

export default function ServicesGrid({ onSelectService }: { onSelectService: (serviceName: string) => void }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const handleExpandEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      if (customEvent.detail && customEvent.detail.id) {
        setExpandedId(customEvent.detail.id);
      }
    };
    window.addEventListener('expand-service-card', handleExpandEvent);

    // Dynamic hash-based navigation logic
    const checkHashAndScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const cleanId = hash.replace('#', '');
        const found = servicesData.find(s => s.id === cleanId);
        if (found) {
          setExpandedId(found.id);
          const element = document.getElementById(found.id);
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
          }
        }
      }
    };

    checkHashAndScroll();
    window.addEventListener('hashchange', checkHashAndScroll);

    return () => {
      window.removeEventListener('expand-service-card', handleExpandEvent);
      window.removeEventListener('hashchange', checkHashAndScroll);
    };
  }, []);

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const handleCopyLink = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
      
      // Also scroll and expand it as a visual feedback
      setExpandedId(id);
      window.history.pushState(null, '', `#${id}`);
    }).catch(err => {
      console.error('Failed to copy link:', err);
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'diagnostics':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'mechanics':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'electric':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'chassis':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default:
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'diagnostics': return 'فحص وبرمجة';
      case 'mechanics': return 'ميكانيكا وصيانة';
      case 'electric': return 'أنظمة كهربائية';
      case 'chassis': return 'فرامل وتوجيه وهيدروليك';
      default: return 'خدمة صيانة';
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-900/40 border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-amber-500 text-sm font-extrabold uppercase tracking-widest">حلول صيانة شاملة ومتنقلة</h2>
          <p className="text-3xl sm:text-4xl font-black text-white">خدماتنا الاحترافية بالمنزل</p>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            نحن نغطي كافة احتياجات سيارتك من الألف إلى الياء، مجهزين بقطع الغيار الأصلية وأحدث الأجهزة لنلبي طلبك فوراً أينما كنت في الرياض.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services-grid-list">
          {servicesData.map((service: Service) => {
            const IconComponent = iconMap[service.iconName] || Wrench;
            const isExpanded = expandedId === service.id;

            return (
              <div
                key={service.id}
                id={service.id}
                className={`group relative overflow-hidden rounded-2xl bg-slate-950 border transition-all duration-300 flex flex-col justify-between ${
                  isExpanded
                    ? 'border-amber-500/60 shadow-[0_4px_30px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/20'
                    : 'border-slate-800/80 hover:border-slate-700 hover:shadow-xl hover:shadow-slate-950/40'
                }`}
              >
                {/* Header glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="p-6 text-right space-y-4">
                  {/* Category & Icon Row */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${getCategoryColor(service.category)}`}>
                      {getCategoryLabel(service.category)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleCopyLink(e, service.id)}
                        className="p-2 text-slate-500 hover:text-amber-500 hover:border-amber-500/30 bg-slate-900 hover:bg-slate-850 border border-slate-800/80 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center relative group/btn"
                        title="نسخ رابط مباشر وسريع للخدمة"
                      >
                        {copiedId === service.id ? (
                          <span className="text-[10px] font-bold text-emerald-400 absolute -top-8 bg-slate-950 border border-emerald-500/30 px-2 py-0.5 rounded shadow-lg animate-fadeIn whitespace-nowrap z-20">
                            تم نسخ الرابط المباشر!
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold text-slate-400 absolute -top-8 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded shadow-lg opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                            رابط سريع
                          </span>
                        )}
                        <Link size={14} className="stroke-[2.5]" />
                      </button>
                      <span className={`p-3 rounded-xl bg-slate-900 border border-slate-800 text-amber-500 group-hover:text-amber-400 group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all duration-300`}>
                        <IconComponent size={24} className="stroke-[2]" />
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Expandable Details Container */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-slate-900 space-y-3 animate-fadeIn">
                      <h4 className="text-xs font-black text-amber-400">تشمل هذه الخدمة:</h4>
                      <ul className="space-y-2">
                        {service.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5"></span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Footer interactive actions */}
                <div className="p-6 pt-0 flex gap-2">
                  <button
                    onClick={() => toggleExpand(service.id)}
                    className="flex-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-1 transition-all duration-200"
                  >
                    <span>{isExpanded ? 'تفاصيل أقل' : 'عرض التفاصيل'}</span>
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black px-4 py-3 rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-950/30 transition-all duration-200 scale-100 hover:scale-[1.03] cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.8.983 3.834 1.503 5.903 1.505h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>طلب الخدمة بالواتساب</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fast CTA */}
        <div className="mt-16 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/20 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-right">
            <h3 className="text-lg sm:text-xl font-bold text-white">هل تواجه مشكلة كهربائية أو ميكانيكية غامضة؟</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              استخدم كاشف الأعطال التفاعلي أدناه لتشخيص المشكلة في ثوانٍ والحصول على توصية فورية بقطع الغيار ونوع الخدمة!
            </p>
          </div>
          <a
            href="#troubleshooter"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('troubleshooter')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-lg transition-all duration-300"
          >
            <span>شخّص سيارتك الآن</span>
          </a>
        </div>

      </div>
    </section>
  );
}
