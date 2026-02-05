import { isNumber } from "../middlewares/middlewares.generals.js";

export const getCleanPath = (key) => {
    const cleanPath = [];

    const splitKey = key.split(',');


    for (const part of splitKey) {
        const trimmed = part.trim();

        const num = parseInt(trimmed, 10);

        if (!isNumber(num))
            return null;


        cleanPath.push(num);
    }

    return cleanPath;
}