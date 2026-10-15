// Blog post types and helpers shared by the site and the build step in
// vite.config.ts, so this file uses no path aliases or runtime dependencies.

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  updated?: string;
  category: string;
  author: string;
  keywords: string[];
  draft: boolean;
  readingMinutes: number;
};

export type Heading = { id: string; text: string };

export type Post = PostMeta & { html: string; headings: Heading[] };

// Newest first; drafts are left out of the site and the build.
export const publishedPosts = (posts: Post[]) =>
  posts
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

// schema.org BlogPosting for a post's JSON-LD script.
export const postJsonLd = (post: PostMeta, siteUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.description,
  datePublished: post.date,
  dateModified: post.updated ?? post.date,
  keywords: post.keywords.join(", "),
  articleSection: post.category,
  mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  image: `${siteUrl}/garvata-labs-og.png`,
  author:
    post.author === "Garvata Labs"
      ? { "@type": "Organization", name: post.author, url: `${siteUrl}/` }
      : { "@type": "Person", name: post.author },
  publisher: {
    "@type": "Organization",
    name: "Garvata Labs",
    logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
  },
});

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
