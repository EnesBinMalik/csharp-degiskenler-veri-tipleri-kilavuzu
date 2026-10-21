import React, { useState, useEffect } from 'react';
import { getDayOfYear, getWeekOfYear, isLeapYear } from '../utils/dateHelpers';
import { Clock, Globe, Hash, Calendar, ArrowRight, Play } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onSandboxClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onSandboxClick }) => {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dayOfYear = getDayOfYear(now);
  const weekOfYear = getWeekOfYear(now);
  const leap = isLeapYear(now.getFullYear());
  const epochMs = now.getTime();
  const epochSec = Math.floor(epochMs / 1000);

  // Angles for the animated celestial chronometer
  const sec = now.getSeconds();
  const min = now.getMinutes();
  const hr = now.getHours() % 12;

  const secDeg = (sec / 60) * 360;
  const minDeg = ((min + sec / 60) / 60) * 360;
  const hrDeg = ((hr + min / 60) / 12) * 360;

  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950 pt-10 pb-12">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left Column: Headlines & Call to Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Author Kicker - Clean unboxed text with subtle separator */}
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium tracking-wide">
              <span>Enes Öztürk Özel Koleksiyonu</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">DateTime Mimarisi & Başvuru Kılavuzu</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
              Zaman ve Tarih Metotları ile Tam Hakimiyet Kurun
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Tarih ayrıştırma, zaman dilimleri, artık yıl hesapları, iş günü farkları ve
              uluslararası formatlama standartlarını tek bir çatı altında canlı olarak deneyimleyin.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-sm active:scale-95"
              >
                <span>Metot Kataloğunu İncele</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onSandboxClick}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors cursor-pointer active:scale-95"
              >
                <Play className="w-4 h-4 text-amber-400" />
                <span>Canlı Laboratuvarı Aç</span>
              </button>
            </div>

            {/* Author signature stamp preview */}
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <div className="w-7 h-7 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center font-bold text-amber-300 font-mono">
                EÖ
              </div>
              <div>
                <span className="text-slate-200 font-medium">Enes Öztürk</span>
                <span className="text-slate-500"> — Yazılım Geliştirici & Sistem Mühendisi</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Astronomical Chronometer Dial (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center shadow-xl">

              {/* Outer ticking ring */}
              <svg className="w-56 h-56 -rotate-90" viewBox="0 0 200 200">
                {/* Background tracks */}
                <circle cx="100" cy="100" r="90" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="2 4" />
                <circle cx="100" cy="100" r="76" fill="none" stroke="#1e293b" strokeWidth="3" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#1e293b" strokeWidth="3" />

                {/* Second hand arc */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeDasharray={565.48}
                  strokeDashoffset={565.48 - (565.48 * sec) / 60}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />

                {/* Minute hand arc */}
                <circle
                  cx="100"
                  cy="100"
                  r="76"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="4"
                  strokeDasharray={477.52}
                  strokeDashoffset={477.52 - (477.52 * min) / 60}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />

                {/* Hour hand arc */}
                <circle
                  cx="100"
                  cy="100"
                  r="60"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="5"
                  strokeDasharray={376.99}
                  strokeDashoffset={376.99 - (376.99 * (hr + min / 60)) / 12}
                  strokeLinecap="round"
                />
              </svg>

              {/* Center digital readout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-wider tabular-nums">
                  {now.toLocaleTimeString('tr-TR', { hour12: false })}
                </span>
                <span className="text-xs font-mono text-slate-400 mt-0.5">
                  .{String(now.getMilliseconds()).padStart(3, '0').slice(0, 2)}s
                </span>
                <span className="text-xs text-amber-400 font-medium mt-1">
                  {now.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric', month: 'short' })}
                </span>
              </div>

              {/* Legend indicators */}
              <div className="w-full flex items-center justify-between text-[11px] text-slate-400 font-mono mt-4 pt-3 border-t border-slate-800">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  Saat
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  Dakika
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Saniye
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Telemetry KPI Strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Yerel Zaman</span>
            </div>
            <div className="text-sm font-bold text-white font-mono tabular-nums">
              {now.toLocaleTimeString('tr-TR')}
            </div>
            <div className="text-[11px] text-slate-500 truncate mt-0.5">
              UTC{-(now.getTimezoneOffset() / 60) >= 0 ? '+' : ''}{-(now.getTimezoneOffset() / 60)}
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>UTC Zamanı</span>
            </div>
            <div className="text-sm font-bold text-white font-mono tabular-nums">
              {now.toUTCString().slice(17, 25)}
            </div>
            <div className="text-[11px] text-slate-500 truncate mt-0.5">
              Evrensel Standart
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Hash className="w-3.5 h-3.5 text-emerald-400" />
              <span>Unix Epoch (ms)</span>
            </div>
            <div className="text-sm font-bold text-white font-mono tabular-nums truncate">
              {epochMs}
            </div>
            <div className="text-[11px] text-slate-500 font-mono tabular-nums mt-0.5">
              {epochSec} sn
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>Yılın Günü</span>
            </div>
            <div className="text-sm font-bold text-white font-mono tabular-nums">
              {dayOfYear}. Gün
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              / {leap ? '366' : '365'} gün
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Calendar className="w-3.5 h-3.5 text-rose-400" />
              <span>Yılın Haftası</span>
            </div>
            <div className="text-sm font-bold text-white font-mono tabular-nums">
              {weekOfYear}. Hafta
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              ISO-8601 standardı
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Clock className="w-3.5 h-3.5 text-yellow-400" />
              <span>Artık Yıl</span>
            </div>
            <div className="text-sm font-bold text-white font-mono">
              {leap ? 'Evet (366 gün)' : 'Hayır (365 gün)'}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {now.getFullYear()} takvimi
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
