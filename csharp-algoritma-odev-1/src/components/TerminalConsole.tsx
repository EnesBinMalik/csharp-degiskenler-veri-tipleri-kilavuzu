import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, RotateCcw, Copy, Check, Sparkles, CornerDownLeft } from 'lucide-react';
import { TerminalLine } from '../types/homework';

interface TerminalConsoleProps {
  onSelectQuestionInVisualizer?: (qId: 'q1' | 'q2' | 'q3' | 'q4') => void;
}

type StepState =
  | { mode: 'menu' }
  // Q1 states
  | { mode: 'q1_n' }
  | { mode: 'q1_items'; n: number; currentIdx: number; items: number[] }
  // Q2 states
  | { mode: 'q2_n' }
  | { mode: 'q2_m'; n: number }
  | { mode: 'q2_items'; n: number; m: number; currentIdx: number; items: number[] }
  // Q3 states
  | { mode: 'q3_n' }
  | { mode: 'q3_items'; n: number; currentIdx: number; words: string[] }
  // Q4 states
  | { mode: 'q4_sentence' }
  // All sequence
  | { mode: 'all_sequence'; currentSub: 1 | 2 | 3 | 4; subState: any };

const INITIAL_BANNER: TerminalLine[] = [
  { id: 'b-1', type: 'banner', text: '========================================================' },
  { id: 'b-2', type: 'banner', text: '       C# 101 - ÖDEV 1: ALGORİTMA PRATİKLERİ            ' },
  { id: 'b-3', type: 'banner', text: '       Hazırlayan / Geliştirici: Enes Öztürk            ' },
  { id: 'b-4', type: 'banner', text: '========================================================' },
  { id: 'm-0', type: 'system', text: '\nBu ekran tarayıcı simülasyonudur; C# kodu veya .NET çalışma zamanı çalıştırmaz.\nLütfen örnek akışını seçiniz:' },
  { id: 'm-1', type: 'output', text: '1 - Soru 1: n adet sayıdan çift olanları yazdırma' },
  { id: 'm-2', type: 'output', text: "2 - Soru 2: n adet sayıdan m'e eşit veya tam bölünenleri yazdırma" },
  { id: 'm-3', type: 'output', text: '3 - Soru 3: n adet kelimeyi sondan başa yazdırma' },
  { id: 'm-4', type: 'output', text: '4 - Soru 4: Cümledeki toplam kelime ve harf sayısını bulma' },
  { id: 'm-5', type: 'output', text: '5 - Tüm Soruları Sırayla Çalıştır' },
  { id: 'm-6', type: 'output', text: '0 - Çıkış' },
  { id: 'p-0', type: 'prompt', text: 'Seçiminiz (1-5, 0): ' },
];

