# C# Tip Dönüşümleri Rehberi

Enes Öztürk tarafından hazırlanan, C# tür dönüşümlerini örnekler ve etkileşimli görsellerle anlatan Türkçe eğitim uygulaması.

## İçerik

- Implicit ve explicit dönüşüm örnekleri
- `Convert`, `Parse`, `TryParse`, `ToString` ve boxing/unboxing açıklamaları
- Sayısal türlerin aralıklarını ve dönüşüm ilişkilerini gösteren tablo
- Bit düzeyinde dönüşüm görselleştiricisi
- Çoktan seçmeli bilgi testi

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

Uygulama tarayıcıda çalışan bir eğitim simülatörüdür; C# derleyicisi veya .NET çalışma zamanı içermez. Gösterilen sonuçlar, C# dilinin bütün tür dönüşümü ve taşma kurallarını kapsamaz; kesin sonuç için örneği hedef .NET sürümünde derleyip çalıştırın. Özellikle kayan noktalı sayılara örtük dönüşüm aralık sorununu önlese de hassasiyet kaybına yol açabilir.

Değer türü/referans türü sınıflandırması tek başına bir değerin her koşulda stack veya heap üzerinde tutulduğunu göstermez. Gerçek bellek yerleşimi değişkenin bağlamına ve çalışma zamanına bağlıdır; tabloda verilen tür boyutları nesne/koleksiyon yükü değildir. Bit görselleştiricisi basitleştirilmiş bir öğretim modelidir. Ariane 5 örneği de tarihsel bir yazılım hatasıdır; C# uygulaması veya `checked` bloğunun doğrudan bir örneği değildir.

## Telif ve kullanım

© 2026 Enes Öztürk. **Tüm hakları saklıdır.** Bu depo inceleme amacıyla herkese açıktır; açık kaynak lisansı verilmemiştir. İçeriği çoğaltmak, değiştirmek veya yeniden dağıtmak için hak sahibinden izin alın.
