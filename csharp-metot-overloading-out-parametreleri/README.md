# C# Metot Overloading ve Out Parametreleri

Enes Öztürk tarafından hazırlanan, C# metot aşırı yükleme kurallarını, metot imzalarını ve `out`/`ref` parametrelerini etkileşimli örneklerle anlatan Türkçe eğitim uygulaması.

## İçerik

- Metot overloading örnekleri ve aşırı yükleme çözümlemesi
- Metot imza kuralları ve örnek doğrulayıcı
- `out` ve `ref` parametrelerinin karşılaştırması
- `int.TryParse` ve çoklu `out` örnekleri
- Önceden tanımlanmış örnek çıktıları gösteren tarayıcı konsolu
- Bilgi testi ve ödev teslim metni oluşturucu

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

Bu uygulamadaki doğrulayıcı, simülatörler ve konsol eğitim amaçlı tarayıcı arayüzleridir; C# derleyicisi veya .NET çalışma zamanı çalıştırmaz. Konsoldaki sonuçlar önceden tanımlanmış örnek çıktılardır.

C# metot imzası; metot adını, tür parametre sayısını ve parametrelerin tür/sıra/geçirme biçimi bilgilerini kapsar. Parametre adları ve dönüş türü imzayı ayırt etmez; yalnızca dönüş türünü farklılaştırarak overload yapılamaz. `ref` ile `out` da tek başına overload farkı oluşturamaz. `out` argümanının çağrı öncesi atanmış olması gerekmez; normal dönüş yollarının tamamında metoda ait `out` parametresine değer atanmış olmalıdır. `ref` argümanı ise çağrıdan önce atanmış olmalı, metot içinde okunabilir ve değiştirilebilir.

`ref` ve `out` çağıranın değişkenine dil düzeyinde başvuru sağlar; ham bellek adresi veya C# işaretçisi değildir. Bellek diyagramları kavramsaldır, gerçek Stack/Heap yerleşimini, RAM adreslerini veya fiziksel bellek davranışını göstermez.

## Telif ve kullanım

© 2026 Enes Öztürk. Bu depoda açık kaynak lisansı belirtilmemiştir; herkese açık olması, içeriğin yeniden kullanımına ilişkin ek bir lisans verildiği anlamına gelmez.
