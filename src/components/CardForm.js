import React from "react";
import {useHistory} from "react-router-dom";


function CardForm(props) {

    const history = useHistory();

    const {
        handleSubmit,
        handleFrontChange,
        front,
        handlebackChange,
        back,
        doneButtonText,
        deckId
    } = props;

    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="front">
          Front
          <br/>
          <textarea 
            type="textbox" 
            id="front" 
            name="front" 
            onChange={handleFrontChange}
            value={front}
          />
        </label>
        <br/>
        <label htmlFor="back">
          Back
          <br/>
          <textarea 
            id="back" 
            type="textbox"
            name="back"
            onChange={handlebackChange}
            value={back}
          />
        </label>
        <br/>
        <button type="Done" onClick={() => history.push(`/decks/${deckId}`)}>Done</button>
        <button type="Submit">Save</button>
      </form>
    )
}

export default CardForm;