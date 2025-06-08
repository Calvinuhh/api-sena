import { Usuario, Post } from "./database.js";
import { hash } from "bcrypt";

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, apellido } = req.body;

    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, descripcion } = req.body;

    const usuario = await Usuario.findByPk(id);
    if (!usuario)
      return res.status(404).json({ mensaje: "Usuario no encontrado" });

    await usuario.update({ nombre, apellido, descripcion });

    res.json({
      mensaje: "Usuario actualizado correctamente",
      usuario: {
        id,
        nombre,
        apellido,
        descripcion,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();

    if (usuarios.length === 0)
      return res.status(404).json({ mensaje: "No se encontraron usuarios" });

    res.status(200).json(usuarios);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener los usuarios" });
  }
};

export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener el usuario por ID" });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    await usuario.destroy();

    res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar el usuario" });
  }
};

export const crearPost = async (req, res) => {
  try {
    const { titulo, contenido } = req.body;
    const { usuarioId } = req.params;

    const nuevoPost = await Post.create({
      titulo,
      contenido,
      usuario_id: usuarioId,
    });

    res.status(201).json(nuevoPost);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el post" });
  }
};

export const obtenerPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: { exclude: ["usuario_id"] },
      include: [Usuario],
    });

    if (posts.length === 0)
      return res.status(404).json({ mensaje: "No se encontraron posts" });

    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener los posts" });
  }
};

export const crearRegistro = async (req, res) => {
  try {
    const { username, password } = req.body;

    const nuevoRegistro = await Usuario.create({
      username,
      password: await hash(password, 8),
    });

    res.status(201).json(nuevoRegistro);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el registro" });
  }
};
