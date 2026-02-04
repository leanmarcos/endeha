export function turnToCesar(message, shift) {
    
    let new_text = ' ';

    for (let char of message) {
        const new_letter = String.fromCharCode(
            ((char.charCodeAt(0) - 97 + shift) % 26) + 97
        );
        new_text += new_letter;
    }

    return new_text;
}

export function turnToAtbash(message){
    let result = '';

    for (let char of message) {
        const new_letter = String.fromCharCode(
            (122 - char.charCodeAt(0)) % 26 + 97
        );
        result += new_letter;
    }

    return result;
}

export function turnToVigenere(message, key){
    let messageReplacedKey = '';

    for (let i = 0; i < message.length; i++) {
        messageReplacedKey += key[i % key.length];
    }

    let result = '';

    for (let i = 0; i < message.length; i++) {

        const newpos = ((message.charCodeAt(i) - 97) + (messageReplacedKey.charCodeAt(i) - 97)) % 26;

        result += String.fromCharCode(newpos + 97);
    }

    return result;
}

export function turnToTransposition(message, cleanPath){
    const columns = Array.from({ length: cleanPath.length }, () => [])
    
        for (let i = 0; i < message.length; i++) {
            const column = i % cleanPath.length;
            columns[column].push(message[i]);
        }
    
        for (let i = 0; i < columns.length; i++) {
            while (columns[i].length < cleanPath.length) {
                columns[i].push('x');
            }
        }
    
        let result = '';
    
        for (let i = 0; i < cleanPath.length; i++) {
            for (let j = 0; j < columns.length; j++) {
                result += columns[i][j]
            }
        }

        return result;
    
}