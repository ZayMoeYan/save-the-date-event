import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { FAQs } from './pages/FAQs';
import { Gallery } from './pages/Gallery';
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/pages/AdminDashboard';
import { AdminBanners } from './admin/pages/AdminBanners';
import { AdminHome } from './admin/pages/AdminHome';
import { AdminTestimonials } from './admin/pages/AdminTestimonials';
import { AdminAbout } from './admin/pages/AdminAbout';
import { AdminServices } from './admin/pages/AdminServices';
import { AdminGallery } from './admin/pages/AdminGallery';
import { AdminFAQs } from './admin/pages/AdminFAQs';
import { AdminContact } from './admin/pages/AdminContact';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'about',
        Component: About,
      },
      {
        path: 'services',
        Component: Services,
      },
       {
        path: 'gallery',
        Component: Gallery,
      },
      {
        path: 'contact',
        Component: Contact,
      },
      {
        path: 'faqs',
        Component: FAQs,
      },
    ],
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: 'banners', Component: AdminBanners },
      { path: 'home', Component: AdminHome },
      { path: 'testimonials', Component: AdminTestimonials },
      { path: 'about', Component: AdminAbout },
      { path: 'services', Component: AdminServices },
      { path: 'gallery', Component: AdminGallery },
      { path: 'faqs', Component: AdminFAQs },
      { path: 'contact', Component: AdminContact },
    ],
  },
]);
