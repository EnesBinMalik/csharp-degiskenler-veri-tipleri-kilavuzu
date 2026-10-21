import React from 'react';
import { ExecutionStep } from '../../types';
import { Layers, Bug, Database, AlertCircle } from 'lucide-react';

interface VariablesInspectorProps {
  currentStep?: ExecutionStep;
  hasException: boolean;
  exceptionInfo?: { name: string; message: string };
}

export const VariablesInspector: React.FC<VariablesInspectorProps> = ({
  currentStep,
  hasException,
  exceptionInfo
}) => {
  const variables = currentStep?.variables ?? {};

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-xs">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-indigo-400" />
            Bellek & Değişken Durumu (Watch)
          </span>
          <span className="font-mono text-[11px] text-slate-500">
            Adım: {currentStep ? `${currentStep.stepIndex}` : '0'}
          </span>
        </div>

        {/* Variables Table */}
        <div className="space-y-1.5 font-mono text-xs">
          {Object.entries(variables).length === 0 ? (
            <div className="py-6 text-center text-slate-500 text-xs italic">
              Henüz yürütme başlatılmadı. Çalıştır veya İlerle butonuna basın.
            </div>
          ) : (
            Object.entries(variables).map(([name, val]) => {
              const isError = val === 'HATA!' || name === 'ex' && val !== 'null';
              const isUndefined = val === 'tanımsız';

              return (
                <div
                  key={name}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-md border text-xs transition-colors ${
                    isError
                      ? 'bg-rose-950/40 border-rose-800/60 text-rose-300'
                      : isUndefined
                      ? 'bg-slate-950/40 border-slate-800/40 text-slate-500'
                      : 'bg-slate-950/70 border-slate-800 text-slate-200'
                  }`}
                >
                  <span className="font-medium text-slate-400">{name}:</span>
                  <span
                    className={`font-mono ${
                      isError
                        ? 'text-rose-400 font-bold'
                        : isUndefined
                        ? 'text-slate-600 italic'
                        : 'text-emerald-400 font-semibold'
                    }`}
                  >
                    {String(val)}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Exception Status Banner */}
      {hasException && exceptionInfo && (
        <div className="mt-4 p-2.5 rounded-lg bg-rose-950/50 border border-rose-800/60 text-xs">
          <div className="flex items-center gap-1.5 text-rose-300 font-semibold mb-1">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Fırlatılan İstisna (CLR):</span>
          </div>
          <div className="font-mono text-[11px] text-rose-200 font-medium">
            System.{exceptionInfo.name}
          </div>
          <p className="text-[11px] text-rose-300/80 mt-1 leading-snug">
            "{exceptionInfo.message}"
          </p>
        </div>
      )}
    </div>
  );
};
