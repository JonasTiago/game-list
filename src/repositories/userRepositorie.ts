import { prisma } from "../config/database.js";
import { User } from "../controllers/userControllers.js";

async function getUsers() {
    const data = await prisma.user.findMany();
    return data;
}

async function createUser(user:User) {
    await prisma.user.create({
        data:{
            name:user.name,
            age:user.age,
            email:user.email
        }
    })
}

async function createPlatform(name:string, id:number) {
    await prisma.platform.create({
        data:{
            name:name,
            userId:id
        }
    })
}

async function createGame(name:string, id:number) {
    await prisma.game.create({
        data:{
            name:name,
            platformId:id
        }
    })
}

async function getUserEmail(email:string) {
    const data = await prisma.user.findFirst({
        where:{
            email,
        }
    })
    
    return data;
}

async function getPlatform(platform:string) {
    const data = await prisma.platform.findFirst({
        where:{
            name:platform,
        }
    })
    
    return data;
}

const userRepositorie = {
    getUsers,
    createUser,
    getUserEmail,
    createPlatform,
    getPlatform,
    createGame
}

export default userRepositorie;