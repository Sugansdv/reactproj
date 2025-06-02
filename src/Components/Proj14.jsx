import React, { useState, useEffect } from "react";
import "../assets/Css/AdviceGenerator.css";

function Proj14() {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAdvice = () => {
    setLoading(true);
    fetch('https://api.adviceslip.com/advice')
      .then(res => res.json())
      .then(data => {
        setAdvice(data.slip.advice);
        setLoading(false);
      })
      .catch(() => {
        setAdvice('Failed to fetch advice. Try again.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="advice-container">
      <h1 className="title">Advice Generator</h1>
      <p className="advice-text">
        {loading ? 'Loading advice...' : `"${advice}"`}
      </p>
      <button className="btn" onClick={fetchAdvice} disabled={loading}>
        Get New Advice
      </button>
    </div>
  );
}


export default Proj14;
