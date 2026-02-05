import express from 'express';
import { caesarHandler } from '../controllers/controller.decrypt.js';

const router = express.Router();

router.post('/caesar' , caesarHandler);

export default router;