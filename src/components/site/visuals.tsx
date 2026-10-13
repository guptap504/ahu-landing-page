import { ArrowDown } from "lucide-react";

export function ProductImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className="h-full max-h-full w-full object-contain p-8 sm:p-12"
    />
  );
}

// The Garvata mark inside concentric rings, with the three Cooling OS verbs.
export function CoolingOsMark({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center ${compact ? "gap-4 p-4" : "gap-8 p-8"}`}
    >
      <div
        className={`relative flex items-center justify-center ${compact ? "h-28 w-28" : "h-48 w-48 sm:h-56 sm:w-56"}`}
      >
        {[100, 75, 50].map((size) => (
          <div
            key={size}
            className="absolute rounded-full border border-white/10"
            style={{ width: `${size}%`, height: `${size}%` }}
            aria-hidden="true"
          />
        ))}
        <img
          src="/logo192.svg"
          alt=""
          className={`relative ${compact ? "h-10 w-10" : "h-20 w-20"}`}
        />
      </div>
      <p
        className={`font-mono font-bold uppercase text-cyan-300 ${compact ? "text-[0.6rem] tracking-[0.16em]" : "text-xs tracking-[0.2em]"}`}
      >
        Predict · Coordinate · Control
      </p>
    </div>
  );
}

const pipeline = [
  { name: "Digital Twin", role: "Anticipates thermal conditions" },
  { name: "HVAC Agent", role: "Decides and executes" },
  { name: "Safety Checker", role: "Validates every change against limits" },
  { name: "Your BMS", role: "Runs it with local safety loops" },
];

// Vertical flow of how a Cooling OS decision reaches equipment.
export function CoolingOsPipeline() {
  return (
    <div className="rounded-2xl border border-white/10 bg-navy-800 p-5 sm:p-6">
      <p className="mb-5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-slate-400">
        Garvata Cooling OS
      </p>
      <ol>
        {pipeline.map((step, i) => (
          <li key={step.name}>
            <div
              className={`flex items-baseline justify-between gap-4 rounded-xl border px-4 py-3.5 ${i === pipeline.length - 1 ? "border-white/10" : "border-cyan-400/30 bg-cyan-400/[0.06]"}`}
            >
              <span className="font-serif font-semibold text-white">
                {step.name}
              </span>
              <span className="text-right text-sm text-slate-400">
                {step.role}
              </span>
            </div>
            {i < pipeline.length - 1 && (
              <ArrowDown
                className="mx-auto my-1.5 h-4 w-4 text-cyan-400/70"
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
