---
title: "DomiProp"
subtitle: "Compliance-first property management for Dominican landlords"
description: "DomiProp is property-management software built around a problem most apps ignore: how rental income is actually taxed and regulated in the Dominican Republic. Landlords here have to handle ISR and IPI, keep Formato 606 expense records, write lease contracts that comply with Ley 85-25, and starting in 2026 move to mandatory electronic invoicing (e-CF, under Law 32-23)."
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

## The problem

Landlords in the Dominican Republic have to handle ISR and IPI, keep Formato 606
expense records, write lease contracts that comply with Ley 85-25 and, from
2026, move to mandatory electronic invoicing. Generic rental trackers ignore all
of it, and getting the details wrong costs people money.

## The design

DomiProp is a "contador digital": it turns those obligations into a guided
monthly routine. An ISR calculator that figures rental income tax the way
landlords here file it, an expense organizer that keeps deductible expenses in
the shape the DGII wants for Formato 606, lease contracts that comply with Ley
85-25, reminders that surface filing dates before they turn into fines, a
dashboard for income, expenses, ISR withheld and occupancy, and shared
workspaces so a landlord can invite their accountant to work on the same data.

It's a pnpm monorepo: a NestJS and Prisma API on PostgreSQL, a Next.js
(React 19) web app and an Astro marketing site, all in TypeScript. The shape
of the
data is defined once and shared, so the tax logic can't quietly drift apart
between the backend and the frontend.

## Where it stands

Built and getting ready for its first users ahead of the 2026 e-CF deadline. The
code is private, so this page links to the live product instead of a repo.
