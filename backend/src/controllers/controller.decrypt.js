import {cleanText} from '../utils/utils.general.js';
import {caesarDecrypt} from '../services/services.decrypt.js';

export const caesarHandler = (req, res) => {
    const body = req.body;
    const encriptedMessage = body.message;
    const key = body.key;

  
    const shift = parseInt(key % 26, 10);

    const fullEncryptedMessage = cleanText(encriptedMessage);

    const result = caesarDecrypt(fullEncryptedMessage, shift);

    res.status(200).json({
        success: `${result}`
    })
}