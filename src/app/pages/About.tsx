import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { motion } from 'motion/react';
import { Target, Eye, Users, Heart } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

import banner6 from '../../assets/images/banner/banner-6.JPG';

export function About() {
  const { t } = useLanguage();
  const section1 = useScrollReveal();
  const section2 = useScrollReveal();
  const section3 = useScrollReveal();
  const section4 = useScrollReveal();

  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'We are passionate about creating beautiful and memorable events that reflect your unique story.',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in every detail, ensuring your event exceeds expectations.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with you to bring your vision to life through open communication and teamwork.',
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
          src={banner6}
          alt="About us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-5xl text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('about.title')}
            </motion.h1>
             <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-xl mb-6"
              style={{ fontFamily: 'var(--font-subheading)', color: 'var(--gold)' }}
            >
              {t('about.subtitle')}
            </motion.p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-1 mx-auto"
              style={{ backgroundColor: 'var(--gold)' }}
            />
            
          </div>
        </div>
      </div>

      {/* Story Section */}
      <motion.section
        ref={section1.ref}
        initial={{ opacity: 0, y: 50 }}
        animate={section1.isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1581720848095-2b72764b08a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGRlY29yYXRpb24lMjBmbG93ZXJzfGVufDF8fHx8MTc3MzY4MjIxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Our story"
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <motion.div
                initial={{ width: 0 }}
                animate={section1.isVisible ? { width: '60px' } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-1 mb-6"
                style={{ backgroundColor: 'var(--gold)' }}
              />
              <h2
                className="text-4xl mb-6"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
              >
                {t('aboutpage.story.title')}
              </h2>

              <p
                className="text-lg leading-relaxed"
                style={{ fontFamily: 'var(--font-body)', color: '#6c757d' }}
              >
                {t('aboutpage.story.text')}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        ref={section2.ref}
        initial={{ opacity: 0, y: 50 }}
        animate={section2.isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="py-20"
        style={{ backgroundColor: 'var(--muted)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: 'var(--gold)' }}
              >
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-3xl mb-4"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
              >
                {t('aboutpage.mission.title')}
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ fontFamily: 'var(--font-body)', color: '#6c757d' }}
              >
                {t('aboutpage.mission.text')}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: 'var(--gold)' }}
              >
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-3xl mb-4"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
              >
                {t('aboutpage.vision.title')}
              </h3>
              <p
                className="text-lg leading-relaxed"
                style={{ fontFamily: 'var(--font-body)', color: '#6c757d' }}
              >
                {t('aboutpage.vision.text')}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values */}
      <motion.section
        ref={section3.ref}
        initial={{ opacity: 0, y: 50 }}
        animate={section3.isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl mb-4"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              Our Values
            </h2>
            <div
              className="w-20 h-1 mx-auto"
              style={{ backgroundColor: 'var(--gold)' }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={section3.isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="text-center p-6"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: 'var(--gold)' }}
                >
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3
                  className="text-2xl mb-4"
                  style={{ fontFamily: 'var(--font-subheading)', color: 'var(--navy)' }}
                >
                  {value.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)', color: '#6c757d' }}
                >
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        ref={section4.ref}
        initial={{ opacity: 0, y: 50 }}
        animate={section4.isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="py-20"
        style={{ backgroundColor: 'var(--muted)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ width: 0 }}
                animate={section4.isVisible ? { width: '60px' } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-1 mb-6"
                style={{ backgroundColor: 'var(--gold)' }}
              />
              <h2
                className="text-4xl mb-6"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
              >
                {t('aboutpage.team.title')}
              </h2>
              <p
                className="text-lg leading-relaxed"
                style={{ fontFamily: 'var(--font-body)', color: '#6c757d' }}
              >
                {t('aboutpage.team.text')}
              </p>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1768508947605-8c7a50aed683?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBldmVudCUyMHBsYW5uaW5nJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzczNzQ1MTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Our team"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
