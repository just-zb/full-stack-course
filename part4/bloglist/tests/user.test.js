const {test,describe,beforeEach,after}=require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const {initUser,usersINDB} = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

describe('user test',()=>{
    // make sure there are only one user each time
    beforeEach(async ()=>{
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('123456', 10)
        const user = new User({ username: 'test', passwordHash: passwordHash,name: 'test' })
        await user.save()
    })
    const testUser = {
        username: 'abcde',
        name: 'Matti Luukkainen',
        password: '123456',
    }
    test('should create user',async()=>{
        const usersAtStart = await usersINDB()

        await api
            .post('/api/users')
            .send(testUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await usersINDB()
        assert.strictEqual(usersAtStart.length+1,usersAtEnd.length)
        // check if testUser is in the userAtEnd
        const usernames = usersAtEnd.map(u => u.username)
        assert.ok(usernames.includes(testUser.username))
    })
    test('should fail when username already exists',async()=>{
        const usersAtStart = await usersINDB()

        const newUser = {
            username: 'test',
            name: 'test',
            password: 'salainen',
        }

        await api
        .post('/api/users')
        .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await usersINDB()
        assert.strictEqual(usersAtStart.length,usersAtEnd.length)
    })

    test('should fail when username or password is invalid',async()=>{
        const usersAtStart = await usersINDB()
        // username length <3
        let newUser = {
            username: 'ab',
            name: 'ab',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        let usersAtEnd = await usersINDB()
        assert.strictEqual(usersAtStart.length,usersAtEnd.length)

        // password length <3
        newUser = {
            username: 'abcd',
            name: 'abcd',
            password: 'abc',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        usersAtEnd = await usersINDB()
        assert.strictEqual(usersAtStart.length,usersAtEnd.length)
    })

    test('should fail when there is no valid token')
    after(async ()=>{
        await mongoose.connection.close()
    })
})