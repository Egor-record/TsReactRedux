const jwt = require('jsonwebtoken');
const secret = "ECE22yj9vfAKqNHR4YBS";

module.exports = function(req, res, next) {
    const token = req.sessionToken;
    res.setHeader('Content-Type', 'application/json');
    if (!token) {
        res.status(401).send({
            "error": true,
            "message": "Unauthorized: No token provided"});
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send({
                    "error": true,
                    "message": 'Unauthorized: Invalid token'});
            } else {
                req.userId = decoded.userId;
                next();
            }
        });
    }
}