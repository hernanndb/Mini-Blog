/*archivo principal que va a rrancar la lectura y respuesta del puerto*/

import express from "express";
import home from "./routes/homeRoutes.js";
import configViewEngine from "./config/viewEngine.js"
import path, { dirname } from "path";
import { fileURLToPath } from "url";


const app = express();

//Configuracion de Carpeta raiz Public
const __dirname = path.dirname(fileURLToPath(import.meta.url));                   
app.use(express.static(path.join(__dirname, "public")));


// Configuración de vistas
configViewEngine(app);



//Ruta Home
app.use("/", home)




app.listen(3000, ()=> console.log("Servidor en http://localhost:3000")); // app.listen le dice a express que escuche el puerto que le asigno