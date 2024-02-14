const users = require('../../data/users.json');
const SecurityAuthMiddleware = require('../middlewares/SecurityAuthMiddleware');

module.exports = {
    ping: (request, response) => {
        if (request.headers.hasOwnProperty("authorization") === false) {
            response.sendStatus(401);
        }

        SecurityAuthMiddleware.checkAuth(
            request.headers.authorization.replace("Bearer ", "")
        );

        const authenticatedUser = SecurityAuthMiddleware.getAuthenticatedUser(request.headers.authorization.replace("Bearer ", ""));

        const checkedUser = users.find((user) => {
            return authenticatedUser['email'] === user.email;
        })

        response.status(200).send(checkedUser);
    }
}