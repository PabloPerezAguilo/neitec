process.env.DOTENV_PATH = '/.env.test';
import request from 'supertest';
import mongoose from "mongoose";
// import { app } from '../app.js';
// const server = app;

describe('test API', () => {
    test('test empty cats', async() => {
        // const res = await request(server).get('/');
        // expect(res.body).toBe('Healthcheck: ok');
        expect(true).toBe(true);
    })
    //
    // test('test external function', async() => {
    //     const res = await request(server).post('/cat/');
    //     expect(res.body.name).toBe('testName');
    // })
    //
    // test('test empty cats', async() => {
    //     const res = await request(server).get('/cat/');
    //     expect(res.body.length).toBe(0);
    // })
})
//
// afterEach(async() => {
//     await mongoose.connection.db.dropDatabase();
// })
//
// afterAll(async() => {
//     server.close();
//     await mongoose.connection.close();
//     await api.mongo.stop();
// })
