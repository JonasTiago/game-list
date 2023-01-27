import { prisma } from "../config/database.js";

async function getUsers() {
    const data = await prisma.user.findMany();
    return data;
}

const userRepositorie = {
    getUsers
}

export default userRepositorie;