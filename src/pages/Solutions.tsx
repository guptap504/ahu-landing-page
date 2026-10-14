import PageIntro from "@/components/site/PageIntro";
import { Container } from "@/components/site/ui";
import CommercialPanel from "@/components/solutions/CommercialPanel";
import DataCentersPanel from "@/components/solutions/DataCentersPanel";
import PharmaPanel from "@/components/solutions/PharmaPanel";
import { industries, type IndustryId } from "@/content/catalog";
import { usePageMeta } from "@/lib/usePageMeta";
import type { ComponentType } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";

const pages: Record<
  IndustryId,
  {
    panel: ComponentType;
    title: string;
    description: string;
  }
> = {
  "data-centers": {
    panel: DataCentersPanel,
    title: "Data Center Solutions",
    description:
      "Garvata Cooling OS predicts thermal risk, coordinates CRAC and CRAH units as one system, and controls fans, valves and capacity against rack-inlet conditions. Early access open.",
  },
  commercial: {
    panel: CommercialPanel,
    title: "Commercial IT Park Solutions",
    description:
      "Retrofit AHUs with Garvata EC fans and autonomous control. Cut AHU fan energy by up to 60%, prevent breakdowns and run without manual tuning.",
  },
  pharma: {
    panel: PharmaPanel,
    title: "Pharma Solutions",
    description:
      "Garvata EC fans and autonomous AHU control for pharma clean rooms and labs: hold room pressure differentials, including negative pressure for containment, within the limits you set — with lower fan energy.",
  },
};

const isIndustry = (value: string | undefined): value is IndustryId =>
  !!value && value in pages;

const Solutions = () => {
  const { industry } = useParams();
  if (!isIndustry(industry)) return <NotFound />;
  return <SolutionsPage industry={industry} />;
};

function SolutionsPage({ industry }: { industry: IndustryId }) {
  const page = pages[industry];
  const Panel = page.panel;
  usePageMeta(page.title, page.description, `/solutions/${industry}`);

  return (
    <>
      <PageIntro
        title="Built for spaces"
        accent="where cooling is critical"
        description="Data halls, office floors and production areas have different rules, but the same problem: cooling that runs harder than it needs to. Choose your environment to see how Garvata adapts."
      />

      <section className="pb-8 sm:pb-12">
        <Container>
          <div className="overflow-hidden rounded-[1.75rem] border border-gray-200 bg-gray-50">
            <nav
              aria-label="Industries"
              className="grid grid-cols-3 border-b border-gray-200 bg-white"
            >
              {industries.map((item, i) => {
                const active = item.id === industry;
                return (
                  <Link
                    key={item.id}
                    to={`/solutions/${item.id}`}
                    state={{ keepScroll: true }}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-[64px] items-center justify-center border-b-4 px-2 py-4 text-center font-serif text-sm font-semibold transition-colors sm:min-h-[84px] sm:text-xl ${i > 0 ? "border-l border-l-gray-200" : ""} ${active ? "border-b-primary bg-cyan-50 text-gray-900" : "border-b-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
                  >
                    <span className="sm:hidden">{item.tab}</span>
                    <span className="hidden sm:inline">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="p-5 py-10 sm:p-10 lg:p-14">
              <Panel />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Solutions;
