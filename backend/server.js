import app from './app.js';

const PORT = process.env.DEFAULT_PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`listening on port ${PORT}`);
    console.log('variable .env: ' + process.env.DEFAULT_PORT);
})
