
// vigenere
export function containsComma(key) {
    return key.includes(',');
}

export function containsRepeated(key) {
    return new Set(key).size !== key.length
}

export function startsWith1(key) {
    return Math.min(...key) === 1;
}

export function notSorted(key) {
    return Math.max(...key) != key.length && key.length != Math.max(...key) - Math.min(...key) + 1;
}