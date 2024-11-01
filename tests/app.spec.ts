import request from 'supertest';
import { app } from '../app.js';
import { TransactionStatus } from '../entities/transaction/model';

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
        const res = await request(server).post(`${basePath}/login`).send({ "email": "user@yo.es", "password": "123456" }).expect(200);
        expect(res.body.token).toBeDefined()
    })

    test('Test right admin', async () => {
        const res = await request(server).post(`${basePath}/login`).send({ "email": "admin@yo.es", "password": "123456" }).expect(200);
        expect(res.body.token).toBeDefined()
    })

    test('Test bad email', async () => {
        const res = await request(server).post(`${basePath}/login`).send({ "email": "false@yo.es", "password": "123456" }).expect(404);
        expect(res.body.code).toBe('NotFound')
    })

    test('Test bad password', async () => {
        const res = await request(server).post(`${basePath}/login`).send({ "email": "user@yo.es", "password": "1234567" }).expect(404);
        expect(res.body.code).toBe('NotFound')
    })
})


describe('Test Transactions', () => {
    const basePath = '/transaction';
    let res;
    let userToken;
    let adminToken;
    beforeAll(async () => {
        let res = await request(server).post('/user/login').send({ "email": "user@yo.es", "password": "123456" }).expect(200);
        userToken = res.body.token;
        res = await request(server).post('/user/login').send({ "email": "admin@yo.es", "password": "123456" }).expect(200);
        adminToken = res.body.token;
    })

    test('Create transaction', async () => {
        res = await request(server).post(`${basePath}/`).set("Authorization", `Bearer ${userToken}`).send({ "name": "TRX1" }).expect(200);
        expect(res.body._id).toBeDefined()
        expect(res.body.name).toBe('TRX1')
        expect(res.body.status).toBe(TransactionStatus.Pending)
        const trx = res.body;
        res = await request(server).patch(`${basePath}/${trx._id}/validation`).set("Authorization", `Bearer ${adminToken}`).send({ "status": TransactionStatus.Approved }).expect(200);
        expect(res.body.status).toBe(TransactionStatus.Approved)
    })

    test('Create transaction and reject it', async () => {
        res = await request(server).post(`${basePath}/`).set("Authorization", `Bearer ${userToken}`).send({ "name": "TRX2" }).expect(200);
        const trx = res.body;
        res = await request(server).patch(`${basePath}/${trx._id}/validation`).set("Authorization", `Bearer ${adminToken}`).send({ "status": TransactionStatus.Rejected }).expect(200);
        expect(res.body.status).toBe(TransactionStatus.Rejected)
    })

    test('Create transaction without auth', async () => {
        const res = await request(server).post(`${basePath}/`).send({ "name": "TRX4" }).expect(401);
        expect(res.body.code).toBe('Unauthorized')
    })

    test('Try to create an approved transaction', async () => {
        res = await request(server).post(`${basePath}/`).set("Authorization", `Bearer ${userToken}`).send({ "name": "TRX2", "status": TransactionStatus.Approved }).expect(200);
        expect(res.body._id).toBeDefined()
        expect(res.body.name).toBe('TRX2')
        expect(res.body.status).toBe(TransactionStatus.Pending)
    })

    test('Try to create and approve transaction without auth', async () => {
        res = await request(server).post(`${basePath}/`).set("Authorization", `Bearer ${userToken}`).send({ "name": "TRX3" }).expect(200);
        const trx = res.body;
        // Invocamos la validacion sin token debe fallar
        res = await request(server).patch(`${basePath}/${trx._id}/validation`).send({ "status": TransactionStatus.Approved }).expect(401);
        expect(res.body.code).toBe('Unauthorized')
    })

    test('Try to create and self approve transaction', async () => {
        res = await request(server).post(`${basePath}/`).set("Authorization", `Bearer ${userToken}`).send({ "name": "TRX3" }).expect(200);
        const trx = res.body;
        // Invocamos la validacion con token de usuario y debe fallar
        res = await request(server).patch(`${basePath}/${trx._id}/validation`).set("Authorization", `Bearer ${userToken}`).send({ "status": TransactionStatus.Approved }).expect(403);
        expect(res.body.code).toBe('Forbidden')
    })

    test('Create transaction and approve with invalid value', async () => {
        res = await request(server).post(`${basePath}/`).set("Authorization", `Bearer ${userToken}`).send({ "name": "TRX1" }).expect(200);
        expect(res.body._id).toBeDefined()
        expect(res.body.name).toBe('TRX1')
        expect(res.body.status).toBe(TransactionStatus.Pending)
        const trx = res.body;
        res = await request(server).patch(`${basePath}/${trx._id}/validation`).set("Authorization", `Bearer ${adminToken}`).send({ "status": "foo" }).expect(422);
        expect(res.body.code).toBe('InvalidTransactionStatus')
    })
})
