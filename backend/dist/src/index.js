"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
dotenv_1.default.config();
const app = (0, express_1.default)();
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
// --- ROUTES ---
// Products / Artworks
app.get('/api/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany({ include: { reviews: true } });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: req.params.id },
            include: { reviews: true }
        });
        if (!product)
            return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});
// Gallery Images
app.get('/api/gallery', async (req, res) => {
    try {
        const images = await prisma.galleryImage.findMany();
        res.json(images);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch gallery images' });
    }
});
// Inquiries
app.post('/api/inquiries', async (req, res) => {
    try {
        const inquiry = await prisma.inquiry.create({ data: req.body });
        res.status(201).json(inquiry);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to submit inquiry' });
    }
});
app.get('/api/inquiries', async (req, res) => {
    try {
        const inquiries = await prisma.inquiry.findMany();
        res.json(inquiries);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch inquiries' });
    }
});
// Orders
app.post('/api/orders', async (req, res) => {
    try {
        const { items, ...orderData } = req.body;
        const order = await prisma.order.create({
            data: {
                ...orderData,
                items: {
                    create: items
                }
            },
            include: { items: true }
        });
        res.status(201).json(order);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await prisma.order.findMany({ include: { items: true } });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});
// Videos
app.get('/api/videos', async (req, res) => {
    try {
        const videos = await prisma.artworkVideo.findMany();
        res.json(videos);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
});
// Custom Artwork Requests
app.post('/api/custom-requests', async (req, res) => {
    try {
        const request = await prisma.customArtworkRequest.create({ data: req.body });
        res.status(201).json(request);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to submit custom request' });
    }
});
app.get('/api/custom-requests', async (req, res) => {
    try {
        const requests = await prisma.customArtworkRequest.findMany();
        res.json(requests);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch custom requests' });
    }
});
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
