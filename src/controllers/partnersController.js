const partners = require("../../data/partners.json");
const SecurityAuthMiddleware = require('../middlewares/SecurityAuthMiddleware');

module.exports = {
    getOnePartner: (request, response) => {
        // Je souhaite une jolie erreur 401 aussi en cas de token incorrect mais je n'ai pas trouvé de bonne façon de l'écrire.
        if (request.headers.hasOwnProperty("authorization") === false) {
            response.sendStatus(401);
            // Si la condition est fausse, je veux qu'il s'arrête ici, mais je vois à travers les messages d'erreur qu'il continue... et next() ne semble avoir aucun effet ?
            return;
        }
        // doit s'arrêter ici
        
        const jwtToken = request.headers.authorization.replace("Bearer ", "");
        
        if (jwtToken) {
            SecurityAuthMiddleware.checkAuth(jwtToken
            );
        }

        // Uniquement à but informatif pour l'exercice
        console.info("\x1b[35m", "Authorisation donnée", "\x1b[0m");

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
