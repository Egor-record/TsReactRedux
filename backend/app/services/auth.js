const bcrypt = require('bcrypt');

module.exports = function (user, db){
    const module = {};
    const database = db.db('lenya');
    const collection = database.collection('users');

    module.createUser = async () => {

        const cursor = collection.findOne({"name" : user.name})
        const doc = await cursor.catch(error => {
            return [true, error.message]
        });

        if (doc && doc.name) {
            return [true, "User already exist"];
        }

        const hash = await bcrypt.hash(user.pass, 10)
        if (hash) {
            user.pass = hash;
            let id = undefined;
            try {
              id = await collection.insertOne(user);
              console.log("here", id);
            } catch (e) {
                return [true, e];
            }

            return [false, id?.insertedId];

        } else {
            return [true, "Error with hash"]
        }

        console.log("here", id?.insertedId);
    }

    module.login = async () => {
        const cursor = collection.findOne({"name" : user.name})

        const doc = await cursor.catch(error => {
            return [true, error.message]
        });

        if (doc) {
            const hash = await bcrypt.compare(user.pass, doc.pass).catch(error=>{
                return [true, error.message]
            })

            if (hash) {
                return [false, {
                    res: hash,
                    id: doc._id
                }]
            }
            return [true, "Invalid pass"];
        }
        return [true, "No user find"];
    }
    return module
}