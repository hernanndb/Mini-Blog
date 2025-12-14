import bcrypt from "bcrypt"
import db from "../config/db.js"
import {registerSchema, loginSchema, createPostSchema} from "../utils/validations.js"

export const registerUser = async (req , res) => {
    const validatedData = registerSchema.parse(req.body);
    const {usuario, email, password} = validatedData ;
    console.log(validatedData,usuario)
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query("INSERT INTO users (username,email, pass) VALUE (?,?,?)" ,[
            usuario,
            email,
            hashedPassword
        ]);
        res.redirect("/auth/login");
    }
    catch (error){
        if (err.errors) {
        const errorMessages = err.errors.map((error) => error.message);
        console.log(errorMessages)
      // errores de Zod
        return res.status(400).send(err.errors[0].message);
    }
        res.status(500).send("Error registrando usuario")
    }
}

export const loginUser = async (req, res) => {
    const validatedData = loginSchema.parse(req.body)
    const {email, password} = validatedData ;
    try {
        const [rows] = await db.query ("SELECT * from users WHERE email = ?" , [email])
        const user = rows[0];

        if (!user) return res.status(400).send("Usuario no encontrado");

        const isMatch = await bcrypt.compare(password, user.pass);
        if (!isMatch) return res.status(400).send("Contraseña incorrecta");

        req.session.user = {
            id: user.id,
            email: user.email,
            usuario: user.username
        };
        res.redirect("/auth/dashboard");
        
    } catch (error) {
        if (err.errors) {
      // errores de Zod
      return res.status(400).send(err.errors[0].message);
    }
        res.status(500).send("Error no se puede hacer Login")
    }


}

export const logOut =async (req, res) =>{
    req.session.destroy((err) => {
    if (err) return res.send("Error al cerrar sesión");

    res.redirect("/auth/login");
  });
}


export const createPost =async (req, res) =>{
    const validatedData = createPostSchema.parse(req.body)
    const user = req.session.user;
    const {Titulo, texto} = validatedData;
    try {
        await db.query("INSERT INTO posts (user_id,title,content) VALUE (?,?,?)" ,[
            user.id,
            Titulo,
            texto
        ]);
        res.redirect("/auth/myPost");
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al crear Post")
    }
}




export const editPostPage = async (req, res) => {
    try{
    const [rows] = await db.query(
        "SELECT * FROM posts WHERE id = ? AND user_id = ?",
        [req.params.id, req.session.user.id]
    );

    res.render("editPost", { post: rows[0] });
    }
    catch (error){
        res.status(500).send("Error al editar Post")
        res.redirect("/auth/myPost")
    }
};

//updatePost
export const editPost =async (req, res) =>{
    try{
        const validatedData = createPostSchema.parse(req.body)
        const { title, content } = validatedData;

    await db.query(
        "UPDATE posts SET title = ?, content = ? WHERE id = ? AND user_id = ?",
        [title, content, req.params.id, req.session.user.id]
    );

    res.redirect("/auth/myPost");
    }
    catch( error){
        res.status(500).send("Error al editar Post")
        res.redirect("/auth/myPost")
    }
}




export const deletePost =async (req, res) =>{
    try {
        const postId = req.params.id;
        const userId = req.session.user.id;

        await db.query(
            "DELETE FROM posts WHERE id = ? AND user_id = ?",
            [postId, userId]
        );

        res.redirect("/auth/myPost");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al eliminar el post");
    }
}


export const readPost =async (req, res) =>{
    const user = req.session.user;
    try {
        const [rows] = await db.query("Select id, title, content, created_at from posts WHERE user_id = ?" ,[
            user.id,
        ]);
         res.render("myPost", { posts: rows });
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al leer los Post")
    }
}

export const readPostDash =async (req, res) =>{
    const user = req.session.user;
    try {
        const [rows] = await db.query("Select id, title, content, created_at from posts WHERE user_id = ?" ,[
            user.id,
        ]);
         res.render("dashboard", { posts: rows });
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al leer los Post")
    }
}