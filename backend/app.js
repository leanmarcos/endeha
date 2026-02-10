import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import hashRoutes from './src/routes/routes.hash.js';
import encryptRoutes from './src/routes/routes.encrypt.js';
import decryptRoutes from './src/routes/routes.decrypt.js';

const app = express();

app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:5173',  // Para desarrollo local (Vite)
        'http://localhost:3000',  // Para desarrollo local (React)
        'https://tu-frontend-xyz789.onrender.com'  // Tu frontend en producción
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use('/api/hash', hashRoutes);
app.use('/api/encrypt', encryptRoutes);
app.use('/api/decrypt', decryptRoutes);

export default app;

