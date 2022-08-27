const jwt = require('jsonwebtoken');
const config = require('../../config/index');
const secret = config.secretKey;

module.exports = function(req, res, next) {
    const token = req.cookies?.lenyablog;
    res.setHeader('Content-Type', 'application/json');

    if (!token) {
       return res.status(401).send({
            "error": true,
            "message": "Unauthorized: No token provided"});
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                console.log(err);
                if(err.name === 'TokenExpiredError') {
                    return res.status(401).send({
                        "error": true,
                        "statusCode" : 100,
                        "message": 'TokenExpiredError: Invalid token'});
                } else {
                   return res.status(401).send({
                        "error": true,
                        "statusCode" : 401,
                        "message": 'Unauthorized: Invalid token'});
                }

            } else {
                req.userId = decoded.userId;
                next();
            }
        });
    }
}