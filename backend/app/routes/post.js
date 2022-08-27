const {ObjectId} = require("mongodb");
const withAuth = require('../services/authMiddleware');

module.exports = function(app, db) {

    const database = db.db('lenya');
    const collection = database.collection('notes');

    app.post('/post', withAuth, (req, res) => {
        const note = { text: req.body.text,
                       time: req.body.time,
                       post: req.body.post
        };
        collection.insertOne(note, (err, result) => {
            if (err) {
              return  res.status(500).send({
                    'error': 'An error has occurred' });
            } else {
               return res.status(201).send({
                   "id" : result["insertedId"]
                });
            }
        });
    });

    app.get('/posts', async (req, res) => {
        const cursor = collection.find().sort({
            time: -1
        });
        const posts = [];
        while (await cursor.hasNext()) {
            const doc = await cursor.next();
            posts.push(doc);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(posts));
    });

    app.get('/post', withAuth, async (req, res) => {
        if (!req.query.id) {
           return res.status(500).send({
                'error': 'No post ID received' });
        }
        let id = "";
        try {
            id = ObjectId(req.query.id);
        } catch (e) {
            return res.status(500).send({
                'error': e.message });
        }
        const cursor = collection.findOne({"_id" : id})
        const doc = await cursor;
        if (doc) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(doc));
        } else {
            res.status(500).send({
                'error': 'An error has occurred' });
        }
    });

    app.delete('/post', withAuth, async (req, res) => {
        if (!req.query.id) {
            return res.status(500).send({
                'error': 'No post ID received'});
        }
        let id = "";
        try {
            id = ObjectId(req.query.id);
        } catch (e) {
            return res.status(500).send({
                'error': e.message });
        }
        try {
            collection.deleteOne( { "_id" : id } );
        } catch (e) {
            return res.status(500).send({
                'error': e.message });
        }

        return res.status(200).send({
            "id" : req.query.id
        });


    });
};