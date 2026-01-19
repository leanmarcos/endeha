import express from 'express';
import crypto from 'node:crypto';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true  
}));


app.post('/api/encrypt/cesar', function (req, res) {
    const data = req.body;
    const original_message = data.message;
    const amount_pos = data.key;


    if (typeof original_message === "undefined" || typeof amount_pos === "undefined") {
        return res.status(400).json({
            error: 'Faltan datos requeridos: message y amountpos son obligatorios',
            field: 'message'
        });
    }

    const fullmessage = original_message.trim().replace(/\s+/g, "").toLowerCase();

    if (checkOriginalMessage(fullmessage)) {
        res.status(400).json(
            { error: 'Please, only letters' }
        );
        return;
    }


    const shift = parseInt(amount_pos, 10);

    if (isNaN(shift)) {
        return res.status(400).json({
            error: 'amountpos debe ser un número válido'
        });
    }

    const result = turnToCesar(fullmessage, shift);

    res.status(200).json({
        success: `${result}`
    })


})


function checkOriginalMessage(originalMessage) {
    return !/^[a-z]+$/.test(originalMessage);
}

function turnToCesar(original_text, new_position) {
    let new_text = ' ';

    for (let char of original_text) {
        const new_letter = String.fromCharCode(
            ((char.charCodeAt(0) - 97 + new_position) % 26) + 97
        );
        new_text += new_letter;
    }

    return new_text;
}

app.post('/api/encrypt/atbash', function (req, res) {
    const body = req.body;
    const message = body.message;

    if (checkOriginalMessage(message)) {
        res.status(400).json({
            error: "Please insert only letters"
        })

        return;
    }

    const fullmessage = message.trim().replace(/\s+/g, "").toLowerCase();

    let result = '';

    for (let char of fullmessage) {
        const new_letter = String.fromCharCode(
            (122 - char.charCodeAt(0)) % 26 + 97
        );
        result += new_letter;
    }

    res.status(200).json({
        success: `${result}`
    })

    return;
})

app.post('/api/encrypt/vignere', function (req, res) {
    const body = req.body;
    const message = body.message;
    const key = body.key;

    if (checkOriginalMessage(message) || checkOriginalMessage(key)) {
        res.status(400).json({
            error: 'Please insert only letters'
        })

        return;
    }

    const fullmessage = cleanString(message);
    const fullkey = cleanString(key);

    let messageReplacedKey = '';

    for (let i = 0; i < fullmessage.length; i++) {
        messageReplacedKey += fullkey[i % fullkey.length];
    }

    let result = '';

    for (let i = 0; i < messageReplacedKey.length; i++) {

        const newpos = ((fullmessage.charCodeAt(i) - 97) + (messageReplacedKey.charCodeAt(i) - 97)) % 26;
        console.log(newpos);

        result += String.fromCharCode(newpos + 97);
    }

    res.status(200).json({
        success: result
    })

})

app.post('/api/encrypt/transposition', function (req, res) {
    const body = req.body;
    const message = body.message;
    const key = body.key;

    if (checkOriginalMessage(message)) {
        res.status(400).json({
            error: 'Please only letters on the message'
        })
        return;
    }

    if (typeof key !== 'string' || key.trim() === '' || !key.includes(',') || !/^\s*\d+\s*(,\s*\d+\s*)*$/.test(key)) {
        return res.status(400).json({ error: 'Please, insert only numbers separated by comma on keys path' });
    }

    const fullmessage = cleanString(message);
    const fullkey = cleanString(key);

    const cleanPath = [];

    const splitKey = fullkey.split(',');


    for (const part of splitKey) {
        const trimmed = part.trim();

        if (trimmed === '') {
            return res.status(400).json({ error: "Empty spaces on key path aren't allowed" });
        }

        const num = parseInt(trimmed, 10);

        if (isNaN(num)) {
            return res.status(400).json({
                error: `Please, insert only numbers separated by comma on keys path`
            });
        }

        cleanPath.push(num);
    }

    let min = Math.min(...cleanPath);
    let max = Math.max(...cleanPath);

    if (min != 1) {
        res.status(400).json({
            error: 'Every path must start with 1'
        })
        return;
    }

    const containsRepeated = new Set(cleanPath).size !== cleanPath.length;

    if (containsRepeated) {
        res.status(400).json({
            error: "Please, don't use repeated numbers on key path"
        })
        return;
    }

    if (max != cleanPath.length && cleanPath.length != max - min + 1) {
        res.status(400).json({
            error: 'Please put a key path starting with 1 and using its followed numbers'
        })
        return;
    }

    // IDEA: EN STATUS.JSON DEVOLVER EL CAMPO AFECTADO. QUEDA ERROR - CAMPO

    const columns = Array.from({ length: cleanPath.length }, () => []) // crea 4 arreglos vacios, con indice (0,1,2,3)

    for (let i = 0; i < fullmessage.length; i++) {
        const column = i % cleanPath.length;
        columns[column].push(fullmessage[i]);
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

    res.status(200).json({
        success: `${result}`
    })

})

function cleanString(message) {
    return message.trim().replace(/\s+/g, "").toLowerCase();
}

app.post('/api/decrypt/cesar', function (req, res) {
    const body = req.body;
    const encriptedMessage = body.message;
    const key = body.key;

    if (checkOriginalMessage(encriptedMessage)) {
        res.status(400).json({
            error: 'Please insert only letters'
        })
        return;
    }


    console.log(encriptedMessage);

    const shift = parseInt(key, 10);

    if (isNaN(shift)) {
        return res.status(400).json({
            error: 'amountpos debe ser un número válido'
        });
    }

    const fullEncryptedMessage = cleanString(encriptedMessage);

    let result = '';

    for (let char of fullEncryptedMessage) {
        const new_letter = String.fromCharCode(
            ((char.charCodeAt(0) - 97 - shift) % 26) + 97
        );
        result += new_letter;
    }

    res.status(200).json({
        success: `${result}`
    })

})

app.post('/api/hash/md5' , function(req , res){
    const body = req.body;
    const originalMessage = body.message;

    if(checkOriginalMessage(originalMessage)){
        res.status(400).json({
            error: 'Please insert only letters'
        })
        return;
    }
    
    const fullOriginalMessage = cleanString(originalMessage)

    const hash = crypto.createHash('md5').update(fullOriginalMessage).digest('hex');

    res.status(201).json({
        success: `${hash}`
    })
    

})

app.post('/api/hash/sha256' , function(req , res){
    const body = req.body;
    const originalMessage = body.message;

    if(checkOriginalMessage(originalMessage)){
        res.status(400).json({
            error: 'Please insert only letters'
        })
        return;
    }
    
    const fullOriginalMessage = cleanString(originalMessage)

    const hash = crypto.createHash('sha256').update(fullOriginalMessage).digest('hex');

    res.status(201).json({
        success: `${hash}`
    })
    

})

