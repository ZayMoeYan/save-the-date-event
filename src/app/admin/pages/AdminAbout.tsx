import { useState } from 'react';
import { useCMS } from '../../cms/CMSContext';
import { SectionEditor } from '../components/SectionEditor';
import { toast } from 'sonner';
import type { AboutContent } from '../../cms/cmsTypes';
import { defaultCMSData } from '../../cms/cmsDefaults';
import { Info } from 'lucide-react';

export function AdminAbout() {
  const { data, updateSection } = useCMS();
  const [values, setValues] = useState<AboutContent>({ ...data.about });

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = (keys: (keyof AboutContent)[]) => {
    const patch: Partial<AboutContent> = {};
    keys.forEach((k) => {
      patch[k] = values[k];
    });
    updateSection('about', { ...data.about, ...patch });
    toast.success('Changes saved');
  };

  const handleReset = (keys: (keyof AboutContent)[]) => {
    const patch: Partial<AboutContent> = {};
    keys.forEach((k) => {
      patch[k] = defaultCMSData.about[k];
    });
    setValues((prev) => ({ ...prev, ...patch }));
    updateSection('about', { ...data.about, ...patch });
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
          <Info className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}
          >
            About Us
          </h1>
          <p className="text-sm text-gray-500">
            Edit About page content. Empty fields use site defaults.
          </p>
        </div>
      </div>

      {/* Hero Banner */}
      <SectionEditor
        title="Page Banner"
        description="Title and subtitle shown on the About page hero banner"
        fields={[
          {
            key: 'bannerTitle',
            label: 'Banner Title',
            placeholder: 'e.g. About Save The Date',
          },
          {
            key: 'bannerSubtitle',
            label: 'Banner Subtitle',
            placeholder: 'e.g. Professional Event Planning & Decoration',
          },
        ]}
        values={values}
        onChange={handleChange}
        onSave={() => handleSave(['bannerTitle', 'bannerSubtitle'])}
        onReset={() => handleReset(['bannerTitle', 'bannerSubtitle'])}
      />

      {/* Our Story */}
      <SectionEditor
        title="Our Story"
        description="Story section that appears below the banner"
        fields={[
          { key: 'storyTitle', label: 'Section Title', placeholder: 'e.g. Our Story' },
          {
            key: 'storyText',
            label: 'Story Text',
            type: 'textarea',
            rows: 5,
            placeholder: 'Enter your story…',
          },
        ]}
        values={values}
        onChange={handleChange}
        onSave={() => handleSave(['storyTitle', 'storyText'])}
        onReset={() => handleReset(['storyTitle', 'storyText'])}
      />

      {/* Mission & Vision */}
      <SectionEditor
        title="Mission & Vision"
        description="Mission and vision cards on the About page"
        fields={[
          { key: 'missionTitle', label: 'Mission Title', placeholder: 'e.g. Our Mission' },
          {
            key: 'missionText',
            label: 'Mission Text',
            type: 'textarea',
            rows: 3,
          },
          { key: 'visionTitle', label: 'Vision Title', placeholder: 'e.g. Our Vision' },
          {
            key: 'visionText',
            label: 'Vision Text',
            type: 'textarea',
            rows: 3,
          },
        ]}
        values={values}
        onChange={handleChange}
        onSave={() => handleSave(['missionTitle', 'missionText', 'visionTitle', 'visionText'])}
        onReset={() => handleReset(['missionTitle', 'missionText', 'visionTitle', 'visionText'])}
      />

      {/* Our Team */}
      <SectionEditor
        title="Our Team"
        description="Team section text on the About page"
        fields={[
          { key: 'teamTitle', label: 'Section Title', placeholder: 'e.g. Our Team' },
          {
            key: 'teamText',
            label: 'Team Description',
            type: 'textarea',
            rows: 3,
          },
        ]}
        values={values}
        onChange={handleChange}
        onSave={() => handleSave(['teamTitle', 'teamText'])}
        onReset={() => handleReset(['teamTitle', 'teamText'])}
      />
    </div>
  );
}
