import express from 'express';
import { cesarHandler, atbashHandler, vigenereHandler, transpositionHandler } from '../controllers/controller.encrypt.js';
const router = express.Router();

router.post('/cesar', cesarHandler);
router.post('/atbash' , atbashHandler);
router.post('/vignere' , vigenereHandler);
router.post('/transposition' , transpositionHandler);

export default router;