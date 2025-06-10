import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Toast from "./Toast";
import "./LoginForm.css";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionExpired, setSessionExpired] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get("expired") === "true") {
      setSessionExpired(true);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSessionExpired(false);

    try {
      const response = await fetch(
        "https://api-sena-front.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        const expirationTime = Date.now() + 60 * 60 * 1000;

        localStorage.setItem("userToken", data.token);
        localStorage.setItem("tokenExpiration", expirationTime.toString());

        // Mostrar toast de éxito
        setShowToast(true);

        // Redirigir después de un breve delay
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError(data.mensaje || data.error || "Error al iniciar sesión");
      }
    } catch (error) {
      setError("Error de conexión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {showToast && (
        <Toast
          message="¡Bienvenido! Has iniciado sesión correctamente"
          type="success"
          duration={1500}
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Iniciar Sesión</h2>

          {sessionExpired && (
            <div className="warning-message">
              Tu sesión ha expirado. Por favor, inicia sesión nuevamente.
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Ingresar"}
          </button>

          {error && <div className="error-message">{error}</div>}

          <div className="login-links">
            <p>
              ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
