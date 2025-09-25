import express from "express";
import dotenv from "dotenv";
import prisma from "./db.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (_req, res) => res.json({ 
  ok: true, 
  service: "API Marketplace Enxuto - AV2",
  message: "API REST com Node.js, Prisma e MySQL"
}));

app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { store: true }
    });
    res.json(users);
  } catch (e) { 
    res.status(400).json({ error: e.message });
  }
});

app.post('/users', async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await prisma.user.create({
      data: { email, name }
    });
    res.status(201).json(user);
  } catch (e) { 
    res.status(400).json({ error: e.message });
  }
});

app.post('/stores', async (req, res) => {
  try {
    const { name, userId } = req.body;
    const store = await prisma.store.create({
      data: { name, userId: Number(userId) }
    });
    res.status(201).json(store);
  } catch (e) { 
    res.status(400).json({ error: e.message });
  }
});

app.get('/stores/:id', async (req, res) => {
  try {
    const store = await prisma.store.findUnique({
      where: { id: Number(req.params.id) },
      include: { user: true, products: true }
    });
    if (!store) return res.status(404).json({ error: 'Loja não encontrada' });
    res.json(store);
  } catch (e) { 
    res.status(400).json({ error: e.message });
  }
});

app.get('/stores', async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      include: { user: true, products: true }
    });
    res.json(stores);
  } catch (e) { 
    res.status(400).json({ error: e.message });
  }
});

app.put('/stores/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const store = await prisma.store.update({
      where: { id: Number(req.params.id) },
      data: { name },
      include: { user: true, products: true }
    });
    res.json(store);
  } catch (e) { 
    res.status(400).json({ error: e.message });
  }
});

app.delete('/stores/:id', async (req, res) => {
  try {
    await prisma.store.delete({
      where: { id: Number(req.params.id) }
    });
    res.status(204).send();
  } catch (e) { 
    res.status(400).json({ error: e.message });
  }
});

app.post('/products', async (req, res) => {
  try {
    const { name, price, storeId } = req.body;
    const product = await prisma.product.create({
      data: { name, price: Number(price), storeId: Number(storeId) }
    });
    res.status(201).json(product);
  } catch (e) { 
    res.status(400).json({ error: e.message });
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { store: { include: { user: true } } }
    });
    res.json(products);
  } catch (e) { 
    res.status(400).json({ error: e.message });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
      include: { store: { include: { user: true } } }
    });
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(product);
  } catch (e) { 
    res.status(400).json({ error: e.message });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const { name, price } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (price) updateData.price = Number(price);
    
    const product = await prisma.product.update({
      where: { id: Number(req.params.id) },
      data: updateData,
      include: { store: { include: { user: true } } }
    });
    res.json(product);
  } catch (e) { 
    res.status(400).json({ error: e.message });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: Number(req.params.id) }
    });
    res.status(204).send();
  } catch (e) { 
    res.status(400).json({ error: e.message });
  }
});

app.get("/status", (req, res) => {
  res.json({ 
    message: "API Online",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📋 API Marketplace Enxuto - AV2`);
  console.log(`🔗 Endpoints principais:`);
  console.log(`   - POST /users (criar usuário)`);
  console.log(`   - POST /stores (criar loja)`);
  console.log(`   - GET /stores/:id (loja + dono + produtos)`);
  console.log(`   - POST /products (produtos + loja + dono)`);
});
