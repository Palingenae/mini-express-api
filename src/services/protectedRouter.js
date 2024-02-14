const JWTAuthMiddleware = require("../middlewares/JWTAuthMiddleware");

// Ces routes ne sont accessibles que si authentifié-e

app.get('/', (request, response) => {
    response.send('Hello there');
});

app.post("/ping", securityController.ping);

app.get('/partners/:id', partnersController.getOnePartner)