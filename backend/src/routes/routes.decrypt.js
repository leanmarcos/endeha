import express from 'express';
import { cesarHandler } from '../controllers/controller.decrypt.js';

const router = express.Router();

router.post('/cesar' , cesarHandler);

export default router;