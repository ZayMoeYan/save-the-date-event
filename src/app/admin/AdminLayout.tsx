import { useState } from 'react';
import { Outlet } from 'react-router';
import { AdminSidebar } from './components/AdminSidebar';
import { Menu } from 'lucide-react';

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Sidebar */}
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <div
          className="lg:hidden flex items-center h-16 px-4 bg-white flex-shrink-0"
          style={{ borderBottom: '1px solid #e5e7eb' }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6" style={{ color: 'var(--navy)' }} />
          </button>
          <span
            className="ml-3 font-semibold text-base"
            style={{ fontFamily: 'var(--font-subheading)', color: 'var(--navy)' }}
          >
            CMS Admin
          </span>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
