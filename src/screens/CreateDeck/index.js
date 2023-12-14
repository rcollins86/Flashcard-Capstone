import React, { useState } from "react";
import { useHistory } from "react-router-dom"; 
import { createDeck } from "../../utils/api"

import Nav from "../../components/Nav"

/**
    The path to this screen should be /decks/new.
    There is a breadcrumb navigation bar with a link to home / followed by the text Create Deck (i.e., Home/Create Deck).
    A form is shown with the appropriate fields for creating a new deck.
        The name field is an <input> field of type text.
        The description field is a <textarea> field that can be multiple lines of text.
    If the user clicks Submit, the user is taken to the Deck screen.
    If the user clicks Cancel, the user is taken to the Home screen.

 **/ 

function CreateDeck() {

  const history = useHistory();

  const [name, setName] = useState("");
  const handleNameChange = (event) => setName(event.target.value);

  const [description, setDescription] = useState("");
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = await createDeck({
      name: name,
      description: description
    })
    history.push(`/decks/${newDeck.id}`)

    setName("")
    setDescription("")
    
  };

  return (
    <div>
      <Nav 
        endPoint="Create Deck"
      />
      <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name:
        <br/>
        <input 
          type="text" 
          id="name" 
          name="name" 
          onChange={handleNameChange}
          value={name}
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
          value={description}
        />
      </label>
      <br/>
      <button type="Cancel" onClick={() => history.push('/')}>Cancel</button>
      <button type="Submit">Submit</button>
    </form>
    </div>
  );
}

export default CreateDeck;
