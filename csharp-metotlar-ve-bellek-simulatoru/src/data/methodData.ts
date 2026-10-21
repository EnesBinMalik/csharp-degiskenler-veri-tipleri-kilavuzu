import { QuizQuestion, MethodTemplate } from '../types';

export const VALUE_TYPES = [
  { name: 'int', size: '32-bit (4 byte)', range: '-2,147,483,648 ile 2,147,483,647', example: 'int sayi = 42;' },
  { name: 'long', size: '64-bit (8 byte)', range: '-9.22 × 10^18 ile 9.22 × 10^18', example: 'long nufus = 85000000L;' },
  { name: 'float', size: '32-bit (4 byte)', range: '7 basamak hassasiyet (~1.5 × 10^-45)', example: 'float pi = 3.14f;' },
  { name: 'double', size: '64-bit (8 byte)', range: '15-17 basamak hassasiyet', example: 'double oran = 0.00341;' },
  { name: 'decimal', size: '128-bit (16 byte)', range: '28-29 basamak (Finansal veriler)', example: 'decimal bakiye = 1450.75m;' },
  { name: 'char', size: '16-bit (2 byte)', range: 'Tek bir Unicode karakteri', example: "char harf = 'E';" },
  { name: 'bool', size: '8-bit (1 byte)', range: 'true veya false', example: 'bool aktifMi = true;' },
  { name: 'byte', size: '8-bit (1 byte)', range: '0 ile 255 (işaretsiz)', example: 'byte seviye = 255;' },
  { name: 'short', size: '16-bit (2 byte)', range: '-32,768 ile 32,767', example: 'short derece = -15;' },
  { name: 'struct', size: 'Alanlara ve yerleşime bağlı', range: 'Kullanıcı tanımlı değer tipi', example: 'struct Nokta { int X; int Y; }' },
  { name: 'enum', size: 'Varsayılan temel tip: int', range: 'Temel tipi açıkça değiştirilebilir', example: 'enum Gun : byte { Pzt, Sali, Crs }' },
];

export const METHOD_SYNTAX_PARTS = [
  {
    key: 'access_modifier',
    label: 'Erişim Belirteci',
    code: 'public',
    color: 'text-indigo-400 bg-indigo-950/60 border-indigo-700/50',
    description: 'Metodun nereden çağrılabileceğini belirler. public (her yerden), private (sadece sınıf içinden), internal (aynı derleme içinden), protected (türemiş sınıflardan).',
    detail: 'Eğer bir erişim belirteci yazılmazsa, varsayılan olarak private kabul edilir.'
  },
  {
    key: 'return_type',
    label: 'Geri Dönüş Tipi',
    code: 'int',
    color: 'text-emerald-400 bg-emerald-950/60 border-emerald-700/50',
    description: 'Metodun işini bitirdikten sonra çağıran satıra teslim edeceği verinin tipidir. Eğer metot geriye bir şey döndürmüyorsa "void" yazılır.',
    detail: 'Geri dönüş tipi belirtilen metotlar gövdeleri içinde mutlaka "return" anahtar kelimesiyle uygun tipte bir değer döndürmelidir.'
  },
  {
    key: 'method_name',
    label: 'Metot Adı',
    code: 'ArttırVeTopla',
    color: 'text-amber-400 bg-amber-950/60 border-amber-700/50',
    description: 'Metodu çağırırken kullanacağımız addır. C# standartlarında PascalCase (Her kelimenin ilk harfi büyük) ve genellikle bir eylem bildirecek şekilde adlandırılır.',
    detail: 'Örn: Hesapla, Kaydet, ArttırVeTopla, KullaniciGetir.'
  },
  {
    key: 'parameters',
    label: 'Parametre / Argüman Listesi',
    code: '(ref int x, ref int y)',
    color: 'text-cyan-400 bg-cyan-950/60 border-cyan-700/50',
    description: 'Metodun çalışırken dışarıdan ihtiyaç duyduğu girdilerdir. Parantez içinde "tip isim" formatında yazılır. Değer veya referans (ref) ile aktarılabilir.',
    detail: 'Parametrelerin kapsamı metot gövdesidir. Derleyici ve çalışma zamanı fiziksel saklama ve optimizasyon ayrıntılarını belirler.'
  },
  {
    key: 'method_body',
    label: 'Metot Gövdesi',
    code: '{\n    x += 1;\n    y += y;\n    return (x + y);\n}',
    color: 'text-purple-400 bg-purple-950/60 border-purple-700/50',
    description: 'Süslü parantezler {} arasındaki çalışan komut bloklarıdır. Burada tanımlanan tüm yerel değişkenler yalnızca bu süslü parantezlerin içinde yaşar.',
    detail: 'return komutu metot yürütmesini tamamlar ve dönüş değerini çağırana verir; fiziksel belleğin anında temizlendiğini göstermez.'
  }
];

