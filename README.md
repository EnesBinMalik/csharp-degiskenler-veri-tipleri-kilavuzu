# C# Değişkenler ve Veri Tipleri Kılavuzu

**Enes Öztürk tarafından hazırlanan** Türkçe ve etkileşimli C# eğitim rehberi. Değişken tanımlama, temel veri tipleri, `DateTime` ve `String` kullanımı konularını örnekler, görsel açıklamalar ve kısa sınavlarla anlatır.

[![Proje doğrulamaları](https://github.com/EnesBinMalik/csharp-degiskenler-veri-tipleri-kilavuzu/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/EnesBinMalik/csharp-degiskenler-veri-tipleri-kilavuzu/actions/workflows/validate.yml)

## İçerik

- Değişkenler ve temel C# türleri için başvuru kataloğu
- Değişken adlandırma kuralları ve etkileşimli doğrulayıcı
- `DateTime` özellikleri, biçimlendirme ve tarih işlemleri
- `String` metotları ve örnekleri
- C# kod örnekleri ve konsol gösterimleri
- Öğrenilenleri pekiştiren bilgi testi
- [C# Tip Dönüşümleri Rehberi](tip-donusumleri-rehberi/README.md): implicit/explicit dönüşümler, Parse/TryParse ve etkileşimli görselleştirmeler
- [Try-Catch-Finally Simülatörü](try-catch-finally-simulator/README.md): istisna akışı, mantıksal hatalar ve kaynak temizleme örnekleri
- [If-Else ve Ternary Laboratuvarı](if-else-ternary-laboratuvari/README.md): koşullu dallanma, ternary ifadeler ve tarayıcı tabanlı akış simülasyonu
- [For Döngüsü, Break ve Continue Rehberi](for-loop-break-continue-rehberi/README.md): `for` döngüsü, akış kontrolü ve tarayıcı tabanlı adım simülasyonu
- [While ve Foreach Döngüleri Rehberi](while-foreach-rehberi/README.md): `while` ve `foreach` döngüleri, simülasyonlar ve pratik testler
- [Dizi ve Bellek Laboratuvarı](dizi-ve-bellek-laboratuvari/README.md): C# dizileri, sıfır tabanlı indeksler, bellek kavramları ve dizi algoritmaları
- [C# ArrayList Rehberi](csharp-arraylist-rehberi/README.md): ArrayList kapasitesi, boxing/unboxing, tür güvenliği ve `List<T>` karşılaştırması için etkileşimli rehber
- [C# Array Sınıfı ve Metotları](csharp-array-sinifi-metotlari/README.md): `Array.Sort`, `Clear`, `Reverse`, `IndexOf`, `Resize`, `BinarySearch` ve `Fill` için etkileşimli Türkçe rehber
- [C# Metotlar ve Bellek Simülatörü](csharp-metotlar-ve-bellek-simulatoru/README.md): metot söz dizimi, parametre aktarımı, `ref` ve değişken kapsamı için etkileşimli Türkçe simülatör
- [C# Metot Overloading ve Out Parametreleri](csharp-metot-overloading-out-parametreleri/README.md): metot imzası, aşırı yükleme, `out`/`ref` ve `TryParse` örnekleri
- [C# Extension ve Rekürsif Metotlar Rehberi](csharp-extension-ve-rekursif-metotlar/README.md): geleneksel extension metot sözdizimi, rekürsif algoritmalar ve kavramsal çağrı yığını simülatörü
- [C# Algoritma Ödev 1](csharp-algoritma-odev-1/README.md): çift sayılar, bölünebilme, kelime sıralama ve cümle analizi için etkileşimli rehber ve C# kaynak kodu
- [DateTime Metotları Rehberi](datetime-metotlari-rehberi/README.md): JavaScript tarih/saat API'leri, zaman dilimleri ve tarih hesaplama laboratuvarı
- [JavaScript String Metotları Laboratuvarı](javascript-string-metotlari-laboratuvari/README.md): metot kataloğu, karakter inceleyici, zincirleme araçları ve kod alıştırmaları

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

GitHub Actions, her pull request'te ve `main` dalına yapılan her gönderimde kök uygulama ile bağımsız web projelerinin TypeScript denetimi ve üretim derlemesini, ayrıca C# konsol projesinin derlemesini çalıştırır.

Tip dönüşümleri uygulamasını çalıştırmak için `tip-donusumleri-rehberi` klasörüne geçip aynı komutları o klasörde çalıştırın.

Try-Catch-Finally simülatörünü çalıştırmak için `try-catch-finally-simulator` klasörüne geçip aynı komutları o klasörde çalıştırın.

If-Else ve Ternary Laboratuvarı'nı çalıştırmak için `if-else-ternary-laboratuvari` klasörüne geçip aynı komutları o klasörde çalıştırın.

For Döngüsü, Break ve Continue Rehberi'ni çalıştırmak için `for-loop-break-continue-rehberi` klasörüne geçip aynı komutları o klasörde çalıştırın.

While ve Foreach Döngüleri Rehberi'ni çalıştırmak için `while-foreach-rehberi` klasörüne geçip aynı komutları o klasörde çalıştırın.

Dizi ve Bellek Laboratuvarı'nı çalıştırmak için `dizi-ve-bellek-laboratuvari` klasörüne geçip aynı komutları o klasörde çalıştırın.

C# ArrayList Rehberi'ni çalıştırmak için `csharp-arraylist-rehberi` klasörüne geçip aynı komutları o klasörde çalıştırın.

C# Array Sınıfı ve Metotları laboratuvarını çalıştırmak için `csharp-array-sinifi-metotlari` klasörüne geçip aynı komutları o klasörde çalıştırın.

C# Metotlar ve Bellek Simülatörü'nü çalıştırmak için `csharp-metotlar-ve-bellek-simulatoru` klasörüne geçip aynı komutları o klasörde çalıştırın.

C# Metot Overloading ve Out Parametreleri uygulamasını çalıştırmak için `csharp-metot-overloading-out-parametreleri` klasörüne geçip aynı komutları o klasörde çalıştırın.

C# Extension ve Rekürsif Metotlar Rehberi'ni çalıştırmak için `csharp-extension-ve-rekursif-metotlar` klasörüne geçip aynı komutları o klasörde çalıştırın.

C# Algoritma Ödev 1 uygulamasını çalıştırmak için `csharp-algoritma-odev-1` klasörüne geçip aynı komutları o klasörde çalıştırın.

DateTime Metotları Rehberi'ni çalıştırmak için `datetime-metotlari-rehberi` klasörüne geçip aynı komutları o klasörde çalıştırın.

JavaScript String Metotları Laboratuvarı'nı çalıştırmak için `javascript-string-metotlari-laboratuvari` klasörüne geçip aynı komutları o klasörde çalıştırın.

## Teknik doğruluk notu

Tarayıcıdaki konsol ve değişken doğrulama araçları eğitim amaçlı arayüz simülasyonlarıdır; C# derleyicisi çalıştırmaz. CLR'de değer türü/referans türü sınıflandırması, tek başına bir değişkenin her koşulda Stack veya Heap'te tutulduğunu göstermez. Gerçek bellek yerleşimi değişkenin bulunduğu yapıya ve çalışma zamanına bağlıdır; örneklerde verilen tür boyutları toplam nesne veya koleksiyon maliyeti değildir.

## Telif ve kullanım

© 2026 Enes Öztürk. **Tüm hakları saklıdır.** Bu depo inceleme ve görüntüleme için herkese açıktır; açık kaynak lisansı verilmemiştir. İçeriğin çoğaltılması, değiştirilmesi veya yeniden dağıtılması için hak sahibinden izin alın.
