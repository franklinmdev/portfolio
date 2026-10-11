---
title: "docmatch"
subtitle: "Invoice reconciliation with vision models, deterministic gates and a benchmark in CI"
description: "docmatch reads invoices with vision language models, checks what they read with deterministic code, matches each invoice against its purchase order and receiving record, and sends anything that doesn't add up to a person. Every stage has its number in a benchmark that names the commit behind it. In progress."
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

## Why it exists

Accounts-payable teams still receive most invoices as PDFs, scans and phone
photos. Turning one into a ledger entry is three problems: reading it, checking
it against what was ordered and received, and deciding whether a person needs to
look. Most public projects stop at the first with a single model call. docmatch
treats reading as a replaceable backend and puts the engineering into the other
two.

## Models read, code decides

The pipeline is an explicit state machine in Postgres: received, extracted,
validated, resolved, matched, then approved or needs review. Models only
structure text. The arithmetic and every decision are deterministic code.

The validation gate (Fig. 2) holds only rules the labels themselves pass: totals
agree and dates are sane. I tried line-total reconciliation, tax arithmetic and
identifier checksums, and left them out, because they fail too often on the
labeled data or apply to almost no documents. A value the model could not read
never fails a rule, and a reading that fails is kept, never retried, because
retrying would shop for a passing answer.

## Phases with numbers, not dates

Each phase ends with a number in the README, and the next phase does not start
until that number exists.

<div class="noted">
<p><b>Extraction.</b> Three backends compared on a pinned subset of 100 documents
(Fig. 3). The cheapest model also scored the highest field F1.</p>
<p><b>Matching.</b> A generator injects labeled discrepancies into purchase
orders and receiving records. On the injected set, precision and recall are
near perfect for every discrepancy type. End to end, from the image, precision
drops by half, and the README says exactly why: an unpaired line misread by
extraction becomes both a false extra line and a false missing line.</p>
<p><b>Entity resolution.</b> Trigram, vector, hybrid, and hybrid with a cross-
encoder reranker, over a vendor catalog. The rule for keeping the reranker was
written before the number. It scored below the plain hybrid, so it was
dropped.</p>
<p><b>Pipeline.</b> The full loop from upload to approval over the HTTP API, with
the cheapest backend.</p>
<aside class="sidenote measured-note">
<dl>
<div><dt>0.977 to 1.000</dt><dd>precision and recall on injected discrepancies</dd></div>
<div><dt>about 0.5</dt><dd>precision end to end, from the image</dd></div>
<div><dt>1,920</dt><dd>catalog entries in the resolution benchmark</dd></div>
<div><dt>0.888 vs 0.917</dt><dd>reranker top-1 against the hybrid's</dd></div>
<div><dt>10.03 s</dt><dd>p95 from upload to approval</dd></div>
<div><dt>$0.00236</dt><dd>per document</dd></div>
<div><dt>0.484</dt><dd>review rate</dd></div>
<div><dt>$1.59</dt><dd>the whole measurement</dd></div>
</dl>
<p class="source"><!-- src:docmatch-phases --></p>
</aside>
</div>

## Guarded in CI

A <a href="https://github.com/franklinmdev/docmatch/blob/main/.github/workflows/
regression.yml">regression gate</a> compares field and line-item F1 for every
backend against the merge base, and fails a pull request that lowers either.

## What I cut, on purpose

Celery and Redis (a Postgres-backed worker is enough on one node), judge-model
eval frameworks (extraction has ground truth), Langfuse (self-hosting it brings
back Redis, and the cloud would put document contents on a third party), and
graph orchestration, settled by an ADR in favor of plain code.

## Next

Packaging: a reproducible entry point so anyone can regenerate a benchmark row
from a clean checkout, and a failure analysis of the top error classes. Then a
Dominican adapter: e-CF XML ingestion, RNC and NCF checks, and the 606 purchase
report.
