import {emptyInput, isWord, isNumber} from '../middlewares/middlewares.generals.js';
import {} from '../middlewares/middlewares.decrypt.js';
import {cleanText} from '../utils/utils.general.js';
import {cesarDecrypt} from '../services/services.decrypt.js';

export const cesarHandler = (req, res) => {
     const body = req.body;
    const encriptedMessage = body.message;
    const key = body.key;

    if(emptyInput(encriptedMessage)){
        res.status(400).json({
            error: 'Obligatory field empty' , field: 'message'
        })
        return;
    }

    if(emptyInput(key)){
        res.status(400).json({
            error: 'Obligatory field empty' , field: 'key'
        })
        return;
    }

    if (!isWord(encriptedMessage)) {
        res.status(400).json({
            error: 'Please insert only letters', field: 'message'
        })
        return;
    }

    const shift = parseInt(key % 26, 10);

    if (!isNumber(shift)) {
        res.status(400).json({
            error: 'key must be a number', field: 'key'
        });
        return;
    }

    const fullEncryptedMessage = cleanText(encriptedMessage);

    const result = cesarDecrypt(fullEncryptedMessage, shift);


    res.status(200).json({
        success: `${result}`
    })
}