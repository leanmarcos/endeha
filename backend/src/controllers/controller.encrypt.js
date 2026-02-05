import express from 'express';
import { containsComma, containsRepeated, notSorted, startsWith1 } from '../middlewares/middlewares.encrypt.js';
import { turnToCaesar, turnToAtbash, turnToVigenere, turnToTransposition } from '../services/services.encrypt.js';
import { emptyInput, isWord, isNumber } from '../middlewares/middlewares.generals.js';
import { sendError } from '../utils/utils.error.js';
import { cleanText } from '../utils/utils.general.js';



export const caesarHandler = (req, res) => {
    const data = req.body;
    const original_message = data.message;
    const amount_pos = data.key;


    if (emptyInput(original_message))
        return sendError(res, 'EMPTY_FIELD', 'message');

    if (emptyInput(amount_pos)) {
        return sendError(res, 'EMPTY_FIELD', 'key');
    }


    if (!isWord(original_message)) {
        return sendError(res, 'ONLY_LETTERS', 'message');
    }

    const fullmessage = cleanText(original_message);

    const shift = parseInt(amount_pos, 10);

    if (!isNumber(shift)) {
        return sendError(res, 'ONLY_NUMBERS', 'key');
    }

    const result = turnToCaesar(fullmessage, shift);

    res.status(200).json({
        success: `${result}`
    })

    return;
}



export const atbashHandler = (req, res) => {
    const body = req.body;
    const message = body.message;

    if (emptyInput(message))
        return sendError(res, 'EMPTY_FIELD', 'message');

    if (!isWord(message))
        return sendError(res, 'ONLY_LETTERS', 'message');


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

    if (emptyInput(message))
        return sendError(res, 'EMPTY_FIELD', 'message');

    if (emptyInput(key))
        return sendError(res, 'EMPTY_FIELD', 'key');

    if (!isWord(message))
        return sendError(res, 'ONLY_LETTERS', 'message');

    if (!containsComma(key))
        return sendError(res, 'COMMA_REQUIRED', 'key');


    const fullmessage = cleanText(message);
    const fullkey = cleanText(key);

    const cleanPath = [];

    const splitKey = fullkey.split(',');


    for (const part of splitKey) {
        const trimmed = part.trim();

        if (trimmed === '')
            return sendError(res, 'EMPTY_SPACES', 'key')


        const num = parseInt(trimmed, 10);

        if (!isNumber(num))
            return sendError(res, 'ONLY_NUMBERS', 'key');


        cleanPath.push(num);
    }

    if (!startsWith1(cleanPath))
        return sendError(res, 'NOT_STARTING_1', 'key');

    if (containsRepeated(cleanPath))
        return sendError(res, 'REPEATED_VALUES', 'key');


    if (notSorted(cleanPath)) 
       return sendError(res, 'NOT_SORTED' , 'key');
    
    const result = turnToTransposition(fullmessage, cleanPath);

    res.status(200).json({
        success: `${result}`
    })
}
