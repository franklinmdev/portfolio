---
title: "dgii-ts"
subtitle: "Open-source DGII validation & integration library for TypeScript"
description:
  - "dgii-ts is an open-source TypeScript library for working with Dominican tax identifiers like RNC, cédula, NCF, and e-NCF. It validates them and looks them up against the DGII, the country's tax authority."
  - "I built it because the DGII doesn't publish a stable public API. For years developers have leaned on fragile scrapers of old ASP.NET pages whose URLs keep moving, which quietly breaks every integration that depends on them. dgii-ts hides all of that behind one typed client that's built to keep working when the source doesn't."
challenges: "The real challenge is that you're integrating with a system that doesn't want to be integrated with. The DGII has no REST API, it shut off its old SOAP service in January 2025, and the ASP.NET pages it does serve change without warning. My answer was to build it in layers: offline check-digit validation that never touches the network, a scraping layer for live lookups, and a client with a circuit breaker and retries with backoff so one failure upstream doesn't take everything down with it."
learnings: "This one taught me to treat failure as the normal case, not the exception. Because the data source is unreliable by design, the interesting work was all in the fallbacks, the graceful degradation, and an offline path that always works. Publishing it on npm under MIT with CI also made me care a lot more about a clean public API, proper versioning, and docs that another developer can actually follow."
githubUrl: "https://github.com/franklinmdev/dgii-ts"
tags:
  - "TypeScript"
  - "Node.js"
  - "npm package"
  - "Web scraping"
  - "DGII"
  - "MIT license"
featured: false
publishDate: "2026-05-20"
iconAsset: "@/assets/projects/dgii-ts-icon.svg"
---

A typed, dependable toolkit for Dominican tax identifiers, open-sourced so other
developers don't have to rebuild the same brittle scrapers everyone keeps
reinventing.

## Install

```bash
npm install dgii-ts
```

It's on [npm](https://www.npmjs.com/package/dgii-ts) under the MIT license.

## What it does

- Offline validation of the check digits for RNC, cédula, NCF (series B), and
  e-NCF (series E), with no network calls
- Live lookups that scrape the DGII's ASP.NET pages when you need real-time data
- A resilient client with a circuit breaker and retries with backoff, so one
  bad response doesn't cascade
- Bulk import of the DGII's daily RNC dataset

## Why it matters

The DGII has no public REST API, and it killed its old SOAP service in
January 2025. Anything that needs to check a Dominican RNC or NCF has been
stuck depending on brittle, undocumented endpoints. dgii-ts turns that into a
single dependency with a clean, documented surface.
