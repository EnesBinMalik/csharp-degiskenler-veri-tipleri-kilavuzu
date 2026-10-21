import { ExtensionPreset } from '../types';

export const EXTENSION_PRESETS: ExtensionPreset[] = [
  {
    id: 'is_even',
    name: 'IsEvenNumber (Çift Sayı Kontrolü)',
    targetType: 'int',
    returnType: 'bool',
    description: 'Tamsayının çift olup olmadığını akıcı biçimde kontrol eden extension metot.',
    code: `public static class MyExtensionClass
{
    public static bool IsEvenNumber(this int value)
    {
        if (value % 2 == 0)
            return true;
        else
            return false;
    }
}`,
    sampleInput: 124,
    execute: (input: any) => {
      const val = parseInt(input, 10);
      if (isNaN(val)) return { result: 'Geçersiz sayı', steps: ['Hata: Sayısal bir değer girilmedi.'] };
      const isEven = val % 2 === 0;
      return {
        result: isEven ? 'true (Çift Sayı)' : 'false (Tek Sayı)',
        steps: [
          `Değişken: int deger = ${val};`,
          `Çağrı: bool isEven = deger.IsEvenNumber();`,
          `Yaklaşık static çağrı: MyExtensionClass.IsEvenNumber(${val});`,
          `İşlem: ${val} % 2 = ${val % 2}`,
          `Sonuç: ${isEven}`
        ]
      };
    }
  },
  {
    id: 'kelime_sayisi',
    name: 'KelimeSayisi (Metin Analizi)',
    targetType: 'string',
    returnType: 'int',
    description: 'String ifadelerin kaç kelimeden oluştuğunu hesaplayan extension metot.',
    code: `public static class StringExtensions
{
    public static int KelimeSayisi(this string metin)
    {
        if (string.IsNullOrWhiteSpace(metin))
            return 0;

        return metin.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries).Length;
    }
}`,
    sampleInput: 'C# ile extension metotlar yazmak çok kolay',
    execute: (input: any) => {
      const text = String(input).trim();
      if (!text) return { result: 0, steps: ['Boş metin girildi: 0 kelime.'] };
      const words = text.split(/\s+/).filter(Boolean);
      return {
        result: words.length,
        steps: [
          `Değişken: string cumle = "${text}";`,
          `Çağrı: int adet = cumle.KelimeSayisi();`,
          `Ayrıştırılan Kelimeler: [${words.map(w => `"${w}"`).join(', ')}]`,
          `Toplam Kelime Sayısı: ${words.length}`
        ]
      };
    }
  },
  {
    id: 'faktoryel_ext',
    name: 'Faktoryel (Extension + Rekürsif)',
    targetType: 'int',
    returnType: 'long',
    description: 'Extension ve Rekürsif mimariyi birleştiren melez örnek: sayi.Faktoryel()',
    code: `public static class MathExtensions
{
    public static long Faktoryel(this int sayi)
    {
        if (sayi < 0)
            throw new ArgumentException("Negatif sayıların faktöriyeli tanımsızdır.");
        if (sayi <= 1)
            return 1;

        // Kendi kendini çağırır (Rekürsif extension)
        return sayi * (sayi - 1).Faktoryel();
    }
}`,
    sampleInput: 6,
    execute: (input: any) => {
      const n = parseInt(input, 10);
      if (isNaN(n) || n < 0 || n > 20) {
        return { result: 'Geçersiz', steps: ['Lütfen 0 ile 20 arasında bir pozitif tamsayı girin.'] };
      }
      function recFact(x: number): bigint {
        if (x <= 1) return 1n;
        return BigInt(x) * recFact(x - 1);
      }
      const ans = recFact(n);
      return {
        result: ans.toString(),
        steps: [
          `Değişken: int sayi = ${n};`,
          `Çağrı: long sonuc = sayi.Faktoryel();`,
          `Özyinelemeli zincir: ${Array.from({ length: n }, (_, i) => n - i).join(' × ')}`,
          `Sonuç: ${ans.toString()}`
        ]
      };
    }
  },
  {
    id: 'url_slug',
    name: 'ToUrlSlug (SEO Link Biçimlendirici)',
    targetType: 'string',
    returnType: 'string',
    description: 'Türkçe karakterleri dönüştürerek URL dostu slug üreten extension metot.',
    code: `public static class WebExtensions
{
    public static string ToUrlSlug(this string metin)
    {
        if (string.IsNullOrEmpty(metin)) return "";

        string slug = metin.ToLowerInvariant()
            .Replace("ç", "c").Replace("ğ", "g")
            .Replace("ı", "i").Replace("ö", "o")
            .Replace("ş", "s").Replace("ü", "u")
            .Replace(" ", "-");

        return slug;
    }
}`,
    sampleInput: 'C# İleri Düzey Metotlar ve Algoritmalar',
    execute: (input: any) => {
      const text = String(input);
      const slug = text.toLowerCase()
        .replace(/ç/g, 'c')
        .replace(/ğ/g, 'g')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ş/g, 's')
        .replace(/ü/g, 'u')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      return {
        result: `"${slug}"`,
        steps: [
          `Orijinal Metin: "${text}"`,
          `Extension Çağrısı: metin.ToUrlSlug()`,
          `Türkçe karakter eşlemesi tamamlandı.`,
          `Oluşturulan URL Slug: /makale/${slug}`
        ]
      };
    }
  }
];

