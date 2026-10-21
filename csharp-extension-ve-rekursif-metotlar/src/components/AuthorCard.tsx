import React from 'react';
import { authorData } from '../data/theoryContent';
import { Terminal } from 'lucide-react';

export const AuthorCard: React.FC = () => {
  return (
    <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 lg:p-8 relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

        {/* Left side: Author avatar & Bio */}
        <div className="flex items-start sm:items-center gap-5">
          <div className="relative shrink-0">
            {/* Styled CSS/SVG Avatar */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-cyan-600 via-slate-800 to-indigo-600 p-[2px] shadow-lg shadow-cyan-950/40">
              <div className="w-full h-full bg-slate-950 rounded-2xl flex flex-col items-center justify-center text-cyan-400 font-bold">
                <span className="text-xl sm:text-2xl tracking-tighter">EÖ</span>
                <span className="text-[10px] text-slate-400 font-mono tracking-widest mt-0.5">.NET</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>C# Özel Eğitim Serisi</span>
              <span aria-hidden="true">·</span>
              <span className="text-cyan-400 font-medium">Eğitim içeriği</span>
              <span aria-hidden="true">·</span>
              <span>Türkçe C# Rehberi</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>{authorData.name}</span>
            </h3>
            <p className="text-sm text-cyan-300 font-medium mt-0.5">
              {authorData.role}
            </p>
            <p className="text-xs text-slate-400 max-w-xl mt-2 leading-relaxed">
              {authorData.bio}
            </p>
          </div>
        </div>

        <div className="w-full lg:w-auto shrink-0 bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-sm text-slate-300">
          C# extension metotları ve rekürsif algoritmalar için etkileşimli Türkçe rehber
        </div>

      </div>

      {/* Quote */}
      <div className="mt-6 pt-5 border-t border-slate-800/80 text-sm text-slate-300 italic flex items-start gap-3">
        <span className="text-cyan-400 font-serif text-2xl leading-none">“</span>
        <p className="leading-relaxed">
          {authorData.quote}
        </p>
      </div>

      {/* Author's Golden Rules Strip */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {authorData.tips.slice(0, 2).map((tip, idx) => (
          <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3 text-slate-300 flex items-start gap-2.5">
            <Terminal className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-cyan-300 font-semibold">Enes Öztürk Notu: </span>
              <span className="leading-relaxed">{tip}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
