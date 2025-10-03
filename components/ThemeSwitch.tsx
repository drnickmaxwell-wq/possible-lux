'use client';
import { toggleTheme } from '@/app/theme-provider';

export function ThemeSwitch() {
  return (
    <button
      onClick={toggleTheme}
      className="lux-button lux-button--primary lux-shimmer"
      aria-label="Toggle theme"
    >
      Toggle Light / Ink
    </button>
  );
}
