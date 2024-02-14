const users = require('../../data/users.json');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

const apiKey = process.env.APP_SECRET;

module.exports = {
    logIn: (request, response) => {
        const payload = request.body;

        if (payload.hasOwnProperty('email') &&
            payload.hasOwnProperty('password'))
        {

        const user = users.find((user) => {
            return user.email === payload.email
        })

            if (user) {
                if (user.password === payload.password) {
                    let token = jwt.sign({ email: user.email, role: user.role }, apiKey);
                    
                    response.send(token); 
                } else {
                    response.sendStatus(401);
                }
            } else {
                response.sendStatus(401);
            }
        } else {
            response.sendStatus(422)
        }
    },

    ping: (request, response) => {
        /* Il y a certainement des choses à faire en plus ici, mais je ne sais pas ce qui pourrait être pertinent. */

        const receivedToken = request.headers.authorization.replace("Bearer ", "");

        if (!jwt.decode(receivedToken)) {
            response.sendStatus(401);
            console.info("\x1b[36m", "Ici j'ai envie de créer un joli message d'erreur qui ne donne pas trop de détails, car si quelqu'un a un accès au serveur, c'est possible de faire du reverse engineering avec la stack-trace non ? Ou alors je vais trop loin ?", "\x1b[0m")
        }

        let payload = jwt.verify(receivedToken, apiKey);

        const checkedUser = users.find((user) => {
            return payload["email"] === user.email;
        })

        if (checkedUser) {
            response.status(200).send(payload);
        } else {
            response.sendStatus(401);
        }
    }
};