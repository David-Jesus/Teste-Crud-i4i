module.exports = (req, res, next) => {
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({ error: 'Token error' });

    const [secheme, token] = parts;

    if(!/^Bearer$/i.test(secheme))
         return res.status(401).send({ error: 'Token malformatted' })

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({ erro: 'Token invalid' });
    
    req.userId = decoded.id
    return next();
    })
};