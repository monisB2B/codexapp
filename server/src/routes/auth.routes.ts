import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({ data: { username, email, password: hash } });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
    res.status(201).json({ user: { id: user.id, email: user.email, username: user.username }, token });
  } catch (e) {
    res.status(400).json({ message: 'Error creating user' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
  res.json({ token });
});

export default router;
