import { useState } from "react";
import "../assets/Css/GithubProfile.css";

const Proj11 = () => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProfile = () => {
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setProfile(null);

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) throw new Error("User not found");
          else throw new Error("Failed to fetch profile");
        }
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="github-container">
      <h2 className="title">GitHub Profile Viewer</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="search-input"
        />
        <button onClick={fetchProfile} disabled={loading} className="search-btn">
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {profile && (
        <div className="profile-card">
          <img
            src={profile.avatar_url}
            alt={profile.login}
            className="avatar"
          />
          <h3>{profile.name || profile.login}</h3>
          {profile.bio && <p className="bio">{profile.bio}</p>}
          <p><strong>Followers:</strong> {profile.followers}</p>
          <p><strong>Following:</strong> {profile.following}</p>
          <p><strong>Public Repos:</strong> {profile.public_repos}</p>
          <a href={profile.html_url} target="_blank" rel="noreferrer" className="profile-link">
            View on GitHub
          </a>
        </div>
      )}
    </div>
  );
};

export default Proj11;
