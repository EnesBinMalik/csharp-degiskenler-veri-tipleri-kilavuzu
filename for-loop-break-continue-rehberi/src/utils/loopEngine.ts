import { ExecutionStep, LoopConfig, LoopPresetId } from '../types/loop';

export const PRESET_CONFIGS: Record<Exclude<LoopPresetId, 'custom'>, LoopConfig> = {
  basic: {
    startVal: 0,
    conditionOp: '<=',
    targetVal: 5,
    stepType: 'inc',
    hasBreak: false,
    breakVal: 7,
    hasContinue: false,
    continueCondition: 'even',
    continueVal: 2,
  },
  break: {
    startVal: 1,
    conditionOp: '<=',
    targetVal: 10,
    stepType: 'inc',
    hasBreak: true,
    breakVal: 7,
    hasContinue: false,
    continueCondition: 'even',
    continueVal: 2,
  },
  continue: {
    startVal: 1,
    conditionOp: '<=',
    targetVal: 10,
    stepType: 'inc',
    hasBreak: false,
    breakVal: 7,
    hasContinue: true,
    continueCondition: 'even',
    continueVal: 2,
  },
  infinite: {
    startVal: 1,
    conditionOp: '<=',
    targetVal: 9999, // Unbounded in concept
    stepType: 'inc',
    hasBreak: true,
    breakVal: 7,
    hasContinue: false,
    continueCondition: 'even',
    continueVal: 2,
  },
};

export function getCodeLinesForPreset(preset: LoopPresetId, config: LoopConfig): string[] {
  if (preset === 'basic') {
    return [
      `for (int i = ${config.startVal}; i ${config.conditionOp} ${config.targetVal}; i++)`,
      `{`,
      `    Console.WriteLine(i);`,
      `}`,
      `// Döngü tamamlandı, kod buradan devam eder.`
    ];
  }

  if (preset === 'break') {
    return [
      `for (int i = ${config.startVal}; i ${config.conditionOp} ${config.targetVal}; i++)`,
      `{`,
      `    if (i == ${config.breakVal})`,
      `        break; // Döngüden derhal çıkılır`,
      `    Console.WriteLine(i);`,
      `}`,
      `// Break sonrası akış buradan devam eder.`
    ];
  }

  if (preset === 'continue') {
    return [
      `for (int i = ${config.startVal}; i ${config.conditionOp} ${config.targetVal}; i++)`,
      `{`,
      `    if (i % 2 == 0)`,
      `        continue; // Çift sayılarda iterasyon atlanır`,
      `    Console.WriteLine(i);`,
      `}`,
      `// Döngü bittiğinde kod buradan devam eder.`
    ];
  }

  if (preset === 'infinite') {
    return [
      `for (int i = 1; ; i++) // Koşul boş: Sonsuz döngü`,
      `{`,
      `    // Console.ReadLine() simülasyonu`,
      `    if (i == 7)`,
      `        break; // 7 değerine ulaşıldığında döngü kırılır`,
      `    Console.WriteLine(i);`,
      `}`,
      `// Break çalıştı, sonsuz döngüden çıkıldı.`
    ];
  }

  // Custom
  const condStr = `i ${config.conditionOp} ${config.targetVal}`;
  const stepStr = config.stepType === 'inc' ? 'i++' : config.stepType === 'dec' ? 'i--' : 'i += 2';

  const lines = [
    `for (int i = ${config.startVal}; ${condStr}; ${stepStr})`,
    `{`,
  ];

  if (config.hasBreak) {
    lines.push(`    if (i == ${config.breakVal})`);
    lines.push(`        break;`);
  }

  if (config.hasContinue) {
    const contStr = config.continueCondition === 'even' ? 'i % 2 == 0' : config.continueCondition === 'odd' ? 'i % 2 != 0' : `i == ${config.continueVal}`;
    lines.push(`    if (${contStr})`);
    lines.push(`        continue;`);
  }

  lines.push(`    Console.WriteLine(i);`);
  lines.push(`}`);
  lines.push(`// Döngü sonu.`);
  return lines;
}

