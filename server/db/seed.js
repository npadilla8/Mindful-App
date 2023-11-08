const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main(){
    //seeding category table
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

    //seeding product table 
    //collectibles & art
    await prisma.product.upsert({
        where: { title: 'Corner Bookmark' },
        update: {},
        create: {
            title: 'Corner Bookmark',
            image: './product_images/collectibles & art/Corner Bookmark.avif',
            description: 'Personalized Hand Embroidered Corner Bookmark, Book Lovers',
            price: 9,
            available: true,
            returnPolicy: true,
            quantity: 5,
            categoryId: 3
        }
    });
    await prisma.product.upsert({
        where: { title: 'Acrylic Bookmark' },
        update: {},
        create: {
            title: 'Acrylic Bookmark',
            image: './product_images/collectibles & art/Acrylic Bookmark.avif',
            description: 'Personalized Name Acrylic Bookmark, Handmade Floral Bookmark',
            price: 11,
            available: true,
            returnPolicy: true,
            quantity: 9,
            categoryId: 3
        }
    });
    await prisma.product.upsert({
        where: { title: 'Watercolor Painting' },
        update: {},
        create: {
            title: 'Watercolor Painting',
            image: './product_images/collectibles & art/Watercolor Painting.webp',
            description: 'Dog Painting Custom From Photo, Pet Portrait Print ',
            price: 80,
            available: true,
            returnPolicy: false,
            quantity: 1,
            categoryId: 3
        }
    });

    //clothing & jewelry
    await prisma.product.upsert({
        where: { title: 'Stethoscope Necklace' },
        update: {},
        create: {
            title: 'Stethoscope Necklace',
            image: './product_images/clothing & jewelry/Stethoscope Necklace.avif',
            description: 'Custom Stethoscope Necklace With Name, Healthcare Worker',
            price: 60,
            available: true,
            returnPolicy: true,
            quantity: 10,
            categoryId: 1
        }
    });
    await prisma.product.upsert({
        where: { title: 'Birthstone Necklace' },
        update: {},
        create: {
            title: 'Birthstone Necklace',
            image: './product_images/clothing & jewelry/Birthstone Necklace.avif',
            description: 'Raw Aquamarine Necklace, March Birthstone, Crystal Rough Gemstone',
            price: 31,
            available: true,
            returnPolicy: true,
            quantity: 8,
            categoryId: 1
        }
    });
    await prisma.product.upsert({
        where: { title: 'Personalized Sweater' },
        update: {},
        create: {
            title: 'Personalized Sweater',
            image: './product_images/clothing & jewelry/Stethoscope Necklace.avif',
            description: 'Hand Embroidered With Name, Baby and Toddler Chunky Sweater',
            price: 82,
            available: true,
            returnPolicy: false,
            quantity: 3,
            categoryId: 1
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
