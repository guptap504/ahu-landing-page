import PageIntro from "@/components/site/PageIntro";
import { Container } from "@/components/site/ui";
import { posts } from "@/content/blog";
import { formatDate, type PostMeta } from "@/lib/posts";
import { usePageMeta } from "@/lib/usePageMeta";
import { slugify } from "@/lib/slugify";
import { ArrowRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

function PostMetaLine({ post, dark = false }: { post: PostMeta; dark?: boolean }) {
  return (
    <p
      className={`font-mono text-xs uppercase tracking-wider ${dark ? "text-cyan-400" : "text-primary"}`}
    >
      {post.category}
      <span className={dark ? "text-slate-500" : "text-gray-400"}> · </span>
      <time dateTime={post.date} className={dark ? "text-slate-400" : "text-gray-500"}>
        {formatDate(post.date)}
      </time>
      <span className={dark ? "text-slate-500" : "text-gray-400"}> · </span>
      <span className={dark ? "text-slate-400" : "text-gray-500"}>
        {post.readingMinutes} min read
      </span>
    </p>
  );
}

const Blog = () => {
  usePageMeta(
    "Blog",
    "Guides and analysis on data center energy, cooling efficiency, EC fans and AI control for HVAC — from the team at Garvata Labs.",
    "/blog",
  );
  const [searchParams] = useSearchParams();
  const categories = [...new Set(posts.map((post) => post.category))];
  const active = categories.find(
    (category) => slugify(category) === searchParams.get("category"),
  );
  const shown = active ? posts.filter((post) => post.category === active) : posts;
  const [featured, ...rest] = shown;
  const chip = (label: string, to: string, current: boolean) => (
    <li key={label}>
      <Link
        to={to}
        state={{ keepScroll: true }}
        aria-current={current ? "page" : undefined}
        className={`inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm font-semibold transition-colors ${current ? "border-navy bg-navy text-white" : "border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900"}`}
      >
        {label}
      </Link>
    </li>
  );

  return (
    <>
      <PageIntro
        title="Notes on"
        accent="AI native cooling"
        description="Guides and analysis on data center energy, cooling efficiency, EC fans and AI control — written for the people who run and pay for cooling."
      />

      <section className="pb-12 sm:pb-16">
        <Container>
          {categories.length > 1 && (
            <nav aria-label="Topics" className="mb-8">
              <ul className="flex flex-wrap gap-2">
                {chip("All topics", "/blog", !active)}
                {categories.map((category) =>
                  chip(category, `/blog?category=${slugify(category)}`, category === active),
                )}
              </ul>
            </nav>
          )}
          {featured && (
            <article className="relative rounded-[1.75rem] bg-navy px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
              <PostMetaLine post={featured} dark />
              <h2 className="mt-5 max-w-4xl font-serif text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.08] tracking-tight text-white">
                <Link
                  to={`/blog/${featured.slug}`}
                  className="after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-cyan-400"
                >
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {featured.description}
              </p>
              <span className="mt-8 inline-flex min-h-[48px] items-center gap-3 rounded-full bg-white py-1.5 pl-6 pr-1.5 text-sm font-semibold text-gray-900">
                Read article
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white"
                  aria-hidden="true"
                >
                  <ArrowRight className="h-4 w-4" />
                </span>
              </span>
            </article>
          )}

          {rest.length > 0 && (
            <ul className="mt-10 divide-y divide-gray-200 border-y border-gray-200">
              {rest.map((post) => (
                <li key={post.slug}>
                  <article className="group relative grid gap-3 py-8 md:grid-cols-[1fr_auto] md:items-center md:gap-10">
                    <div>
                      <PostMetaLine post={post} />
                      <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug tracking-tight text-gray-900 sm:text-[1.75rem]">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="after:absolute after:inset-0 group-hover:text-primary"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <p className="mt-3 max-w-3xl leading-relaxed text-gray-600">
                        {post.description}
                      </p>
                    </div>
                    <span
                      className="hidden h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-gray-900 transition-colors group-hover:border-primary group-hover:text-primary md:flex"
                      aria-hidden="true"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
};

export default Blog;
