import { createHash, timingSafeEqual } from "node:crypto";
import type { DeckContent } from "../../src/content/deck";

// Shared by the deck functions: returns a confidential deck only for a POST
// carrying one of the passcodes held in the named environment variables.

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

export async function serveDeck(request: Request, deck: DeckContent, passcodeVars: string[]) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const accepted = passcodeVars
    .map((name) => Netlify.env.get(name))
    .filter((value): value is string => Boolean(value));
  if (accepted.length === 0) return json({ error: "Deck is not configured" }, 500);

  let passcode: unknown;
  try {
    ({ passcode } = await request.json());
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  const given = typeof passcode === "string" ? passcode.trim() : null;
  // Check every passcode, without stopping at the first match.
  const allowed = given !== null && accepted.map((expected) => matches(given, expected)).includes(true);
  if (!allowed) {
    // Slow down guessing.
    await new Promise((resolve) => setTimeout(resolve, 750));
    return json({ error: "Incorrect passcode" }, 401);
  }

  return json(deck, 200);
}
