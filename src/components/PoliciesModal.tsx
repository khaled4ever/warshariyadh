import React from 'react';
import { X, ShieldCheck, FileText, Scale } from 'lucide-react';

interface PoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms' | 'disclaimer';
}

export default function PoliciesModal({ isOpen, onClose, initialTab = 'privacy' }: PoliciesModalProps) {
  const [activeTab, setActiveTab] = React.useState<'privacy' | 'terms' | 'disclaimer'>(initialTab);

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn" id="policies-modal-overlay">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] text-right overflow-hidden"
        id="policies-modal"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/40">
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-all cursor-pointer"
            aria-label="إغلاق"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3">
            <h3 className="text-base sm:text-lg font-black text-white">السياسات والأنظمة القانونية</h3>
            <div className="bg-amber-500/10 text-amber-500 p-1.5 rounded-lg border border-amber-500/20">
              <ShieldCheck size={18} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/20 p-2 gap-1.5">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'privacy' 
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <ShieldCheck size={14} className={activeTab === 'privacy' ? 'stroke-[2.5]' : ''} />
            <span>سياسة الخصوصية</span>
          </button>
          
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'terms' 
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <FileText size={14} className={activeTab === 'terms' ? 'stroke-[2.5]' : ''} />
            <span>الشروط والأحكام</span>
          </button>

          <button
            onClick={() => setActiveTab('disclaimer')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'disclaimer' 
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Scale size={14} className={activeTab === 'disclaimer' ? 'stroke-[2.5]' : ''} />
            <span>إخلاء المسؤولية</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-300 leading-relaxed font-sans scrollbar-thin scrollbar-thumb-slate-800">
          
          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="text-base font-black text-white">سياسة الخصوصية وحماية البيانات</h4>
              <p className="text-xs text-slate-400">آخر تحديث: 20 يوليو 2026</p>
              
              <p>
                نحن في <strong>الرشود للصيانة المتنقلة بالرياض</strong>، نولي خصوصية زوارنا أهمية بالغة. توضح هذه الوثيقة أنواع البيانات الشخصية التي نجمعها وكيفية معالجتها وحمايتها وفقاً لأنظمة المملكة العربية السعودية وسياسات الإعلانات لشبكة جوجل.
              </p>

              <div className="space-y-3 pt-2">
                <h5 className="font-extrabold text-amber-500">1. البيانات التي يتم جمعها:</h5>
                <ul className="list-disc list-inside space-y-1.5 pr-4 text-xs sm:text-sm">
                  <li><strong>بيانات نموذج الحجز:</strong> تشمل (الاسم، رقم الهاتف، موقع العمل بالرياض، نوع السيارة، وملاحظات العطل).</li>
                  <li><strong>بيانات التواصل عبر الواتساب:</strong> عند النقر لطلب خدمة، يتم فتح تطبيق الواتساب لمشاركة معلومات الخدمة لتنسيق الزيارة الفنية.</li>
                  <li><strong>ملفات تعريف الارتباط (Cookies):</strong> نستخدم ملفات تعريف الارتباط لتحسين جودة التصفح وجمع بيانات تحليلات مجهولة المصدر عبر جوجل أناليتكس (Google Analytics).</li>
                </ul>
              </div>

              <div className="space-y-3 pt-2">
                <h5 className="font-extrabold text-amber-500">2. استخدام المعلومات:</h5>
                <p>
                  تُستخدم كافة البيانات المجمعة حصرياً لغرض تقديم خدمات صيانة السيارات المتنقلة وتنسيق مواعيد الفنيين للوصول إلى موقعك بدقة بالرياض. لا يتم استخدام هذه البيانات لأي أغراض تجارية خارج نطاق ورشتنا.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h5 className="font-extrabold text-amber-500">3. حماية البيانات وعدم المشاركة مع أطراف ثالثة:</h5>
                <p>
                  نلتزم بحماية بياناتك الشخصية وعدم بيعها أو تأجيرها أو مشاركتها مع أي جهة خارجية أو أطراف ثالثة على الإطلاق، إلا في الحالات التي يتطلبها النظام القضائي أو الأمني السعودي. يتم تشفير البيانات وحفظها في بيئة سحابية آمنة.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h5 className="font-extrabold text-amber-500">4. حقوق المستخدم:</h5>
                <p>
                  لديك كامل الحق في طلب تعديل أو حذف بياناتك الشخصية المسجلة لدينا في أي وقت من خلال التواصل معنا مباشرة على رقم الورشة الرسمي المعلن في الموقع.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="text-base font-black text-white">الشروط والأحكام لطلب الخدمة</h4>
              <p className="text-xs text-slate-400">آخر تحديث: 20 يوليو 2026</p>

              <p>
                باستخدامك لموقع <strong>الرشود للصيانة المتنقلة بالرياض</strong> أو طلبك للخدمة عبر الموقع أو الواتساب، فإنك توافق على الشروط والأحكام التالية:
              </p>

              <div className="space-y-3 pt-2">
                <h5 className="font-extrabold text-amber-500">1. طبيعة الخدمة:</h5>
                <p>
                  نحن نقدم خدمات صيانة سيارات متنقلة (ورشة متنقلة) تصل إلى موقع العميل المتفق عليه في مدينة الرياض فقط. يتم تشخيص وإصلاح الأعطال في الموقع الذي يحدده العميل ويكون آمناً ومسموحاً فيه بالصيانة.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h5 className="font-extrabold text-amber-500">2. التسعير وتكلفة الخدمة والتشخيص:</h5>
                <ul className="list-disc list-inside space-y-1.5 pr-4 text-xs sm:text-sm">
                  <li>يتم احتساب رسوم للانتقال والتشخيص الأولي وفحص الكمبيوتر في الموقع، ويتم إبلاغ العميل بها قبل تحرك الورشة المتنقلة.</li>
                  <li>بعد الفحص والتشخيص، يعرض الفني تكلفة الإصلاح وأجور اليد وأسعار قطع الغيار المطلوبة، ولا يتم المباشرة بالعمل إلا بعد موافقة العميل الصريحة.</li>
                  <li>أسعار قطع الغيار تخضع لفواتير الشراء الرسمية من الموزعين المعتمدين بالرياض.</li>
                </ul>
              </div>

              <div className="space-y-3 pt-2">
                <h5 className="font-extrabold text-amber-500">3. مسؤولية العميل:</h5>
                <p>
                  يجب على العميل توفير مكان آمن لوقوف الورشة المتنقلة والسيارة المراد صيانتها (مواقف خاصة، أمام المنزل، إلخ) بحيث لا يتعارض ذلك مع حركة المرور العامة أو أنظمة البلدية بالرياض. كما يجب على العميل أو من ينوب عنه التواجد أثناء عملية الفحص والصيانة.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h5 className="font-extrabold text-amber-500">4. الضمان على الصيانة:</h5>
                <p>
                  نقدم ضماناً حقيقياً ومكتوباً على كافة خدمات الصيانة والإصلاح التي نقوم بها (يختلف باختلاف نوع الخدمة ويصل إلى 30 يوماً). قطع الغيار تخضع لضمان الوكيل أو الموزع المعتمد ونلتزم بتقديم الفواتير للعميل لضمان حقوقه كاملة.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'disclaimer' && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="text-base font-black text-white">إخلاء المسؤولية القانونية والمصداقية الإعلانية</h4>
              <p className="text-xs text-slate-400">آخر تحديث: 20 يوليو 2026</p>

              <p>
                تلتزم ورشة <strong>الرشود للصيانة المتنقلة بالرياض</strong> بأعلى معايير المصداقية والشفافية تماشياً مع معايير الملكية الفكرية وسياسات إعلانات جوجل الصارمة ضد التضليل:
              </p>

              <div className="space-y-3 pt-2">
                <h5 className="font-extrabold text-amber-500">1. استقلالية الورشة عن المصنعين (العلامات التجارية):</h5>
                <p>
                  توضيح هام: نحن <strong>ورشة صيانة سيارات متنقلة مستقلة بالرياض</strong>. نحن لسنا وكلاء معتمدين رسميين لأي شركة مصنعة للسيارات (مثل تويوتا، نيسان، هيونداي، مرسيدس، إلخ). كافة الشعارات وأسماء الماركات التي قد ترد في الموقع هي لأغراض تعريفية بتوافق الخدمة فقط وتعود ملكيتها الفكرية لشركاتها الأصلية.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h5 className="font-extrabold text-amber-500">2. حدود المسؤولية عن تشخيص الأعطال:</h5>
                <p>
                  أداة "كاشف الأعطال التفاعلي" المتوفرة في الموقع هي أداة برمجية استرشادية لتقريب نوع العطل بناء على الأعراض المشهودة للسيارة، ولا تغني مطلقاً عن الفحص الفني الفعلي بجهاز الكمبيوتر وأدوات القياس التي يقوم بها المهندس المختص عند وصوله للسيارة. لا تتحمل الورشة أي مسؤولية قانونية عن أي تفسير خاطئ من قبل العميل لأعطال سيارته بناء على الأداة الاسترشادية دون فحص الفني.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h5 className="font-extrabold text-amber-500">3. متطلبات الترويج وسياسات إعلانات Google Ads:</h5>
                <p>
                  يتطابق هذا الموقع بالكامل مع سياسات الإعلانات لشركة جوجل (Google Terms for Advertisers)، ونشهد بأننا نمتلك السجل والمعدات الفنية اللازمة والكوادر البشرية الفعلية المتواجدة على أرض الواقع بمدينة الرياض لتقديم هذه الخدمات فور الاتصال أو حجز موعد. ولا توجد أي رسوم مخفية أو وعود غير حقيقية للعملاء.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <p className="text-[10px] sm:text-xs text-slate-500">
            الرشود للصيانة المتنقلة بالرياض - جميع الحقوق محفوظة
          </p>
          <button
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
          >
            موافق وفهمت
          </button>
        </div>
      </div>
    </div>
  );
}
