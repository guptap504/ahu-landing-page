import type { Context } from "@netlify/functions";
import { serveDeck } from "../../lib/deckGate";
import { deck } from "./content";

// Returns the Cooling OS product deck to the /product-deck-dc page for a
// request carrying the passcode set in PRODUCT_DECK_DC_PASSCODE. The investor
// passcode opens it too, since the investor deck already covers these slides;
// the product passcode never opens the investor deck.
export default (request: Request, _context: Context) =>
  serveDeck(request, deck, ["PRODUCT_DECK_DC_PASSCODE", "INVESTOR_DECK_PASSCODE"]);