export interface ValidationRuleResult {
  ruleName: string;
  isSatisfied: boolean;
  message: string;
}

export function validateExtensionCode(code: string): {
  isValid: boolean;
  rules: ValidationRuleResult[];
  detectedMethodName?: string;
  detectedTargetType?: string;
} {
  const rules: ValidationRuleResult[] = [];

  // Rule 1: Static class
  const isStaticClass = /static\s+class\s+([A-Za-z0-9_]+)/.test(code);
  rules.push({
    ruleName: '1. Kural: Sınıf "static class" olmalıdır',
    isSatisfied: isStaticClass,
    message: isStaticClass
      ? 'Başarılı: Metot statik bir sınıf içerisinde tanımlanmış.'
      : 'Bu metinde static sınıf bildirimi bulunamadı.'
  });

  // Rule 2: Static method
  const methodMatch = code.match(/(public|private|internal|protected)?\s*(static\s+)?([A-Za-z0-9_<>\[\]]+)\s+([A-Za-z0-9_]+)\s*\(([^)]*)\)/);
  const isStaticMethod = /static\s+([A-Za-z0-9_<>\[\]]+)\s+([A-Za-z0-9_]+)\s*\(/.test(code);
  const methodName = methodMatch ? methodMatch[4] : 'Bilinmiyor';

  rules.push({
    ruleName: '2. Kural: Metodun kendisi de "static" olmalıdır',
    isSatisfied: isStaticMethod,
    message: isStaticMethod
      ? `Başarılı: '${methodName}' metodu statik olarak bildirilmiş.`
      : `Bu metinde '${methodName}' için static metot bildirimi bulunamadı.`
  });

  // Rule 3: Parameter has exactly one 'this' modifier on the first parameter
  const paramsSection = methodMatch ? methodMatch[5] : '';
  const thisMatches = paramsSection.match(/\bthis\b/g);
  const thisCount = thisMatches ? thisMatches.length : 0;
  const firstParamHasThis = /^\s*this\s+/.test(paramsSection);

  let targetType = 'int';
  const targetTypeMatch = paramsSection.match(/this\s+([A-Za-z0-9_<>\[\]]+)/);
  if (targetTypeMatch) {
    targetType = targetTypeMatch[1];
  }

  const satisfiesParamRule = thisCount === 1 && firstParamHasThis;

  let paramMessage = 'Başarılı: Yalnızca ilk parametrede tek bir "this" tanımlanmış.';
  if (thisCount === 0) {
    paramMessage = 'Bu metot bildirimi geleneksel extension metot sözdiziminde bir "this" parametresi içermiyor.';
  } else if (thisCount > 1) {
    paramMessage = 'Geleneksel extension metot bildiriminde yalnızca ilk parametre "this" ile işaretlenebilir.';
  } else if (!firstParamHasThis) {
    paramMessage = '"this" anahtar kelimesi yalnızca metodun ilk parametresinde kullanılabilir.';
  }

  rules.push({
    ruleName: '3. Kural: İlk parametrede tek bir "this" anahtar kelimesi',
    isSatisfied: satisfiesParamRule,
    message: paramMessage
  });

  const allPassed = rules.every(r => r.isSatisfied);

  return {
    isValid: allPassed,
    rules,
    detectedMethodName: methodName,
    detectedTargetType: targetType
  };
}
