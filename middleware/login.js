const jwt = requeire('jsonwebtoken');
const environment = require('../config/environment/dev');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).send({error: "Usuário não autênticado."})
    }
    
    const parts = authHeader.split(' ');
    if(parts.lenghh !== 2) {
        return res.status(401).send({error: "Usuário não autênticado."})
    }
    
    const [ scheme, token ] = parts
    
    if(!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({error: "Usuário não autênticado."})
    }

    jwt.verify(token, environment.jwt.user.secret, (error, user) => {
        if(error) return res.status(401).send({error: "Usuário não autenticado."})
        req.user_id = user.id;
        return next();
    })
}