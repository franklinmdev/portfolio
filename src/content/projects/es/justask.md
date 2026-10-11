---
title: "justask"
subtitle: "Pedidos en lenguaje natural convertidos en el estado de una app, con umbrales medidos"
description: "justask convierte lo que una persona escribe en el estado propio de una app: un resultado de búsqueda, un filtro de tabla, una ficha llena. El código encuentra los candidatos, un modelo elige una etiqueta por pregunta con una probabilidad para cada etiqueta, y un campo del que el modelo no está seguro se queda vacío para que la persona lo llene."
liveUrl: "https://justask-demo.franklinmdev.workers.dev"
githubUrl: "https://github.com/franklinmdev/justask"
npmUrl: "https://www.npmjs.com/package/@justask/core"
tags:
  - "TypeScript"
  - "React 19"
  - "Cloudflare Workers"
  - "Proveedor Jev"
publishDate: "2026-10-01"
---

## El problema

En las apps de negocio, la entrada en lenguaje natural casi siempre significa
que un modelo escribe texto libre y la app espera poder interpretarlo. Un
modelo que escribe puede inventarse un proveedor que no existe, una fecha que
nadie dijo o un monto en la moneda equivocada, y la app lo guarda igual.

## El diseño

justask nunca deja que el modelo escriba. El código hace la lectura que puede
hacer de forma confiable: interpreta fechas, horas y montos, y preselecciona
filas candidatas del catálogo de la app. Luego el modelo responde una pregunta
por campo eligiendo una etiqueta de esa lista, y devuelve una probabilidad
para cada etiqueta. El código arma el resultado a partir de esas elecciones.

Cada campo tiene un umbral. Una elección por debajo de su umbral se retiene:
el campo se queda vacío y la persona lo llena. Nada llega a la app hasta que la
persona confirma. Un campo retenido no es un fallo: es el sistema diciendo que
no sabe.

## Medido, no adivinado

Los umbrales no tienen valor por defecto. La librería obliga a la app a
declarar cada uno, porque un umbral que viene por defecto es una suposición
que hizo otra persona. Yo mido los míos con sets de evaluación congelados:
cada set se fija con un checksum, con sus líneas de aprobación escritas, antes
de la primera llamada al modelo. La ronda 4 de la evaluación de búsqueda
acertó 24 de 24, no inventó ninguno, retuvo 6 de 6 pedidos ambiguos y corrió
con un p95 de 380 ms. Las rondas fallidas anteriores están en el
[registro de evaluación](https://github.com/franklinmdev/justask/blob/main/docs/search-eval.md).

Los límites también están escritos. El QA antes del lanzamiento encontró 8 de
470 campos llenados con confianza y mal (1,7 %) en un set amplio de pruebas,
y por eso el paso de confirmar no es opcional. Una revisión de marcas obvias
de inyección de prompt retiene todos los campos cuando se activa, y el README
dice claramente que es una revisión limitada, no una defensa.

## La demo en vivo

La [demo](https://justask-demo.franklinmdev.workers.dev) es una app de
facturación ficticia con una tabla, un formulario y una búsqueda, en inglés y
español. Corre en un solo Cloudflare Worker, con límite de uso y un tope de
1 dólar al día en gasto de modelo. La Fig. 1 de arriba reproduce tres
respuestas reales grabadas de ella.

## Lo que se publica

`@justask/core` en npm con licencia MIT: el núcleo, una capa de React con hooks
y piezas sin estilo, el adaptador del proveedor y las funciones de evaluación
para medir los umbrales. También incluye un skill para agentes que le enseña a
los agentes de código lo que suelen hacer mal con ella: el modelo elige y
nunca escribe, los umbrales no tienen valor por defecto y un campo retenido no
es un fallo.
