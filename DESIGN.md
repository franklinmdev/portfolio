# Design: portfolio

Fences from ~/.claude/design/DESIGN.md (never list, craft floor). Everything
else is this direction.

Chosen 2026-10-11 from three directions (interview: applied AI engineer
reader, "rigorous, with taste", earned motion). Replaces Datasheet.

## Direction: Figure 1

The site reads like a well-made research paper where every project is a
figure you can run, and the proof sits in the margin.

- References: a Tufte book page (sidenotes, figures that carry the argument),
  Distill.pub articles (interactive figures inside prose), a printed journal
  offprint.
- Type: Source Serif 4 Variable for prose and headings (optical size on),
  Libre Franklin Variable for the apparatus (nav, captions, sidenotes,
  buttons, labels), Commit Mono for measured data only (probabilities, F1,
  costs, IDs, digits). Reason: a paper is serif prose with a sans apparatus;
  Franklin Gothic is the classic print sans, and it carries the owner's name.
- Color strategy: ink on paper, achromatic, plus one sepia amber, hue 90,
  used only for measured values: a probability bar, a plotted point, the
  number that decides. Fills `oklch(0.66 0.13 90)` light and
  `oklch(0.8 0.14 90)` dark; text and labels on fills use the deeper
  `oklch(0.48 0.1 90)` light and `oklch(0.82 0.14 90)` dark for contrast.
  Never on chrome, never decorative. Reason: color carries meaning, and here
  the meaning is "this was measured"; amber reads as pencil on graph paper.
- Ground: light is cool white paper `oklch(0.99 0.002 250)`, never cream;
  dark is the same paper projected, graphite `oklch(0.175 0.006 260)`. The
  site opens in the OS preference with a toggle.
- Shape: square figures framed by hairlines and captions, no cards, no
  radius above 2px, no pills. Density: a 40rem reading column and a 15rem
  margin column on desktop; figures span both. Depth: flat; hairline rules
  only.
- Motion signature: the figure plots itself. Bars grow to their measured
  value, fields fill in order, boxes draw onto the invoice, table rows settle
  one by one, digits get weighed one by one. Placements: Fig. 1 to Fig. 4
  only; chrome stays still. Under reduced motion every figure shows its final
  state. Static figures (Fig. 1, Fig. 5) opt in with `data-autoplot`; the
  shared script lives in `Layout.astro`.
- Unexpected move: the measured column. Numbers sit in the margin in amber
  Commit Mono with a sans label (`MeasuredNote.astro`, `.measured-note`; raw
  `.noted` HTML blocks in the deep dives). The prose carries the claim, the
  margin carries the number. On mobile the column folds in under its
  paragraph. The home page shows only numbers a stranger can judge, in plain
  labels; the deep dives add the date and the commit link for each one, and
  carry the expert numbers (F1, review rate) and Fig. 5, the benchmark table.
- First screen: a one-line h1 that says what he builds in plain words, a
  byline of role and country only (no city, no employer hint, never an
  availability line), three text links, then one sentence on what justask is
  and Fig. 1 opening on a request it fills completely. The held case is one
  click away. No abstract, no buttons, no eyebrow, nothing that only describes.

## Tokens

`src/styles/global.css`: `:root` (light), `.dark`, `@theme`. Component
classes: `.page-grid`, `.figure`, `.caption`, `.sidenote`, `.measured-note`,
`.noted`, `.prose`.

## Rules for new surfaces

- Every number shown comes from a source the page links (a commit, an eval
  doc, a recording date). Replays say they are replays.
- Figure numbers are allowed because the prose references them. Section
  numbers, eyebrows and mono labels are not.

## Rejected directions

- Departure board: black, signal yellow, Archivo Expanded split-flap. Most
  stand-out, but risked reading as a gimmick for an applied AI role.
- Patent figure: monochrome line art with reference numerals. Explains
  architecture well, but no accent undersold the live numbers.
- Datasheet (2026-05 to 2026-10): IBM Plex + JetBrains Mono, cyan; shallow,
  and its fonts are now spent.
- warm-editorial, refined-dark, editorial-mono (2026-05).
- "Models pick. Code decides. The figures prove it." as the h1 (2026-10-17):
  a riddle to a recruiter; "the figures" pointed at things not yet seen. Not
  kept as a kicker either: eyebrows are banned below.
- "I build AI features that know when they're unsure, and I measure them
  before they ship." (2026-10-17): three lines on desktop, four on mobile.
- "Full-Stack AI Engineer" in the byline and title (2026-10-17): "AI Engineer"
  is the term recruiters search; the Experience entry keeps the formal title.
- City and "building financial software since 2023" in the byline
  (2026-10-17): revealed too much about where he works.
- "Open to remote roles" in the byline (2026-10-17): read as needy and as a
  public notice to the current employer.
- Commit links and dates on the home page (2026-10-17): noise to most
  visitors; they live in the deep dives.
- Fig. 3 as a scatter plot (2026-10-11): the table already held the commit
  links; the plot doubled the height for three points. Table only.
- Contact form (2026-10-11): a mailto line says the same with no island.
- Crimson hue 5 accent (2026-10-11): read as pink on the dark ground. True
  red is blocked by DomiProp's orange 47 on the same page. Ink only and olive
  115 were the other candidates.

## Benchmarks

- Edward Tufte's books: sidenotes as the proof channel.
- Distill.pub (<https://distill.pub>): figures you can operate inside prose.
