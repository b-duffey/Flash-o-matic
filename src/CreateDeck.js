import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "./utils/api/index";

function CreateDeck() {
  const history = useHistory();

  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async () => {
    const abortController = new AbortController();

    try {
      // Pass the signal to createDeck to support aborting the request
      const newDeck = await createDeck(formData, abortController.signal);

      // Clear the form after saving
      setFormData({ ...initialFormState });

      // Navigate to the Deck component after creating the deck
      history.push(`/decks/${newDeck.id}`);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request aborted");
      } else {
        console.error("Error creating deck:", error.message);
      }
    } finally {
      abortController.abort(); // Make sure to abort the controller after the request is completed or aborted
    }
  };

  const handleCancel = () => {
    // Navigate to the home page after canceling
    history.push(`/`);
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

          <li className="breadcrumb-item navbar-text">Create Deck</li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <div className="border border-2 border-primarybg-secondary-bd-gradient">
        <div className="mb-3 ml-3">
          <form>
            <label htmlFor="name" className="form-label">
              Name:
              <input
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
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
                value={formData.description}
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
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateDeck;
