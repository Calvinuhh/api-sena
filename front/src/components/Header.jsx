import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("tokenExpiration");
    window.location.href = "/login";
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const goToProfile = () => {
    navigate("/profile");
    setShowUserMenu(false);
  };

  const goToHome = () => {
    navigate("/");
    setShowUserMenu(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {" "}
        <div className="header-left">
          <h1
            className="blog-title"
            onClick={goToHome}
            style={{ cursor: "pointer" }}
          >
            <span className="title-icon">✨</span>
            BlogSphere
            <span className="title-subtitle">Comparte tus ideas</span>
          </h1>
        </div>
        <div className="header-right">
          <div className="user-profile" onClick={toggleUserMenu}>
            <div className="profile-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                  fill="currentColor"
                />
                <path
                  d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {showUserMenu && (
              <div className="user-menu">
                {" "}
                <div className="user-menu-item" onClick={goToProfile}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                      fill="currentColor"
                    />
                  </svg>
                  Mi Perfil
                </div>
                <div className="user-menu-item">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                  Crear Post
                </div>
                <div className="user-menu-divider"></div>
                <div className="user-menu-item logout" onClick={handleLogout}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.59L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"
                      fill="currentColor"
                    />
                  </svg>
                  Cerrar Sesión
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
