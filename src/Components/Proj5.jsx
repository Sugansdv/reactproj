import React, { useState } from 'react';
import '../assets/Css/DynamicList.css';

const Proj5 = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrEdit = () => {
    if (input.trim() === "") return;

    if (editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex] = input.trim();
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems([...items, input.trim()]);
    }
    setInput("");
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setInput("");
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setInput(items[index]);
  };

  return (
    <div className="dynamic-list-container">
      <h2 className="title">Dynamic List</h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter item"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-field"
          onKeyDown={(e) => e.key === "Enter" && handleAddOrEdit()}
        />
        <button onClick={handleAddOrEdit} className="add-edit-btn">
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul className="item-list">
        {items.length === 0 && <p className="empty-msg">No items yet</p>}
        {items.map((item, index) => (
          <li key={index} className="item">
            <span>{item}</span>
            <div className="actions">
              <button
                onClick={() => handleEdit(index)}
                className="edit-btn"
                aria-label={`Edit ${item}`}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="delete-btn"
                aria-label={`Delete ${item}`}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Proj5;
