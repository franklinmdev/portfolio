---
title: "DomiProp"
subtitle: "Gestión de propiedades centrada en el cumplimiento para arrendadores dominicanos"
description:
  - "DomiProp es un software de gestión de propiedades construido alrededor de un problema que la mayoría de las apps ignora: cómo se grava y se regula de verdad el ingreso por alquiler en República Dominicana. Aquí un arrendador tiene que lidiar con el ISR y el IPI, llevar los registros de gastos del Formato 606, redactar contratos que cumplan con la Ley 85-25 y, a partir de 2026, pasar a la facturación electrónica obligatoria (e-CF, bajo la Ley 32-23)."
  - 'Así que en lugar de armar otro registro de alquileres genérico, pensé DomiProp como un "contador digital". Convierte esas obligaciones en una rutina mensual guiada: una calculadora de ISR, un organizador de gastos que calza con el Formato 606, generación de contratos, recordatorios de vencimientos y un panel de ingresos y rendimiento. Un arrendador puede mantenerse al día con todo eso sin tener que contratar a un contador a tiempo completo.'
challenges: "Lo difícil nunca fue el CRUD, fue el dominio. Las reglas fiscales y de cumplimiento dominicanas son específicas, a veces ambiguas, y cambian seguido, y el mandato de e-CF tiene una fecha límite real en 2026. Tuve que modelar todo eso con cuidado, mantenerlo correcto a medida que las reglas cambian, y aun así dejarlo lo bastante simple para arrendadores que no son técnicos y para los contadores con quienes comparten un espacio de trabajo. Encima corre como un monorepo de TypeScript con un API en NestJS y Prisma, una app en Next.js y un sitio de marketing en Astro, así que los datos tienen que mantenerse consistentes en los tres."
learnings: "La lección más grande fue que el conocimiento del dominio es el producto de verdad. El código vale tanto como acierta en las reglas de ISR, IPI y e-CF. También mejoré mucho en entregar por fases contra una fecha límite real en vez de intentar construirlo todo de una vez, y en diseñar para dos usuarios muy distintos, arrendadores y contadores, que terminan trabajando sobre los mismos datos."
image: "@/assets/projects/domiprop-dashboard-light.png"
imageDark: "@/assets/projects/domiprop-dashboard-dark.png"
liveUrl: "https://domiprop.com.do/"
tags:
  - "TypeScript"
  - "Next.js"
  - "React"
  - "NestJS"
  - "Prisma"
  - "PostgreSQL"
  - "Astro"
  - "Tailwind CSS"
featured: true
publishDate: "2026-05-18"
iconAsset: "@/assets/projects/domiprop-logo.png"
---

DomiProp es el proyecto que muestro cuando quiero demostrar que puedo llevar un
producto real desde una base de datos vacía hasta algo en vivo, en un dominio
donde equivocarse en los detalles le cuesta dinero a la gente.

## Qué hace

- Una calculadora de ISR que calcula el impuesto sobre el alquiler tal como lo
  declara un arrendador aquí
- Un organizador de gastos que mantiene los gastos deducibles en el formato que
  pide la DGII para el Formato 606
- Contratos de alquiler que cumplen con la Ley 85-25
- Recordatorios que muestran las fechas de declaración antes de que se
  conviertan en multas
- Un panel de ingresos, gastos, ISR retenido y ocupación
- Espacios de trabajo compartidos, para que un arrendador invite a su contador
  a trabajar sobre los mismos datos

## Cómo está construido

Es un monorepo de pnpm con límites claros: un API en NestJS y Prisma sobre
PostgreSQL, una app web en Next.js (React 19) y un sitio de marketing en Astro,
todo en TypeScript con Tailwind CSS. La forma de los datos se define una sola
vez y se comparte, así la lógica fiscal no se desincroniza por lo bajo entre el
backend y el frontend.

## En qué punto está

DomiProp está construido y preparándose para sus primeros usuarios de cara a la
fecha límite del e-CF en 2026. El código es privado, así que esta página enlaza
al producto en vivo en vez de a un repositorio.