export const METHOD_TEMPLATES: MethodTemplate[] = [
  {
    id: 'user_example',
    name: 'ArttırVeTopla (Örnek Metot)',
    category: 'C# ref & Değer Tipi',
    description: 'x değerini 1 arttırır, y değerini kendiyle toplar ve ikisinin toplamını döndürür.',
    signature: 'public int ArttırVeTopla(ref int x, ref int y)',
    usesRef: true,
    initialParams: { x: 3, y: 4 },
    code: `// Çağrılış:
int x = 3;
int y = 4;
int sonuc = instance.ArttırVeTopla(ref x, ref y);

// Metot Tanımı:
public int ArttırVeTopla(ref int x, ref int y)
{
    x += 1;
    y += y;
    return (x + y);
}`
  },
  {
    id: 'swap_numbers',
    name: 'Sayıları Takas Et (Swap)',
    category: 'Klasik ref Örneği',
    description: 'İki değişkenin değerlerini birbiriyle kalıcı olarak yer değiştirir.',
    signature: 'public void SayilariTakasEt(ref int a, ref int b)',
    usesRef: true,
    initialParams: { a: 10, b: 25 },
    code: `// Çağrılış:
int a = 10;
int b = 25;
instance.SayilariTakasEt(ref a, ref b);
// a artık 25, b artık 10 oldu!

public void SayilariTakasEt(ref int a, ref int b)
{
    int gecici = a;
    a = b;
    b = gecici;
}`
  },
  {
    id: 'value_protection',
    name: 'Kare Hesapla (Değer Tipi Koruma)',
    category: 'Değer Tipi (Pass-by-Value)',
    description: 'Parametre değer tipi olarak kopyalanır, metodun içindeki değişim ana değişkeni etkilemez.',
    signature: 'public int KareAl(int sayi)',
    usesRef: false,
    initialParams: { sayi: 7 },
    code: `// Çağrılış:
int sayi = 7;
int sonuc = instance.KareAl(sayi);
// sayi Main içinde halen 7'dir!

public int KareAl(int sayi)
{
    sayi = sayi * sayi; // Sadece kopyası değişir
    return sayi;
}`
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'C# dilinde bir metoda parametre olarak aktarılan değer tipi (int, double vb.) değişkenlerin ana değeri metot içinde değiştirildiğinde çağıran yerdeki asıl değişken neden değişmez?',
    options: [
      'Çünkü varsayılan aktarımda değer türü parametresi argümanın değerini alır.',
      'Çünkü C# derleyicisi metot içindeki matematiksel işlemleri yok sayar.',
      'Çünkü metot parametreleri derleyici tarafından yok sayılır.',
      'Çünkü metotlar sadece string verileri değiştirebilir.'
    ],
    correctAnswer: 0,
    explanation: 'Değer türü varsayılan olarak aktarıldığında parametre argümanın değerini alır; parametreye yapılan atama çağırandaki değişkeni değiştirmez. Bu dil semantiği belirli bir bellek alanı veya fiziksel kopyalama yöntemini garanti etmez.'
  },
  {
    id: 2,
    question: 'Bir değişkene parametre olarak "ref" anahtar kelimesi uygulandığında hangisi kesinlikle ZORUNLUDUR?',
    options: [
      'Değişkenin yalnızca static sınıflarda kullanılması zorunludur.',
      'Değişkene metoda gönderilmeden önce mutlaka bir başlangıç değeri atanmış olmak zorundadır.',
      'Metodun geri dönüş tipinin mutlaka void olması zorunludur.',
      'ref kullanılan metotlar en fazla 1 parametre alabilir.'
    ],
    correctAnswer: 1,
    explanation: 'ref anahtar kelimesi için C# kuralı kesindir: ref olarak metoda iletilen değişkenin çağrılmadan önce MUTLAKA bir başlangıç değeri (initial value) atanmış olmalıdır. (out parametresinde ise başlangıç değeri zorunlu değildir fakat metot içinde atanmalıdır).'
  },
  {
    id: 3,
    question: 'Aşağıdaki kod parçası çalıştırıldıktan sonra ekranda x ve y değerleri ne olur?\n\nint x = 3;\nint y = 4;\nint sonuc = instance.ArttırVeTopla(ref x, ref y);\n\npublic int ArttırVeTopla(ref int x, ref int y) {\n  x += 1;\n  y += y;\n  return (x + y);\n}',
    options: [
      'x = 3, y = 4, sonuc = 12',
      'x = 4, y = 8, sonuc = 12',
      'x = 4, y = 4, sonuc = 7',
      'x = 3, y = 8, sonuc = 11'
    ],
    correctAnswer: 1,
    explanation: 'ref kullanıldığı için x (3+1=4) ve y (4+4=8) olarak doğrudan çağıran yerdeki asıl bellekte değiştirilmiştir. Toplamları olan 4 + 8 = 12 de sonuc değişkenine dönmüştür.'
  },
  {
    id: 4,
    question: 'Metot içinde tanımlanan yerel (local) değişkenlerin yaşam süresi (lifetime) ne zaman sona erer?',
    options: [
      'Uygulama tamamen kapatıldığında.',
      'Bilgisayar yeniden başlatıldığında.',
      'Metot kapsamı sona erdiğinde bu yerel değişkene o kapsamdan erişilemez.',
      'Tanımlandıktan tam 5 dakika sonra çöp toplayıcı tarafından silinir.'
    ],
    correctAnswer: 2,
    explanation: 'Yerel değişkenin kapsamı kaynak kodla belirlenir. Metottan çıkıldığında bu kapsamdan erişilemez; fiziksel bellek yerleşimi ve geri kazanımı derleyici ve çalışma zamanına bağlıdır.'
  },
  {
    id: 5,
    question: 'Static olarak işaretlenmiş bir sınıf metoduna nasıl erişilir?',
    options: [
      'new anahtar kelimesiyle nesne oluşturup nesneIsmi.MetotIsmi() şeklinde.',
      'Doğrudan sınıf adı üzerinden: SinifAdi.MetotIsmi() şeklinde.',
      'ref anahtar kelimesiyle çağıranın değişkenine başvurarak.',
      'Yalnızca constructor içinden super() ile.'
    ],
    correctAnswer: 1,
    explanation: 'Static metotlar nesneye değil doğrudan sınıfa aittir. Bu nedenle bir nesne örneği (instance) üretilmeden doğrudan SinifAdi.MetotIsmi() söz dizimiyle çağrılır.'
  }
];
