import { hashMD5, hashSHA256 } from '../services/services.hash.js';
import { emptyInput, isWord, isNumber } from '../middlewares/middlewares.generals.js';
import { cleanText } from '../utils/utils.general.js';
import {sendError} from '../utils/utils.error.js';

export const MD5handler = (req, res) => {
    const body = req.body;
    const originalMessage = body.message;

    if(emptyInput(originalMessage))
        return sendError(res, 'EMPTY_FIELD' , 'message');

    if (!isWord(originalMessage))
        return sendError(res, 'ONLY_LETTERS' , 'message');

    const fullOriginalMessage = cleanText(originalMessage)

    const result = hashMD5(fullOriginalMessage);

    res.status(201).json({
        success: `${result}`
    })
}

export const SHA256Handler = (req, res) => {
    const body = req.body;
    const originalMessage = body.message;

    if(emptyInput(originalMessage))
        return sendError(res, 'EMPTY_INPUT', 'message');
    

    if (!isWord(originalMessage))
        return sendError(res, 'ONLY_LETTERS', 'message');

    const fullOriginalMessage = cleanText(originalMessage)

    const result = hashSHA256(fullOriginalMessage);

    res.status(201).json({
        success: `${result}`
    })
}