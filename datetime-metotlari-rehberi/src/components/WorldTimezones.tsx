import React, { useState, useEffect } from 'react';
import { WORLD_CITIES } from '../data/crossLangData';
import { Globe, Sun, Moon, Briefcase } from 'lucide-react';

export const WorldTimezones: React.FC = () => {
  const [currentUtc, setCurrentUtc] = useState<Date>(new Date());
  // Offset slider in hours (-12 to +12 relative to now)
  const [hourShift, setHourShift] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentUtc(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute reference simulated date
  const simulatedDate = new Date(currentUtc.getTime() + hourShift * 3600 * 1000);

  return (
    <section id="dunya-saatleri" className="py-12 bg-slate-900/30 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="text-xs text-amber-400 font-medium tracking-wide">
              Global Koordinasyon & UTC
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Dünya Saatleri & Zaman Dilimi Kaydırıcı
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Farklı kıtalardaki geliştirici ekipleriyle senkronizasyon yapın, saat dilimi farklarını ve mesai çakışmalarını canlı kaydırıcı ile inceleyin.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setHourShift(0)}
              className="px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors"
            >
              Şu Anki Zamana Sıfırla
            </button>
          </div>
        </div>

        {/* Interactive Hour Shift Scrubber */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300 flex items-center gap-2">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>Simüle Edilen Zaman Kaydırma:</span>
            </span>
            <span className="text-xs font-mono font-bold text-amber-400">
              {hourShift === 0 ? 'Gerçek Zaman (0 saat)' : `${hourShift > 0 ? '+' : ''}${hourShift} Saat`}
            </span>
          </div>

          <input
            type="range"
            min="-12"
            max="12"
            step="1"
            value={hourShift}
            onChange={(e) => setHourShift(Number(e.target.value))}
            className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />

          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>-12 Saat</span>
            <span>-6 Saat</span>
            <span className="text-amber-400 font-semibold">Şimdi</span>
            <span>+6 Saat</span>
            <span>+12 Saat</span>
          </div>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WORLD_CITIES.map((city) => {
            let timeStr = '--:--:--';
            let dateStr = '';
            let timeZoneLabel = city.timeZone;
            let hour = 12;

            try {
              const cityTimeFormatter = new Intl.DateTimeFormat('tr-TR', {
                timeZone: city.timeZone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
              });
              const cityDateFormatter = new Intl.DateTimeFormat('tr-TR', {
                timeZone: city.timeZone,
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              });
              const offsetFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: city.timeZone,
                timeZoneName: 'shortOffset',
              });
              timeStr = cityTimeFormatter.format(simulatedDate);
              dateStr = cityDateFormatter.format(simulatedDate);
              const offset = offsetFormatter
                .formatToParts(simulatedDate)
                .find((part) => part.type === 'timeZoneName')?.value;
              timeZoneLabel = offset?.replace(/^GMT/, 'UTC') ?? city.timeZone;
              const parsedHour = parseInt(timeStr.split(':')[0], 10);
              if (!isNaN(parsedHour)) {
                hour = parsedHour;
              }
            } catch {
              timeStr = simulatedDate.toTimeString().slice(0, 8);
              dateStr = simulatedDate.toDateString();
            }

            // Business hours check (9am to 6pm)
            const isWorkHours = hour >= 9 && hour < 18;
            const isDaytime = hour >= 6 && hour < 20;

            return (
              <div
                key={city.name}
                className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {city.name}
                      </h3>
                      <div className="text-xs text-slate-400">{city.country}</div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs">
                      {isDaytime ? (
                        <span className="flex items-center gap-1 text-amber-300">
                          <Sun className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Gündüz</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-indigo-300">
                          <Moon className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Gece</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Digital Clock */}
                  <div className="mt-4 mb-2">
                    <div className="text-2xl font-extrabold text-white font-mono tabular-nums tracking-wider">
                      {timeStr}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {dateStr}
                    </div>
                  </div>
                </div>

                {/* Status & Offset Bar */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-slate-400">
                    {timeZoneLabel}
                  </span>

                  {isWorkHours ? (
                    <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-medium">
                      <Briefcase className="w-3 h-3" />
                      Mesai Saati
                    </span>
                  ) : (
                    <span className="text-slate-500 text-[11px]">
                      Mesai Dışı
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
