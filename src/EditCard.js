import React, { useState, useEffect } from "react";
import { useHistory, useParams, useLocation, Link } from "react-router-dom";
import { readCard, updateCard } from "./utils/api/index";
import CardForm from "./CardForm";

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const deck = location.state.deck;

  const [formData, setFormData] = useState({}); // Initialize formData state
  const [updatedCardData, setUpdatedCardData] = useState({}); // State to hold the latest card data

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

  const handleSave = async (formData) => {
    try {
      const updatedCardData = await updateCard(formData);
      console.log("Card saved successfully");

      // Set the latest card data to display in the form
      setUpdatedCardData(updatedCardData);
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

      <CardForm
        initialFormData={formData}
        onSave={handleSave}
        onCancel={handleDone}
      />
    </div>
  );
}

export default EditCard;
