import { MethodInfo } from '../types/arrayTypes';

export const METHOD_GUIDES: Record<string, MethodInfo> = {
  Sort: {
    key: 'Sort',
    name: 'Array.Sort',
    signature: 'public static void Sort(Array array)',
    shortDesc: 'Dizi elemanlarını küçükten büyüğe veya alfabetik olarak sıralar.',
    fullDesc: 'Dizi elemanlarını türlerinin varsayılan karşılaştırıcısına göre sıralar. Sayısal değerler artan sırada düzenlenir; metinlerin karşılaştırma davranışı kullanılan karşılaştırıcıya ve kültür ayarlarına bağlı olabilir.',
    syntax: 'Array.Sort(sayiDizisi);',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'Uygulamaya bağlı yardımcı bellek',
    promptExampleCode: `int[] sayiDizisi = { 1, 3, 4, 9, 8, 7 };

// Diziyi küçükten büyüğe sıralar
Array.Sort(sayiDizisi);

// Sonuç: { 1, 3, 4, 7, 8, 9 }
foreach (var sayi in sayiDizisi)
{
    Console.WriteLine(sayi);
}`,
    sampleArray: [1, 3, 4, 9, 8, 7],
    sampleType: 'int',
    parameters: [
      { name: 'array', type: 'Array', description: 'Sıralanacak olan 1 boyutlu hedef dizi' }
    ],
    keyPoints: [
      'Sayısal dizilerde (int, double, float) küçükten büyüğe sıralama yapar.',
      'Metin sıralama davranışı karşılaştırıcıya ve kültür ayarlarına bağlıdır.',
      'C# metodu verilen diziyi değiştirir; bu laboratuvar sonucu tarayıcı simülasyonunda gösterir.',
      'Büyükten küçüğe sıralamak için önce Array.Sort() ardından Array.Reverse() kombinasyonu sıkça kullanılır.'
    ],
    notes: 'Ayrıca overload metotları ile belirli bir index aralığını sıralamak da mümkündür: Array.Sort(dizi, index, count);'
  },

  Clear: {
    key: 'Clear',
    name: 'Array.Clear',
    signature: 'public static void Clear(Array array, int index, int length)',
    shortDesc: 'Belirtilen aralıktaki elemanları tipin varsayılan (default) değerine sıfırlar.',
    fullDesc: 'Dizinin belirtilen elemanlarını ilgili türün varsayılan değerine getirir. Sayısal değer türlerinde 0; referans türlerinde null kullanılır. Dizi boyutunu değiştirmez, yalnızca seçilen hücre değerlerini sıfırlar.',
    syntax: 'Array.Clear(sayiDizisi, index, count);',
    timeComplexity: 'O(length)',
    spaceComplexity: 'O(1) - ek alan kullanmaz',
    promptExampleCode: `int[] sayiDizisi = { 1, 3, 4, 9, 8, 7 };

// 2. indexten başlayarak 2 tane elemanı temizler (0 yapar)
Array.Clear(sayiDizisi, 2, 2);

// Başlangıç: { 1, 3, 4, 9, 8, 7 }
// 2. indexteki 4 ve 3. indexteki 9 temizlenir.
// Sonuç:     { 1, 3, 0, 0, 8, 7 }`,
    sampleArray: [1, 3, 4, 9, 8, 7],
    sampleType: 'int',
    parameters: [
      { name: 'array', type: 'Array', description: 'Elemanları temizlenecek hedef dizi' },
      { name: 'index', type: 'int', description: 'Temizleme işleminin başlayacağı sıfır tabanlı başlangıç indeksi' },
      { name: 'length', type: 'int', description: 'Kaç adet elemanın temizleneceği (adet sayısı)' }
    ],
    keyPoints: [
      'Dizinin uzunluğunu (Length) değiştirmez.',
      'Sayısal tiplerde (int) -> 0 değerini atar.',
      'Referans tiplerinde (string, object) -> null değerini atar.',
      'Mantıksal tiplerde (bool) -> false değerini atar.',
      'index + length dizi boyutunu aşarsa IndexOutOfRangeException fırlatır.'
    ],
    notes: 'Dizideki tüm elemanları bir kerede sıfırlamak için: Array.Clear(dizi, 0, dizi.Length);'
  },

  Reverse: {
    key: 'Reverse',
    name: 'Array.Reverse',
    signature: 'public static void Reverse(Array array)',
    shortDesc: 'Dizinin elemanlarını tersine çevirir (aynayı tutmuş gibi).',
    fullDesc: 'Dizinin ortasını belirleyerek elemanlarını aynalar gibi düşünebilirsiniz. Yani dizinin ilk elemanı ile son elemanını, ikinci elemanı ile sondan bir öncekini yer değiştirir (swap eder). Bu sayede dizinin sırası baştan sona tamamen tersine döner.',
    syntax: 'Array.Reverse(sayiDizisi);',
    timeComplexity: 'O(N / 2) -> O(N)',
    spaceComplexity: 'O(1) - C# metodu ek dizi oluşturmaz',
    promptExampleCode: `int[] sayiDizisi = { 1, 3, 4, 9, 8, 7 };

// Diziyi tersine çevirir
Array.Reverse(sayiDizisi);

// Başlangıç: { 1, 3, 4, 9, 8, 7 }
// Sonuç:     { 7, 8, 9, 4, 3, 1 }`,
    sampleArray: [1, 3, 4, 9, 8, 7],
    sampleType: 'int',
    parameters: [
      { name: 'array', type: 'Array', description: 'Tersyüz edilecek 1 boyutlu hedef dizi' }
    ],
    keyPoints: [
      'Diziyi sıralamaz (sort etmez), sadece mevcut dizilimi ters çevirir.',
      'İlk eleman sonuncu olur, sonuncu ilk eleman olur.',
      'Büyükten küçüğe sıralamak istiyorsanız önce Array.Sort(), hemen ardından Array.Reverse() çağırabilirsiniz.',
      'Belirli bir aralığı ters çevirmek için overload mevcuttur: Array.Reverse(dizi, index, length);'
    ],
    notes: 'Dizinin boyutu tek sayıysa ortadaki eleman kendi yerinde kalır, diğer elemanlar aynalanır.'
  },

  IndexOf: {
    key: 'IndexOf',
    name: 'Array.IndexOf',
    signature: 'public static int IndexOf(Array array, object? value)',
    shortDesc: 'Aranan elemanın ilk bulunduğu indeksi döndürür. Bulunamazsa -1 döner.',
    fullDesc: 'Verilen dizinin içerisinde belirtilen elemanı baştan sona (doğrusal arama - Linear Search) arar ve bulduğu ilk elemanın sıfır tabanlı indeksini getirir. Eğer dizi içerisinde eleman bulunamazsa -1 döner.',
    syntax: 'int bulunanIndex = Array.IndexOf(sayiDizisi, 7);',
    timeComplexity: 'O(N) - Linear Search',
    spaceComplexity: 'O(1)',
    promptExampleCode: `int[] sayiDizisi = { 1, 3, 4, 9, 8, 7 };

// 7 değerini arar
int index = Array.IndexOf(sayiDizisi, 7);
Console.WriteLine(index); // Çıktı: 5

// Dizide bulunmayan bir değer arandığında
int bulunamayan = Array.IndexOf(sayiDizisi, 99);
Console.WriteLine(bulunamayan); // Çıktı: -1`,
    sampleArray: [1, 3, 4, 9, 8, 7],
    sampleType: 'int',
    parameters: [
      { name: 'array', type: 'Array', description: 'İçinde arama yapılacak 1 boyutlu dizi' },
      { name: 'value', type: 'object', description: 'Dizide aranacak hedef değer' }
    ],
    keyPoints: [
      'Arama işlemi dizinin 0. indeksinden başlar.',
      'Değer birden fazla geçiyorsa İLK karşılaşılan indeks döner.',
      'Eğer aranan eleman dizide yoksa kesinlikle -1 döner (hata fırlatmaz).',
      'Belirli bir indexten sonra aramak için: Array.IndexOf(dizi, deger, baslangicIndex);'
    ],
    notes: 'Sondan başa doğru ilk eşleşmeyi bulmak için Array.LastIndexOf() kullanılır.'
  },

  Resize: {
    key: 'Resize',
    name: 'Array.Resize<T>',
    signature: 'public static void Resize<T>(ref T[]? array, int newSize)',
    shortDesc: 'Diziyi yeniden boyutlandırır (yeni heap alanı tahsis ederek). ref parametresi ile çalışır.',
    fullDesc: 'Dizi örneğinin uzunluğu oluşturulduktan sonra değiştirilemez. Array.Resize uzunluk değiştiğinde hedef uzunlukta yeni bir dizi oluşturur, sığan elemanları kopyalar ve ref parametresi aracılığıyla çağıranın dizi değişkenini yeni diziye atar. Büyütme sırasında yeni hücreler türün varsayılan değerini alır; küçültmede son elemanlar kopyalanmaz.',
    syntax: 'Array.Resize<int>(ref sayiDizisi, yeniBoyut);',
    timeComplexity: 'O(min(oldSize, newSize))',
    spaceComplexity: 'O(newSize) - Yeni bellek bloğu açılır',
    promptExampleCode: `int[] sayiDizisi = { 1, 3, 4, 9, 8, 7 };

// 1) 6 elemanlı diziyi 12 elemanlı hale getirme:
Array.Resize<int>(ref sayiDizisi, 12);
sayiDizisi[6] = 10;
// Dizi artık: { 1, 3, 4, 9, 8, 7, 10, 0, 0, 0, 0, 0 }

// 2) Diziyi 3 elemana küçültme:
Array.Resize<int>(ref sayiDizisi, 3);
// Sondaki elemanlar kırpıldı.
// Dizi artık: { 1, 3, 4 }`,
    sampleArray: [1, 3, 4, 9, 8, 7],
    sampleType: 'int',
    parameters: [
      { name: 'array (ref)', type: 'ref T[]', description: 'Referansı değiştirilecek hedef dizi (ref ile verilmelidir)' },
      { name: 'newSize', type: 'int', description: 'Dizinin sahip olacağı yeni eleman sayısı' }
    ],
    keyPoints: [
      'ref, çağıranın dizi değişkeninin yeni diziye atanmasını sağlar; fiziksel adres göstermez.',
      'Büyütüldüğünde: Yeni eklenen hücreler int için 0, string için null değerini alır.',
      'Küçültüldüğünde: Sondaki elemanlar kesilir/atılır.',
      'Sık sık boyut değiştiren koleksiyonlar için List<T> kullanılması C# mimarisinde tavsiye edilir; çünkü Array.Resize her defasında yeni bir dizi kopyalama maliyeti üretir.'
    ],
    notes: 'Enes Öztürk İpucu: Array.Resize metodunu çağırırken generic tip belirtmek <int> tip güvenliğini sağlar.'
  },

  BinarySearch: {
    key: 'BinarySearch',
    name: 'Array.BinarySearch',
    signature: 'public static int BinarySearch(Array array, object? value)',
    shortDesc: 'Sıralı dizilerde ikili arama (O(log N)) ile çok hızlı arama yapar.',
    fullDesc: 'İkili arama ile aranan elemanın indeksini bulur. Dizi, aynı karşılaştırıcıya göre önceden sıralanmış olmalıdır. Değer bulunmazsa sonucun bitsel tümleyeni olan negatif ekleme noktası döndürülür.',
    syntax: 'int index = Array.BinarySearch(sayiDizisi, 8);',
    timeComplexity: 'O(log N) - Muazzam hızlı',
    spaceComplexity: 'O(1)',
    promptExampleCode: `int[] sayiDizisi = { 1, 3, 4, 7, 8, 9 }; // MUTLAKA SIRALI OLMALI

int index = Array.BinarySearch(sayiDizisi, 8);
Console.WriteLine(index); // Çıktı: 4`,
    sampleArray: [1, 3, 4, 7, 8, 9],
    sampleType: 'int',
    parameters: [
      { name: 'array', type: 'Array', description: 'Sıralanmış olan hedef dizi' },
      { name: 'value', type: 'object', description: 'Aranacak değer' }
    ],
    keyPoints: [
      'Dizi, arama sırasında kullanılan karşılaştırıcıyla uyumlu biçimde önceden sıralanmalıdır.',
      'İkili aramanın zaman karmaşıklığı O(log N), doğrusal aramanınki O(N) olur.',
      'Eleman bulunmazsa negatif sonuçtan ekleme noktası `~sonuc` ile elde edilebilir.'
    ]
  },

  Fill: {
    key: 'Fill',
    name: 'Array.Fill<T>',
    signature: 'public static void Fill<T>(T[] array, T value, int startIndex, int count)',
    shortDesc: 'Dizinin tamamını veya belirtilen aralığını tek bir değerle doldurur.',
    fullDesc: 'Dizideki hücreleri tek bir komutla belirlenen bir değerle doldurur. Döngü yazmaya gerek kalmadan hızlıca başlangıç değerleri atamak için idealdir.',
    syntax: 'Array.Fill(sayiDizisi, 5); // Tüm diziyi 5 yapar',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    promptExampleCode: `int[] sayiDizisi = new int[5];

// Tüm hücrelere 99 doldur
Array.Fill(sayiDizisi, 99);
// { 99, 99, 99, 99, 99 }`,
    sampleArray: [0, 0, 0, 0, 0],
    sampleType: 'int',
    parameters: [
      { name: 'array', type: 'T[]', description: 'Doldurulacak dizi' },
      { name: 'value', type: 'T', description: 'Yazılacak sabit değer' }
    ],
    keyPoints: [
      'Dizi tamamını doldurmak için Array.Fill(dizi, deger) overload\'ı kullanılabilir.',
      'Belirli bir aralık için başlangıç indeksi ve adet parametrelerini belirtin.'
    ]
  }
};
