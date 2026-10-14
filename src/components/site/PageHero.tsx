import type { ReactNode } from "react";
import { Container } from "./ui";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  /** Second line of the headline, set in cyan */
  accent: string;
  description: string;
  actions: ReactNode;
  /** Product render, photo or diagram shown beside the copy */
  visual?: ReactNode;
  footnote?: ReactNode;
};

// Dark hero inset in a rounded card, with the floating nav sitting on top.
export default function PageHero({
  eyebrow,
  title,
  accent,
  description,
  actions,
  visual,
  footnote,
}: PageHeroProps) {
  return (
    <section className="p-2 sm:p-4">
      {/* Fills the viewport, leaving the section padding as an even margin
          on all four sides. svh avoids mobile browser-bar jumps. */}
      <div className="relative isolate flex min-h-[calc(100vh-1rem)] items-center overflow-hidden rounded-[1.75rem] bg-navy supports-[height:100svh]:min-h-[calc(100svh-1rem)] sm:min-h-[calc(100vh-2rem)] sm:supports-[height:100svh]:min-h-[calc(100svh-2rem)]">
        {/* Concentric rings echo the Garvata mark. */}
        <div
          className="pointer-events-none absolute -right-48 top-1/2 -z-10 hidden -translate-y-1/2 lg:block"
          aria-hidden="true"
        >
          {[56, 44, 32, 20].map((size) => (
            <div
              key={size}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]"
              style={{ width: `${size}rem`, height: `${size}rem` }}
            />
          ))}
        </div>

        <Container className="grid items-center gap-8 pb-10 pt-28 sm:gap-12 sm:pb-14 sm:pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:pb-16 lg:pt-32">
          <div>
            <p className="mb-6 inline-flex items-center rounded-full border border-white/15 px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
              {eyebrow}
            </p>
            <h1 className="font-serif text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-tight">
              <span className="block text-white">{title}</span>
              <span className="block text-cyan-400">{accent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {description}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              {actions}
            </div>
            {footnote && <div className="mt-6">{footnote}</div>}
          </div>
          {visual && <div className="relative">{visual}</div>}
        </Container>
      </div>
    </section>
  );
}
