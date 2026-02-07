import express from 'express';
import {MD5handler, SHA256Handler} from '../controllers/controller.hash.js';
import {validateMessage, middleware404, errorHandler, validateMessage} from '../middlewares/middlewares.generals.js'

const router = express.Router();

router.post('/md5',
    validateMessage,
    MD5handler,
    middleware404,
    errorHandler

);

router.post('/sha256', 
    validateMessage,
    SHA256Handler,
    middleware404,
    errorHandler
);

export default router;