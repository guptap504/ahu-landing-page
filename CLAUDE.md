## Design Context

### Users
C-suite executives, facility heads and procurement decision-makers evaluating cooling for data centers, commercial IT parks and pharma manufacturing. They arrive seeking confidence that Garvata is a mature, reliable vendor. They care about ROI, energy cost savings, uptime and operational simplicity — not technical deep-dives. The interface should help them quickly understand value, find their industry, and reach out.

### Positioning
"AI native cooling": Garvata pairs AI control (Cooling OS for data centers, GarvataAI for AHUs) with its own EC fans and controllers. Be honest about availability — every product carries a status badge (Available now / Early access / In development). Cooling OS is early access; EC motor and precision cooling units (CRAH/CRAC/CDU) are in development. Don't publish case-study figures or partner logos until cleared.

### Site structure (modelled on refroid.com)
- `/` Home — dark hero, intro + stat cards, industry cards, product rows, how it works, demo, ROI callout, contact.
- `/solutions/:industry` — centred intro, then one rounded container with industry tabs (data-centers, commercial, pharma). Each panel: intro, industry sections, key capabilities, "Explore products" cards. Tabs are links; they keep scroll position via `state={{ keepScroll: true }}`.
- `/products` — every product as an alternating text/media row, plus EC fan gallery, PDFs and capabilities.
- `/calculate` (ROI calculator) and `/privacy` keep their own simple headers.
- Product names, summaries, images and status live in `src/content/catalog.ts`. Shared layout pieces live in `src/components/site/`; industry panels in `src/components/solutions/`.

### Brand Personality
**Clean, Professional, Reliable.** Understated elegance that signals maturity and dependability — a trusted partner for critical infrastructure. The tone is composed, confident, and precise without being cold.

### Aesthetic Direction
- **Visual tone**: Refroid-style layout in Garvata's brand. Navy (`navy` #071827) hero cards and feature panels, white/gray-50 content sections, hairline dividers between rows. Real product renders and photos, not stock or abstract art.
- **Color palette**: Primary cyan-teal (`primary` #0e7490) for CTAs and key data on light backgrounds; `cyan-400` for accents on navy. Gray-900 headings, gray-600 body. Amber (`accent` #b45309) for secondary highlights. Emerald for success/check indicators.
- **Typography**: DM Sans (body via `font-sans`), Outfit (headings via `font-serif`), JetBrains Mono (stats, eyebrows and data via `font-mono`).
- **Signature patterns**: two-tone headings (second line in brand colour) via `SectionHeading`; split section headers (heading left, copy right); pill CTAs with an arrow chip via `PillLink`; floating rounded navy nav; rounded cards (`rounded-2xl` to `rounded-[1.75rem]`); rounded navy footer card.
- **Theme**: Light page with navy feature surfaces. Dark mode supported via CSS variables.
- **Anti-references**: No glassmorphism, no backdrop-blur, no gradient or glow effects, no icon-in-colored-circle patterns, no hover-scale animations, no staggered fade-ins, no dot-pattern overlays.

### Design Principles
1. **Clarity over cleverness** — Every section communicates value in seconds. Specific claims ("60% energy savings") over adjectives ("advanced technology"), and only claims we can back.
2. **Restrained confidence** — Primary color on CTAs and key stats only. White space signals maturity.
3. **Data speaks** — Stats use font-mono. The AHU comparison table is the strongest proof element — keep it clean and prominent.
4. **Varied layouts** — Each section uses a different structure: stat cards, semantic table, numbered flow, architecture diagram, product rows, image grid.
5. **Accessible by default** — WCAG AA contrast ratios, keyboard navigation, reduced-motion support, semantic HTML, no user-scalable=no. Check every page at 390px for horizontal overflow.
