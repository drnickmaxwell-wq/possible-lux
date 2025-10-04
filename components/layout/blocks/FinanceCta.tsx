'use client';
export default function FinanceCta(){
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-2xl p-8 bg-gradient-to-r from-pink-600 via-teal-500 to-yellow-500 text-white">
          <h3 className="text-xl md:text-2xl font-bold" style={{fontFamily:'Montserrat, sans-serif'}}>Flexible Finance, Clear Costs</h3>
          <p className="mt-2 opacity-95" style={{fontFamily:'Lora, serif'}}>Ask us about Tabeo options and monthly plans.</p>
          <a href="/preview/lux/finance" className="mt-4 inline-flex items-center rounded-full px-5 py-2 bg-white/20 hover:bg-white/30 transition">See Options</a>
        </div>
      </div>
    </section>
  );
}