export function generateExecutionSteps(preset: LoopPresetId, config: LoopConfig): ExecutionStep[] {
  const steps: ExecutionStep[] = [];
  const logs: string[] = [];

  let i = config.startVal;
  let iteration = 0;
  const maxIterations = 25; // Guard against runaways
  const breakConditionLine = preset === 'infinite' ? 4 : 3;
  const breakStatementLine = breakConditionLine + 1;
  const continueConditionLine = preset === 'custom' && config.hasBreak ? 5 : 3;
  const continueStatementLine = continueConditionLine + 1;
  const printLine = preset === 'basic'
    ? 3
    : preset === 'infinite'
    ? 6
    : preset === 'custom'
    ? 3 + (config.hasBreak ? 2 : 0) + (config.hasContinue ? 2 : 0)
    : 5;
  const completionLine = getCodeLinesForPreset(preset, config).length;

  const checkCondition = (val: number): boolean => {
    if (preset === 'infinite') return true;
    switch (config.conditionOp) {
      case '<=': return val <= config.targetVal;
      case '<': return val < config.targetVal;
      case '>=': return val >= config.targetVal;
      case '>': return val > config.targetVal;
      default: return val <= config.targetVal;
    }
  };

  const shouldBreak = (val: number): boolean => {
    if (preset === 'break' || preset === 'infinite') return val === config.breakVal;
    if (config.hasBreak) return val === config.breakVal;
    return false;
  };

  const shouldContinue = (val: number): boolean => {
    if (preset === 'continue') return val % 2 === 0;
    if (config.hasContinue) {
      if (config.continueCondition === 'even') return val % 2 === 0;
      if (config.continueCondition === 'odd') return val % 2 !== 0;
      return val === config.continueVal;
    }
    return false;
  };

  const getNextVal = (val: number): number => {
    if (config.stepType === 'dec') return val - 1;
    if (config.stepType === 'inc2') return val + 2;
    return val + 1;
  };

  // STEP 0: Init
  steps.push({
    stepIndex: steps.length,
    iteration: 0,
    stage: 'init',
    stageLabel: 'ifade1: Başlatma',
    variableI: i,
    conditionMet: true,
    codeLineNumber: 1,
    explanation: `Simülasyon başlangıç değerini ${i} olarak ayarladı. C# for döngüsünde başlatma bölümü döngü başlamadan önce bir kez çalışır.`,
    outputLog: [...logs],
  });

  while (iteration < maxIterations) {
    iteration++;

    // Condition step
    const condPassed = checkCondition(i);
    const condText = preset === 'infinite'
      ? `Koşul boş bırakıldı (for(;;)), bu nedenle koşul DAİMA doğru (true) kabul edilir.`
      : `Koşul kontrolü: '${i} ${config.conditionOp} ${config.targetVal}' -> ${condPassed ? 'DOĞRU (True)' : 'YANLIŞ (False)'}`;

    steps.push({
      stepIndex: steps.length,
      iteration,
      stage: 'condition',
      stageLabel: 'koşul: Şart Kontrolü',
      variableI: i,
      conditionMet: condPassed,
      codeLineNumber: 1,
      explanation: condPassed
        ? `${condText}. Koşul sağlandığı için döngü gövdesine giriliyor.`
        : `${condText}. Koşul sağlanmadığı için döngü sona eriyor.`,
      outputLog: [...logs],
    });

    if (!condPassed) {
      break;
    }

    // Break check
    if (shouldBreak(i)) {
      steps.push({
        stepIndex: steps.length,
        iteration,
        stage: 'break_check',
        stageLabel: 'Break Kontrolü',
        variableI: i,
        conditionMet: true,
        codeLineNumber: breakConditionLine,
        explanation: `Gövde içi kontrol: 'i == ${config.breakVal}' şartı sağlandı (${i} == ${config.breakVal}). 'break' komutuna giriliyor.`,
        outputLog: [...logs],
      });

      steps.push({
        stepIndex: steps.length,
        iteration,
        stage: 'break_triggered',
        stageLabel: 'Döngü Kırıldı (Break)',
        variableI: i,
        conditionMet: true,
        codeLineNumber: breakStatementLine,
        explanation: `'break' çalıştı! Döngü anında sonlandırıldı. Sayacın artması veya sonraki iterasyonlar BEKLENMEZ, döngü blokundan hemen çıkılır.`,
        outputLog: [...logs],
        isBreak: true,
      });

      break; // Exit while loop immediately
    }

    // Continue check
    if (shouldContinue(i)) {
      steps.push({
        stepIndex: steps.length,
        iteration,
        stage: 'continue_check',
        stageLabel: 'Continue Kontrolü',
        variableI: i,
        conditionMet: true,
        codeLineNumber: continueConditionLine,
        explanation: preset === 'continue'
          ? `Gövde içi kontrol: 'i % 2 == 0' şartı sağlandı (${i} bir çift sayıdır). 'continue' komutuna giriliyor.`
          : `Gövde içi kontrol: continue koşulu sağlandı.`,
        outputLog: [...logs],
      });

      steps.push({
        stepIndex: steps.length,
        iteration,
        stage: 'continue_triggered',
        stageLabel: 'İterasyon Atlandı (Continue)',
        variableI: i,
        conditionMet: true,
        codeLineNumber: continueStatementLine,
        explanation: `'continue' çalıştı! Bu iterasyonun kalan komutları (Console.WriteLine) ÇALIŞTIRILMADI ve ATLANDI. Doğrudan sayaç güncellemesine (ifade2) geçiliyor.`,
        outputLog: [...logs],
        isContinue: true,
      });

      // Update step after continue
      const nextI = getNextVal(i);
      steps.push({
        stepIndex: steps.length,
        iteration,
        stage: 'update',
        stageLabel: 'ifade2: Sayaç Güncelleme',
        variableI: nextI,
        conditionMet: true,
        codeLineNumber: 1,
        explanation: `ifade2 çalıştı: Sayaç güncellendi (${config.stepType === 'inc' ? 'i++' : config.stepType === 'dec' ? 'i--' : 'i += 2'}). Değişken değeri: ${i} -> ${nextI}.`,
        outputLog: [...logs],
      });

      i = nextI;
      continue;
    }

    // Regular Print
    logs.push(preset === 'infinite' ? `İşleniyor: ${i}` : `${i}`);
    steps.push({
      stepIndex: steps.length,
      iteration,
      stage: 'body_print',
      stageLabel: 'Gövde: Console.WriteLine',
      variableI: i,
      conditionMet: true,
      codeLineNumber: printLine,
      explanation: `'Console.WriteLine(${preset === 'infinite' ? `"İşleniyor: ${i}"` : i});' çalıştı. Konsol çıktısına '${logs[logs.length - 1]}' değeri eklendi.`,
      outputLog: [...logs],
    });

    // Update step
    const nextI = getNextVal(i);
    steps.push({
      stepIndex: steps.length,
      iteration,
      stage: 'update',
      stageLabel: 'ifade2: Sayaç Güncelleme',
      variableI: nextI,
      conditionMet: true,
      codeLineNumber: 1,
      explanation: `ifade2 çalıştı: İterasyon sonu sayaç güncellendi (${config.stepType === 'inc' ? 'i++' : config.stepType === 'dec' ? 'i--' : 'i += 2'}). Değişken değeri: ${i} -> ${nextI}. Şimdi koşul tekrar test edilecek.`,
      outputLog: [...logs],
    });

    i = nextI;
  }

  const limitReached = iteration >= maxIterations && checkCondition(i) && !shouldBreak(i);
  const lastStep = steps[steps.length - 1];
  steps.push({
    stepIndex: steps.length,
    iteration: lastStep ? lastStep.iteration : 0,
    stage: limitReached ? 'limit_reached' : 'finished',
    stageLabel: limitReached ? 'Simülasyon Sınırına Ulaşıldı' : 'Döngü Sona Erdi',
    variableI: i,
    conditionMet: limitReached,
    codeLineNumber: limitReached ? 1 : completionLine,
    explanation: limitReached
      ? `Güvenlik amacıyla gösterim ${maxIterations} iterasyonla sınırlandı. Bu, C# döngüsünün tamamlandığı anlamına gelmez; mevcut koşul true olduğu için gerçek kod devam ederdi. Şimdi koşul sonucu i = ${i} için simüle edilebilir.`
      : `Döngü blokundan çıkıldı. Program akışı döngü sonrasındaki kod satırlarından çalışmaya devam ediyor. Toplam üretilen çıktı satırı sayısı: ${logs.length}.`,
    outputLog: [...logs],
  });

  return steps;
}
