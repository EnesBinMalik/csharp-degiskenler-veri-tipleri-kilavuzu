/**
 * C# Tip Dönüşümü Simülasyon Motoru
 * Hazırlayan: Enes Öztürk
 */

import { DataType, TYPE_DETAILS, IMPLICIT_CONVERSIONS, ConversionMethod } from '../types/conversion';

export interface BitAnalysis {
  sourceBitsFormatted: string;
  targetBitsFormatted: string;
  sourceTotalBits: number;
  targetTotalBits: number;
  preservedBits: string;
  lostBits: string;
  hasTruncation: boolean;
}

export interface SimulationResult {
  success: boolean;
  isImplicitAllowed: boolean;
  recommendedMethod: ConversionMethod;
  convertedValueDisplay: string;
  rawTargetValue: string;
  exceptionName?: string;
  errorMessage?: string;
  warningMessage?: string;
  explanation: string;
  csharpCode: string;
  bitAnalysis?: BitAnalysis;
  memoryNote: string;
}

/**
 * Format a number into binary representation with given bit width
 */
export function toBinaryString(val: number, bits: number): string {
  // normalize integer value for bit display
  let bigVal = BigInt(Math.floor(val));
  if (bigVal < 0n) {
    // 2's complement for negative
    const mask = (1n << BigInt(bits)) - 1n;
    bigVal = (bigVal & mask);
  }
  let str = bigVal.toString(2);
  if (str.length > bits) {
    str = str.slice(-bits);
  } else {
    str = str.padStart(bits, '0');
  }

  // chunk into groups of 8 (or 4)
  const chunks: string[] = [];
  for (let i = 0; i < str.length; i += 8) {
    chunks.push(str.slice(i, i + 8));
  }
  return chunks.join(' ');
}

