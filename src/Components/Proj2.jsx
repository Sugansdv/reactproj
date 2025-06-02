import React, { useState } from 'react';
import '../assets/Css/TabsComponent.css';

const Proj2 = () => {
  const tabs = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <>
          <h3>User Overview</h3>
          <p>
            Welcome back! Here’s a summary of your profile and recent activity.
          </p>
          <ul>
            <li>Username: Suganya</li>
            <li>Member since: Jan 2025</li>
            <li>Last login: 2 days ago</li>
          </ul>
        </>
      ),
    },
    {
      id: "posts",
      label: "Posts",
      content: (
        <>
          <h3>Your Posts</h3>
          <p>You have 3 recent posts:</p>
          <ol>
            <li>How to learn React in 2025</li>
            <li>Why I love Open Source Software</li>
          </ol>
        </>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      content: (
        <>
          <h3>Account Settings</h3>
          <p>Update your preferences and privacy settings here.</p>
          <button className="btn">Change Password</button>
          <button className="btn danger">Delete Account</button>
        </>
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="profile-tabs">
      <nav className="tab-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <section className="tab-panel">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </section>
    </div>
  );
};

export default Proj2;