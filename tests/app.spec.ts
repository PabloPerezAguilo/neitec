import request from 'supertest';
import { app } from '../app.js';

const server = app;

describe('Test API', () => {
    test('Test Healthcheck', async () => {
        const res = await request(server).get('/');
        expect(res.body.status).toBe('ok');
    })
})

describe('Test User', () => {
    const basePath = '/user'
    test('Test right user', async () => {
        const res = await request(server).post(basePath + '/login').send({ "email": "user@yo.es", "password": "123456" }).expect(200);
        expect(res.body.token).toBeDefined()
    })

    test('Test right admin', async () => {
        const res = await request(server).post(basePath + '/login').send({ "email": "admin@yo.es", "password": "123456" }).expect(200);
        expect(res.body.token).toBeDefined()
    })

    test('Test bad email', async () => {
        const res = await request(server).post(basePath + '/login').send({ "email": "false@yo.es", "password": "123456" }).expect(404);
        expect(res.body.code).toBe('NotFound')
    })

    test('Test bad password', async () => {
        const res = await request(server).post(basePath + '/login').send({ "email": "user@yo.es", "password": "1234567" }).expect(404);
        expect(res.body.code).toBe('NotFound')
    })
})


describe('Test Transactions', () => {
    const basePath = '/transaction'
    test('Create transaction', async () => {
        let res = await request(server).post('/user/login').send({ "email": "user@yo.es", "password": "123456" }).expect(200);
        const token = res.body.token;
        res = await request(server).post(basePath + '/').set("Authorization", `Bearer ${token}`).send({ "name": "TRX1" }).expect(200);
        expect(res.body._id).toBeDefined()
        expect(res.body.name).toBe('TRX1')
    })

    test('Create transaction without auth', async () => {
        const res = await request(server).post(basePath + '/').send({ "name": "TRX1" }).expect(401);
        expect(res.body.code).toBe('Unauthorized')
    })
})