export function simulateConversion(
  sourceType: DataType,
  targetType: DataType,
  inputValue: string,
  method: ConversionMethod,
  checkedMode = false
): SimulationResult {
  const srcMeta = TYPE_DETAILS[sourceType];
  const trgMeta = TYPE_DETAILS[targetType];
  const isImplicit = IMPLICIT_CONVERSIONS[sourceType]?.includes(targetType) || false;

  const trimmed = inputValue.trim();

  // Special Case: Null check
  const isNull = trimmed.toLowerCase() === 'null';

  // Helper for generating code snippets
  const getCsharpCodeSnippet = (
    resultVal: string,
    isErr = false,
    errType?: string
  ): string => {
    const varName = 'sourceVal';
    const targetVar = 'result';

    let code = `// Hazırlayan: Enes Öztürk\n`;

    if (sourceType === 'string' && isNull) {
      code += `string ${varName} = null;\n`;
    } else if (sourceType === 'string') {
      code += `string ${varName} = "${trimmed}";\n`;
    } else if (sourceType === 'char') {
      code += `char ${varName} = '${trimmed.length > 0 ? trimmed[0] : 'A'}';\n`;
    } else if (sourceType === 'float') {
      code += `float ${varName} = ${trimmed}f;\n`;
    } else if (sourceType === 'decimal') {
      code += `decimal ${varName} = ${trimmed}m;\n`;
    } else {
      code += `${srcMeta.name} ${varName} = ${trimmed};\n`;
    }

    if (method === 'implicit') {
      code += `${trgMeta.name} ${targetVar} = ${varName}; // Bilinçsiz (Implicit) Dönüşüm\n`;
      code += `Console.WriteLine(${targetVar}); // Çıktı: ${resultVal}`;
    } else if (method === 'explicit_cast') {
      if (checkedMode) {
        code += `checked\n{\n    ${trgMeta.name} ${targetVar} = (${trgMeta.name})${varName}; // Checked mod: Taşmada hata fırlatır\n    Console.WriteLine(${targetVar});\n}`;
        if (isErr) code += `\n// !!! ${errType} fırlatıldı!`;
      } else {
        code += `${trgMeta.name} ${targetVar} = (${trgMeta.name})${varName}; // Bilinçli (Explicit Cast) Dönüşüm\n`;
        code += `Console.WriteLine(${targetVar}); // Çıktı: ${resultVal}`;
      }
    } else if (method === 'convert_class') {
      const convertMethodMap: Record<DataType, string> = {
        byte: 'ToByte',
        sbyte: 'ToSByte',
        short: 'ToInt16',
        ushort: 'ToUInt16',
        int: 'ToInt32',
        uint: 'ToUInt32',
        long: 'ToInt64',
        ulong: 'ToUInt64',
        float: 'ToSingle',
        double: 'ToDouble',
        decimal: 'ToDecimal',
        char: 'ToChar',
        bool: 'ToBoolean',
        string: 'ToString',
        object: 'ToString',
      };
      const methodName = convertMethodMap[targetType] || 'ToString';
      code += `${trgMeta.name} ${targetVar} = Convert.${methodName}(${varName});\n`;
      code += `Console.WriteLine(${targetVar}); // Çıktı: ${resultVal}`;
    } else if (method === 'parse') {
      const parseClassMap: Record<DataType, string> = {
        byte: 'byte',
        sbyte: 'sbyte',
        short: 'short',
        ushort: 'ushort',
        int: 'int',
        uint: 'uint',
        long: 'long',
        ulong: 'ulong',
        float: 'float',
        double: 'double',
        decimal: 'decimal',
        char: 'char',
        bool: 'bool',
        string: 'string',
        object: 'object',
      };
      const pClass = parseClassMap[targetType] || 'int';
      code += `${trgMeta.name} ${targetVar} = ${pClass}.Parse(${varName});\n`;
      code += `Console.WriteLine(${targetVar}); // Çıktı: ${resultVal}`;
    } else if (method === 'try_parse') {
      const pClass = targetType;
      code += `bool isSuccess = ${pClass}.TryParse(${varName}, out ${trgMeta.name} ${targetVar});\n`;
      code += `if (isSuccess)\n{\n    Console.WriteLine($"Başarılı: {${targetVar}}");\n}\nelse\n{\n    Console.WriteLine("Dönüşüm başarısız, varsayılan 0 değeri atandı.");\n}`;
    } else if (method === 'to_string') {
      code += `string ${targetVar} = ${varName}.ToString();\n`;
      code += `Console.WriteLine(${targetVar}); // Çıktı: "${resultVal}"`;
    } else if (method === 'boxing_unboxing') {
      code += `// 1. Boxing: Değer türü object olarak kullanılır\n`;
      code += `object boxedObj = ${varName};\n`;
      code += `// 2. Unboxing: Kutulanmış değer özgün değer türüne dönüştürülür\n`;
      code += `${trgMeta.name} ${targetVar} = (${trgMeta.name})boxedObj;\n`;
      code += `Console.WriteLine(${targetVar}); // Çıktı: ${resultVal}`;
    }

    return code;
  };

  // 1. NULL Handling
  if (isNull) {
    if (method === 'convert_class') {
      // Convert.ToInt32(null) gives 0! Convert.ToBoolean(null) gives false!
      const defaultVal = targetType === 'bool' ? 'false' : targetType === 'string' ? '""' : '0';
      return {
        success: true,
        isImplicitAllowed: false,
        recommendedMethod: 'convert_class',
        convertedValueDisplay: defaultVal,
        rawTargetValue: defaultVal,
        explanation: `Convert sınıfının bu çağrısında null girdi için ${defaultVal} sonucu döner.`,
        csharpCode: getCsharpCodeSnippet(defaultVal),
        memoryNote: `Simülasyon sonucu: ${defaultVal}. Bu araç çalışma zamanı belleğini ölçmez.`,
      };
    } else if (method === 'parse') {
      return {
        success: false,
        isImplicitAllowed: false,
        recommendedMethod: 'try_parse',
        convertedValueDisplay: 'HATA (ArgumentNullException)',
        rawTargetValue: 'null',
        exceptionName: 'System.ArgumentNullException',
        errorMessage: 'Değer null olamaz. (Value cannot be null. Parameter name: s)',
        explanation: `${targetType}.Parse(null) yöntemi null argüman verildiğinde 'ArgumentNullException' fırlatır! Güvenli dönüşüm için Convert sınıfı veya TryParse tercih edilmelidir.`,
        csharpCode: getCsharpCodeSnippet('HATA', true, 'ArgumentNullException'),
        memoryNote: 'Null argüman Parse çağrısında ArgumentNullException oluşturur.',
      };
    } else if (method === 'try_parse') {
      return {
        success: true,
        isImplicitAllowed: false,
        recommendedMethod: 'try_parse',
        convertedValueDisplay: 'false (sonuç: 0)',
        rawTargetValue: '0',
        explanation: `${targetType}.TryParse null aldığında hata fırlatmaz; doğrudan 'false' döner ve out parametresine varsayılan 0 değerini atar.`,
        csharpCode: getCsharpCodeSnippet('false (out 0)'),
        memoryNote: 'TryParse başarısız girdi için false ve varsayılan out değeri döndürür.',
      };
    }
  }

  // 2. String to Numeric Conversions
  if (sourceType === 'string') {
    if (method === 'implicit') {
      return {
        success: false,
        isImplicitAllowed: false,
        recommendedMethod: 'parse',
        convertedValueDisplay: 'Derleme Hatası (CS0029)',
        rawTargetValue: '',
        errorMessage: `Cannot implicitly convert type 'string' to '${targetType}'`,
        explanation: `Metin değerleri sayısal türlere doğrudan örtük atanamaz. Dönüşüm için uygun Parse, TryParse veya Convert yöntemini kullanın.`,
        csharpCode: `// DERLEME HATASI:\nstring s = "${trimmed}";\n${targetType} x = s; // CS0029: Cannot implicitly convert type 'string' to '${targetType}'`,
        memoryNote: 'Tür sınıflandırması tek başına değişkenin fiziksel bellek konumunu belirtmez.',
      };
    }

    if (method === 'try_parse') {
      const num = Number(trimmed);
      const isIntegerTarget = ['byte', 'sbyte', 'short', 'ushort', 'int', 'uint', 'long', 'ulong', 'char'].includes(targetType);
      const isNum = Number.isFinite(num) && trimmed !== '' && (!isIntegerTarget || Number.isInteger(num));
      const inRange = isNum && checkRange(num, targetType);

      if (isNum && inRange) {
        const valStr = Math.floor(num).toString();
        return {
          success: true,
          isImplicitAllowed: false,
          recommendedMethod: 'try_parse',
          convertedValueDisplay: `true (out ${valStr})`,
          rawTargetValue: valStr,
          explanation: `TryParse metni başarıyla sayıya çevirdi ve 'true' döndürdü. Güvenli kod yazımında Parse yerine mutlaka TryParse önerilir.`,
          csharpCode: getCsharpCodeSnippet(valStr),
          memoryNote: 'TryParse başarısız girdi için istisna yerine false döndürür.',
        };
      } else {
        return {
          success: true,
          isImplicitAllowed: false,
          recommendedMethod: 'try_parse',
          convertedValueDisplay: 'false (out 0)',
          rawTargetValue: '0',
          warningMessage: `Dönüşüm başarısız oldu ancak TryParse istisna fırlatmadı! Dönüş değeri false, out parametresi 0 oldu.`,
          explanation: `"${trimmed}" metni ${targetType} tipine dönüştürülemez. TryParse çökme yaşanmadan 'false' üretti.`,
          csharpCode: getCsharpCodeSnippet('false (out 0)'),
          memoryNote: 'TryParse başarısız girdi için false döndürür.',
        };
      }
    }

    if (method === 'parse' || method === 'convert_class') {
      const num = Number(trimmed);
      const isIntegerTarget = ['byte', 'sbyte', 'short', 'ushort', 'int', 'uint', 'long', 'ulong', 'char'].includes(targetType);
      if (!Number.isFinite(num) || trimmed === '' || (isIntegerTarget && !Number.isInteger(num))) {
        return {
          success: false,
          isImplicitAllowed: false,
          recommendedMethod: 'try_parse',
          convertedValueDisplay: 'HATA (FormatException)',
          rawTargetValue: trimmed,
          exceptionName: 'System.FormatException',
          errorMessage: `Girdi dizesi doğru biçimde değildi. (Input string was not in a correct format.)`,
          explanation: `"${trimmed}" metni geçerli bir sayı içermediği için System.FormatException fırlatıldı! Çökmeyi önlemek için TryParse kullanmalısınız.`,
          csharpCode: getCsharpCodeSnippet('HATA', true, 'FormatException'),
          memoryNote: 'Beklenmeyen karakterler CLR formatlayıcısı tarafından reddedildi.',
        };
      }

      if (!checkRange(num, targetType)) {
        return {
          success: false,
          isImplicitAllowed: false,
          recommendedMethod: 'try_parse',
          convertedValueDisplay: 'HATA (OverflowException)',
          rawTargetValue: trimmed,
          exceptionName: 'System.OverflowException',
          errorMessage: `Değer ${targetType} için çok büyük veya çok küçüktü. (Value was either too large or too small for a ${targetType}.)`,
          explanation: `${num} sayısı ${targetType} sınırlarının (${trgMeta.minValue} .. ${trgMeta.maxValue}) dışındadır. Hem Parse hem Convert taşma durumunda OverflowException fırlatır!`,
          csharpCode: getCsharpCodeSnippet('HATA', true, 'OverflowException'),
          memoryNote: `${trgMeta.bits} bitlik hedef alan ${num} değerini saklamak için yetersiz.`,
        };
      }

      const resVal = (targetType === 'float' || targetType === 'double' || targetType === 'decimal')
        ? num.toString()
        : Math.floor(num).toString();

      return {
        success: true,
        isImplicitAllowed: false,
        recommendedMethod: method,
        convertedValueDisplay: resVal,
        rawTargetValue: resVal,
        explanation: `Metinsel veri başarıyla ${targetType} tipine dönüştürüldü.`,
        csharpCode: getCsharpCodeSnippet(resVal),
        memoryNote: `Simülasyon sonucu: ${resVal}. Bu araç çalışma zamanı belleğini ölçmez.`,
      };
    }
  }

  // 3. Boxing & Unboxing Demonstration
  if (method === 'boxing_unboxing') {
    return {
      success: true,
      isImplicitAllowed: false,
      recommendedMethod: 'boxing_unboxing',
      convertedValueDisplay: trimmed,
      rawTargetValue: trimmed,
      explanation: `1. Boxing: '${trimmed}' değerinin object türünde kullanılması için kutulanmış bir nesne oluşturulur.\n2. Unboxing: Kutulanmış değer (${targetType}) türüne geri dönüştürülür.\nGereksiz boxing, ek tahsis ve çöp toplayıcı maliyetine yol açabilir.`,
      csharpCode: getCsharpCodeSnippet(trimmed),
      memoryNote: 'Boxing kutulanmış bir nesne oluşturur; bu simülasyon gerçek bellek kullanımını ölçmez.',
    };
  }

  // 4. Numeric to String
  if (targetType === 'string') {
    return {
      success: true,
      isImplicitAllowed: false,
      recommendedMethod: 'to_string',
      convertedValueDisplay: `"${trimmed}"`,
      rawTargetValue: trimmed,
      explanation: `.ToString() veya Convert.ToString() değerin metinsel gösterimini üretir.`,
      csharpCode: getCsharpCodeSnippet(trimmed),
      memoryNote: 'Simülasyon metinsel sonucu gösterir; çalışma zamanı bellek tahsisini ölçmez.',
    };
  }

  // 5. Numeric / Primitive Conversions (Implicit vs Explicit Cast)
  const numericVal = Number(trimmed);
  if (isNaN(numericVal)) {
    return {
      success: false,
      isImplicitAllowed: false,
      recommendedMethod: 'explicit_cast',
      convertedValueDisplay: 'Geçersiz Sayı',
      rawTargetValue: trimmed,
      errorMessage: `"${trimmed}" geçerli bir sayısal değer değil.`,
      explanation: 'Lütfen sayısal bir değer giriniz.',
      csharpCode: `// Hata: ${trimmed} sayısal değil`,
      memoryNote: 'Geçersiz girdi.',
    };
  }

  // Check if Implicit Conversion is valid
  if (method === 'implicit') {
    if (!isImplicit) {
      return {
        success: false,
        isImplicitAllowed: false,
        recommendedMethod: 'explicit_cast',
        convertedValueDisplay: 'Derleme Hatası (CS0266)',
        rawTargetValue: '',
        errorMessage: `Cannot implicitly convert type '${sourceType}' to '${targetType}'. An explicit conversion exists (are you missing a cast?)`,
        explanation: `${sourceType} türünden ${targetType} türüne bu örtük dönüşüm C# kurallarında tanımlı değildir. Açık cast veya uygun bir dönüşüm yöntemi gerekebilir.`,
        csharpCode: `// DERLEME HATASI:\n${sourceType} a = ${trimmed};\n${targetType} b = a; // CS0266: Cannot implicitly convert type '${sourceType}' to '${targetType}'`,
        memoryNote: 'Dönüşümün izinli olup olmadığı C# tür kurallarına bağlıdır; bu simülasyon çalışma zamanı davranışını ölçmez.',
      };
    }

    // Valid Implicit Conversion!
    let displayVal = numericVal.toString();
    if (targetType === 'float' || targetType === 'double') {
      if (!displayVal.includes('.')) {
        displayVal = displayVal + '.0';
      }
    }

    return {
      success: true,
      isImplicitAllowed: true,
      recommendedMethod: 'implicit',
      convertedValueDisplay: displayVal,
      rawTargetValue: numericVal.toString(),
      explanation: `${sourceType} türünden ${targetType} türüne örtük dönüşüm C# kurallarında tanımlıdır. Kayan noktalı hedefler değeri yaklaşık temsil edebilir.`,
      csharpCode: getCsharpCodeSnippet(displayVal),
      memoryNote: 'Tür boyutları gösterilir; gerçek bellek yerleşimi veya dönüşümün hassasiyeti bu araçta ölçülmez.',
    };
  }

  // Explicit Cast: Check overflow or truncation
  if (method === 'explicit_cast') {
    // Floating point to integer truncation
    const isFloatToInt = (sourceType === 'float' || sourceType === 'double' || sourceType === 'decimal') &&
      trgMeta.category === 'tam_sayi';

    let integerVal = Math.trunc(numericVal);

    // Check bounds for target type
    const fitsTarget = checkRange(integerVal, targetType);

    // Bit overflow calculation for integers
    let finalTargetVal = integerVal;
    let overflowOccurred = false;

    if (!fitsTarget) {
      overflowOccurred = true;
      if (checkedMode) {
        return {
          success: false,
          isImplicitAllowed: false,
          recommendedMethod: 'explicit_cast',
          convertedValueDisplay: 'HATA (OverflowException)',
          rawTargetValue: integerVal.toString(),
          exceptionName: 'System.OverflowException',
          errorMessage: `Aritmetik işlem taşma ile sonuçlandı. (Arithmetic operation resulted in an overflow.)`,
          explanation: `checked bloğu devrede olduğu için taşma tespit edildiğinde sessizce veri kaybı yaşanması engellendi ve 'OverflowException' fırlatıldı! Bu durum finansal veya kritik sistemlerde can kurtarır.`,
          csharpCode: getCsharpCodeSnippet('HATA', true, 'OverflowException'),
          memoryNote: 'checked bağlamı bu dönüşümde taşmayı OverflowException olarak görünür kılar.',
        };
      } else {
        // Unchecked modulo bit truncation
        if (targetType === 'byte') {
          finalTargetVal = ((integerVal % 256) + 256) % 256;
        } else if (targetType === 'sbyte') {
          let b = ((integerVal % 256) + 256) % 256;
          if (b > 127) b = b - 256;
          finalTargetVal = b;
        } else if (targetType === 'short') {
          let s = ((integerVal % 65536) + 65536) % 65536;
          if (s > 32767) s = s - 65536;
          finalTargetVal = s;
        } else if (targetType === 'ushort') {
          finalTargetVal = ((integerVal % 65536) + 65536) % 65536;
        }
      }
    }

    // Prepare bit visualizer
    const srcBitsStr = toBinaryString(integerVal, srcMeta.bits);
    const trgBitsStr = toBinaryString(finalTargetVal, trgMeta.bits);

    let explanationText = '';
    let warning: string | undefined;

    if (overflowOccurred) {
      warning = `DİKKAT: Sayı (${integerVal}), ${targetType} tipinin alabileceği sınırları (${trgMeta.minValue} .. ${trgMeta.maxValue}) aştığı için BIT TAŞMASI (OVERFLOW) meydana geldi! Sonuç ${finalTargetVal} olarak bozuldu!`;
      explanationText = `Cast operatörü unchecked modda sessizce fazlalık bitleri çöpe atar. ${srcMeta.bits}-bitlik sayının yalnızca son ${trgMeta.bits} biti saklandı (${integerVal} -> ${finalTargetVal}).`;
    } else if (isFloatToInt) {
      explanationText = `Kayan noktalı sayı (${numericVal}), tam sayıya dönüştürülürken ondalık basamakları (.${numericVal.toString().split('.')[1] || '0'}) doğrudan atıldı (Truncation). Sonuç: ${finalTargetVal}. Yuvarlama yapılmaz.`;
    } else {
      explanationText = `Explicit Cast (${targetType}) uygulandı. Değer hedef aralığa uyduğu için veri kaybı yaşanmadan ${finalTargetVal} üretildi.`;
    }

    return {
      success: true,
      isImplicitAllowed: isImplicit,
      recommendedMethod: 'explicit_cast',
      convertedValueDisplay: finalTargetVal.toString(),
      rawTargetValue: finalTargetVal.toString(),
      warningMessage: warning,
      explanation: explanationText,
      csharpCode: getCsharpCodeSnippet(finalTargetVal.toString()),
      bitAnalysis: {
        sourceBitsFormatted: srcBitsStr,
        targetBitsFormatted: trgBitsStr,
        sourceTotalBits: srcMeta.bits,
        targetTotalBits: trgMeta.bits,
        preservedBits: trgBitsStr,
        lostBits: srcMeta.bits > trgMeta.bits ? srcBitsStr.slice(0, srcBitsStr.length - trgBitsStr.length).trim() : '',
        hasTruncation: srcMeta.bits > trgMeta.bits && overflowOccurred,
      },
      memoryNote: overflowOccurred
        ? `Üst bitler kırpıldı. RAM'de yalnızca son ${trgMeta.bytes} bayt saklandı.`
        : 'Sonuç hedef türün gösterimine göre hesaplandı; çalışma zamanı bellek tahsisi ölçülmedi.',
    };
  }

  // Convert Class
  if (method === 'convert_class') {
    if (!checkRange(numericVal, targetType)) {
      return {
        success: false,
        isImplicitAllowed: false,
        recommendedMethod: 'convert_class',
        convertedValueDisplay: 'HATA (OverflowException)',
        rawTargetValue: trimmed,
        exceptionName: 'System.OverflowException',
        errorMessage: `Değer ${targetType} için çok büyük veya çok küçüktü. (Convert sınıfı taşma olduğunda sessiz kalmaz, daima OverflowException fırlatır!)`,
        explanation: `Bu Convert dönüşümünde değer hedef aralığın dışındadır ve OverflowException oluşur.`,
        csharpCode: getCsharpCodeSnippet('HATA', true, 'OverflowException'),
        memoryNote: 'Convert dönüşümlerinin aralık ve yuvarlama davranışı hedef türe bağlıdır.',
      };
    }

    const roundedVal = Math.round(numericVal);
    return {
      success: true,
      isImplicitAllowed: isImplicit,
      recommendedMethod: 'convert_class',
      convertedValueDisplay: roundedVal.toString(),
      rawTargetValue: roundedVal.toString(),
      explanation: `Convert sınıfı başarıyla dönüştürdü. Not: Convert ondalıklı sayıları Banker's Rounding (en yakın çift sayıya yuvarlama) ile tam sayıya çevirir.`,
      csharpCode: getCsharpCodeSnippet(roundedVal.toString()),
      memoryNote: `Convert.${targetType} metodu çağrıldı.`,
    };
  }

  // Fallback
  return {
    success: true,
    isImplicitAllowed: isImplicit,
    recommendedMethod: 'explicit_cast',
    convertedValueDisplay: trimmed,
    rawTargetValue: trimmed,
    explanation: 'Dönüşüm gerçekleştirildi.',
    csharpCode: getCsharpCodeSnippet(trimmed),
    memoryNote: 'Normal bellek ataması.',
  };
}

/**
 * Checks whether a number fits inside the target C# type boundaries
 */
function checkRange(val: number, type: DataType): boolean {
  switch (type) {
    case 'byte':
      return val >= 0 && val <= 255;
    case 'sbyte':
      return val >= -128 && val <= 127;
    case 'short':
      return val >= -32768 && val <= 32767;
    case 'ushort':
      return val >= 0 && val <= 65535;
    case 'int':
      return val >= -2147483648 && val <= 2147483647;
    case 'uint':
      return val >= 0 && val <= 4294967295;
    case 'long':
    case 'ulong':
    case 'float':
    case 'double':
    case 'decimal':
    case 'string':
    case 'object':
      return true;
    case 'bool':
      return val === 0 || val === 1;
    case 'char':
      return val >= 0 && val <= 65535;
    default:
      return true;
  }
}
