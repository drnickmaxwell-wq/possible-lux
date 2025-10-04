'use client';
import { motion } from 'framer-motion';

export default function MessageList({ messages, loading }:{ messages:{role:'user'|'assistant', content:string}[], loading:boolean }){
  return (
    <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
      {messages.map((m,i)=>(
        <motion.div key={i}
          initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.25 }}
          className={`rounded-xl px-4 py-3 border ${m.role==='assistant'
            ? 'bg-white/80 dark:bg-white/10 border-black/5 dark:border-white/10'
            : 'bg-gradient-to-r from-pink-600 via-teal-500 to-yellow-500 text-white border-transparent'}`}
        >
          <p style={{fontFamily: m.role==='assistant' ? 'Lora, serif' : 'Montserrat, sans-serif'}}>{m.content}</p>
        </motion.div>
      ))}
      {loading && <div className="text-sm opacity-70 px-1">Assistant is typing…</div>}
    </div>
  );
}
