import { useState } from "react";

function AddPartModal({ onClose, onAdd }) {
  const [part, setPart] = useState({
    partNumber: "",
    manufacturer: "",
    vehicle: "",
    price: "",
    quantity: ""
  });

  const handleSubmit = () => {
    onAdd({
      ...part,
      price: parseFloat(part.price),
      quantity: parseInt(part.quantity)
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Add New Part</h3>

        {Object.keys(part).map(key => (
          <input
            key={key}
            placeholder={key.replace(/([A-Z])/g, " $1")}
            value={part[key]}
            onChange={e => setPart({ ...part, [key]: e.target.value })}
          />
        ))}

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button className="primary" onClick={handleSubmit}>
            Add Part
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPartModal;
