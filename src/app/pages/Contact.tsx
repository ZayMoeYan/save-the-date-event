import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Facebook, Instagram, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function Contact() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    toast.success('Message sent successfully! We will contact you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('footer.location'),
      content: t('contact.info.address'),
      link: 'https://maps.app.goo.gl/iT3fbbPVvjcMZ3daA',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+95 9 XXX XXX XXX',
      link: 'tel:+959XXXXXXXXX',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@savethedate.com',
      link: 'mailto:info@savethedate.com',
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: 'Facebook',
      url: 'https://www.facebook.com/SaveTheDatePlannerTeam',
    },
    {
      icon: Instagram,
      name: 'Instagram',
      url: 'https://www.instagram.com/savethedateeventplanning',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <div className="relative py-20" style={{ backgroundColor: 'var(--navy)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-5xl text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('contact.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-xl mb-6"
            style={{ fontFamily: 'var(--font-subheading)', color: 'var(--gold)' }}
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>
      </div>

      {/* Contact Form & Info */}
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2
                className="text-3xl mb-8"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
              >
                {t('contact.submit')}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2"
                    style={{ fontFamily: 'var(--font-subheading)', color: 'var(--navy)' }}
                  >
                    {t('contact.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none"
                    style={{
                      borderColor: 'var(--border)',
                      fontFamily: 'var(--font-body)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2"
                    style={{ fontFamily: 'var(--font-subheading)', color: 'var(--navy)' }}
                  >
                    {t('contact.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none"
                    style={{
                      borderColor: 'var(--border)',
                      fontFamily: 'var(--font-body)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2"
                    style={{ fontFamily: 'var(--font-subheading)', color: 'var(--navy)' }}
                  >
                    {t('contact.phone')} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none"
                    style={{
                      borderColor: 'var(--border)',
                      fontFamily: 'var(--font-body)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block mb-2"
                    style={{ fontFamily: 'var(--font-subheading)', color: 'var(--navy)' }}
                  >
                    {t('contact.service')} *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none"
                    style={{
                      borderColor: 'var(--border)',
                      fontFamily: 'var(--font-body)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  >
                    <option value="">{t('contact.service')}</option>
                    <option value="planning">{t('contact.planning')}</option>
                    <option value="coordination">{t('contact.coordination')}</option>
                    <option value="decoration">{t('contact.decoration')}</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2"
                    style={{ fontFamily: 'var(--font-subheading)', color: 'var(--navy)' }}
                  >
                    {t('contact.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none resize-none"
                    style={{
                      borderColor: 'var(--border)',
                      fontFamily: 'var(--font-body)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-4 rounded-lg text-white transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                  style={{ backgroundColor: 'var(--gold)', fontFamily: 'var(--font-subheading)' }}
                >
                  <Send className="w-5 h-5" />
                  <span>{t('contact.submit')}</span>
                </motion.button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2
                className="text-3xl mb-8"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
              >
                {t('contact.info.title')}
              </h2>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-start space-x-4 p-4 rounded-lg transition-colors duration-300"
                    style={{ backgroundColor: 'var(--muted)' }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'var(--gold)' }}
                    >
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3
                        className="mb-1"
                        style={{ fontFamily: 'var(--font-subheading)', color: 'var(--navy)' }}
                      >
                        {info.title}
                      </h3>
                      <p style={{ fontFamily: 'var(--font-body)', color: '#6c757d' }}>
                        {info.content}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Media */}
              <div className="mb-8">
                <h3
                  className="text-xl mb-4"
                  style={{ fontFamily: 'var(--font-subheading)', color: 'var(--navy)' }}
                >
                  {t('footer.followus')}
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{ backgroundColor: 'var(--gold)' }}
                      aria-label={social.name}
                    >
                      <social.icon className="w-6 h-6 text-white" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Google Map Embed */}
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.3291487982467!2d96.16742931485736!3d16.795056088422647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDQ3JzQyLjIiTiA5NsKwMTAnMTAuNiJF!5e0!3m2!1sen!2smm!4v1234567890123!5m2!1sen!2smm"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Save The Date Location"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
