import { track } from "@/lib/analytics";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

type PillVariant = "primary" | "light" | "outline" | "outline-dark";

const pillStyles: Record<PillVariant, { pill: string; dot: string }> = {
  primary: {
    pill: "bg-primary text-white hover:bg-primary/90",
    dot: "bg-white text-primary",
  },
  light: {
    pill: "bg-white text-gray-900 hover:bg-gray-100",
    dot: "bg-navy text-white",
  },
  outline: {
    pill: "border border-gray-300 bg-white text-gray-900 hover:border-gray-400",
    dot: "bg-gray-900 text-white",
  },
  "outline-dark": {
    pill: "border border-white/25 text-white hover:border-white/60",
    dot: "bg-white text-navy",
  },
};

type PillLinkProps = {
  children: ReactNode;
  variant?: PillVariant;
  /** Internal route (react-router) */
  to?: string;
  /** External URL, file or same-page #anchor */
  href?: string;
  onClick?: () => void;
  external?: boolean;
  trackCta?: { cta: string; location: string };
};

// Rounded CTA with a trailing arrow chip. Renders a router Link, an anchor or
// a button depending on which of `to`, `href` or `onClick` is given.
export function PillLink({
  children,
  variant = "primary",
  to,
  href,
  onClick,
  external = false,
  trackCta,
}: PillLinkProps) {
  const styles = pillStyles[variant];
  const className = `inline-flex min-h-[48px] items-center gap-3 rounded-full py-1.5 pl-6 pr-1.5 text-sm font-semibold transition-colors ${styles.pill}`;
  const Icon = external ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <span>{children}</span>
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full ${styles.dot}`}
        aria-hidden="true"
      >
        <Icon className="h-4 w-4" />
      </span>
    </>
  );
  const handleClick = () => {
    if (trackCta) track("cta_clicked", trackCta);
    onClick?.();
  };

  if (to) {
    return (
      <Link to={to} className={className} onClick={handleClick}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={className}
        onClick={handleClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={className} onClick={handleClick}>
      {content}
    </button>
  );
}

type SectionHeadingProps = {
  title: string;
  /** Second line, set in the brand colour */
  accent: string;
  children?: ReactNode;
  action?: ReactNode;
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  /** "split" puts the copy beside the heading on large screens */
  layout?: "split" | "stacked";
};

// Two-tone heading on the left, supporting copy on the right.
export function SectionHeading({
  title,
  accent,
  children,
  action,
  tone = "light",
  as: Heading = "h2",
  layout = "split",
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div
      className={`grid gap-6 ${layout === "split" ? "lg:grid-cols-2 lg:gap-16" : ""}`}
    >
      <Heading className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
        <span className={`block ${dark ? "text-white" : "text-gray-900"}`}>
          {title}
        </span>
        <span className={`block ${dark ? "text-cyan-400" : "text-primary"}`}>
          {accent}
        </span>
      </Heading>
      {(children || action) && (
        <div className="lg:pt-2">
          {children && (
            <div
              className={`text-base leading-relaxed sm:text-lg ${dark ? "text-slate-300" : "text-gray-600"}`}
            >
              {children}
            </div>
          )}
          {action && <div className="mt-6">{action}</div>}
        </div>
      )}
    </div>
  );
}

export type Availability = "available" | "piloting" | "in-development" | "planned";

const availabilityStyles: Record<Availability, { label: string; className: string }> = {
  available: {
    label: "Available now",
    className: "border-emerald-200 bg-emerald-50 text-emerald-800",
  },
  piloting: {
    label: "Early access",
    className: "border-cyan-200 bg-cyan-50 text-cyan-800",
  },
  "in-development": {
    label: "In development",
    className: "border-amber-200 bg-amber-50 text-amber-800",
  },
  planned: {
    label: "Planned",
    className: "border-gray-300 bg-gray-100 text-gray-700",
  },
};

export function StatusBadge({ status }: { status: Availability }) {
  const { label, className } = availabilityStyles[status];
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold ${className}`}
    >
      {label}
    </span>
  );
}

export type Stat = { value: string; label: string; detail: string };

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex min-h-[9rem] flex-col justify-end rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-6 lg:min-h-[13rem] lg:p-8"
        >
          <dt className="order-2 font-serif text-lg font-semibold text-gray-900 sm:text-xl">
            {stat.label}
          </dt>
          <dd className="order-1 mb-3 font-mono text-3xl font-bold tracking-tight text-primary sm:mb-4 sm:text-4xl lg:text-5xl">
            {stat.value}
          </dd>
          <dd className="order-3 mt-1.5 text-sm leading-relaxed text-gray-600">
            {stat.detail}
          </dd>
        </div>
      ))}
    </dl>
  );
}
