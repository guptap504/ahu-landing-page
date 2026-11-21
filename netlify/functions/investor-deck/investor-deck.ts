import type { Context } from "@netlify/functions";
import { serveDeck } from "../../lib/deckGate";
import { deck } from "./content";

// Returns the confidential investor deck to the /investors page, but only
// for a request carrying the passcode set in the INVESTOR_DECK_PASSCODE
// environment variable.
export default (request: Request, _context: Context) =>
  serveDeck(request, deck, ["INVESTOR_DECK_PASSCODE"]);
