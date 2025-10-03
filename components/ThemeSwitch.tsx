'use client';
import { useEffect, useState } from 'react';

function toggleTheme() {
  const el = document.documentElement;
  const dark = el.classList.toggle('dark');
  if (dark) localStorage.setItem('lux-theme', 'dark');
  else localStorage.setItem('lux-theme', 'light');
}

export function ThemeSwitch() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('lux-theme') : null;
    if (stored === 'dark') document.documentElement.classList.add('dark');
    setReady(true);
  }, []);
  if (!ready) return null;

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full px-4 py-2 text-sm font-semibold bg-gradient-to-r from-pink-600 to-teal-500 text-white shadow-md hover:opacity-90"
      aria-label="Toggle Light / Ink theme"
    >
      Light / Ink
    </button>
  );
}
