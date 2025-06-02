import React, { useState } from "react";
import '../assets/Css/JokeGenerator.css';

function Proj9() {
 const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJoke = () => {
    setLoading(true);
    setError("");
    setJoke("");

    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch joke");
        return res.json();
      })
      .then((data) => {
        setJoke(`${data.setup} — ${data.punchline}`);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="joke-container">
      <h2 className="title">Random Joke Generator</h2>
      <button onClick={fetchJoke} disabled={loading} className="joke-btn">
        {loading ? "Loading..." : "Get a Joke"}
      </button>
      {error && <p className="error">{error}</p>}
      {joke && <p className="joke">{joke}</p>}
    </div>
  );
};


export default Proj9;
