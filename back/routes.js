import { Router } from "express";
import {
  obtenerUsuarios,
  actualizarUsuario,
  obtenerUsuarioPorId,
  eliminarUsuario,
  crearPost,
  obtenerPosts,
  crearRegistro,
} from "./controllers.js";
import {
  validarIds,
  validarPost,
  validarUsuario,
  validarIdsPost,
  validarRegistro,
  autorizacion,
} from "./middlewares.js";

const router = Router();

router.param("id", validarIds);

// Registro
router.post("/registro", validarRegistro, crearRegistro);
// router.post("/login") PARA DESPUES

// Usuarios
router.get("/usuarios", obtenerUsuarios);
router.get("/usuarios/:id", obtenerUsuarioPorId);
router.put("/usuarios/:id", validarUsuario, actualizarUsuario);
router.delete("/usuarios/:id", eliminarUsuario);

// Posts
router.post("/posts/:usuarioId", validarIdsPost, validarPost, crearPost);
router.get("/posts", obtenerPosts);

export default router;
