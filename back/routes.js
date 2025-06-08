import { Router } from "express";
import {
  obtenerUsuarios,
  actualizarUsuario,
  obtenerUsuarioPorId,
  crearPost,
  obtenerPosts,
  crearRegistro,
  loginUsuario,
  crearLike,
  obtenerLikesPost,
  eliminarLike,
  crearComentario,
  obtenerComentariosPost,
  eliminarComentario,
} from "./controllers.js";
import {
  validarIds,
  validarPost,
  validarUsuario,
  validarRegistro,
  autorizacion,
  validarPostId,
  validarContenidoComentario,
  validarComentarioId,
  validarLogin,
} from "./middlewares.js";

const router = Router();

router.param("id", validarIds);

router.post("/registro", validarRegistro, crearRegistro);
router.post("/login", validarLogin, loginUsuario);

// Usuarios
router.get("/usuarios", obtenerUsuarios);
router.get("/usuario", autorizacion, obtenerUsuarioPorId);
router.put("/usuario", autorizacion, validarUsuario, actualizarUsuario);

// Posts
router.post("/posts", autorizacion, validarPost, crearPost);
router.get("/posts", obtenerPosts);

// Likes
router.post("/posts/:postId/likes", autorizacion, validarPostId, crearLike);
router.get("/posts/:postId/likes", obtenerLikesPost);
router.delete(
  "/posts/:postId/likes",
  autorizacion,
  validarPostId,
  eliminarLike
);

// Comentarios
router.post(
  "/posts/:postId/comentarios",
  autorizacion,
  validarPostId,
  validarContenidoComentario,
  crearComentario
);
router.get("/posts/:postId/comentarios", obtenerComentariosPost);
router.delete(
  "/comentarios/:comentarioId",
  autorizacion,
  validarComentarioId,
  eliminarComentario
);

export default router;
