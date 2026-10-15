import { defineConfig, type Plugin, type ResolvedConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";
import { loadPosts } from "./src/lib/markdown";
import { formatDate, postJsonLd, type Post } from "./src/lib/posts";

const SITE_URL = "https://garvata.com";

const escapeHtml = (text: string) =>
    text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

const POSTS_MODULE = "virtual:blog-posts";

// Blog posts are Markdown files in src/content/blog, parsed here so the site
// imports ready-made HTML from `virtual:blog-posts` and never ships the parser.
//
// On build it also writes dist/blog/index.html and dist/blog/<slug>/index.html
// so crawlers and link previews get each page's title, description, canonical
// URL, JSON-LD and article text without running JavaScript. Netlify serves
// these files ahead of the SPA fallback. The static copy is hidden as soon as
// scripts run and the React page replaces it. The blog URLs are also added to
// the sitemap.
function blog(): Plugin {
    let config: ResolvedConfig;
    let blogDir = "";

    const pageHtml = (
        template: string,
        page: { title: string; description: string; path: string; type: string; jsonLd?: object; body: string },
    ) => {
        const title = escapeHtml(`${page.title} | Garvata Labs`);
        const description = escapeHtml(page.description);
        const url = `${SITE_URL}${page.path}`;
        const setContent = (html: string, selector: RegExp, value: string) =>
            html.replace(selector, (tag) => tag.replace(/content="[^"]*"/, `content="${value}"`));

        let html = template.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
        html = setContent(html, /<meta\s+name="description"[^>]*>/, description);
        html = setContent(html, /<meta\s+property="og:title"[^>]*>/, title);
        html = setContent(html, /<meta\s+property="og:description"[^>]*>/, description);
        html = setContent(html, /<meta\s+property="og:url"[^>]*>/, url);
        html = setContent(html, /<meta\s+property="og:type"[^>]*>/, page.type);
        html = setContent(html, /<meta\s+name="twitter:title"[^>]*>/, title);
        html = setContent(html, /<meta\s+name="twitter:description"[^>]*>/, description);
        html = html.replace(/<link\s+rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);

        const head = [
            `<script>document.documentElement.classList.add("js")</script>`,
            `<style>.js #static-page{display:none}</style>`,
            page.jsonLd
                ? `<script type="application/ld+json">${JSON.stringify(page.jsonLd).replace(/</g, "\\u003c")}</script>`
                : "",
        ].join("\n    ");
        html = html.replace("</head>", `    ${head}\n  </head>`);
        return html.replace(
            '<div id="root"></div>',
            `<div id="root"><div id="static-page" class="mx-auto max-w-3xl px-4 py-16">${page.body}</div></div>`,
        );
    };

    const articleBody = (post: Post) => `
<p><a href="/blog">All articles</a></p>
<article>
  <p>${escapeHtml(post.category)}</p>
  <h1>${escapeHtml(post.title)}</h1>
  <p>${escapeHtml(post.description)}</p>
  <p>${escapeHtml(post.author)} · <time datetime="${post.date}">${formatDate(post.date)}</time> · ${post.readingMinutes} min read</p>
  <div class="blog-prose">${post.html}</div>
</article>`;

    const indexBody = (posts: Post[]) => `
<h1>Blog</h1>
<ul>
${posts
    .map(
        (post) =>
            `  <li><a href="/blog/${post.slug}">${escapeHtml(post.title)}</a> — ${escapeHtml(post.description)}</li>`,
    )
    .join("\n")}
</ul>`;

    return {
        name: "blog",
        configResolved(resolved) {
            config = resolved;
            blogDir = path.resolve(config.root, "src/content/blog");
        },
        resolveId(id) {
            if (id === POSTS_MODULE) return `\0${POSTS_MODULE}`;
        },
        load(id) {
            if (id !== `\0${POSTS_MODULE}`) return;
            this.addWatchFile(blogDir);
            return `export default ${JSON.stringify(loadPosts(blogDir))};`;
        },
        // Reload the page when a post is added, edited or removed in dev.
        configureServer(server) {
            server.watcher.add(blogDir);
            const reload = (file: string) => {
                if (!file.startsWith(blogDir) || !file.endsWith(".md")) return;
                const module = server.moduleGraph.getModuleById(`\0${POSTS_MODULE}`);
                if (module) server.moduleGraph.invalidateModule(module);
                server.ws.send({ type: "full-reload" });
            };
            server.watcher.on("add", reload);
            server.watcher.on("change", reload);
            server.watcher.on("unlink", reload);
        },
        closeBundle() {
            if (config.command !== "build") return;
            const outDir = path.resolve(config.root, config.build.outDir);
            const templatePath = path.join(outDir, "index.html");
            if (!fs.existsSync(templatePath)) return;

            const template = fs.readFileSync(templatePath, "utf8");
            const posts = loadPosts(blogDir);

            const write = (route: string, html: string) => {
                const dir = path.join(outDir, route);
                fs.mkdirSync(dir, { recursive: true });
                fs.writeFileSync(path.join(dir, "index.html"), html);
            };

            write(
                "blog",
                pageHtml(template, {
                    title: "Blog",
                    description:
                        "Guides and analysis on data center energy, cooling efficiency, EC fans and AI control for HVAC — from the team at Garvata Labs.",
                    path: "/blog",
                    type: "website",
                    body: indexBody(posts),
                }),
            );
            for (const post of posts) {
                write(
                    `blog/${post.slug}`,
                    pageHtml(template, {
                        title: post.title,
                        description: post.description,
                        path: `/blog/${post.slug}`,
                        type: "article",
                        jsonLd: postJsonLd(post, SITE_URL),
                        body: articleBody(post),
                    }),
                );
            }

            const sitemapPath = path.join(outDir, "sitemap.xml");
            if (fs.existsSync(sitemapPath)) {
                const latest = posts[0]?.updated ?? posts[0]?.date;
                const entries = [
                    { loc: "/blog", lastmod: latest, changefreq: "weekly", priority: "0.8" },
                    ...posts.map((post) => ({
                        loc: `/blog/${post.slug}`,
                        lastmod: post.updated ?? post.date,
                        changefreq: "monthly",
                        priority: "0.7",
                    })),
                ]
                    .map(
                        (entry) =>
                            `  <url>\n    <loc>${SITE_URL}${entry.loc}</loc>\n` +
                            (entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>\n` : "") +
                            `    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>\n`,
                    )
                    .join("");
                const sitemap = fs.readFileSync(sitemapPath, "utf8");
                fs.writeFileSync(sitemapPath, sitemap.replace("</urlset>", `${entries}</urlset>`));
            }
        },
    };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    server: {
        host: "::",
        port: 8080,
    },
    plugins: [
        react(),
        blog(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
}));
