const partners = require("../../data/partners.json");

module.exports = {
    getOnePartner: (request, response) => {

        // vérifier les permissions avant toute chose avec JWT

        if (request.params.hasOwnProperty('id')) {
            const partner = partners.find((partner) => {
                console.log(partner.id)
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