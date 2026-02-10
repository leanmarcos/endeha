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
        'http://localhost:5173',  
        'http://localhost:3000',  
        'https://endehafront.onrender.com'  
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use('/api/hash', hashRoutes);
app.use('/api/encrypt', encryptRoutes);
app.use('/api/decrypt', decryptRoutes);

export default app;

