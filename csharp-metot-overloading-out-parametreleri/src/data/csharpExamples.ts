import { OverloadMethod, QuizQuestion } from '../types';

export const USER_INFO = {
  author: 'Enes Öztürk',
  topic: 'C# Metot Overloading (Aşırı Yükleme) ve Out/Ref Parametre Kullanımı',
  course: 'C# .NET Programlama Eğitimi',
  date: 'Ekim 2026',
  repoName: 'csharp-metot-overloading-out-parametreleri',
  summary:
    'Bu projede C# dilinde metot overloading, imza kuralları ve out/ref parametre aktarımı etkileşimli örneklerle anlatılır. Görseller kavramsaldır; C# çalışma zamanı veya gerçek bellek yerleşimi simüle edilmez.',
};

export const CSHARP_FULL_SOURCE_CODE = `// =========================================================================
// Proje: C# Metot Overloading ve Out/Ref Parametre Kullanımı
// Geliştirici / Öğrenci: Enes Öztürk
// Tarih: 2026
// =========================================================================

using System;

namespace MetotOverloadingVeOutParametreleri
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== C# METOT OVERLOADING VE OUT PARAMETRE KULLANIMI ===");
            Console.WriteLine("Hazırlayan: Enes Öztürk\\n");

            Metotlar instance = new Metotlar();

            // -------------------------------------------------------------
            // BÖLÜM 1: METOT OVERLOADING (AŞIRI YÜKLEME) ÖRNEKLERİ
            // -------------------------------------------------------------
            Console.WriteLine("--- 1. Metot Overloading Testleri ---");

            // 1. Overload: EkranaYazdir(int)
            instance.EkranaYazdir(42);

            // 2. Overload: EkranaYazdir(string)
            instance.EkranaYazdir("Merhaba C# Dünyası!");

            // 3. Overload: EkranaYazdir(string, string)
            instance.EkranaYazdir("Enes ", "Öztürk");

            Console.WriteLine();

            // -------------------------------------------------------------
            // BÖLÜM 2: OUT PARAMETRE KULLANIMI
            // -------------------------------------------------------------
            Console.WriteLine("--- 2. Out Parametre Kullanımı ---");

            // Out parametresi kullanılmadan önce İLK DEĞER ZORUNLULUĞU YOKTUR.
            // C# 7.0 ile birlikte gelen 'out int toplam' inline bildirimi kullanılmıştır.
            int sonuc = instance.Toplam(4, 8, out int toplamSonucu);

            Console.WriteLine($"Toplam Metodu Geri Dönüş Değeri: {sonuc}");
            Console.WriteLine($"Out Parametresine Atanan Değer: {toplamSonucu}");

            // Gerçek Hayat Örneği: int.TryParse ile out kullanımı
            Console.WriteLine("\\n--- 3. Gerçek Hayat Örneği (int.TryParse & Out) ---");
            string girilenMetin = "1923";
            if (int.TryParse(girilenMetin, out int basariliSayi))
            {
                Console.WriteLine($"Dönüştürme Başarılı! Çıkan Sayı: {basariliSayi}");
            }
            else
            {
                Console.WriteLine("Metin sayıya dönüştürülemedi!");
            }

            // Çoklu Out Parametresi Örneği: Kalanlı Bölme
            Console.WriteLine("\\n--- 4. İki Adet Out Parametresi (Bölüm ve Kalan) ---");
            int bolum = instance.Bolme(29, 6, out int kalan);
            Console.WriteLine($"29 / 6 -> Bölüm: {bolum}, Kalan (out): {kalan}");

            Console.WriteLine("\\nProgram başarıyla tamamlandı. - Enes Öztürk");
            Console.ReadLine();
        }
    }

    public class Metotlar
    {
        // -----------------------------------------------------------------
        // METOT OVERLOADING ÖRNEKLERİ:
        // Overload ayrımı: metot adı ve parametre listesi (tür/sıra/geçirme biçimi)
        // DİKKAT: Geri dönüş tipi (void, int, string vb.) metot imzasına dahil DEĞİLDİR!
        // -----------------------------------------------------------------

        // Versiyon 1: int parametre alan aşırı yükleme
        public void EkranaYazdir(int deger)
        {
            Console.WriteLine($"[EkranaYazdir (int)]: {deger}");
        }

        // Versiyon 2: string parametre alan aşırı yükleme
        public void EkranaYazdir(string deger)
        {
            Console.WriteLine($"[EkranaYazdir (string)]: {deger}");
        }

        // Versiyon 3: 2 adet string parametre alan aşırı yükleme
        public void EkranaYazdir(string deger1, string deger2)
        {
            Console.WriteLine($"[EkranaYazdir (string, string)]: {deger1 + deger2}");
        }

        // -----------------------------------------------------------------
        // OUT PARAMETRE KULLANIMI:
        // Out parametresi referans yoluyla çalışır ancak ref'ten farklı olarak:
        // 1. Çağıran tarafta ilk değer atanması şart değildir.
        // 2. Metodun gövdesi içinde OUT parametresine KESİNLİKLE değer atanmalıdır!
        // -----------------------------------------------------------------
        public int Toplam(int a, int b, out int toplam)
        {
            toplam = a + b; // Metot bitmeden out parametresine değer atanması mecburidir
            return toplam;
        }

        // Çoklu sonuç döndüren örnek:
        public int Bolme(int bolunen, int bolen, out int kalan)
        {
            kalan = bolunen % bolen;
            return bolunen / bolen;
        }
    }
}
`;

