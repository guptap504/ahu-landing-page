import type { Logo, Slide } from "@/content/investorDeck";
import type { ReactNode } from "react";

// Slides are laid out on a fixed 1280×720 canvas; the presenter scales the
// canvas to the screen, and print renders it 1:1 on a 1280×720 page.
export const SLIDE_WIDTH = 1280;
export const SLIDE_HEIGHT = 720;

const eyebrow = "font-mono text-[12px] font-bold uppercase tracking-[0.14em]";
const Arrow = ({ className = "" }: { className?: string }) => (
  <span aria-hidden="true" className={`font-mono text-[22px] leading-none text-gray-400 ${className}`}>
    →
  </span>
);

// Section eyebrow plus the site's two-tone heading: title, then accent in
// the brand colour.
function Heading({
  label,
  title,
  accent,
  dark = false,
  size = 32,
}: {
  label?: string;
  title: string;
  accent?: string;
  dark?: boolean;
  size?: number;
}) {
  return (
    <div>
      {label && (
        <p className={`${eyebrow} mb-2 ${dark ? "text-cyan-400" : "text-primary"}`}>{label}</p>
      )}
      <h2
        className="font-serif font-semibold leading-[1.1] tracking-tight"
        style={{ fontSize: size }}
      >
        <span className={dark ? "text-white" : "text-gray-900"}>{title}</span>
        {accent && <span className={dark ? "text-cyan-400" : "text-primary"}> {accent}</span>}
      </h2>
    </div>
  );
}

