// me va a permitir que cada paguina de ejs,tenga acceso a la info del username y email

export function infouser(app){
    app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
    });
}

export default infouser;