---
title: "dgii-ts"
subtitle: "Librería open source de validación e integración con la DGII para TypeScript"
description: "dgii-ts es una librería open source de TypeScript para trabajar con identificadores fiscales dominicanos como el RNC, la cédula, el NCF y el e-NCF. Los valida y los consulta contra la DGII, la autoridad tributaria del país."
githubUrl: "https://github.com/franklinmdev/dgii-ts"
npmUrl: "https://www.npmjs.com/package/dgii-ts"
tags:
  - "TypeScript"
  - "Node.js"
  - "Web scraping"
  - "Circuit breaker"
  - "Validación offline"
publishDate: "2026-05-20"
---

## El problema

La DGII, la autoridad tributaria dominicana, no tiene una API REST pública, y
apagó su viejo servicio SOAP en enero de 2025. Todo lo que necesita verificar un
RNC o un NCF dominicano ha dependido de scrapers de viejas páginas ASP.NET cuyas
URL cambian de lugar, y eso rompe en silencio cada integración que depende de
ellas.

## El diseño

dgii-ts esconde todo eso detrás de un cliente tipado construido por capas:
validación offline del dígito verificador para RNC, cédula, NCF (serie B) y
e-NCF (serie E) que nunca toca la red; consultas en vivo que hacen scraping de
las páginas de la DGII cuando hacen falta datos actuales; un cliente con circuit
breaker y reintentos con backoff, para que una mala respuesta no se propague; y
una importación masiva del dataset diario de RNC de la DGII.

<div class="noted">
<p>La Fig. 4 de arriba es la propia librería, importada desde npm y corriendo en
esta página. La aritmética del dígito verificador se dibuja paso a paso, y el
veredicto es el de la librería. Un número que no cumple el algoritmo puede ser
real igual: dgii-ts trae listas blancas de cédulas y RNC que la DGII emitió de
todos modos, tomadas de python-stdnum.</p>
<aside class="sidenote measured-note">
<dl>
<div><dt>578</dt><dd>cédulas en la lista blanca</dd></div>
<div><dt>23</dt><dd>RNC en la lista blanca</dd></div>
</dl>
<p class="source">
<time datetime="2026-03-19">2026-03-19</time>,
<a
href="https://github.com/franklinmdev/dgii-ts/blob/ff60bd9/src/validators/cedula-whitelist.ts"
>cedula-whitelist.ts en ff60bd9</a>;
<a
href="https://github.com/franklinmdev/dgii-ts/blob/ff60bd9/src/validators/rnc-whitelist.ts"
>rnc-whitelist.ts</a>
</p>
</aside>
</div>

## Lo que se publica

```bash
npm install dgii-ts
```

En [npm](https://www.npmjs.com/package/dgii-ts) con licencia MIT y CI, más un
skill para agentes, para que un agente de código use los validadores offline
antes de ir a la red.
