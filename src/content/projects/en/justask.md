---
title: "justask"
subtitle: "Plain-language requests into an app's own state, with measured gates"
description: "justask turns what a person types into an app's own state: a search result, a table filter, a filled record card. Code finds the candidates, a model picks one label per question with a probability for every label, and a field the model is unsure of stays empty for the person to fill."
liveUrl: "https://justask-demo.franklinmdev.workers.dev"
githubUrl: "https://github.com/franklinmdev/justask"
npmUrl: "https://www.npmjs.com/package/@justask/core"
tags:
  - "TypeScript"
  - "React 19"
  - "Cloudflare Workers"
  - "Jev provider"
publishDate: "2026-10-01"
---

## The problem

Natural-language input in business apps usually means a model writes free text
and the app hopes it parses. A model that writes can invent a vendor that
doesn't exist, a date nobody said, or an amount in the wrong currency, and the
app saves it anyway.

## The design

justask never lets the model write. Code does the reading it can do reliably: it
parses dates, times and amounts, and shortlists candidate rows from the host
app's own catalog. The model then answers one question per field by picking one
label from that list, and returns a probability for every label. Code builds the
result from the picks.

Each field has a gate. A pick below its gate is held, so the field stays empty
and the person fills it. Nothing reaches the host app until the person confirms.
A held field is not a failure: it is the system saying it does not know.

## Measured, not guessed

<div class="noted">
<p>Gates have no default value. The library makes the host app declare each one,
because a threshold that ships as a default is a guess somebody else made. I
measure mine on frozen eval sets: each set is fixed by checksum, with its pass
lines written down, before the first model call. Round 4 of the search eval
picked every request exact, invented none and held every ambiguous one. The
failed rounds before it are in the <a
href="https://github.com/franklinmdev/justask/blob/main/docs/search-
eval.md">eval log</a>.</p>
<p>The limits are written down too. The pre-launch QA found a small share of
fills confident and wrong on a broad probe set, which is why the confirm step
is not optional. A check for obvious prompt-injection markers holds every
field when it fires, and the README says plainly that it is a narrow check,
not a defence.</p>
<aside class="sidenote measured-note">
<dl>
<div><dt>24 of 24</dt><dd>picks exact, round 4 of the search eval</dd></div>
<div><dt>6 of 6</dt><dd>ambiguous requests held</dd></div>
<div><dt>380 ms</dt><dd>p95 latency</dd></div>
<div><dt>8 of 470</dt><dd>fills confident and wrong in pre-launch QA, 1.7%</dd></div>
</dl>
<p class="source">
<time datetime="2026-09-23">2026-09-23</time>,
<a
href="https://github.com/franklinmdev/justask/blob/ce451bb/docs/search-eval.md"
>search-eval.md at ce451bb</a>;
<time datetime="2026-10-01">2026-10-01</time>,
<a
href="https://github.com/franklinmdev/justask/blob/6bf952a/README.md"
>README at 6bf952a</a>
</p>
</aside>
</div>

## The live demo

<div class="noted">
<p>The <a href="https://justask-demo.franklinmdev.workers.dev">demo</a> is a
fictional invoicing app with a table, a form and a search case, in English and
Spanish. It runs on one Cloudflare Worker, rate limited and capped on model
spend. Fig. 1 above replays three real responses recorded from it.</p>
<aside class="sidenote measured-note">
<dl>
<div><dt>$1</dt><dd>of model spend a day, the demo's cap</dd></div>
</dl>
<p class="source">
<time datetime="2026-09-25">2026-09-25</time>,
<a
href="https://github.com/franklinmdev/justask/blob/f2aa3b6/demo/server/budget.ts"
>budget.ts at f2aa3b6</a>
</p>
</aside>
</div>

## What ships

`@justask/core` on npm under MIT: the core, a React layer of hooks and unstyled
pieces, the provider adapter, and the eval functions used to measure gates. It
also ships an agent skill that teaches coding agents what they get wrong with
it: the model picks and never writes, gates have no default, and a held field is
no failure.
