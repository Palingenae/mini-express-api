const users = require('../../data/users.json');
const jwt = require('jsonwebtoken');

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
                    let token = jwt.sign({ email: user.email, role: user.role }, process.env.APP_SECRET);
                    
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
    }
};