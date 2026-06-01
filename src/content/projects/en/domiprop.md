---
title: "DomiProp"
subtitle: "Compliance-first property management for Dominican landlords"
description:
  - "DomiProp is property-management software built around a problem most apps ignore: how rental income is actually taxed and regulated in the Dominican Republic. Landlords here have to handle ISR and IPI, keep Formato 606 expense records, write lease contracts that comply with Ley 85-25, and starting in 2026 move to mandatory electronic invoicing (e-CF, under Law 32-23)."
  - 'So instead of building another generic rental tracker, I framed DomiProp as a "contador digital." It turns those obligations into a guided monthly routine: an ISR calculator, an expense organizer that matches Formato 606, lease generation, deadline reminders, and a dashboard for income and yield. A landlord can stay on top of all of it without hiring a full-time accountant.'
challenges: "The hard part was never the CRUD. It was the domain. Dominican tax and compliance rules are specific, sometimes ambiguous, and they keep changing, and the e-CF mandate has a real 2026 deadline attached to it. I had to model all of that carefully, keep it correct as the rules shift, and still make it simple enough for landlords who aren't technical and the accountants they share a workspace with. On top of that it runs as a TypeScript monorepo with a NestJS and Prisma API, a Next.js app, and an Astro marketing site, so the data has to stay consistent across all three."
learnings: "The biggest lesson was that the domain knowledge is the actual product. The code is only worth as much as it gets the ISR, IPI, and e-CF rules right. I also got a lot better at shipping in phases against a real deadline instead of trying to build everything at once, and at designing for two very different users, landlords and accountants, who end up working on the same data."
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

DomiProp is the project I point to when I want to show that I can take a real
product from an empty database to something live, in a domain where getting the
details wrong costs people money.

## What it does

- An ISR calculator that figures rental income tax the way landlords here
  actually file it
- An expense organizer that keeps deductible expenses in the shape the DGII
  wants for Formato 606
- Lease contracts that comply with Ley 85-25
- Reminders that surface filing dates before they turn into fines
- A dashboard for income, expenses, ISR withheld, and occupancy
- Shared workspaces, so a landlord can invite their accountant to work on the
  same data

## How it's built

It's a pnpm monorepo with clear boundaries: a NestJS and Prisma API on top of
PostgreSQL, a Next.js (React 19) web app, and an Astro marketing site, all in
TypeScript with Tailwind CSS. The shape of the data is defined once and shared,
so the tax logic can't quietly drift apart between the backend and the
frontend.

## Where it stands

DomiProp is built and getting ready for its first users ahead of the 2026 e-CF
deadline. The code is private, so this page links to the live product instead
of a repo.
