'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Brand Colors: Magenta #C2185B, Turquoise #40C4B4, Gold #D4AF37
// Fonts: Montserrat headings, Lora body text

export interface SplitHeroVideoProps {
  videoSrc?: string;
  posterImage?: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
  ctaPrimaryText?: string;
  onCtaPrimary?: () => void;
  ctaSecondaryText?: string;
  onCtaSecondary?: () => void;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export default function SplitHeroVideo({
  videoSrc = '/videos/dental-hero-4k.mp4',
  posterImage = '/hero-poster.jpg',
  kicker = 'Luxury Coastal Dentistry',
  title,
  subtitle,
  bullets = ['CQC Outstanding', 'Same-day crowns', 'Anxiety-friendly care'],
  ctaPrimaryText = 'Book Free Consultation',
  onCtaPrimary = () => (window.location.href = '/appointments'),
  ctaSecondaryText = 'Explore Treatments',
  onCtaSecondary = () => (window.location.href = '/treatments'),
  className = '',
  autoPlay = true,
  muted = true,
  loop = true,
}: SplitHeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onLoaded = () => setLoaded(true);
    v.addEventListener('loadeddata', onLoaded);
    return () => v.removeEventListener('loadeddata', onLoaded);
  }, []);

  return (
    <section className={`relative w-full min-h-[min(100svh,720px)] ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left: Copy */}
        <div>
          <motion.span
            className="inline-block text-sm tracking-wide text-pink-600 dark:text-pink-400"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {kicker}
          </motion.span>

          <motion.h1
            className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <span className="bg-gradient-to-r from-pink-600 via-teal-500 to-yellow-500 bg-clip-text text-transparent">
              {title}
            </span>
          </motion.h1>

          {subtitle && (
            <motion.p
              className="mt-5 text-lg text-slate-700 dark:text-slate-300 leading-relaxed"
              style={{ fontFamily: 'Lora, serif' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}

          {bullets?.length > 0 && (
            <ul className="mt-6 grid gap-3">
              {bullets.map((b, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-slate-800 dark:text-slate-200"
                  style={{ fontFamily: 'Lora, serif' }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.12 + i * 0.04 }}
                >
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-gradient-to-r from-pink-600 to-teal-500" />
                  <span>{b}</span>
                </motion.li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={onCtaPrimary}
              className="px-7 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-pink-600 via-teal-500 to-yellow-500 hover:shadow-2xl hover:scale-105 transition"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {ctaPrimaryText}
            </button>
            <button
              onClick={onCtaSecondary}
              className="px-7 py-3 rounded-full font-semibold border border-slate-300/60 dark:border-white/20 text-slate-800 dark:text-slate-100 hover:bg-white/10 transition"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {ctaSecondaryText}
            </button>
          </div>
        </div>

        {/* Right: Video card */}
        <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-black/10 pointer-events-none" />
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster={posterImage}
            playsInline
            preload="metadata"
            muted={muted}
            loop={loop}
            autoPlay={autoPlay && !prefersReducedMotion}
          >
            <source src={videoSrc} type="video/mp4" />
            <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
          </video>
          {/* Subtle brand frame */}
          <div className="pointer-events-none absolute -inset-[2px] rounded-2xl ring-2 ring-transparent"
               style={{ boxShadow: '0 0 0 1px rgba(210,210,210,0.25), inset 0 0 0 1px rgba(255,255,255,0.06)' }} />
        </div>
      </div>
    </section>
  );
}
