const routes = require('express').Router();
const SessionController = require('./app/controllers/SessionController');

routes.post('/sessions', SessionController.store);

/*const { User } = require('./app/models');
User.create({
    name: 'Rodrigo',
    email: 'rodrigoschamber@gmail.com',
    password_hash: 'password'
});*/

module.exports = routes;