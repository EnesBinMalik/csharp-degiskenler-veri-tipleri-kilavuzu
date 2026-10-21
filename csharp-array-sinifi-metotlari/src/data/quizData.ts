import { QuizQuestion } from '../types/arrayTypes';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: 'Array.Clear Sonrası Dizi Durumu',
    csharpCode: `int[] sayiDizisi = { 1, 3, 4, 9, 8, 7 };
Array.Clear(sayiDizisi, 2, 2);`,
    initialArray: [1, 3, 4, 9, 8, 7],
    dataType: 'int',
    question: 'Yukarıdaki kod çalıştırıldıktan sonra sayiDizisi elemanları nasıl olur?',
    options: [
      '{ 1, 3, 0, 0, 8, 7 }',
      '{ 1, 3, 8, 7 }',
      '{ 0, 0, 4, 9, 8, 7 }',
      '{ 1, 3, null, null, 8, 7 }'
    ],
    correctIndex: 0,
    explanation: 'Array.Clear(sayiDizisi, 2, 2) komutu 2. indeksten (yani 4 değerinden) başlayarak 2 adet elemanı (4 ve 9) int tipinin varsayılan değeri olan 0 yapar. Dizi boyutu küçülmez!',
    relatedMethod: 'Clear'
  },
  {
    id: 2,
    title: 'Array.Reverse Mantığı',
    csharpCode: `int[] sayiDizisi = { 1, 3, 4, 9, 8, 7 };
Array.Reverse(sayiDizisi);`,
    initialArray: [1, 3, 4, 9, 8, 7],
    dataType: 'int',
    question: 'Array.Reverse uygulandığında dizi sıralaması hangisi olur?',
    options: [
      '{ 7, 8, 9, 4, 3, 1 }',
      '{ 9, 8, 7, 4, 3, 1 }',
      '{ 1, 3, 4, 7, 8, 9 }',
      '{ 7, 9, 8, 4, 3, 1 }'
    ],
    correctIndex: 0,
    explanation: 'Array.Reverse sıralama (sort) yapmaz! Sadece diziyi ortasından aynalayarak ilk eleman ile son elemanı yer değiştirir. Bu yüzden { 1, 3, 4, 9, 8, 7 } -> { 7, 8, 9, 4, 3, 1 } haline gelir.',
    relatedMethod: 'Reverse'
  },
  {
    id: 3,
    title: 'Array.IndexOf Olmayan Eleman Araması',
    csharpCode: `int[] sayiDizisi = { 1, 3, 4, 9, 8, 7 };
int sonuc = Array.IndexOf(sayiDizisi, 42);`,
    initialArray: [1, 3, 4, 9, 8, 7],
    dataType: 'int',
    question: 'Dizide bulunmayan 42 sayısı için Array.IndexOf ne döndürür?',
    options: [
      '-1',
      '0',
      'IndexOutOfRangeException hatası verir',
      'null'
    ],
    correctIndex: 0,
    explanation: 'C# dilinde Array.IndexOf aranan değeri dizide bulamadığında hata fırlatmaz, standart olarak -1 değerini döndürür.',
    relatedMethod: 'IndexOf'
  },
  {
    id: 4,
    title: 'Array.Resize ile Diziyi Büyütme',
    csharpCode: `int[] sayiDizisi = { 1, 3, 4, 9, 8, 7 };
Array.Resize<int>(ref sayiDizisi, 8);`,
    initialArray: [1, 3, 4, 9, 8, 7],
    dataType: 'int',
    question: '6 elemanlı dizi 8 elemana çıkarıldığında yeni eklenen son iki elemanın (6. ve 7. index) değeri ne olur?',
    options: [
      '0 ve 0',
      'null ve null',
      'Rastgele bellek çöp değerleri (garbage)',
      '7 ve 7 (son elemanı kopyalar)'
    ],
    correctIndex: 0,
    explanation: 'Array.Resize ile büyütülen int dizilerinde yeni açılan hücrelere sayısal değer türünün varsayılanı olan 0 otomatik atanır.',
    relatedMethod: 'Resize'
  },
  {
    id: 5,
    title: 'Array.Resize Neden "ref" Parametresi Alır?',
    csharpCode: `Array.Resize<int>(ref sayiDizisi, 10);`,
    initialArray: [1, 3, 4, 9, 8, 7],
    dataType: 'int',
    question: 'Array.Resize metodunda "ref" anahtar kelimesinin kullanılmasının asıl sebebi nedir?',
    options: [
      'Diziler Heap\'te sabit boyutludur; yeni bir dizi oluşturulup referansı bu değişkene aktarılmalıdır.',
      'Sadece C# derleyicisinin hızını arttırmak için kullanılan isteğe bağlı bir ektir.',
      'Dizinin RAM\'deki aynı bellek bloğunu genişletmesini sağlamak için.',
      'Değişkeni Stack yerine Heap\'e taşımak için.'
    ],
    correctIndex: 0,
    explanation: 'Dizi örneğinin uzunluğu değiştirilemez. Array.Resize yeni uzunlukta bir dizi oluşturur, sığan elemanları kopyalar ve ref parametresiyle çağıranın dizi değişkenini yeni örneğe atar. Fiziksel bellek adresi bu işlem için önemli değildir.',
    relatedMethod: 'Resize'
  },
  {
    id: 6,
    title: 'Büyükten Küçüğe Sıralama',
    csharpCode: `int[] sayiDizisi = { 1, 3, 4, 9, 8, 7 };
Array.Sort(sayiDizisi);
Array.Reverse(sayiDizisi);`,
    initialArray: [1, 3, 4, 9, 8, 7],
    dataType: 'int',
    question: 'Önce Sort sonra Reverse çağrıldığında sayiDizisi nasıl bir sonuç verir?',
    options: [
      '{ 9, 8, 7, 4, 3, 1 } (Büyükten küçüğe sıralı)',
      '{ 7, 8, 9, 4, 3, 1 }',
      '{ 1, 3, 4, 7, 8, 9 }',
      '{ 9, 7, 8, 4, 3, 1 }'
    ],
    correctIndex: 0,
    explanation: 'Array.Sort diziyi küçükten büyüğe {1, 3, 4, 7, 8, 9} yapar. Hemen ardından Array.Reverse çağrıldığında dizi tersyüz edilerek {9, 8, 7, 4, 3, 1} yani büyükten küçüğe sıralanmış olur.',
    relatedMethod: 'Sort'
  },
  {
    id: 7,
    title: 'String Dizisinde Array.Sort',
    csharpCode: `string[] meyveler = { "Elma", "Muz", "Armut", "Çilek" };
Array.Sort(meyveler);`,
    initialArray: ['Elma', 'Muz', 'Armut', 'Çilek'],
    dataType: 'string',
    question: 'String bir dizide Array.Sort nasıl sıralama yapar?',
    options: [
      'Alfabetik olarak A\'dan Z\'ye sıralar.',
      'Kelimelerin harf uzunluklarına göre sıralar.',
      'Sıralama yapmaz, hata verir.',
      'Sadece Türkçe karakterleri sona atar.'
    ],
    correctIndex: 0,
    explanation: 'Array.Sort string dizilerinde alfabetik olarak A\'dan Z\'ye sıralama uygular.',
    relatedMethod: 'Sort'
  }
];
