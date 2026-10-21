# C# While ve Foreach Döngüleri Rehberi

Enes Öztürk tarafından hazırlanan, `while` ve `foreach` döngülerini örnekler, görselleştirmeler ve alıştırmalarla anlatan etkileşimli Türkçe eğitim uygulaması.

## İçerik

- `while` koşul döngüsü ve adım adım akış simülasyonu
- `foreach` ile koleksiyon elemanlarını gezme ve değerleri toplama
- `while`, `foreach` ve klasik `for` karşılaştırması
- Parametreleri değiştirilebilir örnek laboratuvarı, ipuçları ve kısa test

## Teknolojiler

- React 19 ve TypeScript
- Vite ve Tailwind CSS
- Lucide React ve Canvas Confetti

## Gereksinimler

- Node.js 20.19+ veya 22.12+
- npm

## Kurulum ve çalıştırma

Bu klasörde komutları çalıştırın:

```bash
npm install
npm run dev
```

Vite geliştirme sunucusu varsayılan olarak `http://localhost:3000` adresinde açılır.

## Denetim ve üretim derlemesi

```bash
npm run lint
npm run build
npm run preview
```

`npm run lint`, TypeScript denetimini; `npm run build`, üretim derlemesini çalıştırır. `npm run preview`, derleme çıktısını yerel olarak sunar.

## Kapsam ve doğruluk

Görselleştiriciler ve laboratuvar, örnek C# kodunun beklenen adımlarını ve çıktısını tarayıcıdaki simülasyonlarla gösterir; C# derleyicisi veya CLR çalıştırmaz. `foreach` iterasyon değişkenine doğrudan yeniden atama yapılamaz; bu kısıtlama, başvurulan nesnenin üyelerini değiştirmekle aynı şey değildir.

Laboratuvar, arayüz ve çalışma süresini korumak için en fazla 50 `while` adımı ve en fazla 10 adet 32 bit tam sayılık `foreach` girdisi simüle eder; dizi toplamı da `int` aralığında olmalıdır.

## Telif ve kullanım

© 2026 Enes Öztürk. **Tüm hakları saklıdır.** Bu depo inceleme amacıyla herkese açıktır; açık kaynak lisansı verilmemiştir. İçeriği çoğaltmak, değiştirmek veya yeniden dağıtmak için hak sahibinden izin alın.
