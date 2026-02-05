import express from 'express';
import { caesarHandler } from '../controllers/controller.decrypt.js';
import { validateMessage , validateKey } from '../middlewares/middlewares.generals.js';

const router = express.Router();

router.post('/caesar' , 
    validateMessage, 
    validateKey, 
    caesarHandler
);

export default router;