export const OVERLOAD_METHODS: OverloadMethod[] = [
  {
    id: 'ov-int',
    name: 'EkranaYazdir',
    parameters: [{ name: 'deger', type: 'int' }],
    returnType: 'void',
    description: 'Tek bir tamsayı (int) parametre alır ve konsola yazdırır.',
    codeSnippet: `public void EkranaYazdir(int deger)\n{\n    Console.WriteLine(deger);\n}`,
  },
  {
    id: 'ov-string',
    name: 'EkranaYazdir',
    parameters: [{ name: 'deger', type: 'string' }],
    returnType: 'void',
    description: 'Tek bir metin (string) parametre alır ve konsola yazdırır.',
    codeSnippet: `public void EkranaYazdir(string deger)\n{\n    Console.WriteLine(deger);\n}`,
  },
  {
    id: 'ov-string-two',
    name: 'EkranaYazdir',
    parameters: [
      { name: 'deger1', type: 'string' },
      { name: 'deger2', type: 'string' },
    ],
    returnType: 'void',
    description: 'İki adet string parametre alır, bunları birleştirip konsola yazdırır.',
    codeSnippet: `public void EkranaYazdir(string deger1, string deger2)\n{\n    Console.WriteLine(deger1 + deger2);\n}`,
  },
];

