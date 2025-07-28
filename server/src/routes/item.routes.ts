import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

router.post('/', async (req, res) => {
  try {
    const item = await prisma.item.create({ data: req.body });
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ message: 'Error creating item' });
  }
});

router.get('/:id', async (req, res) => {
  const item = await prisma.item.findUnique({ where: { id: Number(req.params.id) } });
  if (!item) return res.status(404).json({});
  res.json(item);
});

router.put('/:id', async (req, res) => {
  try {
    const item = await prisma.item.update({ where: { id: Number(req.params.id) }, data: req.body });
    res.json(item);
  } catch (e) {
    res.status(400).json({ message: 'Error updating item' });
  }
});

router.delete('/:id', async (req, res) => {
  await prisma.item.delete({ where: { id: Number(req.params.id) } });
  res.status(204).end();
});

export default router;
