import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { faqData } from '../data';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  return (
    <section id="faq" className="py-24 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-right">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-amber-500 text-sm font-extrabold uppercase tracking-widest">إجابات فورية لمخاوفك</h2>
          <p className="text-3xl sm:text-4xl font-black text-white">الأسئلة الشائعة حول خدماتنا</p>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
          <p className="text-slate-400 text-sm leading-relaxed">
            تصفح الإجابات على الأسئلة الأكثر تكراراً من قبل عملائنا حول تفاصيل الخدمة، الأسعار، ومناطق الحضور في الرياض.
          </p>
        </div>

        {/* FAQs Accordion Grid */}
        <div className="space-y-4" id="faq-accordions">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`bg-slate-900 border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-amber-500/55 shadow-lg' : 'border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Trigger */}
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full text-right p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className={`p-1.5 rounded-lg border shrink-0 transition-colors ${
                      isOpen ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}>
                      <HelpCircle size={16} />
                    </span>
                    <span>{item.question}</span>
                  </div>
                  {isOpen ? <ChevronUp size={18} className="text-amber-500" /> : <ChevronDown size={18} className="text-slate-500" />}
                </button>

                {/* Body Content */}
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-950/40 pt-4 animate-fadeIn">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
