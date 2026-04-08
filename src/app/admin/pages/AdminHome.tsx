import { useState } from 'react';
import { useCMS } from '../../cms/CMSContext';
import { SectionEditor } from '../components/SectionEditor';
import { toast } from 'sonner';
import type { HomeContent } from '../../cms/cmsTypes';
import { defaultCMSData } from '../../cms/cmsDefaults';
import { Home } from 'lucide-react';

export function AdminHome() {
  const { data, updateSection } = useCMS();
  const [values, setValues] = useState<HomeContent>({ ...data.home });

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSection = (keys: (keyof HomeContent)[]) => {
    const patch: Partial<HomeContent> = {};
    keys.forEach((k) => {
      patch[k] = values[k];
    });
    updateSection('home', { ...data.home, ...patch });
    toast.success('Changes saved');
  };

  const handleResetSection = (keys: (keyof HomeContent)[]) => {
    const patch: Partial<HomeContent> = {};
    keys.forEach((k) => {
      patch[k] = defaultCMSData.home[k];
    });
    setValues((prev) => ({ ...prev, ...patch }));
    updateSection('home', { ...data.home, ...patch });
    toast.success('Section reset to default');
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl space-y-6">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: 'var(--navy)' }}
        >
          <Home className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
          >
            Home Content
          </h1>
          <p className="text-sm text-gray-500">
            Edit text shown on the home page. Empty fields use site defaults.
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <SectionEditor
        title="Hero Section"
        description="Text overlaid on the hero banner slider"
        fields={[
          {
            key: 'heroTitle',
            label: 'Hero Title',
            placeholder: 'e.g. Creating Unforgettable Moments',
            helperText: 'Leave empty to use default translation',
          },
          {
            key: 'heroSubtitle',
            label: 'Hero Subtitle',
            placeholder: 'e.g. Professional Event Planning & Decoration Services',
          },
        ]}
        values={values}
        onChange={handleChange}
        onSave={() => handleSaveSection(['heroTitle', 'heroSubtitle'])}
        onReset={() => handleResetSection(['heroTitle', 'heroSubtitle'])}
      />

      {/* About Section */}
      <SectionEditor
        title="About Section"
        description="About section text on the home page"
        fields={[
          { key: 'aboutTitle', label: 'Section Title' },
          {
            key: 'aboutDescription',
            label: 'Description',
            type: 'textarea',
            rows: 4,
          },
          {
            key: 'statsExperience',
            label: 'Years of Experience Label',
            placeholder: 'e.g. Years of Experience',
          },
          {
            key: 'statsEvents',
            label: 'Events Label',
            placeholder: 'e.g. Events Completed',
          },
          {
            key: 'statsClients',
            label: 'Clients Label',
            placeholder: 'e.g. Happy Clients',
          },
        ]}
        values={values}
        onChange={handleChange}
        onSave={() =>
          handleSaveSection([
            'aboutTitle',
            'aboutDescription',
            'statsExperience',
            'statsEvents',
            'statsClients',
          ])
        }
        onReset={() =>
          handleResetSection([
            'aboutTitle',
            'aboutDescription',
            'statsExperience',
            'statsEvents',
            'statsClients',
          ])
        }
      />

      {/* Services Section */}
      <SectionEditor
        title="Services Section"
        description="Title and subtitle for the services preview on the home page"
        fields={[
          { key: 'servicesTitle', label: 'Section Title' },
          { key: 'servicesSubtitle', label: 'Subtitle' },
        ]}
        values={values}
        onChange={handleChange}
        onSave={() => handleSaveSection(['servicesTitle', 'servicesSubtitle'])}
        onReset={() => handleResetSection(['servicesTitle', 'servicesSubtitle'])}
      />

      {/* Portfolio Section */}
      <SectionEditor
        title="Portfolio Section"
        description="Title and subtitle for the portfolio/gallery preview on the home page"
        fields={[
          { key: 'portfolioTitle', label: 'Section Title' },
          { key: 'portfolioSubtitle', label: 'Subtitle' },
        ]}
        values={values}
        onChange={handleChange}
        onSave={() => handleSaveSection(['portfolioTitle', 'portfolioSubtitle'])}
        onReset={() => handleResetSection(['portfolioTitle', 'portfolioSubtitle'])}
      />

      {/* Testimonials Section */}
      <SectionEditor
        title="Testimonials Section"
        description="Title and subtitle for the testimonials section on the home page"
        fields={[
          { key: 'testimonialsTitle', label: 'Section Title' },
          { key: 'testimonialsSubtitle', label: 'Subtitle' },
        ]}
        values={values}
        onChange={handleChange}
        onSave={() => handleSaveSection(['testimonialsTitle', 'testimonialsSubtitle'])}
        onReset={() => handleResetSection(['testimonialsTitle', 'testimonialsSubtitle'])}
      />
    </div>
  );
}
