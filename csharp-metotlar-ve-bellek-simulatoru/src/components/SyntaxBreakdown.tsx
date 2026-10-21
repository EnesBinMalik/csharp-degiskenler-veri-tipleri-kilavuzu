import React, { useState } from 'react';
import { Code2, Info, Check, HelpCircle } from 'lucide-react';
import { METHOD_SYNTAX_PARTS } from '../data/methodData';

export const SyntaxBreakdown: React.FC = () => {
  const [selectedPartKey, setSelectedPartKey] = useState<string>('parameters');
  const selectedPart = METHOD_SYNTAX_PARTS.find(p => p.key === selectedPartKey) || METHOD_SYNTAX_PARTS[0];

  // Custom signature playground state
  const [customAccess, setCustomAccess] = useState<'public' | 'private' | 'internal' | 'protected'>('public');
  const [customReturn, setCustomReturn] = useState<'int' | 'void' | 'string' | 'bool' | 'double'>('int');
  const [customName, setCustomName] = useState<string>('Topla');
  const [customParamMode, setCustomParamMode] = useState<'ref' | 'value'>('ref');

  return (
    <section id="sozdizimi" className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="space-y-4 mb-10">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <span className="text-cyan-400 font-semibold">Bölüm 02</span>
          <span aria-hidden="true">·</span>
          <span>Söz Dizimi ve Anatomi</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Metot Anatomisi (Syntax Şablonu)
        </h2>
        <p className="text-slate-300 max-w-3xl leading-relaxed">
          C# dilinde bir metot bildirimi belirli bir söz dizimi kuralına bağlıdır. Aşağıdaki formülde
          parçalara tıklayarak her bir bileşenin derleyici ve bellek açısından görevini inceleyin:
        </p>
      </div>

      {/* The Fundamental Syntax Formula from user prompt */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 mb-8 shadow-xl">
        <div className="text-xs text-slate-400 font-mono uppercase tracking-wider mb-3">
          Temel C# Metot Tanım Kalıbı:
        </div>
        <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 font-mono text-sm sm:text-lg text-slate-300 flex flex-wrap items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setSelectedPartKey('access_modifier')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer font-bold ${
              selectedPartKey === 'access_modifier'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500 shadow-sm'
                : 'text-indigo-400 hover:bg-slate-900'
            }`}
          >
            erişim_belirteci
          </button>

          <button
            onClick={() => setSelectedPartKey('return_type')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer font-bold ${
              selectedPartKey === 'return_type'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500 shadow-sm'
                : 'text-emerald-400 hover:bg-slate-900'
            }`}
          >
            geri_donus_tipi
          </button>

          <button
            onClick={() => setSelectedPartKey('method_name')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer font-bold ${
              selectedPartKey === 'method_name'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500 shadow-sm'
                : 'text-amber-400 hover:bg-slate-900'
            }`}
          >
            metot_adi
          </button>

          <button
            onClick={() => setSelectedPartKey('parameters')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer font-bold ${
              selectedPartKey === 'parameters'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500 shadow-sm'
                : 'text-cyan-400 hover:bg-slate-900'
            }`}
          >
            (argüman/parametre)
          </button>

          <button
            onClick={() => setSelectedPartKey('method_body')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer font-bold ${
              selectedPartKey === 'method_body'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500 shadow-sm'
                : 'text-purple-400 hover:bg-slate-900'
            }`}
          >
            {'{ //komutlar; }'}
          </button>
        </div>

        {/* Selected Part Details */}
        <div className="mt-6 p-5 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 text-xs font-mono font-bold rounded border ${selectedPart.color}`}>
                {selectedPart.code}
              </span>
              <span className="text-base font-bold text-white">{selectedPart.label}</span>
            </div>
            <span className="text-xs text-slate-500 font-mono">Detay Kartı</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{selectedPart.description}</p>
          <div className="p-3 bg-slate-900 rounded border border-slate-800 text-xs text-cyan-300">
            📌 <strong>İpucu:</strong> {selectedPart.detail}
          </div>
        </div>
      </div>

      {/* Interactive Metot Builder Playground */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <span>İnteraktif Metot İmzası Oluşturucu</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Farklı erişim belirteçleri ve dönüş tiplerini seçerek C# derleyicisinin üreteceği imzayı canlı gözlemleyin.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Access Modifier */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Erişim Belirteci</label>
            <select
              value={customAccess}
              onChange={(e) => setCustomAccess(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-cyan-500 focus:outline-none"
            >
              <option value="public">public (Genel)</option>
              <option value="private">private (Gizli)</option>
              <option value="internal">internal (İçsel)</option>
              <option value="protected">protected (Korumalı)</option>
            </select>
          </div>

          {/* Return Type */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Geri Dönüş Tipi</label>
            <select
              value={customReturn}
              onChange={(e) => setCustomReturn(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-cyan-500 focus:outline-none"
            >
              <option value="int">int (Tam sayı)</option>
              <option value="void">void (Dönüş yok)</option>
              <option value="string">string (Metin)</option>
              <option value="bool">bool (Mantıksal)</option>
              <option value="double">double (Ondalıklı)</option>
            </select>
          </div>

          {/* Method Name */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Metot İsmi (PascalCase)</label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-cyan-500 focus:outline-none"
              placeholder="MetotAdi"
            />
          </div>

          {/* Param Mode */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Parametre Aktarımı</label>
            <select
              value={customParamMode}
              onChange={(e) => setCustomParamMode(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-cyan-500 focus:outline-none"
            >
              <option value="ref">ref Parametreler (Adres ile)</option>
              <option value="value">Değer Parametreleri (Kopya)</option>
            </select>
          </div>
        </div>

        {/* Live Code Output */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 font-mono text-sm leading-relaxed text-slate-200">
          <div className="text-slate-500 text-xs mb-2">// Derlenen C# Metot Bildirimi:</div>
          <div>
            <span className="text-indigo-400 font-semibold">{customAccess}</span>{' '}
            <span className="text-emerald-400 font-semibold">{customReturn}</span>{' '}
            <span className="text-amber-400 font-bold">{customName || 'MetotAdi'}</span>
            <span className="text-cyan-400">
              {customParamMode === 'ref'
                ? '(ref int sayi1, ref int sayi2)'
                : '(int sayi1, int sayi2)'}
            </span>
          </div>
          <div className="text-slate-400">{'{'}</div>
          {customReturn === 'void' ? (
            <div className="pl-4 text-slate-400">
              // void metotlar geriye bir değer döndürmez (return; isteğe bağlıdır)
            </div>
          ) : (
            <div className="pl-4 text-teal-300">
              <span className="text-indigo-400">return</span> (sayi1 + sayi2);
            </div>
          )}
          <div className="text-slate-400">{'}'}</div>
        </div>
      </div>
    </section>
  );
};
