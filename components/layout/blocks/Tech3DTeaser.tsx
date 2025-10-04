'use client';
import { motion } from 'framer-motion';

export default function Tech3DTeaser(){
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white" style={{fontFamily:'Montserrat, sans-serif'}}>3D & Digital</h3>
          <p className="mt-2 text-slate-700 dark:text-slate-300" style={{fontFamily:'Lora, serif'}}>
            Precision scanners, same‑day crowns, AR smile previews and gentle comfort tech.
          </p>
          <a href="/preview/lux/3d-showcase" className="mt-4 inline-flex items-center rounded-full px-5 py-2 text-white font-semibold bg-gradient-to-r from-pink-600 via-teal-500 to-yellow-500">Explore Technology</a>
        </div>
        <motion.div
          initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ duration:0.4 }}
          className="aspect-[16/10] rounded-2xl border bg-white/60 dark:bg-white/5 grid place-items-center"
        >
          <span className="opacity-60">3D viewer teaser (lazy)</span>
        </motion.div>
      </div>
    </section>
  );
}
