import { useState } from 'react';
import { useCMS } from '../../cms/CMSContext';
import { defaultCMSData } from '../../cms/cmsDefaults';
import type { ContactInfo } from '../../cms/cmsTypes';
import { toast } from 'sonner';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Video,
  Map,
  Phone as PhoneIcon,
} from 'lucide-react';

const fields: {
  key: keyof ContactInfo;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ElementType;
  helperText?: string;
}[] = [
  {
    key: 'location',
    label: 'Address / Location',
    type: 'text',
    placeholder: 'e.g. Yangon, Myanmar',
    icon: MapPin,
  },
  {
    key: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: 'e.g. +95 9 XXX XXX XXX',
    icon: Phone,
  },
  {
    key: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'e.g. info@savethedate.com',
    icon: Mail,
  },
  {
    key: 'facebook',
    label: 'Facebook URL',
    type: 'url',
    placeholder: 'e.g. https://www.facebook.com/...',
    icon: Facebook,
  },
  {
    key: 'instagram',
    label: 'Instagram URL',
    type: 'url',
    placeholder: 'e.g. https://www.instagram.com/...',
    icon: Instagram,
  },
  {
    key: 'tiktok',
    label: 'TikTok URL',
    type: 'url',
    placeholder: 'e.g. https://www.tiktok.com/...',
    icon: Video,
  },
  {
    key: 'googleMap',
    label: 'Google Maps Link',
    type: 'url',
    placeholder: 'e.g. https://maps.app.goo.gl/...',
    icon: Map,
    helperText: 'Paste the Google Maps share link (used in the Contact page)',
  },
];

export function AdminContact() {
  const { data, updateSection } = useCMS();
  const [values, setValues] = useState<ContactInfo>({ ...data.contact });

  const handleChange = (key: keyof ContactInfo, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    updateSection('contact', values);
    toast.success('Contact information saved');
  };

  const handleReset = () => {
    setValues({ ...defaultCMSData.contact });
    updateSection('contact', defaultCMSData.contact);
    toast.success('Contact information reset to defaults');
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: 'var(--navy)' }}
        >
          <PhoneIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
          >
            Contact & Footer
          </h1>
          <p className="text-sm text-gray-500">
            Single source of truth for contact info used in both Footer and Contact page.
          </p>
        </div>
      </div>

      {/* Info notice */}
      <div
        className="mb-6 p-3 rounded-xl text-xs text-gray-500 flex items-start gap-2"
        style={{ backgroundColor: '#eff6ff' }}
      >
        <span className="text-blue-500 font-bold mt-0.5">ℹ</span>
        <p>
          These values are shared between the <strong>Footer</strong> and the{' '}
          <strong>Contact page</strong>. Empty fields fall back to the hardcoded defaults.
        </p>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 space-y-5">
          {fields.map(({ key, label, type, placeholder, icon: Icon, helperText }) => (
            <div key={key} className="space-y-1">
              <label
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
                style={{ fontFamily: 'var(--font-subheading)' }}
              >
                <Icon className="w-4 h-4" style={{ color: 'var(--gold)' }} />
                {label}
              </label>
              <input
                type={type}
                value={values[key] ?? ''}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent transition"
              />
              {helperText && (
                <p className="text-xs text-gray-400 mt-1">{helperText}</p>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/60 flex justify-between items-center">
          <button
            onClick={handleReset}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 text-sm rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'var(--navy)' }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
