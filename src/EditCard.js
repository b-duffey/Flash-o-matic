import React, { useState, useEffect } from "react";
import { useHistory, useParams, useLocation, Link } from "react-router-dom";
import { readCard, updateCard } from "./utils/api/index";

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const deck = location.state.deck;

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const cardData = await readCard(cardId, abortController.signal);

        setFormData(cardData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Cleanup function to abort the fetch if the component unmounts
    return () => abortController.abort();
  }, [cardId]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSave = async () => {
    try {
      await updateCard(formData);
      console.log("Card saved successfully");
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };
  const handleDone = () => {
    // Navigate to the Deck component after editing the card
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

          <li className="breadcrumb-item navbar-text">{`Edit Card ${cardId}`}</li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
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
                value={formData.front || ""}
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
                value={formData.back || ""}
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

export default EditCard;
