import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { motion } from 'motion/react';
import { Calendar, Sparkles, Palette, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

import banner1 from '../../assets/images/banner/banner-1.jpeg';
import banner2 from '../../assets/images/banner/banner-2.jpeg';
import banner3 from '../../assets/images/banner/banner-3.jpeg';
import banner4 from '../../assets/images/banner/banner-4.JPG';
import banner5 from '../../assets/images/banner/banner-5.JPG';
import banner6 from '../../assets/images/banner/banner-6.JPG';
import banner7 from '../../assets/images/banner/banner-7.JPG';

const heroImages = [banner1, banner2, banner3, banner4, banner5, banner6, banner7];

import gallery1 from '../../assets/images/gallery/gallery-1.jpeg';
import gallery2 from '../../assets/images/gallery/gallery-2.jpeg';
import gallery3 from '../../assets/images/gallery/gallery-3.jpeg';
import gallery4 from '../../assets/images/gallery/gallery-4.JPG';
import gallery5 from '../../assets/images/gallery/gallery-5.JPG';
import gallery6 from '../../assets/images/gallery/gallery-6.JPG';
const portfolioImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

import review1 from '../../assets/images/reviews/review-1.PNG';
import review2 from '../../assets/images/reviews/review-2.PNG';
import review3 from '../../assets/images/reviews/review-3.PNG';
import review4 from '../../assets/images/reviews/review-4.PNG';
import review5 from '../../assets/images/reviews/review-5.PNG';
import review6 from '../../assets/images/reviews/review-6.PNG';
import review7 from '../../assets/images/reviews/review-7.PNG';
import review8 from '../../assets/images/reviews/review-8.PNG';

const testimonials = [
  { image: review1 },
  { image: review2 },
  { image: review3 },
  { image: review4 },
  { image: review5 },
  { image: review6 },
  { image: review7 },
  { image: review8 },
];

function HeroSection() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = heroImages.length;

  // Auto-slide with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
    }, 4000);
    return () => clearInterval(interval);
  }, [slideCount, isPaused]);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slideCount);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full min-h-[500px] h-[800px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <div className="relative w-full h-full ">
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              current === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Image with scale animation */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: current === idx ? 1.05 : 1 }}
              transition={{ duration: 8, ease: 'linear' }}
              className="w-full h-full"
            >
              <ImageWithFallback
                src={img}
                alt={`Banner ${idx + 1}`}
                className="w-full h-full"
              />
            </motion.div>

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

            {/* Content with stagger animation */}
            {idx === current && (
              <div className="absolute inset-0 flex items-center px-6 md:px-16 lg:px-24">
                <div className="max-w-3xl text-white space-y-6">
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-2xl md:text-5xl leading-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {t('hero.title')}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-sm md:text-xl"
                    style={{ color: 'var(--gold)', fontFamily: 'var(--font-body)' }}
                  >
                    {t('hero.subtitle')}
                  </motion.p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modern Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 hover:bg-white/30 hover:scale-110 group"
      >
        <svg
          className="w-6 h-6 text-white transition-transform group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 hover:bg-white/30 hover:scale-110 group"
      >
        <svg
          className="w-6 h-6 text-white transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Modern Indicator Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              current === idx
                ? 'w-12 h-3'
                : 'w-3 h-3 hover:scale-125'
            }`}
            style={{
              backgroundColor: current === idx ? 'var(--gold)' : 'rgba(255, 255, 255, 0.5)',
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </motion.section>
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
      className="py-16 bg-white rounded-3xl shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}>{t('portfolio.title')}</h2>
          <p className="text-lg mb-2" style={{ fontFamily: 'var(--font-body)', color: '#6c757d' }}>{t('portfolio.subtitle')}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mb-8">
          {portfolioImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ scale: 1.03 }}
              className="relative aspect-square overflow-hidden rounded-2xl shadow-md group cursor-pointer border border-gray-100 hover:shadow-xl transition-shadow duration-300 min-h-[120px] sm:min-h-[160px] md:min-h-[200px] lg:min-h-[240px]"
            >
              <ImageWithFallback
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-95 rounded-2xl"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 rounded-2xl" />
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link to="/gallery">
            <button
              className="px-7 py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ backgroundColor: 'var(--gold)', fontFamily: 'var(--font-subheading)' }}
            >
              {t('portfolio.cta') || 'Explore All'}
            </button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

import { Carousel as TestimonialCarousel, CarouselContent as TestimonialCarouselContent, CarouselItem as TestimonialCarouselItem, CarouselPrevious as TestimonialCarouselPrevious, CarouselNext as TestimonialCarouselNext } from '../components/ui/carousel';
function TestimonialsSection() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const slideCount = testimonials.length;

  // Auto-slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
    }, 4000);
    return () => clearInterval(interval);
  }, [slideCount]);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

    const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slideCount);
  };

  // Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      setCurrent((prev) => (prev + 1) % slideCount);
    }
    if (touchStart - touchEnd < -75) {
      // Swipe right
      setCurrent((prev) => (prev - 1 + slideCount) % slideCount);
    }
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-24"
      style={{ backgroundColor: 'var(--muted)' }}
    >
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl mb-3"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
          >
            {t('testimonials.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg"
            style={{ fontFamily: 'var(--font-body)', color: '#6c757d' }}
          >
            {t('testimonials.subtitle')}
          </motion.p>
        </div>

        {/* Image Slider */}
        <div className="relative flex items-center justify-center min-h-[400px] md:min-h-[500px] mb-10">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: current === idx ? 1 : 0,
                scale: current === idx ? 1 : 0.85,
                zIndex: current === idx ? 10 : 0,
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center justify-center px-4"
            >
              <div className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <ImageWithFallback
                  src={testimonial.image}
                  alt={`Review ${idx + 1}`}
                  className="w-full h-auto object-contain max-h-[400px] md:max-h-[500px]"
                  draggable={false}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <button
          onClick={goToPrevious}
          className="absolute left-6 md:left-50 top-[55%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-black/30 flex items-center justify-center transition-all duration-300 hover:bg-black/30 hover:scale-110 group"
        >
          <svg
            className="w-6 h-6 text-white transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-6 md:right-50 top-[55%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-black/30 flex items-center justify-center transition-all duration-300 hover:bg-black/30 hover:scale-110 group"
        >
          <svg
            className="w-6 h-6 text-white transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                current === idx
                  ? 'w-12 h-3.5'
                  : 'w-3.5 h-3.5 hover:scale-125'
              }`}
              style={{
                backgroundColor: current === idx ? 'var(--gold)' : '#d1d5db',
              }}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
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