import React, { useState } from "react";
import { useHistory, useParams, useLocation, Link } from "react-router-dom";
import { createCard } from "./utils/api/index";

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const deck = location.state.deck;

  const initialFormState = {
    front: "",
    back: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSave = async () => {
    const abortController = new AbortController();

    try {
      // Pass the signal to createCard to support aborting the request
      await createCard(deckId, formData, abortController.signal);

      // Clear the form after saving
      setFormData({ ...initialFormState });
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request aborted");
      } else {
        console.error("Error creating card:", error.message);
      }
    } finally {
      abortController.abort(); // Make sure to abort the controller after the request is completed or aborted
    }
  };

  const handleDone = () => {
    // Navigate to the Deck component after adding the card
    history.push(`/decks/${deckId}`);
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
          <li
            className="breadcrumb-item"
            style={{ display: "flex", alignItems: "center" }}
          >
            <span className="btn btn-link navbar-text">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </span>
          </li>

          <li className="breadcrumb-item navbar-text">Add Card</li>
        </ol>
      </nav>

      <h2>Add Card</h2>
      <div className="border border-2 border-primarybg-secondary-bd-gradient">
        <div className="mb-3 ml-3">
          <form>
            <label htmlFor="front" className="form-label">
              Front:
              <textarea
                id="front"
                type="text"
                name="front"
                onChange={handleChange}
                value={formData.front}
                className="form-control"
              />
            </label>
            <br />
            <label htmlFor="back" className="form-label">
              Back:
              <textarea
                id="back"
                type="text"
                name="back"
                onChange={handleChange}
                value={formData.back}
                className="form-control"
              />
            </label>
            <br />
            <div
              className="btn-group"
              role="group"
              aria-label="Basic outlined example"
            >
              <button
                className="bi bi-floppy btn btn-outline-primary"
                type="button"
                onClick={handleSave}
              />

              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={handleDone}
              >
                Done
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCard;
