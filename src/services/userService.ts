import userRepositorie from "../repositories/userRepositorie.js";

async function getUsers(){
    const cars = await userRepositorie.getUsers();
    return cars;
}

const userService = {
    getUsers
}

export default userService;