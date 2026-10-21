# C# Değişkenler ve Veri Tipleri Kılavuzu

**Enes Öztürk tarafından hazırlanan** Türkçe ve etkileşimli C# eğitim rehberi. Değişken tanımlama, temel veri tipleri, `DateTime` ve `String` kullanımı konularını örnekler, görsel açıklamalar ve kısa sınavlarla anlatır.

## İçerik

- Değişkenler ve temel C# türleri için başvuru kataloğu
- Değişken adlandırma kuralları ve etkileşimli doğrulayıcı
- `DateTime` özellikleri, biçimlendirme ve tarih işlemleri
- `String` metotları ve örnekleri
- Tarayıcıda çalışan C# kod ve konsol gösterimleri
- Öğrenilenleri pekiştiren bilgi testi

## Teknolojiler

- React 19 ve TypeScript
- Vite
- Tailwind CSS
- Lucide React

## Gereksinimler

- Node.js 20.19+ veya 22.12+
- npm

## Kurulum ve geliştirme

```bash
npm install
npm run dev
```

Vite geliştirme sunucusu `http://localhost:3000` adresinde açılır.

## Denetim ve derleme

```bash
npm run lint
npm run build
npm run preview
```

`npm run lint`, TypeScript denetimini; `npm run build`, üretim derlemesini çalıştırır. `npm run preview`, üretim çıktısını yerel olarak sunar.

## Teknik doğruluk notu

Tarayıcıdaki konsol ve değişken doğrulama araçları eğitim amaçlı arayüz simülasyonlarıdır; C# derleyicisi çalıştırmaz. CLR'de değer türü/referans türü sınıflandırması, tek başına bir değişkenin her koşulda Stack veya Heap'te tutulduğunu göstermez. Gerçek bellek yerleşimi değişkenin bulunduğu yapıya ve çalışma zamanına bağlıdır; örneklerde verilen tür boyutları toplam nesne veya koleksiyon maliyeti değildir.

## Telif ve kullanım

© 2026 Enes Öztürk. **Tüm hakları saklıdır.** Bu depo inceleme ve görüntüleme için herkese açıktır; açık kaynak lisansı verilmemiştir. İçeriğin çoğaltılması, değiştirilmesi veya yeniden dağıtılması için hak sahibinden izin alın.
