
export function caesarDecrypt(message, shift) {
    const base = 97;

    let result = '';

    for (let char of message) {
        const normalized =
            ((char.charCodeAt(0) - base - shift) % 26 + 26) % 26;

        result += String.fromCharCode(normalized + base);
    }

    return result;
}