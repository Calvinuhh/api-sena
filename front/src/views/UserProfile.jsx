import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import "./UserProfile.css";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarUsuario = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/usuarios/${id}`);

      if (!res.ok) {
        throw new Error("Usuario no encontrado");
      }

      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error("Error al cargar usuario:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      cargarUsuario();
    }
  }, [id]);

  const goBack = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="user-profile-page">
        <Header />
        <div className="user-profile-content">
          <div className="loading-container">
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Cargando perfil de usuario...
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-profile-page">
        <Header />
        <div className="user-profile-content">
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button variant="contained" onClick={goBack}>
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile-page">
      <Header />
      <div className="user-profile-content">
        <div className="profile-header">
          <Button
            variant="contained"
            onClick={goBack}
            sx={{
              mb: 3,
              alignSelf: "flex-start",
              bgcolor: "white",
              color: "primary.main",
              "&:hover": {
                bgcolor: "grey.100",
              },
            }}
          >
            ← Volver al inicio
          </Button>
        </div>
        <Card className="user-profile-card">
          <CardContent>
            <div className="profile-info">
              {" "}
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  fontSize: "3rem",
                  bgcolor: "primary.main",
                  mb: 2,
                }}
              >
                {user?.nombre?.charAt(0).toUpperCase() ||
                  user?.username?.charAt(0).toUpperCase()}
              </Avatar>
              {user?.descripcion && (
                <Typography
                  variant="body1"
                  sx={{ mt: 2, fontStyle: "italic", textAlign: "center" }}
                >
                  "{user.descripcion}"
                </Typography>
              )}
              <div className="user-details">
                <div className="detail-item">
                  <Typography variant="subtitle1" component="dt">
                    Username:
                  </Typography>
                  <Typography variant="body1" component="dd">
                    @{user?.username}
                  </Typography>
                </div>

                {user?.nombre && (
                  <div className="detail-item">
                    <Typography variant="subtitle1" component="dt">
                      Nombre:
                    </Typography>
                    <Typography variant="body1" component="dd">
                      {user.nombre} {user?.apellido || ""}
                    </Typography>
                  </div>
                )}

                <div className="detail-item">
                  <Typography variant="subtitle1" component="dt">
                    ID de Usuario:
                  </Typography>
                  <Typography variant="body1" component="dd">
                    #{user?.id}
                  </Typography>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
