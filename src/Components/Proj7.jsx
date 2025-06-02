import React, { useState, useEffect } from 'react';
import '../assets/Css/UserDirectory.css';

const Proj7 = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        setUsers(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="directory-container">
      <h2 className="title">User Directory</h2>
      {loading && <p className="loading">Loading users...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.login.uuid} className="user-card">
              <img
                src={user.picture.medium}
                alt={`${user.name.first} ${user.name.last}`}
                className="user-avatar"
              />
              <div className="user-info">
                <p className="user-name">
                  {user.name.first} {user.name.last}
                </p>
                <p className="user-email">{user.email}</p>
                <p className="user-location">
                  {user.location.city}, {user.location.country}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Proj7;
