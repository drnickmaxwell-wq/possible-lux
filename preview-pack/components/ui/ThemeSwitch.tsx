'use client';

import React, { useEffect, useState } from 'react';

export function ThemeSwitch() {
  const [theme, setTheme] = useState<'light'|'dark'>('light');

  useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem('site-theme');
    if (stored) {
      setTheme(stored === 'dark' ? 'dark' : 'light');
      root.classList.toggle('dark', stored === 'dark');
    }
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    root.classList.toggle('dark', next === 'dark');
    localStorage.setItem('site-theme', next);
  };

  return (
    <button onClick={toggle} aria-label="Toggle theme" className="p-2 rounded-md border">
      {theme === 'light' ? 'Ink' : 'Light'}
    </button>
  );
}
