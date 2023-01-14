const express = require('express');
const app = express();
const port = 3000;

// Initialize port for node application to run

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
})