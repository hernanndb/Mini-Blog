import { Router} from "express";
import { renderHome } from "../controllers/homeController.js";

const router = Router();

router.get("/",renderHome);

export default router