export const OUT_VS_REF_COMPARISON = [
  {
    feature: 'İlk Değer Zorunluluğu',
    outParam: 'GEREKMEZ. Değişken tanımlanıp doğrudan metota out olarak verilebilir.',
    refParam: 'ZORUNLUDUR. Metot çağrılmadan önce değişkene mutlaka değer atanmalıdır.',
    importance: 'Kritik Fark',
  },
  {
    feature: 'Metot İçi Değer Atama',
    outParam: 'ZORUNLUDUR. Normal dönüş yollarının her birinde out parametresine değer atanmalıdır; aksi durumda CS0177 oluşur.',
    refParam: 'İSTEĞE BAĞLIDIR. Metot mevcut değeri okuyabilir ve değiştirmeyebilir.',
    importance: 'Derleyici Kuralı',
  },
  {
    feature: 'Veri Akış Yönü',
    outParam: 'Çıktı amaçlıdır: İlk değer okunmadan önce metot içinde atanmalıdır; atanan değer çağırana aktarılır.',
    refParam: 'Girdi/çıktı amaçlıdır: Başlangıç değeri gerekir; metot değeri okuyabilir ve değiştirebilir.',
    importance: 'Tasarım Deseni',
  },
  {
    feature: 'C# 7+ Inline Bildirim',
    outParam: 'Desteklenir: Method(out int x) şeklinde tek satırda tanımlanabilir.',
    refParam: 'Desteklenmez: ref değişkeni çağrı öncesinde tanımlı ve başlatılmış olmalıdır.',
    importance: 'Sözdizim Kolaylığı',
  },
  {
    feature: 'Tipik Kullanım Alanı',
    outParam: 'Bir metottan birden fazla değer döndürmek (Örn: int.TryParse, Bölme Kalanı).',
    refParam: 'Mevcut bir nesneyi/değeri yerinde modifiye etmek (Örn: Swap/Takas işlemi).',
    importance: 'En İyi Pratik',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Aşağıdaki bileşenlerden hangisi C# dilinde bir "Metot İmzası"na (Method Signature) DAHİL DEĞİLDİR?',
    options: [
      'Metot Adı',
      'Geri Dönüş Tipi (Return Type)',
      'Parametre Sayısı',
      'Parametre Veri Tipleri',
    ],
    correctIndex: 1,
    explanation:
      'Dönüş türü ve parametre adları tek başına overload ayrımı oluşturmaz. C# imzasında metot adı, tür parametre sayısı ve parametrelerin tür/sıra/geçirme biçimi dikkate alınır; yalnızca dönüş türünü değiştirerek overload yapılamaz.',
  },
  {
    id: 2,
    question: 'Aşağıdaki C# kod bloğu derlendiğinde derleyicinin tepkisi ne olur?',
    codeSnippet: `public int Hesapla(int a, int b) { return a + b; }\npublic double Hesapla(int a, int b) { return (double)(a + b); }`,
    options: [
      'Sorunsuz derlenir çünkü dönüş tipleri farklıdır.',
      'Derleyici CS0111 hatası verir çünkü metot imzaları tamamen aynıdır.',
      'Sadece çalışma zamanında (runtime) hata verir.',
      'İkinci metot ilk metodu override eder.',
    ],
    correctIndex: 1,
    explanation:
      'Her iki metodun adı "Hesapla", parametre sayısı 2 ve tipleri (int, int) olduğundan metot imzaları birebir aynıdır. Geri dönüş tipi imzaya dahil olmadığı için derleyici "CS0111: Type already defines a member called Hesapla with the same parameter types" hatası fırlatır.',
  },
  {
    id: 3,
    question: 'Out parametresi ile Ref parametresi arasındaki en temel fark hangisidir?',
    options: [
      'Out parametresi yalnızca string türünde çalışır.',
      'Out parametresinde çağrı öncesi ilk değer atanması zorunlu değildir, ref parametresinde ise zorunludur.',
      'Ref parametresi değer tiplerinde kullanılamaz.',
      'out parametresi ham bellek adresi olarak aktarılır.',
    ],
    correctIndex: 1,
    explanation:
      'ref değişkeni çağrıdan önce atanmış olmalıdır. out argümanının çağrıdan önce atanması gerekmez; metot normal döndüğünde out parametresine mutlaka değer atanmış olmalıdır.',
  },
  {
    id: 4,
    question: 'Aşağıdaki "out" kullanımı neden derleme hatası (CS0177) verir?',
    codeSnippet: `public int Test(int x, out int sonuc)\n{\n    if (x > 10)\n    {\n        sonuc = x * 2;\n        return sonuc;\n    }\n    return 0; // Hata!\n}`,
    options: [
      'x değişkeni out olmalıdır.',
      'x <= 10 durumunda metot normal dönerken "sonuc" out parametresine değer atanmamıştır.',
      'return türü void olmak zorundadır.',
      'out parametresi ile return değeri aynı anda kullanılamaz.',
    ],
    correctIndex: 1,
    explanation:
      'C# derleyicisi out parametresine normal dönüş yollarının tamamında değer atanmasını şart koşar. x <= 10 durumunda metot sonuc atamadan döndüğü için CS0177 derleme hatası oluşur.',
  },
  {
    id: 5,
    question: 'C# 7.0 ile gelen "Inline Out Variable" özelliği hangi sözdizimine izin verir?',
    codeSnippet: `// Örnek çağrı:\ninstance.Toplam(4, 8, out int toplam);`,
    options: [
      'Değişkeni önceden "int toplam;" diye tanımlamaya gerek kalmadan, doğrudan metot çağrısı parantezi içinde deklare etmeye.',
      'Toplam fonksiyonunun gövdesini lambda ifadesine dönüştürmeye.',
      'Birden fazla return ifadesini tek satıra yazmaya.',
      'Metodun private olmasını engellemeye.',
    ],
    correctIndex: 0,
    explanation:
      'C# 7.0 öncesinde `int toplam; instance.Toplam(4, 8, out toplam);` şeklinde iki satır gerekiyordu. C# 7.0 ile birlikte `out int toplam` veya `out var toplam` yazarak değişkeni tam çağrı noktasında yerinde tanımlayabiliyoruz.',
  },
];
