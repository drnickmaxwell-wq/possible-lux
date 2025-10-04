'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface MinimalHeroVideoProps {
  videoSrc?: string;
  posterImage?: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  overlayOpacity?: number;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export default function MinimalHeroVideo({
  videoSrc = '/videos/dental-hero-4k.mp4',
  posterImage = '/hero-poster.jpg',
  title,
  subtitle,
  ctaText = 'Book Free Consultation',
  onCtaClick = () => (window.location.href = '/appointments'),
  overlayOpacity = 0.35,
  className = '',
  autoPlay = true,
  muted = true,
  loop = true,
}: MinimalHeroVideoProps) {
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
    <section className={`relative w-full h-[min(100svh,100vh)] overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
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

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"
        style={{ opacity: overlayOpacity }}
      />

      <div className="relative z-10 h-full flex items-center justify-center px-6 text-center">
        <div className="max-w-3xl">
          <motion.h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="bg-gradient-to-r from-pink-300 via-teal-300 to-yellow-300 bg-clip-text text-transparent">
              {title}
            </span>
          </motion.h1>

          {subtitle && (
            <motion.p
              className="mt-6 text-xl sm:text-2xl text-white/90 leading-relaxed"
              style={{ fontFamily: 'Lora, serif' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <button
              onClick={onCtaClick}
              className="group relative px-8 py-4 rounded-full text-white font-semibold text-lg bg-gradient-to-r from-pink-600 via-teal-500 to-yellow-500 hover:shadow-2xl hover:scale-105 transition"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <span className="relative z-10">{ctaText}</span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-700 via-teal-600 to-yellow-600 opacity-0 group-hover:opacity-100 transition" />
            </button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-pink-600 via-teal-500 to-yellow-500 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-14 h-14 border-4 border-white/40 border-t-white rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
