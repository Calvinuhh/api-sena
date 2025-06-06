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

export const actualizarUsuario = async (req, res) => {
  try {
        // Verificar que el body existe
        if (!req.body) {
            throw Error("No se recibieron datos para actualizar");
        }

    const { id } = req.params;
    const { nombre, apellido } = req.body;

    if (!nombre) throw Error("El nombre es obligatorio");
    if (!apellido) throw Error("El apellido es obligatorio");
  
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw Error("Usuario no encontrado");

    await usuario.update({ nombre, apellido });

   res.json({
      mensaje: 'Usuario actualizado correctamente',
      usuario: {
        id,
        nombre,
        apellido
      }
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
