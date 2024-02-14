const users = require('../../data/users.json');
const SecurityAuthMiddleware = require('../middlewares/SecurityAuthMiddleware');

module.exports = {
    ping: (request, response) => {
        // Je souhaite une jolie erreur 401 aussi en cas de token incorrect mais je n'ai pas trouvé de bonne façon de l'écrire.
        if (request.headers.hasOwnProperty("authorization") === false) {
            response.sendStatus(401);
            // Si la condition est fausse, je veux qu'il s'arrête ici, mais je vois à travers les messages d'erreur qu'il continue... et next() ne semble avoir aucun effet ?
            return;
        }

        SecurityAuthMiddleware.checkAuth(
            request.headers.authorization.replace("Bearer ", "")
        );

        // Uniquement à but informatif pour l'exercice
        console.info("\x1b[35m", "Authorisation donnée", "\x1b[0m");

        const authenticatedUser = SecurityAuthMiddleware.getAuthenticatedUser(request.headers.authorization.replace("Bearer ", ""));

        const checkedUser = users.find((user) => {
            return authenticatedUser['email'] === user.email;
        })

        response.status(200).send({
            email: checkedUser.email,
            role: checkedUser.role
        });
    }
}