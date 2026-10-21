import { RecursionStep, StackFrame, TreeNode, RecursionAlgorithm } from '../types';

export const ALGORITHM_CODES: Record<RecursionAlgorithm, string[]> = {
  fibonacci: [
    'static int FibonacciSerisi(int sayi)',
    '{',
    '    if (sayi == 0)',
    '        return 0;',
    '    else if (sayi == 1)',
    '        return 1;',
    '    else',
    '        return FibonacciSerisi(sayi - 1) + FibonacciSerisi(sayi - 2);',
    '}'
  ],
  factorial: [
    'static int Faktoryel(int sayi)',
    '{',
    '    if (sayi <= 1)',
    '        return 1;',
    '    else',
    '        return sayi * Faktoryel(sayi - 1);',
    '}'
  ],
  power: [
    'static int UsAl(int taban, int us)',
    '{',
    '    if (us == 0)',
    '        return 1;',
    '    else',
    '        return taban * UsAl(taban, us - 1);',
    '}'
  ],
  reverse: [
    'static string MetniTersCevir(string metin)',
    '{',
    '    if (string.IsNullOrEmpty(metin) || metin.Length <= 1)',
    '        return metin;',
    '    else',
    '        return MetniTersCevir(metin.Substring(1)) + metin[0];',
    '}'
  ],
  overflow_demo: [
    '// DİKKAT: Taban koşulu (Base condition) unutulmuş hatalı rekürsiyon!',
    'static int SonsuzDongu(int sayi)',
    '{',
    '    // if (sayi == 0) return 0; // Unutuldu!',
    '    return sayi + SonsuzDongu(sayi - 1); // Sürekli yığına eklenir!',
    '}'
  ]
};

// Generates steps for Fibonacci
export function generateFibonacciSteps(n: number): RecursionStep[] {
  const steps: RecursionStep[] = [];
  const treeNodes: TreeNode[] = [];
  let currentStack: StackFrame[] = [];
  let callCounter = 0;

  function recordStep(desc: string, line: number, highlightVar?: { name: string; value: string | number }, isComplete?: boolean) {
    steps.push({
      stepIndex: steps.length,
      description: desc,
      stack: JSON.parse(JSON.stringify(currentStack)),
      treeNodes: JSON.parse(JSON.stringify(treeNodes)),
      activeLine: line,
      highlightVar,
      isComplete
    });
  }

  function fib(num: number, parentId?: string, branchLabel?: string): number {
    callCounter++;
    const frameId = `fib_${callCounter}_${num}`;
    const nodeLabel = `Fib(${num})`;

    const node: TreeNode = {
      id: frameId,
      label: nodeLabel,
      depth: currentStack.length,
      parentId,
      status: 'active'
    };
    treeNodes.push(node);

    const frame: StackFrame = {
      id: frameId,
      functionName: 'FibonacciSerisi',
      params: { sayi: num },
      callDescription: `FibonacciSerisi(${num})`,
      depth: currentStack.length,
      state: 'calling',
      activeLine: 1,
      explanation: `Stack'e yeni çağrı çerçevesi (frame) eklendi: FibonacciSerisi(${num})`
    };
    currentStack.push(frame);

    recordStep(`Stack'e '${frame.callDescription}' çağrısı itildi (Push).`, 1, { name: 'sayi', value: num });

    // Line 3: Check base case 0
    frame.activeLine = 3;
    recordStep(`Taban koşulu kontrol ediliyor: sayi == 0 ? (${num} == 0 -> ${num === 0})`, 3);

    if (num === 0) {
      frame.activeLine = 4;
      frame.returnValue = 0;
      frame.state = 'returning';
      node.result = 0;
      node.status = 'resolved';
      recordStep(`Taban koşulu sağlandı (sayi == 0). Değer olarak 0 döndürülüyor.`, 4, { name: 'Dönen Değer', value: 0 });
      currentStack.pop();
      recordStep(`Stack'ten '${frame.callDescription}' frame'i atıldı (Pop). Sonuç: 0`, 4);
      return 0;
    }

    // Line 5: Check base case 1
    frame.activeLine = 5;
    recordStep(`Taban koşulu kontrol ediliyor: sayi == 1 ? (${num} == 1 -> ${num === 1})`, 5);

    if (num === 1) {
      frame.activeLine = 6;
      frame.returnValue = 1;
      frame.state = 'returning';
      node.result = 1;
      node.status = 'resolved';
      recordStep(`Taban koşulu sağlandı (sayi == 1). Değer olarak 1 döndürülüyor.`, 6, { name: 'Dönen Değer', value: 1 });
      currentStack.pop();
      recordStep(`Stack'ten '${frame.callDescription}' frame'i atıldı (Pop). Sonuç: 1`, 6);
      return 1;
    }

    // Line 8: Recursive step
    frame.activeLine = 8;
    frame.state = 'waiting';
    node.status = 'waiting';
    recordStep(`Taban koşulu sağlanmadı. FibonacciSerisi(${num - 1}) çağrılıyor...`, 8);

    const left = fib(num - 1, frameId, 'Sol');

    frame.activeLine = 8;
    recordStep(`FibonacciSerisi(${num - 1}) sonucu ${left} olarak döndü. Şimdi sağ kol FibonacciSerisi(${num - 2}) çağrılıyor...`, 8);

    const right = fib(num - 2, frameId, 'Sağ');

    const result = left + right;
    frame.activeLine = 8;
    frame.returnValue = result;
    frame.state = 'returning';
    node.result = result;
    node.status = 'resolved';
    recordStep(`Toplama yapıldı: Fib(${num - 1}) + Fib(${num - 2}) = ${left} + ${right} = ${result}. Geriye dönülüyor.`, 8, { name: 'Sonuç', value: result });

    currentStack.pop();
    recordStep(`Stack'ten '${frame.callDescription}' frame'i atıldı (Pop). Sonuç: ${result}`, 8);
    return result;
  }

  const finalResult = fib(n);
  steps.push({
    stepIndex: steps.length,
    description: `Hesaplama tamamlandı! FibonacciSerisi(${n}) = ${finalResult}. Yığın (Stack) tamamen temizlendi.`,
    stack: [],
    treeNodes: JSON.parse(JSON.stringify(treeNodes)),
    activeLine: 8,
    highlightVar: { name: 'Nihai Sonuç', value: finalResult },
    isComplete: true
  });

  return steps;
}

