import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export function FAQs() {
  const { t, language } = useLanguage();
  const { ref, isVisible } = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: language === 'mm' 
        ? 'Hello! Save The Date မှာ ဘာ Service လေးတွေ ရနိုင်မလဲ သိချင်ပါတယ်။'
        : 'What services does Save The Date offer?',
      answer: language === 'mm'
        ? 'Hello! မင်္ဂလာပါရှင့် Save The Date Event Planning ကို ဆက်သွယ်ပေးတဲ့အတွက် ကျေးဇူးအများကြီးတင်ပါတယ်နော် 💓\n\nSTD Team မှ မင်္ဂလာပွဲများ၊ မွေးနေ့ပွဲများ၊ corporate events နှင့် special celebrations များကို Client စိတ်ကြိုက် customize concept များနှင့်အတူ ခန်းနားလှပတဲ့ပွဲလေးများကို စီမံအလှဆင်ပေးနေပါတယ်ရှင့် 💓\n\nEvent နဲ့ အဆင်ပြေတဲ့ proposal လေးပြင်ပေးဖို့အတွက် ဒီအချက်လေးတွေပို့ပေးထားပါနော်\n\n• Event type\n• Event date\n• Event location\n• Guest အရေအတွက် (ခန့်မှန်း)\n\nSTD ရဲ့ senior planner များမှ ပြန်လည်ဆက်သွယ်ပေးပါ့မယ်ရှင့်'
        : 'Save The Date offers comprehensive event planning and decoration services including:\n\n• Wedding planning and decoration\n• Birthday party celebrations\n• Corporate events\n• Special celebrations\n\nWe provide customized concepts tailored to your preferences. To prepare a suitable proposal, please provide:\n\n• Event type\n• Event date\n• Event location\n• Estimated number of guests\n\nOur senior planners will contact you back.',
    },
    {
      question: language === 'mm'
        ? 'Package price လေးတွေ သိချင်ပါတယ်။'
        : 'What are your package prices?',
      answer: language === 'mm'
        ? 'Hello! မင်္ဂလာပါရှင့် Save The Date Event Planning ကို ဆက်သွယ်ပေးတဲ့အတွက် ကျေးဇူးအများကြီးတင်ပါတယ်နော် 💓\n\nSave The Date ရဲ့ packages လေးတွေက event type, event concept နှင့် client requirements စတဲ့အချက်လေးတွေအပေါ်မူတည်ပြီး customized ပြုလုပ်ပေးတာဖြစ်ပါတယ်ရှင့် 💓\n\nEvent နဲ့ အဆင်ပြေတဲ့ proposal လေးပြင်ပေးဖို့အတွက် ဒီအချက်လေးတွေပို့ပေးထားပါနော်\n\n• Event type\n• Event date\n• Location\n• Budget range (ရှိပါက)\n\nSave The Date team မှ မကြာခင်ပြန်လည်ဆက်သွယ်ပေးပါ့မယ်ရှင့် 💓'
        : 'Our packages are customized based on:\n\n• Event type\n• Event concept\n• Client requirements\n\nTo prepare a suitable proposal for your event, please provide:\n\n• Event type\n• Event date\n• Location\n• Budget range (if available)\n\nOur team will contact you shortly with a customized quote.',
    },
    {
      question: language === 'mm'
        ? 'Event အကြောင်း ဆက်ပြီး ဆွေးနွေးလို့ရမလား၊ လူချင်းရော appointment ယူလို့ရနိုင်မလား။'
        : 'Can I schedule an appointment to discuss my event?',
      answer: language === 'mm'
        ? 'Event idea နှင့် vision လေးတွေအကြောင်း ကနေစပြီး Venue ရွှေးချယ်မှုတွေ ကိုယ်နဲ့အသင့်တော်ဆုံး Vendors selection တွေအဆုံး သေချာတိုင်ပင်ပြီး အကောင်းဆုံး consultation လေးတွေလည်း ပြုလုပ်ပေးနေပါတယ်ရှင့် ✨\n\n• Senior Planner များနဲ့ consultation ပြုလုပ်ဖို့ Date & Time လေးဖြေပေးခဲ့ရင် STD Team မှ Meeting appointment လေး စီစဉ်ပေးပါ့မယ်နော် 💓\n'
        : 'Yes! We provide detailed consultations covering everything from event ideas and vision to venue selection and vendor recommendations.\n\n• To schedule a consultation with our senior planners, please provide your preferred date and time, and our team will arrange a meeting appointment.\n',
    },
    {
      question: language === 'mm'
        ? 'ဘယ်လောက် အကြိုတင်ပြီး booking လုပ်ရမလဲ။'
        : 'How far in advance should I book your services?',
      answer: language === 'mm'
        ? 'အကောင်းဆုံးအနေနဲ့ သင့်ပွဲရက်မတိုင်ခင် ၃ လ မှ ၆ လကြိုတင်ပြီး booking လုပ်ထားသင့်ပါတယ်။ မင်္ဂလာပွဲကြီးများအတွက်ဆိုရင် ၆ လ မှ ၁ နှစ် ကြိုတင်ပြီး ဆက်သွယ်ထားပါက ပို၍ကောင်းပါတယ်။ ဒါပေမယ့် အချိန်တိုအတွက်လည်း ဆက်သွယ်နိုင်ပါတယ်။ ကျွန်ုပ်တို့ အတတ်နိုင်ဆုံး ကူညီပေးပါမည်။'
        : 'We recommend booking 3-6 months in advance for best results. For large weddings, 6 months to 1 year ahead is ideal. However, we also accept last-minute bookings and will do our best to accommodate your needs.',
    },
    {
      question: language === 'mm'
        ? 'ကျွန်တော်တို့ရဲ့ ကိုယ်ပိုင် vendor များကို အသုံးပြုလို့ရမလား။'
        : 'Can we use our own vendors?',
      answer: language === 'mm'
        ? 'ရပါတယ်ရှင့်။ သင့်မှာ မိတ်ဆွေများ သို့မဟုတ် ယုံကြည်ရသော vendor များ ရှိပြီးသားဆိုရင် သူတို့နဲ့ အလုပ်လုပ်ရတာ ကျွန်ုပ်တို့ ဝမ်းသာပါတယ်။ သို့မဟုတ် ကျွန်ုပ်တို့ရဲ့ ယုံကြည်ရသော vendor network ကိုလည်း အကြံပြုပေးနိုင်ပါတယ်။ ရည်ရွယ်ချက်က သင့်ပွဲကို အောင်မြင်စေဖို့ပဲ ဖြစ်ပါတယ်။'
        : 'Absolutely! We\'re happy to work with your preferred vendors if you already have trusted contacts. Alternatively, we can recommend vendors from our reliable network. Our goal is to make your event successful, regardless of vendor choice.',
    },
    {
      question: language === 'mm'
        ? 'ပွဲကျင်း���သည့်နေ့မှာ ဘာတွေ စီမံပေးမလဲ။'
        : 'What does event day coordination include?',
      answer: language === 'mm'
        ? 'ပွဲကျင်းပသည့်နေ့ ညှိနှိုင်းခြင်းတွင် အောက်ပါတို့ ပါဝင်ပါတယ်:\n\n• အချိန်ဇယား ကြီးကြပ်ခြင်း\n• Vendor များ ညှိနှိုင်းခြင်း\n• ပွဲလမ်းညွှန်ခြင်း\n• ပြဿနာများ အမြန်ဖြေရှင်းခြင်း\n• အမှီအခိုကင်းသော အပြေးအလွှားများ စီမံခြင်း\n\nသင်နှင့် သင့်ဧည့်သည်များက ပွဲကို အပြည့်အဝ ပျော်ရွှင်နိုင်ပါစေ။'
        : 'Event day coordination includes:\n\n• Timeline management and supervision\n• Vendor coordination and communication\n• Event flow direction\n• Quick problem-solving\n• Behind-the-scenes logistics management\n\nSo you and your guests can fully enjoy the celebration without stress.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <div className="relative py-20" style={{ backgroundColor: 'var(--navy)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ backgroundColor: 'var(--gold)' }}
          >
            <MessageCircle className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-5xl text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('faq.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm md:text-xl mb-6"
            style={{ fontFamily: 'var(--font-subheading)', color: 'var(--gold)' }}
          >
            {t('faq.subtitle')}
          </motion.p>
        </div>
      </div>

      {/* FAQ List */}
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="py-20 bg-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-2 rounded-lg overflow-hidden transition-all duration-300"
                style={{
                  borderColor: openIndex === index ? 'var(--gold)' : 'var(--border)',
                  backgroundColor: openIndex === index ? 'var(--muted)' : 'white',
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors duration-300"
                >
                  <span
                    className="text-lg pr-4"
                    style={{
                      fontFamily: 'var(--font-subheading)',
                      color: openIndex === index ? 'var(--gold)' : 'var(--navy)',
                    }}
                  >
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown
                      className="w-6 h-6 flex-shrink-0"
                      style={{ color: openIndex === index ? 'var(--gold)' : 'var(--navy)' }}
                    />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="leading-relaxed whitespace-pre-line"
                          style={{ fontFamily: 'var(--font-body)', color: '#6c757d' }}
                        >
                          {faq.answer}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center p-8 rounded-lg"
            style={{ backgroundColor: 'var(--muted)' }}
          >
            <h3
              className="text-2xl mb-4"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              Still have questions?
            </h3>
            <p
              className="mb-6"
              style={{ fontFamily: 'var(--font-body)', color: '#6c757d' }}
            >
              Feel free to reach out to us directly
            </p>
            <a href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-lg text-white transition-all duration-300 shadow-lg"
                style={{ backgroundColor: 'var(--gold)', fontFamily: 'var(--font-subheading)' }}
              >
                {t('hero.cta1')}
              </motion.button>
            </a>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}
