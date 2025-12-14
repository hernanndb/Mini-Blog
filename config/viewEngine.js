//Archivo dedicado al viewEngine,en este caso es EJS
//El Archivo utiliza Modulos Nativos de Node.js( Path y fileURLToPath), 
// para leer la ruta del archivo que llama en este caso app.js,pasarlo de formato url a direccion de sitema y de ahi extraer el nombre y path de la carpeta raiz

import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";


const __dirname = path.dirname(fileURLToPath(import.meta.url)); 
                                                                

function configViewEngine(app) {                                
  app.set("view engine", "ejs");                                
  app.set("views", path.join(__dirname, "../views"));
  app.use(expressLayouts);
  app.set("layout", "layout/main");
}

export default configViewEngine;                               