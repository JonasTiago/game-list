import { Router } from "express";
import userController from "../controllers/userControllers.js";

const router = Router()

router.get("/user", userController.getAllUsers);
router.post("/user", userController.createUser);
router.post("/platform", userController.createPlatform);
router.post("/game", userController.createGame);

export{
    router
}