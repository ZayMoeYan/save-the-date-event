import React from 'react';

export interface FieldDef {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'url';
  placeholder?: string;
  helperText?: string;
  rows?: number;
}

interface SectionEditorProps {
  title: string;
  description?: string;
  fields: FieldDef[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: Record<string, any>;
  onChange: (key: string, value: string) => void;
  onSave: () => void;
  onReset?: () => void;
}

export function SectionEditor({
  title,
  description,
  fields,
  values,
  onChange,
  onSave,
  onReset,
}: SectionEditorProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h3
          className="font-semibold text-lg"
          style={{ fontFamily: 'var(--font-subheading)', color: 'var(--navy)' }}
        >
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>

      {/* Fields */}
      <div className="p-6 space-y-5">
        {fields.map(({ key, label, type = 'text', placeholder, helperText, rows = 4 }) => (
          <div key={key} className="space-y-1">
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ fontFamily: 'var(--font-subheading)' }}
            >
              {label}
            </label>
            {type === 'textarea' ? (
              <textarea
                value={String(values[key] ?? '')}
                onChange={(e) => onChange(key, e.target.value)}
                placeholder={placeholder ?? `Enter ${label.toLowerCase()}…`}
                rows={rows}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent transition"
              />
            ) : (
              <input
                type={type === 'url' ? 'url' : 'text'}
                value={String(values[key] ?? '')}
                onChange={(e) => onChange(key, e.target.value)}
                placeholder={placeholder ?? `Enter ${label.toLowerCase()}…`}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent transition"
              />
            )}
            {helperText && (
              <p className="text-xs text-gray-400 mt-1">{helperText}</p>
            )}
          </div>
        ))}
      </div>

      {/* Footer actions */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/60 flex items-center justify-between">
        {onReset ? (
          <button
            type="button"
            onClick={onReset}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            Reset to Default
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={onSave}
          className="px-6 py-2 text-sm rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: 'var(--navy)' }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
