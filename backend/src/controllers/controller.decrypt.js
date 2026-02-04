import {emptyInput, isWord, isNumber} from '../middlewares/middlewares.generals.js';
import {} from '../middlewares/middlewares.decrypt.js';
import {cleanText} from '../utils/utils.general.js';
import {cesarDecrypt} from '../services/services.decrypt.js';
import { sendError } from '../utils/utils.error.js';

export const cesarHandler = (req, res) => {
     const body = req.body;
    const encriptedMessage = body.message;
    const key = body.key;

    if(emptyInput(encriptedMessage))
        return sendError(res, 'EMPTY_FIELD' , 'message');    
    

    if(emptyInput(key))
        return sendError(res, 'EMPTY_FIELD' , 'key');
    

    if (!isWord(encriptedMessage))
        return sendError(res, 'ONLY_LETTERS' , 'message');

    const shift = parseInt(key % 26, 10);

    if (!isNumber(shift)) 
        return sendError(res, 'ONLY_NUMBERS', 'key');

    const fullEncryptedMessage = cleanText(encriptedMessage);

    const result = cesarDecrypt(fullEncryptedMessage, shift);


    res.status(200).json({
        success: `${result}`
    })
}