'use client';
import { useState } from 'react';

export default function ChatComposer({ onSend }:{ onSend:(text:string)=>void }){
  const [text, setText] = useState('');
  return (
    <form className="mt-4 flex gap-2" onSubmit={(e)=>{ e.preventDefault(); const t=text.trim(); if(!t) return; onSend(t); setText(''); }}>
      <input value={text} onChange={(e)=>setText(e.target.value)}
        className="flex-1 rounded-md border p-3 bg-white/70 dark:bg-white/5"
        placeholder="Ask about veneers, implants, finance, directions…" />
      <button className="rounded-md px-4 bg-gradient-to-r from-pink-600 via-teal-500 to-yellow-500 text-white">Send</button>
    </form>
  );
}
