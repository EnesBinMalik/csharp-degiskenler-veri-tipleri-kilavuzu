# C# Dizi ve Bellek Laboratuvarı

Enes Öztürk tarafından hazırlanan, C# dizilerini, sıfır tabanlı indekslemeyi, temel bellek kavramlarını ve dizi algoritmalarını etkileşimli örneklerle anlatan Türkçe eğitim uygulaması.

## İçerik

- C# dizilerinde indeksleme ve hücre değerlerini inceleme
- Dizi oluşturma biçimleri ve sabit uzunluk kavramı
- Geçerli/geçersiz indekslerle `IndexOutOfRangeException` örneği
- `for` döngüsüyle toplam ve ortalama simülasyonu
- Min/max bulma, doğrusal arama, ters çevirme ve çift sayıları filtreleme
- Konu değerlendirme testi

## Teknolojiler

- React 19 ve TypeScript
- Vite ve Tailwind CSS
- Lucide React

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

Bu uygulamadaki bellek çizimleri, konsol çıktıları ve algoritma laboratuvarları eğitim amaçlı tarayıcı simülasyonlarıdır; C# kodunu veya .NET çalışma zamanını çalıştırmaz. Şematik hücreler gerçek RAM adreslerini, CLR nesne yerleşimini veya dizinin toplam bellek maliyetini göstermez. `string[]` dizilerinde hücreler metin içeriğini değil string başvurularını tutar.

C# dizilerinin uzunluğu örnek oluşturulurken belirlenir ve oluşturulduktan sonra değiştirilemez. Uygulama; bellek adresi, işletim sistemi veya gerçek bir derleyici/çalışma zamanı davranışı hakkında ölçüm iddiasında bulunmaz.

## Telif ve kullanım

© 2026 Enes Öztürk. **Tüm hakları saklıdır.** Bu depo inceleme amacıyla herkese açıktır; açık kaynak lisansı verilmemiştir. İçeriği çoğaltmak, değiştirmek veya yeniden dağıtmak için hak sahibinden izin alın.
