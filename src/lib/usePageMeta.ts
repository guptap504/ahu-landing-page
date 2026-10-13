import { useEffect } from "react";

const SITE_URL = "https://garvata.com";

// Sets the document title, meta description and canonical URL for a route,
// restoring the previous values when the page unmounts.
export function usePageMeta(title: string, description: string, path: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? "";
    meta?.setAttribute("content", description);

    const canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonical?.getAttribute("href") ?? "";
    canonical?.setAttribute("href", `${SITE_URL}${path}`);

    return () => {
      document.title = prevTitle;
      meta?.setAttribute("content", prevDesc);
      canonical?.setAttribute("href", prevCanonical);
    };
  }, [title, description, path]);
}
