import { Container } from "@/components/site/ui";
import { findPost, relatedPosts } from "@/content/blog";
import { formatDate, postJsonLd, type Post } from "@/lib/posts";
import { slugify } from "@/lib/slugify";
import { SITE_URL, usePageMeta } from "@/lib/usePageMeta";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, type MouseEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";

// Adds the post's BlogPosting JSON-LD and marks the page as an article for
// Open Graph, undoing both on unmount.
function useArticleMeta(post: Post) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(postJsonLd(post, SITE_URL));
    document.head.appendChild(script);
    const ogType = document.querySelector('meta[property="og:type"]');
    const previousType = ogType?.getAttribute("content");
    ogType?.setAttribute("content", "article");
    return () => {
      script.remove();
      if (previousType) ogType?.setAttribute("content", previousType);
    };
  }, [post]);
}

function Article({ post }: { post: Post }) {
  const navigate = useNavigate();
  usePageMeta(post.title, post.description, `/blog/${post.slug}`);
  useArticleMeta(post);
  const related = relatedPosts(post.slug);

  // Links inside the Markdown are plain anchors; route internal ones through
  // the router so they don't reload the page.
  const handleArticleClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = (event.target as HTMLElement).closest("a");
    if (
      !anchor ||
      anchor.target ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    const href = anchor.getAttribute("href") ?? "";
    if (href.startsWith("/")) {
      event.preventDefault();
      navigate(href);
    }
  };

  return (
    <>
      <article className="pb-12 pt-32 sm:pb-16 sm:pt-40">
        <Container>
          <header className="max-w-4xl">
            <Link
              to="/blog"
              className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All articles
            </Link>
            <p className="mt-6 font-mono text-xs uppercase tracking-wider text-primary">
              <Link
                to={`/blog?category=${slugify(post.category)}`}
                className="hover:underline"
              >
                {post.category}
              </Link>
            </p>
            <h1 className="mt-4 font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-gray-900">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">
              {post.description}
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-wider text-gray-500">
              {post.author}
              <span className="text-gray-400"> · </span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.updated && (
                <>
                  <span className="text-gray-400"> · </span>
                  Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </>
              )}
              <span className="text-gray-400"> · </span>
              {post.readingMinutes} min read
            </p>
          </header>

          <div className="mt-10 grid grid-cols-1 gap-12 border-t border-gray-200 pt-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
            <div
              className="blog-prose"
              onClick={handleArticleClick}
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            {post.headings.length > 2 && (
              <aside className="hidden lg:block">
                <nav aria-label="On this page" className="sticky top-32">
                  <p className="font-mono text-xs uppercase tracking-wider text-gray-500">
                    On this page
                  </p>
                  <ul className="mt-4 space-y-1 border-l border-gray-200">
                    {post.headings.map((heading) => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm leading-snug text-gray-600 hover:border-primary hover:text-primary"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            )}
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="pb-8">
          <Container>
            <h2
              id="related-heading"
              className="font-serif text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl"
            >
              Keep reading
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <article className="group relative flex h-full flex-col rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-colors hover:border-gray-300">
                    <p className="font-mono text-xs uppercase tracking-wider text-primary">
                      {item.category}
                    </p>
                    <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-gray-900">
                      <Link
                        to={`/blog/${item.slug}`}
                        className="after:absolute after:inset-0 after:rounded-2xl group-hover:text-primary"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-gray-900">
                      {item.readingMinutes} min read
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}

const BlogPost = () => {
  const { slug } = useParams();
  const post = findPost(slug);
  return post ? <Article key={post.slug} post={post} /> : <NotFound />;
};

export default BlogPost;
