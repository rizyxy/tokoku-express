import { prisma } from "../src/lib/prisma";

async function seedProduct() {
    const products = [];

    for (let index = 1; index <= 100; index++) {
        products.push({
            name: `Product ${index}`,
            description: `Description ${index}`,
            price: index * 1000,
        });
    }

    await prisma.product.createMany({
        data: products,
    });
}

async function main() {
    await seedProduct();
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