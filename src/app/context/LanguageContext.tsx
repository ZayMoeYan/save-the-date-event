import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'mm';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.gallery': 'Gallery',
    'nav.faqs': 'FAQs',
    
    // Hero
    'hero.title': 'Creating Unforgettable Moments',
    'hero.subtitle': 'Professional Event Planning & Decoration Services',
    'hero.cta1': 'Contact Us',
    'hero.cta2': 'View Portfolio',
    
    // About Section
    'about.title': 'About Save The Date',
    'about.subtitle': 'Professional Event Planning & Decoration Services',
    'about.description': 'We are a professional event planning and decoration company dedicated to making your special moments unforgettable. With years of experience in the industry, we specialize in weddings, birthdays, corporate events, and special celebrations.',
    'about.experience': 'Years of Experience',
    'about.events': 'Events Completed',
    'about.clients': 'Happy Clients',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'We offer comprehensive event planning and decoration services',
    'service.planning.title': 'Event Planning',
    'service.planning.desc': 'Full planning support from concept design to execution. We handle vendor management, budget planning, and timeline creation.',
    'service.coordination.title': 'Event Coordination',
    'service.coordination.desc': 'Professional event day coordination, timeline management, and vendor supervision to ensure everything runs smoothly.',
    'service.decoration.title': 'Event Decoration',
    'service.decoration.desc': 'Beautiful theme decoration, stage setup, floral design, and table arrangements that bring your vision to life.',
    'services.learnmore': 'Learn More',
    
    // Portfolio
    'portfolio.title': 'Our Portfolio',
    'portfolio.cta': 'View More',
    'portfolio.subtitle': 'Explore our beautiful event decorations and celebrations',
    
    // Testimonials
    'testimonials.title': 'Client Testimonials',
    'testimonials.subtitle': 'What our clients say about us',
    
    // Footer
    'footer.quicklinks': 'Quick Links',
    'footer.contact': 'Contact Information',
    'footer.followus': 'Follow Us',
    'footer.location': 'Our Location',
    'footer.rights': '© 2026 Save The Date Event Planning. All rights reserved.',
    
    // Contact Page
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Let us help you create your perfect event',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.message': 'Message',
    'contact.service': 'Select Service',
    'contact.planning': 'Planning',
    'contact.coordination': 'Coordination',
    'contact.decoration': 'Decoration',
    'contact.submit': 'Send Message',
    'contact.info.title': 'Contact Information',
    'contact.info.address': 'Yangon, Myanmar',
    
    // About Page
    'aboutpage.story.title': 'Our Story',
    'aboutpage.story.text': 'Save The Date Event Planning was founded with a passion for creating memorable celebrations. We believe every event tells a unique story, and our mission is to bring those stories to life through exceptional planning and decoration.',
    'aboutpage.mission.title': 'Our Mission',
    'aboutpage.mission.text': 'To deliver beautiful and memorable events that exceed our clients\' expectations through creativity, attention to detail, and professional service.',
    'aboutpage.vision.title': 'Our Vision',
    'aboutpage.vision.text': 'To become a trusted and leading event planning brand, known for creating extraordinary experiences that leave lasting impressions.',
    'aboutpage.team.title': 'Our Team',
    'aboutpage.team.text': 'Our team consists of experienced event planners, creative designers, and dedicated coordinators who work together to make your dream event a reality.',
    
    // Services Page
    'servicespage.title': 'Our Services',
    'servicespage.subtitle': 'Comprehensive event solutions tailored to your needs',
    'servicespage.planning.features': 'Concept Development • Budget Planning • Vendor Sourcing • Timeline Creation',
    'servicespage.coordination.features': 'Event Day Management • Vendor Coordination • Timeline Supervision',
    'servicespage.decoration.features': 'Wedding Decoration • Birthday Decoration • Corporate Decoration • Theme Concept Design',

    // Gallery Page
    'gallery.title': 'Our Gallery',
    'gallery.subtitle': 'Explore our beautiful event decorations and celebrations',
    
    // FAQs
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Common questions about our services',
  },
  mm: {
    // Navigation
    'nav.home': 'ပင်မစာမျက်နှာ',
    'nav.about': 'ကျွန်ုပ်တို့အကြောင်း',
    'nav.services': 'ဝန်ဆောင်မှုများ',
    'nav.contact': 'ဆက်သွယ်ရန်',
    'nav.faqs': 'မေးခွန်းများ',
    
    // Hero
    'hero.title': 'မမေ့နိုင်သော အမှတ်တရများ ဖန်တီးပေးခြင်း',
    'hero.subtitle': 'ပရော်ဖက်ရှင်နယ် ပွဲစီစဉ်ခြင်းနှင့် အလှဆင်ခြင်း ဝန်ဆောင်မှုများ',
    'hero.cta1': 'ဆက်သွယ်ရန်',
    'hero.cta2': 'ပွဲများကြည့်ရှုရန်',
    
    // About Section
    'about.title': 'Save The Date အကြောင်း',
    'about.description': 'ကျွန်ုပ်တို့သည် သင်၏အထူးအခိုက်အတန့်များကို မမေ့နိုင်အောင် ပြုလုပ်ပေးရန် ရည်ရွယ်သော ပရော်ဖက်ရှင်နယ် ပွဲစီစဉ်ရေးနှင့် အလှဆင်ခြင်းကုမ္ပဏီတစ်ခုဖြစ်ပါသည်။ နှစ်ပေါင်းများစွာ အတွေ့အကြုံဖြင့် မင်္ဂလာပွဲများ၊ မွေးနေ့ပွဲများ၊ ကော်ပိုရိတ်ပွဲများနှင့် အထူးပွဲများတွင် ကျွမ်းကျင်ပါသည်။',
    'about.experience': 'နှစ်များစွာ အတွေ့အကြုံ',
    'about.events': 'ပြီးမြောက်ခ့ဲသော ပွဲများ',
    'about.clients': 'ကျေနပ်သော ဖောက်သည်များ',
    
    // Services
    'services.title': 'ကျွန်ုပ်တို့၏ ဝန်ဆောင်မှုများ',
    'services.subtitle': 'ပွဲစီစဉ်ခြင်းနှင့် အလှဆင်ခြင်း ဝန်ဆောင်မှုများကို ပြည့်စုံစွာ ပေးဆောင်ပါသည်',
    'service.planning.title': 'ပွဲစီစဉ်ခြင်း',
    'service.planning.desc': 'အယူအဆဒီဇိုင်းမှ အကောင်အထည်ဖော်ခြင်းအထိ အပြည့်အစုံ စီစဉ်မှုပံ့ပိုးမှု။ ကုန်သည်စီမံခန့်ခွဲမှု၊ ဘတ်ဂျက်စီစဉ်ခြင်းနှင့် အချိန်ဇယားဖန်တီးခြင်းကို ကျွန်ုပ်တို့ကိုင်တွယ်ပေးပါသည်။',
    'service.coordination.title': 'ပွဲညှိနှိုင်းခြင်း',
    'service.coordination.desc': 'အရာအားလုံးချောမွေ့စွာလည်ပတ်ရန် ပရော်ဖက်ရှင်နယ် ပွဲကျင်းပသည့်နေ့ ညှိနှိုင်းခြင်း၊ အချိန်ဇယားစီမံခန့်ခွဲမှုနှင့် ကုန်သည်ကြီးကြပ်မှု။',
    'service.decoration.title': 'ပွဲအလှဆင်ခြင်း',
    'service.decoration.desc': 'သင်၏အမြင်ကို အသက်သွင်းစေသော လှပသော အပြင်အဆင်၊ စင်တင်ဆင်ခြင်း၊ ပန်းပွင့်ဒီဇိုင်းနှင့် စားပွဲအစီအစဉ်များ။',
    'services.learnmore': 'ပိုမိုလေ့လာရန်',
    
    // Portfolio
    'portfolio.title': 'ကျွန်ုပ်တို့၏ ပွဲများ',
    'portfolio.cta': 'ပိုမိုကြည့်ရှုရန်',
    'portfolio.subtitle': 'ကျွန်ုပ်တို့၏ လှပသော ပွဲအလှဆင်မှုများနှင့် ပွဲများကို လေ့လာကြည့်ရှုပါ',
    
    // Testimonials
    'testimonials.title': 'ဖောက်သည်များ၏ သက်သေခံချက်များ',
    'testimonials.subtitle': 'ကျွန်ုပ်တို့အကြောင်း ဖောက်သည်များ၏ အမြင်များ',
    
    // Footer
    'footer.quicklinks': 'အမြန်လင့်ခ်များ',
    'footer.contact': 'ဆက်သွယ်ရန် အချက်အလက်များ',
    'footer.followus': 'ကျွန်ုပ်တို့ကို လိုက်ကြည့်ပါ',
    'footer.location': 'ကျွန်ုပ်တို့၏ တည်နေရာ',
    'footer.rights': '© ၂၀၂၆ Save The Date Event Planning။ မူပိုင်ခွင့်များ လုံးလုံးလျားလျား ရယူထားသည်။',
    
    // Contact Page
    'contact.title': 'ဆက်သွယ်ရန်',
    'contact.subtitle': 'သင်၏ ပြီးပြည့်စုံသော ပွဲကို ဖန်တီးရာတွင် ကျွန်ုပ်တို့ ကူညီပါမည်',
    'contact.name': 'အမည်',
    'contact.email': 'အီးမေးလ်',
    'contact.phone': 'ဖုန်းနံပါတ်',
    'contact.message': 'မက်ဆေ့ခ်ျ',
    'contact.service': 'ဝန်ဆောင်မှု ရွေးချယ်ပါ',
    'contact.planning': 'စီစဉ်ခြင်း',
    'contact.coordination': 'ညှိနှိုင်းခြင်း',
    'contact.decoration': 'အလှဆင်ခြင်း',
    'contact.submit': 'မက်ဆေ့ခ်ျပို့ရန်',
    'contact.info.title': 'ဆက်သွယ်ရန် အချက်အလက်',
    'contact.info.address': 'ရန်ကုန်မြို့၊ မြန်မာနိုင်ငံ',
    
    // About Page
    'aboutpage.story.title': 'ကျွန်ုပ်တို့၏ ဇာတ်လမ်း',
    'aboutpage.story.text': 'Save The Date Event Planning ကို မမေ့နိုင်သော ပွဲများ ဖန်တီးခြင်းအတွက် စိတ်အားထက်သန်မှုဖြင့် စတင်တည်ထောင်ခဲ့သည်။ ပွဲတိုင်းသည် ထူးခြားသော ဇာတ်လမ်းတစ်ပုဒ်ကို ပြောပြကြောင်း ကျွန်ုပ်တို့ယုံကြည်ပြီး ထိုဇာတ်လမ်းများကို ထူးခြားသော စီစဉ်မှုနှင့် အလှဆင်မှုများဖြင့် အသက်သွင်းပေးရန် ကျွန်ုပ်တို့၏ မစ်ရှင်ဖြစ်သည်။',
    'aboutpage.mission.title': 'ကျွန်ုပ်တို့၏ မစ်ရှင်',
    'aboutpage.mission.text': 'ဖန်တီးမှု၊ အသေးစိတ်အာရုံစိုက်မှုနှင့် ပရော်ဖက်ရှင်နယ် ဝန်ဆောင်မှုများမှတစ်ဆင့် ကျွန်ုပ်တို့၏ ဖောက်သည်များ၏ မျှော်လင့်ချက်များကို ကျော်လွန်သော လှပသောနှင့် မမေ့နိုင်သော ပွဲများကို ပေးဆောင်ရန်။',
    'aboutpage.vision.title': 'ကျွန်ုပ်တို့၏ ရည်မှန်းချက်',
    'aboutpage.vision.text': 'ခေတ်မီသော အတွေ့အကြုံများကို ဖန်တီးပေးသည့် ယုံကြည်ရသောနှင့် ထိပ်တန်း ပွဲစီစဉ်ရေး အမှတ်တံဆိပ်တစ်ခု ဖြစ်လာရန်။',
    'aboutpage.team.title': 'ကျွန်ုပ်တို့၏ အဖွဲ့',
    'aboutpage.team.text': 'ကျွန်ုပ်တို့၏အဖွဲ့သည် အတွေ့အကြုံရှိသော ပွဲစီစဉ်သူများ၊ ဖန်တီးမှုရှိသော ဒီဇိုင်နာများနှင့် သင်၏ အိပ်မက်ပွဲကို အဖြစ်မှန်ဖြစ်လာစေရန် အတူတကွ လုပ်ဆောင်ကြသော အပ်နှံထားသော ညှိနှိုင်းသူများဖြင့် ဖွဲ့စည်းထားသည်။',
    
    // Services Page
    'servicespage.title': 'ကျွန်ုပ်တို့၏ ဝန်ဆောင်မှုများ',
    'servicespage.subtitle': 'သင်၏ လိုအပ်ချက်များနှင့် အံဝင်ခွင်ကျ ပွဲဖြေရှင်းချက်များ',
    'servicespage.planning.features': 'အယူအဆဖွံ့ဖြိုးတိုးတက်မှု • ဘတ်ဂျက်စီစဉ်ခြင်း • ကုန်သည်ရှာဖွေခြင်း • အချိန်ဇယားဖန်တီးခြင်း',
    'servicespage.coordination.features': 'ပွဲကျင်းပသည့်နေ့ စီမံခန့်ခွဲမှု • ကုန်သည်ညှိနှိုင်းမှု • အချိန်ဇယားကြီးကြပ်မှု',
    'servicespage.decoration.features': 'မင်္ဂလာပွဲအလှဆင်ခြင်း • မွေးနေ့ပွဲအလှဆင်ခြင်း • ကော်ပိုရိတ်အလှဆင်ခြင်း • အပြင်အဆင်အယူအဆဒီဇိုင်း',

    // Gallery Page
    'gallery.title': 'ကျွန်ုပ်တို့၏ ပွဲများ',
    'gallery.subtitle': 'ကျွန်ုပ်တို့၏ လှပသော ပွဲအလှဆင်မှုများနှင့် ပွဲများကို လေ့လာကြည့်ရှုပါ',
    
    // FAQs
    'faq.title': 'မကြာခဏမေးလေ့ရှိသော မေးခွန်းများ',
    'faq.subtitle': 'ကျွန်ုပ်တို့၏ ဝန်ဆောင်မှုများအကြောင်း သာမန်မေးခွန်းများ',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
