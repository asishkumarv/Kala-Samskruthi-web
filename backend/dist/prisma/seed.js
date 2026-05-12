"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('Seeding data...');
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.review.deleteMany();
    await prisma.product.deleteMany();
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
    // Mock Reviews
    const reviews = [
        { id: "1", customerName: "Deepa Menon", rating: 5, comment: "Absolutely stunning artwork! The Ram Darbar relief is a masterpiece. Everyone who visits our home admires it.", featured: true, approved: true },
        { id: "2", customerName: "Rajesh Gupta", rating: 5, comment: "Exceptional quality and craftsmanship. The 3D effect is breathtaking.", featured: true, approved: true },
        { id: "3", customerName: "Kavitha S", rating: 4, comment: "Beautiful artwork, delivered on time. Slightly smaller than expected but quality is amazing.", featured: false, approved: true },
        { id: "4", customerName: "New Customer", rating: 3, comment: "Good product but packaging could be better.", featured: false, approved: false },
    ];
    for (const review of reviews) {
        await prisma.review.create({
            data: review
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
