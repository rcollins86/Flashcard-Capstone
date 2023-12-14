import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom"; 
import {
  readDeck,
  createCard,
} from "../../utils/api"
import Nav from "../../components/Nav"
import CardForm from '../../components/CardForm'

/**
    The path to this screen should include the deckId (i.e., /decks/:deckId/cards/new).
    You must use the readDeck() function from src/utils/api/index.js to load the deck that you're adding the card to.
    There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck to which the cards are being added, and finally the text Add Card (e.g., Home/React Router/Add Card).
    The screen displays the React Router: Add Card deck title.
    A form is shown with the "front" and "back" fields for a new card. Both fields use a <textarea> tag that can accommodate multiple lines of text.
    If the user clicks Save, a new card is created and associated with the relevant deck. Then the form is cleared and the process for adding a card is restarted.
    If the user clicks Done, the user is taken to the Deck screen.


 **/ 

function AddCard() {
  const {deckId} = useParams()
  const [deck, setDeck] = useState({});

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



  const [front, setFront] = useState('');
  const handleFrontChange = (event) => setFront(event.target.value);

  const [back, setBack] = useState('');
  const handlebackChange = (event) => setBack(event.target.value);



  const handleSubmit = (event) => {
    event.preventDefault();
    createCard(
      deckId, 
      {
        front: front,
        back: back,
        deckId: deckId
      }
    )
    setFront("")
    setBack("")
  };

  return (
    <div>
      <Nav 
        secondNavName={deck.name}
        secondNavLink={`/decks/${deckId}`}
        endPoint="Add Card"
      />
        <h2>{deck.name}: Add Card</h2>
      <CardForm 
        handleSubmit={handleSubmit}
        handleFrontChange={handleFrontChange}
        front={front}
        handlebackChange={handlebackChange}
        back={back}
        doneButtonText="Done"
        deckId={deckId}
      />
    </div>
  );
}

export default AddCard;
