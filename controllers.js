import { Usuario } from "./database.js";

export const crearUsuario = async (req, res) => {
  if (!req.body.nombre)
    res.status(400).json({ message: "El nombre es obligatorio" });

  if (!req.body.apellido) {
    res.status(400).json({ message: "El apellido es obligatorio" });
  }

  const nuevoUsuario = await Usuario.create({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
  });

  res.status(201).json(nuevoUsuario);
};