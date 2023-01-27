import {prisma} from "../src/config/database.js"

async function main() {
    await prisma.user.createMany({
        data:[{
            name:"jose",
            age:23,
            email:"jose@gmail.com"
        },
        {
            name:"maria",
            age:18,
            email:"maria@gmail.com"
        }]
    }),
    await prisma.platform.create({
        data:{
            name:"steam",
            userId:1
        }
    })
    await prisma.game.create({
        data:{
            name:"COD",
            platformId:1
        }
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(async ()=>{
    await prisma.$disconnect();
  })