import React, { useState } from 'react';
import {
  Binary,
  AlertTriangle,
  Flame,
  ArrowDown,
  Info,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const BitMemoryVisualizer: React.FC = () => {
  const [val, setVal] = useState<number>(300);

  const safeVal = isNaN(val) ? 0 : Math.floor(val);

  // Split into 4 bytes (little-endian order in memory, displayed high to low)
  const byte0 = (safeVal & 0xff); // lowest 8 bits
  const byte1 = ((safeVal >> 8) & 0xff);
  const byte2 = ((safeVal >> 16) & 0xff);
  const byte3 = ((safeVal >> 24) & 0xff);

  const to8Bit = (n: number) => (n >>> 0).toString(2).padStart(8, '0');

  const b0Str = to8Bit(byte0);
  const b1Str = to8Bit(byte1);
  const b2Str = to8Bit(byte2);
  const b3Str = to8Bit(byte3);

  const byteResult = byte0;
  const shortResult = ((safeVal & 0xffff) > 32767 ? (safeVal & 0xffff) - 65536 : (safeVal & 0xffff));

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Binary className="w-6 h-6 text-indigo-400" />
            Bit ve Bellek Taşması (Overflow) Canlandırması
          </h2>
          <p className="text-sm text-slate-400">
            Pozitif bir int değerinin byte&apos;a unchecked cast simülasyonunda alt 8 bitin nasıl kaldığını ve bunun sayısal sonucu nasıl etkilediğini inceleyin. Bu basitleştirilmiş bir eğitim görselidir.
          </p>
        </div>
        <div className="text-xs text-slate-400 font-mono bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg self-start">
          Hazırlayan: <span className="text-indigo-400 font-semibold">Enes Öztürk</span>
        </div>
      </div>

      {/* Interactive Value Controller */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
              Test Edilecek 32-bit Tam Sayı (int) Değeri:
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={val}
                onChange={(e) => setVal(parseInt(e.target.value) || 0)}
                className="w-36 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-lg font-bold font-mono text-white focus:border-indigo-500 focus:outline-none"
              />
              <span className="text-xs text-slate-400 font-mono">
                Decimal: <strong className="text-white">{safeVal}</strong>
              </span>
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-slate-500">Örnekler:</span>
            {[255, 256, 300, 512, 1000, 65535].map((preset) => (
              <button
                key={preset}
                onClick={() => setVal(preset)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-medium border transition-colors cursor-pointer ${
                  val === preset
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Range slider */}
        <div className="space-y-1">
          <input
            type="range"
            min="0"
            max="1024"
            value={val}
            onChange={(e) => setVal(parseInt(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>0 (00000000)</span>
            <span>255 (Byte Max)</span>
            <span>256 (Taşma Başlangıcı!)</span>
            <span>1024</span>
          </div>
        </div>
      </div>

      {/* 32-bit Integer Register Representation */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              1. Aşama: Sayının 32-bit Gösterimi
            </h3>
          </div>
          <span className="text-xs font-mono text-indigo-400">
            int sayi = {safeVal};
          </span>
        </div>

        {/* 4 Byte Blocks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Byte 3 (Bits 31-24) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Bayt 3 (Bit 31..24)
            </div>
            <div className="font-mono text-sm tracking-widest text-slate-400">
              {b3Str}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Değer: {byte3}
            </div>
          </div>

          {/* Byte 2 (Bits 23-16) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Bayt 2 (Bit 23..16)
            </div>
            <div className="font-mono text-sm tracking-widest text-slate-400">
              {b2Str}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Değer: {byte2}
            </div>
          </div>

          {/* Byte 1 (Bits 15-8) */}
          <div className={`rounded-xl p-3 text-center space-y-1 border ${
            byte1 > 0 ? 'bg-rose-950/20 border-rose-800/40' : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Bayt 1 (Bit 15..8)
            </div>
            <div className={`font-mono text-sm tracking-widest ${byte1 > 0 ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
              {b1Str}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Değer: {byte1} (×256 = {byte1 * 256})
            </div>
          </div>

          {/* Byte 0 (Bits 7-0) */}
          <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-3 text-center space-y-1">
            <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
              Bayt 0 (Bit 7..0) [En Düşük]
            </div>
            <div className="font-mono text-sm tracking-widest text-emerald-300 font-bold">
              {b0Str}
            </div>
            <div className="text-[10px] text-emerald-400 font-mono">
              Değer: {byte0}
            </div>
          </div>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-slate-900/60 p-3 rounded-lg flex items-center justify-between">
          <span>Toplam Matematiksel Hesap:</span>
          <span className="text-slate-200">
            ({byte3} × 16,777,216) + ({byte2} × 65,536) + ({byte1} × 256) + {byte0} = <strong className="text-indigo-400">{safeVal}</strong>
          </span>
        </div>
      </div>

      {/* Down Arrow separator */}
      <div className="flex justify-center">
        <div className="p-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-2 text-xs font-mono">
          <ArrowDown className="w-4 h-4 text-indigo-400 animate-bounce" />
          <span>byte sonuc = (byte)sayi; // Açık Cast Yapılıyor</span>
        </div>
      </div>

      {/* The Truncation Result: Only Byte 0 is taken */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${safeVal > 255 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              2. Aşama: Hedef byte (8-bit / 1 Bayt) Alanına Sıkıştırma
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            Sonuç: {byteResult}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Discarded bits */}
          <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4" />               Üst 24 Bit (byte sonucuna dahil değil)
            </div>
            <div className="font-mono text-xs text-rose-300/80 tracking-widest break-all line-through">
              {b3Str} {b2Str} {b1Str}
            </div>
            <p className="text-[11px] text-slate-400">
              Unchecked int-to-byte dönüşümünde sonuç, değerin alt 8 bitinden elde edilir. Üst bitler byte sonucunda yer almaz.
            </p>
          </div>

          {/* Preserved Byte 0 */}
          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" /> Korunan Son 8 Bit (Sonuç)
            </div>
            <div className="font-mono text-lg text-emerald-400 font-bold tracking-widest">
              {b0Str}
            </div>
            <p className="text-[11px] text-slate-300">
              Sadece bu 8 bit saklanır. Bu bitlerin onluk (decimal) karşılığı <strong>{byteResult}</strong>&apos;dir.
            </p>
          </div>
        </div>

        {/* Mathematical modulo formula */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-xs font-mono space-y-2">
          <div className="text-slate-300 font-bold text-sm">
            📐 Bit Taşmasının Matematiksel Formülü:
          </div>
          <div className="text-indigo-300 text-sm">
            Sonuç = Değer % 256 &rarr; {safeVal} % 256 = <strong className="text-emerald-400 text-base">{byteResult}</strong>
          </div>
          <p className="text-slate-400 font-sans text-xs">
            Pozitif tam sayılar için alt 8 bitin değeri, sayının 256 ile bölümünden kalanla aynıdır. Örneğin 300 için sonuç 44 olur.
          </p>
        </div>
      </div>

      {/* Real-world Caution: Ariane 5 Rocket */}
      <div className="bg-slate-900/90 border border-amber-900/40 rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" /> Tarihin En Pahalı Tip Dönüşümü Hatası: Ariane 5 (1996)
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          4 Haziran 1996&apos;da Ariane 5 Flight 501, kalkıştan yaklaşık 37 saniye sonra kaybedildi. Olay incelemesi, atalet referans sistemindeki bir kayan nokta değerinin 16-bit işaretli tam sayıya dönüştürülmesinde oluşan ve ele alınmayan aritmetik istisnayı nedenlerden biri olarak belirledi. Bu, C# kodu veya yalnızca bir tür cast hatası değildi; burada tarihsel örneğin basitleştirilmiş bir özeti verilmektedir.
        </p>
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            C# <strong>checked</strong> bağlamı, desteklenen integral aritmetik ve dönüşüm taşmalarını görünür kılabilir; bu özellik Ariane 5 olayının doğrudan çözümü olarak sunulmamalıdır.
          </span>
        </div>
      </div>
    </div>
  );
};
