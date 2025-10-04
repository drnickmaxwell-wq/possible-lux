'use client';

import StickyHeader from '@/components/layout/sticky-header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/layout/hero';
import BrandGradient from '@/components/effects/brand-gradient';

import TreatmentsGrid from '@/components/layout/blocks/TreatmentsGrid';
import TestimonialsBand from '@/components/layout/blocks/TestimonialsBand';
import FinanceCta from '@/components/layout/blocks/FinanceCta';
import Tech3DTeaser from '@/components/layout/blocks/Tech3DTeaser';
import EmergencyStrip from '@/components/layout/blocks/EmergencyStrip';
import BlogPreview from '@/components/layout/blocks/BlogPreview';

export default function LuxPreviewHomeV3() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0b1220]">
      <StickyHeader />

      {/* HERO with brand gradient */}
      <section className="relative">
        <BrandGradient className="absolute inset-0 -z-10" />
        <Hero
          variant="video-minimal"
          title="Luxury Coastal Dentistry"
          subtitle="Advanced, anxiety-free care with 3D digital precision in Shoreham‑by‑Sea."
          ctaText="Book Free Consultation"
          onCtaClick={() => (window.location.href = '/contact')}
          videoSrc="/videos/dental-hero-4k.mp4"
          posterImage="/hero-poster.jpg"
        />
      </section>

      {/* Signature luxury bands */}
      <TreatmentsGrid />

      <TestimonialsBand />

      <FinanceCta />

      <Tech3DTeaser />

      <EmergencyStrip />

      <BlogPreview />

      <Footer />
    </main>
  );
}
