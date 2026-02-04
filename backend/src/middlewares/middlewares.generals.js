
export function emptyInput(text){
    return text.length === 0;
}

export function isWord(inputText){
     return typeof inputText === 'string' && /^[a-z]+$/.test(inputText);
}

export function isNumber(possibleNumber){
    return !isNaN(possibleNumber);
}