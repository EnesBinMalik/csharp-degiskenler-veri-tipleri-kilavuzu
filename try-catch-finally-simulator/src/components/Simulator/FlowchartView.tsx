import React from 'react';
import { BlockType } from '../../types';
import { Play, ArrowRight, ShieldAlert, CheckCircle, Zap, ShieldCheck } from 'lucide-react';

interface FlowchartViewProps {
  currentBlock?: BlockType;
  hasException: boolean;
  isComplete: boolean;
}

export const FlowchartView: React.FC<FlowchartViewProps> = ({
  currentBlock,
  hasException,
  isComplete
}) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800 text-xs">
        <span className="font-semibold text-slate-300 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-indigo-400" />
          Akış Mimarisi & Çalışma Döngüsü
        </span>
        <span className="text-[11px] text-slate-500">
          Gerçek zamanlı blok takibi
        </span>
      </div>

      {/* Visual Flow diagram nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 items-stretch text-xs">
        {/* Node 1: TRY */}
        <div
          className={`p-3 rounded-lg border transition-all flex flex-col justify-between ${
            currentBlock === 'try'
              ? 'border-indigo-400 bg-indigo-950/60 shadow-md shadow-indigo-500/20 ring-1 ring-indigo-400'
              : 'border-slate-800 bg-slate-950/60 opacity-80'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono font-bold text-indigo-400 text-[11px]">1. TRY</span>
            {currentBlock === 'try' && (
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
            )}
          </div>
          <p className="text-slate-300 font-medium text-xs">Riskli Kod</p>
          <p className="text-[11px] text-slate-500 mt-1">Hata verebilecek komutlar burada yürütülür.</p>
        </div>

        {/* Node 2: KARAR & CATCH */}
        <div
          className={`p-3 rounded-lg border transition-all flex flex-col justify-between relative ${
            currentBlock === 'catch'
              ? 'border-rose-400 bg-rose-950/60 shadow-md shadow-rose-500/20 ring-1 ring-rose-400'
              : hasException
              ? 'border-rose-900/50 bg-rose-950/20'
              : 'border-slate-800 bg-slate-950/60 opacity-80'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono font-bold text-rose-400 text-[11px]">2. CATCH</span>
            {currentBlock === 'catch' ? (
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
            ) : hasException ? (
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            ) : null}
          </div>
          <p className="text-slate-300 font-medium text-xs">
            {hasException ? 'İstisna Yakalandı!' : 'Hata Olursa...'}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            {hasException
              ? 'Try durduruldu, kontrol buraya devredildi.'
              : 'Hata çıkmazsa bu blok tamamen ATLANIR.'}
          </p>
        </div>

        {/* Node 3: FINALLY */}
        <div
          className={`p-3 rounded-lg border transition-all flex flex-col justify-between ${
            currentBlock === 'finally'
              ? 'border-emerald-400 bg-emerald-950/60 shadow-md shadow-emerald-500/20 ring-1 ring-emerald-400'
              : isComplete
              ? 'border-emerald-900/50 bg-emerald-950/20'
              : 'border-slate-800 bg-slate-950/60 opacity-80'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono font-bold text-emerald-400 text-[11px]">3. FINALLY</span>
            {currentBlock === 'finally' && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            )}
          </div>
          <p className="text-slate-300 font-medium text-xs">Temizleme Bloğu</p>
          <p className="text-[11px] text-slate-500 mt-1">
            Normal exception akışında kontrol buraya uğrar; süreç sonlandırması gibi durumlar kapsam dışıdır.
          </p>
        </div>

        {/* Node 4: SONUÇ / DIŞARI */}
        <div
          className={`p-3 rounded-lg border transition-all flex flex-col justify-between ${
            isComplete
              ? 'border-slate-700 bg-slate-800/60 text-white'
              : 'border-slate-800/80 bg-slate-950/40 text-slate-500'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono font-bold text-slate-400 text-[11px]">4. AKIŞ</span>
            {isComplete && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
          </div>
          <p className="font-medium text-xs">Uygulama Yaşamı</p>
          <p className="text-[11px] text-slate-500 mt-1">
            {isComplete
              ? 'Uygulama çökmedi (crash engellendi), normal seyrine devam ediyor.'
              : 'Hata yönetimi sonrası kodun kalanı.'}
          </p>
        </div>
      </div>
    </div>
  );
};
