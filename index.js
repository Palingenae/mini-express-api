const express = require('express');

const securityController = require('./src/controllers/securityController');
const partnersController = require('./src/controllers/partnersController');

const app = express();
const port = process.env.port || 3000;

app.use(express.json());

// Seulement si authentifié
app.get('/', (request, response) => {
    response.send('Hello there');
});

app.post("/login", securityController.logIn);

// Seulement si authentifié
app.post("/ping", securityController.ping);

// Seulement si authentifié
app.get('/partners/:id', partnersController.getOnePartner)

app.listen(port, () => {
    console.log(`L'application écoute sur le port ${port}`);
});
