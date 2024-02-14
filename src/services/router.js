// const { response } = require("express");
// const { request } = require("express");

// const express = require('express');
// const app = express();

// const SecurityAuthMiddleware = require("../middlewares/SecurityAuthMiddleware");
// const partnersController = require('../controllers/partnersController');
// const ping = require('../utilities/ping');

// // Ces routes ne sont accessibles que si authentifié-e.
// // Je pense qu'il y a probablementune manière de procéder, mais celle-ci fonctionne.

// // if (
// //     request.headers.hasOwnProperty("authorization") === true) {
// app.get('/', (request, response) => {
//     response.send('Hello there');
// });

// app.post("/ping", ping.ping);

// app.get('/partners/:id', partnersController.getOnePartner)
// // } else {
// //     response.sendStatus(401);
// // }


// // &&
//     // SecurityAuthMiddleware.checkAuth(
//     // request.headers.authorization.replace("Bearer ", "")) === true