//Archivo dedicado al viewEngine,en este caso es EJS
//El Archivo utiliza Modulos Nativos de Node.js( Path y fileURLToPath), 
// para leer la ruta del archivo que llama en este caso app.js,pasarlo de formato url a direccion de sitema y de ahi extraer el nombre y path de la carpeta raiz

import path from "path";
import { fileURLToPath } from "url";


const __dirname = path.dirname(fileURLToPath(import.meta.url)); //transforma de URL a Direccion de sistema(sea MAC,Windows,etc)  
                                                                //path.dirname extrae el nombre y direccion de la carpeta Raiz

function configViewEngine(app) {                                //La funcion le dice a app(Express) que los Views entan en --dirname(que es Carpeta Raiz)/views
  app.set("view engine", "ejs");                                //y con path.join Arregla los "/" o "\" Segun que use tu sistema para indicar Subcarpetas
  app.set("views", path.join(__dirname, "../views"));
}

export default configViewEngine;                                //Exporta la funcion para que la pueda usar o llamar app.js