import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom"; 
import {
  readDeck,
  readCard,
  updateCard
} from "../../utils/api"
import CardForm from '../../components/CardForm'
import Nav from "../../components/Nav"

/**
    The path to this screen should include the deckId and the cardId (i.e., /decks/:deckId/cards/:cardId/edit).
    You must use the readDeck() function from src/utils/api/index.js to load the deck that contains the card to be edited. Additionally, you must use the readCard() function from src/utils/api/index.js to load the card that you want to edit.
    There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck of which the edited card is a member, and finally the text Edit Card :cardId (e.g., Home/Deck React Router/Edit Card 4).
    It displays the same form as the Add Card screen, except it is prefilled with information for the existing card. It can be edited and updated.
    If the user clicks on either Save or Cancel, the user is taken to the Deck screen.
 **/ 

function EditCard() {
  const {deckId, cardId} = useParams();
  const [card, setCard] = useState({});
  const [deck, setDeck] = useState({})

  const history = useHistory();
  const abortController = new AbortController();

  const handleFrontChange = (event) => setCard((newCard) => ({...newCard, front: event.target.value}));
  const handlebackChange = (event) => setCard((newCard) => ({...newCard, back: event.target.value}));

  useEffect(() => {
    async function getDeck() {
      try {
        setDeck(await readDeck(deckId, abortController.signal))
        setCard(await readCard(cardId, abortController.signal))
      } catch (error) {
      if (error.name === "AbortError") {
        // Ignore `AbortError`
        console.log("Aborted");
      } else {
        throw error;
      }
    }}
    getDeck()
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(card)
    history.push(`/decks/${deckId}`)
  };

  return (
    <div>
      <Nav 
          secondNavName={deck.name}
          secondNavLink={`/decks/${deckId}`}
          endPoint="Edit Card"
        />
      <h2>Edit Card</h2>
        {card &&
          <CardForm 
            handleSubmit={handleSubmit}
            handleFrontChange={handleFrontChange}
            front={card.front}
            handlebackChange={handlebackChange}
            back={card.back}
            doneButtonText="Cancel"
            deckId={deckId}
          />
      }
    </div>
  );
}

export default EditCard;
