import express, { json } from "express";
import morgan from "morgan";
import database from "./database.js";
import router from "./routes.js";
import cors from "cors";

const app = express();

process.loadEnvFile();
const { CLIENT_URL } = process.env;

app.use(
  cors({
    origin: CLIENT_URL,
  })
);
app.use(morgan("dev"));
app.use(json());
app.use("/api", router);

database
  .sync({ alter: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("La base de datos se ha conectado correctamente");
      console.log("Proyecto escuchando en el puerto 3000");
    });
  })
  .catch((error) => {
    console.log(`Hubo un error: ${error}`);
    throw Error(error);
  });
