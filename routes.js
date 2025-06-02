import { Router } from "express";
import { crearUsuario } from "./controllers.js";

const router = Router();

router.post("/usuarios", crearUsuario);

export default router;
