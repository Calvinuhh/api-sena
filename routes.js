import { Router } from "express";
import { crearUsuario } from "./controllers.js";

const router = Router();

router.post("/usuarios", crearUsuario);
// router.get("/usuarios")
// router.get("/usuarios/:id");
// router.put("/usuarios/:id")
// router.delete("/usuarios/:id");

export default router;
