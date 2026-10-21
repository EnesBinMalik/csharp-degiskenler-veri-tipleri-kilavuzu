import React, { useState } from 'react';
import { STRING_METHODS } from '../data/stringMethods';
import { Search, X, Copy, Check } from 'lucide-react';

interface CheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [filter, setFilter] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = STRING_METHODS.filter(
    (m) =>
      m.name.toLowerCase().includes(filter.toLowerCase()) ||
      m.signature.toLowerCase().includes(filter.toLowerCase()) ||
      m.shortDesc.toLowerCase().includes(filter.toLowerCase())
  );

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>Hızlı Kopya Kılavuzu (Cheat Sheet)</span>
              <span className="text-xs font-normal text-slate-400">· Enes Öztürk'ten</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              JavaScript'te dizgeler (string) değişmezdir (immutable). Tüm metotlar yeni bir değer üretir.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/60">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Metot veya sözdizimi filtrele..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Table content */}
        <div className="p-4 overflow-y-auto flex-1">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-2.5 px-3">Metot</th>
                <th className="py-2.5 px-3">Sözdizimi (Signature)</th>
                <th className="py-2.5 px-3">Dönüş Türü</th>
                <th className="py-2.5 px-3">Açıklama</th>
                <th className="py-2.5 px-3 text-right">Kopyala</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-indigo-400">
                    .{m.name}()
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-300">
                    {m.signature}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400">
                    {m.returns}
                  </td>
                  <td className="py-2.5 px-3 text-slate-300 max-w-xs">
                    {m.shortDesc}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => handleCopy(m.id, m.signature)}
                      className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer inline-flex items-center"
                      title="Sözdizimini Kopyala"
                    >
                      {copiedId === m.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>Toplam {filtered.length} metot listelendi</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs transition-colors cursor-pointer"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
