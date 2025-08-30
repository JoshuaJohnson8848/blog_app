'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const { user } = useAuth();
  console.log('LOGGED USER',user);

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard'},
    { label: 'My Posts', href: '/posts/list' },
    { label: 'Create Post', href: '/posts/create' },
    { label: 'Profile', href: '/profile' },
  ];

  const adminItems = [
    { label: 'Manage Users', href: '/admin/users' },
    { label: 'All Posts', href: '/admin/posts' },
  ];

  return (
    <div className="flex">
      <aside
        className={`${
          isOpen ? 'w-64' : 'w-16'
        } bg-blue-900 text-white transition-all duration-300 ease-in-out h-screen fixed left-0 top-0 z-50`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          <h2 className={isOpen ? 'text-xl font-bold' : 'text-xl'}>
            {isOpen && 'BlogApp'}
          </h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="mt-6 px-3">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-blue-800 text-white'
                      : 'text-gray-300 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  {/* <span className="mr-3">{item.icon}</span> */}
                  {isOpen && <span>{item.label}</span>}
                </a>
              </li>
            ))}
          </ul>

          {/* {user.role === 'admin' && ( */}
            <div className="mt-8 border-t border-gray-700 pt-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Admin</h3>
              <ul className="space-y-2">
                {adminItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`flex items-center p-3 rounded-lg transition-colors ${
                        pathname === item.href
                          ? 'bg-blue-800 text-white'
                          : 'text-gray-300 hover:bg-blue-800 hover:text-white'
                      }`}
                    >
                      {/* <span className="mr-3">{item.icon}</span> */}
                      {isOpen && <span>{item.label}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          {/* )} */}
        </nav>
      </aside>

      <main className={`ml-${isOpen ? '64' : '16'} w-full min-h-screen transition-all duration-300 ease-in-out`}>
        <div className="p-6"></div>
      </main>
    </div>
  );
}