import React, { useState } from "react";
import "./../styles/App.css";

const fruits = [
  "apple",
  "banana",
  "mango",
  "kiwi",
  "oranges",
  "avocado",
  "berries",
  "strawberry"
];

const App = () => {
  const [query, setQuery] = useState("");

  const filteredFruits = fruits.filter((fruit) =>
    fruit.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div id="main">
      <h1>Search item</h1>

      <input
        type="text"
        placeholder="Search fruit..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul>
        {filteredFruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
