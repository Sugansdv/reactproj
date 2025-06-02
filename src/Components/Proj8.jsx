import React, { useEffect, useState } from "react";
import '../assets/Css/CurrenyConverter.css';

const Proj8 = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch exchange rates");
        return res.json();
      })
      .then((data) => {
        if (data.result === "success") {
          setRates(data.rates);
          setLoading(false);
        } else {
          throw new Error("API error");
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const convert = () => {
    if (!rates[fromCurrency] || !rates[toCurrency]) return;
    const rate = rates[toCurrency] / rates[fromCurrency];
    setConvertedAmount((amount * rate).toFixed(4));
  };

  return (
    <div className="converter-container">
      <h2 className="title">Currency Converter</h2>

      {loading && <p className="loading">Loading exchange rates...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <div className="input-group">
            <label>Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label>From:</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="select-field"
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>To:</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="select-field"
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <button onClick={convert} className="convert-btn">
            Convert
          </button>

          {convertedAmount !== null && (
            <p className="result">
              {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </p>
          )}
        </>
      )}
    </div>
  );
};


export default Proj8;
