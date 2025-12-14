
import session from "express-session";
import { createRequire } from "module";
import "dotenv/config";




const require = createRequire(import.meta.url);

const MySQLStore = require("express-mysql-session")(session);


export default function setupSession(app) {

  const sessionStore = new MySQLStore({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  app.use(
    session({
      key: "session_cookie",
      secret: process.env.SESSION_SECRET,
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60, // 1 hora
        httpOnly: true,
        secure: false,
      },
    })
  );

  app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

  
}

