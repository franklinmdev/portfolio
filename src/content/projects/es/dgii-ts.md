---
title: "dgii-ts"
subtitle: "Librería open source de validación e integración con la DGII para TypeScript"
description:
  - "dgii-ts es una librería open source de TypeScript para trabajar con identificadores fiscales dominicanos como el RNC, la cédula, el NCF y el e-NCF. Los valida y los consulta contra la DGII, la autoridad tributaria del país."
  - "La construí porque la DGII no publica un API público estable. Durante años los desarrolladores se han apoyado en scrapers frágiles de páginas ASP.NET viejas cuyas URLs cambian de lugar cada cierto tiempo, lo que rompe sin avisar cada integración que depende de ellas. dgii-ts esconde todo eso detrás de un único cliente tipado, hecho para seguir funcionando cuando la fuente falla."
challenges: "El verdadero reto es que te estás integrando con un sistema que no quiere que lo integren. La DGII no tiene API REST, apagó su viejo servicio SOAP en enero de 2025, y las páginas ASP.NET que sí sirve cambian sin aviso. Mi respuesta fue construirla por capas: validación de dígito verificador offline que nunca toca la red, una capa de scraping para consultas en vivo, y un cliente con circuit breaker y reintentos con backoff para que un fallo del origen no se lleve todo por delante."
learnings: "Esta me enseñó a tratar el fallo como el caso normal, no como la excepción. Como la fuente de datos es poco confiable por diseño, lo interesante estuvo todo en los respaldos, en la degradación elegante y en una ruta offline que siempre funciona. Publicarla en npm bajo licencia MIT y con CI también me hizo cuidar mucho más un API público limpio, el versionado y una documentación que otro desarrollador pueda seguir de verdad."
githubUrl: "https://github.com/franklinmdev/dgii-ts"
tags:
  - "TypeScript"
  - "Node.js"
  - "Web scraping"
  - "Circuit breaker"
  - "Validación offline"
featured: false
publishDate: "2026-05-20"
iconAsset: "@/assets/projects/dgii-ts-icon.svg"
---

Un conjunto de herramientas tipado y confiable para los identificadores
fiscales dominicanos, liberado como open source para que otros desarrolladores
no tengan que reconstruir los mismos scrapers frágiles que todo el mundo
reinventa.

## Instalación

```bash
npm install dgii-ts
```

Está en [npm](https://www.npmjs.com/package/dgii-ts) bajo licencia MIT.

## Qué hace

- Validación offline de los dígitos verificadores del RNC, la cédula, el NCF
  (serie B) y el e-NCF (serie E), sin llamadas de red
- Consultas en vivo que hacen scraping de las páginas ASP.NET de la DGII cuando
  necesitas datos en tiempo real
- Un cliente resiliente con circuit breaker y reintentos con backoff, para que
  una respuesta mala no se propague en cascada
- Importación masiva del archivo diario de RNC de la DGII

## Por qué importa

La DGII no tiene un API REST público, y apagó su viejo servicio SOAP en enero
de 2025. Cualquier cosa que necesite verificar un RNC o NCF dominicano ha tenido
que depender de endpoints frágiles y sin documentar. dgii-ts lo convierte en una
sola dependencia con una superficie limpia y documentada.
