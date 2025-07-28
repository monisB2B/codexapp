import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const locations = await prisma.location.findMany();
  res.json(locations);
});

router.post('/', async (req, res) => {
  try {
    const location = await prisma.location.create({ data: req.body });
    res.status(201).json(location);
  } catch (e) {
    res.status(400).json({ message: 'Error creating location' });
  }
});

router.get('/:id', async (req, res) => {
  const loc = await prisma.location.findUnique({ where: { id: Number(req.params.id) } });
  if (!loc) return res.status(404).json({});
  res.json(loc);
});

router.put('/:id', async (req, res) => {
  try {
    const loc = await prisma.location.update({ where: { id: Number(req.params.id) }, data: req.body });
    res.json(loc);
  } catch (e) {
    res.status(400).json({ message: 'Error updating location' });
  }
});

router.delete('/:id', async (req, res) => {
  await prisma.location.delete({ where: { id: Number(req.params.id) } });
  res.status(204).end();
});

export default router;
