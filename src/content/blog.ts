import posts from "virtual:blog-posts";

// Blog posts are Markdown files in src/content/blog/, parsed at build time by
// the blog plugin in vite.config.ts. The file name is the URL slug
// (/blog/<slug>). Front matter: title, description, date (YYYY-MM-DD),
// optional updated, category, author, keywords [a, b] and draft: true.
export { posts };

export const findPost = (slug: string | undefined) =>
  posts.find((post) => post.slug === slug);

// Posts in the same category first, then the most recent others.
export function relatedPosts(slug: string, count = 3) {
  const current = findPost(slug);
  const others = posts.filter((post) => post.slug !== slug);
  const same = others.filter((post) => post.category === current?.category);
  const rest = others.filter((post) => post.category !== current?.category);
  return [...same, ...rest].slice(0, count);
}
