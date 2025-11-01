import React, { useState, useEffect, useRef } from "react";
import './../styles/App.css';

const fruits = ["apple", "banana", "cherry", "date", "elderberry", "fig"];

const AutoComplete = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState(fruits);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const debounceRef = useRef(null);

  const filterSuggestions = (query) => {
    const trimmedQuery = query.trim();
    const filtered = trimmedQuery === '' 
      ? fruits 
      : fruits.filter(fruit =>
          fruit.toLowerCase().includes(trimmedQuery.toLowerCase())
        );
    setSuggestions(filtered);
    setShowSuggestions(true);
  };

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      filterSuggestions(input);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [input]);

  const handleSelect = (suggestion) => {
    setInput(suggestion);
    // No need to hide; useEffect will update suggestions to matching ones
  };

  const handleInputClick = () => {
    if (suggestions.length === 0 && input.trim()) {
      filterSuggestions(input);
    }
  };

  return (
    <div className="autocomplete-container" style={{ position: 'relative', width: '300px' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onClick={handleInputClick}
        placeholder="Type to search fruits..."
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          width: '100%',
          boxSizing: 'border-box'
        }}
      />
      <ul style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: 'white',
        border: '1px solid #ccc',
        borderTop: 'none',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        maxHeight: '200px',
        overflowY: 'auto',
        zIndex: 1
      }}>
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => handleSelect(suggestion)}
            style={{
              padding: '10px',
              cursor: 'pointer',
              borderBottom: '1px solid #eee'
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <AutoComplete />
    </div>
  )
};

export default App;