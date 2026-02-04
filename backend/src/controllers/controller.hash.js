import { hashMD5, hashSHA256 } from '../services/services.hash.js';
import { emptyInput, isWord, isNumber } from '../middlewares/middlewares.generals.js';
import { cleanText } from '../utils/utils.general.js';


export const MD5handler = (req, res) => {
    const body = req.body;
    const originalMessage = body.message;

    if(emptyInput(originalMessage)){
        res.status(400).json({
                error: 'This field is obligatory' , field: 'message'
        })

        return;
    }

    if (!isWord(originalMessage)) {
        res.status(400).json({
            error: 'Please insert only letters', field: 'message'
        })

        return;
    }

    const fullOriginalMessage = cleanText(originalMessage)

    const result = hashMD5(fullOriginalMessage);

    res.status(201).json({
        success: `${result}`
    })
}

export const SHA256Handler = (req, res) => {
    const body = req.body;
    const originalMessage = body.message;

    if(emptyInput(originalMessage)){
        res.status(400).json({
                error: 'This field is obligatory' , field: 'message'
        })

        return;
    }

    if (!isWord(originalMessage)) {
        res.status(400).json({
            error: 'Please insert only letters', field: 'message'
        })
        return;
    }

    const fullOriginalMessage = cleanText(originalMessage)

    const result = hashSHA256(originalMessage);

    res.status(201).json({
        success: `${result}`
    })
}