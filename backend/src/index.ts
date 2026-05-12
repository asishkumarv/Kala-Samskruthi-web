import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// --- ROUTES ---

// Products / Artworks
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({ include: { reviews: true } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { reviews: true }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Gallery Images
app.get('/api/gallery', async (req, res) => {
  try {
    const images = await prisma.galleryImage.findMany();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
});

// Inquiries
app.post('/api/inquiries', async (req, res) => {
  try {
    const inquiry = await prisma.inquiry.create({ data: req.body });
    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
});

app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await prisma.inquiry.findMany();
    res.json(inquiries);
  } catch (error) {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({ include: { items: true } });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Videos
app.get('/api/videos', async (req, res) => {
  try {
    const videos = await prisma.artworkVideo.findMany();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

// Custom Artwork Requests
app.post('/api/custom-requests', async (req, res) => {
  try {
    const request = await prisma.customArtworkRequest.create({ data: req.body });
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit custom request' });
  }
});

app.get('/api/custom-requests', async (req, res) => {
  try {
    const requests = await prisma.customArtworkRequest.findMany();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch custom requests' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
