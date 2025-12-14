import { Router} from "express";
import { render_login, render_dashboard, render_register, render_mypost, render_createPost, render_editPost} from "../controllers/auth_view_Controller.js"
import { registerUser, loginUser, logOut, createPost, readPost, editPost, editPostPage, deletePost, readPostDash } from "../controllers/authController.js";
import { requireLogin } from "../middleware/requireLogin.js";
import { requireGuest } from "../middleware/requireGuest.js";

const router = Router();


router.get("/login" , requireGuest, render_login);
router.get("/register" , render_register);
router.get("/logout",requireLogin,logOut)
router.get("/dashboard",requireLogin ,readPostDash, render_dashboard);
router.get("/myPost",requireLogin , readPost, render_mypost);
router.get("/createPost",requireLogin , render_createPost);
router.get("/editPost/:id",requireLogin ,editPostPage);


router.post("/login" , loginUser);
router.post("/register" , registerUser);
router.post("/myPost",requireLogin , readPost);
router.post("/createPost",requireLogin , createPost);
router.post("/editPost/:id",requireLogin , editPost);
router.post("/deletePost/:id",requireLogin , deletePost);


export default router