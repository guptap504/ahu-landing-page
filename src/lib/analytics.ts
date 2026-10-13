import type { PostHog } from "posthog-js";

type EventProperties = Record<string, string | number | boolean | null>;

const apiKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY as string | undefined;
const apiHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST as string | undefined;

let client: PostHog | null = null;
let started = false;
const pendingEvents: [string, EventProperties | undefined][] = [];

// PostHog is loaded after first paint so it stays out of the initial bundle.
// Events fired before it loads are queued and flushed once it is ready.
export function initAnalytics() {
  if (!apiKey || started) return;
  started = true;

  const load = () => {
    import("posthog-js")
      .then(({ default: posthog }) => {
        posthog.init(apiKey, {
          api_host: apiHost,
          persistence: "memory",
          disable_cookie: true,
          capture_pageview: "history_change",
        });
        client = posthog;
        for (const [event, properties] of pendingEvents.splice(0)) {
          posthog.capture(event, properties);
        }
      })
      .catch(() => {
        // Blocked by an ad blocker or offline — analytics is best-effort.
        pendingEvents.length = 0;
      });
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(load, { timeout: 3000 });
  } else {
    setTimeout(load, 1500);
  }
}

// Never pass personal data (names, emails, message text) as properties.
export function track(event: string, properties?: EventProperties) {
  if (!apiKey) return;
  if (client) {
    client.capture(event, properties);
  } else {
    pendingEvents.push([event, properties]);
  }
}
