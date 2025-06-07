import { Router } from "express";
import { crearUsuario, obtenerUsuarios } from "./controllers.js";

const router = Router();

router.post("/usuarios", crearUsuario); // CREATE ser        ---> Calvin
// router.get("/usuarios")                  // GET all users     ---> Jesus
router.get("/usuarios", obtenerUsuarios);
// router.get("/usuarios/:id");             // GET user by ID    ---> Henry
// router.put("/usuarios/:id")              // UPDATE user by ID ---> Laura
// router.delete("/usuarios/:id");          // DELETE user by ID ---> Calvin

export default router;


