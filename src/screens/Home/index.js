import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; 
import {
  listDecks,
  updateDeck,
  readDeck,
  createDeck,
  deleteDeck,
  createCard,
  readCard,
  updateCard,
  deleteCard
} from "../../utils/api"

/**
    The path to this screen should be /.
    A Create Deck button is shown, and clicking it brings the user to the Create Deck screen.
    Existing decks are each shown with the deck name, the number of cards, and a Study, View, and Delete button.
    Clicking the Study button brings the user to the Study screen.
    Clicking the View button brings the user to the Deck screen.
    Clicking the Delete button shows a warning message before deleting the deck. (use window.confirm())
 **/ 

function Home() {
  
  const [decks, setDecks] = useState([])

  const history = useHistory();
  const abortController = new AbortController();

  useEffect (() => {
    async function getDecks() {
      try {
        setDecks(await listDecks( abortController.signal ))
      } catch (error) {
			  if (error.name === "AbortError") {
			    // Ignore `AbortError`
			    console.log("Aborted");
			  } else {
			    throw error;
			  }
      }
    }
    getDecks()
  },[])

  const handleDeleteClick = (deckId) => {
    if (window.confirm('Do you really want to delete this deck?')) {
      deleteDeck(deckId)
      setDecks(decks.filter((deck) => (deck.id !== deckId)))
    }
  }

  const deckList = decks.map((deck) => (
    <div key={deck.id} className='deck-display'>
      <h1 className='deck-name'>{deck.name}</h1>
      <p className='deck-count'><i>{deck.cards.length} cards </i></p>
      <p className='deck-description'>{deck.description}</p>
      <button 
        className='view-button' 
        onClick={() => history.push(`/decks/${deck.id}`)}>
          View
      </button>
      <button 
        className='study-button' 
        onClick={() => history.push(`/decks/${deck.id}/study`)}>
          Study
      </button>
      <button 
        className='delete-button' 
        onClick={() => handleDeleteClick(deck.id)}>
          Delete
        </button>
    </ div>
  ))

  return (
    <div>
      <button onClick={() => history.push('/decks/new')} className='create-button'>+ Create Deck</button>
      {deckList}
    </div>
  );
}

export default Home;
