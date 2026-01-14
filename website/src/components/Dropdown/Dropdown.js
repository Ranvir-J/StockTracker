import { useState } from "react";
import "./Dropdown.css";

function Dropdown({ value, onChange }) {
  const options = [
    { label: "Previous 7d", value: "7d" },
    { label: "Previous 30d", value: "30d" },
    { label: "Previous 90d", value: "90d" },
    { label: "Previous Year", value: "Year" }
  ];

  const [selected, setSelected] = useState("30d");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    setSelected(value);
    setIsOpen(false);
  };
  

  return (
    <div className="dropdown">
      <button className="dropdown-trigger" onClick={() => setIsOpen(prev => !prev)}>
        Previous {selected} <img src="https://cdn-icons-png.flaticon.com/128/8567/8567254.png" />
      </button>

      {isOpen && (
        <ul className="dropdown-menu">{options.map(option => (
            <li key={option.value} onClick={() => handleSelect(option.value)} className="dropdown-item">
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
