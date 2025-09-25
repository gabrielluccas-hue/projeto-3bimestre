import express from "express";
import prisma from "../db.js";

const router = express.Router();

//CREATE: POST /usuarios
router.post("/", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Nome, email e senha são obrigatórios" });
    }

    const novoUsuario = await prisma.user.create({
      data: { name, email, password, phone },
      include: { store: true }
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "E-mail já cadastrado" });
    }
    console.error(error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

//READ: GET /usuarios
router.get("/", async (_req, res) => {
  try {
    const usuarios = await prisma.user.findMany({
      orderBy: { id: "asc" },
      include: { store: true }
    });
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar usuários" });
  }
});

//READ: GET /usuarios/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { 
        store: {
          include: {
            products: true
          }
        }
      }
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

//UPDATE: PUT /usuarios/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, phone } = req.body;

    const usuarioAtualizado = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email, password, phone },
      include: { store: true }
    });

    res.json(usuarioAtualizado);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    if (error.code === "P2002") {
      return res.status(409).json({ error: "E-mail já está em uso" });
    }
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

//DELETE: DELETE /usuarios/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
});

export default router;