import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listDecks, deleteDeck } from "./utils/api/index";

function DeckList() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const deckData = await listDecks(abortController.signal);
        setDecks(deckData || []);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Request aborted");
        } else {
          console.error("Error fetching decks:", error.message);
        }
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [deckId]);
  const handleStudy = (deckId) => {
    // Navigate to the Study component with the selected deckId
    history.push(`/decks/${deckId}/study`);
  };

  const handleView = (deckId) => {
    // Navigate to the Deck component with the selected deckId
    history.push(`/decks/${deckId}`);
  };

  const handleDelete = async (deckId) => {
    const result = window.confirm("Are you sure you want to delete this deck?");
    if (result) {
      await deleteDeck(deckId);
      // After the deck is deleted, refresh the deck list
      listDecks().then((deckData) => {
        setDecks(deckData);
      });
    }
  };

  return (
    <div>
      <h2>Deck List</h2>

      <ul>
        {decks.map((deck) => (
          <div
            key={deck.id}
            className="bg-secondary-bd-gradient deck-container"
          >
            <div>
              <strong>{deck.name}</strong>
              <p>{deck.description}</p>
              <p>
                {deck.cards.length} {deck.cards.length === 1 ? "card" : "cards"}
              </p>
            </div>

            <div className="deck-button-container">
              <button
                className="btn btn-secondary mt-2 mb-2 ml-2"
                onClick={() => handleStudy(deck.id)}
              >
                Study
              </button>
              <button
                className="btn btn-dark bi bi-eye-fill mt-2 mb-2 ml-2"
                onClick={() => handleView(deck.id)}
              />

              <button
                className="btn btn-danger bi bi-trash mt-2 mb-2 ml-2"
                onClick={() => handleDelete(deck.id)}
              />
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default DeckList;
