import { Router } from "express";
import { crearUsuario, obtenerUsuarios, actualizarUsuario } from "./controllers.js";


const router = Router();

router.post("/usuarios", crearUsuario); // CREATE ser        ---> Calvin
// router.get("/usuarios")                  // GET all users     ---> Jesus
router.get("/usuarios", obtenerUsuarios);
// router.get("/usuarios/:id");             // GET user by ID    ---> Henry
router.put("/usuarios/:id", actualizarUsuario)              // UPDATE user by ID ---> Laura
// router.delete("/usuarios/:id");          // DELETE user by ID ---> Calvin

export default router;


