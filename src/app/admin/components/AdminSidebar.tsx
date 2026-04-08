import { NavLink } from 'react-router';
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
  X,
  ExternalLink,
} from 'lucide-react';

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { path: '/admin/banners', icon: Image, label: 'Banners' },
  { path: '/admin/home', icon: Home, label: 'Home Content' },
  { path: '/admin/testimonials', icon: Star, label: 'Testimonials' },
  { path: '/admin/about', icon: Info, label: 'About Us' },
  { path: '/admin/services', icon: Briefcase, label: 'Services' },
  { path: '/admin/gallery', icon: Camera, label: 'Gallery' },
  { path: '/admin/faqs', icon: HelpCircle, label: 'FAQs' },
  { path: '/admin/contact', icon: Phone, label: 'Contact & Footer' },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  return (
    <>
      {/* Overlay on mobile */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: 'var(--navy)' }}
      >
        {/* Brand header */}
        <div
          className="flex items-center justify-between h-20 px-6 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div>
            <p
              className="text-white font-bold text-lg leading-none"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              CMS Admin
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--gold)' }}>
              Save The Date
            </p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {navItems.map(({ path, icon: Icon, label, end }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-[var(--navy)] shadow-sm'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`
                  }
                  style={({ isActive }) =>
                    isActive ? { backgroundColor: 'var(--gold)' } : {}
                  }
                >
                  <Icon className="w-4.5 h-4.5 flex-shrink-0" style={{ width: 18, height: 18 }} />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div
          className="p-3 flex-shrink-0"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/10 text-sm transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            View Website
          </a>
        </div>
      </aside>
    </>
  );
}
