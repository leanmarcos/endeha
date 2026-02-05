
import { sendError } from "../utils/utils.error.js";
import { cleanText } from "../utils/utils.general.js";
import { isNumber } from "./middlewares.generals.js";
import { getCleanPath } from "../utils/utils.transposition.js";

export const validateTranspositionKey = (req, res, next) => {
    const { key } = req.body;

    if (!containsComma(key))
        return sendError(res, 'COMMA_REQUIRED', 'key')


    const fullkey = cleanText(key);

    const cleanPath = getCleanPath(fullkey);

    if (cleanPath === null)
        return sendError(res, 'ONLY_NUMBERS', 'key');

    if (!startsWith1(cleanPath))
        return sendError(res, 'NOT_STARTING_1', 'key');

    if (containsRepeated(cleanPath))
        return sendError(res, 'REPEATED_VALUES', 'key');


    if (notSorted(cleanPath))
        return sendError(res, 'NOT_SORTED', 'key');

    req.cleanPath = cleanPath;

    next();
}


export function containsComma(key) {
    return key.includes(',');
}

export function containsRepeated(key) {
    return new Set(key).size != key.length;
}

export function startsWith1(key) {
    return Math.min(...key) === 1;
}

export function notSorted(key) {
    return Math.max(...key) != key.length && key.length != Math.max(...key) - Math.min(...key) + 1;
}