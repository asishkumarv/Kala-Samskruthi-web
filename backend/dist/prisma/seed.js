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
