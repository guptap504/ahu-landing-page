import DeckPage from "@/components/deck/DeckPage";

// Slides: netlify/functions/investor-deck/content.ts.
const InvestorDeck = () => (
  <DeckPage
    source="investor-deck"
    path="/investors"
    name="Investor Presentation"
    description="Garvata Labs investor presentation."
  />
);

export default InvestorDeck;
