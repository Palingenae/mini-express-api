const express = require('express');

const securityController = require('./src/controllers/securityController');

const app = express();
const port = process.env.port || 3000;

app.use(express.json());

app.get('/', (request, response) => {
    response.send('Hello there');
});

app.post("/login", securityController.logIn);

app.post("/ping", securityController.ping);

app.listen(port, () => {
    console.log(`L'application écoute sur le port ${port}`);
});
