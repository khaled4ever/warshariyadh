import { useState, useEffect } from 'react';
import { Phone, MessageCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { trackGoogleConversion } from '../utils/analytics';

export default function FloatingActions() {
  const [showNotification, setShowNotification] = useState(false);
  const phoneNumber = '0561241984';
  const displayPhone = '056 124 1984';
  const whatsappUrl = `https://wa.me/966561241984?text=${encodeURIComponent('مرحباً، أريد الاستفسار عن خدمة صيانة السيارات المتنقلة في الرياض لسيارتي.')}`;
  const callUrl = `tel:${phoneNumber}`;

  useEffect(() => {
    // Show a little greeting toast after 3 seconds
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end gap-3 pointer-events-none" id="floating-actions-container">
      {/* Toast Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="pointer-events-auto max-w-sm bg-slate-900 border border-amber-500/30 text-white rounded-2xl p-4 shadow-2xl flex items-start gap-3 relative mr-auto ml-0 mb-2"
          >
            <div className="bg-amber-500/10 p-2 rounded-xl text-amber-500 shrink-0 mt-0.5">
              <AlertCircle size={18} />
            </div>
            <div className="text-right">
              <h4 className="text-sm font-bold text-amber-400">فني الصيانة متاح الآن!</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                هل تعطلت سيارتك؟ اضغط مباشرة للاتصال بنا أو المراسلة واتساب لوصول فوري في الرياض.
              </p>
              <div className="flex gap-2 mt-3">
                <a
                  href={callUrl}
                  onClick={trackGoogleConversion}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all duration-200"
                >
                  <Phone size={12} />
                  اتصال مباشر
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackGoogleConversion}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all duration-200"
                >
                  {/* WhatsApp SVG */}
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.464L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.032 14.058 1.01 11.433 1.01c-5.44 0-9.866 4.372-9.87 9.802 0 1.956.513 3.868 1.49 5.56L1.93 22.07l5.834-1.516z"/>
                  </svg>
                  مراسلة واتساب
                </a>
              </div>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="absolute top-2 right-2 text-slate-400 hover:text-white text-xs p-1"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-auto flex flex-col gap-3">
        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackGoogleConversion}
          className="group relative flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-[0_8px_30px_rgb(16,185,129,0.3)] hover:scale-110 active:scale-95 transition-all duration-300"
          title="راسلنا على واتساب"
          id="btn-whatsapp"
        >
          {/* Ripple Effect */}
          <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-20 animate-ping group-hover:hidden"></span>
          
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.8.983 3.834 1.503 5.903 1.505h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          
          {/* Label tooltip */}
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl">
            راسلنا واتساب
          </span>
        </a>

        {/* Call Button */}
        <a
          href={callUrl}
          onClick={trackGoogleConversion}
          className="group relative flex items-center justify-center w-14 h-14 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-full shadow-[0_8px_30px_rgb(245,158,11,0.3)] hover:scale-110 active:scale-95 transition-all duration-300"
          title="اتصل بنا الآن"
          id="btn-call"
        >
          {/* Ripple Effect */}
          <span className="absolute inset-0 rounded-full bg-amber-400 opacity-35 animate-ping group-hover:hidden"></span>
          
          <Phone className="w-6 h-6 stroke-[2.5]" />
          
          {/* Label tooltip */}
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 border border-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl">
            اتصال هاتفي مباشر ({displayPhone})
          </span>
        </a>
      </div>
    </div>
  );
}
