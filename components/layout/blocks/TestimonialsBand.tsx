'use client';
import { motion } from 'framer-motion';

const items = [
  { q:'So calm and professional — I finally love my smile.', a:'— J. Carter' },
  { q:'Same‑day crown was unbelievably smooth.', a:'— H. Patel' },
  { q:'The team are incredibly gentle and kind.', a:'— R. Lawson' },
];

export default function TestimonialsBand(){
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-2xl p-8 bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white" style={{fontFamily:'Montserrat, sans-serif'}}>Patient Stories</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {items.map((t,i)=>(
              <motion.blockquote key={i}
                initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ duration:0.4, delay:i*0.07 }}
                className="rounded-xl p-6 bg-white/70 dark:bg-white/5 border border-black/5 dark:border-white/10"
              >
                <p className="text-slate-800 dark:text-slate-200" style={{fontFamily:'Lora, serif'}}>&ldquo;{t.q}&rdquo;</p>
                <footer className="mt-3 text-sm text-slate-600 dark:text-slate-400">{t.a}</footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
