'use client';
import { ReactNode, useEffect, useState } from 'react';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('lux-theme') : null;
    if (stored === 'dark') document.documentElement.classList.add('dark');
    setReady(true);
  }, []);
  if (!ready) return null;
  return children as any;
}

export function toggleTheme() {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('lux-theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('lux-theme', 'dark');
  }
}
