import { Link } from 'react-router';
import logo from '../../assets/images/logo/save-the-date-logo.png';
import { useLanguage } from '../context/LanguageContext';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.about', path: '/about' },
    { key: 'nav.services', path: '/services' },
    { key: 'nav.contact', path: '/contact' },
    { key: 'nav.faqs', path: '/faqs' },
  ];

  const socialLinks = [
    { 
      icon: Facebook, 
      url: 'https://www.facebook.com/SaveTheDatePlannerTeam',
      label: 'Facebook'
    },
    { 
      icon: Instagram, 
      url: 'https://www.instagram.com/savethedateeventplanning',
      label: 'Instagram'
    },
  ];

  return (
    <footer className="bg-[var(--navy)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
                <img
                  src={logo}
                  alt="Save The Date Logo"
                  style={{ width: '180px', height: 'auto', marginBottom: '8px' }}
                />
              <p className="text-sm opacity-90" style={{ fontFamily: 'var(--font-body)' }}>
                Event Planning & Decoration
              </p>
            </div>
            <p className="text-sm opacity-80 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              Creating unforgettable moments with professional event planning and decoration services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4" style={{ fontFamily: 'var(--font-subheading)', color: 'var(--gold)' }}>
              {t('footer.quicklinks')}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.path}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity duration-300"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="mb-4" style={{ fontFamily: 'var(--font-subheading)', color: 'var(--gold)' }}>
              {t('footer.contact')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--gold)' }} />
                <span className="text-sm opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
                  Yangon, Myanmar
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--gold)' }} />
                <span className="text-sm opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
                  +95 9 XXX XXX XXX
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--gold)' }} />
                <span className="text-sm opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
                  info@savethedate.com
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media & Map */}
          <div>
            <h4 className="mb-4" style={{ fontFamily: 'var(--font-subheading)', color: 'var(--gold)' }}>
              {t('footer.followus')}
            </h4>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: 'var(--gold)' }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
            <a
              href="https://maps.app.goo.gl/iT3fbbPVvjcMZ3daA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: 'var(--gold)', fontFamily: 'var(--font-body)' }}
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{t('footer.location')}</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px opacity-20" style={{ backgroundColor: 'var(--gold)' }} />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