// Generates steps for Factorial
export function generateFactorialSteps(n: number): RecursionStep[] {
  const steps: RecursionStep[] = [];
  const treeNodes: TreeNode[] = [];
  let currentStack: StackFrame[] = [];
  let callCounter = 0;

  function recordStep(desc: string, line: number, highlightVar?: { name: string; value: string | number }, isComplete?: boolean) {
    steps.push({
      stepIndex: steps.length,
      description: desc,
      stack: JSON.parse(JSON.stringify(currentStack)),
      treeNodes: JSON.parse(JSON.stringify(treeNodes)),
      activeLine: line,
      highlightVar,
      isComplete
    });
  }

  function fact(num: number, parentId?: string): number {
    callCounter++;
    const frameId = `fact_${callCounter}_${num}`;
    const node: TreeNode = {
      id: frameId,
      label: `Fakt(${num})`,
      depth: currentStack.length,
      parentId,
      status: 'active'
    };
    treeNodes.push(node);

    const frame: StackFrame = {
      id: frameId,
      functionName: 'Faktoryel',
      params: { sayi: num },
      callDescription: `Faktoryel(${num})`,
      depth: currentStack.length,
      state: 'calling',
      activeLine: 1,
      explanation: `Stack'e 'Faktoryel(${num})' çerçevesi eklendi.`
    };
    currentStack.push(frame);
    recordStep(`Stack'e '${frame.callDescription}' çağrısı itildi (Push).`, 1, { name: 'sayi', value: num });

    // Check base
    frame.activeLine = 3;
    recordStep(`Taban koşulu kontrol ediliyor: sayi <= 1 ? (${num} <= 1 -> ${num <= 1})`, 3);

    if (num <= 1) {
      frame.activeLine = 4;
      frame.returnValue = 1;
      node.result = 1;
      node.status = 'resolved';
      recordStep(`Taban koşuluna ulaşıldı (sayi <= 1). 1 değeri dönülüyor.`, 4, { name: 'Dönen Değer', value: 1 });
      currentStack.pop();
      recordStep(`Stack'ten '${frame.callDescription}' atıldı (Pop). Sonuç: 1`, 4);
      return 1;
    }

    frame.activeLine = 6;
    frame.state = 'waiting';
    node.status = 'waiting';
    recordStep(`Taban sağlanmadı. ${num} * Faktoryel(${num - 1}) hesaplanacak. Önce Faktoryel(${num - 1}) çağrılıyor...`, 6);

    const sub = fact(num - 1, frameId);
    const result = num * sub;

    frame.activeLine = 6;
    frame.returnValue = result;
    node.result = result;
    node.status = 'resolved';
    recordStep(`Çarpma yapıldı: ${num} * ${sub} = ${result}. Değer dönülüyor.`, 6, { name: 'Sonuç', value: result });

    currentStack.pop();
    recordStep(`Stack'ten '${frame.callDescription}' atıldı (Pop). Sonuç: ${result}`, 6);
    return result;
  }

  const finalResult = fact(n);
  steps.push({
    stepIndex: steps.length,
    description: `Faktöriyel hesaplaması tamamlandı! Faktoryel(${n}) = ${finalResult}.`,
    stack: [],
    treeNodes: JSON.parse(JSON.stringify(treeNodes)),
    activeLine: 6,
    highlightVar: { name: 'Nihai Sonuç', value: finalResult },
    isComplete: true
  });

  return steps;
}

