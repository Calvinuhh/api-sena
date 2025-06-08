import Header from "../components/Header";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-page">
      <Header />

      <div className="home-content">
        <div className="welcome-section">
          <h1 className="welcome-title">¡Bienvenido a BlogApi!</h1>
          <p className="welcome-subtitle">
            Descubre las historias más interesantes de nuestra comunidad
          </p>
        </div>

        <div className="posts-feed">
          <h2>Feed de Posts</h2>
          <p>Aquí aparecerán todos los posts de los usuarios...</p>
          <p>¡Próximamente implementaremos esta funcionalidad!</p>
        </div>
      </div>
    </div>
  );
}
