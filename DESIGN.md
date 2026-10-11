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
- Color strategy: ink on paper, achromatic, plus one crimson
  (`oklch(0.53 0.2 5)` light, `oklch(0.72 0.16 5)` dark) used only for
  measured values: a probability bar, a plotted point, the number that
  decides. Never on chrome, never decorative. Reason: color carries meaning,
  and here the meaning is "this was measured".
- Ground: light is cool white paper `oklch(0.99 0.002 250)`, never cream;
  dark is the same paper projected, graphite `oklch(0.175 0.006 260)`. The
  site opens in the OS preference with a toggle.
- Shape: square figures framed by hairlines and captions, no cards, no
  radius above 2px, no pills. Density: a 40rem reading column and a 15rem
  margin column on desktop; figures span both. Depth: flat; hairline rules
  only.
- Motion signature: the figure plots itself. Bars grow to their measured
  value, fields fill in order, boxes draw onto the invoice, points settle on
  the plot, digits get weighed one by one. Placements: Fig. 1 to Fig. 4 only;
  chrome stays still. Under reduced motion every figure shows its final
  state.
- Unexpected move: the margin. Sidenotes, keyed by superscript numbers,
  carry the proof (commit links, eval rules, npm, live links). On mobile they
  fold in under their paragraph.

## Tokens

`src/styles/global.css`: `:root` (light), `.dark`, `@theme`. Component
classes: `.page-grid`, `.figure`, `.caption`, `.sidenote`, `.prose`.

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

## Benchmarks

- Edward Tufte's books: sidenotes as the proof channel.
- Distill.pub (https://distill.pub): figures you can operate inside prose.
