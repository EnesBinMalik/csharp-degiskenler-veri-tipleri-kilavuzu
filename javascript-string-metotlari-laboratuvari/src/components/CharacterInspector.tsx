import React, { useState, useMemo } from 'react';
import {
  Sliders,
  Search,
  Code,
  Hash,
  Binary,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const CharacterInspector: React.FC = () => {
  const [text, setText] = useState<string>('Enes Öztürk 🚀 2026');
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(10);
  const [selectedCharIndex, setSelectedCharIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('Öztürk');

  // Ensure sliders stay within bounds
  const len = text.length;
  const safeStart = Math.min(Math.max(0, startIndex), len);
  const safeEnd = Math.min(Math.max(0, endIndex), len);

  // Character array
  const chars = useMemo(() => text.split(''), [text]);

  // Selected character details
  const selectedChar = text[selectedCharIndex] || '';
  const charCode = selectedChar ? selectedChar.charCodeAt(0) : 0;
  const codePoint = selectedChar ? (text.codePointAt(selectedCharIndex) || 0) : 0;
  const isSurrogateCodePoint = codePoint >= 0xD800 && codePoint <= 0xDFFF;
  const formatCodeUnit = (char: string) => {
    const value = char.charCodeAt(0);
    return value >= 0xD800 && value <= 0xDFFF
      ? `\\u${value.toString(16).toUpperCase().padStart(4, '0')}`
      : char;
  };
  const hex = charCode.toString(16).toUpperCase().padStart(4, '0');
  const binary = charCode.toString(2).padStart(8, '0');

  // Slice results
  const sliceResult = text.slice(safeStart, safeEnd);
  const substringResult = text.substring(safeStart, safeEnd);

  // Search matches
  const searchMatches = useMemo(() => {
    if (!searchQuery) return [];
    const matches: number[] = [];
    let pos = text.indexOf(searchQuery);
    while (pos !== -1) {
      matches.push(pos);
      pos = text.indexOf(searchQuery, pos + 1);
    }
    return matches;
  }, [text, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-mono text-indigo-400 mb-1 tracking-wider uppercase">
          Karakter ve UTF-16 Laboratuvarı
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Görsel Karakter ve İndeks İnceleyici
        </h1>
        <p className="mt-1 text-sm text-slate-400 max-w-3xl leading-relaxed">
          JavaScript dizgelerinin UTF-16 kod birimlerini, pozitif ve negatif indeks
          hizalamalarını görsel dilimleme (slice) cetveliyle deneyimleyin. Bazı emoji karakterleri iki kod birimi kullanır.
        </p>
      </div>

      {/* Input Field & Metrics Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1.5">
            İncelenecek Metin (Canlı Düzenlenebilir)
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (selectedCharIndex >= e.target.value.length) {
                setSelectedCharIndex(Math.max(0, e.target.value.length - 1));
              }
            }}
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-lg font-mono text-sm text-indigo-200 focus:outline-none focus:border-indigo-500"
            placeholder="İncelemek istediğiniz metni girin..."
          />
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg">
            <span className="text-slate-400 block text-[11px]">UTF-16 Uzunluğu (length)</span>
            <span className="text-base font-bold font-mono text-indigo-400 tabular-nums">
              {text.length}
            </span>
          </div>
          <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg">
            <span className="text-slate-400 block text-[11px]">UTF-8 Bayt Boyutu</span>
            <span className="text-base font-bold font-mono text-emerald-400 tabular-nums">
              {new TextEncoder().encode(text).length} B
            </span>
          </div>
          <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg">
            <span className="text-slate-400 block text-[11px]">İlk İndeks (str.at(0))</span>
            <span className="text-base font-bold font-mono text-amber-300">
              {text[0] ? `"${formatCodeUnit(text[0])}"` : 'Yok'}
            </span>
          </div>
          <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg">
            <span className="text-slate-400 block text-[11px]">Son İndeks (str.at(-1))</span>
            <span className="text-base font-bold font-mono text-purple-400">
              {text.at(-1) ? `"${formatCodeUnit(text.at(-1) || '')}"` : 'Yok'}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Interactive Character Tiles Canvas */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Karakter Hücreleri & İndeks Çizelgesi</span>
            </h2>
            <p className="text-xs text-slate-400">
              Detaylı UTF-16 ve ikili kod incelemesi için herhangi bir kod birimi kutucuğuna tıklayın.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600 inline-block"></span>
              <span>Seçili Aralık</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block"></span>
              <span>Arama Eşleşmesi</span>
            </span>
          </div>
        </div>

        {/* Scrollable Tiles Strip */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto scrollbar-thin">
          <div className="flex items-center gap-1.5 min-w-max py-2">
            {chars.map((char, index) => {
              const isInsideRange = index >= safeStart && index < safeEnd;
              const isSelected = index === selectedCharIndex;
              const isSearchMatch = searchMatches.some(
                (m) => index >= m && index < m + searchQuery.length
              );
              const negIndex = index - len;

              return (
                <button
                  key={index}
                  onClick={() => setSelectedCharIndex(index)}
                  className={`flex flex-col items-center justify-center min-w-[42px] px-2 py-2 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-400 bg-indigo-950/80 ring-2 ring-indigo-500'
                      : isSearchMatch
                      ? 'border-amber-500/80 bg-amber-950/40'
                      : isInsideRange
                      ? 'border-indigo-500/50 bg-indigo-900/30'
                      : 'border-slate-800 bg-slate-900/80 hover:bg-slate-800'
                  }`}
                >
                  {/* Positive index */}
                  <span className="text-[10px] font-mono text-slate-400 tabular-nums">
                    {index}
                  </span>

                  {/* Character glyph */}
                  <span
                    className={`text-base font-mono my-1 ${
                      char === ' ' ? 'text-slate-400 italic text-xs' : 'text-white font-bold'
                    }`}
                  >
                    {char === ' ' ? '␣' : char === '\n' ? '↵' : char === '\t' ? '⇥' : formatCodeUnit(char)}
                  </span>

                  {/* Negative index */}
                  <span className="text-[10px] font-mono text-slate-400 tabular-nums">
                    {negIndex}
                  </span>
                </button>
              );
            })}
            {chars.length === 0 && (
              <span className="text-xs text-slate-400 italic">Karakter bulunamadı.</span>
            )}
          </div>
        </div>
      </div>

      {/* Two-Column Interactive Tools: Range Slice Sizer & Single Character Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Interactive Slice & Substring Range Slider */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-semibold text-white">
                İnteraktif Kesme Cetveli (slice / substring)
              </h3>
            </div>
            <span className="text-xs font-mono text-indigo-400">
              [{safeStart} ... {safeEnd}]
            </span>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300">Başlangıç İndeksi (startIndex)</span>
                <span className="font-mono text-indigo-400 font-bold">{safeStart}</span>
              </div>
              <input
                type="range"
                min="0"
                max={len}
                value={safeStart}
                onChange={(e) => setStartIndex(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300">Bitiş İndeksi (endIndex - Hariç)</span>
                <span className="font-mono text-indigo-400 font-bold">{safeEnd}</span>
              </div>
              <input
                type="range"
                min="0"
                max={len}
                value={safeEnd}
                onChange={(e) => setEndIndex(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Slice Output Comparison */}
          <div className="space-y-2 pt-2">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono text-slate-400">
                  str.slice({safeStart}, {safeEnd})
                </span>
                <span className="text-slate-400 font-mono">
                  {sliceResult.length} UTF-16 kod birimi
                </span>
              </div>
              <div className="font-mono text-sm text-emerald-300 truncate">
                "{sliceResult}"
              </div>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono text-slate-400">
                  str.substring({safeStart}, {safeEnd})
                </span>
                <span className="text-slate-400 font-mono">
                  {substringResult.length} UTF-16 kod birimi
                </span>
              </div>
              <div className="font-mono text-sm text-amber-300 truncate">
                "{substringResult}"
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded border border-slate-800/80">
            <strong>Hatırlatma:</strong> endIndex parametresi daima <em className="text-slate-200">hariçtir</em> (exclusive). Yani [0, 4] aralığı 0, 1, 2, 3 indekslerindeki 4 UTF-16 kod birimini içerir.
          </div>
        </div>

        {/* Right: Selected Character Deep-Dive Telemetry */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-white">
                Seçili UTF-16 Kod Birimi Detayı
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              İndeks: {selectedCharIndex}
            </span>
          </div>

          {/* Big Glyph Display */}
          <div className="flex items-center gap-4 p-4 bg-slate-950 border border-slate-800 rounded-xl">
            <div className="w-16 h-16 flex items-center justify-center bg-indigo-950/60 border border-indigo-500/40 rounded-xl font-mono text-3xl font-extrabold text-white">
              {selectedChar === ' ' ? '␣' : selectedChar ? formatCodeUnit(selectedChar) : '∅'}
            </div>
            <div className="space-y-1 text-xs">
              <div className="font-bold text-slate-200">
                {selectedChar === ' '
                  ? 'Boşluk (Space Karakteri)'
                  : selectedChar
                    ? `"${formatCodeUnit(selectedChar)}" UTF-16 kod birimi`
                    : 'Seçili kod birimi yok'}
              </div>
              <div className="text-slate-400 font-mono">
                Pozitif İndeks: {selectedCharIndex} · Negatif: {selectedCharIndex - len}
              </div>
              <div className="text-indigo-400 text-[11px]">
                Erişim: <code className="font-mono">str.at({selectedCharIndex})</code>
              </div>
            </div>
          </div>

          {/* Code Breakdown Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg">
              <span className="text-slate-400 block text-[10px] font-sans">
                UTF-16 Onluk (Decimal)
              </span>
              <span className="text-indigo-300 font-semibold">{charCode}</span>
            </div>
            <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg">
              <span className="text-slate-400 block text-[10px] font-sans">
                Hexadecimal Kodu
              </span>
              <span className="text-amber-300 font-semibold">\u{hex}</span>
            </div>
            <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg">
              <span className="text-slate-400 block text-[10px] font-sans">
                {isSurrogateCodePoint ? 'Surrogate Kod Birimi' : 'Unicode Code Point'}
              </span>
              <span className="text-emerald-300 font-semibold">
                U+{codePoint.toString(16).toUpperCase()}
                {isSurrogateCodePoint && <span className="block text-[9px] text-slate-400">Tek başına Unicode skaler değeri değildir</span>}
              </span>
            </div>
            <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg">
              <span className="text-slate-400 block text-[10px] font-sans">
                İkili (Binary)
              </span>
              <span className="text-purple-300 font-semibold text-[11px] truncate block">
                {binary}
              </span>
            </div>
          </div>

          {/* Quick String Searcher */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Metin İçi Hızlı Arama Testi</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Aranacak alt kelime..."
                className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>str.includes("{searchQuery}"):</span>
              <span className={searchMatches.length > 0 ? 'text-emerald-400 font-bold' : 'text-rose-400'}>
                {searchMatches.length > 0 ? 'true' : 'false'}
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>str.indexOf("{searchQuery}"):</span>
              <span className="text-indigo-400 font-bold">
                {text.indexOf(searchQuery)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
