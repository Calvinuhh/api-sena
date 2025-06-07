import { Usuario } from "./database.js";

export const crearUsuario = async (req, res) => {
  try {
    if (!req.body.nombre) throw Error("El nombre es obligatorio");
    if (!req.body.apellido) throw Error("El apellido es obligatorio");

    const nuevoUsuario = await Usuario.create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export const obtenerUsuarios = async (req, res) => {
  try{
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error){
    res.status(500).json({error: "Error al obtener los usuarios"});
  }
}
