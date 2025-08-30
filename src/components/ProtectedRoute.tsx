'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: string;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div className="flex justify-center items-center h-20">Loading...</div>;
  }

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  if (requiredRole && user.role !== requiredRole) {
    router.push('/');
    return <div className="text-red-600 font-medium">Access Denied: Admins Only</div>;
  }

  return <>{children}</>;
}