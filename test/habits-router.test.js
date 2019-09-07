require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Habit = require('../lib/models/Habit');

jest.mock('../lib/middleware/ensure-auth.js');


describe('habit routes', () => {

    beforeAll(() => {
        connect();
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });
    

    it('POST route creates a habit in the database', () => {

        return request(app)
            .post('/api/v1/habits')
            .send({ habit: 'test your stuff', description: 'aaaaaa' })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    habit: 'test your stuff', 
                    description: 'aaaaaa',
                    user: '1234',
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String),
                    __v: 0
                });
            });
    });  
    
    
    it('GET returns all habits', async() => {

        const habit = await Habit.create({
            habit: 'do some stuff',
            description: 'aaaaaa',
            user: '1234',
            __v: 0
        });

        return request(app)
            .get('/api/v1/habits')
            .then(res => {
                const habitJSON = JSON.parse(JSON.stringify(habit));
                expect(res.body).toEqual([habitJSON]);
            });
    });


    it('GET /:id returns a habit by id', async() => {

        const habit = await Habit.create({
            habit: 'do some stuff',
            description: 'aaaaaa',
            user: '1234',
            __v: 0
        });

        return request(app)
            .get(`/api/v1/habits/${habit._id}`)
            .then(res => {
                const habitJSON = JSON.parse(JSON.stringify(habit));
                expect(res.body).toEqual(habitJSON);
            });
    });

    it('PATCH goblins/:id updates the description value on a habit by id', async() => {

        const habit = await Habit.create({
            habit: 'do some stuff',
            description: 'aaaaaa',
            user: '1234',
            __v: 0
        });

        const newHabit = {
            habit: 'do some stuff',
            description: 'OHO',
            user: '1234',
            __v: 0
        };

        return request(app)
            .patch(`/api/v1/habits/${habit._id}`)
            .send(newHabit)
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    habit: 'do some stuff',
                    description: 'OHO',
                    user: '1234',
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String),
                    __v: 0
                });
            });
    });

    it('PUT replaces a habit by id', async() => {

        const habit = await Habit.create({
            habit: 'do some stuff',
            description: 'aaaaaa',
            user: '1234',
            __v: 0
        });

        return request(app)
            .put(`/api/v1/habits/${habit._id}`)
            .send({ 
                habit: 'be able to replace a habit',
                description: 'replace',
                user: '1234',
                __v: 0 })
            .then(res => {
                expect(res.body).toEqual({ 
                    _id: expect.any(String),
                    habit: 'be able to replace a habit', 
                    description: 'replace',
                    user: '1234',
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String),
                    __v: 0 });
            });
    });

    it('DELETEs a habit by its id', async() => {

        const habit = await Habit.create({
            habit: 'do some stuff',
            description: 'aaaaaa',
            user: '1234',
            __v: 0
        });

        return request(app)
            .delete(`/api/v1/habits/${habit._id}`)
            .then(res => {
                expect(res.body).toEqual({ 
                    _id: expect.any(String),
                    habit: 'do some stuff',
                    description: 'aaaaaa',
                    user: '1234',
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String),
                    __v: 0 });
            });
    });
});
