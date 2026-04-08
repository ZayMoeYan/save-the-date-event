import { Link } from 'react-router';
import { useCMS } from '../../cms/CMSContext';
import type { CMSData } from '../../cms/cmsTypes';
import {
  LayoutDashboard,
  Image,
  Home,
  Star,
  Info,
  Briefcase,
  Camera,
  HelpCircle,
  Phone,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';

interface SectionCard {
  title: string;
  icon: React.ElementType;
  path: string;
  bgColor: string;
  getCount: (d: CMSData) => number;
  unit: string;
}

const sections: SectionCard[] = [
  {
    title: 'Banners',
    icon: Image,
    path: '/admin/banners',
    bgColor: '#e8f4fd',
    getCount: (d) => d.banners.length,
    unit: 'banners',
  },
  {
    title: 'Home Content',
    icon: Home,
    path: '/admin/home',
    bgColor: '#f0fdf4',
    getCount: (d) => Object.values(d.home).filter(Boolean).length,
    unit: 'fields',
  },
  {
    title: 'Testimonials',
    icon: Star,
    path: '/admin/testimonials',
    bgColor: '#fefce8',
    getCount: (d) => d.testimonials.length,
    unit: 'reviews',
  },
  {
    title: 'About Us',
    icon: Info,
    path: '/admin/about',
    bgColor: '#fdf4ff',
    getCount: (d) => Object.values(d.about).filter(Boolean).length,
    unit: 'fields',
  },
  {
    title: 'Services',
    icon: Briefcase,
    path: '/admin/services',
    bgColor: '#fff7ed',
    getCount: (d) => d.services.length,
    unit: 'services',
  },
  {
    title: 'Gallery',
    icon: Camera,
    path: '/admin/gallery',
    bgColor: '#f0f9ff',
    getCount: (d) => d.gallery.length,
    unit: 'images',
  },
  {
    title: 'FAQs',
    icon: HelpCircle,
    path: '/admin/faqs',
    bgColor: '#f0fdf4',
    getCount: (d) => d.faqs.length,
    unit: 'FAQs',
  },
  {
    title: 'Contact & Footer',
    icon: Phone,
    path: '/admin/contact',
    bgColor: '#fff1f2',
    getCount: (d) => Object.values(d.contact).filter(Boolean).length,
    unit: 'fields',
  },
];

export function AdminDashboard() {
  const { data, resetToDefaults } = useCMS();

  const handleReset = () => {
    if (
      window.confirm(
        'Reset ALL CMS data to defaults? This will clear all your custom content and cannot be undone.',
      )
    ) {
      resetToDefaults();
      toast.success('CMS data reset to defaults');
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--navy)' }}
          >
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1
              className="text-2xl font-bold leading-none"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
            >
              Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage your website content
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-600 border border-red-200 hover:bg-red-50 transition-colors text-sm font-medium self-start sm:self-auto"
        >
          <RotateCcw className="w-4 h-4" />
          Reset All to Defaults
        </button>
      </div>

      {/* Section cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {sections.map(({ title, icon: Icon, path, bgColor, getCount, unit }) => {
          const count = getCount(data);
          return (
            <Link
              key={path}
              to={path}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: bgColor }}
              >
                <Icon className="w-5 h-5" style={{ color: 'var(--navy)' }} />
              </div>
              <h3
                className="font-semibold text-gray-800 mb-1 text-sm"
                style={{ fontFamily: 'var(--font-subheading)' }}
              >
                {title}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  {count > 0 ? (
                    <span className="text-green-600 font-medium">
                      {count} {unit}
                    </span>
                  ) : (
                    <span className="text-amber-500">Using defaults</span>
                  )}
                </p>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[var(--navy)] transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* How it works */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2
          className="font-semibold mb-5 text-base"
          style={{ fontFamily: 'var(--font-subheading)', color: 'var(--navy)' }}
        >
          How It Works
        </h2>
        <div className="grid sm:grid-cols-3 gap-5 text-sm">
          {[
            {
              step: '1',
              title: 'Edit Content',
              desc: 'Click any section above to manage its content — text, images, and more.',
            },
            {
              step: '2',
              title: 'Auto-Saved',
              desc: 'All changes are saved automatically to localStorage in your browser.',
            },
            {
              step: '3',
              title: 'Instant Preview',
              desc: 'Open the website to see your updates live. No refresh needed.',
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: 'var(--gold)' }}
              >
                {step}
              </div>
              <div>
                <p className="font-medium text-gray-800 mb-1">{title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Notice */}
        <div
          className="mt-5 p-3 rounded-xl text-xs text-gray-500 flex items-start gap-2"
          style={{ backgroundColor: '#fffbeb' }}
        >
          <span className="text-amber-500 font-bold mt-0.5">⚠</span>
          <p>
            Images are stored as base64 in localStorage. Keep images small (under 2 MB each) to
            avoid hitting the ~5 MB browser storage limit.
          </p>
        </div>
      </div>
    </div>
  );
}
