'use client';
import { useParams } from 'next/navigation';
import StickyHeader from '@/components/layout/sticky-header';
import Footer from '@/components/layout/footer';

export default function TreatmentDetail(){
  const { slug } = useParams();
  return (
    <main className="min-h-screen bg-white dark:bg-[#0b1220]">
      <StickyHeader />
      <section className="max-w-4xl mx-auto px-6 py-14">
        <h1 className="text-3xl font-bold capitalize">{String(slug).replace('-', ' ')}</h1>
        <div className="mt-4 grid gap-4">
          <div className="aspect-[16/9] rounded-xl bg-white/60 dark:bg-white/5 border grid place-items-center">3D hero placeholder</div>
          <p className="text-slate-700 dark:text-slate-300">High‑level overview, benefits, comfort tech, FAQs.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}