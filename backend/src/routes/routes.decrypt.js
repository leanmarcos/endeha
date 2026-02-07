import express from 'express';
import { caesarHandler } from '../controllers/controller.decrypt.js';
import { validateMessage , validateKey, middleware404, errorHandler } from '../middlewares/middlewares.generals.js';

const router = express.Router();

router.post('/caesar' , 
    validateMessage, 
    validateKey, 
    caesarHandler,
    middleware404,
    errorHandler
);

export default router;