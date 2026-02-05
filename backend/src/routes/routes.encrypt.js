import express from 'express';
import { caesarHandler, atbashHandler, vigenereHandler, transpositionHandler } from '../controllers/controller.encrypt.js';
const router = express.Router();

router.post('/caesar', caesarHandler);
router.post('/atbash' , atbashHandler);
router.post('/vigenere' , vigenereHandler);
router.post('/transposition' , transpositionHandler);

export default router;