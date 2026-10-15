import fs from "fs";
import { Marked, Renderer, type Tokens } from "marked";
import path from "path";
import { publishedPosts, type Heading, type Post } from "./posts";
import { slugify } from "./slugify";

// Parses the Markdown blog posts in src/content/blog. Runs at build time only
// (see vite.config.ts); the site receives the parsed posts, not the parser.

// Front matter is a small YAML subset: `key: value` lines, optional quotes,
// and `[a, b]` lists.
function parseFrontMatter(source: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!match) return { data: {} as Record<string, string | string[]>, body: source };
  const data: Record<string, string | string[]> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const pair = /^([\w-]+):\s*(.*)$/.exec(line.trim());
    if (!pair) continue;
    const [, key, raw] = pair;
    const unquote = (value: string) => value.trim().replace(/^["'](.*)["']$/, "$1");
    data[key] = raw.startsWith("[")
      ? raw.slice(1, -1).split(",").map(unquote).filter(Boolean)
      : unquote(raw);
  }
  return { data, body: source.slice(match[0].length) };
}

function renderBody(body: string) {
  const headings: Heading[] = [];
  const marked = new Marked({
    gfm: true,
    renderer: {
      // h2s get ids and feed the "On this page" list; the post title is the h1.
      heading({ tokens, depth }: Tokens.Heading) {
        const html = this.parser.parseInline(tokens);
        const id = slugify(html);
        if (depth === 2) headings.push({ id, text: html.replace(/<[^>]+>/g, "") });
        return `<h${depth} id="${id}">${html}</h${depth}>\n`;
      },
      // Wide tables scroll inside their own box instead of the page.
      table(token: Tokens.Table) {
        return `<div class="table-scroll">${Renderer.prototype.table.call(this, token)}</div>\n`;
      },
      link({ href, title, tokens }: Tokens.Link) {
        const text = this.parser.parseInline(tokens);
        const titleAttr = title ? ` title="${title}"` : "";
        const external = /^https?:\/\//.test(href);
        const rel = external ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<a href="${href}"${titleAttr}${rel}>${text}</a>`;
      },
    },
  });
  return { html: marked.parse(body, { async: false }) as string, headings };
}

const asString = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value.join(", ") : (value ?? "");

export function parsePost(slug: string, source: string): Post {
  const { data, body } = parseFrontMatter(source);
  const words = body.split(/\s+/).filter(Boolean).length;
  const { html, headings } = renderBody(body);
  const keywords = data.keywords;
  return {
    slug,
    title: asString(data.title),
    description: asString(data.description),
    date: asString(data.date),
    updated: data.updated ? asString(data.updated) : undefined,
    category: asString(data.category),
    author: asString(data.author) || "Garvata Labs",
    keywords: Array.isArray(keywords) ? keywords : keywords ? [keywords] : [],
    draft: data.draft === "true",
    readingMinutes: Math.max(1, Math.round(words / 220)),
    html,
    headings,
  };
}

// Every published post in a directory of <slug>.md files, newest first.
export const loadPosts = (dir: string) =>
  publishedPosts(
    fs
      .readdirSync(dir)
      .filter((file) => file.endsWith(".md"))
      .map((file) =>
        parsePost(file.replace(/\.md$/, ""), fs.readFileSync(path.join(dir, file), "utf8")),
      ),
  );
