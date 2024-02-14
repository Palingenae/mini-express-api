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

    checkAuth: (receivedToken) => {
        const authenticated = jwt.verify(receivedToken, apiKey);

        if (authenticated) {
            return true;
        } else {
            console.info("\x1b[36m", "Ici j'ai envie de créer un joli message d'erreur qui ne donne pas trop de détails, car si quelqu'un a un accès au serveur, c'est possible de faire du reverse engineering avec la stack-trace non ? Ou alors je vais trop loin ?", "\x1b[0m")
            return false;
        }
    },

    getAuthenticatedUser: (receivedToken) => {
        const authenticatedUser = jwt.decode(receivedToken, apiKey);

        return authenticatedUser;
    },
};