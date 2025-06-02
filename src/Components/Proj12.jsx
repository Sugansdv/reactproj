import React, { useEffect, useState } from "react";
import axios from "axios";
import '../assets/Css/NewsApp.css';

const Proj12 = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('Tamil Nadu');
  const [country, setCountry] = useState('us');
  const [lang, setLang] = useState('en');

  const API_KEY = 'ab3c4042735c5550e47cea788dee7d09';

  const fetchNews = async () => {
    if (!query.trim()) {
      setError('Please enter a topic to search.');
      return;
    }

    setLoading(true);
    setError('');
   try {
  const res = await axios.get(
    `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=${lang}&country=${country}&max=10&apikey=${API_KEY}`
  );
  setArticles(res.data.articles);
} catch (err) {
  setError('Failed to fetch news. Please check your API key and network.');
}

    setLoading(false);
  };

    const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchNews();
    }
  };

  return (
    <div className="container mt-5 animate_animated animate_fadeIn">
      <h2 className="mb-4">📰 News Headlines</h2>

      <div className="mb-3 d-flex flex-wrap align-items-center gap-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search news (e.g., Tamil Nadu)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <select
          className="form-select w-auto"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="us">United States</option>
          <option value="in">India</option>
          <option value="gb">United Kingdom</option>
          <option value="ca">Canada</option>
          <option value="au">Australia</option>
        </select>
 <select
          className="form-select w-auto"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="ta">Tamil</option>
          <option value="hi">Hindi</option>
        </select>

        <button className="btn btn-primary" onClick={fetchNews}>Search</button>
      </div>

      {loading && <p>Loading news...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {articles.length === 0 && !loading && !error && (
          <p>No articles found. Try a different topic or check spelling.</p>
        )}
 {articles.map((article, idx) => (
          <div key={idx} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="card-img-top"
                  style={{ height: '180px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-primary mt-auto"
                >
                  Read More
                </a>
              </div>
              <div className="card-footer text-muted">
                {new Date(article.publishedAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Proj12;