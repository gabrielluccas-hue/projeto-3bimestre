import express from "express";
import prisma from "../db.js";

const router = express.Router();

//CREATE: POST /produtos
router.post("/", async (req, res) => {
  try {
    const { name, description, price, category, inStock, quantity, storeId } = req.body;
    
    if (!name || !price || !category || !storeId) {
      return res.status(400).json({ error: "Nome, preço, categoria e storeId são obrigatórios" });
    }

    const novoProduto = await prisma.product.create({
      data: { 
        name, 
        description, 
        price: parseFloat(price), 
        category, 
        inStock: inStock !== undefined ? inStock : true,
        quantity: quantity || 0,
        storeId 
      },
      include: { store: true }
    });

    res.status(201).json(novoProduto);
  } catch (error) {
    if (error.code === "P2003") {
      return res.status(400).json({ error: "Loja não encontrada" });
    }
    console.error(error);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

//READ: GET /produtos
router.get("/", async (_req, res) => {
  try {
    const produtos = await prisma.product.findMany({
      orderBy: { id: "asc" },
      include: { 
        store: {
          include: {
            user: true
          }
        }
      }
    });
    res.json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar produtos" });
  }
});

//READ: GET /produtos/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { 
        store: {
          include: {
            user: true
          }
        }
      }
    });

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(produto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
});

//UPDATE: PUT /produtos/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, inStock, quantity } = req.body;

    const produtoAtualizado = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { 
        name, 
        description, 
        price: price ? parseFloat(price) : undefined, 
        category, 
        inStock,
        quantity
      },
      include: { store: true }
    });

    res.json(produtoAtualizado);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
});

//DELETE: DELETE /produtos/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
});

export default router;