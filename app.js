/*archivo principal que va a arrancar la lectura y respuesta del puerto*/

import express from "express";
import home from "./routes/homeRoutes.js";
import auth from "./routes/authRoutes.js";
import configViewEngine from "./config/viewEngine.js"
import path from "path";
import { fileURLToPath } from "url";
import setupSession from "./config/sessionConfig.js";
import infouser from "./middleware/infouser.js";



const app = express();




// Configuración de vistas
configViewEngine(app);

//Procesamiento de form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Sesión
setupSession(app);

infouser(app);



//Ruta Home
app.use("/", home);

//Ruta auth
app.use("/auth", auth);



//Configuracion de Carpeta raiz Public
const __dirname = path.dirname(fileURLToPath(import.meta.url));                   
app.use(express.static(path.join(__dirname, "public")));


app.listen(3000, ()=> console.log("Servidor en http://localhost:3000")); // app.listen le dice a express que escuche el puerto que le asigno