import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, updateDeck } from "./utils/api/index";

function EditDeck() {
  //Path: /decks/:deckId/edit
  //use readDeck() to load existing deck
  //Navigation: Home / <name of deck / Edit Deck
  // Same form as CreateDeck but with prefilled data
  //Submit button saves changeds (state)
  //Cancel button - routes to Deck component
  const { deckId } = useParams();
  const history = useHistory();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const deckData = await readDeck(deckId, abortController.signal);

        setFormData({
          ...deckData,
          name: deckData.name,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Cleanup function to abort the fetch if the component unmounts
    return () => abortController.abort();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await updateDeck(formData);
      console.log("Deck saved successfully");
    } catch (error) {
      console.error("Error saving deck:", error);
    }
  };

  const handleDone = () => {
    // Navigate to the deck page after canceling
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
              <Link to={`/decks/${deckId}`}>{formData.name}</Link>
            </span>
          </li>

          <li className="breadcrumb-item navbar-text">Edit Deck</li>
        </ol>
      </nav>
      <h2>Edit Deck</h2>
      <div className="border border-2 border-primarybg-secondary-bd-gradient">
        <div className="mb-3 ml-3">
          <form>
            <label htmlFor="name" className="form-label">
              Name
              <input
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name || ""}
                className="form-control"
              />
            </label>
            <br />
            <label htmlFor="description" className="form-label">
              Description:
              <textarea
                id="description"
                name="description"
                onChange={handleChange}
                value={formData.description || ""}
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
                onClick={handleSubmit}
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

export default EditDeck;
