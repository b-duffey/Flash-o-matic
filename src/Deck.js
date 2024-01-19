import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { deleteDeck, readDeck, deleteCard } from "./utils/api/index";

function Deck() {
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      try {
        const deckData = await readDeck(deckId, abortController.signal);
        setDeck(deckData);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    })();

    return () => abortController.abort(); // Cleanup the AbortController when the component unmounts
  }, [deckId]); // Re-run the effect when deckId changes

  const handleStudy = () => {
    history.push(`/decks/${deck.id}/study`);
  };

  const handleEditDeck = () => {
    history.push(`/decks/${deck.id}/edit`);
  };

  const handleAddCard = () => {
    history.push(`/decks/${deck.id}/cards/new`, { deck });
  };

  const handleEditCard = (cardId) => {
    history.push(`/decks/${deck.id}/cards/${cardId}/edit`, { deck });
  };

  const handleDeleteDeck = async () => {
    const result = window.confirm("Are you sure you want to delete this deck?");
    if (result) {
      await deleteDeck(deck.id);
      // Redirect to the home page or another appropriate location after deletion
      history.push("/");
    }
  };

  const handleDeleteCard = async (cardId) => {
    const result = window.confirm("Are you sure you want to delete this card?");
    if (result) {
      await deleteCard(cardId);
      // After deleting the card, fetch the updated deck to reflect changes
      const updatedDeck = await readDeck(deckId);
      setDeck(updatedDeck);
    }
  };

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

          <li className="breadcrumb-item navbar-text">{deck.name}</li>
        </ol>
      </nav>

      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <button
        className="btn btn-secondary mt-2 mb-2 ml-2"
        onClick={handleStudy}
      >
        Study
      </button>
      <button
        className="btn btn-info bi bi-pencil-square mt-2 mb-2 ml-2"
        onClick={handleEditDeck}
      >
        Edit
      </button>
      <button
        className="btn btn-primary mt-2 mb-2 ml-2"
        onClick={handleAddCard}
      >
        Add Card
      </button>
      <button
        className="btn btn-danger bi bi-trash mt-2 mb-2 ml-2"
        onClick={handleDeleteDeck}
      />
      <div className="cards-in-deck-container">
        <h3>Cards in "{deck.name}"</h3>
        {deck.cards && (
          <ol>
            {deck.cards.map((card) => (
              <li key={card.id} className="card-container">
                <span className="card-text-front">{card.front}</span> -
                <span className="card-text-back">{card.back}</span>
                <div className="card-button-container">
                  <button
                    className="btn btn-info bi bi-pencil-square mt-2 mb-2 ml-2"
                    onClick={() => handleEditCard(card.id)}
                  >
                    Edit Card
                  </button>
                  <button
                    className="btn btn-danger bi bi-trash mt-2 mb-2 ml-2"
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    Delete Card
                  </button>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export default Deck;
