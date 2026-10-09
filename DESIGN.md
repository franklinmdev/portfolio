# Design: portfolio

Fences from ~/.claude/design/DESIGN.md (never list, craft floor). Everything
else is this direction.

Recorded from the shipped code on 2026-10-09 (document style, no redesign
interview). The look predates the never list and keeps a few patterns it now
bans; they are listed under Known drift.

## Direction: Datasheet

An engineer's component datasheet: the person's voice is the content, and
engineering precision is only the frame.

- References: a printed component datasheet, an instrument panel, a terminal
  session.
- Type: IBM Plex Sans Variable for reading prose and headings; JetBrains Mono
  Variable rationed to dates, figures, tech chips and form inputs. Reason:
  chosen in the 2026-05 redesign, before IBM Plex was marked spent.
- Color strategy: one anchor hue, used for meaning only (current section,
  primary action, links, focus). Dark primary `oklch(0.82 0.14 195)`, light
  primary `oklch(0.46 0.13 240)`. Reason: color carries meaning.
- Ground: dark is the deck, near-black with a blue cast
  (`oklch(0.14 0.015 240)`); light is the printed run of the same document,
  paper and ink.
- Shape: sharp, 0.25rem radius. Density: comfortable reading measure (65ch).
  Depth: the `.panel` surface, a hairline border plus one soft offset shadow.
- Motion signature: the blinking caret, placements: contact channel and the
  form's success line.
- Unexpected move: the left catalog rail, a scroll-spy spine down the page.

## Tokens

`src/styles/global.css`: `:root` (light), `.dark`, `@theme`, and the
`.panel`, `.measure`, `.module-title`, `.prose` component classes.

## Known drift from the never list

- Light ground is a warm off-white paper (hue 90).
- `.module-label` is a numbered mono eyebrow above section headings.

New surfaces must not add more of either.

## Rejected directions

- warm-editorial: Fraunces with clay, too close to the Anthropic house style.
- refined-dark: too close to the old site.
- editorial-mono: grayscale with amber and Hanken Grotesk, lost the A/B.
