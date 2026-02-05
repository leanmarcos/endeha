import express from 'express';
import { caesarHandler, atbashHandler, vigenereHandler, transpositionHandler } from '../controllers/controller.encrypt.js';
import { validateMessage, validateKey, validateTextKey, validateNumberKey } from '../middlewares/middlewares.generals.js';
import { validateTranspositionKey } from '../middlewares/middlewares.encrypt.js';
const router = express.Router();

router.post('/caesar',
    validateMessage,
    validateKey,
    validateNumberKey,
    caesarHandler
);

router.post('/atbash',
    validateMessage,
    atbashHandler
);

router.post('/vigenere',
    validateMessage,
    validateKey,
    validateTextKey,
    vigenereHandler
);

router.post('/transposition',
    validateMessage,
    validateKey,
    validateTranspositionKey,
    transpositionHandler
);

export default router;