function Frame({
  label,
  title,
  accent,
  dark = false,
  footer,
  page,
  children,
}: {
  label?: string;
  title?: string;
  accent?: string;
  dark?: boolean;
  footer: string;
  page: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex h-full w-full flex-col px-16 pb-9 pt-10 font-sans ${dark ? "bg-navy text-white" : "bg-[#f5f7f9] text-gray-900"}`}
    >
      {title && <Heading label={label} title={title} accent={accent} dark={dark} />}
      <div className="mt-5 flex min-h-0 flex-1 flex-col">{children}</div>
      <div
        className={`mt-5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] ${dark ? "text-slate-500" : "text-gray-400"}`}
      >
        <span className="flex items-center gap-2">
          <img src="/logo192.svg" alt="" className="h-4 w-4" />
          {footer}
        </span>
        <span>{page}</span>
      </div>
    </div>
  );
}

const LogoImage = ({ logo, height }: { logo: Logo; height: number }) => (
  <img
    src={logo.src}
    alt={logo.name}
    width={Math.round((logo.width / logo.height) * height)}
    height={height}
    className="object-contain"
  />
);

// Small drawings for the software layers on the architecture slide.
const visualBox = "h-[110px] w-full rounded-xl";

function DcimVisual() {
  // Data-hall floor plan: racks shaded by load.
  const loads = [0, 1, 2, 1, 0, 1, 2, 3, 1, 0, 1, 1, 2, 2, 0, 1, 3, 1];
  const fills = ["#cffafe", "#67e8f9", "#0e7490", "#b45309"];
  return (
    <svg viewBox="0 0 220 110" className={`${visualBox} bg-gray-50`} role="img" aria-label="Data hall rack layout shaded by IT load">
      {loads.map((load, i) => (
        <rect
          key={i}
          x={22 + (i % 6) * 30}
          y={16 + Math.floor(i / 6) * 28}
          width={24}
          height={20}
          rx={3}
          fill={fills[load]}
        />
      ))}
      <rect x={22} y={98} width={174} height={2} rx={1} fill="#d1d5db" />
    </svg>
  );
}

function CoolingOsVisual() {
  // Digital twin: a room heat map with a forecast line running ahead of it.
  const cells = [0, 1, 1, 2, 0, 1, 1, 2, 3, 1, 0, 1];
  const fills = ["#11283d", "#155e75", "#0e7490", "#22d3ee"];
  return (
    <svg viewBox="0 0 220 110" className={`${visualBox} bg-navy-700`} role="img" aria-label="Digital twin of the room with a temperature forecast">
      {cells.map((cell, i) => (
        <rect key={i} x={16 + (i % 4) * 22} y={18 + Math.floor(i / 4) * 26} width={18} height={22} rx={3} fill={fills[cell]} />
      ))}
      <polyline points="116,78 132,70 148,74 164,58" fill="none" stroke="#22d3ee" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="164,58 182,50 204,42" fill="none" stroke="#22d3ee" strokeWidth={3} strokeLinecap="round" strokeDasharray="4 6" />
      <circle cx={164} cy={58} r={4} fill="#22d3ee" />
      <rect x={116} y={92} width={88} height={2} rx={1} fill="#334155" />
    </svg>
  );
}

function BmsVisual() {
  // Controller panel: setpoint display, status lights and terminals.
  return (
    <svg viewBox="0 0 220 110" className={`${visualBox} bg-gray-50`} role="img" aria-label="Building management controller panel">
      <rect x={40} y={10} width={140} height={90} rx={8} fill="#ffffff" stroke="#d1d5db" strokeWidth={2} />
      <rect x={52} y={22} width={84} height={34} rx={4} fill="#071827" />
      <text x={94} y={45} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize={15} fontWeight={700} fill="#22d3ee">
        24.0°C
      </text>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={152 + (i % 2) * 14} cy={28 + Math.floor(i / 2) * 14} r={4} fill={i === 2 ? "#b45309" : "#10b981"} />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={54 + i * 20} y={70} width={12} height={18} rx={2} fill="#e5e7eb" />
      ))}
    </svg>
  );
}

// Schematics for the problem slide's points, drawn on navy.
const mono = "'JetBrains Mono', monospace";

function ProblemVisual({ visual }: { visual: "static" | "reactive" | "silos" | "uncoordinated" }) {
  const common = { viewBox: "0 0 200 90", className: "h-[90px] w-[200px] shrink-0", "aria-hidden": true } as const;
  switch (visual) {
    case "static":
      // A fixed rule that ignores the changing load.
      return (
        <svg {...common}>
          <polyline points="8,62 28,40 48,58 68,30 88,52 108,24 128,46 148,34 168,58 192,38" fill="none" stroke="#94a3b8" strokeWidth={2} strokeLinejoin="round" />
          <line x1={8} y1={48} x2={192} y2={48} stroke="#22d3ee" strokeWidth={2.5} strokeDasharray="6 5" />
          <text x={8} y={14} fontFamily={mono} fontSize={10} fill="#94a3b8">load</text>
          <text x={192} y={84} textAnchor="end" fontFamily={mono} fontSize={10} fill="#22d3ee">fixed rule</text>
        </svg>
      );
    case "reactive":
      // Cooling responds only after the heat has arrived.
      return (
        <svg {...common}>
          <path d="M8 58 H60 C74 58 78 22 92 22 H192" fill="none" stroke="#fbbf24" strokeWidth={2.5} />
          <path d="M8 58 H110 C124 58 128 28 142 28 H192" fill="none" stroke="#22d3ee" strokeWidth={2.5} />
          <path d="M76 76 H126 M76 71 V81 M126 71 V81" stroke="#e2e8f0" strokeWidth={1.5} />
          <text x={134} y={80} fontFamily={mono} fontSize={10} fill="#e2e8f0">lag</text>
          <text x={8} y={14} fontFamily={mono} fontSize={10} fill="#fbbf24">heat</text>
          <text x={46} y={14} fontFamily={mono} fontSize={10} fill="#22d3ee">cooling</text>
        </svg>
      );
    case "silos":
      // DCIM and BMS don't talk, and fan, valve and pump each run their own
      // loop behind a wall.
      return (
        <svg {...common} viewBox="0 0 200 100" className="h-[100px] w-[200px] shrink-0">
          {[
            ["DCIM", 8],
            ["BMS", 136],
          ].map(([name, x]) => (
            <g key={name}>
              <rect x={x} y={4} width={56} height={24} rx={5} fill="#11283d" stroke="#64748b" strokeWidth={1.5} />
              <text x={Number(x) + 28} y={20} textAnchor="middle" fontFamily={mono} fontSize={10} fill="#e2e8f0">
                {name}
              </text>
            </g>
          ))}
          <line x1={64} y1={16} x2={136} y2={16} stroke="#64748b" strokeWidth={1.5} strokeDasharray="3 4" />
          <path d="M94 10 L106 22 M106 10 L94 22" stroke="#fbbf24" strokeWidth={2.5} strokeLinecap="round" />
          <text x={100} y={40} textAnchor="middle" fontFamily={mono} fontSize={10} fill="#94a3b8">no link</text>
          {["Fan", "Valve", "Pump"].map((name, i) => {
            const x = 8 + i * 67;
            return (
              <g key={name}>
                <rect x={x} y={70} width={50} height={26} rx={5} fill="#11283d" stroke="#64748b" strokeWidth={1.5} />
                <text x={x + 25} y={87} textAnchor="middle" fontFamily={mono} fontSize={10} fill="#e2e8f0">{name}</text>
                <path d={`M${x + 12} 70 C${x + 12} 50 ${x + 38} 50 ${x + 38} 66`} fill="none" stroke="#22d3ee" strokeWidth={2} />
                <path d={`M${x + 33} 63 L${x + 38} 70 L${x + 43} 63 Z`} fill="#22d3ee" />
              </g>
            );
          })}
          {[66, 133].map((x) => (
            <line key={x} x1={x} y1={50} x2={x} y2={98} stroke="#64748b" strokeWidth={1.5} strokeDasharray="3 4" />
          ))}
        </svg>
      );
    case "uncoordinated":
      // Two units working against each other: one humidifies, one dries.
      return (
        <svg {...common}>
          {[8, 132].map((x, i) => (
            <g key={x}>
              <rect x={x} y={34} width={60} height={34} rx={5} fill="#11283d" stroke="#64748b" strokeWidth={1.5} />
              <text x={x + 30} y={55} textAnchor="middle" fontFamily={mono} fontSize={10} fill="#e2e8f0">CRAH {i + 1}</text>
            </g>
          ))}
          <path d="M70 51 H90" stroke="#fbbf24" strokeWidth={2.5} />
          <path d="M89 45 L97 51 L89 57 Z" fill="#fbbf24" />
          <path d="M130 51 H110" stroke="#22d3ee" strokeWidth={2.5} />
          <path d="M111 45 L103 51 L111 57 Z" fill="#22d3ee" />
          <text x={82} y={26} textAnchor="middle" fontFamily={mono} fontSize={10} fill="#fbbf24">+RH</text>
          <text x={118} y={26} textAnchor="middle" fontFamily={mono} fontSize={10} fill="#22d3ee">−RH</text>
          <text x={100} y={84} textAnchor="middle" fontFamily={mono} fontSize={10} fill="#94a3b8">fighting</text>
        </svg>
      );
  }
}

// Schematics for the benefits slide, drawn on white.
function BenefitVisual({
  visual,
}: {
  visual: "energy" | "capacity" | "coordination" | "autonomy" | "guardrails" | "edge";
}) {
  const common = { viewBox: "0 0 120 56", className: "h-14 w-[120px]", "aria-hidden": true } as const;
  switch (visual) {
    case "energy":
      // Energy before and after: a quarter off.
      return (
        <svg {...common}>
          <rect x={30} y={8} width={24} height={44} rx={3} fill="#d1d5db" />
          <rect x={66} y={19} width={24} height={33} rx={3} fill="#0e7490" />
          <line x1={22} y1={52} x2={98} y2={52} stroke="#9ca3af" strokeWidth={1.5} />
        </svg>
      );
    case "capacity":
      // A rack with more of its slots in use.
      return (
        <svg {...common}>
          <rect x={38} y={3} width={40} height={50} rx={4} fill="none" stroke="#9ca3af" strokeWidth={2} />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={44} y={9 + i * 8.6} width={28} height={5} rx={1.5} fill={i < 4 ? "#0e7490" : "#a5f3fc"} />
          ))}
          <path d="M90 28 H102 M96 22 V34" stroke="#0e7490" strokeWidth={2.5} strokeLinecap="round" />
        </svg>
      );
    case "coordination":
      // Three units on one controller.
      return (
        <svg {...common}>
          <path d="M60 12 V22 M24 32 V22 H96 V32" fill="none" stroke="#0e7490" strokeWidth={2} />
          <circle cx={60} cy={8} r={5} fill="#0e7490" />
          {[14, 50, 86].map((x) => (
            <rect key={x} x={x} y={32} width={20} height={20} rx={3} fill="#a5f3fc" stroke="#0e7490" strokeWidth={1.5} />
          ))}
        </svg>
      );
    case "autonomy":
      // A closed loop running on its own.
      return (
        <svg {...common}>
          <path d="M60 8 A20 20 0 1 1 40 28" fill="none" stroke="#0e7490" strokeWidth={3} />
          <path d="M40 20 L34 30 L46 30 Z" fill="#0e7490" />
          <circle cx={60} cy={28} r={5} fill="#a5f3fc" stroke="#0e7490" strokeWidth={1.5} />
        </svg>
      );
    case "guardrails":
      // Control kept inside safe limits.
      return (
        <svg {...common}>
          <line x1={6} y1={10} x2={114} y2={10} stroke="#b45309" strokeWidth={2} strokeDasharray="5 4" />
          <line x1={6} y1={46} x2={114} y2={46} stroke="#b45309" strokeWidth={2} strokeDasharray="5 4" />
          <polyline points="6,30 22,20 38,36 54,22 70,34 86,18 102,32 114,26" fill="none" stroke="#0e7490" strokeWidth={2.5} strokeLinejoin="round" />
        </svg>
      );
    case "edge":
      // A controller chip at the equipment.
      return (
        <svg {...common}>
          {[20, 28, 36].map((o) => (
            <g key={o} stroke="#9ca3af" strokeWidth={2}>
              <line x1={34} y1={o} x2={44} y2={o} />
              <line x1={76} y1={o} x2={86} y2={o} />
              <line x1={o + 32} y1={2} x2={o + 32} y2={12} />
              <line x1={o + 32} y1={44} x2={o + 32} y2={54} />
            </g>
          ))}
          <rect x={44} y={12} width={32} height={32} rx={4} fill="#071827" />
          <rect x={52} y={20} width={16} height={16} rx={2} fill="none" stroke="#22d3ee" strokeWidth={2} />
        </svg>
      );
  }
}

// Flow lines with dashes running in the direction of flow (deck-flow in
// index.css), for the control-loop slide.
const head = (x1: number, y1: number, x2: number, y2: number, size = 8) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const bx = x2 - size * Math.cos(a);
  const by = y2 - size * Math.sin(a);
  const w = size * 0.55;
  return `M${x2} ${y2} L${bx - w * Math.sin(a)} ${by + w * Math.cos(a)} L${bx + w * Math.sin(a)} ${by - w * Math.cos(a)} Z`;
};

function FlowArrow({ direction = "right", length = 40 }: { direction?: "right" | "up"; length?: number }) {
  const [w, h] = direction === "right" ? [length, 16] : [16, length];
  const [x1, y1, x2, y2] = direction === "right" ? [0, 8, length, 8] : [8, length, 8, 0];
  return (
    <svg aria-hidden="true" width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0 text-primary">
      <line x1={x1} y1={y1} x2={direction === "right" ? x2 - 6 : x2} y2={direction === "up" ? y2 + 6 : y2} stroke="currentColor" strokeWidth={2} className="deck-flow" />
      <path d={head(x1, y1, x2, y2)} fill="currentColor" />
    </svg>
  );
}

// The control-loop lists use fixed-height rows so the fan lines meet each
// row's centre.
const ROW = 38;
const ROW_GAP = 8;

function FanLines({ count, mode, width = 56 }: { count: number; mode: "in" | "out"; width?: number }) {
  const height = count * ROW + (count - 1) * ROW_GAP;
  const mid = height / 2;
  const rows = Array.from({ length: count }, (_, i) => i * (ROW + ROW_GAP) + ROW / 2);
  return (
    <svg aria-hidden="true" width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="shrink-0 text-primary">
      {rows.map((y) =>
        mode === "in" ? (
          <line key={y} x1={0} y1={y} x2={width - 8} y2={mid} stroke="currentColor" strokeWidth={2} className="deck-flow" />
        ) : (
          <g key={y}>
            <line x1={0} y1={mid} x2={width - 6} y2={y} stroke="currentColor" strokeWidth={2} className="deck-flow" />
            <path d={head(0, mid, width, y, 7)} fill="currentColor" />
          </g>
        ),
      )}
      {mode === "in" && <path d={head(0, mid, width, mid)} fill="currentColor" />}
    </svg>
  );
}

function SlideBody({
  slide,
  footer,
  page,
  step,
}: {
  slide: Slide;
  footer: string;
  page: string;
  /** Build step being shown; undefined shows the slide fully built. */
  step?: number;
}) {
  switch (slide.kind) {
    case "cover":
      return (
        <div className="relative flex h-full w-full flex-col justify-between bg-navy px-16 py-14 font-sans text-white">
          <div className="flex items-center gap-3">
            <img src="/logo192.svg" alt="" className="h-9 w-9" />
            <span className="font-serif text-[22px] font-bold">Garvata Labs</span>
          </div>
          <div className="absolute right-20 top-1/2 h-[300px] w-[300px] -translate-y-1/2">
            <img src="/logo192.svg" alt="" className="deck-spin h-full w-full" />
          </div>
          <div>
            <h1 className="font-serif text-[84px] font-semibold leading-[1.02] tracking-tight">
              <span className="block text-white">{slide.title}</span>
              <span className="block text-cyan-400">{slide.accent}</span>
            </h1>
            <p className="mt-8 inline-block border-t border-white/15 pt-6 font-mono text-[15px] uppercase tracking-[0.14em] text-slate-400">
              {slide.subtitle}
            </p>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
            Investor presentation · Confidential
          </p>
        </div>
      );

    case "problem":
      return (
        <Frame label={slide.label} title={slide.title} accent={slide.accent} footer={footer} page={page}>
          <div className="flex flex-1 flex-col rounded-[1.25rem] bg-navy p-10">
            <h3 className="font-serif text-[30px] font-semibold leading-snug text-white">{slide.heading}</h3>
            <ol className="mt-8 grid flex-1 auto-rows-fr grid-cols-2 gap-5">
              {slide.points.map((point, i) => (
                <li key={point.text} className="flex items-center gap-6 rounded-xl border border-white/15 px-6 py-5">
                  <div className="flex-1">
                    <p className="font-mono text-[14px] font-bold text-cyan-400">{String(i + 1).padStart(2, "0")}</p>
                    <p className="mt-2 font-serif text-[24px] font-semibold leading-snug text-white">{point.text}</p>
                  </div>
                  <ProblemVisual visual={point.visual} />
                </li>
              ))}
            </ol>
            <p className="mt-8 border-t border-white/10 pt-6 font-serif text-[24px] font-semibold text-cyan-400">
              {slide.stat}
            </p>
          </div>
        </Frame>
      );

    case "system":
      return (
        <Frame label={slide.label} title={slide.title} accent={slide.accent} footer={footer} page={page}>
          <div className="flex flex-1 items-stretch gap-4">
            <div className="flex w-[200px] flex-col items-center justify-center gap-5 rounded-[1.25rem] bg-navy p-6 text-center">
              <img src="/logo192.svg" alt="" className="h-14 w-14" />
              <p className="font-serif text-[26px] font-semibold leading-tight text-white">{slide.root}</p>
            </div>
            <div className="flex flex-1 flex-col gap-4">
              {slide.branches.map((branch) => (
                <div key={branch.name} className="flex flex-1 items-center gap-4">
                  <Arrow className="text-primary" />
                  <p className="w-[260px] rounded-[1.25rem] border border-gray-200 bg-white px-6 py-5 font-serif text-[21px] font-semibold leading-snug text-gray-900">
                    {branch.name}
                  </p>
                  <Arrow className="text-primary" />
                  <ul className="flex flex-1 flex-col gap-3">
                    {branch.leaves.map((leaf) => (
                      <li
                        key={leaf}
                        className="rounded-xl border border-cyan-300 bg-cyan-50 px-5 py-3 text-[16px] font-semibold leading-snug text-gray-900"
                      >
                        {leaf}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-5 rounded-xl border border-cyan-200 bg-cyan-50 px-6 py-4 font-serif text-[19px] font-semibold leading-snug text-gray-900">
            {slide.statement}
          </p>
        </Frame>
      );

    case "market": {
      const max = Math.max(...slide.market.bars.map((bar) => bar.value));
      return (
        <Frame label={slide.label} title={slide.title} accent={slide.accent} footer={footer} page={page}>
          <div className="grid flex-1 grid-cols-[1fr_1.25fr] gap-6">
            <div className="flex flex-col rounded-[1.25rem] border border-gray-200 bg-white p-8">
              <p className={`${eyebrow} text-primary`}>{slide.market.eyebrow}</p>
              <p className="mt-3 font-mono text-[44px] font-bold leading-none text-gray-900">
                {slide.market.bars[slide.market.bars.length - 1].label}
              </p>
              <div className="mt-6 flex flex-1 items-end gap-10 border-b border-gray-200 px-6">
                {slide.market.bars.map((bar, i) => (
                  <div key={bar.year} className="flex flex-1 flex-col items-center gap-2">
                    <span className="font-mono text-[15px] font-bold text-gray-900">{bar.label}</span>
                    <div
                      className={`deck-grow-y w-full rounded-t-lg ${i === slide.market.bars.length - 1 ? "bg-primary" : "bg-cyan-200"}`}
                      style={{ height: `${(bar.value / max) * 190}px` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-10 px-6 pt-2">
                {slide.market.bars.map((bar) => (
                  <span key={bar.year} className="flex-1 text-center font-mono text-[13px] text-gray-500">
                    {bar.year}
                  </span>
                ))}
              </div>
              <p className="mt-4 font-serif text-[20px] font-semibold text-primary">{slide.market.cagr}</p>
            </div>
            <div className="flex flex-col rounded-[1.25rem] bg-navy p-8 text-white">
              <p className={`${eyebrow} text-cyan-400`}>{slide.savings.eyebrow}</p>
              <p className="mt-3 font-mono text-[56px] font-bold leading-none text-cyan-400">
                {slide.savings.headline}
              </p>
              <p className="mt-2 text-[16px] text-slate-300">{slide.savings.headlineLabel}</p>
              <div className="mt-7 flex items-center gap-3">
                {slide.savings.chain.map((link, i) => (
                  <div key={link.label} className="flex flex-1 items-center gap-3">
                    <div className="flex-1 rounded-xl border border-white/15 px-4 py-3">
                      <p className="font-mono text-[22px] font-bold text-white">{link.value}</p>
                      <p className="mt-1 text-[13px] leading-snug text-slate-400">{link.label}</p>
                    </div>
                    {i < slide.savings.chain.length - 1 && <Arrow className="text-slate-500" />}
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-4">
                <span className="rounded-xl bg-cyan-400 px-4 py-2 font-mono text-[24px] font-bold text-navy">
                  × {slide.savings.rate.value}
                </span>
                <span className="text-[15px] text-slate-300">{slide.savings.rate.label}</span>
              </div>
              <p className="mt-auto border-t border-white/10 pt-5 font-serif text-[22px] font-semibold text-white">
                {slide.savings.annual}
              </p>
            </div>
          </div>
          <p className="mt-4 text-[13px] leading-snug text-gray-500">{slide.footnote}</p>
        </Frame>
      );
    }

    case "pillars": {
      // Builds: 0 = the three principles, 1 = the solution flow.
      const flowShown = step === undefined || step >= 1;
      const flowClass = `transition-[opacity,transform] duration-500 ease-out ${flowShown ? "opacity-100 translate-y-0" : "translate-y-4 opacity-0"}`;
      return (
        <Frame label={slide.label} title={slide.title} accent={slide.accent} footer={footer} page={page}>
          <div className="grid grid-cols-3 gap-5">
            {slide.pillars.map((pillar, i) => {
              const dark = i === 0;
              return (
                <div
                  key={pillar.label}
                  className={`rounded-[1.25rem] p-7 ${dark ? "bg-navy text-white" : "border border-gray-200 bg-white"}`}
                >
                  <p className={`${eyebrow} ${dark ? "text-cyan-400" : "text-primary"}`}>
                    {String(i + 1).padStart(2, "0")} · {pillar.label}
                  </p>
                  <h3
                    className={`mt-4 font-serif text-[23px] font-semibold leading-snug ${dark ? "text-white" : "text-gray-900"}`}
                  >
                    {pillar.heading}
                  </h3>
                  {pillar.text && (
                    <p className={`mt-3 text-[15px] leading-relaxed ${dark ? "text-slate-300" : "text-gray-600"}`}>
                      {pillar.text}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <div className={`my-auto flex items-center justify-center gap-5 py-6 ${flowClass}`}>
            {slide.flow.map((stage, i) => (
              <div key={stage.name} className="flex items-center gap-5">
                <div className="w-[260px] rounded-xl border border-gray-200 bg-white px-6 py-4 text-center">
                  <p className="font-serif text-[19px] font-semibold text-gray-900">{stage.name}</p>
                  <p className="mt-1 text-[14px] text-gray-500">{stage.detail}</p>
                </div>
                {i < slide.flow.length - 1 && (
                  <span aria-hidden="true" className="font-mono text-[28px] font-bold leading-none text-primary">
                    +
                  </span>
                )}
              </div>
            ))}
          </div>
          <p
            className={`rounded-xl border border-cyan-200 bg-cyan-50 px-6 py-4 font-serif text-[19px] font-semibold text-gray-900 ${flowClass}`}
          >
            {slide.statement}
          </p>
        </Frame>
      );
    }

    case "architecture": {
      // Builds: 0 = DCIM → BMS → equipment, 1 = Cooling OS slides in
      // between, 2 = the summary line.
      const on = (n: number) => step === undefined || step >= n;
      return (
        <Frame label={slide.label} title={slide.title} accent={slide.accent} footer={footer} page={page}>
          <div className="flex flex-1 items-stretch">
            {slide.layers.map((layer, i) => {
              const inserted = layer.highlight;
              const shown = !inserted || on(1);
              return (
                <div
                  key={layer.name}
                  className="flex items-center overflow-hidden transition-[flex,opacity] duration-700 ease-out"
                  style={{ flex: shown ? "1 1 0%" : "0 0 0%", opacity: shown ? 1 : 0 }}
                >
                  <div
                    className={`flex h-full min-w-[232px] flex-1 flex-col rounded-[1.25rem] p-5 ${inserted ? "bg-navy text-white" : "border border-gray-200 bg-white"}`}
                  >
                    <p className={`font-mono text-[13px] font-bold ${inserted ? "text-cyan-400" : "text-primary"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3
                      className={`mt-1 font-serif text-[22px] font-semibold leading-tight ${inserted ? "text-white" : "text-gray-900"}`}
                    >
                      {layer.name}
                    </h3>
                    <p
                      className={`mt-1 min-h-[54px] text-[14px] font-semibold leading-snug ${inserted ? "text-cyan-400" : "text-primary"}`}
                    >
                      {layer.role}
                    </p>
                    <div className="mt-2">
                      {i === 0 && <DcimVisual />}
                      {i === 1 && <CoolingOsVisual />}
                      {i === 2 && <BmsVisual />}
                      {i === 3 && (
                        <img
                          src={slide.image.src}
                          alt={slide.image.alt}
                          className="h-[110px] w-full rounded-xl bg-gray-50 object-contain"
                        />
                      )}
                    </div>
                    {layer.points.length > 0 && (
                      <ul
                        className={`mt-3 space-y-1.5 text-[14px] font-medium leading-snug ${inserted ? "text-slate-100" : "text-gray-800"}`}
                      >
                        {layer.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}
                    {i === slide.layers.length - 1 && (
                      <div className="mt-3 rounded-xl bg-navy p-4">
                        <p className={`${eyebrow} text-cyan-400`}>{slide.equipment.heading}</p>
                        <p className="mt-1 text-[14px] font-medium leading-snug text-slate-100">
                          {slide.equipment.text}
                        </p>
                      </div>
                    )}
                    <p
                      className={`mt-auto rounded-xl px-3 py-2 text-center font-mono text-[11px] font-bold uppercase leading-snug tracking-[0.06em] ${inserted ? "bg-cyan-400 text-navy" : "bg-gray-100 text-gray-700"}`}
                    >
                      {layer.tag}
                    </p>
                  </div>
                  {i < slide.layers.length - 1 && <Arrow className="mx-2 text-primary" />}
                </div>
              );
            })}
          </div>
          <p
            className={`mt-5 rounded-xl bg-navy px-6 py-4 text-center font-serif text-[18px] font-semibold text-white transition-opacity duration-500 ${on(2) ? "opacity-100" : "opacity-0"}`}
          >
            {slide.flow}
          </p>
        </Frame>
      );
    }

    case "control-loop": {
      // Builds: 0 Cooling OS, 1 DCIM context, 2 sensor inputs, 3 output to
      // the BMS, 4 BMS to the individual outputs, 5 the objective.
      const reveal = (n: number) =>
        `transition-[opacity,transform] duration-500 ease-out ${step === undefined || step >= n ? "opacity-100 translate-x-0 translate-y-0" : "pointer-events-none opacity-0"}`;
      const fromLeft = (n: number) =>
        `${reveal(n)} ${step !== undefined && step < n ? "-translate-x-4" : ""}`;
      const fromBelow = (n: number) =>
        `${reveal(n)} ${step !== undefined && step < n ? "translate-y-4" : ""}`;
      return (
        <Frame label={slide.label} title={slide.title} accent={slide.accent} footer={footer} page={page}>
          <div className="flex flex-1 items-center gap-3">
            <div className={`flex shrink-0 items-center ${fromLeft(2)}`}>
              <ul className="flex w-[200px] flex-col" style={{ gap: ROW_GAP }}>
                {slide.inputs.map((input) => (
                  <li
                    key={input}
                    className="flex items-center rounded-lg border border-gray-300 bg-white px-4 text-[15px] font-medium text-gray-900"
                    style={{ height: ROW }}
                  >
                    {input}
                  </li>
                ))}
              </ul>
              <FanLines count={slide.inputs.length} mode="in" width={48} />
            </div>
            <div className="flex w-[212px] shrink-0 flex-col items-center gap-3">
              <div className="w-full rounded-[1.25rem] bg-navy p-6">
                <img src="/logo192.svg" alt="" className="h-9 w-9" />
                <p className="mt-4 font-serif text-[22px] font-semibold leading-tight text-white">
                  {slide.core.name}
                </p>
                <p className="mt-2 text-[15px] font-medium text-slate-100">{slide.core.text}</p>
                <p className="mt-4 rounded-xl bg-cyan-400 px-3 py-2 text-center font-mono text-[11px] font-bold uppercase leading-snug tracking-[0.06em] text-navy">
                  Control · Coordinate · Predict
                </p>
              </div>
              <div className={`flex w-full flex-col items-center gap-2 ${fromBelow(1)}`}>
                <FlowArrow direction="up" length={28} />
                <p className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-[15px] font-medium text-gray-900">
                  {slide.context}
                </p>
              </div>
            </div>
            <div className={`flex shrink-0 items-center gap-3 ${fromLeft(3)}`}>
              <FlowArrow length={36} />
              <p className="w-[140px] rounded-[1.25rem] border border-gray-300 bg-white p-4 text-center font-serif text-[17px] font-semibold leading-snug text-gray-900">
                {slide.executor}
              </p>
            </div>
            <div className={`flex shrink-0 items-center ${fromLeft(4)}`}>
              <FanLines count={slide.outputs.length} mode="out" width={44} />
              <ul className="flex w-[206px] flex-col" style={{ gap: ROW_GAP }}>
                {slide.outputs.map((output) => (
                  <li
                    key={output}
                    className="flex items-center rounded-lg border border-cyan-300 bg-cyan-50 px-4 text-[15px] font-semibold text-gray-900"
                    style={{ height: ROW }}
                  >
                    {output}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`flex min-w-0 flex-1 flex-col justify-center self-stretch rounded-[1.25rem] bg-navy px-6 py-8 ${fromLeft(5)}`}
            >
              <p className="font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-cyan-400">Objective</p>
              <p className="mt-4 font-serif text-[20px] font-semibold leading-snug text-white">{slide.objective}</p>
            </div>
          </div>
        </Frame>
      );
    }

    case "benefits":
      return (
        <Frame label={slide.label} title={slide.title} accent={slide.accent} footer={footer} page={page}>
          <ul className="my-auto grid grid-cols-3 gap-5">
            {slide.items.map((item) => (
              <li
                key={item.title}
                className="flex h-[210px] flex-col items-center justify-center rounded-[1.25rem] border border-gray-200 bg-white px-8 text-center"
              >
                <BenefitVisual visual={item.visual} />
                {item.value && (
                  <p className="mt-4 font-mono text-[30px] font-bold leading-none text-primary">{item.value}</p>
                )}
                <h3
                  className={`font-serif font-semibold leading-snug text-gray-900 ${item.value ? "mt-2 text-[19px]" : "mt-4 text-[21px]"}`}
                >
                  {item.title}
                </h3>
              </li>
            ))}
          </ul>
        </Frame>
      );

    case "ecosystem":
      return (
        <Frame label={slide.label} title={slide.title} accent={slide.accent} footer={footer} page={page}>
          <div className="flex flex-1 items-stretch gap-6">
            <div className="flex flex-1 flex-col items-center justify-center rounded-[1.25rem] bg-navy p-9 text-center">
              <p className={`${eyebrow} text-cyan-400`}>{slide.agent.eyebrow}</p>
              <img src="/logo192.svg" alt="" className="mt-8 h-24 w-24" />
              <h3 className="mt-8 font-serif text-[34px] font-semibold leading-tight text-white">{slide.agent.name}</h3>
              <p className="mt-3 max-w-[400px] text-[17px] leading-relaxed text-slate-300">{slide.agent.text}</p>
              <p className="mt-6 rounded-xl bg-cyan-400 px-4 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.06em] text-navy">
                Control · Coordinate · Predict
              </p>
            </div>
            <span aria-hidden="true" className="self-center font-mono text-[36px] font-bold leading-none text-primary">
              +
            </span>
            <div className="flex flex-1 flex-col items-center rounded-[1.25rem] border border-gray-200 bg-white p-9 text-center">
              <p className={`${eyebrow} text-primary`}>{slide.hardware.eyebrow}</p>
              <dl className="mt-6 grid w-full flex-1 grid-cols-2 divide-x divide-gray-200">
                {slide.hardware.groups.map((group) => (
                  <div key={group.label} className="flex flex-col items-center justify-center px-5">
                    <img
                      src={group.image.src}
                      alt={group.image.alt}
                      className="h-[190px] w-full rounded-xl bg-gray-50 object-contain p-4"
                    />
                    <dt className={`${eyebrow} mt-6 text-primary`}>{group.label}</dt>
                    <dd className="mt-2 font-serif text-[21px] font-semibold leading-snug text-gray-900">{group.items}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Frame>
      );

    case "products":
      return (
        <Frame label={slide.label} title={slide.title} accent={slide.accent} footer={footer} page={page}>
          <div
            className="grid flex-1 gap-5"
            style={{ gridTemplateColumns: `repeat(${slide.products.length}, minmax(0, 1fr))` }}
          >
            {slide.products.map((product) => (
              <div
                key={product.name}
                className="flex flex-col rounded-[1.25rem] border border-t-4 border-gray-200 border-t-primary bg-white p-6"
              >
                <p className={`${eyebrow} text-primary`}>{product.eyebrow}</p>
                <h3 className="mt-2 font-serif text-[23px] font-semibold leading-tight text-gray-900">
                  {product.name}
                </h3>
                <img
                  src={product.image.src}
                  alt={product.image.alt}
                  className="mt-4 h-[230px] w-full rounded-xl bg-gray-50 object-contain p-3"
                />
                <p className="mt-4 text-[15px] leading-relaxed text-gray-600">{product.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-xl bg-navy px-6 py-4 text-center font-serif text-[18px] font-semibold text-white">
            {slide.flow}
          </p>
        </Frame>
      );

    case "roadmap":
      return (
        <Frame label={slide.label} title={slide.title} accent={slide.accent} footer={footer} page={page}>
          <table className="w-full overflow-hidden rounded-[1.25rem] bg-white text-left text-[17px] shadow-[0_0_0_1px_#e5e7eb]">
            <thead>
              <tr className="bg-navy text-white">
                <th className="w-[38%] px-7 py-4 font-serif text-[18px] font-semibold">Product</th>
                <th className="w-[20%] px-7 py-4 font-serif text-[18px] font-semibold">Timeline</th>
                <th className="px-7 py-4 font-serif text-[18px] font-semibold">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {slide.rows.map((row) => (
                <tr key={row.product + row.timeline}>
                  <td className="px-7 py-[14px] font-semibold text-gray-900">{row.product}</td>
                  <td className="px-7 py-[14px]">
                    {row.done ? (
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[14px] font-bold text-emerald-800">
                        {row.timeline}
                      </span>
                    ) : (
                      <span className="font-mono text-[15px] font-bold text-primary">{row.timeline}</span>
                    )}
                  </td>
                  <td className="px-7 py-[14px] text-gray-600">{row.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Frame>
      );

    case "competition":
      return (
        <Frame label={slide.label} title={slide.title} accent={slide.accent} footer={footer} page={page}>
          <div className="grid flex-1 grid-cols-[1fr_1.7fr] gap-6">
            <div className="flex flex-col items-center justify-center rounded-[1.25rem] bg-navy p-8 text-center">
              <p className={`${eyebrow} text-cyan-400`}>{slide.software.eyebrow}</p>
              <img src="/logo192.svg" alt="" className="mt-10 h-20 w-20" />
              <h3 className="mt-10 font-serif text-[34px] font-semibold leading-tight text-white">
                {slide.software.heading}
              </h3>
            </div>
            <div className="flex flex-col gap-5">
              {slide.hardware.map((group) => (
                <div
                  key={group.label}
                  className="flex flex-1 flex-col items-center justify-center rounded-[1.25rem] border border-gray-200 bg-white px-8 py-6 text-center"
                >
                  <p className={`${eyebrow} text-primary`}>{group.label}</p>
                  <ul
                    className="mt-4 grid w-full divide-x divide-gray-100"
                    style={{ gridTemplateColumns: `repeat(${group.segments.length}, minmax(0, 1fr))` }}
                  >
                    {group.segments.map((segment) => (
                      <li key={segment.name} className="flex flex-col items-center px-4">
                        <h3 className="font-serif text-[22px] font-semibold text-gray-900">{segment.name}</h3>
                        <p className="mt-1 text-[14px] leading-snug text-gray-600">{segment.text}</p>
                        <ul className="mt-4 flex flex-wrap justify-center gap-2">
                          {segment.players.map((player) => (
                            <li
                              key={player}
                              className="rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-[14px] font-semibold text-gray-800"
                            >
                              {player}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Frame>
      );

    case "traction":
      return (
        <Frame label={slide.label} title={slide.title} accent={slide.accent} footer={footer} page={page}>
          <dl className="grid grid-cols-4 gap-4">
            {slide.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col rounded-[1.25rem] bg-navy p-6">
                <dd className="order-1 font-mono text-[36px] font-bold leading-none text-cyan-400">{stat.value}</dd>
                <dt className="order-2 mt-3 text-[15px] font-semibold text-white">{stat.label}</dt>
              </div>
            ))}
          </dl>
          <div className="mt-5 grid flex-1 grid-cols-2 rounded-[1.25rem] border border-gray-200 bg-white">
            <div className="flex flex-col items-center border-r border-gray-200 p-8 text-center">
              <p className={`${eyebrow} text-primary`}>{slide.partner.eyebrow}</p>
              <h3 className="mt-3 font-serif text-[24px] font-semibold leading-snug text-gray-900">
                {slide.partner.heading}
              </h3>
              {slide.partner.text && (
                <p className="mt-3 text-[15px] leading-relaxed text-gray-600">{slide.partner.text}</p>
              )}
              <div className="flex flex-1 items-center justify-center pt-4">
                <LogoImage logo={slide.partner.logo} height={84} />
              </div>
            </div>
            <div className="flex flex-col p-8 text-center">
              <p className={`${eyebrow} text-primary`}>{slide.others.eyebrow}</p>
              <div className="flex flex-1 items-center justify-around gap-8">
                {slide.others.logos.map((logo) => (
                  <LogoImage key={logo.name} logo={logo} height={56} />
                ))}
              </div>
            </div>
          </div>
        </Frame>
      );

    case "team":
      return (
        <Frame label={slide.label} title={slide.title} accent={slide.accent} footer={footer} page={page}>
          <div className="grid flex-1 grid-cols-2 gap-6">
            {slide.founders.map((founder, i) => (
              <div key={founder.name} className="flex flex-col rounded-[1.25rem] border border-gray-200 bg-white p-8">
                <div className="flex items-center gap-5">
                  <span
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full font-serif text-[22px] font-bold text-white ${i === 0 ? "bg-primary" : "bg-navy"}`}
                  >
                    {founder.initials}
                  </span>
                  <div>
                    <h3 className="font-serif text-[28px] font-semibold leading-tight text-gray-900">{founder.name}</h3>
                    <p className="mt-1 text-[16px] font-semibold text-primary">{founder.role}</p>
                  </div>
                </div>
                <div className="mt-6 space-y-3 text-[16px] leading-relaxed text-gray-600">
                  {founder.bio.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                  {founder.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-navy px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 text-[15px] font-semibold text-primary underline decoration-primary/30 underline-offset-4"
                >
                  {founder.name.split(" ")[0]} on LinkedIn
                </a>
              </div>
            ))}
          </div>
        </Frame>
      );

    case "funding":
      return (
        <Frame dark footer={footer} page={page}>
          <div className="grid flex-1 grid-cols-[1.6fr_1fr] gap-10">
            <div className="flex flex-col">
              <Heading label={slide.label} title={slide.title} accent={slide.accent} dark size={40} />
              <p className={`${eyebrow} mt-8 text-cyan-400`}>Use of funds</p>
              <ol className="mt-5 grid grid-cols-2 gap-x-8 gap-y-7">
                {slide.uses.map((use, i) => (
                  <li key={use.title}>
                    <p className="font-mono text-[15px] font-bold text-cyan-400">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 font-serif text-[20px] font-semibold leading-snug text-white">{use.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate-300">{use.text}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <div className="rounded-[1.25rem] bg-primary p-8">
                <p className={`${eyebrow} text-white/80`}>{slide.raise.eyebrow}</p>
                <p className="mt-4 font-mono text-[52px] font-bold leading-none text-white">{slide.raise.amount}</p>
                <p className="mt-3 text-[17px] text-white/90">{slide.raise.round}</p>
              </div>
            </div>
          </div>
        </Frame>
      );

    case "closing":
      return (
        <div className="relative flex h-full w-full flex-col justify-between bg-navy px-16 py-14 font-sans text-white">
          <div className="flex items-center gap-3">
            <img src="/logo192.svg" alt="" className="h-9 w-9" />
            <span className="font-serif text-[22px] font-bold">Garvata Labs</span>
          </div>
          <div className="absolute right-20 top-1/2 h-[300px] w-[300px] -translate-y-1/2">
            <img src="/logo192.svg" alt="" className="deck-spin h-full w-full" />
          </div>
          <div>
            <h1 className="font-serif text-[84px] font-semibold leading-[1.02] tracking-tight text-white">
              {slide.title}
            </h1>
            <div className="mt-8 max-w-[640px] border-t border-white/15 pt-6">
              <p className={`${eyebrow} text-cyan-400`}>{slide.contact.eyebrow}</p>
              <p className="mt-3 font-serif text-[26px] font-semibold">
                {slide.contact.name}
                <span className="text-slate-400">, {slide.contact.role}</span>
              </p>
              <p className="mt-3 flex gap-8 font-mono text-[18px] text-slate-300">
                <a href={`tel:${slide.contact.phone.replace(/\s/g, "")}`}>{slide.contact.phone}</a>
                <a href={`mailto:${slide.contact.email}`} className="text-cyan-400">
                  {slide.contact.email}
                </a>
              </p>
            </div>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
            {footer} · {page}
          </p>
        </div>
      );
  }
}

export function SlideView({
  slide,
  footer,
  index,
  total,
  step,
}: {
  slide: Slide;
  footer: string;
  index: number;
  total: number;
  step?: number;
}) {
  const page = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  return (
    <div className="h-[720px] w-[1280px] overflow-hidden" aria-roledescription="slide" aria-label={page}>
      <SlideBody slide={slide} footer={footer} page={page} step={step} />
    </div>
  );
}
