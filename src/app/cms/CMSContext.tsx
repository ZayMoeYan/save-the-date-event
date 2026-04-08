import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import type { CMSData } from './cmsTypes';
import { defaultCMSData } from './cmsDefaults';

export const CMS_STORAGE_KEY = 'cms_data';

interface CMSContextType {
  data: CMSData;
  updateSection: <K extends keyof CMSData>(section: K, value: CMSData[K]) => void;
  resetToDefaults: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

function loadFromStorage(): CMSData {
  try {
    const stored = localStorage.getItem(CMS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<CMSData>;
      return {
        ...defaultCMSData,
        ...parsed,
        home: { ...defaultCMSData.home, ...(parsed.home ?? {}) },
        about: { ...defaultCMSData.about, ...(parsed.about ?? {}) },
        contact: { ...defaultCMSData.contact, ...(parsed.contact ?? {}) },
      };
    }
  } catch {
    // fall through to defaults
  }
  return defaultCMSData;
}

export function CMSProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CMSData>(loadFromStorage);

  // Sync across browser tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key !== CMS_STORAGE_KEY) return;
      if (e.newValue) {
        try {
          setData(JSON.parse(e.newValue) as CMSData);
        } catch {
          // ignore malformed data
        }
      } else {
        setData(defaultCMSData);
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const updateSection = useCallback(<K extends keyof CMSData>(section: K, value: CMSData[K]) => {
    setData((prev) => {
      const next = { ...prev, [section]: value };
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetToDefaults = useCallback(() => {
    localStorage.removeItem(CMS_STORAGE_KEY);
    setData(defaultCMSData);
  }, []);

  return (
    <CMSContext.Provider value={{ data, updateSection, resetToDefaults }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const ctx = useContext(CMSContext);
  if (!ctx) throw new Error('useCMS must be used within CMSProvider');
  return ctx;
}
