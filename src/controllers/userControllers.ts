import { Request, Response } from "express"
import userService from "../services/userService.js"

async function getAllUsers(req:Request, res:Response) {
    try{
       const cars = await userService.getUsers()
       res.send(cars);
    }catch(err){
        res.sendStatus(500);
    }
}

export {
    getAllUsers
}