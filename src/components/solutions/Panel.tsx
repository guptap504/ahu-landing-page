import ProductCards from "@/components/site/ProductCards";
import { SectionHeading, StatusBadge, type Availability } from "@/components/site/ui";
import type { ProductId } from "@/content/catalog";
import type { ReactNode } from "react";

// Opening block of an industry tab: two-tone title and copy beside a visual.
export function PanelIntro({
  title,
  accent,
  description,
  status,
  actions,
  footnote,
  visual,
}: {
  title: string;
  accent: string;
  description: string;
  status?: Availability;
  actions?: ReactNode;
  footnote?: ReactNode;
  visual: ReactNode;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        {status && (
          <div className="mb-5">
            <StatusBadge status={status} />
          </div>
        )}
        <h2 className="font-serif text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-tight">
          <span className="block text-gray-900">{title}</span>
          <span className="block text-primary">{accent}</span>
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
          {description}
        </p>
        {actions && (
          <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>
        )}
        {footnote && <div className="mt-5">{footnote}</div>}
      </div>
      <div>{visual}</div>
    </div>
  );
}

// A titled block within a tab, separated from the previous one by a hairline.
export function PanelSection({
  id,
  title,
  accent,
  description,
  children,
}: {
  id?: string;
  title: string;
  accent: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-14 border-t border-gray-200 pt-14 lg:mt-20 lg:pt-20">
      <SectionHeading title={title} accent={accent} as="h3">
        {description}
      </SectionHeading>
      <div className="mt-10 lg:mt-12">{children}</div>
    </section>
  );
}

export function PanelProducts({
  industry,
  ids,
}: {
  industry: string;
  ids: ProductId[];
}) {
  return (
    <PanelSection
      title="Explore products"
      accent={`for ${industry}`}
      description={
        <p>The Garvata software and equipment behind this solution.</p>
      }
    >
      <ProductCards ids={ids} />
    </PanelSection>
  );
}
