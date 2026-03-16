## Design Context

### Users
C-suite executives and procurement decision-makers evaluating enterprise building automation solutions. They arrive seeking confidence that GarvataAI is a mature, reliable vendor. They care about ROI, energy cost savings, and operational simplicity — not technical deep-dives. The interface should help them quickly understand value, compare alternatives, and reach out.

### Brand Personality
**Clean, Professional, Reliable.** Understated elegance that signals maturity and dependability — not a flashy startup, but a trusted partner for enterprise infrastructure. The tone is composed, confident, and precise without being cold.

### Aesthetic Direction
- **Visual tone**: Professional & corporate — clean sections, structured grids, enterprise SaaS style. Solid backgrounds, no decorative effects. Think Siemens/Honeywell, not startup landing page.
- **Color palette**: Cyan-teal primary (#0891b2) used sparingly — CTAs and key data only. Gray-900 for headings, gray-600 for body. Amber accent (#d97706) for secondary highlights. Emerald for success/check indicators.
- **Typography**: DM Sans (body via `font-sans`), Outfit (headings via `font-serif`), JetBrains Mono (stats/data via `font-mono`).
- **Components**: Solid white backgrounds with 1px gray-200 borders. No glassmorphism, no glass shadows, no backdrop-blur on content. Border radius 0.5rem (8px).
- **Theme**: Light mode only on landing page. Dark mode supported via CSS variables.
- **Anti-references**: No glassmorphism, no gradient heroes, no icon-in-colored-circle patterns, no hover-scale animations, no staggered fade-ins, no dot-pattern overlays, no cyan gradients. These are AI-generated design tells.

### Design Principles
1. **Clarity over cleverness** — Every section communicates value in seconds. Specific claims ("60% energy savings") over adjectives ("advanced technology"). Outfit headings, concise copy, structured layouts.
2. **Restrained confidence** — Primary color on CTAs and key stats only. White space signals maturity. Solid backgrounds, not decorative effects.
3. **Data speaks** — Stats use font-mono. Comparison table is the strongest element — keep it clean and prominent. Let numbers do the convincing.
4. **Varied layouts** — Each section uses a different visual structure. No repeating the same card pattern. Stats band, semantic table, numbered flow, image grid, carousel — each section distinct.
5. **Accessible by default** — WCAG AA contrast ratios, keyboard navigation, reduced-motion support, semantic HTML, no user-scalable=no.
