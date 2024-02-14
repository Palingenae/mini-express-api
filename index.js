const express = require('express');

const SecurityAuthMiddleware = require('./src/middlewares/SecurityAuthMiddleware');
const partnersController = require('./src/controllers/partnersController');
const ping = require('./src/utilities/ping');

const app = express();
const port = process.env.port || 3000;

app.use(express.json());

app.post("/login", SecurityAuthMiddleware.logIn);

app.get('/', (request, response) => {
    response.send('Hello there');
});

app.get("/ping", ping.ping);

app.get('/partners/:id', partnersController.getOnePartner)

app.listen(port, () => {
    console.log(`L'application écoute sur le port ${port}`);
});
