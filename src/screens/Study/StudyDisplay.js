import React, { useState } from "react";
import { useHistory } from "react-router-dom"; 


function StudyDisplay(props) {
    const { cards } = props;

    const [question, setQuestion] = useState(0);
    const [cardFront, setCardFront] = useState(true);
    const [showNext, setShowNext] = useState(false);

    const history = useHistory();

    const handleNextClicked = () => {
        if (question === cards.length -1) {
            if (window.confirm('Restart cards?')) {
                setQuestion(0)
            } else {
                history.push('/')
            }
        } else {
            setQuestion(question + 1)
        }
        setCardFront(true)
        setShowNext(false)
    }

    return (
        <div className='study-display-card'>
            <h3>Card {question + 1} of {cards.length}</h3>
            <p>{cards[question][cardFront ? 'front' : 'back']}</p>
            <button style={{backgroundColor:"lightgray"}} onClick={() => {
                setCardFront(!cardFront)
                setShowNext(true)
            }}>Flip</button>
            {showNext && <button onClick={handleNextClicked} style={{backgroundColor:"lightblue"}}>Next</button>}
        </div>
    );
}

export default StudyDisplay;
