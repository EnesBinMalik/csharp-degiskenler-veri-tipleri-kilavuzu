export const authorData = {
  name: "Enes Öztürk",
  role: "İçerik hazırlayıcısı",
  title: "C# İleri Düzey Metot Mimarisi",
  bio: "Bu uygulamadaki C# extension metotları ve rekürsif algoritmalar eğitim içeriğini hazırladı.",
  quote: "Bir metodun gücü, ne kadar çok satır kod içerdiğinde değil; karmaşık bir problemi ne kadar yalın, genişletilebilir ve bellek dostu çözdüğünde yatar.",
  tips: [
    "Extension metot yazarken orijinal tipi kirletmemeye ve metodun amacını açıkça ifade eden fiiller seçmeye özen gösterin.",
    "Rekürsif fonksiyonda taban durumunun erişilebilir olduğunu ve her çağrının probleme yaklaşmasını doğrulayın.",
    "Derin rekürsiyonda çağrı yığını tüketimi artabilir. .NET kuyruk çağrı optimizasyonunu her durumda garanti etmediğinden, derin veya sınırsız girdiler için iteratif alternatifleri değerlendirin.",
    "Referans türlerine ait extension metotlar null alabilir; null kabul edilmiyorsa bunu açıkça doğrulayın."
  ]
};

export const extensionTheory = {
  title: "Extension (Genişletilmiş) Metot Kullanımı",
  subtitle: "C# 3.0 ile Hayatımıza Giren Akıcı ve Yeniden Kullanılabilir Mimari",
  introduction: "C# 3.0 ile gelen geleneksel extension metotlar, bir tipin kaynak kodunu değiştirmeden veya ondan miras almadan, o tipin değerleri üzerinde üye metot gibi çağrılabilen static yardımcı metotlar yazmayı sağlar. Çağrı sözdizimi kolaylık sunar; metot gerçekte genişletilen tipe üye olarak eklenmez.",
  rules: [
    {
      ruleNumber: 1,
      name: "Static Class Zorunluluğu",
      description: "Bu rehberde gösterilen geleneksel extension metotlar, iç içe olmayan ve generic olmayan bir static sınıfta tanımlanır.",
      code: "public static class MyExtensionClass { ... }"
    },
    {
      ruleNumber: 2,
      name: "Static Metot Bildirimi",
      description: "Geleneksel extension metot bildirimi de static olmalıdır. Extension metotlar CLR tarafından instance metot olarak tanınmaz; derleyicinin sunduğu çağrı sözdizimidir.",
      code: "public static bool IsEvenNumber(...) { ... }"
    },
    {
      ruleNumber: 3,
      name: "İlk Parametrede Tek 'this' Anahtar Kelimesi",
      description: "Extension metodunda tanımlı parametrelerden sadece 1 tanesi 'this' ile tanımlanabilir. Bu parametre, metodun hangi veri tipine ekleneceğini (genişletileceğini) belirtir.",
      code: "public static bool IsEvenNumber(this int value)"
    }
  ],
  promptExampleCode: `public static class MyExtensionClass
{
    public static bool IsEvenNumber(this int value)
    {
        if(value % 2 == 0)
            return true;
        else
            return false;
    }
}`,
  usageExample: `int deger = 123;
bool isEven = deger.IsEvenNumber(); // false döner
// Geleneksel extension çağrısı şu static metoda eşdeğer olarak çözümlenir:
// bool isEven = MyExtensionClass.IsEvenNumber(deger);`,
  workflow: [
    "1. Adım: Öncelikle istenilen işi yapacak olan normal bir metot yazın ve algoritmanızı test edin.",
    "2. Adım: İlgili sınıfı ve metodu 'static' anahtar kelimesi ile güncelleyin.",
    "3. Adım: Genişletilecek veri tipine bağlı ilk parametrenin başına 'this' anahtar kelimesini ekleyin.",
    "4. Adım: Artık genişletilen veri tipine ait her değişkenin arkasından nokta (.) koyduğunuzda Intellisense menüsünde metodunuz görünecektir!"
  ],
  bestPractices: [
    "Null Güvenliği: Referans türlerine ait extension metotlar null alabilir; null kabul edilmiyorsa bunu açıkça doğrulayın.",
    "Aşırı Kullanımdan Kaçının: Her yardımcı metodu extension yapmak yerine gerçekten ilgili tipin doğal bir parçasıymış hissi veren fonksiyonları tercih edin.",
    "Namespace Yönetimi: Extension metot sınıflarınızı mantıklı namespace'ler altında toplayarak sadece ihtiyaç duyulan dosyalarda 'using' ile çağırın."
  ]
};

export const recursionTheory = {
  title: "Rekürsif (Yinelemeli) Metot Kullanımı",
  subtitle: "Kendi Kendini Çağıran Fonksiyonlar ve Bellek Yönetimi",
  introduction: "Rekürsif metotlar kendilerini daha küçük alt problemlerde çağırır. Ağaç dolaşımı ve böl-ve-yönet algoritmaları gibi problemlerde yalın çözümler sunabilir; uygun yaklaşım problem, girdi boyutu ve çağrı derinliğine bağlıdır.",
  mechanics: [
    {
      title: "Kendi Kendini Çağırma (Self-Invocation)",
      text: "Rekürsif bir metot, daha küçük bir alt problemi çözmek için kendisini çağırır. Bazı problemlerde bu yaklaşım döngüsel çözüme göre daha okunaklı olabilir."
    },
    {
      title: "Taban Koşulu (Base Condition)",
      text: "Her çağrı zincirinin sonlanmasını sağlayan bir taban durumu veya başka bir durma koşulu bulunmalıdır. Koşulun erişilebilir olması ve her adımda çözüme yaklaşılması gerekir."
    },
    {
      title: "Çağrı Derinliği ve Yığın Sınırları",
      text: "Sonlanmayan veya çok derin çağrı zincirleri, çalışma ortamının çağrı yığını sınırını aşarak StackOverflowException gibi ciddi bir hataya yol açabilir. Gerçek sınır platforma, iş parçacığına ve çağrıların özelliklerine bağlıdır; bu nedenle sabit bir bayt sayısı ya da her çağrı için sabit çerçeve boyutu varsayılamaz."
    }
  ],
  fibonacciCode: `static int FibonacciSerisi(int sayi)
{
    if (sayi == 0)
        return 0;
    else if (sayi == 1)
        return 1;
    else
        return FibonacciSerisi(sayi - 1) + FibonacciSerisi(sayi - 2);
}`,
  callStackExplanation: "FibonacciSerisi(3) çağrıldığında:\n1. FibonacciSerisi(3) çağrılır.\n2. Fib(2) ve Fib(1) çağrıları yapılır.\n3. Fib(2), Fib(1) ve Fib(0) çağrılarını yapar.\n4. Taban koşullarına ulaşıldığında sonuçlar geri döner. Görselleştirme bu çağrı akışının kavramsal modelidir; gerçek CLR yığınını ölçmez.",
  paperExerciseAdvice: "Aşağıdaki örneği inceleyerek ve hatta kağıt üzerinde yazarak yinelemeli fonksiyonların kullanımını ve dallanma ağacını çok daha iyi oturtabilirsiniz."
};
