import { Usuario, Post } from "./database.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.usuarioInfo;
    const { nombre, apellido, descripcion, username } = req.body;

    const usuario = await Usuario.findByPk(id);
    if (!usuario)
      return res.status(404).json({ mensaje: "Usuario no encontrado" });

    if (username !== undefined && username !== usuario.username) {
      const usuarioExistente = await Usuario.findOne({
        where: { username },
      });

      if (usuarioExistente) {
        return res.status(400).json({
          mensaje:
            "El nombre de usuario ya está en uso. Por favor, elige otro.",
        });
      }
    }

    const updateData = {};
    if (nombre !== undefined) updateData.nombre = nombre;
    if (apellido !== undefined) updateData.apellido = apellido;
    if (descripcion !== undefined) updateData.descripcion = descripcion;
    if (username !== undefined) updateData.username = username;

    await usuario.update(updateData);

    res.json({
      mensaje: "Usuario actualizado correctamente",
      usuario: {
        id,
        username: usuario.username,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        descripcion: usuario.descripcion,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ["password"] },
    });

    if (usuarios.length === 0)
      return res.status(404).json({ mensaje: "No se encontraron usuarios" });

    res.status(200).json(usuarios);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener los usuarios" });
  }
};

export const obtenerUsuarioPorIdParam = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener el usuario por ID" });
  }
};

export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.usuarioInfo;

    const usuario = await Usuario.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener el usuario por ID" });
  }
};

export const crearPost = async (req, res) => {
  try {
    const { titulo, contenido } = req.body;
    const { id } = req.usuarioInfo;

    const nuevoPost = await Post.create({
      titulo,
      contenido,
      usuario_id: id,
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
      include: [
        {
          model: Usuario,
          attributes: { exclude: ["password"] },
        },
      ],
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

export const loginUsuario = async (req, res) => {
  try {
    const { username, password } = req.body;

    const usuario = await Usuario.findOne({ where: { username } });
    if (!usuario)
      return res.status(404).json({ mensaje: "Usuario no encontrado" });

    const isPasswordValid = await compare(password, usuario.password);

    if (!isPasswordValid)
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });

    return res.status(200).json({
      token: jwt.sign(
        {
          id: usuario.id,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      ),
    });
  } catch (error) {
    res.status(400).json({ error: "Error al iniciar sesión" });
  }
};
