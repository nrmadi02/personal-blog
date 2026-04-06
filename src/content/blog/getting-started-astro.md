---
title: Memulai dengan Astro
description: Panduan praktis membangun website cepat berbasis konten menggunakan Astro.
pubDate: 2026-04-03
tags: [astro, webdev, tutorial]
---

Astro adalah framework web modern yang secara default mengirim nol JavaScript. Ini sempurna untuk situs berbasis konten seperti blog, dokumentasi, dan halaman pemasaran.

## Arsitektur Islands

Astro memperkenalkan konsep **islands** — komponen interaktif yang terhidrasi secara terpisah. Artinya:

- HTML statis disajikan secara default
- Komponen interaktif hanya dimuat saat dibutuhkan
- Halaman tetap cepat seiring bertambahnya kompleksitas

```astro
---
import InteractiveCounter from '../components/Counter.jsx';
---

<h1>Halaman Statis Saya</h1>
<p>Konten ini murni HTML — tanpa JavaScript yang dikirim.</p>

<!-- Island ini terhidrasi secara terpisah -->
<InteractiveCounter client:load />
```

## Content Collections

Content Collections Astro menyediakan manajemen konten yang type-safe:

```typescript
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});
```

## Kenapa Saya Memilih Astro

Setelah mengevaluasi beberapa framework, Astro menonjol karena:

| Fitur                 | Astro    | Next.js     | Gatsby       |
| --------------------- | -------- | ----------- | ------------ |
| Nol JS secara default | Ya       | Tidak       | Tidak        |
| Multi framework UI    | Ya       | Hanya React | Hanya React  |
| Kecepatan build       | Cepat    | Sedang      | Lambat       |
| Lapisan konten        | Built-in | File-based  | Plugin-based |

Astro memungkinkan saya menggunakan komponen React di tempat yang butuh interaktivitas, sambil menjaga sisanya tetap sebagai HTML statis yang ringan.
