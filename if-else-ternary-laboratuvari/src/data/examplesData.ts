import { CodeScenario } from '../types.ts';

export const SCENARIOS: CodeScenario[] = [
  {
    id: 'original-prompt-example',
    title: 'Ödev Ana Örneği: Boolean Durum Kontrolü',
    category: 'Temel Örnek (Ödev Metni)',
    description: 'Ödev metninde verilen "bool condition" kontrolünün birebir if-else ve ternary if karşılığı.',
    variableName: 'condition',
    variableType: 'bool',
    defaultValue: true,
    inputConfig: {
      label: 'condition değişkeni değeri',
    },
    getIfElseCode: (val: boolean) => `// Hazırlayan: Enes Öztürk
// Klasik If - Else Blok Yapısı
bool condition = ${val ? 'true' : 'false'};

if (condition)
{
    Console.WriteLine("Değişken: true");
}
else
{
    Console.WriteLine("Değişken: false");
}`,
    getTernaryCode: (val: boolean) => `// Hazırlayan: Enes Öztürk
// Ternary If (? :) Operatörü ile Tek Satır Çözüm
bool condition = ${val ? 'true' : 'false'};

Console.WriteLine(condition ? "Değişken: true" : "Değişken: false");`,
    getOutput: (val: boolean) => val ? 'Değişken: true' : 'Değişken: false',
    conditionExplanation: (val: boolean) =>
      val
        ? 'condition mantıksal olarak "true" olduğu için if bloğu tetiklendi ve "Değişken: true" yazıldı.'
        : 'condition mantıksal olarak "false" olduğu için else bloğu tetiklendi ve "Değişken: false" yazıldı.',
  },
  {
    id: 'driving-license',
    title: 'Ehliyet Uygunluğu (Sayısal Karşılaştırma)',
    category: 'Gerçek Hayat Senaryosu',
    description: 'Yaş 18 ve üzeri ise ehliyet alma hakkı tanıyan karar mekanizması.',
    variableName: 'yas',
    variableType: 'number',
    defaultValue: 19,
    inputConfig: {
      min: 10,
      max: 65,
      step: 1,
      label: 'Adayın Yaşı',
    },
    getIfElseCode: (val: number) => `// Hazırlayan: Enes Öztürk
int yas = ${val};
string durum;

if (yas >= 18)
{
    durum = "Ehliyet alabilirsiniz.";
}
else
{
    durum = "Ehliyet almak için yaşınız yetersiz.";
}

Console.WriteLine(durum);`,
    getTernaryCode: (val: number) => `// Hazırlayan: Enes Öztürk
int yas = ${val};

string durum = yas >= 18
    ? "Ehliyet alabilirsiniz."
    : "Ehliyet almak için yaşınız yetersiz.";

Console.WriteLine(durum);`,
    getOutput: (val: number) =>
      val >= 18 ? 'Ehliyet alabilirsiniz.' : 'Ehliyet almak için yaşınız yetersiz.',
    conditionExplanation: (val: number) =>
      val >= 18
        ? `${val} >= 18 koşulu DOĞRU (true) olduğu için onay mesajı döndü.`
        : `${val} >= 18 koşulu YANLIŞ (false) olduğu için yetersiz mesajı döndü.`,
  },
  {
    id: 'exam-grade',
    title: 'Sınav Geçme / Kalma (Baraj Puanı)',
    category: 'Akademik Değerlendirme',
    description: '50 baraj puanına göre öğrencinin dersten geçip kaldığını belirler.',
    variableName: 'notu',
    variableType: 'number',
    defaultValue: 75,
    inputConfig: {
      min: 0,
      max: 100,
      step: 5,
      label: 'Sınav Notu',
    },
    getIfElseCode: (val: number) => `// Hazırlayan: Enes Öztürk
int notu = ${val};

if (notu >= 50)
{
    Console.WriteLine("Tebrikler, Dersi Geçtiniz!");
}
else
{
    Console.WriteLine("Maalesef, Bütünlemeye Kaldınız.");
}`,
    getTernaryCode: (val: number) => `// Hazırlayan: Enes Öztürk
int notu = ${val};

Console.WriteLine(notu >= 50 ? "Tebrikler, Dersi Geçtiniz!" : "Maalesef, Bütünlemeye Kaldınız.");`,
    getOutput: (val: number) =>
      val >= 50 ? 'Tebrikler, Dersi Geçtiniz!' : 'Maalesef, Bütünlemeye Kaldınız.',
    conditionExplanation: (val: number) =>
      val >= 50
        ? `Not (${val}) >= 50 koşulu sağlandı -> Geçti.`
        : `Not (${val}) < 50 olduğu için baraj altı kaldı.`,
  },
  {
    id: 'even-odd',
    title: 'Çift veya Tek Sayı Tespiti (Mod Operatörü %)',
    category: 'Matematiksel Mantık',
    description: 'Bir sayının 2 ile bölümünden kalanın 0 olup olmadığını sorgular.',
    variableName: 'sayi',
    variableType: 'number',
    defaultValue: 42,
    inputConfig: {
      min: 1,
      max: 100,
      step: 1,
      label: 'Kontrol Edilecek Sayı',
    },
    getIfElseCode: (val: number) => `// Hazırlayan: Enes Öztürk
int sayi = ${val};

if (sayi % 2 == 0)
{
    Console.WriteLine($"{sayi} bir ÇİFT sayıdır.");
}
else
{
    Console.WriteLine($"{sayi} bir TEK sayıdır.");
}`,
    getTernaryCode: (val: number) => `// Hazırlayan: Enes Öztürk
int sayi = ${val};

string sonuc = (sayi % 2 == 0) ? $"{sayi} bir ÇİFT sayıdır." : $"{sayi} bir TEK sayıdır.";
Console.WriteLine(sonuc);`,
    getOutput: (val: number) =>
      val % 2 === 0 ? `${val} bir ÇİFT sayıdır.` : `${val} bir TEK sayıdır.`,
    conditionExplanation: (val: number) =>
      val % 2 === 0
        ? `${val} % 2 == 0 ifadesi true: 2 ile tam bölünüyor (Çift).`
        : `${val} % 2 == 1 ifadesi false: 2 ile tam bölünmüyor (Tek).`,
  },
  {
    id: 'user-auth',
    title: 'Kullanıcı Oturum Kontrolü',
    category: 'Güvenlik & Kullanıcı Arayüzü',
    description: 'Kullanıcının sisteme giriş yapıp yapmadığını tespit edip selamlama yapar.',
    variableName: 'girisYapildiMi',
    variableType: 'bool',
    defaultValue: true,
    inputConfig: {
      label: 'Oturum Durumu (isLoggedIn)',
    },
    getIfElseCode: (val: boolean) => `// Hazırlayan: Enes Öztürk
bool girisYapildiMi = ${val ? 'true' : 'false'};

if (girisYapildiMi)
{
    Console.WriteLine("Hoş Geldiniz Sayın Enes Öztürk!");
}
else
{
    Console.WriteLine("Lütfen sisteme giriş yapınız.");
}`,
    getTernaryCode: (val: boolean) => `// Hazırlayan: Enes Öztürk
bool girisYapildiMi = ${val ? 'true' : 'false'};

Console.WriteLine(girisYapildiMi ? "Hoş Geldiniz Sayın Enes Öztürk!" : "Lütfen sisteme giriş yapınız.");`,
    getOutput: (val: boolean) =>
      val ? 'Hoş Geldiniz Sayın Enes Öztürk!' : 'Lütfen sisteme giriş yapınız.',
    conditionExplanation: (val: boolean) =>
      val ? 'Oturum açık (true) olduğu için kullanıcı ismiyle karşılandı.' : 'Oturum kapalı (false), giriş uyarısı verildi.',
  },
];
