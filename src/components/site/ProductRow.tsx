import { CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import { StatusBadge, type Availability } from "./ui";

type ProductRowProps = {
  id?: string;
  name: string;
  tagline: string;
  description: string;
  points?: string[];
  status?: Availability;
  actions?: ReactNode;
  media: ReactNode;
  mediaTone?: "light" | "dark";
};

// One product: copy on the left, a large rounded media panel on the right.
// Rows stack with hairline dividers between them.
export default function ProductRow({
  id,
  name,
  tagline,
  description,
  points,
  status,
  actions,
  media,
  mediaTone = "light",
}: ProductRowProps) {
  return (
    <article
      id={id}
      className="grid items-center gap-10 border-t border-gray-200 py-12 lg:grid-cols-2 lg:gap-16 lg:py-16"
    >
      <div>
        {status && (
          <div className="mb-5">
            <StatusBadge status={status} />
          </div>
        )}
        <h3 className="font-serif text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          {name}
        </h3>
        <p className="mt-3 text-lg font-semibold text-gray-700">{tagline}</p>
        <p className="mt-5 leading-relaxed text-gray-600">{description}</p>
        {points && (
          <ul className="mt-6 space-y-2.5">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-gray-700">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
        {actions && (
          <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>
        )}
      </div>
      <div
        className={`flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.5rem] ${mediaTone === "dark" ? "bg-navy" : "border border-gray-200 bg-gray-50"}`}
      >
        {media}
      </div>
    </article>
  );
}
