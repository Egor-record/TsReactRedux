const jwt = require('jsonwebtoken');
const config = require('../../config/index');

module.exports = function(app, db) {

    app.post('/user/create', async (req, res) => {
        if (!req.body.name && !req.body.password) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).send({
                'error': "No user or password provided!" });
        }
        const auth = require("../services/auth")(
            {
                name: req.body.name,
                pass: req.body.password,
            }, db
        )
        const [error, id] = await auth.createUser();
        if (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).send({
                'error': id });
        }
        res.setHeader('Content-Type', 'application/json');
        const payload = { id };

        console.log(payload);

        const token = jwt.sign(payload, config.secretKey, {
            expiresIn: '1h'
        });

        console.log(token);

        return res.cookie('lenyablog', token).status(200).send({
            'status': true });
    });

    app.post('/user/login', async (req, res) => {
        const auth = require("../services/auth")(
            {
                name: req.body.name,
                pass: req.body.password,
            }, db
        )
        const [error, result] = await auth.login();
        res.setHeader('Content-Type', 'application/json');
        if (error) {
            return res.status(500).send({
                'error': result });
        }
        const id = result.id;
        const payload = { id };

        const token = jwt.sign(payload, config.secretKey, {
            expiresIn: '1h'
        });
        if (result.res) {
            return res.cookie('lenyablog', token ).status(200).send({
                'status': true });
        }

        return res.status(401).send({
            'status': false, "error" : result});


    })
}
