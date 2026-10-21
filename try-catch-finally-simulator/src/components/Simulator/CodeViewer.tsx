import React from 'react';
import { CodeLine, ExecutionStep } from '../../types';
import { ChevronRight, AlertTriangle, CheckCircle2, CornerDownRight } from 'lucide-react';

interface CodeViewerProps {
  lines: CodeLine[];
  currentStep?: ExecutionStep;
  executedLines: number[];
  failedLine?: number;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  lines,
  currentStep,
  executedLines,
  failedLine
}) => {
  const currentLineNumber = currentStep?.lineNumber;

  const getBlockStyle = (block: string) => {
    switch (block) {
      case 'try':
        return 'border-l-2 border-indigo-500/40 bg-indigo-950/10';
      case 'catch':
        return 'border-l-2 border-rose-500/40 bg-rose-950/10';
      case 'finally':
        return 'border-l-2 border-emerald-500/40 bg-emerald-950/10';
      default:
        return 'border-l-2 border-slate-700/40';
    }
  };

  const getBlockBadge = (block: string) => {
    switch (block) {
      case 'try':
        return <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">try</span>;
      case 'catch':
        return <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold">catch</span>;
      case 'finally':
        return <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">finally</span>;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl flex flex-col h-full">
      {/* Code Window Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="text-slate-400 font-mono ml-2">Program.cs</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-indigo-400"></span> try
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span> catch
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> finally
          </span>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="p-3 sm:p-4 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed select-none">
        {lines.map((line) => {
          const isCurrent = currentLineNumber === line.lineNumber;
          const isFailed = failedLine === line.lineNumber;
          const isExecuted = executedLines.includes(line.lineNumber);

          let rowBg = 'hover:bg-slate-800/40';
          if (isFailed) {
            rowBg = 'bg-rose-950/40 border-l-4 border-rose-500 text-rose-200 font-medium animate-pulse';
          } else if (isCurrent) {
            rowBg = 'bg-indigo-950/50 border-l-4 border-indigo-400 text-white font-medium shadow-inner';
          } else if (isExecuted) {
            rowBg = 'bg-slate-900/40 text-slate-300';
          }

          return (
            <div
              key={line.lineNumber}
              className={`flex items-center gap-2 sm:gap-3 py-1 px-2 rounded-md transition-colors relative group ${rowBg} ${
                !isCurrent && !isFailed ? getBlockStyle(line.block) : ''
              }`}
            >
              {/* Pointer / Status Indicator */}
              <div className="w-5 flex items-center justify-center shrink-0">
                {isFailed ? (
                  <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
                ) : isCurrent ? (
                  <ChevronRight className="w-4 h-4 text-indigo-400 animate-pulse" />
                ) : isExecuted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                )}
              </div>

              {/* Line Number */}
              <span
                className={`w-6 text-right select-none shrink-0 ${
                  isCurrent ? 'text-indigo-400 font-bold' : isFailed ? 'text-rose-400 font-bold' : 'text-slate-600'
                }`}
              >
                {line.lineNumber}
              </span>

              {/* Code Text with basic token coloring */}
              <div className="flex-1 whitespace-pre font-mono">
                {highlightCodeTokens(line.code)}
              </div>

              {/* Block Badge (if line declares the block) */}
              {(line.code.trim().startsWith('try') ||
                line.code.trim().startsWith('catch') ||
                line.code.trim().startsWith('finally')) && (
                <div className="shrink-0 hidden sm:block">
                  {getBlockBadge(line.block)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Explanatory Banner for Active Line */}
      {currentStep && (
        <div className="mt-auto px-4 py-2.5 bg-slate-950/90 border-t border-slate-800 text-xs flex items-start gap-2.5">
          <CornerDownRight className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
          <div className="flex-1">
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <span>Satır {currentStep.lineNumber} İncelemesi:</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                currentStep.block === 'try' ? 'bg-indigo-500/20 text-indigo-300' :
                currentStep.block === 'catch' ? 'bg-rose-500/20 text-rose-300' :
                currentStep.block === 'finally' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {currentStep.block.toUpperCase()} BLOĞU
              </span>
            </div>
            <p className="text-slate-400 mt-0.5 leading-relaxed">
              {currentStep.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

function highlightCodeTokens(code: string) {
  if (!code) return <span className="opacity-0">.</span>;

  // Simple token highlight for C# presentation
  const tokens = code.split(/(\b(?:try|catch|finally|int|double|string|out|if|else|return|throw|new)\b|\b(?:Console|Exception|DivideByZeroException|FormatException|OverflowException)\b|\b(?:ReadLine|WriteLine|Parse|TryParse|Message)\b|"[^"]*"|\/\/.*)/g);

  return (
    <>
      {tokens.map((token, idx) => {
        if (!token) return null;

        if (token.startsWith('//')) {
          return <span key={idx} className="text-slate-500 italic">{token}</span>;
        }
        if (token.startsWith('"') && token.endsWith('"')) {
          return <span key={idx} className="text-amber-300">{token}</span>;
        }
        if (['try', 'catch', 'finally'].includes(token)) {
          return <span key={idx} className="text-purple-400 font-bold">{token}</span>;
        }
        if (['int', 'double', 'string', 'out', 'if', 'else', 'return', 'throw', 'new'].includes(token)) {
          return <span key={idx} className="text-sky-400 font-medium">{token}</span>;
        }
        if (['Console', 'Exception', 'DivideByZeroException', 'FormatException', 'OverflowException'].includes(token)) {
          return <span key={idx} className="text-teal-400 font-medium">{token}</span>;
        }
        if (['ReadLine', 'WriteLine', 'Parse', 'TryParse', 'Message'].includes(token)) {
          return <span key={idx} className="text-yellow-200">{token}</span>;
        }

        return <span key={idx} className="text-slate-200">{token}</span>;
      })}
    </>
  );
}
