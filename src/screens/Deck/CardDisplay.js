import React from "react";
import { useParams, useHistory } from "react-router-dom"; 
import { deleteCard } from "../../utils/api"


function CardDisplay(props) {
    const { card, setCards, cards } = props;
    const {deckId} = useParams()

    const history = useHistory()

    const handleDeleteClick = (cardId) => {
        if (window.confirm('Do you really want to delete this card?')) {
          deleteCard(cardId).then(setCards(cards.filter((card) => (card.id !== cardId))))
          
        }
      }

    const handleEditClick = () => {
      history.push(`/decks/${deckId}/cards/${card.id}/edit`)
    }

    return (
        <div key={card.id} className='card-display'>
            <p className='question'>{card.front}</p>
            <p className='answer'>{card.back}</p>
            <button 
            className='edit-button' 
            onClick={() => handleEditClick(card.id)}
            >
                Edit
            </button>
            <button 
            className='delete-button' 
            onClick={() => handleDeleteClick(card.id)}
            >
                Delete
            </button>
        </ div>
        )
}

export default CardDisplay;
