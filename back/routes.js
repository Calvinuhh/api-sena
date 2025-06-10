import { Router } from "express";
import {
  obtenerUsuarios,
  actualizarUsuario,
  obtenerUsuarioPorId,
  obtenerUsuarioPorIdParam,
  crearPost,
  obtenerPosts,
  crearRegistro,
  loginUsuario,
} from "./controllers.js";
import {
  validarIds,
  validarPost,
  validarUsuario,
  validarRegistro,
  autorizacion,
  validarLogin,
} from "./middlewares.js";

const router = Router();

router.param("id", validarIds);

router.post("/registro", validarRegistro, crearRegistro);
router.post("/login", validarLogin, loginUsuario);

// Usuarios
router.get("/usuario", autorizacion, obtenerUsuarioPorId);
router.put("/usuario", autorizacion, validarUsuario, actualizarUsuario);
router.get("/usuarios", obtenerUsuarios);
router.get("/usuarios/:id", obtenerUsuarioPorIdParam);

// Posts
router.post("/posts", autorizacion, validarPost, crearPost);
router.get(
  "/posts",
  // autorizacion,
  obtenerPosts
);

export default router;
