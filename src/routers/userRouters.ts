import { Router } from "express";
import { getAllUsers } from "../controllers/userControllers.js";

const router = Router()

router.get("/user", getAllUsers);

export{
    router
}