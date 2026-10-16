import type { Context } from "@netlify/functions";
import { createHash, timingSafeEqual } from "node:crypto";
import { deck } from "./content";

// Returns the confidential investor deck to the /investors page, but only
// for a request carrying the passcode set in the INVESTOR_DECK_PASSCODE
// environment variable.

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });

// Hash both sides so the comparison is constant-time whatever their length.
const matches = (given: string, expected: string) =>
  timingSafeEqual(
    createHash("sha256").update(given).digest(),
    createHash("sha256").update(expected).digest(),
  );

export default async (request: Request, _context: Context) => {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const expected = Netlify.env.get("INVESTOR_DECK_PASSCODE");
  if (!expected) return json({ error: "Deck is not configured" }, 500);

  let passcode: unknown;
  try {
    ({ passcode } = await request.json());
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  if (typeof passcode !== "string" || !matches(passcode.trim(), expected)) {
    // Slow down guessing.
    await new Promise((resolve) => setTimeout(resolve, 750));
    return json({ error: "Incorrect passcode" }, 401);
  }

  return json(deck, 200);
};
