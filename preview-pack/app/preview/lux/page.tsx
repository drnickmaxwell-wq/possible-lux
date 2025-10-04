'use client';

import StickyHeader from '@/components/layout/sticky-header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/layout/hero';
import BrandGradient from '@/components/effects/brand-gradient';

export default function PreviewLuxPage() {
  return (
    <main className="min-h-screen bg-white">
      <StickyHeader />
      <section className="relative">
        <BrandGradient className="absolute inset-0 -z-10" />
        <Hero
          variant="video-minimal"
          title="Luxury Preview — St Mary's House"
          subtitle="This preview page shows the luxury hero, gradient and effects without changing your main site."
          ctaText="Book Free Consultation"
          onCtaClick={() => (window.location.href = '/contact')}
          videoSrc="/videos/dental-hero-4k.mp4"
          posterImage="/hero-poster.jpg"
        />
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-4" style={{fontFamily: 'Montserrat, sans-serif'}}>Preview-only Enhancements</h2>
        <p style={{fontFamily: 'Lora, serif'}}>This route is additive only. It imports your existing header/footer and shows the new hero variants and brand gradient for review.</p>
      </section>

      <Footer />
    </main>
  );
}
