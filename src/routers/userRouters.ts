import { Router } from "express";
import userController from "../controllers/userControllers";

const router = Router()

router.post("/user", userController.createUser);
router.post("/platform", userController.createPlatform);
router.post("/game", userController.createGame);
router.get("/games", userController.getAllGames);

export{
    router
}