'use client';
import StickyHeader from '@/components/layout/sticky-header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';

export default function TreatmentsIndex(){
  const items = [
    { slug:'veneers', name:'Porcelain Veneers', blurb:'Subtle, natural transformations.' },
    { slug:'implants', name:'Dental Implants', blurb:'Confident smiles that last.' },
    { slug:'whitening', name:'Teeth Whitening', blurb:'Brighten with care & science.' },
    { slug:'3d-dentistry', name:'3D Digital Dentistry', blurb:'Same‑day precision & comfort.' }
  ];
  return (
    <main className="min-h-screen bg-white dark:bg-[#0b1220]">
      <StickyHeader />
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="text-3xl font-bold">Treatments</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {items.map(i => (
            <Link key={i.slug} href={`/preview/lux/treatments/${i.slug}`} className="rounded-xl p-4 bg-white/70 dark:bg-white/5 border">
              <h3 className="font-semibold">{i.name}</h3>
              <p className="opacity-80 text-sm">{i.blurb}</p>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}