export const TerminalConsole: React.FC<TerminalConsoleProps> = () => {
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_BANNER);
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState<StepState>({ mode: 'menu' });
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of console
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const addLine = (line: Omit<TerminalLine, 'id'>) => {
    const newLine: TerminalLine = {
      ...line,
      id: `line-${Date.now()}-${Math.random()}`,
    };
    setLines((prev) => [...prev, newLine]);
    return newLine;
  };

  const handleClear = () => {
    setLines([
      { id: 'b-1', type: 'banner', text: '========================================================' },
      { id: 'b-2', type: 'banner', text: '       C# 101 - ÖDEV 1: ALGORİTMA PRATİKLERİ            ' },
      { id: 'b-3', type: 'banner', text: '       Hazırlayan / Geliştirici: Enes Öztürk            ' },
      { id: 'b-4', type: 'banner', text: '========================================================' },
      { id: 'm-0', type: 'system', text: '\nBu ekran tarayıcı simülasyonudur; C# kodu veya .NET çalışma zamanı çalıştırmaz.\nLütfen örnek akışını seçiniz:' },
      { id: 'm-1', type: 'output', text: '1 - Soru 1: n adet sayıdan çift olanları yazdırma' },
      { id: 'm-2', type: 'output', text: "2 - Soru 2: n adet sayıdan m'e eşit veya tam bölünenleri yazdırma" },
      { id: 'm-3', type: 'output', text: '3 - Soru 3: n adet kelimeyi sondan başa yazdırma' },
      { id: 'm-4', type: 'output', text: '4 - Soru 4: Cümledeki toplam kelime ve harf sayısını bulma' },
      { id: 'm-5', type: 'output', text: '5 - Tüm Soruları Sırayla Çalıştır' },
      { id: 'm-6', type: 'output', text: '0 - Çıkış' },
      { id: 'p-0', type: 'prompt', text: 'Seçiminiz (1-5, 0): ' },
    ]);
    setStep({ mode: 'menu' });
    setInputValue('');
  };

  const handleCopyConsole = () => {
    const textToCopy = lines.map((l) => l.text).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const returnToMenu = () => {
    addLine({ type: 'divider', text: '--------------------------------------------------------' });
    addLine({ type: 'system', text: 'Lütfen çalıştırmak istediğiniz soruyu seçiniz:' });
    addLine({ type: 'output', text: '1 - Soru 1 | 2 - Soru 2 | 3 - Soru 3 | 4 - Soru 4 | 5 - Tümü | 0 - Çıkış' });
    addLine({ type: 'prompt', text: 'Seçiminiz: ' });
    setStep({ mode: 'menu' });
  };

  const processInput = (text: string) => {
    const trimmed = text.trim();

    // Echo user input
    addLine({ type: 'input', text: `> ${text}` });

    // Handle based on current step
    switch (step.mode) {
      case 'menu': {
        if (trimmed === '1') {
          addLine({ type: 'system', text: '\n--- [SORU 1] Çift Sayıları Bulma (Enes Öztürk) ---' });
          addLine({ type: 'output', text: 'Açıklama: n adet pozitif sayı arasından çift olanlar ekrana yazdırılacaktır.' });
          addLine({ type: 'prompt', text: 'Lütfen pozitif bir sayı giriniz (n): ' });
          setStep({ mode: 'q1_n' });
        } else if (trimmed === '2') {
          addLine({ type: 'system', text: "\n--- [SORU 2] m'e Eşit veya Tam Bölünen Sayılar (Enes Öztürk) ---" });
          addLine({ type: 'output', text: "Açıklama: n adet pozitif sayı arasından m'e eşit ya da tam bölünenler yazdırılacaktır." });
          addLine({ type: 'prompt', text: 'Lütfen 1. pozitif sayıyı giriniz (n - eleman adedi): ' });
          setStep({ mode: 'q2_n' });
        } else if (trimmed === '3') {
          addLine({ type: 'system', text: '\n--- [SORU 3] Kelimeleri Sondan Başa Yazdırma (Enes Öztürk) ---' });
          addLine({ type: 'output', text: 'Açıklama: n adet kelime sondan başa doğru (ters sırada) yazdırılacaktır.' });
          addLine({ type: 'prompt', text: 'Lütfen pozitif bir sayı giriniz (n - kelime adedi): ' });
          setStep({ mode: 'q3_n' });
        } else if (trimmed === '4') {
          addLine({ type: 'system', text: '\n--- [SORU 4] Toplam Kelime ve Harf Sayısı (Enes Öztürk) ---' });
          addLine({ type: 'output', text: 'Açıklama: Girilen cümledeki toplam kelime ve alfabetik harf sayısı hesaplanacaktır.' });
          addLine({ type: 'prompt', text: 'Lütfen bir cümle yazınız: ' });
          setStep({ mode: 'q4_sentence' });
        } else if (trimmed === '5') {
          addLine({ type: 'system', text: '\n================ TÜM SORULAR SIRAYLA ÇALIŞTIRILIYOR ================' });
          addLine({ type: 'system', text: '--- [ADIM 1 / 4: SORU 1 - Çift Sayılar] ---' });
          addLine({ type: 'prompt', text: 'Lütfen pozitif bir sayı giriniz (n): ' });
          setStep({
            mode: 'all_sequence',
            currentSub: 1,
            subState: { phase: 'q1_n' },
          });
        } else if (trimmed === '0') {
          addLine({ type: 'success', text: '\nProgram sonlandırıldı. İyi çalışmalar dilerim! - Enes Öztürk' });
        } else {
          addLine({ type: 'error', text: 'Geçersiz seçim! Lütfen 0, 1, 2, 3, 4 veya 5 giriniz.' });
          addLine({ type: 'prompt', text: 'Seçiminiz: ' });
        }
        break;
      }

      // ---------------- QUESTION 1 ----------------
      case 'q1_n': {
        const n = parseInt(trimmed, 10);
        if (isNaN(n) || n <= 0) {
          addLine({ type: 'error', text: "Hatalı giriş! Lütfen 0'dan büyük pozitif bir tam sayı giriniz." });
          addLine({ type: 'prompt', text: 'Lütfen pozitif bir sayı giriniz (n): ' });
          return;
        }
        addLine({ type: 'prompt', text: `1. pozitif sayıyı giriniz (1/${n}): ` });
        setStep({ mode: 'q1_items', n, currentIdx: 0, items: [] });
        break;
      }

      case 'q1_items': {
        const val = parseInt(trimmed, 10);
        if (isNaN(val) || val <= 0) {
          addLine({ type: 'error', text: "Hatalı giriş! Lütfen 0'dan büyük pozitif bir tam sayı giriniz." });
          addLine({ type: 'prompt', text: `${step.currentIdx + 1}. pozitif sayıyı giriniz (${step.currentIdx + 1}/${step.n}): ` });
          return;
        }

        const newItems = [...step.items, val];
        const nextIdx = step.currentIdx + 1;

        if (nextIdx < step.n) {
          addLine({ type: 'prompt', text: `${nextIdx + 1}. pozitif sayıyı giriniz (${nextIdx + 1}/${step.n}): ` });
          setStep({ mode: 'q1_items', n: step.n, currentIdx: nextIdx, items: newItems });
        } else {
          // Finished Question 1
          const evens = newItems.filter((x) => x % 2 === 0);
          addLine({ type: 'success', text: '\n[Sonuç] Girilen sayılardan çift olanlar:' });
          if (evens.length > 0) {
            addLine({
              type: 'output',
              text: evens.join('  ') + `   (Toplam ${evens.length} adet çift sayı)`,
              highlight: true,
            });
          } else {
            addLine({ type: 'output', text: '(Girilen sayılar arasında çift sayı bulunamadı.)' });
          }
          addLine({ type: 'success', text: 'Hazırlayan: Enes Öztürk' });
          returnToMenu();
        }
        break;
      }

      // ---------------- QUESTION 2 ----------------
      case 'q2_n': {
        const n = parseInt(trimmed, 10);
        if (isNaN(n) || n <= 0) {
          addLine({ type: 'error', text: "Hatalı giriş! Lütfen 0'dan büyük pozitif bir tam sayı giriniz." });
          addLine({ type: 'prompt', text: 'Lütfen 1. pozitif sayıyı giriniz (n - eleman adedi): ' });
          return;
        }
        addLine({ type: 'prompt', text: 'Lütfen 2. pozitif sayıyı giriniz (m - bölen/hedef sayı): ' });
        setStep({ mode: 'q2_m', n });
        break;
      }

      case 'q2_m': {
        const m = parseInt(trimmed, 10);
        if (isNaN(m) || m <= 0) {
          addLine({ type: 'error', text: "Hatalı giriş! Lütfen 0'dan büyük pozitif bir tam sayı giriniz." });
          addLine({ type: 'prompt', text: 'Lütfen 2. pozitif sayıyı giriniz (m - bölen/hedef sayı): ' });
          return;
        }
        addLine({ type: 'prompt', text: `1. pozitif sayıyı giriniz (1/${step.n}): ` });
        setStep({ mode: 'q2_items', n: step.n, m, currentIdx: 0, items: [] });
        break;
      }

      case 'q2_items': {
        const val = parseInt(trimmed, 10);
        if (isNaN(val) || val <= 0) {
          addLine({ type: 'error', text: "Hatalı giriş! Lütfen 0'dan büyük pozitif bir tam sayı giriniz." });
          addLine({ type: 'prompt', text: `${step.currentIdx + 1}. pozitif sayıyı giriniz: ` });
          return;
        }

        const newItems = [...step.items, val];
        const nextIdx = step.currentIdx + 1;

        if (nextIdx < step.n) {
          addLine({ type: 'prompt', text: `${nextIdx + 1}. pozitif sayıyı giriniz (${nextIdx + 1}/${step.n}): ` });
          setStep({ mode: 'q2_items', n: step.n, m: step.m, currentIdx: nextIdx, items: newItems });
        } else {
          // Finished Question 2
          const matches = newItems.filter((x) => x === step.m || x % step.m === 0);
          addLine({ type: 'success', text: `\n[Sonuç] ${step.m} sayısına eşit ya da tam bölünen sayılar:` });
          if (matches.length > 0) {
            addLine({
              type: 'output',
              text: matches.join('  ') + `   (Toplam ${matches.length} adet sayı m=${step.m} koşulunu sağladı)`,
              highlight: true,
            });
          } else {
            addLine({ type: 'output', text: `(${step.m} sayısına eşit veya tam bölünen sayı bulunamadı.)` });
          }
          addLine({ type: 'success', text: 'Hazırlayan: Enes Öztürk' });
          returnToMenu();
        }
        break;
      }

      // ---------------- QUESTION 3 ----------------
      case 'q3_n': {
        const n = parseInt(trimmed, 10);
        if (isNaN(n) || n <= 0) {
          addLine({ type: 'error', text: "Hatalı giriş! Lütfen 0'dan büyük pozitif bir tam sayı giriniz." });
          addLine({ type: 'prompt', text: 'Lütfen pozitif bir sayı giriniz (n - kelime adedi): ' });
          return;
        }
        addLine({ type: 'prompt', text: `1. kelimeyi giriniz (1/${n}): ` });
        setStep({ mode: 'q3_items', n, currentIdx: 0, words: [] });
        break;
      }

      case 'q3_items': {
        if (!trimmed) {
          addLine({ type: 'error', text: 'Kelime boş bırakılamaz! Lütfen bir kelime giriniz.' });
          addLine({ type: 'prompt', text: `${step.currentIdx + 1}. kelimeyi giriniz: ` });
          return;
        }

        const newWords = [...step.words, trimmed];
        const nextIdx = step.currentIdx + 1;

        if (nextIdx < step.n) {
          addLine({ type: 'prompt', text: `${nextIdx + 1}. kelimeyi giriniz (${nextIdx + 1}/${step.n}): ` });
          setStep({ mode: 'q3_items', n: step.n, currentIdx: nextIdx, words: newWords });
        } else {
          // Finished Question 3
          addLine({ type: 'success', text: '\n[Sonuç] Kelimelerin sondan başa doğru (ters) sıralanışı:' });
          const reversed = [...newWords].reverse();
          reversed.forEach((w, idx) => {
            addLine({
              type: 'output',
              text: `  [${reversed.length - idx - 1} -> ${idx}] ${w}`,
              highlight: true,
            });
          });
          addLine({ type: 'success', text: 'Hazırlayan: Enes Öztürk' });
          returnToMenu();
        }
        break;
      }

      // ---------------- QUESTION 4 ----------------
      case 'q4_sentence': {
        if (!trimmed) {
          addLine({ type: 'error', text: 'Cümle boş olamaz! Lütfen bir cümle giriniz.' });
          addLine({ type: 'prompt', text: 'Lütfen bir cümle yazınız: ' });
          return;
        }

        // Split into words by whitespace
        const words = trimmed.split(/\s+/).filter(Boolean);
        const wordCount = words.length;

        // Letters only (Unicode letter matching Turkish characters ç, ğ, ı, ö, ş, ü, etc.)
        const letterMatches = trimmed.match(/\p{L}/gu) || [];
        const letterCount = letterMatches.length;

        // Non-space characters
        const nonSpaceCount = trimmed.replace(/\s+/g, '').length;

        addLine({ type: 'success', text: '\n[Sonuç Analizi]' });
        addLine({ type: 'output', text: `Girilen Cümle        : "${trimmed}"` });
        addLine({ type: 'output', text: `Toplam Kelime Sayısı : ${wordCount}`, highlight: true });
        addLine({ type: 'output', text: `Toplam Harf Sayısı   : ${letterCount} (Türkçe harfler dahil)`, highlight: true });
        addLine({ type: 'output', text: `Boşluksuz Karakter   : ${nonSpaceCount} (Noktalama dahil)` });
        addLine({ type: 'success', text: 'Hazırlayan           : Enes Öztürk' });
        returnToMenu();
        break;
      }

      // ---------------- ALL SEQUENTIAL ----------------
      case 'all_sequence': {
        handleAllSequence(trimmed);
        break;
      }
    }
  };

  const handleAllSequence = (trimmed: string) => {
    const cur = step as { mode: 'all_sequence'; currentSub: 1 | 2 | 3 | 4; subState: any };

    if (cur.currentSub === 1) {
      if (cur.subState.phase === 'q1_n') {
        const n = parseInt(trimmed, 10);
        if (isNaN(n) || n <= 0) {
          addLine({ type: 'error', text: "Hatalı giriş! Lütfen 0'dan büyük pozitif sayı giriniz." });
          addLine({ type: 'prompt', text: 'Soru 1 - n sayısını giriniz: ' });
          return;
        }
        addLine({ type: 'prompt', text: `1. sayıyı giriniz (1/${n}): ` });
        setStep({
          mode: 'all_sequence',
          currentSub: 1,
          subState: { phase: 'q1_items', n, currentIdx: 0, items: [] },
        });
      } else if (cur.subState.phase === 'q1_items') {
        const val = parseInt(trimmed, 10);
        if (isNaN(val) || val <= 0) {
          addLine({ type: 'error', text: 'Lütfen pozitif bir sayı giriniz.' });
          return;
        }
        const items = [...cur.subState.items, val];
        const nextIdx = cur.subState.currentIdx + 1;
        if (nextIdx < cur.subState.n) {
          addLine({ type: 'prompt', text: `${nextIdx + 1}. sayıyı giriniz: ` });
          setStep({
            mode: 'all_sequence',
            currentSub: 1,
            subState: { ...cur.subState, currentIdx: nextIdx, items },
          });
        } else {
          const evens = items.filter((x) => x % 2 === 0);
          addLine({ type: 'success', text: `[Soru 1 Sonuç] Çift olanlar: ${evens.join(' ') || '(Yok)'}` });
          addLine({ type: 'divider', text: '--------------------------------------------------------' });
          addLine({ type: 'system', text: "--- [ADIM 2 / 4: SORU 2 - m'e Eşit veya Bölünenler] ---" });
          addLine({ type: 'prompt', text: 'Soru 2 - n sayısını giriniz: ' });
          setStep({
            mode: 'all_sequence',
            currentSub: 2,
            subState: { phase: 'q2_n' },
          });
        }
      }
    } else if (cur.currentSub === 2) {
      if (cur.subState.phase === 'q2_n') {
        const n = parseInt(trimmed, 10);
        if (isNaN(n) || n <= 0) {
          addLine({ type: 'error', text: "Pozitif bir sayı giriniz." });
          return;
        }
        addLine({ type: 'prompt', text: 'Soru 2 - m (bölen/hedef) sayısını giriniz: ' });
        setStep({
          mode: 'all_sequence',
          currentSub: 2,
          subState: { phase: 'q2_m', n },
        });
      } else if (cur.subState.phase === 'q2_m') {
        const m = parseInt(trimmed, 10);
        if (isNaN(m) || m <= 0) {
          addLine({ type: 'error', text: "Pozitif bir sayı giriniz." });
          return;
        }
        addLine({ type: 'prompt', text: `1. sayıyı giriniz (1/${cur.subState.n}): ` });
        setStep({
          mode: 'all_sequence',
          currentSub: 2,
          subState: { phase: 'q2_items', n: cur.subState.n, m, currentIdx: 0, items: [] },
        });
      } else if (cur.subState.phase === 'q2_items') {
        const val = parseInt(trimmed, 10);
        if (isNaN(val) || val <= 0) {
          addLine({ type: 'error', text: 'Pozitif sayı giriniz.' });
          return;
        }
        const items = [...cur.subState.items, val];
        const nextIdx = cur.subState.currentIdx + 1;
        if (nextIdx < cur.subState.n) {
          addLine({ type: 'prompt', text: `${nextIdx + 1}. sayıyı giriniz: ` });
          setStep({
            mode: 'all_sequence',
            currentSub: 2,
            subState: { ...cur.subState, currentIdx: nextIdx, items },
          });
        } else {
          const m = cur.subState.m;
          const matches = items.filter((x) => x === m || x % m === 0);
          addLine({ type: 'success', text: `[Soru 2 Sonuç] m=${m}'e eşit veya bölünenler: ${matches.join(' ') || '(Yok)'}` });
          addLine({ type: 'divider', text: '--------------------------------------------------------' });
          addLine({ type: 'system', text: '--- [ADIM 3 / 4: SORU 3 - Kelimeleri Tersten Yazdırma] ---' });
          addLine({ type: 'prompt', text: 'Soru 3 - n (kelime adedi) giriniz: ' });
          setStep({
            mode: 'all_sequence',
            currentSub: 3,
            subState: { phase: 'q3_n' },
          });
        }
      }
    } else if (cur.currentSub === 3) {
      if (cur.subState.phase === 'q3_n') {
        const n = parseInt(trimmed, 10);
        if (isNaN(n) || n <= 0) {
          addLine({ type: 'error', text: 'Pozitif bir tam sayı giriniz.' });
          return;
        }
        addLine({ type: 'prompt', text: `1. kelimeyi giriniz: ` });
        setStep({
          mode: 'all_sequence',
          currentSub: 3,
          subState: { phase: 'q3_items', n, currentIdx: 0, words: [] },
        });
      } else if (cur.subState.phase === 'q3_items') {
        if (!trimmed) {
          addLine({ type: 'error', text: 'Kelime boş olamaz.' });
          return;
        }
        const words = [...cur.subState.words, trimmed];
        const nextIdx = cur.subState.currentIdx + 1;
        if (nextIdx < cur.subState.n) {
          addLine({ type: 'prompt', text: `${nextIdx + 1}. kelimeyi giriniz: ` });
          setStep({
            mode: 'all_sequence',
            currentSub: 3,
            subState: { ...cur.subState, currentIdx: nextIdx, words },
          });
        } else {
          addLine({ type: 'success', text: `[Soru 3 Sonuç] Tersten kelimeler:` });
          [...words].reverse().forEach((w) => addLine({ type: 'output', text: `  -> ${w}` }));
          addLine({ type: 'divider', text: '--------------------------------------------------------' });
          addLine({ type: 'system', text: '--- [ADIM 4 / 4: SORU 4 - Kelime ve Harf Sayısı] ---' });
          addLine({ type: 'prompt', text: 'Soru 4 - Bir cümle yazınız: ' });
          setStep({
            mode: 'all_sequence',
            currentSub: 4,
            subState: { phase: 'q4_sentence' },
          });
        }
      }
    } else if (cur.currentSub === 4) {
      if (!trimmed) {
        addLine({ type: 'error', text: 'Cümle boş olamaz.' });
        return;
      }
      const words = trimmed.split(/\s+/).filter(Boolean);
      const letterMatches = trimmed.match(/\p{L}/gu) || [];
      addLine({ type: 'success', text: '[Soru 4 Sonuç Analizi]' });
      addLine({ type: 'output', text: `Toplam Kelime: ${words.length} · Toplam Harf: ${letterMatches.length}` });
      addLine({ type: 'banner', text: '========================================================' });
      addLine({ type: 'success', text: 'TÜM 4 ALGORİTMA SORUSU BAŞARIYLA TAMAMLANDI!' });
      addLine({ type: 'success', text: 'Geliştirici / Hazırlayan: Enes Öztürk' });
      addLine({ type: 'banner', text: '========================================================' });
      returnToMenu();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() && step.mode === 'menu') return;
    const val = inputValue;
    setInputValue('');
    processInput(val);
  };

  // Quick Preset Handlers
  const runPreset = (q: 1 | 2 | 3 | 4) => {
    handleClear();
    setTimeout(() => {
      if (q === 1) {
        addLine({ type: 'input', text: '> 1' });
        addLine({ type: 'system', text: '\n--- [SORU 1] Çift Sayıları Bulma (Enes Öztürk) ---' });
        addLine({ type: 'prompt', text: 'Lütfen pozitif bir sayı giriniz (n): 5' });
        const testNums = [14, 7, 22, 35, 88];
        testNums.forEach((n, idx) => {
          addLine({ type: 'prompt', text: `${idx + 1}. pozitif sayıyı giriniz: ${n}` });
        });
        addLine({ type: 'success', text: '\n[Sonuç] Girilen sayılardan çift olanlar:' });
        addLine({ type: 'output', text: '14  22  88   (Toplam 3 adet çift sayı)', highlight: true });
        addLine({ type: 'success', text: 'Hazırlayan: Enes Öztürk' });
        returnToMenu();
      } else if (q === 2) {
        addLine({ type: 'input', text: '> 2' });
        addLine({ type: 'system', text: "\n--- [SORU 2] m'e Eşit veya Tam Bölünen Sayılar (Enes Öztürk) ---" });
        addLine({ type: 'prompt', text: 'Lütfen 1. pozitif sayıyı giriniz (n): 6' });
        addLine({ type: 'prompt', text: 'Lütfen 2. pozitif sayıyı giriniz (m): 4' });
        const testNums = [4, 9, 12, 18, 24, 25];
        testNums.forEach((n, idx) => {
          addLine({ type: 'prompt', text: `${idx + 1}. pozitif sayıyı giriniz: ${n}` });
        });
        addLine({ type: 'success', text: '\n[Sonuç] 4 sayısına eşit ya da tam bölünen sayılar:' });
        addLine({ type: 'output', text: '4  12  24   (Toplam 3 adet sayı m=4 koşulunu sağladı)', highlight: true });
        addLine({ type: 'success', text: 'Hazırlayan: Enes Öztürk' });
        returnToMenu();
      } else if (q === 3) {
        addLine({ type: 'input', text: '> 3' });
        addLine({ type: 'system', text: '\n--- [SORU 3] Kelimeleri Sondan Başa Yazdırma (Enes Öztürk) ---' });
        addLine({ type: 'prompt', text: 'Lütfen pozitif bir sayı giriniz (n): 4' });
        const words = ['kodlama', 'algoritma', 'patika', 'csharp'];
        words.forEach((w, idx) => {
          addLine({ type: 'prompt', text: `${idx + 1}. kelimeyi giriniz: ${w}` });
        });
        addLine({ type: 'success', text: '\n[Sonuç] Kelimelerin sondan başa doğru sıralanışı:' });
        ['csharp', 'patika', 'algoritma', 'kodlama'].forEach((w, idx) => {
          addLine({ type: 'output', text: `  [${3 - idx} -> ${idx}] ${w}`, highlight: true });
        });
        addLine({ type: 'success', text: 'Hazırlayan: Enes Öztürk' });
        returnToMenu();
      } else if (q === 4) {
        addLine({ type: 'input', text: '> 4' });
        addLine({ type: 'system', text: '\n--- [SORU 4] Toplam Kelime ve Harf Sayısı (Enes Öztürk) ---' });
        const sentence = 'C# 101 ödevini başarıyla tamamlayan Enes Öztürk yazılım geliştiriyor.';
        addLine({ type: 'prompt', text: `Lütfen bir cümle yazınız: "${sentence}"` });
        addLine({ type: 'success', text: '\n[Sonuç Analizi]' });
        addLine({ type: 'output', text: `Girilen Cümle        : "${sentence}"` });
        addLine({ type: 'output', text: 'Toplam Kelime Sayısı : 9', highlight: true });
        addLine({ type: 'output', text: 'Toplam Harf Sayısı   : 48 (Sadece harfler)', highlight: true });
        addLine({ type: 'output', text: 'Boşluksuz Karakter   : 61 (Rakam ve noktalamalar dahil)' });
        addLine({ type: 'success', text: 'Hazırlayan           : Enes Öztürk' });
        returnToMenu();
      }
    }, 150);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Quick Action Presets bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Hızlı Test Presetleri:
          </span>
          <button
            onClick={() => runPreset(1)}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors"
          >
            Soru 1 Testi (Çift Sayılar)
          </button>
          <button
            onClick={() => runPreset(2)}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors"
          >
            Soru 2 Testi (m'e Bölünenler)
          </button>
          <button
            onClick={() => runPreset(3)}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors"
          >
            Soru 3 Testi (Ters Kelimeler)
          </button>
          <button
            onClick={() => runPreset(4)}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors"
          >
            Soru 4 Testi (Kelime & Harf)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyConsole}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"
            title="Tüm konsol çıktısını kopyala"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Kopyalandı!' : 'Konsolu Kopyala'}</span>
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-rose-900/40 text-slate-300 hover:text-rose-200 rounded-md transition-colors"
            title="Konsolu temizle"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Temizle</span>
          </button>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-sm">
        {/* Terminal Title Bar */}
        <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-2 text-xs font-medium text-slate-400 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Tarayıcı Simülasyonu · Program.cs örneği
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="text-emerald-400 font-semibold">Örnek akış</span>
            <span className="text-slate-600">·</span>
            <span>Enes Öztürk</span>
          </div>
        </div>

        {/* Terminal Screen Content */}
        <div
          className="p-5 overflow-y-auto max-h-[520px] min-h-[420px] terminal-scroll flex flex-col space-y-1.5 leading-relaxed text-slate-300 bg-[#060a12]"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line) => {
            if (line.type === 'banner') {
              return (
                <div key={line.id} className="text-cyan-400 font-bold whitespace-pre">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'system') {
              return (
                <div key={line.id} className="text-yellow-300 font-semibold">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'prompt') {
              return (
                <div key={line.id} className="text-slate-300">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'input') {
              return (
                <div key={line.id} className="text-emerald-300 font-bold">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'output') {
              return (
                <div
                  key={line.id}
                  className={`pl-2 ${
                    line.highlight
                      ? 'text-cyan-300 bg-cyan-950/30 border-l-2 border-cyan-400 py-1'
                      : 'text-slate-200'
                  }`}
                >
                  {line.text}
                </div>
              );
            }
            if (line.type === 'success') {
              return (
                <div key={line.id} className="text-emerald-400 font-semibold">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'error') {
              return (
                <div key={line.id} className="text-rose-400 font-medium">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'divider') {
              return (
                <div key={line.id} className="text-slate-600 select-none">
                  {line.text}
                </div>
              );
            }
            return <div key={line.id}>{line.text}</div>;
          })}

          <div ref={terminalEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/90 border-t border-slate-800 px-4 py-3 flex items-center gap-3"
        >
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs select-none shrink-0">
            <span>Girdi</span>
            <span className="text-slate-500">&gt;</span>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              step.mode === 'menu'
                ? "Menü seçimi giriniz (örn: 1, 2, 3, 4 veya 5)..."
                : "Cevabınızı yazıp Enter'a basınız..."
            }
            className="flex-1 bg-transparent border-0 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-0 font-mono text-sm"
            autoFocus
          />

          <button
            type="submit"
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded text-xs transition-colors shrink-0"
          >
            <span>Gönder</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </form>
      </div>

      {/* Interactive Helper Hint */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-2">
        <div className="flex items-center gap-2">
          <Play className="w-3.5 h-3.5 text-cyan-400" />
          <span>
            İpucu: Yukarıdaki terminale sayı veya metin girip <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300 border border-slate-700">Enter</kbd> tuşuna basın veya hızlı butonları kullanın.
          </span>
        </div>
        <div className="text-slate-400">
          Hazırlayan: <span className="text-slate-200 font-medium">Enes Öztürk</span>
        </div>
      </div>
    </div>
  );
};
