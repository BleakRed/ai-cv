'use client';
import { useAuth } from '@/lib/auth-context';
import { cvAPI } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const [cvs, setCvs] = useState<any[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      cvAPI.list().then(setCvs);
    }
  }, [isAuthenticated]);

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;

  return (
    <div>
      <h1>Welcome, {user?.full_name || user?.username}</h1>
      <ul>
        {cvs.map(cv => (
          <li key={cv.id}>{cv.title}</li>
        ))}
      </ul>
    </div>
  );
}
