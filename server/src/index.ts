import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import itemRoutes from './routes/item.routes';
import locationRoutes from './routes/location.routes';
import { verifyToken } from './middleware';

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/items', verifyToken, itemRoutes);
app.use('/api/locations', verifyToken, locationRoutes);

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on ${port}`));
}

export default app;
