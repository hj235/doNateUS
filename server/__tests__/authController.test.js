const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const {
    registerUser,
    loginUser,
    editUser,
    getUser,
} = require('../controllers/authController');

const User = require('../models/user');
const { hashPassword } = require('../helpers/auth');
const { createToken } = require('../helpers/token');

const app = express();
app.use(bodyParser.json());

app.post('/register', registerUser);
app.post('/login', loginUser);
app.put('/user/:id', editUser);
app.get('/user/:id', getUser);

describe('Auth Controller', () => {
    let server;
    let userId;
    let token;

    beforeAll(async () => {
        // connect to database
        mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('Database connected'))
        .catch((err) => console.log('Error on initial connection to database', err));

        // to handle errors after initial connection is established
        mongoose.connection.on('error', err => {
            console.log('Error on connection to database', err)
        });

        // disconnect message
        mongoose.connection.on('disconnected', () => console.log('Server disconnected from mongoDB'));

        // Create a test user
        const password = await hashPassword('testpassword');
        const user = await User.create({
            name: 'testuser',
            email: 'testuser@example.com',
            password
        });
        userId = user._id;
        token = createToken(userId);

        server = app.listen(3000);
    });

    afterAll(async () => {
        console.log("Cleaning up...");
        await User.deleteMany({ name: { $in: ['testuser', 'newuser', 'existinguser', 'anotherexistinguser', 'anotheruser', 'updateduser'] } });
        await mongoose.connection.close();
        server.close();
    });

    describe('registerUser', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    name: 'newuser',
                    email: 'newuser@example.com',
                    password: 'newpassword'
                });

            expect(res.statusCode).toBe(200);
            // expect(res.body.token).toBeTruthy();
        });

        it('should not register a user with an existing name', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    name: 'testuser',
                    email: 'anotheremail@example.com',
                    password: 'anotherpassword'
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Username is invalid or already in use');
        });

        it('should not register a user with an existing email', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    name: 'anotheruser',
                    email: 'testuser@example.com',
                    password: 'anotherpassword'
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Email is invalid or already registered');
        });
    });

    describe('loginUser', () => {
        it('should login an existing user', async () => {
            const res = await request(app)
                .post('/login')
                .send({
                    name: 'testuser',
                    password: 'testpassword'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.token).toBeTruthy();
        });

        it('should not login a non-existing user', async () => {
            const res = await request(app)
                .post('/login')
                .send({
                    name: 'nonexistentuser',
                    password: 'somepassword'
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('User not found');
        });

        it('should not login with incorrect password', async () => {
            const res = await request(app)
                .post('/login')
                .send({
                    name: 'testuser',
                    password: 'wrongpassword'
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Incorrect password');
        });
    });

    describe('editUser', () => {
        it('should edit an existing user', async () => {
            const res = await request(app)
                .put(`/user/${userId}`)
                .send({
                    name: 'updateduser'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.newUser.name).toBe('updateduser');
        });

        it('should not edit user to an existing name', async () => {
            await User.create({
                name: 'existinguser',
                email: 'existinguser@example.com',
                password: 'existingpassword'
            });

            const res = await request(app)
                .put(`/user/${userId}`)
                .send({
                    name: 'existinguser'
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Username is invalid or already in use');
        });

        it('should not edit user to an existing email', async () => {
            await User.create({
                name: 'anotherexistinguser',
                email: 'anotherexistinguser@example.com',
                password: 'anotherexistingpassword'
            });

            const res = await request(app)
                .put(`/user/${userId}`)
                .send({
                    email: 'anotherexistinguser@example.com'
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('Email is invalid or already registered');
        });
    });

    describe('getUser', () => {
        it('should get an existing user', async () => {
            const res = await request(app).get(`/user/${userId}`);

            expect(res.statusCode).toBe(200);
            expect(res.body._id).toBe(String(userId));
            expect(res.body.password).toBeUndefined(); // Ensure password is not returned
        });

        it('should return an error for a non-existing user', async () => {
            const res = await request(app).get('/user/60b6a6d5f1d2c50640b8b9d1');

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toBe('User not found');
        });
    });
});