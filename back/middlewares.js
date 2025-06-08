import { Usuario } from "./database.js";

export const validarIds = (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({
        mensaje: "El ID del usuario es obligatorio y debe ser un número",
      });
    }

    if (Number(id) <= 0) {
      return res.status(400).json({
        mensaje: "El ID del usuario debe ser un número positivo",
      });
    }

    next();
  } catch (error) {
    res.status(400).json({ error: "Error al validar el ID del usuario" });
  }
};

export const validarIdsPost = async (req, res, next) => {
  try {
    const { usuarioId } = req.params;

    if (isNaN(Number(usuarioId))) {
      return res.status(400).json({
        mensaje: "El ID del post es obligatorio y debe ser un número",
      });
    }

    if (Number(usuarioId) <= 0) {
      return res.status(400).json({
        mensaje: "El ID del post debe ser un número positivo",
      });
    }

    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario)
      return res.status(404).json({ mensaje: "Usuario no encontrado" });

    next();
  } catch (error) {
    res.status(400).json({ error: "Error al validar el ID del post" });
  }
};

export const validarUsuario = (req, res, next) => {
  try {
    if (!req.body)
      return res
        .status(400)
        .json({ mensaje: "El cuerpo de la solicitud es obligatorio" });

    const { nombre, apellido } = req.body;

    if (!nombre)
      return res.status(400).json({ mensaje: "El nombre es obligatorio" });
    if (nombre.length < 2 || nombre.length > 50)
      return res.status(400).json({
        mensaje: "El nombre debe tener entre 2 y 50 caracteres",
      });
    if (!apellido)
      return res.status(400).json({ mensaje: "El apellido es obligatorio" });
    if (apellido.length < 2 || apellido.length > 50)
      return res
        .status(400)
        .json({ mensaje: "El apellido debe tener entre 2 y 50 caracteres" });
      

    next();
  } catch (error) {
    res.status(400).json({ error: "Error al validar el usuario" });
  }
};

export const validarPost = (req, res, next) => {
  try {
    if (!req.body)
      return res
        .status(400)
        .json({ mensaje: "El cuerpo de la solicitud es obligatorio" });

    const { titulo, contenido } = req.body;

    if (!titulo)
      return res.status(400).json({ mensaje: "El título es obligatorio" });
    if (!contenido)
      return res.status(400).json({ mensaje: "El contenido es obligatorio" });

    next();
  } catch (error) {
    res.status(400).json({ error: "Error al validar el post" });
  }
};

export const validarRegistro = (req, res, next) => {
  try {
    if (!req.body)
      return res.status(400).json({
        mensaje: "El cuerpo de la solicitud es obligatorio",
      });

    const { username, password } = req.body;

    if (!username)
      return res
        .status(400)
        .json({ mensaje: "El nombre de usuario es obligatorio" });
    if (!password)
      return res.status(400).json({ mensaje: "La contraseña es obligatoria" });

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        mensaje:
          "La contraseña debe tener al menos 8 caracteres, una letra minúscula, una mayúscula y un número",
      });
    }

    next();
  } catch (error) {
    res.status(400).json({ error: "Error al validar el registro" });
  }
};

export const autorizacion = (req, res, next) => {};
