import { RouterProvider } from 'react-router';
import { router } from './routes';
import { LanguageProvider } from './context/LanguageContext';
import { CMSProvider } from './cms/CMSContext';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <CMSProvider>
      <LanguageProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </LanguageProvider>
    </CMSProvider>
  );
}
