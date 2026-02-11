
import { sendError } from "../utils/utils.error.js";

export function emptyInput(text) {
    return text.length === 0;
}

export function isWord(inputText) {
    return typeof inputText === 'string' && /^[a-zA-Z ]+$/.test(inputText);
}

export function isNumber(possibleNumber) {
    return !isNaN(possibleNumber);
}

export const validateMessage = (req, res, next) => {
    const { message } = req.body;

    if (!message || message.length === 0) {
        return sendError(res, 'EMPTY_FIELD', 'message');
    }

    if (!isWord(message)) {
        return sendError(res, 'ONLY_LETTERS', 'message');
    }

    next();
};

export const validateKey = (req, res, next) => {
    const { key } = req.body;

    if (!key || key.length === 0) {
        return sendError(res, 'EMPTY_FIELD', 'key');
    }

    next();
}

export const validateNumberKey = (req, res, next) => {
    const { key } = req.body;

    if (!isNumber(key))
        return sendError(res, 'ONLY_NUMBERS', 'key');

    next();
}

export const validateTextKey = (req, res, next) => {
    const { key } = req.body;

    if (!isWord(key))
        return sendError(res, 'ONLY_LETTERS', 'key')

    next();
}

export const middleware404 = (req, res) => {
    return sendError(res, 'NOT_FOUND', null);
}

export const errorHandler = (err, req, res, next) => {
    return sendError(res, 'UNEXPECTED_ERROR' , null);
}