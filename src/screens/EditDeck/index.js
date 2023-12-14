import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom"; 
import { updateDeck, readDeck } from "../../utils/api"
import Nav from "../../components/Nav"

/**
    The path to this screen should include the deckId (i.e., /decks/:deckId/edit).
    You must use the readDeck() function from src/utils/api/index.js to load the existing deck.
    There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck being edited, and finally the text Edit Deck (e.g., Home/Rendering in React/Edit Deck).
    It displays the same form as the Create Deck screen, except it is prefilled with information for the existing deck.
    The user can edit and update the form.
    If the user clicks Cancel, the user is taken to the Deck screen.

 **/ 

function EditDeck() {
  const [deck, setDeck] = useState({})
  const {deckId} = useParams()

  const handleNameChange = (event) => setDeck((newDeck) => ({...newDeck, name: event.target.value}));
  const handleDescriptionChange = (event) => setDeck((newDeck) => ({...newDeck, description: event.target.value}))

  const history = useHistory();
  const abortController = new AbortController();
  
  useEffect(() => {
    async function getDeck() {
      try {
        const currentDeck = await readDeck(deckId, abortController.signal)
        setDeck(currentDeck)
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

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck({
      id: deckId,
      name: deck.name,
      description: deck.description
    })
      .then(setDeck)
      .then(history.push(`/decks/${deckId}`))
  };

  return (
    <div>
      <Nav 
        secondNavName={deck.name}
        secondNavLink={`/decks/${deckId}`}
        endPoint="Edit Deck"
      />
        <h1>Edit Deck</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <br/>
          <input 
            type="text" 
            id="name" 
            name="name" 
            onChange={handleNameChange}
            value={deck.name}
          />
        </label>
        <br/>
        <label htmlFor="description">
          Description:
          <br/>
          <textarea 
            id="description" 
            type="textbox"
            name="description"
            onChange={handleDescriptionChange}
            value={deck.description}
          />
        </label>
        <br/>
        <button type="Cancel" onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
        <button type="Submit">Submit</button>
      </form>
    </div>
  );
}

export default EditDeck;
