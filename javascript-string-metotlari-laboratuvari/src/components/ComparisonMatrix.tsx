import React, { useState } from 'react';
import { COMPARISONS, ComparisonScenario } from '../data/comparisons';
import {
  Swords,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
} from 'lucide-react';

export const ComparisonMatrix: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('slice-vs-substring');

  const scenario: ComparisonScenario =
    COMPARISONS.find((c) => c.id === selectedScenarioId) || COMPARISONS[0];

  const [inputVal, setInputVal] = useState<string>(scenario.defaultInput);
  const [param1, setParam1] = useState<any>(scenario.param1Default);
  const [param2, setParam2] = useState<any>(scenario.param2Default);

  const handleSelectScenario = (sc: ComparisonScenario) => {
    setSelectedScenarioId(sc.id);
    setInputVal(sc.defaultInput);
    setParam1(sc.param1Default);
    setParam2(sc.param2Default);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-mono text-indigo-400 mb-1 tracking-wider uppercase">
          Metot Karşılaştırma & Mühendislik Analizi
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Metot Karşılaştırma Arenası (Showdown)
        </h1>
        <p className="mt-1 text-sm text-slate-400 max-w-3xl leading-relaxed">
          Benzer işlevlere sahip metotların uç durumlardaki (edge-cases) davranış farklılıklarını,
          parametre takaslarını ve negatif indeks tepkilerini yan yana canlı olarak test edin.
        </p>

        {/* Scenario Selection Tabs */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {COMPARISONS.map((sc) => {
            const isSelected = sc.id === selectedScenarioId;
            return (
              <button
                key={sc.id}
                onClick={() => handleSelectScenario(sc)}
                className={`px-4 py-2 rounded-lg text-xs font-medium border whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800 hover:bg-slate-800'
                }`}
              >
                <Swords className="w-3.5 h-3.5" />
                <span>{sc.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Testing Controller Box */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <span className="text-xs font-mono text-indigo-400 font-semibold block">
              {scenario.badge}
            </span>
            <h2 className="text-lg font-bold text-white">{scenario.title}</h2>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">{scenario.description}</p>
        </div>

        {/* Global Inputs that feed both competitors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Ortak Test Metni (str)
            </label>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1 font-mono">
              1. Parametre: {scenario.param1Label}
            </label>
            <input
              type="text"
              value={param1}
              onChange={(e) => setParam1(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {scenario.param2Label && (
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1 font-mono">
                2. Parametre: {scenario.param2Label}
              </label>
              <input
                type="text"
                value={param2}
                onChange={(e) => setParam2(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* Side-by-Side Competitors Execution Cards */}
      <div className={`grid grid-cols-1 gap-6 ${scenario.competitors.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
        {scenario.competitors.map((comp, idx) => {
          const evalRes = comp.run(inputVal, param1, param2);
          return (
            <div
              key={idx}
              className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-sm font-bold text-white">
                    {comp.name}
                  </h3>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded font-mono ${
                      evalRes.status === 'warning'
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                        : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {evalRes.status === 'warning' ? 'Özel Durum' : 'Normal'}
                  </span>
                </div>

                {/* Live Output */}
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono block">
                    Dönüş Değeri:
                  </span>
                  <div className="font-mono text-base font-bold text-emerald-300 break-all">
                    {evalRes.result}
                  </div>
                </div>

                {/* Behavioral Note */}
                <div className="p-2.5 bg-slate-950/70 border border-slate-800/80 rounded text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                  {evalRes.status === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  <span>{evalRes.note}</span>
                </div>

                {/* Pros list */}
                <div className="space-y-1 text-xs">
                  <span className="text-slate-400 font-semibold block text-[11px]">
                    Güçlü Yönleri:
                  </span>
                  {comp.pros.map((p, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-1.5 text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>

                {/* Cons list */}
                {comp.cons.length > 0 && (
                  <div className="space-y-1 text-xs pt-1">
                    <span className="text-slate-400 font-semibold block text-[11px]">
                      Zayıf / Dikkat Edilmesi Gereken Yönleri:
                    </span>
                    {comp.cons.map((c, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-1.5 text-slate-400">
                        <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
        <h3 className="text-sm font-semibold text-white">
          Karşılaştırmalı Özellik Tablosu
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-2.5 px-3">Kriter / Özellik</th>
                {scenario.competitors.map((c, idx) => (
                  <th key={idx} className="py-2.5 px-3 text-indigo-300">
                    {c.signature}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {scenario.summaryTable.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-medium text-slate-300">
                    {row.feature}
                  </td>
                  {scenario.competitors.map((c, cIdx) => {
                    const matchedKey = Object.keys(row.details).find((k) =>
                      c.name.toLowerCase().includes(k.replace('()', '').toLowerCase())
                    );
                    const val = matchedKey ? row.details[matchedKey] : '-';
                    return (
                      <td key={cIdx} className="py-2.5 px-3 font-mono text-slate-300">
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enes Öztürk Author Verdict Card */}
      <div className="p-5 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-indigo-950/40 border border-indigo-500/30 rounded-xl space-y-2">
        <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider font-mono">
          <Award className="w-4 h-4 text-indigo-400" />
          <span>Enes Öztürk Kıdemli Mühendis Kararı & Tavsiyesi</span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-sans">
          {scenario.authorVerdict}
        </p>
      </div>
    </div>
  );
};
