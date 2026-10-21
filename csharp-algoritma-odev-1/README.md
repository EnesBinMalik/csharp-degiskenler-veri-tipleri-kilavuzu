# C# Algoritma Ödev 1

Enes Öztürk tarafından hazırlanan C# 101 algoritma ödevleri için Türkçe, tarayıcı tabanlı eğitim uygulaması. Dört algoritma sorusunu interaktif örneklerle inceler ve C# kaynak kodunu görüntüleyip indirmenizi sağlar.

## İçerik

- Pozitif sayılar arasından çift olanları bulma
- Bir sayıya eşit veya tam bölünen elemanları filtreleme
- Girilen kelimeleri sondan başa yazdırma
- Cümledeki kelime ve harf sayılarını hesaplama
- Tarayıcı tabanlı terminal simülasyonu ve görsel analizler
- Tam C# `Program.cs` kaynak kodunu görüntüleme ve indirme
- Algoritma açıklamaları ve karmaşıklık notları

## Gereksinimler

- Node.js 20.19+ veya 22.12+
- npm
- C# konsol projesini çalıştırmak için .NET 8 SDK ve çalışma zamanı (veya daha yeni SDK ile uyumlu runtime)

## Web uygulamasını çalıştırma

Bu klasörde komutları çalıştırın:

```bash
npm install
npm run dev
```

Vite geliştirme sunucusu `http://localhost:3000` adresinde açılır.

## Denetim ve üretim derlemesi

```bash
npm run lint
npm run build
npm run preview
```

## C# konsol uygulamasını çalıştırma

Bu klasördeki C# konsol projesini çalıştırmak için:

```bash
dotnet run --project Odev1_AlgoritmaSorulari.csproj
```

İsterseniz uygulamadaki **Program.cs İndir** düğmesiyle aynı kaynak kodunu ayrıca indirebilirsiniz.

## Teknik kapsam

Uygulamadaki interaktif terminal, örnekleri tarayıcıda TypeScript ile simüle eder; C# kodunu derlemez veya .NET çalışma zamanı çalıştırmaz. Kaynak kod görünümünde indirilen `Program.cs` ise .NET SDK ile ayrıca derlenip çalıştırılabilir. Görsel analizör örnek verileri tarayıcıda işler ve .NET çalışma zamanı çıktısı değildir.

## Atıf ve lisans

© 2026 Enes Öztürk. Kaynak arşivinde bu projeye ait bir lisans belirtilmemiştir.
