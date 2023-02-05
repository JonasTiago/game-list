import supertest from "supertest";
import { prisma } from "../src/config/database";
import app from "../src/index"

const api = supertest(app);

// beforeAll -> antes de todo it
// beforeEach -> antes de todo it
// afterAll -> depois de todo it
// afterEach -> depos de todo it

beforeAll(async () => {
    await prisma.game.deleteMany();
    await prisma.platform.deleteMany();
    await prisma.user.deleteMany(); // limpa o banco antes
});

afterAll(async () => {
    await prisma.game.deleteMany();
    await prisma.platform.deleteMany();
    await prisma.user.deleteMany(); // limpa o banco antes
});

describe("POST /game", () => {
    it("should respond with status 200 and arry if body is valid", async () => {

        await prisma.user.create({
            data:{
                name:"test",
                email:"test@gmail.com",
                age:20
            }
        });

        await prisma.platform.create({
            data:{
                name:"xbox",
                userId:1
            }
        }); 

        const result = await api.post("/game").send({
            "name": "COD",
            "platformId": 1,
        });


        expect(result.status).toBe(200);
        expect(result.body).toHaveLength(1); //valor do arry vindo do banco.
    });

    it("should respond with status 404 and arry if body is invalid",async ()=>{
        const result = await api.post("/game").send({});

        expect(result.status).toBe(500);
        expect(result.body).toHaveLength(1); //valor do arry vindo do banco.
    })
});

// describe("GET /games", () => {
//     it("should respond with status 200 and arry", async () => {
//         const result = await api.get("/games");

//         expect(result.status)
//         expect(result.body).toEqual(
//             expect.arrayContaining([
//                 expect.objectContaining({
//                     "id": expect.any(Number),
//                     "name": expect.any(String),
//                     "platformId": expect.any(Number),
//                     "createdAt": expect.any(String)
//                 })
//             ]))
//     });
// });



// describe("POST /user", () => {

//     it("should respond with status 200 and Object", async () => {
//         const bodyInput = {
//             "name": expect.any(String),
//             "age": expect.any(Number),
//             "email": expect.any(String),
//         };
//         const result = await api.post("/game").send(bodyInput);

//         expect(result.status).toBe(200);
//         expect(result.body).toEqual(
//             expect.objectContaining({
//                 "id": expect.any(Number),
//                 "name": expect.any(String),
//                 "age": expect.any(Number),
//                 "email": expect.any(String),
//                 "createdAt": expect.any(String),
//             })
//         );
//     });

//     it("should respond with status 422 when the body not exist", async () => {
//         const result = await api.get("/game").send();

//         expect(result.status).toBe(422);
//     });

//     it("should respond with status 422 when the body is invalid", async () => {
//         const bodyInvalid = {
//             "name": expect.any(String),
//             "age": expect.any(Number),
//             "email": expect.any(String),
//         };
//         const result = await api.get("/game").send(bodyInvalid);

//         expect(result.status).toBe(422);
//     });
// })