'use client';
import { useState } from 'react';
import MessageList from '@/components/ai/MessageList';
import ChatComposer from '@/components/ai/ChatComposer';

export default function LuxChatPanel(){
  const [messages, setMessages] = useState<{role:'user'|'assistant', content:string}[]>([
    { role:'assistant', content:"Hi — I’m Dr. Sarah, your AI assistant. How can I help today?" }
  ]);
  const [loading, setLoading] = useState(false);

  const send = async (text: string) => {
    const next = [...messages, { role:'user' as const, content: text }];
    setMessages(next); setLoading(true);
    try{
      const res = await fetch('/api/chat',{ method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ messages: next }) });
      const json = await res.json();
      setMessages(m => [...m, { role:'assistant', content: String(json?.message || '…') }]);
    }catch(e){
      setMessages(m => [...m, { role:'assistant', content:'Sorry — I had trouble answering that.' }]);
    }finally{ setLoading(false); }
  };

  return (
    <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md p-4">
      <MessageList messages={messages} loading={loading} />
      <ChatComposer onSend={send} />
    </div>
  );
}
