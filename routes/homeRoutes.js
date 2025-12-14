import { Router} from "express";
import { renderHome } from "../controllers/home_view_Controller.js";


const router = Router();

router.get("/",renderHome);


export default router