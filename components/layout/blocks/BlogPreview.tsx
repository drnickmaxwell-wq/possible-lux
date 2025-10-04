'use client';
import { motion } from 'framer-motion';

export default function BlogPreview(){
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between gap-4">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white" style={{fontFamily:'Montserrat, sans-serif'}}>From the Journal</h3>
          <a href="/preview/lux/blog" className="text-sm underline">All posts</a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {Array.from({length:3}).map((_,i)=>(
            <motion.article key={i}
              initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ duration:0.35, delay:i*0.06 }}
              className="rounded-xl p-4 bg-white/70 dark:bg-white/5 border border-black/5 dark:border-white/10"
            >
              <h4 className="font-semibold text-slate-900 dark:text-white">Luxury Dentistry Insight {i+1}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">A short preview that links to the full post layout.</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
