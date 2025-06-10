import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Card, CardContent, Typography } from "@mui/material";
import "./Home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  //peticion al back, guardo los posts en el estado posts, mas reciente primero
  const cargarPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts");
      const data = await res.json();
      setPosts(data.reverse());
    } catch (error) {
      console.error("Error al cargar posts:", error);
    }
  };
  //guardar posts al cargar la página
  useEffect(() => {
    cargarPosts();
  }, []);

  const goToUserProfile = (userId) => {
    if (userId) {
      navigate(`/${userId}`);
    }
  };
  return (
    <div className="home-page">
      <Header onPostPublished={cargarPosts} />

      <div className="home-content">
        <div className="welcome-section">
          <h1 className="welcome-title">¡Bienvenido a BlogApi!</h1>
          <p className="welcome-subtitle">
            Descubre las historias más interesantes de nuestra comunidad
          </p>
        </div>

        <div className="posts-feed">
          <h2>Feed de Posts</h2>

          {posts.length === 0 ? (
            <p>No hay publicaciones aún.</p>
          ) : (
            posts.map((post) => (
              <Card key={post.id} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h6">{post.titulo}</Typography>
                  <Typography variant="body1" sx={{ marginY: 1 }}>
                    {post.contenido}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Publicado por:{" "}
                    <span
                      className="username-link"
                      onClick={() => goToUserProfile(post.Usuario?.id)}
                    >
                      {post.Usuario?.nombre || "Anónimo"}
                    </span>
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
