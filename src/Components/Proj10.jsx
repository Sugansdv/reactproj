import React, { useEffect, useState } from "react";
import '../assets/Css/CryptoTracker.css';

function Proj10() {
   const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch crypto prices");
        return res.json();
      })
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="crypto-container">
      <h2 className="title">Top 10 Cryptocurrencies (USD)</h2>
      {loading && <p className="loading">Loading prices...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <table className="crypto-table">
          <thead>
            <tr>
              <th>Coin</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.id}>
                <td className="coin-info">
                  <img src={coin.image} alt={coin.name} className="coin-image" />
                  <span>{coin.name}</span>
                </td>
                <td>${coin.current_price.toLocaleString()}</td>
                <td
                  className={
                    coin.price_change_percentage_24h >= 0
                      ? "positive"
                      : "negative"
                  }
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td>${coin.market_cap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Proj10;
