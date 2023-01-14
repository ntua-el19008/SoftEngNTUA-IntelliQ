const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// Middlewares
app.use(bodyParser.json());

// Initialize port for node application to run

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// Get request to root
app.get('/', (req, res) => {
    res.send('Hello World!');
})

// Post request
app.post('/checkParser', (req, res) => {
    console.log("Using body-parser: ", req.body.value)
    res.send({body: req.body})
})