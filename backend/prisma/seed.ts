import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  // Mock Products (from kala controlpanel)
  const products = [
    { name: "Ram Darbar Relief", price: 35999, dimensions: "36×48 inches", thickness: "3 inch", material: "MDF", category: "Relief Sculpture", description: "Handcrafted Ram Darbar relief sculpture with intricate detailing.", featured: true, customizable: true, stock: 2, rating: 4.9 },
    { name: "Radha Krishna Vrindavan", price: 28999, dimensions: "48×30 inches", thickness: "2 inch", material: "HDHMR", category: "3D Mural Art", description: "Beautiful Radha Krishna mural set in Vrindavan.", featured: true, customizable: true, stock: 3, rating: 4.8 },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