// Generates steps for Power (UsAl)
export function generatePowerSteps(base: number, exp: number): RecursionStep[] {
  const steps: RecursionStep[] = [];
  const treeNodes: TreeNode[] = [];
  let currentStack: StackFrame[] = [];
  let callCounter = 0;

  function recordStep(desc: string, line: number, highlightVar?: { name: string; value: string | number }, isComplete?: boolean) {
    steps.push({
      stepIndex: steps.length,
      description: desc,
      stack: JSON.parse(JSON.stringify(currentStack)),
      treeNodes: JSON.parse(JSON.stringify(treeNodes)),
      activeLine: line,
      highlightVar,
      isComplete
    });
  }

  function power(b: number, e: number, parentId?: string): number {
    callCounter++;
    const frameId = `pow_${callCounter}_${e}`;
    const node: TreeNode = {
      id: frameId,
      label: `UsAl(${b}, ${e})`,
      depth: currentStack.length,
      parentId,
      status: 'active'
    };
    treeNodes.push(node);

    const frame: StackFrame = {
      id: frameId,
      functionName: 'UsAl',
      params: { taban: b, us: e },
      callDescription: `UsAl(${b}, ${e})`,
      depth: currentStack.length,
      state: 'calling',
      activeLine: 1,
      explanation: `Stack'e 'UsAl(${b}, ${e})' çerçevesi eklendi.`
    };
    currentStack.push(frame);
    recordStep(`Stack'e '${frame.callDescription}' çağrısı itildi (Push).`, 1);

    frame.activeLine = 3;
    recordStep(`Taban koşulu kontrol ediliyor: us == 0 ? (${e} == 0 -> ${e === 0})`, 3);

    if (e === 0) {
      frame.activeLine = 4;
      frame.returnValue = 1;
      node.result = 1;
      node.status = 'resolved';
      recordStep(`Her sayının 0. kuvveti 1'dir. Değer olarak 1 dönülüyor.`, 4, { name: 'Dönen Değer', value: 1 });
      currentStack.pop();
      recordStep(`Stack'ten '${frame.callDescription}' atıldı (Pop). Sonuç: 1`, 4);
      return 1;
    }

    frame.activeLine = 6;
    frame.state = 'waiting';
    node.status = 'waiting';
    recordStep(`Taban durumu değil. ${b} * UsAl(${b}, ${e - 1}) hesaplanacak. UsAl(${b}, ${e - 1}) çağrılıyor...`, 6);

    const sub = power(b, e - 1, frameId);
    const result = b * sub;

    frame.activeLine = 6;
    frame.returnValue = result;
    node.result = result;
    node.status = 'resolved';
    recordStep(`Hesaplama: ${b} * ${sub} = ${result}. Geriye dönülüyor.`, 6, { name: 'Sonuç', value: result });

    currentStack.pop();
    recordStep(`Stack'ten '${frame.callDescription}' atıldı (Pop). Sonuç: ${result}`, 6);
    return result;
  }

  const finalResult = power(base, exp);
  steps.push({
    stepIndex: steps.length,
    description: `Üs alma tamamlandı! UsAl(${base}, ${exp}) = ${finalResult}.`,
    stack: [],
    treeNodes: JSON.parse(JSON.stringify(treeNodes)),
    activeLine: 6,
    highlightVar: { name: 'Nihai Sonuç', value: finalResult },
    isComplete: true
  });

  return steps;
}

