import React from 'react';
import { X, Quote, ShieldCheck, Terminal, Award } from 'lucide-react';

interface EnesManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnesManifestoModal: React.FC<EnesManifestoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Quote className="w-40 h-40 text-indigo-400" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Author Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-600/30">
            EÖ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">Enes Öztürk</h3>
            </div>
            <p className="text-xs text-slate-400">Savunmacı kodlama üzerine yazar notu</p>
          </div>
        </div>

        {/* The Core Quote */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-900/40 relative mb-6">
          <Quote className="w-6 h-6 text-indigo-400/60 mb-2" />
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-serif italic">
            "Uygulama geliştirirken bu tarz hataya neden olabilecek noktaları yakalıyor olmak gerekiyor.
            Bunun için de kod üzerinde zaman geçirmek ve düşünmek gerekiyor. Hızlıca kodu yazıp geçmek doğru bir yaklaşım değildir.
            Yazdığımız kod bloğunun açıklarını düşünmemiz ve bu açıklar için önlemler alıyor olmamız gerekiyor."
          </p>
          <div className="mt-3 text-right text-xs font-mono font-medium text-indigo-400">
            — Enes Öztürk
          </div>
        </div>

        {/* 3 Core Principles */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Kıdemli Geliştirici İlkeleri
          </h4>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <strong className="text-slate-200 block mb-0.5">1. Zero Trust (Sıfır Güven) İlkesi:</strong>
              <p className="text-slate-400 leading-relaxed">
                Kullanıcıdan, ağdan veya üçüncü taraf servislerden gelen hiçbir verinin beklenen biçimde geleceğini varsaymayın. Her zaman veri doğrulaması (Validation) yapın.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
            <Terminal className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
            <div>
              <strong className="text-slate-200 block mb-0.5">2. Try-Catch'e Körlemesine Güvenmeyin:</strong>
              <p className="text-slate-400 leading-relaxed">
                İstisnalar çalışma zamanı çökmelerini önler, ancak mantıksal hataları yakalayamaz. Kodunuzun iş kurallarını birim testlerle sınayın.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
            <Award className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <strong className="text-slate-200 block mb-0.5">3. Zaman Ayırın ve Düşünün:</strong>
              <p className="text-slate-400 leading-relaxed">
                Hızlıca çalışan ilk taslağı bitirip geçmek yerine; olası sınır durumları (edge cases), bellek sızıntıları ve kaynak tahsislerini analiz edin.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            Try-Catch-Finally Eğitici Platformu
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors"
          >
            Anladım & Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
