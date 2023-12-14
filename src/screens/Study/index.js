import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom"; 
import { readDeck } from "../../utils/api"
import StudyDisplay from "./StudyDisplay";
import Nav from "../../components/Nav"



/**
    The path to this screen should include the deckId (i.e., /decks/:deckId/study).
    You must use the readDeck() function from src/utils/api/index.js to load the deck that is being studied.
    There is a breadcrumb navigation bar with links to home /, followed by the name of the deck being studied, and finally the text Study (e.g., Home/Rendering In React/Study).
    The deck title (i.e., "Study: Rendering in React" ) is shown on the screen.
    Cards are shown one at a time, front-side first.
    A button at the bottom of each card "flips" it to the other side.
    After flipping the card, the screen shows a Next button (see the Next button section below) to continue to the next card.
    After the final card in the deck has been shown, a message (see the Restart prompt section below) is shown offering the user the opportunity to restart the deck. (use window.confirm())
        If the user does not restart the deck, they should return to the home screen.
    Studying a deck with two or fewer cards should display a "Not enough cards" message (see the "Not enough cards" section below) and a button to add cards to the deck.

    The Next button appears after the card is flipped.



 **/ 

function Study() {
  const [deck, setDeck] = useState([])
  const { deckId } = useParams()
    
  const history = useHistory();
  const abortController = new AbortController();
  
  useEffect(() => {
    async function getDeck() {
      try {
        setDeck(await readDeck(deckId, abortController.signal))
      } catch (error) {
      if (error.name === "AbortError") {
        // Ignore `AbortError`
        console.log("Aborted");
      } else {
        throw error;
      }
    }
  }
  getDeck()
  },[])

  if (!deck?.cards) {
    return "Loading..."
  }

  return (
    <div>
        <Nav 
          secondNavName={deck.name}
          secondNavLink={`/decks/${deckId}`}
          endPoint="Study"
        />
        <h1>Study: {deck.name}</h1>
        {deck.cards.length < 3 ? (
          <>
            <h2>Not enough cards.</h2>
            <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>
            <button onClick={() => history.push(`/decks/${deckId}/cards/new`)}>+ Add Cards</button>
          </>
        ) : (
          <StudyDisplay cards={deck.cards} />
        )
        
        }
    </div>
  );
}

export default Study;
