import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { motion } from 'motion/react';
import { Calendar, Sparkles, Palette, Check } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import banner5 from '../../assets/images/banner/banner-5.JPG';
import gallery2 from '../../assets/images/gallery/gallery-2.jpeg';
import gallery26 from '../../assets/images/gallery/gallery-26.JPG';
import gallery22 from '../../assets/images/gallery/gallery-22.JPG';

export function Services() {
  const { t } = useLanguage();
  const section1 = useScrollReveal();
  const section2 = useScrollReveal();
  const section3 = useScrollReveal();

  const services = [
    {
      icon: Calendar,
      title: t('service.planning.title'),
      description: t('service.planning.desc'),
      features: t('servicespage.planning.features').split(' • '),
      image: gallery2,
    },
    {
      icon: Sparkles,
      title: t('service.coordination.title'),
      description: t('service.coordination.desc'),
      features: t('servicespage.coordination.features').split(' • '),
      image: gallery26,
    },
    {
      icon: Palette,
      title: t('service.decoration.title'),
      description: t('service.decoration.desc'),
      features: t('servicespage.decoration.features').split(' • '),
      image: gallery22,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <ImageWithFallback
          src={banner5}
          alt="Our services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('servicespage.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl mb-6"
              style={{ fontFamily: 'var(--font-subheading)', color: 'var(--gold)' }}
            >
              {t('servicespage.subtitle')}
            </motion.p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100px' }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-1 mx-auto"
              style={{ backgroundColor: 'var(--gold)' }}
            />
          </div>
        </div>
      </div>

      {/* Services Detail Sections */}
      {services.map((service, index) => (
        <motion.section
          key={index}
          ref={index === 0 ? section1.ref : index === 1 ? section2.ref : section3.ref}
          initial={{ opacity: 0, y: 50 }}
          animate={
            (index === 0 && section1.isVisible) ||
            (index === 1 && section2.isVisible) ||
            (index === 2 && section3.isVisible)
              ? { opacity: 1, y: 0 }
              : {}
          }
          transition={{ duration: 0.6 }}
          className="py-20"
          style={{ backgroundColor: index % 2 === 0 ? 'white' : 'var(--muted)' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="rounded-lg shadow-2xl"
                />
              </div>
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'var(--gold)' }}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h2
                  className="text-4xl mb-6"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
                >
                  {service.title}
                </h2>
                <p
                  className="text-lg mb-8 leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)', color: '#6c757d' }}
                >
                  {service.description}
                </p>
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        (index === 0 && section1.isVisible) ||
                        (index === 1 && section2.isVisible) ||
                        (index === 2 && section3.isVisible)
                          ? { opacity: 1, x: 0 }
                          : {}
                      }
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'var(--gold)' }}
                      >
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span
                        style={{ fontFamily: 'var(--font-body)', color: 'var(--navy)' }}
                      >
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
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
              </div>
            </div>
          </div>
        </motion.section>
      ))}

      {/* CTA Section */}
      <section
        className="py-20"
        style={{ backgroundColor: 'var(--navy)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl mb-6 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ready to Plan Your Event?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--gold)' }}
          >
            Let's create something beautiful together
          </motion.p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-lg text-white transition-all duration-300 shadow-lg text-lg"
              style={{ backgroundColor: 'var(--gold)', fontFamily: 'var(--font-subheading)' }}
            >
              {t('hero.cta1')}
            </motion.button>
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
