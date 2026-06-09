import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

dotenv.config();



const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174',
    'http://localhost:3000',
    'http://localhost:8080',
    'http://localhost:8081',
    'http://localhost:8082',
    'http://localhost:8083',
    'http://localhost:8084',
    'http://localhost:8085',
    'https://admin.kalasamskruthiarts.in',
    'https://kalasamskruthiarts.in',
    'https://www.kalasamskruthiarts.in'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

// --- ROUTES ---

// Auth
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await prisma.user.create({ data: { name, email, password } });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Email already exists or invalid data' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/auth/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

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


app.post('/api/products', async (req, res) => {
  try {
    const body = req.body;
    const product = await prisma.product.create({ data: body });
    res.status(201).json(product);
  } catch (error) {
    console.error("Product creation error:", error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const body = req.body;
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: body
    });
    res.json(product);
  } catch (error) {
    console.error("Product update error:", error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});


// Reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const { text, ...data } = req.body;
    const review = await prisma.review.create({ 
      data: {
        ...data,
        comment: data.comment || text || ""
      } 
    });
    res.status(201).json(review);
  } catch (error) {
    console.error("Review creation error:", error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

app.put('/api/reviews/:id', async (req, res) => {
  try {
    const { text, id, ...data } = req.body;
    const review = await prisma.review.update({
      where: { id: req.params.id },
      data: data
    });
    res.json(review);
  } catch (error) {
    console.error("Review update error:", error);
    res.status(500).json({ error: 'Failed to update review' });
  }
});

app.delete('/api/reviews/:id', async (req, res) => {
  try {
    await prisma.review.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
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


app.put('/api/gallery/:id', async (req, res) => {
  try {
    const { id, ...data } = req.body;
    const body = data;
    const img = await prisma.galleryImage.update({
      where: { id: req.params.id },
      data: body
    });
    res.json(img);
  } catch (error) {
    console.error("Gallery update error:", error);
    res.status(500).json({ error: 'Failed to update gallery image' });
  }
});

app.post('/api/gallery', async (req, res) => {
  try {
    const body = req.body;
    const img = await prisma.galleryImage.create({ data: body });
    res.status(201).json(img);
  } catch (error) {
    console.error("Gallery creation error:", error);
    res.status(500).json({ error: 'Failed to create gallery image' });
  }
});

app.delete('/api/gallery/:id', async (req, res) => {
  try {
    await prisma.galleryImage.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete gallery image' });
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


app.put('/api/inquiries/:id/status', async (req, res) => {
  try {
    const inquiry = await prisma.inquiry.update({
      where: { id: req.params.id },
      data: { status: req.body.status }
    });
    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update inquiry status' });
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
    console.error("Order creation error:", error);
    res.status(500).json({ error: 'Failed to create order', details: error instanceof Error ? error.message : String(error) });
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

app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: true }
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});


app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status: req.body.status }
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
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


app.post('/api/videos', async (req, res) => {
  try {
    const body = req.body;
    const video = await prisma.artworkVideo.create({ data: body });
    res.status(201).json(video);
  } catch (error) {
    console.error("Video creation error:", error);
    res.status(500).json({ error: 'Failed to create video' });
  }
});

app.put('/api/videos/:id', async (req, res) => {
  try {
    const body = req.body;
    const video = await prisma.artworkVideo.update({
      where: { id: req.params.id },
      data: body
    });
    res.json(video);
  } catch (error) {
    console.error("Video update error:", error);
    res.status(500).json({ error: 'Failed to update video' });
  }
});

app.delete('/api/videos/:id', async (req, res) => {
  try {
    await prisma.artworkVideo.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete video' });
  }
});

// Custom Artwork Requests
app.post('/api/custom-requests', async (req, res) => {
  try {
    const body = req.body;
    const request = await prisma.customArtworkRequest.create({ data: body });
    res.status(201).json(request);
  } catch (error) {
    console.error("Custom request creation error:", error);
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

app.delete('/api/custom-requests/:id', async (req, res) => {
  try {
    await prisma.customArtworkRequest.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete custom request' });
  }
});

// Users (Admin only)
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.adminUser.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const user = await prisma.adminUser.create({
      data: {
        name,
        email,
        role,
        password,
        active: true
      }
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Admin user creation error:", error);
    res.status(500).json({ error: 'Failed to add admin user' });
  }
});

app.put('/api/users/:id/role', async (req, res) => {
  try {
    const { role, active } = req.body;
    const user = await prisma.adminUser.update({
      where: { id: req.params.id },
      data: {
        role: role !== undefined ? role : undefined,
        active: active !== undefined ? active : undefined
      }
    });
    res.json(user);
  } catch (error) {
    console.error("Admin user update error:", error);
    res.status(500).json({ error: 'Failed to update user role/status' });
  }
});

app.put('/api/custom-requests/:id/status', async (req, res) => {
  try {
    const request = await prisma.customArtworkRequest.update({
      where: { id: req.params.id },
      data: { status: req.body.status }
    });
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update custom request status' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    await prisma.adminUser.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Site Content
app.get('/api/content', async (req, res) => {
  try {
    const content = await prisma.siteContent.findUnique({ where: { id: 'singleton' } });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

app.post('/api/content', async (req, res) => {
  try {
    const content = await prisma.siteContent.upsert({
      where: { id: 'singleton' },
      update: req.body,
      create: { id: 'singleton', ...req.body }
    });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save content' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
