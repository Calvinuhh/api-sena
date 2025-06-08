import { useState, useEffect } from "react";
import "./UserStats.css";

export default function UserStats() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalLikes: 0,
    totalComments: 0,
    memberSince: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserStats();
  }, []);

  const loadUserStats = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(
        "http://localhost:3000/api/usuarios/me/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error loading user stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="user-stats">
        <div className="stats-header">
          <h3>Estadísticas</h3>
        </div>
        <div className="stats-loading">
          <div className="stats-skeleton"></div>
          <div className="stats-skeleton"></div>
          <div className="stats-skeleton"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-stats">
      <div className="stats-header">
        <h3>Estadísticas</h3>
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-icon posts">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                fill="currentColor"
              />
              <path d="M14 2V8H20" fill="currentColor" />
              <path d="M16 13H8M16 17H8M10 9H8" fill="currentColor" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-number">{stats.totalPosts}</span>
            <span className="stat-label">Posts</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon likes">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-number">{stats.totalLikes}</span>
            <span className="stat-label">Likes</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon comments">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-number">{stats.totalComments}</span>
            <span className="stat-label">Comentarios</span>
          </div>
        </div>
      </div>

      <div className="member-since">
        <div className="member-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="member-content">
          <span className="member-label">Miembro desde</span>
          <span className="member-date">{stats.memberSince || "Hoy"}</span>
        </div>
      </div>
    </div>
  );
}
