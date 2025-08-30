'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

export default function Sidebar() {
    const pathname = usePathname();
    const [user, setUser] = useState<{ name: string; role: string } | null>(null);

    const menuItems = [
        { label: 'Dashboard', href: '/' },
        ...(user
            ? [
                { label: 'My Posts', href: '/posts/list' },
                { label: 'Create Post', href: '/posts/create' },
                { label: 'Profile', href: '/profile' },
            ]
            : []
        ),
    ];

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        const userName = localStorage.getItem('user_name');
        if (userRole && userName) {
            try {
                setUser({ name: userName || 'User', role: userRole });
            } catch (error) {
                localStorage.removeItem('token');
            }
        }
    }, []);

    const adminItems = [
        { label: 'Manage Users', href: '/admin/users' },
        { label: 'All Posts', href: '/admin/posts' },
    ];

    return (
        <aside className="w-46 bg-blue-600 text-white h-screen fixed left-0 top-0 z-40">
            <div className="p-4 border-b border-blue-500">
                <h2 className="text-xl font-semibold">Blog App</h2>
            </div>

            <nav className="p-4">
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                className={`block p-2 rounded transition-colors ${pathname === item.href
                                    ? 'bg-white text-blue-600 font-medium'
                                    : 'text-white hover:bg-blue-500'
                                    }`}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {user?.role == 'admin' && (
                    <div className="mt-6 pt-4 border-t border-blue-500">
                        <h3 className="text-sm font-semibold text-blue-200 mb-2">Admin Panel</h3>
                        <ul className="space-y-1">
                            {adminItems.map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        className={`block p-2 rounded transition-colors ${pathname === item.href
                                            ? 'bg-white text-blue-600 font-medium'
                                            : 'text-white hover:bg-blue-500'
                                            }`}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>
        </aside>
    );
}