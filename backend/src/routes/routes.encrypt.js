import express from 'express';
import { caesarHandler, atbashHandler, vigenereHandler, transpositionHandler } from '../controllers/controller.encrypt.js';
import { validateMessage, validateKey, validateTextKey, validateNumberKey, middleware404, errorHandler } from '../middlewares/middlewares.generals.js';
import { validateTranspositionKey } from '../middlewares/middlewares.encrypt.js';
const router = express.Router();

router.post('/caesar',
    validateMessage,
    validateKey,
    validateNumberKey,
    caesarHandler,
    middleware404,
    errorHandler
);

router.post('/atbash',
    validateMessage,
    atbashHandler,
    middleware404,
    errorHandler
);

router.post('/vigenere',
    validateMessage,
    validateKey,
    validateTextKey,
    vigenereHandler,
    middleware404,
    errorHandler
);

router.post('/transposition',
    validateMessage,
    validateKey,
    validateTranspositionKey,
    transpositionHandler,
    middleware404,
    errorHandler
);

export default router;