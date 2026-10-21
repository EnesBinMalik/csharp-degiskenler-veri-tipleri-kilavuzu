import React, { useState, useMemo } from 'react';
import {
  calculateDateDifference,
  addDurationToDate,
  formatLocalDateInput,
  parseLocalDateInput,
} from '../utils/dateHelpers';
import { Calendar, Plus, Minus, Copy, Check, ArrowRight, Layers } from 'lucide-react';

export const DateCalculator: React.FC = () => {
  // Mode: 'diff' | 'math' | 'formats'
  const [calcMode, setCalcMode] = useState<'diff' | 'math' | 'formats'>('diff');

  // Difference inputs
  const [diffDate1, setDiffDate1] = useState<string>('2026-01-01');
  const [diffDate2, setDiffDate2] = useState<string>('2026-10-21');

  // Math inputs
  const [baseDate, setBaseDate] = useState<string>('2026-10-21');
  const [mathAmount, setMathAmount] = useState<number>(45);
  const [mathUnit, setMathUnit] = useState<'days' | 'businessDays' | 'weeks' | 'months' | 'years'>('days');

  // Formats input
  const [formatInputDate, setFormatInputDate] = useState<string>('2026-10-21T14:30:00');

  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  // Compute difference
  const diffResult = useMemo(() => {
    const d1 = parseLocalDateInput(diffDate1);
    const d2 = parseLocalDateInput(diffDate2);
    return calculateDateDifference(d1, d2);
  }, [diffDate1, diffDate2]);

  // Compute math addition/subtraction
  const mathResult = useMemo(() => {
    const d = parseLocalDateInput(baseDate);
    return addDurationToDate(d, mathAmount, mathUnit);
  }, [baseDate, mathAmount, mathUnit]);

  // Compute multiple formats for chosen date
  const generatedFormats = useMemo(() => {
    const d = new Date(formatInputDate);
    if (isNaN(d.getTime())) return [];

    return [
      { label: 'ISO-8601 (UTC)', value: d.toISOString(), desc: 'API ve Veritabanı standardı' },
      { label: 'Türkçe Uzun Tarih & Saat', value: d.toLocaleString('tr-TR', { dateStyle: 'full', timeStyle: 'medium' }), desc: 'Kullanıcı dostu arayüzler' },
      { label: 'Türkçe Kısa (GG.AA.YYYY)', value: d.toLocaleDateString('tr-TR'), desc: 'Standart takvim gösterimi' },
      { label: 'RFC 2822 (toUTCString)', value: d.toUTCString(), desc: 'HTTP Headers & Email protokolleri' },
      { label: 'Unix Epoch (Milisaniye)', value: String(d.getTime()), desc: 'JavaScript getTime() / Date.now()' },
      { label: 'Unix Epoch (Saniye)', value: String(Math.floor(d.getTime() / 1000)), desc: 'Linux / POSIX timestamp' },
      { label: 'SQL Standart Timestamp', value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`, desc: 'MySQL / PostgreSQL / MSSQL' },
      { label: 'İngilizce (ABD Formatı)', value: d.toLocaleDateString('en-US', { dateStyle: 'full' }), desc: 'MM/DD/YYYY standardı' },
    ];
  }, [formatInputDate]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(id);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <section id="zaman-hesaplayici" className="py-12 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="text-xs text-amber-400 font-medium tracking-wide">
              Matematik & Dönüştürme Araçları
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Zaman Hesaplayıcı & Format Motoru
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              İki tarih arasındaki geçen süreyi hesaplayın, takvim tarihi ekleyin veya tarihi farklı biçimlerde görüntüleyin.
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setCalcMode('diff')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                calcMode === 'diff' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Tarih Farkı
            </button>
            <button
              onClick={() => setCalcMode('math')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                calcMode === 'math' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Süre Ekle / Çıkar
            </button>
            <button
              onClick={() => setCalcMode('formats')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                calcMode === 'formats' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Format Çıkarıcı
            </button>
          </div>
        </div>

        {/* MODE 1: Tarih Farkı */}
        {calcMode === 'diff' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Input Column */}
            <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Karşılaştırılacak Tarihler</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    1. Başlangıç Tarihi
                  </label>
                  <input
                    type="date"
                    value={diffDate1}
                    onChange={(e) => setDiffDate1(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    2. Bitiş Tarihi
                  </label>
                  <input
                    type="date"
                    value={diffDate2}
                    onChange={(e) => setDiffDate2(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Quick Presets */}
                <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">
                  <span className="block mb-2 font-medium">Hızlı Şablonlar:</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        const today = formatLocalDateInput(new Date());
                        setDiffDate1(today);
                        setDiffDate2('2026-12-31');
                      }}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 text-[11px] cursor-pointer"
                    >
                      Yılbaşına Kalan Süre
                    </button>
                    <button
                      onClick={() => {
                        setDiffDate1('2026-01-01');
                        setDiffDate2('2026-12-31');
                      }}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 text-[11px] cursor-pointer"
                    >
                      Tüm 2026 Yılı
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Detaylı Fark Özeti
                </span>
                <span className="text-xs text-amber-400 font-mono">
                  {diffResult.breakdown.years} Yıl {diffResult.breakdown.months} Ay {diffResult.breakdown.days} Gün
                </span>
              </div>

              {/* Main Headline Counter */}
              <div className="p-4 bg-amber-400/10 border border-amber-400/20 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-amber-300 font-medium">Geçen 24 Saatlik Gün</div>
                  <div className="text-3xl font-extrabold text-white font-mono tabular-nums mt-0.5">
                    {diffResult.totalDays} Gün
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">İş Günü (Pzt-Cum)</div>
                  <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums mt-0.5">
                    {diffResult.businessDays} Gün
                  </div>
                </div>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                  <div className="text-[11px] text-slate-400">Hafta Sayısı</div>
                  <div className="text-base font-bold text-white font-mono tabular-nums mt-1">
                    {diffResult.weeks} hafta {diffResult.remainingDays} gün
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                  <div className="text-[11px] text-slate-400">Toplam Saat</div>
                  <div className="text-base font-bold text-white font-mono tabular-nums mt-1">
                    {diffResult.totalHours.toLocaleString('tr-TR')} sa
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                  <div className="text-[11px] text-slate-400">Toplam Dakika</div>
                  <div className="text-base font-bold text-white font-mono tabular-nums mt-1">
                    {diffResult.totalMinutes.toLocaleString('tr-TR')} dk
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                  <div className="text-[11px] text-slate-400">Toplam Saniye</div>
                  <div className="text-base font-bold text-white font-mono tabular-nums mt-1 truncate">
                    {diffResult.totalSeconds.toLocaleString('tr-TR')} sn
                  </div>
                </div>
              </div>

              {/* Technical Tip */}
              <div className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
                <strong className="text-slate-300">Enes Öztürk Analiz Notu: </strong>
                Süre metrikleri iki yerel gece yarısı arasındaki gerçek milisaniye farkına dayanır. Yaz saati geçişlerinde yerel takvim günü 24 saatten kısa veya uzun olabileceğinden, geçen 24 saatlik gün sayısı takvim günü sayısından farklı olabilir.
              </div>
            </div>

          </div>
        )}

        {/* MODE 2: Süre Ekle / Çıkar */}
        {calcMode === 'math' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Input Form */}
            <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Tarihe Süre Ekle / Çıkar</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Referans Tarih
                  </label>
                  <input
                    type="date"
                    value={baseDate}
                    onChange={(e) => setBaseDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Miktar (+/- Pozitif veya Negatif)
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMathAmount((prev) => prev - 1)}
                      className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={mathAmount}
                      onChange={(e) => setMathAmount(Number(e.target.value))}
                      className="w-full text-center px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-amber-400"
                    />
                    <button
                      onClick={() => setMathAmount((prev) => prev + 1)}
                      className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Zaman Birimi
                  </label>
                  <select
                    value={mathUnit}
                    onChange={(e) => setMathUnit(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="days">Takvim Günü (Days)</option>
                    <option value="businessDays">İş Günü (Pazartesi-Cuma Hariç)</option>
                    <option value="weeks">Hafta (Weeks)</option>
                    <option value="months">Ay (Months)</option>
                    <option value="years">Yıl (Years)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Target Date Result */}
            <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-6">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Hesaplanan Hedef Tarih
              </div>

              <div className="p-5 bg-amber-400/10 border border-amber-400/20 rounded-xl space-y-2">
                <div className="text-xs text-amber-300 font-medium">
                  {mathAmount >= 0 ? `+${mathAmount}` : mathAmount} {mathUnit} sonraki an
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  {mathResult.toLocaleDateString('tr-TR', { dateStyle: 'full' })}
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  ISO-8601: {mathResult.toISOString().split('T')[0]}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                  <div className="text-[11px] text-slate-400">Haftanın Günü</div>
                  <div className="text-sm font-bold text-white font-mono mt-1">
                    {mathResult.toLocaleDateString('tr-TR', { weekday: 'long' })}
                  </div>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                  <div className="text-[11px] text-slate-400">Yıl</div>
                  <div className="text-sm font-bold text-white font-mono mt-1">
                    {mathResult.getFullYear()}
                  </div>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg">
                  <div className="text-[11px] text-slate-400">Ay İndeksi</div>
                  <div className="text-sm font-bold text-amber-400 font-mono mt-1">
                    {mathResult.getMonth()} (+1: {mathResult.getMonth() + 1})
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* MODE 3: Format Çıkarıcı */}
        {calcMode === 'formats' && (
          <div className="space-y-6">
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Formatlanacak Tarih & Saat Seçin
                </label>
                <input
                  type="datetime-local"
                  value={formatInputDate}
                  onChange={(e) => setFormatInputDate(e.target.value)}
                  className="px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Tek tıklamayla panoya kopyalayın</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedFormats.map((fmt, index) => (
                <div
                  key={index}
                  className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-amber-400/90 font-medium">{fmt.label}</div>
                    <div className="text-sm font-bold text-white font-mono truncate mt-0.5 select-all">
                      {fmt.value}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{fmt.desc}</div>
                  </div>

                  <button
                    onClick={() => handleCopy(fmt.value, String(index))}
                    className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer shrink-0"
                    title="Kopyala"
                  >
                    {copiedFormat === String(index) ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
