const express = require('express')
const MongoClient  = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");

const app = express();
const port = 4000;
const db = require('./config/index');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser());

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)

    app.get('/', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        console.log(req.sessionID)
        res.send(JSON.stringify(
            {
                "status": 200
            }
        ));
    })

    require('./app/routes')(app, database);
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

})