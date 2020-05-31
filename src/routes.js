const routes = require('express').Router();
const SessionController = require('./app/controllers/SessionController');
const authMiddleware = require('./app/middleware/auth');

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);//only authenticated routes
routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
});

module.exports = routes;

//older code to write in the postgres database.
/*const { User } = require('./app/models');
User.create({
    name: 'Rodrigo',
    email: 'rodrigoschamber@gmail.com',
    password_hash: 'password'
});*/