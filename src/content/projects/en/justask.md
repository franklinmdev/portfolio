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

Natural-language input in business apps usually means a model writes free
text and the app hopes it parses. A model that writes can invent a vendor that
doesn't exist, a date nobody said, or an amount in the wrong currency, and the
app saves it anyway.

## The design

justask never lets the model write. Code does the reading it can do reliably:
it parses dates, times and amounts, and shortlists candidate rows from the host
app's own catalog. The model then answers one question per field by picking
one label from that list, and returns a probability for every label. Code
builds the result from the picks.

Each field has a gate. A pick below its gate is held, so the field stays empty
and the person fills it. Nothing reaches the host app until the person
confirms. A held field is not a failure: it is the system saying it does not
know.

## Measured, not guessed

Gates have no default value. The library makes the host app declare each one,
because a threshold that ships as a default is a guess somebody else made. I
measure mine on frozen eval sets: each set is fixed by checksum, with its pass
lines written down, before the first model call. Round 4 of the search eval
picked 24 of 24 exact, invented none, held 6 of 6 ambiguous requests, and ran
at a p95 of 380 ms. The failed rounds before it are in the
[eval log](https://github.com/franklinmdev/justask/blob/main/docs/search-eval.md).

The limits are written down too. The pre-launch QA found 8 of 470 fills
confident and wrong (1.7%) on a broad probe set, which is why the confirm step
is not optional. A check for obvious prompt-injection markers holds every
field when it fires, and the README says plainly that it is a narrow check,
not a defence.

## The live demo

The [demo](https://justask-demo.franklinmdev.workers.dev) is a fictional
invoicing app with a table, a form and a search case, in English and Spanish.
It runs on one Cloudflare Worker, rate limited and capped at $1 of model spend
a day. Fig. 1 above replays three real responses recorded from it.

## What ships

`@justask/core` on npm under MIT: the core, a React layer of hooks and
unstyled pieces, the provider adapter, and the eval functions used to measure
gates. It also ships an agent skill that teaches coding agents what they get
wrong with it: the model picks and never writes, gates have no default, and a
held field is no failure.
