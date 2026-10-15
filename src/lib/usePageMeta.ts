import { useEffect } from "react";

export const SITE_URL = "https://garvata.com";
const SITE_NAME = "Garvata Labs";

// Every page title follows "<Page name> | Garvata Labs"; pass only the page
// name (Title Case, matching its nav label or tab).
export const pageTitle = (pageName: string) => `${pageName} | ${SITE_NAME}`;

// [selector, attribute] pairs kept in sync with the page.
const titleTags = ['meta[property="og:title"]', 'meta[name="twitter:title"]'];
const descriptionTags = [
  'meta[name="description"]',
  'meta[property="og:description"]',
  'meta[name="twitter:description"]',
];
const urlTags: [string, string][] = [
  ['link[rel="canonical"]', "href"],
  ['meta[property="og:url"]', "content"],
];

// Sets the document title, description, canonical URL and the matching
// Open Graph / Twitter tags for a route, restoring them on unmount.
export function usePageMeta(pageName: string, description: string, path: string) {
  useEffect(() => {
    const title = pageTitle(pageName);
    const url = `${SITE_URL}${path}`;
    const updates: [Element, string, string][] = [];
    const set = (selector: string, attribute: string, value: string) => {
      const el = document.querySelector(selector);
      if (!el) return;
      updates.push([el, attribute, el.getAttribute(attribute) ?? ""]);
      el.setAttribute(attribute, value);
    };

    const prevTitle = document.title;
    document.title = title;
    titleTags.forEach((selector) => set(selector, "content", title));
    descriptionTags.forEach((selector) => set(selector, "content", description));
    urlTags.forEach(([selector, attribute]) => set(selector, attribute, url));

    return () => {
      document.title = prevTitle;
      for (const [el, attribute, previous] of updates) {
        el.setAttribute(attribute, previous);
      }
    };
  }, [pageName, description, path]);
}
