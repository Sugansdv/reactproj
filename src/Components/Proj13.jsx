import React, { useState } from "react";
import "../assets/Css/MovieApp.css";

const Proj13 = () => {
   const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchMovies = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setMovies([]);

    fetch(`https://www.omdbapi.com/?apikey=f0ca4913&s=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setError(data.Error || 'No movies found');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch movies');
        setLoading(false);
      });
  };

  return (
    <div className="movie-container">
      <h1 className="title">Movie Search</h1>
      <form onSubmit={searchMovies} className="search-form">
        <input
          type="text"
          placeholder="Enter movie title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="movies-grid">
        {movies.map(movie => (
          <div key={movie.imdbID} className="movie-card">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/150x220?text=No+Image'}
              alt={movie.Title}
              className="movie-poster"
            />
            <h3 className="movie-title">{movie.Title}</h3>
            <p className="movie-year">{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Proj13;
