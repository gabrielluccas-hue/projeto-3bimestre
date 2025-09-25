import express from "express";
import prisma from "../db.js";

const router = express.Router();

//CREATE: POST /lojas
router.post("/", async (req, res) => {
  try {
    const { name, description, address, phone, email, userId } = req.body;
    
    if (!name || !address || !phone || !email || !userId) {
      return res.status(400).json({ error: "Nome, endereço, telefone, email e userId são obrigatórios" });
    }

    const novaLoja = await prisma.store.create({
      data: { name, description, address, phone, email, userId },
      include: { 
        user: true,
        products: true
      }
    });

    res.status(201).json(novaLoja);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "E-mail da loja já cadastrado ou usuário já possui uma loja" });
    }
    if (error.code === "P2003") {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }
    console.error(error);
    res.status(500).json({ error: "Erro ao criar loja" });
  }
});

//READ: GET /lojas
router.get("/", async (_req, res) => {
  try {
    const lojas = await prisma.store.findMany({
      orderBy: { id: "asc" },
      include: { 
        user: true,
        products: true
      }
    });
    res.json(lojas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar lojas" });
  }
});

//READ: GET /lojas/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const loja = await prisma.store.findUnique({
      where: { id: parseInt(id) },
      include: { 
        user: true,
        products: true
      }
    });

    if (!loja) {
      return res.status(404).json({ error: "Loja não encontrada" });
    }

    res.json(loja);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar loja" });
  }
});

//UPDATE: PUT /lojas/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, address, phone, email } = req.body;

    const lojaAtualizada = await prisma.store.update({
      where: { id: parseInt(id) },
      data: { name, description, address, phone, email },
      include: { 
        user: true,
        products: true
      }
    });

    res.json(lojaAtualizada);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Loja não encontrada" });
    }
    if (error.code === "P2002") {
      return res.status(409).json({ error: "E-mail da loja já está em uso" });
    }
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar loja" });
  }
});

//DELETE: DELETE /lojas/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.store.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Loja não encontrada" });
    }
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar loja" });
  }
});

export default router;