// CardForm.js
import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";

function CardForm({ initialFormData, onSave, onCancel, updatedCardData }) {
  const { deckId } = useParams();
  const history = useHistory();

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSave = async () => {
    try {
      await onSave(formData);
      console.log("Card saved successfully");

      // Clear the form after saving
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };

  const handleDone = () => {
    onCancel(); // Call onCancel to handle navigation or any cleanup
  };

  // Update the form data if there is updated card data
  useEffect(() => {
    if (updatedCardData) {
      setFormData(updatedCardData);
    }
  }, [updatedCardData]);

  return (
    <div>
      <h2>Card Form</h2>
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

export default CardForm;
