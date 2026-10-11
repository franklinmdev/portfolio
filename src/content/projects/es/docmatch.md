---
title: "docmatch"
subtitle: "Conciliación de facturas con modelos de visión, reglas deterministas y un benchmark en CI"
description: "docmatch lee facturas con modelos de visión, verifica lo que leyeron con código determinista, cruza cada factura con su orden de compra y su registro de recepción, y manda a una persona todo lo que no cuadra. Cada etapa tiene su número en un benchmark que nombra el commit que lo produjo. En desarrollo."
githubUrl: "https://github.com/franklinmdev/docmatch"
tags:
  - "Python 3.12"
  - "Pydantic"
  - "FastAPI"
  - "PostgreSQL"
  - "pgvector"
  - "pg_trgm"
  - "Next.js"
publishDate: "2026-09-15"
---

## Por qué existe

Los equipos de cuentas por pagar todavía reciben la mayoría de las facturas como
PDF, escaneos y fotos del celular. Convertir una en un asiento contable son tres
problemas: leerla, compararla con lo que se pidió y se recibió, y decidir si una
persona tiene que revisarla. La mayoría de los proyectos públicos se quedan en
el primero con una sola llamada a un modelo. docmatch trata la lectura como una
pieza reemplazable y pone la ingeniería en los otros dos.

## Los modelos leen, el código decide

El pipeline es una máquina de estados explícita en Postgres: recibida, extraída,
validada, resuelta, cruzada, y luego aprobada o en revisión. Los modelos solo
estructuran texto. La aritmética y cada decisión son código determinista.

El control de validación (Fig. 2) solo tiene reglas que las propias etiquetas
cumplen: los totales cuadran y las fechas tienen sentido. Probé la conciliación
de totales por línea, la aritmética de impuestos y los dígitos verificadores, y
los dejé fuera, porque fallan demasiado en los datos etiquetados o aplican a
casi ningún documento. Un valor que el modelo no pudo leer nunca hace fallar una
regla, y una lectura que falla se guarda y no se reintenta, porque reintentar
sería buscar una respuesta que pase.

## Fases con números, no con fechas

Cada fase termina con un número en el README, y la siguiente no empieza hasta
que ese número existe.

<div class="noted">
<p><b>Extracción.</b> Tres backends comparados en un subconjunto fijo de 100
documentos (Fig. 3). El modelo más barato también sacó el F1 de campos más
alto.</p>
<p><b>Cruce.</b> Un generador inyecta discrepancias etiquetadas en órdenes de
compra y registros de recepción. En ese set, la precisión y el recall son casi
perfectos para cada tipo de discrepancia. De punta a punta, desde la imagen,
la precisión baja a la mitad, y el README explica exactamente por qué: una
línea mal leída que no se puede emparejar se convierte a la vez en una línea
extra falsa y en una línea faltante falsa.</p>
<p><b>Resolución de entidades.</b> Trigramas, vectores, híbrido, e híbrido con un
reranker cross-encoder, sobre un catálogo de proveedores. La regla para
quedarse con el reranker se escribió antes del número. Quedó por debajo del
híbrido simple, así que se descartó.</p>
<p><b>Pipeline.</b> El ciclo completo, de la carga a la aprobación, por la API
HTTP, con el backend más barato.</p>
<aside class="sidenote measured-note">
<dl>
<div><dt>0,977 a 1,000</dt><dd>precisión y recall en las discrepancias inyectadas</dd></div>
<div><dt>cerca de 0,5</dt><dd>precisión de punta a punta, desde la imagen</dd></div>
<div><dt>1.920</dt><dd>entradas del catálogo en el benchmark de resolución</dd></div>
<div><dt>0,888 vs 0,917</dt><dd>top-1 del reranker contra el del híbrido</dd></div>
<div><dt>10,03 s</dt><dd>p95 de la carga a la aprobación</dd></div>
<div><dt>0,00236 dólares</dt><dd>por documento</dd></div>
<div><dt>0,484</dt><dd>tasa de revisión</dd></div>
<div><dt>1,59 dólares</dt><dd>toda la medición</dd></div>
</dl>
<p class="source">
<time datetime="2026-09-21">2026-09-21</time> y
<time datetime="2026-09-25">2026-09-25</time>, README en
<a
href="https://github.com/franklinmdev/docmatch/blob/2d926e5/README.md"
>2d926e5</a>,
<a
href="https://github.com/franklinmdev/docmatch/blob/c75567f/README.md"
>c75567f</a> y
<a
href="https://github.com/franklinmdev/docmatch/blob/301ce3e/README.md"
>301ce3e</a>
</p>
</aside>
</div>

## Protegido en CI

Un <a href="https://github.com/franklinmdev/docmatch/blob/main/.github/workflows
/regression.yml">control de regresión</a> compara el F1 de campos y de líneas de
cada backend contra la base del merge, y hace fallar un pull request que baje
cualquiera de los dos.

## Lo que dejé fuera, a propósito

Celery y Redis (un worker sobre Postgres basta en un solo nodo), frameworks de
evaluación con modelos jueces (la extracción tiene datos de referencia),
Langfuse (hospedarlo trae de vuelta a Redis, y la nube pondría el contenido de
los documentos en manos de un tercero) y la orquestación con grafos, decidida en
un ADR a favor de código simple.

## Lo próximo

El empaquetado: un punto de entrada reproducible para que cualquiera pueda
regenerar una fila del benchmark desde cero, y un análisis de las clases de
error principales. Después, un adaptador dominicano: ingesta de XML de e-CF,
validación de RNC y NCF, y el reporte 606 de compras.
