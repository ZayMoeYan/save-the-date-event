import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { motion } from 'motion/react';
import { Calendar, Sparkles, Palette, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const heroImages = [
  'https://images.unsplash.com/photo-1581720848095-2b72764b08a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGRlY29yYXRpb24lMjBmbG93ZXJzfGVufDF8fHx8MTc3MzY4MjIxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1762709118823-7fe9c9afa8ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwc3RhZ2UlMjBkZWNvcmF0aW9uJTIwcm9tYW50aWN8ZW58MXx8fHwxNzczNzQ1MTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1770217614180-21c21043e9d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMHdlZGRpbmclMjB2ZW51ZSUyMGxpZ2h0c3xlbnwxfHx8fDE3NzM3NDUxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
];

const portfolioImages = [
  'https://images.unsplash.com/photo-1581720848095-2b72764b08a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGRlY29yYXRpb24lMjBmbG93ZXJzfGVufDF8fHx8MTc3MzY4MjIxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1626149136691-78e3977b3d69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMHBhcnR5JTIwZGVjb3JhdGlvbiUyMGJhbGxvb25zfGVufDF8fHx8MTc3MzY3OTI5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1762765685348-4bced247d12c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBldmVudCUyMGNvbmZlcmVuY2UlMjBzZXR1cHxlbnwxfHx8fDE3NzM3NDUxMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1764380746366-f4d8cc52e1e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwdGFibGUlMjBzZXR0aW5nJTIwd2VkZGluZ3xlbnwxfHx8fDE3NzM2ODI2MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1773609689096-5543f8dfa532?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMGRlY29yYXRpb24lMjBmbG9yYWwlMjBjZW50ZXJwaWVjZXxlbnwxfHx8fDE3NzM3NDUxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1766933161362-ccf4050529a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWxlYnJhdGlvbiUyMHBhcnR5JTIwZGVjb3JhdGlvbiUyMGxpZ2h0c3xlbnwxfHx8fDE3NzM3NDUxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
];

const testimonials = [
  {
    name: 'Sarah & Michael',
    event: 'Wedding',
    text: 'Save The Date made our wedding day absolutely perfect! Every detail was thoughtfully planned and beautifully executed.',
    rating: 5,
  },
  {
    name: 'Aye Mya Thwe',
    event: 'Wedding',
    text: 'အရမ်းကောင်းတဲ့ ဝန်ဆောင်မှုပေးတယ်။ ကျွန်တော်တို့ရဲ့ မင်္ဂလာပွဲက အရမ်းလှပြီး အမှတ်တရဖြစ်သွားပါတယ်။',
    rating: 5,
  },
  {
    name: 'David Wong',
    event: 'Corporate Event',
    text: 'Professional, creative, and reliable. They exceeded our expectations for our company anniversary celebration.',
    rating: 5,
  },
];

function HeroSection() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Image Carousel */}
      {heroImages.map((image, index) => (
        <motion.div
          key={index}
          initial={false}
          animate={{
            opacity: index === currentSlide ? 1 : 0,
            scale: index === currentSlide ? 1 : 1.1,
          }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={image}
            alt="Wedding decoration"
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <h1 
            className="text-5xl md:text-6xl mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('hero.title')}
          </h1>
          <p 
            className="text-xl md:text-2xl mb-8 text-white/90"
            style={{ fontFamily: 'var(--font-subheading)', color: 'var(--gold)' }}
          >
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-lg text-white transition-all duration-300 shadow-lg"
                style={{ backgroundColor: 'var(--gold)', fontFamily: 'var(--font-subheading)' }}
              >
                {t('hero.cta1')}
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white border-2 transition-all duration-300"
              style={{ borderColor: 'var(--gold)', fontFamily: 'var(--font-subheading)' }}
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta2')}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/30"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/30"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="w-3 h-3 rounded-full transition-all duration-300"
            style={{
              backgroundColor: index === currentSlide ? 'var(--gold)' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function AboutSection() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ width: 0 }}
              animate={isVisible ? { width: '60px' } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 mb-6"
              style={{ backgroundColor: 'var(--gold)' }}
            />
            <h2 
              className="text-4xl mb-6"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              {t('about.title')}
            </h2>
            <p 
              className="text-lg mb-8 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', color: '#6c757d' }}
            >
              {t('about.description')}
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: t('about.experience'), value: '10+' },
                { label: t('about.events'), value: '500+' },
                { label: t('about.clients'), value: '1000+' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div 
                    className="text-3xl mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold)' }}
                  >
                    {stat.value}
                  </div>
                  <div 
                    className="text-sm"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--navy)' }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1768508947605-8c7a50aed683?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBldmVudCUyMHBsYW5uaW5nJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzczNzQ1MTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Event planning"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ServicesSection() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();

  const services = [
    {
      icon: Calendar,
      title: t('service.planning.title'),
      description: t('service.planning.desc'),
    },
    {
      icon: Sparkles,
      title: t('service.coordination.title'),
      description: t('service.coordination.desc'),
    },
    {
      icon: Palette,
      title: t('service.decoration.title'),
      description: t('service.decoration.desc'),
    },
  ];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="py-20"
      style={{ backgroundColor: 'var(--muted)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl mb-4"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
          >
            {t('services.title')}
          </h2>
          <p 
            className="text-lg"
            style={{ fontFamily: 'var(--font-body)', color: '#6c757d' }}
          >
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="bg-white p-8 rounded-lg shadow-md transition-all duration-300"
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: 'var(--gold)' }}
              >
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 
                className="text-2xl mb-4"
                style={{ fontFamily: 'var(--font-subheading)', color: 'var(--navy)' }}
              >
                {service.title}
              </h3>
              <p 
                className="mb-6 leading-relaxed"
                style={{ fontFamily: 'var(--font-body)', color: '#6c757d' }}
              >
                {service.description}
              </p>
              <Link 
                to="/services"
                className="inline-flex items-center space-x-2 transition-all duration-300 hover:translate-x-2"
                style={{ color: 'var(--gold)', fontFamily: 'var(--font-subheading)' }}
              >
                <span>{t('services.learnmore')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function PortfolioSection() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();

  return (
    <motion.section
      id="portfolio"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl mb-4"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
          >
            {t('portfolio.title')}
          </h2>
          <p 
            className="text-lg"
            style={{ fontFamily: 'var(--font-body)', color: '#6c757d' }}
          >
            {t('portfolio.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {portfolioImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer group"
            >
              <ImageWithFallback
                src={image}
                alt={`Portfolio ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function TestimonialsSection() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();
  const [current, setCurrent] = useState(0);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="py-20"
      style={{ backgroundColor: 'var(--muted)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className="text-4xl mb-4"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
          >
            {t('testimonials.title')}
          </h2>
          <p 
            className="text-lg"
            style={{ fontFamily: 'var(--font-body)', color: '#6c757d' }}
          >
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="relative">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 md:p-12 rounded-lg shadow-xl"
          >
            <div className="flex mb-4">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" style={{ color: 'var(--gold)' }} />
              ))}
            </div>
            <p 
              className="text-xl mb-6 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--navy)' }}
            >
              "{testimonials[current].text}"
            </p>
            <div>
              <p 
                className="text-lg mb-1"
                style={{ fontFamily: 'var(--font-subheading)', color: 'var(--navy)' }}
              >
                {testimonials[current].name}
              </p>
              <p 
                className="text-sm"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--gold)' }}
              >
                {testimonials[current].event}
              </p>
            </div>
          </motion.div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: index === current ? 'var(--gold)' : '#d1d5db',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
    </motion.div>
  );
}
