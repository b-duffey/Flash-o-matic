import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck } from "./utils/api/index";

function Study() {
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false); // State to track if the card is flipped

  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchDeckData = async () => {
      try {
        const deckData = await readDeck(deckId, abortController.signal);
        setDeck(deckData);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    };

    fetchDeckData();

    return () => abortController.abort(); // Cleanup the AbortController when the component unmounts
  }, [deckId]); // Re-run the effect when deckId changes

  const handleFlip = () => {
    // Implement logic to flip the card (display back)
    setIsFlipped((prevIsFlipped) => !prevIsFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prevIndex) => prevIndex + 1);
    // Implement logic to navigate to the next card
    if (currentCardIndex === deck.cards.length - 1) {
      const result = window.confirm(
        "Restart? Click 'cancel' to return to the home page."
      );
      if (result) {
        setCurrentCardIndex(0);
      } else {
        history.push("/");
      }
    }
  };

  if (deck.cards && deck.cards.length > 2) {
    const currentCard = deck.cards[currentCardIndex];

    return (
      <div>
        <nav
          className="navbar navbar-light d-flex justify-content-center"
          style={{ backgroundColor: "#e3f2fd" }}
          aria-label="breadcrumb"
        >
          <ol
            className="breadcrumb text-center"
            style={{ listStyle: "none", padding: 0, margin: 0 }}
          >
            <li
              className="breadcrumb-item"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span className="bi bi-house-fill btn btn-link navbar-text">
                <Link to="/">Home</Link>
              </span>
            </li>
            <li
              className="breadcrumb-item"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span className="btn btn-link navbar-text">
                <Link to={`/decks/${deckId}`}>{deck.name}</Link>
              </span>
            </li>
          </ol>
        </nav>

        <h2>{deck.name}: Study</h2>

        <h3>
          Card {currentCardIndex + 1} of {deck.cards.length}
        </h3>
        <div className="bg-light bg-gradient study-card-container">
          {/* Toggle between front and back based on isFlipped state */}
          {isFlipped ? <p>{currentCard.back}</p> : <p>{currentCard.front}</p>}
          {/* Add a button to flip the card */}
          <button className="btn btn-primary mr-2" onClick={handleFlip}>
            Flip
          </button>
          {/* Add a button to navigate to the next card */}
          <button
            className="btn btn-success bi bi-caret-right-fill"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    );
  } else {
    // Handle the case where there are no cards in the deck
    return (
      <div>
        <h1>{deck.name}: Study</h1>
        <p>Not enough cards. Add cards to study.</p>
        {/* Add a button to navigate to Add Card component */}
        <button onClick={() => history.push(`/decks/${deckId}/cards/new`)}>
          Add Card
        </button>
      </div>
    );
  }
}

export default Study;
