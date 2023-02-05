import { User } from "../controllers/userControllers";
import conflictError from "../errors/conflictError";
import notFoundError from "../errors/notFoundError";
import userRepositorie from "../repositories/userRepositorie";
import userSchema from "../schemas/userSchema";

async function getGames(email:string) {
    const user = await userRepositorie.getUserEmail(email);
    if (!user) throw notFoundError();

    const games = await userRepositorie.getGames(user.id);
    return games;
}

async function createPlatform(name: string, email: string) {
    const user = await userRepositorie.getUserEmail(email);
    if (!user) throw notFoundError();

    await userRepositorie.createPlatform(name, user.id);
}

async function createUser(user: User) {
    const { error } = userSchema.validate(user, { abortEarly: true });
    if (error) error.details.map(e => e.message);

    const emailInvalid = await userRepositorie.getUserEmail(user.email);
    if (emailInvalid) throw conflictError(`email ${user.email} already registered.`);

    return await userRepositorie.createUser(user)
}

async function createGame(name: string, email: string, platform: string) {
    //middleware
    const user = await userRepositorie.getUserEmail(email);
    if (!user) throw notFoundError();
    //
    
    const platformValid = await userRepositorie.getPlatform(platform);

    if (!platformValid) throw notFoundError();

    await userRepositorie.createGame(name, platformValid.id)
}

const userService = {
    getGames,
    createUser,
    createPlatform,
    createGame
}

export default userService;