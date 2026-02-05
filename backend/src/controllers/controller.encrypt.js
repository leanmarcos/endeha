import express from 'express';
import { containsComma, containsRepeated, notSorted, startsWith1 } from '../middlewares/middlewares.encrypt.js';
import { turnToCaesar, turnToAtbash, turnToVigenere, turnToTransposition } from '../services/services.encrypt.js';
import { emptyInput, isWord, isNumber } from '../middlewares/middlewares.generals.js';
import { sendError } from '../utils/utils.error.js';
import { cleanText } from '../utils/utils.general.js';
import { getCleanPath } from '../utils/utils.transposition.js';



export const caesarHandler = (req, res) => {
    const data = req.body;
    const original_message = data.message;
    const key = data.key;

    const fullmessage = cleanText(original_message);

    const shift = parseInt(key, 10);

    const result = turnToCaesar(fullmessage, shift);

    res.status(200).json({
        success: `${result}`
    })

    return;
}

export const atbashHandler = (req, res) => {
    const body = req.body;
    const message = body.message;

    const fullmessage = cleanText(message);

    const result = turnToAtbash(fullmessage);

    res.status(200).json({
        success: `${result}`
    })

    return;
}


export const vigenereHandler = (req, res) => {
    const body = req.body;
    const message = body.message;
    const key = body.key;

    if (!isWord(message))
        return sendError(res, 'ONLY_LETTERS', 'message');


    if (!isWord(key))
        return sendError(res, 'ONLY_LETTERS', 'key');

    const fullmessage = cleanText(message);
    const fullkey = cleanText(key);

    const result = turnToVigenere(message, key);


    return res.status(200).json({
        success: result
    })
}


export const transpositionHandler = (req, res) => {
    const body = req.body;
    const message = body.message;
    const key = body.key;
    const cleanPath = req.cleanPath;

    const fullmessage = cleanText(message);
    const fullkey = cleanText(key);

    const result = turnToTransposition(fullmessage, cleanPath);

    res.status(200).json({
        success: `${result}`
    })
}
