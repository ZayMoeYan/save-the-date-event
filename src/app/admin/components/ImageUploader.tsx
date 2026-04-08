import { useRef } from 'react';
import { Upload, LinkIcon, X } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function ImageUploader({ value, onChange, label = 'Image' }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be under 2MB to store in localStorage.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
    // reset input so same file can be re-selected
    e.target.value = '';
  };

  const isBase64 = value.startsWith('data:');
  const urlValue = isBase64 ? '' : value;

  return (
    <div className="space-y-3">
      <label
        className="block text-sm font-medium"
        style={{ color: 'var(--navy)', fontFamily: 'var(--font-subheading)' }}
      >
        {label}
      </label>

      {/* Preview */}
      {value && (
        <div className="relative w-full h-44 rounded-xl overflow-hidden bg-gray-100 group border border-gray-200">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Upload file button */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500 hover:border-[var(--navy)] hover:text-[var(--navy)] transition-colors"
      >
        <Upload className="w-4 h-4" />
        Upload Image (max 2 MB)
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      {/* URL input */}
      <div className="relative">
        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="url"
          placeholder="Or enter image URL..."
          value={urlValue}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
          style={{ '--tw-ring-color': 'var(--gold)' } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
