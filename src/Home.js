import React from "react";
import { useHistory } from "react-router-dom";
import DeckList from "./DeckList";

function Home() {
  const history = useHistory();

  const handleCreate = () => {
    history.push(`/decks/new`);
  };

  return (
    <div>
      {/* CreateDeck button */}
      <div className="container">
        <button
          type="button"
          className="btn btn-primary bi bi-plus-circle m-2"
          onClick={handleCreate}
        >
          Create Deck
        </button>
      </div>

      {/* Display existing decks */}
      <div className="container p-3 mb-2 bg-light text-dark">
        <DeckList />
      </div>
    </div>
  );
}

export default Home;
