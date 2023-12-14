import React, { useState, useEffect } from "react";
// import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Nav from "../../components/Nav"

import { useParams, useHistory } from "react-router-dom"; 

import CardDisplay from './CardDisplay'

import { readDeck, deleteDeck } from "../../utils/api"

/**
    The path to this screen should include the deckId (i.e., /decks/:deckId).
    You must use the readDeck() function from src/utils/api/index.js to load the existing deck.
    There is a breadcrumb navigation bar with a link to home / followed by the name of the deck (e.g., Home/React Router).
    The screen includes the deck name (e.g., "React Router") and deck description (e.g., "React Router is a collection of navigational components that compose declaratively in your application").
    The screen includes Edit, Study, Add Cards, and Delete buttons. Each button takes the user to a different destination, as follows:

        | Button Clicked | Destination |
        | -------------- | ---------------------------------------------------------------------------------------------- |
        | Edit | Edit Deck Screen |
        | Study | Study screen |
        | Add Cards | Add Card screen |
        | Delete | Shows a warning message before deleting the deck]( See the "Delete Card Prompt" section below) |

    Each card in the deck:

        Is listed on the page under the "Cards" heading.
        Shows a question and the answer to the question.
        Has an Edit button that takes the user to the Edit Card screen when clicked.
        Has a Delete button that allows that card to be deleted.

 **/ 

function Deck() {
  const [decks, setDecks] = useState([])
  const [deck, setDeck] = useState([])
  const [cards, setCards] = useState([])
  const {deckId} = useParams();

  const abortController = new AbortController();
  const history = useHistory();

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
    getDeck();
  },[cards])

  const handleDeleteDeckClick = () => {
    if (window.confirm('Do you really want to delete this deck?')) {
      setDecks(decks.filter((deck) => (deck.id !== deckId)))
      deleteDeck(deckId).then(() => history.push('/'))
    }
  }  

  if (!deck?.cards) { 
    return "Loading..."
  }

  const cardsList = deck.cards.map((card, index) => (
    <CardDisplay key={index} card={card} setCards={setCards} cards={deck.cards}/>
  ))

  return (
    <div>
      <Nav 
        endPoint={deck.name}
      />
      <h3>{deck.name}</h3>
      <p>{deck.description}</p>
      <button onClick={() => history.push(`/decks/${deckId}/edit`)}>Edit</button>
      <button className='study-button' onClick={() => history.push(`/decks/${deckId}/study`)}>Study</button>
      <button className='create-button' onClick={() => history.push(`/decks/${deckId}/cards/new`)}>+ Add Cards</button>
      <button className='delete-button' onClick={handleDeleteDeckClick}>Delete</button>
      <br/>
      <br/>
      <h2>Cards</h2>
      {cardsList}
    </div>
  );
}

export default Deck;
