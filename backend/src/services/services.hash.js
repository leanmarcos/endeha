import crypto from 'node:crypto';

export function hashMD5(message){
    return crypto.createHash('md5').update(message).digest('hex');
}

export function hashSHA256(message){
    return crypto.createHash('sha256').update(message).digest('hex');
}