---
title: "dgii-ts"
subtitle: "Open-source DGII validation & integration library for TypeScript"
description: "dgii-ts is an open-source TypeScript library for working with Dominican tax identifiers like RNC, cédula, NCF, and e-NCF. It validates them and looks them up against the DGII, the country's tax authority."
githubUrl: "https://github.com/franklinmdev/dgii-ts"
npmUrl: "https://www.npmjs.com/package/dgii-ts"
tags:
  - "TypeScript"
  - "Node.js"
  - "Web scraping"
  - "Circuit breaker"
  - "Offline validation"
publishDate: "2026-05-20"
---

## The problem

The DGII, the Dominican tax authority, has no public REST API, and it shut off
its old SOAP service in January 2025. Anything that needs to check a Dominican
RNC or NCF has leaned on scrapers of old ASP.NET pages whose URLs keep moving,
which quietly breaks every integration that depends on them.

## The design

dgii-ts hides all of that behind one typed client built in layers: offline
check-digit validation for RNC, cédula, NCF (series B) and e-NCF (series E) that
never touches the network; live lookups that scrape the DGII's pages when you
need current data; a client with a circuit breaker and retries with backoff, so
one bad response doesn't cascade; and a bulk import of the DGII's daily RNC
dataset.

<div class="noted">
<p>Fig. 3 above is the library itself, imported from npm and running in this
page. The check-digit arithmetic is drawn step by step, and the verdict is the
library's own. A number that breaks the algorithm can still be real: dgii-ts
carries whitelists of cédulas and RNCs that the DGII issued anyway, taken from
python-stdnum.</p>
<aside class="sidenote measured-note">
<dl>
<div><dt>578</dt><dd>cédulas on the whitelist</dd></div>
<div><dt>23</dt><dd>RNCs on the whitelist</dd></div>
</dl>
<p class="source">
<time datetime="2026-03-19">2026-03-19</time>,
<a
href="https://github.com/franklinmdev/dgii-ts/blob/ff60bd9/src/validators/cedula-whitelist.ts"
>cedula-whitelist.ts at ff60bd9</a>;
<a
href="https://github.com/franklinmdev/dgii-ts/blob/ff60bd9/src/validators/rnc-whitelist.ts"
>rnc-whitelist.ts</a>
</p>
</aside>
</div>

## What ships

```bash
npm install dgii-ts
```

<div class="noted">
<p>On <a href="https://www.npmjs.com/package/dgii-ts">npm</a> under MIT, with CI,
plus an agent skill so a coding agent uses the offline validators before it
reaches for the network.</p>
<aside class="sidenote measured-note">
<dl>
<div><dt>3,157</dt><dd>npm downloads, all time</dd></div>
</dl>
<p class="source">
<time datetime="2026-10-10">2026-10-10</time>,
<a
href="https://api.npmjs.org/downloads/point/2026-04-07:2026-10-10/dgii-ts"
>npm API</a>
</p>
</aside>
</div>
