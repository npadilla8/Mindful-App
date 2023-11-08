const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main(){
    await prisma.category.upsert({
        where: { name: 'Clothing & Jewelry' },
        update: {},
        create: {
            name: 'Clothing & Jewelry'
        }
    });
    await prisma.category.upsert({
        where: { name: 'Toys' },
        update: {},
        create: {
            name: 'Toys'
        }
    });
    await prisma.category.upsert({
        where: { name: 'Collectibles & Art' },
        update: {},
        create: {
            name: 'Collectibles & Art'
        }
    });
    await prisma.category.upsert({
        where: { name: 'Home & Living' },
        update: {},
        create: {
            name: 'Home & Living'
        }
    });
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (error) => {
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    })
