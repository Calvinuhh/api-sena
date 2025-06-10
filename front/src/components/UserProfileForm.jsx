import { useState, useEffect } from "react";
import Toast from "./Toast";
import "./UserProfileForm.css";

export default function UserProfileForm() {
  const [formData, setFormData] = useState({
    username: "",
    nombre: "",
    apellido: "",
    descripcion: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    loadUserData();
  }, []);
  const loadUserData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(
        "https://api-sena-6j30.onrender.com/api/usuario",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        setFormData({
          username: userData.username || "",
          nombre: userData.nombre || "",
          apellido: userData.apellido || "",
          descripcion: userData.descripcion || "",
        });
      } else {
        setError("Error al cargar los datos del usuario");
      }
    } catch (error) {
      setError("Error de conexión al cargar los datos");
    } finally {
      setLoadingData(false);
    }
  };

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
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(
        "https://api-sena-6j30.onrender.com/api/usuario",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setToastMessage("Perfil actualizado correctamente");
        setShowToast(true);
      } else {
        const data = await response.json();
        setError(data.mensaje || data.error || "Error al actualizar el perfil");
      }
    } catch (error) {
      setError("Error de conexión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="profile-form-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando datos del perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          duration={3000}
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="profile-form-container">
        <form onSubmit={handleSubmit} className="profile-form">
          <h2>Información Personal</h2>

          <div className="form-row">
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
              <small>Este es tu identificador único en la plataforma</small>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                disabled={loading}
                placeholder="Tu nombre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido">Apellido:</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                disabled={loading}
                placeholder="Tu apellido"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="descripcion">Descripción:</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                disabled={loading}
                placeholder="Cuéntanos algo sobre ti..."
                rows="4"
              />
              <small>Esta información aparecerá en tu perfil público</small>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading} className="save-button">
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </>
  );
}
