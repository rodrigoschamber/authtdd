const request = require('supertest');
const app = require('../../src/app')
const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('Authentication', () => {
    beforeEach(async () => {
        await truncate();
    });
    it('should receive a JWT token when authenticated with valid credentials.', async () => {
        const user = await User.create({
            name: 'Rodrigo',
            email: 'rodrigoschamber@gmail.com',
            password: 'password'
        });
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: 'password'
            });
        expect(response.status).toBe(200);
    });
});