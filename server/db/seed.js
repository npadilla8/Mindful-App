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
            description: 'Personalized Hand Embroidered Corner Bookmark | Book Lovers',
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
            description: 'Personalized Name Acrylic Bookmark | Handmade Floral Bookmark',
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
            description: 'Dog Painting Custom From Photo | Pet Portrait Print ',
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
            description: 'Custom Stethoscope Necklace With Name | Healthcare Worker',
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
            description: 'Raw Aquamarine Necklace | March Birthstone | Crystal Rough Gemstone',
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
            description: 'Hand Embroidered With Name | Baby and Toddler Chunky Sweater',
            price: 82,
            available: true,
            returnPolicy: false,
            quantity: 3,
            categoryId: 1
        }
    });

    //toys
    await prisma.product.upsert({
        where: { title: 'Crochet Rattle' },
        update: {},
        create: {
            title: 'Crochet Rattle',
            image: './product_images/toys/Crochet Rattle.avif',
            description: 'Custom Wooden Baby Rattle | Crochet Rattle Toy | Teething Ring',
            price: 13,
            available: true,
            returnPolicy: false,
            quantity: 25,
            categoryId: 2
        }
    });
    await prisma.product.upsert({
        where: { title: 'Human Body Puzzle' },
        update: {},
        create: {
            title: 'Human Body Puzzle',
            image: './product_images/toys/Human Body Puzzle.avif',
            description: 'Kids Anatomy Puzzle | Montessori Toys | Wooden Human Puzzle ',
            price: 45,
            available: true,
            returnPolicy: true,
            quantity: 105,
            categoryId: 2
        }
    });
    await prisma.product.upsert({
        where: { title: 'Montessori Climber' },
        update: {},
        create: {
            title: 'Montessori Climber',
            image: './product_images/toys/Montessori Climber.avif',
            description: 'Climbing Ladder | Indoor Playground | Climbing Arch | Pickler Triangle Set',
            price: 150,
            available: true,
            returnPolicy: true,
            quantity: 55,
            categoryId: 2
        }
    });

    //home & living
    await prisma.product.upsert({
        where: { title: 'Breakfast Lover Candle' },
        update: {},
        create: {
            title: 'Breakfast Lover Candle',
            image: './product_images/home & living/Breakfast Lover Candle.webp',
            description: 'Maine Blueberry Waffles Delicious Candle | Realistic Waffles, Blueberries, Syrup',
            price: 15,
            available: true,
            returnPolicy: true,
            quantity: 28,
            categoryId: 4
        }
    });
    await prisma.product.upsert({
        where: { title: 'Goat Milk Soap' },
        update: {},
        create: {
            title: 'Goat Milk Soap',
            image: 'capstone/Mindful-App/server/db/product_images/home & living/Goat Milk Soap.webp',
            description: 'Handcrafted Goat Milk Scented Soap | Skin Care | 5 Bars | Self Care',
            price: 22,
            available: true,
            returnPolicy: false,
            quantity: 12,
            categoryId: 4
        }
    });
    await prisma.product.upsert({
        where: { title: 'Aromatherapy Candle' },
        update: {},
        create: {
            title: 'Aromatherapy Candle',
            image: './product_images/home & living/Sleep & Relaxation Aromatherapy Candle.webp',
            description: '3 Wick Large Aromatherapy Candle | For Sleep, Relaxation & Happiness | Toxin Free',
            price: 35,
            available: true,
            returnPolicy: true,
            quantity: 50,
            categoryId: 4
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
