import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";

const PostCard = ({ onPostPublished }) => {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

  //validar los campos vacios
  const handleSubmit = async () => {
    if (!titulo.trim() || !contenido.trim()) {
      alert("Completa todos los campos");
      return;
    }

    try {
      const token = localStorage.getItem("userToken"); //para obtener el token del localStorage

      //enviarr la solicitud POST al backend
      const res = await fetch("https://api-sena-front.onrender.com/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo, contenido }),
      });

      if (!res.ok) throw new Error("Error al crear post");

      // Limmpieza del formulario
      setTitulo("");
      setContenido("");

      //llamar a la funcion para actualizar el feed
      onPostPublished();
    } catch (error) {
      console.error(error);
      alert("Error al publicar");
    }
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Crear publicación</Typography>
        <TextField
          label="Título"
          fullWidth
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="¿Qué estás pensando?"
          multiline
          rows={4}
          fullWidth
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Publicar
        </Button>
      </CardContent>
    </Card>
  );
};

export default PostCard;
