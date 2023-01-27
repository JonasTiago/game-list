import { User } from "../controllers/userControllers.js";
import conflictError from "../errors/conflictError.js";
import notFoundError from "../errors/notFoundError.js";
import userRepositorie from "../repositories/userRepositorie.js";
import userSchema from "../schemas/userSchema.js";

async function getUsers(){
    const cars = await userRepositorie.getUsers();
    return cars;
}

async function createPlatform(name:string, email:string) {
    const user = await userRepositorie.getUserEmail(email);

    if(!user) throw notFoundError();

    await userRepositorie.createPlatform(name,user.id);
}

async function createUser(user:User) {
    const {error} = userSchema.validate(user, {abortEarly:true});
    if(error) error.details.map(e => e.message);

    const emailInvalid = await userRepositorie.getUserEmail(user.email);

    if(emailInvalid) throw conflictError(`email ${user.email} already registered.`);

    await userRepositorie.createUser(user)
}

const userService = {
    getUsers,
    createUser,
    createPlatform
}

export default userService;