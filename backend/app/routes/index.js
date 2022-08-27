const postsRoutes = require('./post');
const authRoutes = require('./auth');

module.exports = function(app, db) {
    postsRoutes(app, db);
    authRoutes(app, db);
};