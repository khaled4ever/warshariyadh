import React, { useState, useEffect } from 'react';
import { User, Phone, Car, MapPin, MessageSquare, Check, Loader2, Send, Wrench } from 'lucide-react';
import { servicesData } from '../data';
import { trackGoogleConversion } from '../utils/analytics';

interface BookingFormProps {
  selectedService: string;
  additionalNotes: string;
}

export default function BookingForm({ selectedService, additionalNotes }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carDetails: '',
    neighborhood: '',
    serviceType: '',
    description: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, serviceType: selectedService }));
    }
  }, [selectedService]);

  useEffect(() => {
    if (additionalNotes) {
      setFormData((prev) => ({ ...prev, description: additionalNotes }));
    }
  }, [additionalNotes]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'الرجاء إدخال الاسم الكريم';
    if (!formData.phone.trim()) {
      newErrors.phone = 'الرجاء إدخال رقم الجوال';
    } else if (!/^(05|5)\d{8}$/.test(formData.phone.trim().replace(/\s/g, ''))) {
      newErrors.phone = 'رقم الجوال غير صحيح (يجب أن يبدأ بـ 05 ويتكون من 10 أرقام)';
    }
    if (!formData.carDetails.trim()) newErrors.carDetails = 'الرجاء إدخال نوع وموديل السيارة';
    if (!formData.neighborhood.trim()) newErrors.neighborhood = 'الرجاء إدخال الحي السكني في الرياض';
    if (!formData.serviceType) newErrors.serviceType = 'الرجاء اختيار نوع الخدمة';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    
    // Trigger Google Ads Conversion Tracking
    trackGoogleConversion();
    
    // Call WhatsApp immediately so the browser does not block it as a popup
    handleSendToWhatsapp();

    // Transition to the success screen
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 800);
  };

  const handleSendToWhatsapp = () => {
    // Trigger Google Ads Conversion Tracking as fallback or secondary click
    trackGoogleConversion();

    const text = `مرحباً فني صيانة الرشود بالرياض،
أود طلب خدمة صيانة متنقلة فورية بالتفاصيل التالية:

الاسم: ${formData.name}
رقم الجوال: ${formData.phone}
السيارة: ${formData.carDetails}
الموقع/الحي: ${formData.neighborhood}
الخدمة المطلوبة: ${formData.serviceType}
التفاصيل/الأعراض: ${formData.description || 'صيانة عامة وفحص بموقعي'}`;

    const url = `https://wa.me/966561241984?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      carDetails: '',
      neighborhood: '',
      serviceType: '',
      description: '',
    });
    setIsSuccess(false);
  };

  return (
    <section id="booking-form-section" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-right">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-amber-500 text-sm font-extrabold uppercase tracking-widest">تواصل سريع لحجز موعد صيانة</h2>
          <p className="text-3xl sm:text-4xl font-black text-white">طلب خدمة صيانة متنقلة</p>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
          <p className="text-slate-400 text-sm">
            املأ بياناتك ونوع عطل سيارتك وسنقوم بالتواصل معك فوراً للتأكيد وإرسال أقرب فني صيانة لموقعك بالرياض.
          </p>
        </div>

        {/* Success Modal/Container */}
        {isSuccess ? (
          <div className="bg-slate-900 border border-emerald-500/20 rounded-3xl p-8 text-center space-y-6 shadow-2xl animate-scaleUp">
            <div className="mx-auto w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center">
              <Check size={32} className="stroke-[3]" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white">تم استلام طلبك بنجاح يا {formData.name}!</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                طلب صيانة سيارتك (<span className="text-amber-400 font-bold">{formData.carDetails}</span>) في حي {formData.neighborhood} قيد المراجعة الفورية. سيتصل بك الفني خلال 5 دقائق.
              </p>
            </div>

            {/* Quick Actions for WhatsApp conversion */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 max-w-lg mx-auto text-right space-y-4">
              <h4 className="text-xs font-black text-amber-400">🚀 لتسريع تلبية الطلب فوراً:</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                اضغط على الزر أدناه لإرسال تفاصيل طلبك مباشرةً إلى فني الصيانة عبر الواتساب لتحديد موقعك الجغرافي بشكل أسرع ومباشر.
              </p>
              <button
                onClick={handleSendToWhatsapp}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/15 transition-all duration-200 scale-100 hover:scale-[1.01]"
              >
                {/* WhatsApp custom SVG */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.8.983 3.834 1.503 5.903 1.505h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>إرسال تفاصيل الحجز الفوري واتساب</span>
              </button>
            </div>

            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white font-bold underline cursor-pointer pt-4"
            >
              تقديم طلب حجز صيانة جديد
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl" id="booking-form">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-black text-slate-300">الاسم الكريم <span className="text-amber-500">*</span></label>
                <div className="relative">
                  <User className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="مثال: أبو فهد المطيري"
                    className={`w-full text-right bg-slate-950 border rounded-xl py-3.5 pr-11 pl-4 text-sm text-white focus:outline-none transition-colors ${
                      errors.name ? 'border-rose-500/60 focus:border-rose-500' : 'border-slate-800 focus:border-amber-500'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-[11px] text-rose-500 font-bold">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-black text-slate-300">رقم جوال العميل <span className="text-amber-500">*</span></label>
                <div className="relative">
                  <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="مثال: 0561241984"
                    dir="ltr"
                    className={`w-full text-right bg-slate-950 border rounded-xl py-3.5 pr-11 pl-4 text-sm text-white focus:outline-none transition-colors ${
                      errors.phone ? 'border-rose-500/60 focus:border-rose-500' : 'border-slate-800 focus:border-amber-500'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-[11px] text-rose-500 font-bold">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Car Details */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-black text-slate-300">نوع وموديل السيارة <span className="text-amber-500">*</span></label>
                <div className="relative">
                  <Car className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    name="carDetails"
                    value={formData.carDetails}
                    onChange={handleChange}
                    placeholder="مثال: لكزس ES 2021"
                    className={`w-full text-right bg-slate-950 border rounded-xl py-3.5 pr-11 pl-4 text-sm text-white focus:outline-none transition-colors ${
                      errors.carDetails ? 'border-rose-500/60 focus:border-rose-500' : 'border-slate-800 focus:border-amber-500'
                    }`}
                  />
                </div>
                {errors.carDetails && <p className="text-[11px] text-rose-500 font-bold">{errors.carDetails}</p>}
              </div>

              {/* Neighborhood */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-black text-slate-300">حي السكن بالرياض <span className="text-amber-500">*</span></label>
                <div className="relative">
                  <MapPin className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleChange}
                    placeholder="مثال: حي الياسمين أو الملقا"
                    className={`w-full text-right bg-slate-950 border rounded-xl py-3.5 pr-11 pl-4 text-sm text-white focus:outline-none transition-colors ${
                      errors.neighborhood ? 'border-rose-500/60 focus:border-rose-500' : 'border-slate-800 focus:border-amber-500'
                    }`}
                  />
                </div>
                {errors.neighborhood && <p className="text-[11px] text-rose-500 font-bold">{errors.neighborhood}</p>}
              </div>
            </div>

            {/* Service Type Dropdown */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-black text-slate-300">الخدمة المطلوبة <span className="text-amber-500">*</span></label>
              <div className="relative">
                <Wrench className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className={`w-full text-right bg-slate-950 border rounded-xl py-3.5 pr-11 pl-4 text-sm text-slate-300 focus:outline-none transition-colors appearance-none ${
                    errors.serviceType ? 'border-rose-500/60 focus:border-rose-500' : 'border-slate-800 focus:border-amber-500'
                  }`}
                >
                  <option value="">-- اختر نوع خدمة الصيانة --</option>
                  {servicesData.map((service) => (
                    <option key={service.id} value={service.title}>{service.title}</option>
                  ))}
                  <option value="صيانة أخرى">صيانة أخرى للأعطال</option>
                </select>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[10px]">▼</div>
              </div>
              {errors.serviceType && <p className="text-[11px] text-rose-500 font-bold">{errors.serviceType}</p>}
            </div>

            {/* Description Area */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-black text-slate-300">ملاحظات العميل وشرح المشكلة (اختياري)</label>
              <div className="relative">
                <MessageSquare className="absolute right-3.5 top-4 text-slate-500" size={18} />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="مثال: سماع صوت طقطقة غريبة عند الدوران، أو ضعف في برودة مكيف السيارة فجأة"
                  className="w-full text-right bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl py-3.5 pr-11 pl-4 text-sm text-white focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

             {/* Action buttons */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 disabled:from-slate-800 disabled:to-slate-800 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/40 transition-all duration-300 cursor-pointer text-base sm:text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>جاري توجيهك للواتساب...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5.5 h-5.5 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.8.983 3.834 1.503 5.903 1.505h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>تأكيد الحجز وإرسال تفاصيل الطلب عبر الواتساب</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
}
