import React from 'react';
import { BookOpen } from 'lucide-react';
import { PROJECT_ATTRIBUTION } from '../data/csharpCode';

export const SignatureCard: React.FC = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
          <BookOpen className="w-7 h-7" />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-emerald-400 tracking-wider">
              PROJE ATFI
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span>İçerik hazırlayıcısı:</span>
            <span className="text-emerald-400 underline decoration-emerald-500/40 underline-offset-4">
              {PROJECT_ATTRIBUTION.name}
            </span>
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            {PROJECT_ATTRIBUTION.assignment}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3 text-xs font-mono">
          <div>
            <span className="text-slate-500 block text-[10px]">KAYNAK</span>
            <span className="text-slate-200 font-semibold">{PROJECT_ATTRIBUTION.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
