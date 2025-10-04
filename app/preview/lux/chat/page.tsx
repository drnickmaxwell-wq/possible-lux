'use client';
import StickyHeader from '@/components/layout/sticky-header';
import Footer from '@/components/layout/footer';
import LuxChatPanel from '@/components/ai/lux-chat-panel';

export default function ChatPreviewPage(){
  return (
    <main className="min-h-screen bg-white dark:bg-[#0b1220]">
      <StickyHeader />
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white" style={{fontFamily:'Montserrat, sans-serif'}}>AI Assistant</h1>
        <p className="mt-2 text-slate-700 dark:text-slate-300" style={{fontFamily:'Lora, serif'}}>Ask about treatments, finance, directions, and appointments.</p>
        <div className="mt-6">
          <LuxChatPanel />
        </div>
      </section>
      <Footer />
    </main>
  );
}
