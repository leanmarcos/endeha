import express from 'express';
import {MD5handler, SHA256Handler} from '../controllers/controller.hash.js';

const router = express.Router();

router.post('/md5', MD5handler);

router.post('/sha256', SHA256Handler);

export default router;