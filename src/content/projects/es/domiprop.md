---
title: "DomiProp"
subtitle: "Gestión de propiedades centrada en el cumplimiento para arrendadores dominicanos"
description: "DomiProp es un software de gestión de propiedades construido alrededor de un problema que la mayoría de las apps ignora: cómo se grava y se regula de verdad el ingreso por alquiler en República Dominicana. Aquí un arrendador tiene que lidiar con el ISR y el IPI, llevar los registros de gastos del Formato 606, redactar contratos que cumplan con la Ley 85-25 y, a partir de 2026, pasar a la facturación electrónica obligatoria (e-CF, bajo la Ley 32-23)."
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
publishDate: "2026-05-18"
---

## El problema

Un arrendador en República Dominicana tiene que lidiar con el ISR y el IPI,
llevar los registros de gastos del Formato 606, redactar contratos que cumplan
con la Ley 85-25 y, a partir de 2026, pasar a la facturación electrónica
obligatoria. Los gestores de alquiler genéricos ignoran todo eso, y equivocarse
en los detalles le cuesta dinero a la gente.

## El diseño

DomiProp es un "contador digital": convierte esas obligaciones en una rutina
mensual guiada. Una calculadora de ISR que calcula el impuesto sobre el alquiler
como se declara aquí, un organizador de gastos que mantiene los deducibles en la
forma que la DGII pide para el Formato 606, contratos de alquiler que cumplen
con la Ley 85-25, recordatorios que muestran las fechas de declaración antes de
que se conviertan en multas, un panel de ingresos, gastos, ISR retenido y
ocupación, y espacios de trabajo compartidos para que un arrendador invite a su
contador a trabajar sobre los mismos datos.

Es un monorepo con pnpm: una API en NestJS y Prisma sobre PostgreSQL, una app
web en Next.js (React 19) y un sitio de marketing en Astro, todo en TypeScript.
La forma de los datos se define una sola vez y se comparte, así que la lógica
fiscal no puede desviarse en silencio entre el backend y el frontend.

## Dónde está

Construido y preparándose para sus primeros usuarios antes del plazo del e-CF de 2026. El código es privado, así que esta página enlaza al producto en vivo en
lugar de a un repositorio.
