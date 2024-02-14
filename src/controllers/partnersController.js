const partners = require("../../data/partners.json");
const SecurityAuthMiddleware = require('../middlewares/SecurityAuthMiddleware');

module.exports = {
    getOnePartner: (request, response) => {
        console.log(request.headers);
        console.log(request.headers.hasOwnProperty("authorization"));

        if (false === request.headers.hasOwnProperty("authorization")) {
            response.status(401);
        }

        SecurityAuthMiddleware.checkAuth(
            request.headers.authorization.replace("Bearer ", "")
        );

        // Uniquement à but informatif pour l'exercice
        console.info("\x1b[35m", "Authorisation donnée", "\x1b[0m")

        if (request.params.hasOwnProperty('id')) {
            const partner = partners.find((partner) => {
                return parseInt(request.params.id) === partner.id
            })

            if (partner) {
                response.status(200).send(partner);
            } else {
                response.status(422);
            }
        } else {
            response.status(401)
        }
    }
}
