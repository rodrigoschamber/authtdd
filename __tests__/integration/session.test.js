const request = require('supertest');
const app = require('../../src/app')
const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Authentication', () => {
    beforeEach(async () => {
        await truncate();
    });
    it('should authenticate with valid credentials.', async () => {
        const user = await factory.create('User', {
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
    it('should not authenticate with invalid credentials.', async () => {
        const user = await factory.create('User', {
            password: 'password123'
        });
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: 'password'
            });
        expect(response.status).toBe(401);
    });
    it('should receive a JWT token when authenticated with valid credentials.', async () => {
        const user = await factory.create('User', {
            password: 'password'
        });
        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: 'password'
            });
        expect(response.body).toHaveProperty('token');
    });
    it('should be able to access private routes when authenticated.', async () => {
        const user = await factory.create('User', {
            password: 'password'
        });
        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${user.generateToken()}`);
        expect(response.status).toBe(200);
    });
    it('should not be able to access private routes whithout jwt token.', async () => {
        const user = await factory.create('User', {
            password: 'password'
        });
        const response = await request(app)
            .get('/dashboard')
        expect(response.status).toBe(401);
    });
    it('should not be able to access private routes using an invalid jwt token.', async () => {
        const user = await factory.create('User', {
            password: 'password'
        });
        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer asdfg123456`);
        expect(response.status).toBe(401);
    });
});