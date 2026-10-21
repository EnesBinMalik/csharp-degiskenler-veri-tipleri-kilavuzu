# C# Metotlar ve Bellek Simülatörü

Enes Öztürk tarafından hazırlanan, C# metotlarını, parametre aktarımını, `ref` kullanımını ve değişken kapsamını etkileşimli örneklerle anlatan Türkçe eğitim uygulaması.

## İçerik

- Metot bildirimi, parametreler, dönüş değerleri ve `void`
- Değer türlerinin varsayılan değerle aktarımı ve `ref` parametreleri
- Adım adım metot çağrısı simülasyonu
- Örnek kod laboratuvarı ve bilgi testi

## Teknolojiler

- React 19 ve TypeScript
- Vite ve Tailwind CSS
- Lucide React ve Motion

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

Bu uygulamadaki kod, bellek çizimleri ve konsol çıktıları eğitim amaçlı tarayıcı simülasyonlarıdır; C# derleyicisi veya .NET çalışma zamanı çalıştırmaz. Simülasyondaki çerçeveler, adresler ve bellek hücreleri gerçek çalışma zamanı yerleşimini, fiziksel adresleri veya bellek kullanımını göstermez.

C#'ta parametreler varsayılan olarak değerle aktarılır: değer türlerinde değer kopyalanır, referans türlerinde ise nesne başvurusu kopyalanır. `ref`, çağıranın değişkenini metoda başvuru olarak iletir; ham bellek adresi veya C# işaretçisi aktarımı anlamına gelmez. Metot içindeki yerel değişkenlerin kapsamı kaynak kodla belirlenir; derleyici ve çalışma zamanı değerleri saklama veya optimize etme biçimini değiştirebilir. Bu nedenle her yerel değişkenin mutlaka fiziksel Stack'te bulunduğu ya da metottan çıkışta RAM'den anında silindiği sonucu çıkarılmamalıdır.

## Telif ve kullanım

© 2026 Enes Öztürk. Bu depoda açık kaynak lisansı belirtilmemiştir; herkese açık olması, içeriğin yeniden kullanımına ilişkin ek bir lisans verildiği anlamına gelmez.
