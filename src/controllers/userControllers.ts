import { Request, Response } from "express"
import userService from "../services/userService.js"

async function getAllGames(req:Request, res:Response) {
    const email:string = req.body.email;

    try{
       const games = await userService.getGames(email);
       res.send(games);
    }catch(err){
        res.status(500).send(err);
    }
}

export type User = {
    name:string,
    age:number,
    email:string
}

async function createUser(req:Request, res:Response) {
    const user : User = req.body ;

    try{
        await userService.createUser(user);
        res.sendStatus(200);
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
}

async function createPlatform(req:Request, res:Response) {
    const {name, email} = req.body ;

    try{
        await userService.createPlatform(name, email);
        res.sendStatus(200);
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
}

async function createGame(req:Request, res:Response) {
    const {name, email, platform} = req.body;

    try{
        await userService.createGame(name, email, platform);
        res.sendStatus(200);
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
}

const userController = {
    createUser,
    createPlatform,
    createGame,
    getAllGames
}

export default userController;