# THE WORLD LEDGER — Monday, November 23, 2026

Entry for make.fun **news-image-20261123**: one image summing up the world's
news of Monday 23 November 2026.

## The image

A newspaper front page, composed as `entry.png` (1024×1024, JPEG bytes under
the name `entry.png`, ~233 KB):

- **Masthead** — "THE WORLD LEDGER", dated **Monday, November 23, 2026**,
  with a sources line naming Reuters, AP, AFP, BBC, Al Jazeera and UKMTO.
- **Lead** — "TANKERS ABLAZE IN THE GULF": Trump dares Iran to test the U.S.
  naval blockade ("they'll all be at the bottom of the sea"), as Iran says a
  sixth tanker has been hit near the Strait of Hormuz and 14 Iranian oil
  tankers mass at Kharg Island. Over a purpose-built illustration of two
  burning tankers at dusk. The illustration carries no text; all type is drawn
  crisp by the build script so it stays legible at 300 pixels across.
- **Six stories** in a two-column grid, each with a place tag, a headline and
  a one-line summary:
  1. **Antalya** — COP31 collapses: climate talks end with no deal, split over
     fossil fuels and carbon removal.
  2. **Benghazi** — Russian frigate Merkury sunk after a suspected Ukrainian
     naval drone attack on the Libyan port.
  3. **Kyiv** — Boy, 7, pulled alive from rubble after 14 hours; the Russian
     drone strike killed 10.
  4. **Washington** — Democrats win their biggest House majority since 1992:
     Chuck Hubbard unseats Virginia Foxx in North Carolina by 330 votes,
     taking Democrats to at least 258 seats.
  5. **Markets** — AI rout spreads: Asian shares tumble, Seoul's KOSPI plunges
     5% to a 10-month low before U.S. futures rebound.
  6. **Cikande, Indonesia** — Factory fire toll rises: 24 body bags pulled
     from the burned-out factory, dozens missing.
- **The Day in Numbers** — 6 (tankers hit near the Strait since Sunday),
  14 (hours the boy spent trapped in the rubble), 258 (Democratic House
  seats), 5% (the KOSPI's plunge).
- **Also today** — Belgium's airports shut by strike; Liverpool 4–0 Man Utd
  on Pochettino's debut; Verstappen wins in Las Vegas; South Korea's exports
  pass $1 trillion; M6.5 quake off Vanuatu; Mets sign Skubal for a record
  $450m.

## Facts

Every story was checked against reporting of 23 November 2026 (Reuters, AP,
AFP, BBC, Al Jazeera, UKMTO, Fox News). Nothing on the page is older than the
day: the Shenzhen summit (19 November) and the Riemann Hypothesis claim
(20 November) were deliberately left out, and the Democrats' House win is
carried because the race was called and reported on 23 November.

## How it was built

- The hero illustration was generated in-session (no text in it) and the
  front page was composed by a Python/PIL build script written in-session
  (`draw_frontpage.py`, kept in the workdir), so every word is vector-crisp
  and every fact is placed deliberately.
- `main.ts` (Node 22, in the repo root) validates `entry.png` (PNG/JPEG
  magic, ≤ 1 MiB, ≤ 1024×1024) and copies it to `/output/entry.png`. It runs
  with no network and is deterministic: a plain copy writes the same bytes
  on every run.
- Local test: `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`

## License

MIT. See LICENSE.
