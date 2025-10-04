'use client';
import { motion } from 'framer-motion';

const cards = [
  { h:'Porcelain Veneers', p:'Subtle, natural transformations.', href:'/treatments/veneers' },
  { h:'Dental Implants', p:'Confident smiles that last.', href:'/treatments/implants' },
  { h:'3D Digital Dentistry', p:'Same‑day precision & comfort.', href:'/treatments/3d-dentistry' },
  { h:'Teeth Whitening', p:'Brighten with care & science.', href:'/treatments/whitening' },
  { h:'Emergency Dentist', p:'Urgent care 24/7 hotline.', href:'/emergency-dentist' },
  { h:'Anxiety Dentistry', p:'Comfort-first, pain‑managed.', href:'/anxiety-dentistry' },
];

export default function TreatmentsGrid(){
  return (
    <section className="relative py-18 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white" style={{fontFamily:'Montserrat, sans-serif'}}>Our Treatments</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300" style={{fontFamily:'Lora, serif'}}>Calm, precise and beautifully natural outcomes.</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {cards.map((c,i)=>(
            <motion.a key={c.h} href={c.href}
              initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.3 }}
              transition={{ duration:0.4, delay:i*0.05 }}
              className="rounded-2xl p-6 bg-white/70 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/10 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white" style={{fontFamily:'Montserrat, sans-serif'}}>{c.h}</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300" style={{fontFamily:'Lora, serif'}}>{c.p}</p>
              <div className="mt-4 inline-flex items-center rounded-full px-4 py-2 text-white font-semibold bg-gradient-to-r from-pink-600 via-teal-500 to-yellow-500">Explore</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
