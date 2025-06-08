import { Usuario, Post, Like, Comentario } from "./database.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

process.loadEnvFile();
const { JWT_SECRET } = process.env;

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

export const obtenerUsuarioPorId = async (req, res) => {
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

export const crearLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const usuarioId = req.usuarioInfo.id;

    const likeExistente = await Like.findOne({
      where: { post_id: postId, usuario_id: usuarioId },
    });

    if (likeExistente) {
      return res.status(400).json({ mensaje: "Ya has dado like a este post" });
    }

    const nuevoLike = await Like.create({
      post_id: postId,
      usuario_id: usuarioId,
    });

    res.status(201).json(nuevoLike);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el like" });
  }
};

export const obtenerLikesPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const likes = await Like.findAll({
      where: { post_id: postId },
      include: [{ model: Usuario, attributes: ["id", "nombre", "apellido"] }],
    });

    res.status(200).json({
      total: likes.length,
      likes,
    });
  } catch (error) {
    res.status(400).json({ error: "Error al obtener los likes" });
  }
};

export const eliminarLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const usuarioId = req.usuarioInfo.id;

    const like = await Like.findOne({
      where: { post_id: postId, usuario_id: usuarioId },
    });

    if (!like) {
      return res.status(404).json({ mensaje: "Like no encontrado" });
    }

    await like.destroy();
    res.status(200).json({ mensaje: "Like eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar el like" });
  }
};

export const crearComentario = async (req, res) => {
  try {
    const { contenido } = req.body;
    const { postId } = req.params;
    const usuarioId = req.usuarioInfo.id;

    const nuevoComentario = await Comentario.create({
      contenido,
      post_id: postId,
      usuario_id: usuarioId,
    });

    res.status(201).json(nuevoComentario);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el comentario" });
  }
};

export const obtenerComentariosPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comentarios = await Comentario.findAll({
      where: { post_id: postId },
      include: [{ model: Usuario, attributes: ["id", "nombre", "apellido"] }],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(comentarios);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener los comentarios" });
  }
};

export const eliminarComentario = async (req, res) => {
  try {
    const { comentarioId } = req.params;

    const comentario = await Comentario.findByPk(comentarioId);

    if (!comentario) {
      return res.status(404).json({ mensaje: "Comentario no encontrado" });
    }

    await comentario.destroy();
    res.status(200).json({ mensaje: "Comentario eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar el comentario" });
  }
};