// Generates steps for String Reverse
export function generateReverseSteps(text: string): RecursionStep[] {
  const steps: RecursionStep[] = [];
  const treeNodes: TreeNode[] = [];
  let currentStack: StackFrame[] = [];
  let callCounter = 0;

  function recordStep(desc: string, line: number, highlightVar?: { name: string; value: string | number }, isComplete?: boolean) {
    steps.push({
      stepIndex: steps.length,
      description: desc,
      stack: JSON.parse(JSON.stringify(currentStack)),
      treeNodes: JSON.parse(JSON.stringify(treeNodes)),
      activeLine: line,
      highlightVar,
      isComplete
    });
  }

  function rev(str: string, parentId?: string): string {
    callCounter++;
    const frameId = `rev_${callCounter}`;
    const node: TreeNode = {
      id: frameId,
      label: `Ters("${str}")`,
      depth: currentStack.length,
      parentId,
      status: 'active'
    };
    treeNodes.push(node);

    const frame: StackFrame = {
      id: frameId,
      functionName: 'MetniTersCevir',
      params: { metin: `"${str}"` },
      callDescription: `MetniTersCevir("${str}")`,
      depth: currentStack.length,
      state: 'calling',
      activeLine: 1,
      explanation: `Metin: "${str}" için yığına çerçeve eklendi.`
    };
    currentStack.push(frame);
    recordStep(`Stack'e '${frame.callDescription}' çağrısı itildi (Push).`, 1);

    frame.activeLine = 3;
    recordStep(`Taban koşulu kontrol ediliyor: metin.Length <= 1 ? (${str.length} <= 1)`, 3);

    if (str.length <= 1) {
      frame.activeLine = 4;
      frame.returnValue = `"${str}"`;
      node.result = str;
      node.status = 'resolved';
      recordStep(`Tek harf veya boş metin! Aynen geri döndürülüyor: "${str}"`, 4, { name: 'Dönen Metin', value: str });
      currentStack.pop();
      recordStep(`Stack'ten '${frame.callDescription}' atıldı (Pop).`, 4);
      return str;
    }

    const rest = str.substring(1);
    const firstChar = str[0];

    frame.activeLine = 6;
    frame.state = 'waiting';
    node.status = 'waiting';
    recordStep(`Kalan kısım: MetniTersCevir("${rest}") çağrılıyor. İlk harf '${firstChar}' sonuca eklenecek.`, 6);

    const sub = rev(rest, frameId);
    const result = sub + firstChar;

    frame.activeLine = 6;
    frame.returnValue = `"${result}"`;
    node.result = result;
    node.status = 'resolved';
    recordStep(`Metin birleştirildi: "${sub}" + '${firstChar}' = "${result}".`, 6, { name: 'Sonuç', value: result });

    currentStack.pop();
    recordStep(`Stack'ten '${frame.callDescription}' atıldı (Pop).`, 6);
    return result;
  }

  const finalResult = rev(text);
  steps.push({
    stepIndex: steps.length,
    description: `Metin ters çevrildi! Sonuç: "${finalResult}". Yığın temizlendi.`,
    stack: [],
    treeNodes: JSON.parse(JSON.stringify(treeNodes)),
    activeLine: 6,
    highlightVar: { name: 'Nihai Metin', value: finalResult },
    isComplete: true
  });

  return steps;
}

// Generates a bounded visual model of an ever-deepening call chain.
export function generateOverflowSteps(): RecursionStep[] {
  const steps: RecursionStep[] = [];
  const treeNodes: TreeNode[] = [];
  const currentStack: StackFrame[] = [];
  const MAX_DEMO_FRAMES = 8; // Visual representation of reaching limit

  for (let i = 0; i < MAX_DEMO_FRAMES; i++) {
    const num = 100 - i;
    const frameId = `overflow_${i}`;
    const node: TreeNode = {
      id: frameId,
      label: `Sonsuz(${num})`,
      depth: i,
      parentId: i > 0 ? `overflow_${i - 1}` : undefined,
      status: i === MAX_DEMO_FRAMES - 1 ? 'error' : 'waiting'
    };
    treeNodes.push(node);

    const frame: StackFrame = {
      id: frameId,
      functionName: 'SonsuzDongu',
      params: { sayi: num },
      callDescription: `SonsuzDongu(${num})`,
      depth: i,
      state: i === MAX_DEMO_FRAMES - 1 ? 'calling' : 'waiting',
      activeLine: 5,
      explanation: `Görsel çağrı derinliği: ${i + 1}. Bu örnek sınırlı bir tarayıcı gösterimidir; C# kodu çalıştırılmaz.`
    };
    currentStack.push(frame);

    steps.push({
      stepIndex: steps.length,
      description: `Taban koşulu bulunmayan örnekte çağrı zinciri derinleşiyor (gösterim adımı: ${i + 1}). Bu, gerçek CLR yığın kullanımını ölçmez.`,
      stack: JSON.parse(JSON.stringify(currentStack)),
      treeNodes: JSON.parse(JSON.stringify(treeNodes)),
      activeLine: 5,
      highlightVar: { name: 'Yığın Derinliği (Frames)', value: i + 1 }
    });
  }

  // Mark the end of this bounded illustration, not a real runtime failure.
  steps.push({
    stepIndex: steps.length,
    description: 'Görsel gösterim sınırına ulaşıldı. Uygulama C# kodu veya CLR çalıştırmadı; gerçek bir StackOverflowException oluşmadı.',
    stack: JSON.parse(JSON.stringify(currentStack)),
    treeNodes: JSON.parse(JSON.stringify(treeNodes)),
    activeLine: 5,
    highlightVar: { name: 'Gösterim', value: 'Sınırlı kavramsal simülasyon' },
    isComplete: true,
    isOverflow: true
  });

  return steps;
}
